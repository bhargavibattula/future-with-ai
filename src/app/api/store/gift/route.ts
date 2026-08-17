import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    let senderId = session?.user?.id;

    if (!senderId && session?.user?.email) {
      const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (dbUser) senderId = dbUser.id;
    }
    if (!senderId) return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });

    const body = await req.json();
    const recipient = String(body?.recipientEmailOrId || body?.recipient || "").trim();
    const amount = Number(body?.amount || 0);
    const itemId = body?.itemId ? String(body.itemId).trim() : null;

    if (!recipient) return NextResponse.json({ success: false, error: "Missing recipient." }, { status: 400 });
    if (!itemId && (!amount || amount <= 0)) return NextResponse.json({ success: false, error: "Missing amount or itemId." }, { status: 400 });

    // Resolve recipient by id or email
    let recipientUser = await prisma.user.findUnique({ where: { id: recipient } });
    if (!recipientUser) recipientUser = await prisma.user.findUnique({ where: { email: recipient } });
    if (!recipientUser) return NextResponse.json({ success: false, error: "Recipient not found." }, { status: 404 });

    if (recipientUser.id === senderId) return NextResponse.json({ success: false, error: "Cannot gift to yourself." }, { status: 400 });

    // Perform transaction
    const transferResult = await prisma.$transaction(async (tx) => {
      // Load sender progress
      const txAny = tx as any;
      let senderProgress = await txAny.userProgress.findUnique({ where: { userId: senderId } });
      if (!senderProgress) {
        const u = await tx.user.findUnique({ where: { id: senderId } });
        senderProgress = await tx.userProgress.create({ data: { userId: senderId, totalCoins: u?.coins || 0 } });
      }

      // If gifting an item
      if (itemId) {
        const item = await txAny.storeItem.findFirst({ where: { OR: [{ id: itemId }, { sku: itemId }] } });
        if (!item) throw new Error("Item not found.");
        // Check ownership / price
        if (senderProgress.totalCoins < item.price) throw new Error("Insufficient coins to gift this item.");

        // Deduct sender
        const updatedSender = await tx.userProgress.update({ where: { userId: senderId }, data: { totalCoins: { decrement: item.price } } });
        await tx.user.update({ where: { id: senderId }, data: { coins: updatedSender.totalCoins } });

        // Grant to recipient (create or upsert UserItem)
        await txAny.userItem.upsert({ where: { userId_itemId: { userId: recipientUser.id, itemId: item.id } }, update: { quantity: { increment: 1 } }, create: { userId: recipientUser.id, itemId: item.id, quantity: 1 } });

        // Record both transactions
        await txAny.coinTransaction.createMany({ data: [
          { userId: senderId, amount: item.price, type: "GIFT_SEND", credit: false, reason: `Gifted ${item.sku} to ${recipientUser.id}`, relatedId: item.id },
          { userId: recipientUser.id, amount: item.price, type: "GIFT_RECEIVE", credit: true, reason: `Received gift ${item.sku} from ${senderId}`, relatedId: item.id },
        ] });

        return { success: true, message: `Gifted ${item.name} to ${recipientUser.name}` };
      }

      // Otherwise coin transfer

      if (senderProgress.totalCoins < amount) throw new Error("Insufficient coins to gift.");

      const updatedSender = await txAny.userProgress.update({ where: { userId: senderId }, data: { totalCoins: { decrement: amount } } });
      await tx.user.update({ where: { id: senderId }, data: { coins: updatedSender.totalCoins } });

      // Credit recipient
      let recipientProgress = await txAny.userProgress.findUnique({ where: { userId: recipientUser.id } });
      if (!recipientProgress) {
        const u = await tx.user.findUnique({ where: { id: recipientUser.id } });
        recipientProgress = await tx.userProgress.create({ data: { userId: recipientUser.id, totalCoins: u?.coins || 0 } });
      }
      const updatedRecipient = await txAny.userProgress.update({ where: { userId: recipientUser.id }, data: { totalCoins: { increment: amount } } });
      await tx.user.update({ where: { id: recipientUser.id }, data: { coins: updatedRecipient.totalCoins } });

      await txAny.coinTransaction.createMany({ data: [
        { userId: senderId, amount, type: "GIFT_SEND", credit: false, reason: `Sent gift to ${recipientUser.id}` },
        { userId: recipientUser.id, amount, type: "GIFT_RECEIVE", credit: true, reason: `Received gift from ${senderId}` },
      ] });

      return { success: true, message: `Sent ${amount} coins to ${recipientUser.name}` };
    });

    return NextResponse.json({ success: true, message: transferResult.message });
  } catch (err: any) {
    console.error("POST /api/store/gift error:", err);
    return NextResponse.json({ success: false, error: err.message || "Gift failed." }, { status: 400 });
  }
}
