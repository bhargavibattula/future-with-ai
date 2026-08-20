import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { recordActivityCompletion, getUserDashboardData } from "@/lib/learning-journey";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
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

    const body = await req.json();
    if (!body || !body.activityType) {
      return NextResponse.json(
        { success: false, error: "activityType is required." },
        { status: 400 }
      );
    }

    const result = await recordActivityCompletion(userId, {
      activityType: body.activityType,
      activityId: body.activityId,
      courseId: body.courseId,
      lessonId: body.lessonId,
      xp: typeof body.xp === "number" ? body.xp : 50,
      coins: typeof body.coins === "number" ? body.coins : 20,
      timeSpent: typeof body.timeSpent === "number" ? body.timeSpent : 15,
      completionPercentage: typeof body.completionPercentage === "number" ? body.completionPercentage : 100,
    });

    const updatedDashboard = await getUserDashboardData(userId);

    return NextResponse.json({
      success: true,
      message: "Activity recorded successfully!",
      result,
      dashboard: updatedDashboard,
    });
  } catch (error: any) {
    console.error("Error in POST /api/activity/complete:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to record activity completion." },
      { status: 500 }
    );
  }
}
