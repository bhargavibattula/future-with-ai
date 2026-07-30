import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

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

    // Fetch user details to determine timeline achievements
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { createdAt: true, xp: true, streak: true, coins: true },
    });

    // Ensure catalog achievements exist in DB
    const catalogCount = await prisma.achievement.count();
    if (catalogCount === 0) {
      await prisma.achievement.createMany({
        data: [
          { code: "JOINED", title: "Joined Platform", description: "Created an account on Future With AI", category: "Milestone" },
          { code: "FIRST_LESSON", title: "First Step", description: "Completed your first lesson", category: "Learning" },
          { code: "STREAK_7", title: "Consistency Master", description: "Maintained a 7-day learning streak", category: "Streak" },
          { code: "XP_500", title: "XP Collector", description: "Earned 500 total XP", category: "XP" },
          { code: "LESSONS_100", title: "Centurion Scholar", description: "Completed 100 interactive lessons", category: "Speed" },
        ],
        skipDuplicates: true,
      });
    }

    // Auto-unlock "JOINED" achievement if not unlocked
    const joinedAchievement = await prisma.achievement.findUnique({
      where: { code: "JOINED" },
    });

    if (joinedAchievement) {
      await prisma.userAchievement.upsert({
        where: {
          userId_achievementId: {
            userId,
            achievementId: joinedAchievement.id,
          },
        },
        create: {
          userId,
          achievementId: joinedAchievement.id,
          unlockedAt: user?.createdAt || new Date(),
        },
        update: {},
      });
    }

    // Auto-unlock streak / XP milestones if user satisfies condition
    if (user && user.streak >= 7) {
      const streakAch = await prisma.achievement.findUnique({ where: { code: "STREAK_7" } });
      if (streakAch) {
        await prisma.userAchievement.upsert({
          where: { userId_achievementId: { userId, achievementId: streakAch.id } },
          create: { userId, achievementId: streakAch.id },
          update: {},
        });
      }
    }

    if (user && user.xp >= 500) {
      const xpAch = await prisma.achievement.findUnique({ where: { code: "XP_500" } });
      if (xpAch) {
        await prisma.userAchievement.upsert({
          where: { userId_achievementId: { userId, achievementId: xpAch.id } },
          create: { userId, achievementId: xpAch.id },
          update: {},
        });
      }
    }

    // Fetch user unlocked achievements
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
      orderBy: { unlockedAt: "desc" },
    });

    // Also fetch all catalog achievements to show locked ones if desired
    const allAchievements = await prisma.achievement.findMany({
      orderBy: { createdAt: "asc" },
    });

    const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId));

    const timeline = allAchievements.map((ach) => {
      const userRecord = userAchievements.find((ua) => ua.achievementId === ach.id);
      return {
        id: ach.id,
        code: ach.code,
        title: ach.title,
        description: ach.description,
        category: ach.category,
        unlocked: unlockedIds.has(ach.id),
        unlockedAt: userRecord ? userRecord.unlockedAt : null,
      };
    }).sort((a, b) => {
      if (a.unlocked && !b.unlocked) return -1;
      if (!a.unlocked && b.unlocked) return 1;
      if (a.unlockedAt && b.unlockedAt) {
        return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime();
      }
      return 0;
    });

    return NextResponse.json({
      success: true,
      achievements: timeline,
    });
  } catch (error: any) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch achievements." },
      { status: 500 }
    );
  }
}
