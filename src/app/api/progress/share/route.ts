import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUserDashboardData } from "@/lib/learning-journey";
import { prisma } from "@/lib/prisma";

export async function GET() {
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

    const data = await getUserDashboardData(userId);
    const { progress, user } = data;

    const shareText = `🔥 I'm on a ${progress.currentStreak}-day learning streak on Future With AI! 🚀 Total XP: ${progress.totalXP.toLocaleString()} | Level ${progress.currentLevel} | Global Rank #${progress.globalRank}. Join me in mastering AI!`;

    return NextResponse.json({
      success: true,
      share: {
        userName: user.name,
        currentStreak: progress.currentStreak,
        longestStreak: progress.longestStreak,
        totalXP: progress.totalXP,
        totalCoins: progress.totalCoins,
        currentLevel: progress.currentLevel,
        globalRank: progress.globalRank,
        daysLearned: progress.daysLearned,
        shareText,
      },
    });
  } catch (error: any) {
    console.error("Error in GET /api/progress/share:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch share progress." },
      { status: 500 }
    );
  }
}
