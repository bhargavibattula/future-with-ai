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

    // ── Build the 365-day date window (most-recent day = today UTC) ──────────
    const today = new Date();
    const todayUTC = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    );

    // The window starts 364 days before today so we have exactly 365 days
    const startDate = new Date(todayUTC);
    startDate.setUTCDate(startDate.getUTCDate() - 364);

    // Helper: format a Date to "YYYY-MM-DD"
    const fmtDate = (d: Date) =>
      `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;

    const startDateStr = fmtDate(startDate);

    // ── Fetch real activity data ──────────────────────────────────────────────
    const [activities, userProgress] = await Promise.all([
      prisma.dailyActivity.findMany({
        where: { userId, date: { gte: startDateStr } },
        orderBy: { date: "asc" },
      }),
      prisma.userProgress.findUnique({ where: { userId } }),
    ]);

    const activityMap = new Map(activities.map((a) => [a.date, a]));

    // ── Build 365 ordered day objects ─────────────────────────────────────────
    let totalSubmissions = 0;
    let activeDays = 0;

    const heatmapDays = Array.from({ length: 365 }, (_, i) => {
      const d = new Date(startDate);
      d.setUTCDate(startDate.getUTCDate() + i);
      const dateStr = fmtDate(d);

      const act = activityMap.get(dateStr);
      let count = 0;
      let lessons = 0;
      let quizzes = 0;
      let xp = 0;
      let challenges = 0;

      if (act) {
        lessons = act.lessonCompleted ?? 0;
        quizzes = act.quizCompleted ?? 0;
        challenges = act.challengeCompleted ?? 0;
        xp = act.xpEarned ?? 0;

        count =
          lessons +
          quizzes +
          challenges +
          (act.assessmentCompleted ?? 0) +
          (act.practiceCompleted ?? 0) +
          (act.projectCompleted ?? 0) +
          (act.dailyGoalCompleted ? 1 : 0);

        // Floor at 1 if any boolean goal was completed
        if (
          count === 0 &&
          (act.dailyLessonCompleted ||
            act.dailyQuizCompleted ||
            act.dailyChallengeCompleted)
        ) {
          count = 1;
        }
      }

      if (count > 0) {
        totalSubmissions += count;
        activeDays += 1;
      }

      // Level thresholds per spec: 0 / 1-2 / 3-5 / 6-10 / 10+
      let level = 0;
      if (count >= 10) level = 4;
      else if (count >= 6) level = 3;
      else if (count >= 3) level = 2;
      else if (count >= 1) level = 1;

      return {
        date: dateStr,
        dayOfWeek: d.getUTCDay(), // 0 = Sunday
        month: d.getUTCMonth(),   // 0 = January
        year: d.getUTCFullYear(),
        count,
        level,
        details: { lessons, quizzes, challenges, xp },
      };
    });

    // ── Streak calculation (prefer UserProgress, fall back to compute) ────────
    let currentStreak = userProgress?.currentStreak ?? 0;
    let longestStreak = userProgress?.longestStreak ?? 0;

    // If UserProgress is missing or zero, compute from DailyActivity
    if (currentStreak === 0 && activeDays > 0) {
      // Sort dates descending from today
      const sortedDates = activities
        .filter((a) => {
          const act = a;
          const total =
            (act.lessonCompleted ?? 0) +
            (act.quizCompleted ?? 0) +
            (act.challengeCompleted ?? 0) +
            (act.dailyGoalCompleted ? 1 : 0);
          return total > 0 || act.dailyLessonCompleted || act.dailyQuizCompleted;
        })
        .map((a) => a.date)
        .sort()
        .reverse();

      let streak = 0;
      let longest = 0;
      let prev: string | null = null;

      for (const dateStr of sortedDates.slice().reverse()) {
        if (!prev) {
          streak = 1;
        } else {
          const prevD = new Date(prev + "T00:00:00Z");
          const curD = new Date(dateStr + "T00:00:00Z");
          const diff =
            (curD.getTime() - prevD.getTime()) / (1000 * 60 * 60 * 24);
          if (diff === 1) {
            streak += 1;
          } else {
            streak = 1;
          }
        }
        if (streak > longest) longest = streak;
        prev = dateStr;
      }

      // Current streak: count backwards from today
      let cs = 0;
      let checkDate = new Date(todayUTC);
      const activeDateSet = new Set(sortedDates);

      while (true) {
        const ds = fmtDate(checkDate);
        if (activeDateSet.has(ds)) {
          cs++;
          checkDate.setUTCDate(checkDate.getUTCDate() - 1);
        } else {
          break;
        }
      }

      currentStreak = cs;
      longestStreak = longest;
    }

    return NextResponse.json({
      success: true,
      totalSubmissions,
      activeDays,
      currentStreak,
      longestStreak,
      days: heatmapDays,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Heatmap API error:", msg);
    return NextResponse.json(
      { success: false, error: "Failed to fetch heatmap data." },
      { status: 500 }
    );
  }
}
