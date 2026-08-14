import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const topProgresses = await prisma.userProgress.findMany({
      take: 50,
      orderBy: [
        { totalXP: "desc" },
        { currentStreak: "desc" },
        { perfectDays: "desc" },
      ],
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    const leaderboard = topProgresses.map((p, index) => ({
      rank: index + 1,
      userId: p.userId,
      name: p.user.name || "Anonymous Learner",
      image: p.user.image,
      xp: p.totalXP,
      streak: p.currentStreak,
      perfectDays: p.perfectDays,
      level: p.currentLevel,
      weeklyXP: p.weeklyXP,
      monthlyXP: p.monthlyXP,
    }));

    return NextResponse.json({ success: true, leaderboard });
  } catch (error: any) {
    console.error("Error in GET /api/leaderboard:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch leaderboard." },
      { status: 500 }
    );
  }
}
