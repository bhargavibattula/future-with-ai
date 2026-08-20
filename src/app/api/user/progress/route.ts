import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    let userId = session?.user?.id;

    // Try NextAuth session email
    if (!userId && session?.user?.email) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (dbUser) userId = dbUser.id;
    }

    // Try custom auth: X-User-Email header from frontend
    if (!userId) {
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

    const progress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      xp: progress?.totalXP || 0,
      streak: progress?.currentStreak || 0,
    });
  } catch (error: any) {
    console.error("Error in GET /api/user/progress:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch user progress." },
      { status: 500 }
    );
  }
}
