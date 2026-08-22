import { NextResponse } from "next/server";
import { resolveAuthenticatedUserId, recordActivityCompletion } from "@/lib/learning-journey";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const userId = await resolveAuthenticatedUserId(req);


    // Await params per Next.js 16 requirements for dynamic route segments
    const resolvedParams = await params;
    const courseId = resolvedParams.courseId;
    if (!courseId) {
      return NextResponse.json({ success: false, error: "courseId is required." }, { status: 400 });
    }

    // Fetch the CourseEnrollment for the user and course
    let enrollment = await prisma.courseEnrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    // Also fetch their overall UserProgress to return total XP and Streak
    const userProgress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      enrollment: enrollment || {
        completedLessonIds: [],
        completedModuleIds: [],
        quizScores: {},
      },
      userProgress: userProgress || {
        totalXP: 0,
        currentStreak: 0,
      }
    });
  } catch (error: any) {
    console.error("Error in GET /api/progress/course/[courseId]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch course progress." },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const userId = await resolveAuthenticatedUserId(req);
    const resolvedParams = await params;
    const courseId = resolvedParams.courseId;
    const body = await req.json();

    const { action, lessonId, moduleId, quizId, score } = body || {};

    let actResult = null;
    if (action === "lessonComplete" && lessonId) {
      actResult = await recordActivityCompletion(userId, {
        activityType: "LESSON",
        courseId,
        lessonId,
        xp: 50,
        coins: 25,
        timeSpent: 15,
        completionPercentage: 100,
      });
    } else if (action === "quizComplete" && moduleId) {
      actResult = await recordActivityCompletion(userId, {
        activityType: "QUIZ",
        courseId,
        lessonId: moduleId,
        xp: 100,
        coins: 50,
        timeSpent: 15,
        completionPercentage: typeof score === "number" ? score : 100,
      });
    }

    // Return updated enrollment
    const enrollment = await prisma.courseEnrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    const userProgress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      enrollment,
      userProgress,
      activityResult: actResult,
    });
  } catch (error: any) {
    console.error("Error in POST /api/progress/course/[courseId]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update course progress." },
      { status: 500 }
    );
  }
}

