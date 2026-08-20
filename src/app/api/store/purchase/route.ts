import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { debitCoins } from "@/lib/coins";

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
    const item = await prisma.storeItem.findFirst({ where: { OR: [{ id: itemId }, { sku: itemId }] } });
    if (!item) return NextResponse.json({ success: false, error: "Item not found." }, { status: 404 });

    if (!item.purchasable) return NextResponse.json({ success: false, error: "Item is not available for purchase." }, { status: 400 });

    // Atomic transaction: check balance, deduct, grant, record
    const result = await prisma.$transaction(async (tx) => {
      // Prevent duplicate unique ownership for non-consumable items
      if (item.type !== "consumable") {
        const existing = await tx.userItem.findUnique({ where: { userId_itemId: { userId, itemId: item.id } } });
        if (existing) {
          throw new Error("Item already owned.");
        }
      }

      const coinDebit = await debitCoins(
        userId,
        {
          amount: item.price,
          type: "PURCHASE",
          reason: `Purchase ${item.sku}`,
          relatedId: item.id,
        },
        tx,
      );

      // Grant item (create UserItem)
      await tx.userItem.create({ data: { userId, itemId: item.id, quantity: 1 } });

      return { remainingCoins: coinDebit.balanceAfter };
    });

    return NextResponse.json({ success: true, message: `Purchased ${item.name}`, newBalance: result.remainingCoins });
  } catch (err: unknown) {
    console.error("POST /api/store/purchase error:", err);
    const message = err instanceof Error ? err.message : "Purchase failed.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
