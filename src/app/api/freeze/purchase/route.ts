import { NextResponse } from "next/server";
import { purchaseStreakFreeze, getUserDashboardData, resolveAuthenticatedUserId } from "@/lib/learning-journey";

export async function POST(req: Request) {
  try {
    const userId = await resolveAuthenticatedUserId(req);
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

