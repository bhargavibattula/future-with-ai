import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

function getTodayUTC(): string {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { goalType } = await req.json();
    if (!["READ_LESSON", "COMPLETE_QUIZ", "DAILY_CHALLENGE"].includes(goalType)) {
      return NextResponse.json(
        { success: false, error: "Invalid goal type" },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    const today = getTodayUTC();

    let dailyActivity = await prisma.dailyActivity.findUnique({
      where: { userId_date: { userId, date: today } },
    });

    if (!dailyActivity) {
      dailyActivity = await prisma.dailyActivity.create({
        data: { userId, date: today },
      });
    }

    // Determine field to update
    const updateField =
      goalType === "READ_LESSON"
        ? "dailyLessonCompleted"
        : goalType === "COMPLETE_QUIZ"
        ? "dailyQuizCompleted"
        : "dailyChallengeCompleted";

    // If goal is already completed, prevent double completion / reward
    if ((dailyActivity as any)[updateField]) {
      return NextResponse.json(
        { success: false, message: "Goal already completed today" },
        { status: 400 }
      );
    }

    // Award +50 XP and +25 Coins for this goal completion
    const addedXP = 50;
    const addedCoins = 25;

    // Update daily activity
    const updatedActivity = await prisma.dailyActivity.update({
      where: { id: dailyActivity.id },
      data: {
        [updateField]: true,
        xpEarned: { increment: addedXP },
        coinsEarned: { increment: addedCoins },
      },
    });

    // Check if all goals completed
    const allCompleted =
      updatedActivity.dailyLessonCompleted &&
      updatedActivity.dailyQuizCompleted &&
      updatedActivity.dailyChallengeCompleted;

    if (allCompleted && !updatedActivity.dailyGoalCompleted) {
      await prisma.dailyActivity.update({
        where: { id: dailyActivity.id },
        data: {
          dailyGoalCompleted: true,
          dailyGoalRewardClaimed: true,
        },
      });
    }

    // Increment user XP and Coins
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: addedXP },
        coins: { increment: addedCoins },
      },
      select: { xp: true, coins: true },
    });

    // Update or create UserProgress if present
    await prisma.userProgress.upsert({
      where: { userId },
      create: {
        userId,
        totalXP: addedXP,
        totalCoins: addedCoins,
      },
      update: {
        totalXP: { increment: addedXP },
        totalCoins: { increment: addedCoins },
      },
    }).catch(() => {}); // Ignore if userProgress table constraints differ

    return NextResponse.json({
      success: true,
      goalType,
      xp: updatedUser.xp,
      coins: updatedUser.coins,
      dailyActivity: updatedActivity,
    });
  } catch (error: any) {
    console.error("Error completing goal:", error);
    return NextResponse.json(
      { success: false, error: "Failed to complete goal." },
      { status: 500 }
    );
  }
}
