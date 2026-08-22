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
    const direction = searchParams.get("direction")?.trim().toLowerCase() || "sent";
    const page = parsePositiveInteger(searchParams.get("page"), 1);
    const limit = Math.min(parsePositiveInteger(searchParams.get("limit"), 20), 100);

    if (direction !== "sent" && direction !== "received") {
      return NextResponse.json(
        { success: false, error: "direction must be sent or received." },
        { status: 400 },
      );
    }

    const where = direction === "sent" ? { senderId: userId } : { recipientId: userId };
    const [total, gifts] = await prisma.$transaction([
      prisma.gift.count({ where }),
      prisma.gift.findMany({
        where,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          coinAmount: true,
          status: true,
          senderTransactionId: true,
          recipientTransactionId: true,
          createdAt: true,
          completedAt: true,
          item: {
            select: {
              id: true,
              sku: true,
              name: true,
              type: true,
              price: true,
              image: true,
            },
          },
          sender: {
            select: { id: true, name: true, email: true, image: true },
          },
          recipient: {
            select: { id: true, name: true, email: true, image: true },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      direction,
      gifts,
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
    console.error("Error in GET /api/store/gifts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gift history." },
      { status: 500 },
    );
  }
}
