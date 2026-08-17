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
    return NextResponse.json({
      success: true,
      achievements: data.achievements,
      unlocked: data.userAchievements,
    });
  } catch (error: any) {
    console.error("Error in GET /api/achievements:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch achievements." },
      { status: 500 }
    );
  }
}
