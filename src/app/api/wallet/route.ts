import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getOrCreateUserProgress } from "@/lib/learning-journey";

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

    const progress = await getOrCreateUserProgress(userId);

    return NextResponse.json({
      success: true,
      wallet: {
        balance: progress.totalCoins,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/wallet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch wallet balance." },
      { status: 500 },
    );
  }
}
