import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
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
    const direction = searchParams.get("direction")?.trim().toUpperCase();
    const type = searchParams.get("type")?.trim();
    const reason = searchParams.get("reason")?.trim();

    if (direction && direction !== "CREDIT" && direction !== "DEBIT") {
      return NextResponse.json(
        { success: false, error: "direction must be CREDIT or DEBIT." },
        { status: 400 },
      );
    }

    const where: Prisma.CoinTransactionWhereInput = {
      userId,
      ...(direction ? { credit: direction === "CREDIT" } : {}),
      ...(type ? { type } : {}),
      ...(reason ? { reason: { contains: reason } } : {}),
    };

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

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      transactions: transactions.map((transaction) => ({
        id: transaction.id,
        amount: transaction.amount,
        type: transaction.type,
        reason: transaction.reason,
        referenceId: transaction.relatedId,
        balanceAfter: transaction.balanceAfter,
        createdAt: transaction.createdAt,
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
    console.error("Error in GET /api/wallet/transactions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch transaction history." },
      { status: 500 },
    );
  }
}
