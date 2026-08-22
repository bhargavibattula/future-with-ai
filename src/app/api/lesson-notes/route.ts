import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function getAuthenticatedUserId(): Promise<string | null> {
  const session = await auth();
  let userId = session?.user?.id;
  if (!userId && session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    userId = user?.id;
  }
  return userId || null;
}

/** GET /api/lesson-notes?lessonId=...&courseSlug=... */
export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const lessonStaticId = searchParams.get("lessonId");
    const courseSlug = searchParams.get("courseSlug");

    if (!lessonStaticId || !courseSlug) {
      return NextResponse.json({ success: false, error: "lessonId and courseSlug are required." }, { status: 400 });
    }

    // We use the static ID directly since there's no DB table for lessons in this branch
    const notes = await prisma.lessonNote.findMany({
      where: { userId, lessonId: lessonStaticId },
      orderBy: { createdAt: "desc" },
      select: { id: true, content: true, createdAt: true, updatedAt: true },
    });

    return NextResponse.json({ success: true, notes });
  } catch (error) {
    console.error("Error in GET /api/lesson-notes:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch notes." }, { status: 500 });
  }
}

/** POST /api/lesson-notes — create a new note */
export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });
    }

    const body = await request.json();
    const { lessonId: lessonStaticId, courseSlug, content } = body;

    if (!lessonStaticId || !courseSlug || !content?.trim()) {
      return NextResponse.json({ success: false, error: "lessonId, courseSlug, and content are required." }, { status: 400 });
    }

    // We use the static ID directly since there's no DB table for lessons in this branch
    const note = await prisma.lessonNote.create({
      data: { userId, lessonId: lessonStaticId, content: content.trim() },
      select: { id: true, content: true, createdAt: true, updatedAt: true },
    });

    return NextResponse.json({ success: true, note }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/lesson-notes:", error);
    return NextResponse.json({ success: false, error: "Failed to create note." }, { status: 500 });
  }
}
