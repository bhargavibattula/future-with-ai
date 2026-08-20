import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function getAuthenticatedUserId(): Promise<string | null> {
  const session = await auth();
  let userId = session?.user?.id;

  if (!userId && session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    userId = user?.id;
  }

  return userId || null;
}

function parsePositiveInteger(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parsePositiveInteger(searchParams.get("page"), 1);
    const limit = Math.min(parsePositiveInteger(searchParams.get("limit"), 20), 100);
    const where = { userId, type: "PURCHASE" };

    const [total, transactions] = await prisma.$transaction([
      prisma.coinTransaction.count({ where }),
      prisma.coinTransaction.findMany({
        where,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          amount: true,
          type: true,
          reason: true,
          relatedId: true,
          balanceAfter: true,
          createdAt: true,
        },
      }),
    ]);

    const itemIds = transactions
      .map((transaction) => transaction.relatedId)
      .filter((itemId): itemId is string => Boolean(itemId));
    const items = await prisma.storeItem.findMany({
      where: { id: { in: itemIds } },
      select: {
        id: true,
        sku: true,
        name: true,
        description: true,
        type: true,
        price: true,
        image: true,
      },
    });
    const itemsById = new Map(items.map((item) => [item.id, item]));

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      purchases: transactions.map((transaction) => ({
        id: transaction.id,
        amount: transaction.amount,
        type: transaction.type,
        reason: transaction.reason,
        referenceId: transaction.relatedId,
        balanceAfter: transaction.balanceAfter,
        createdAt: transaction.createdAt,
        item: transaction.relatedId ? itemsById.get(transaction.relatedId) || null : null,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/store/purchases:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch purchase history." },
      { status: 500 },
    );
  }
}
