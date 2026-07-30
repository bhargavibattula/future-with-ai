import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ reminders: [] }, { status: 200 });
    }

    const reminders = await prisma.reminder.findMany({
      where: {
        userId,
        dismissed: false,
      },
      orderBy: { createdAt: "desc" },
      take: 15,
    });

    return NextResponse.json({ reminders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return NextResponse.json({ reminders: [], error: "Failed to fetch reminders" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, read, dismissed, markAllRead } = body;

    if (markAllRead) {
      await prisma.reminder.updateMany({
        where: { userId, read: false },
        data: { read: true },
      });
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!id) {
      return NextResponse.json({ error: "Missing reminder ID" }, { status: 400 });
    }

    const updateData: { read?: boolean; dismissed?: boolean } = {};
    if (typeof read === "boolean") updateData.read = read;
    if (typeof dismissed === "boolean") updateData.dismissed = dismissed;

    const updated = await prisma.reminder.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ reminder: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating reminder:", error);
    return NextResponse.json({ error: "Failed to update reminder" }, { status: 500 });
  }
}
