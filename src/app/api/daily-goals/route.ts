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

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const today = getTodayUTC();

    // Get or create today's daily activity record
    let dailyActivity = await prisma.dailyActivity.findUnique({
      where: {
        userId_date: { userId, date: today },
      },
    });

    if (!dailyActivity) {
      dailyActivity = await prisma.dailyActivity.create({
        data: {
          userId,
          date: today,
        },
      });
    }

    const goals = [
      {
        id: "READ_LESSON",
        title: "Read Lesson",
        description: "Read today's featured lesson",
        completed: dailyActivity.dailyLessonCompleted,
        rewardXP: 50,
        rewardCoins: 25,
      },
      {
        id: "COMPLETE_QUIZ",
        title: "Complete Quiz",
        description: "Take and pass a daily quiz",
        completed: dailyActivity.dailyQuizCompleted,
        rewardXP: 50,
        rewardCoins: 25,
      },
      {
        id: "DAILY_CHALLENGE",
        title: "Daily Challenge",
        description: "Solve the daily interactive challenge",
        completed: dailyActivity.dailyChallengeCompleted,
        rewardXP: 50,
        rewardCoins: 25,
      },
    ];

    const completedCount = goals.filter((g) => g.completed).length;

    return NextResponse.json({
      success: true,
      goals,
      date: today,
      completedCount,
      totalGoals: goals.length,
      rewardClaimed: dailyActivity.dailyGoalRewardClaimed,
    });
  } catch (error: any) {
    console.error("Error fetching daily goals:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch daily goals." },
      { status: 500 }
    );
  }
}
