import { NextResponse } from "next/server";
import { auth } from "@/auth";
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

    const activities = await prisma.dailyActivity.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 30,
      include: { logs: true },
    });

    return NextResponse.json({ success: true, activities });
  } catch (error: any) {
    console.error("Error in GET /api/activity:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch activity data." },
      { status: 500 }
    );
  }
}
