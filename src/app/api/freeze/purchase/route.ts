import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { purchaseStreakFreeze, getUserDashboardData } from "@/lib/learning-journey";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await auth();
    let userId = session?.user?.id;

    if (!userId && session?.user?.email) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (dbUser) userId = dbUser.id;
    }

    if (!userId) {
      const defaultUser = await prisma.user.findFirst();
      if (!defaultUser) {
        return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });
      }
      userId = defaultUser.id;
    }

    const updatedProgress = await purchaseStreakFreeze(userId);
    const updatedDashboard = await getUserDashboardData(userId);

    return NextResponse.json({
      success: true,
      message: "Streak Freeze purchased successfully! ❄️",
      streakFreezes: updatedProgress.streakFreezes,
      remainingCoins: updatedProgress.totalCoins,
      dashboard: updatedDashboard,
    });
  } catch (error: any) {
    console.error("Error in POST /api/freeze/purchase:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to purchase Streak Freeze." },
      { status: 400 }
    );
  }
}
