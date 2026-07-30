import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

function getWeekDaysUTC(): { day: string; dateStr: string }[] {
  const now = new Date();
  // Get UTC day of week (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const currentDay = now.getUTCDay();
  // Distance back to Monday (if Sunday (0), go back 6 days)
  const distanceToMon = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() + distanceToMon);

  const daysLabel = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return daysLabel.map((day, index) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + index);
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");
    return { day, dateStr: `${yyyy}-${mm}-${dd}` };
  });
}

function getCurrentMonthPrefixUTC(): string {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
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
    const weekDays = getWeekDaysUTC();
    const monthPrefix = getCurrentMonthPrefixUTC();

    // Fetch week's activity records
    const weekDates = weekDays.map((d) => d.dateStr);
    const weekActivities = await prisma.dailyActivity.findMany({
      where: {
        userId,
        date: { in: weekDates },
      },
    });

    const activityByDate = new Map(weekActivities.map((a) => [a.date, a]));

    const weekly = weekDays.map(({ day, dateStr }) => {
      const act = activityByDate.get(dateStr);
      const active = !!(
        act &&
        (act.lessonCompleted > 0 ||
          act.quizCompleted > 0 ||
          act.challengeCompleted > 0 ||
          act.xpEarned > 0 ||
          act.dailyLessonCompleted ||
          act.dailyQuizCompleted ||
          act.dailyChallengeCompleted)
      );
      return { day, date: dateStr, active };
    });

    // Fetch month's activity records
    const monthActivities = await prisma.dailyActivity.findMany({
      where: {
        userId,
        date: { startsWith: monthPrefix },
      },
    });

    // Aggregate monthly statistics
    let daysLearned = 0;
    let lessonsCompleted = 0;
    let xpEarned = 0;
    let coinsEarned = 0;

    for (const act of monthActivities) {
      const hasActivity =
        act.lessonCompleted > 0 ||
        act.quizCompleted > 0 ||
        act.challengeCompleted > 0 ||
        act.xpEarned > 0 ||
        act.dailyLessonCompleted ||
        act.dailyQuizCompleted ||
        act.dailyChallengeCompleted;

      if (hasActivity) {
        daysLearned += 1;
      }
      lessonsCompleted += act.lessonCompleted || 0;
      xpEarned += act.xpEarned || 0;
      coinsEarned += act.coinsEarned || 0;
    }

    // Fetch user baseline for longest streak and fallback stats
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { streak: true, xp: true, coins: true },
    });

    const userProgress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    const longestStreak = Math.max(
      userProgress?.longestStreak || 0,
      user?.streak || 0,
      userProgress?.currentStreak || 0,
      daysLearned
    );

    // Fallbacks if no monthly activity logged yet in DailyActivity
    if (xpEarned === 0 && (user?.xp || 0) > 0) {
      xpEarned = userProgress?.monthlyXP || user?.xp || 0;
    }
    if (coinsEarned === 0 && (user?.coins || 0) > 0) {
      coinsEarned = user?.coins || userProgress?.totalCoins || 0;
    }
    if (lessonsCompleted === 0 && (userProgress?.totalLessons || 0) > 0) {
      lessonsCompleted = userProgress?.totalLessons || 0;
    }
    if (daysLearned === 0 && (user?.streak || 0) > 0) {
      daysLearned = Math.min(user?.streak || 1, 31);
    }

    return NextResponse.json({
      success: true,
      weekly,
      monthly: {
        daysLearned,
        longestStreak,
        lessonsCompleted,
        xpEarned,
        coinsEarned,
      },
    });
  } catch (error: any) {
    console.error("Error fetching learning reports:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch learning reports." },
      { status: 500 }
    );
  }
}
