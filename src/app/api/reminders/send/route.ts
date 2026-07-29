import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sendStreakReminder } from "@/lib/learning-journey";
import { prisma } from "@/lib/prisma";

export async function POST() {
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

    const result = await sendStreakReminder(userId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error in POST /api/reminders/send:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to trigger reminder." },
      { status: 500 }
    );
  }
}
