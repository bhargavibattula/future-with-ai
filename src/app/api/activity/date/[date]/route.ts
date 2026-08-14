import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params;
    if (!date) {
      return NextResponse.json({ success: false, error: "Date parameter is required." }, { status: 400 });
    }

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

    const daily = await prisma.dailyActivity.findUnique({
      where: { userId_date: { userId, date } },
      include: {
        logs: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!daily) {
      return NextResponse.json({
        success: true,
        activity: {
          date,
          lessonsCompleted: 0,
          quizCompleted: 0,
          challengeCompleted: 0,
          assessmentCompleted: 0,
          projectsCompleted: 0,
          practiceCompleted: 0,
          xpEarned: 0,
          coinsEarned: 0,
          studyMinutes: 0,
          completionPercentage: 0,
          perfectDay: false,
          learningSessions: 0,
          firstActivity: null,
          lastActivity: null,
          logs: [],
        },
      });
    }

    const logs = daily.logs || [];
    const firstActivity = logs.length > 0 ? logs[0].createdAt : null;
    const lastActivity = logs.length > 0 ? logs[logs.length - 1].createdAt : null;
    const learningSessions = logs.length;
    const completionPercentage = daily.xpEarned > 0 ? Math.min(100, Math.round((daily.xpEarned / 300) * 100)) : 0;

    return NextResponse.json({
      success: true,
      activity: {
        id: daily.id,
        date: daily.date,
        lessonsCompleted: daily.lessonCompleted,
        quizCompleted: daily.quizCompleted,
        challengeCompleted: daily.challengeCompleted,
        assessmentCompleted: daily.assessmentCompleted,
        projectsCompleted: daily.projectCompleted,
        practiceCompleted: daily.practiceCompleted,
        xpEarned: daily.xpEarned,
        coinsEarned: daily.coinsEarned,
        studyMinutes: daily.studyMinutes,
        dailyGoalCompleted: daily.dailyGoalCompleted,
        perfectDay: daily.perfectDay,
        completionPercentage,
        learningSessions,
        firstActivity,
        lastActivity,
        logs,
      },
    });
  } catch (error: any) {
    console.error("Error in GET /api/activity/date/[date]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch date activity." },
      { status: 500 }
    );
  }
}
