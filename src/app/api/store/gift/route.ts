import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { creditCoins, debitCoins } from "@/lib/coins";

export async function POST(req: Request) {
  try {
    const session = await auth();
    let senderId = session?.user?.id;

    if (!senderId && session?.user?.email) {
      const sender = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      if (sender) senderId = sender.id;
    }

    if (!senderId) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const recipient = String(body?.recipientEmailOrId || body?.recipient || "").trim();
    const itemId = body?.itemId ? String(body.itemId).trim() : null;
    const amount = Number(body?.amount);

    if (!recipient) {
      return NextResponse.json(
        { success: false, error: "Missing recipient." },
        { status: 400 },
      );
    }

    if (!itemId && (!Number.isSafeInteger(amount) || amount <= 0)) {
      return NextResponse.json(
        { success: false, error: "Coin gift amount must be a positive integer." },
        { status: 400 },
      );
    }

    let recipientUser = await prisma.user.findUnique({
      where: { id: recipient },
      select: { id: true, name: true, email: true },
    });
    if (!recipientUser) {
      recipientUser = await prisma.user.findUnique({
        where: { email: recipient },
        select: { id: true, name: true, email: true },
      });
    }

    if (!recipientUser) {
      return NextResponse.json(
        { success: false, error: "Recipient not found." },
        { status: 404 },
      );
    }

    if (recipientUser.id === senderId) {
      return NextResponse.json(
        { success: false, error: "Cannot gift to yourself." },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const item = itemId
        ? await tx.storeItem.findFirst({
            where: { OR: [{ id: itemId }, { sku: itemId }] },
          })
        : null;

      if (itemId && !item) {
        throw new Error("Item not found.");
      }

      if (item && !item.giftable) {
        throw new Error("This item cannot be gifted.");
      }

      if (item && !item.purchasable) {
        throw new Error("This item is not available for gifting.");
      }

      const gift = await tx.gift.create({
        data: {
          senderId,
          recipientId: recipientUser.id,
          itemId: item?.id,
          coinAmount: item ? null : amount,
          status: "PENDING",
        },
      });

      if (item) {
        const debit = await debitCoins(
          senderId,
          {
            amount: item.price,
            type: "GIFT_SEND",
            reason: `Gifted ${item.sku} to ${recipientUser.id}`,
            relatedId: gift.id,
          },
          tx,
        );

        await tx.userItem.upsert({
          where: { userId_itemId: { userId: recipientUser.id, itemId: item.id } },
          update: { quantity: { increment: 1 } },
          create: { userId: recipientUser.id, itemId: item.id, quantity: 1 },
        });

        await tx.gift.update({
          where: { id: gift.id },
          data: {
            status: "COMPLETED",
            senderTransactionId: debit.transaction.id,
            completedAt: new Date(),
          },
        });

        return { giftId: gift.id, message: `Gifted ${item.name} to ${recipientUser.name || recipientUser.email}` };
      }

      const senderDebit = await debitCoins(
        senderId,
        {
          amount,
          type: "GIFT_SEND",
          reason: `Sent gift to ${recipientUser.id}`,
          relatedId: gift.id,
        },
        tx,
      );
      const recipientCredit = await creditCoins(
        recipientUser.id,
        {
          amount,
          type: "GIFT_RECEIVE",
          reason: `Received gift from ${senderId}`,
          relatedId: gift.id,
        },
        tx,
      );

      await tx.gift.update({
        where: { id: gift.id },
        data: {
          status: "COMPLETED",
          senderTransactionId: senderDebit.transaction.id,
          recipientTransactionId: recipientCredit.transaction.id,
          completedAt: new Date(),
        },
      });

      return { giftId: gift.id, message: `Sent ${amount} coins to ${recipientUser.name || recipientUser.email}` };
    });

    return NextResponse.json({ success: true, giftId: result.giftId, message: result.message });
  } catch (err: unknown) {
    console.error("POST /api/store/gift error:", err);
    const message = err instanceof Error ? err.message : "Gift failed.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
