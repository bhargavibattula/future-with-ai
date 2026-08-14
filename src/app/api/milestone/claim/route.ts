import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { claimMilestoneReward, getUserDashboardData } from "@/lib/learning-journey";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
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
