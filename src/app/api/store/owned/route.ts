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

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    const items = await prisma.userItem.findMany({
      where: { userId },
      orderBy: { grantedAt: "desc" },
      select: {
        id: true,
        itemId: true,
        quantity: true,
        grantedAt: true,
        item: {
          select: {
            id: true,
            sku: true,
            name: true,
            description: true,
            type: true,
            price: true,
            image: true,
            purchasable: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("Error in GET /api/store/owned:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch owned items." },
      { status: 500 },
    );
  }
}
