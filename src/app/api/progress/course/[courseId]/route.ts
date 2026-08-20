import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
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
      // Try custom auth: X-User-Email header from frontend
      const emailHeader = req.headers.get("X-User-Email");
      if (emailHeader) {
        const dbUser = await prisma.user.findUnique({
          where: { email: emailHeader.toLowerCase().trim() },
        });
        if (dbUser) userId = dbUser.id;
      }
    }

    if (!userId) {
      return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });
    }

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
