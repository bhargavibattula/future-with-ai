import { NextResponse } from "next/server";
import { claimMilestoneReward, getUserDashboardData, resolveAuthenticatedUserId } from "@/lib/learning-journey";

export async function POST(req: Request) {
  try {
    const userId = await resolveAuthenticatedUserId(req);
    const body = await req.json();
    const { milestoneId } = body || {};

    if (!milestoneId) {
      return NextResponse.json(
        { success: false, error: "milestoneId is required." },
        { status: 400 }
      );
    }

    const result = await claimMilestoneReward(userId, milestoneId);
    const updatedDashboard = await getUserDashboardData(userId);

    return NextResponse.json({
      success: true,
      message: `Milestone claimed! Reward: +${result.rewardXP} XP, +${result.rewardCoins} Coins!`,
      result,
      dashboard: updatedDashboard,
    });
  } catch (error: any) {
    console.error("Error in POST /api/milestone/claim:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to claim milestone reward." },
      { status: 400 }
    );
  }
}

