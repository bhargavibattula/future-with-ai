import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    let userId = session?.user?.id;

    if (!userId && session?.user?.email) {
      const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (dbUser) userId = dbUser.id;
    }

    if (!userId) return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });

    const body = await req.json();
    const itemId = String(body?.itemId || body?.sku || "").trim();
    if (!itemId) return NextResponse.json({ success: false, error: "Missing itemId." }, { status: 400 });

    // Find by id or sku
    const item = await (prisma as any).storeItem.findFirst({ where: { OR: [{ id: itemId }, { sku: itemId }] } });
    if (!item) return NextResponse.json({ success: false, error: "Item not found." }, { status: 404 });

    if (!item.purchasable) return NextResponse.json({ success: false, error: "Item is not available for purchase." }, { status: 400 });

    // Atomic transaction: check balance, deduct, grant, record
    const result = await prisma.$transaction(async (tx) => {
      // Load userProgress for reliable coin totals
      const txAny = tx as any;
      let progress = await txAny.userProgress.findUnique({ where: { userId } });
      if (!progress) {
        const user = await tx.user.findUnique({ where: { id: userId } });
        progress = await tx.userProgress.create({ data: { userId, totalCoins: user?.coins || 0 } });
      }

      if (progress.totalCoins < item.price) {
        throw new Error("Insufficient coins.");
      }

      // Prevent duplicate unique ownership for non-consumable items
      if (item.type !== "consumable") {
        const existing = await txAny.userItem.findUnique({ where: { userId_itemId: { userId, itemId: item.id } } }).catch(() => null);
        if (existing) {
          throw new Error("Item already owned.");
        }
      }

      const updatedProgress = await txAny.userProgress.update({ where: { userId }, data: { totalCoins: { decrement: item.price } } });

      // Sync user coins on User model
      await tx.user.update({ where: { id: userId }, data: { coins: updatedProgress.totalCoins } });

      // Grant item (create UserItem)
      await txAny.userItem.create({ data: { userId, itemId: item.id, quantity: 1 } }).catch(() => null);

      // Record transaction
      await txAny.coinTransaction.create({ data: { userId, amount: item.price, type: "PURCHASE", credit: false, reason: `Purchase ${item.sku}`, relatedId: item.id } });

      return { remainingCoins: updatedProgress.totalCoins };
    });

    return NextResponse.json({ success: true, message: `Purchased ${item.name}`, newBalance: result.remainingCoins });
  } catch (err: any) {
    console.error("POST /api/store/purchase error:", err);
    const status = err.message && err.message.includes("Insufficient") ? 400 : 400;
    return NextResponse.json({ success: false, error: err.message || "Purchase failed." }, { status });
  }
}
