import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ reminder: null }, { status: 200 });
    }

    const todayStr = new Date().toISOString().split("T")[0];

    // Fetch user details & progress
    const [user, progress, todayActivity, pastActivities] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.userProgress.findUnique({ where: { userId } }),
      prisma.dailyActivity.findUnique({
        where: { userId_date: { userId, date: todayStr } },
      }),
      prisma.dailyActivity.findMany({
        where: { userId },
        orderBy: { date: "desc" },
        take: 14,
      }),
    ]);

    const streak = progress?.currentStreak ?? user?.streak ?? 0;
    const totalLessons = progress?.totalLessons ?? 0;

    // Check existing reminders generated today
    const existingToday = await prisma.reminder.findMany({
      where: { userId, date: todayStr },
      select: { type: true },
    });
    const createdTypesToday = new Set(existingToday.map((r) => r.type));

    let candidateReminder: {
      type: string;
      title: string;
      message: string;
      emoji: string;
      ctaLabel: string;
      ctaHref: string;
    } | null = null;

    // Helper to check if a DailyActivity represents active learning
    const hasActivity = (act: typeof todayActivity) => {
      if (!act) return false;
      return (
        act.lessonCompleted > 0 ||
        act.quizCompleted > 0 ||
        act.challengeCompleted > 0 ||
        act.assessmentCompleted > 0 ||
        act.xpEarned > 0
      );
    };

    // 1. STREAK_MILESTONE
    const milestoneStreaks = [7, 14, 30, 50, 100];
    if (milestoneStreaks.includes(streak) && !createdTypesToday.has("STREAK_MILESTONE")) {
      candidateReminder = {
        type: "STREAK_MILESTONE",
        title: `${streak}-Day Streak Milestone! 🎉`,
        message: `Incredible dedication! You've maintained a ${streak}-day learning streak.`,
        emoji: "🔥",
        ctaLabel: "View Streak",
        ctaHref: "/dashboard/streak",
      };
    }

    // 2. STREAK_AT_RISK
    if (!candidateReminder && streak > 0 && !hasActivity(todayActivity) && !createdTypesToday.has("STREAK_AT_RISK")) {
      candidateReminder = {
        type: "STREAK_AT_RISK",
        title: "Your Streak is at Risk! ⚡",
        message: `Don't break your ${streak}-day streak! Complete 1 quick activity today.`,
        emoji: "⏳",
        ctaLabel: "Practice Now",
        ctaHref: "/courses/claude",
      };
    }

    // 3. MISSED_2_DAYS
    if (!candidateReminder && !createdTypesToday.has("MISSED_2_DAYS")) {
      const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const dayBeforeStr = new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0];
      
      const hadYesterday = pastActivities.some((a) => a.date === yesterdayStr && hasActivity(a));
      const hadDayBefore = pastActivities.some((a) => a.date === dayBeforeStr && hasActivity(a));

      if (!hasActivity(todayActivity) && !hadYesterday && !hadDayBefore && pastActivities.length > 0) {
        candidateReminder = {
          type: "MISSED_2_DAYS",
          title: "We Miss You! 👋",
          message: "You haven't completed a lesson in 2 days. Keep your AI journey going!",
          emoji: "🚀",
          ctaLabel: "Resume Course",
          ctaHref: "/dashboard/courses",
        };
      }
    }

    // 4. GOALS_INCOMPLETE
    if (
      !candidateReminder &&
      todayActivity &&
      !todayActivity.dailyGoalCompleted &&
      !createdTypesToday.has("GOALS_INCOMPLETE")
    ) {
      candidateReminder = {
        type: "GOALS_INCOMPLETE",
        title: "Daily Goal Incomplete 🎯",
        message: "You're close to reaching today's learning target! Complete it for extra XP.",
        emoji: "🎯",
        ctaLabel: "Complete Goal",
        ctaHref: "/dashboard",
      };
    }

    // 5. ACHIEVEMENT_NEARBY
    if (!candidateReminder && !createdTypesToday.has("ACHIEVEMENT_NEARBY")) {
      const lessonMilestones = [5, 10, 25, 50, 100];
      const nextMilestone = lessonMilestones.find((m) => totalLessons === m - 1);
      if (nextMilestone) {
        candidateReminder = {
          type: "ACHIEVEMENT_NEARBY",
          title: "Achievement Nearby! 🏆",
          message: `Just 1 more lesson to reach ${nextMilestone} total completed lessons!`,
          emoji: "✨",
          ctaLabel: "Start Lesson",
          ctaHref: "/dashboard/courses",
        };
      }
    }

    // 6. WEEKLY_DROP
    if (!candidateReminder && !createdTypesToday.has("WEEKLY_DROP")) {
      // Calculate XP from last 7 days vs previous 7 days
      let thisWeekXP = 0;
      let lastWeekXP = 0;

      pastActivities.forEach((a) => {
        const dateObj = new Date(a.date);
        const diffDays = Math.floor((Date.now() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
          thisWeekXP += a.xpEarned || 0;
        } else if (diffDays <= 14) {
          lastWeekXP += a.xpEarned || 0;
        }
      });

      if (lastWeekXP >= 100 && thisWeekXP < lastWeekXP * 0.5) {
        candidateReminder = {
          type: "WEEKLY_DROP",
          title: "Pick Up the Pace 📈",
          message: "Your learning activity is lower than last week. Re-ignite your momentum!",
          emoji: "💪",
          ctaLabel: "Explore Arcade",
          ctaHref: "/dashboard/games",
        };
      }
    }

    if (!candidateReminder) {
      return NextResponse.json({ reminder: null }, { status: 200 });
    }

    // Upsert the candidate reminder into DB
    const reminder = await prisma.reminder.upsert({
      where: {
        userId_type_date: {
          userId,
          type: candidateReminder.type,
          date: todayStr,
        },
      },
      update: {},
      create: {
        userId,
        type: candidateReminder.type,
        title: candidateReminder.title,
        message: candidateReminder.message,
        emoji: candidateReminder.emoji,
        ctaLabel: candidateReminder.ctaLabel,
        ctaHref: candidateReminder.ctaHref,
        date: todayStr,
      },
    });

    return NextResponse.json({ reminder }, { status: 200 });
  } catch (error) {
    console.error("Error evaluating reminders:", error);
    return NextResponse.json({ reminder: null, error: "Internal Server Error" }, { status: 500 });
  }
}
