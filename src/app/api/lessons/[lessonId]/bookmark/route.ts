import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/authenticated-user";
import { prisma } from "@/lib/prisma";
import { resolvePersistentLesson } from "@/lib/course-identity";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> },
) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    const { lessonId } = await params;
    const courseSlug = new URL(request.url).searchParams.get("courseSlug")?.trim();
    const lesson = courseSlug
      ? await resolvePersistentLesson(courseSlug, lessonId)
      : await prisma.courseLesson.findUnique({ where: { id: lessonId } });

    if (!lesson) {
      return NextResponse.json(
        { success: false, error: "Lesson not found." },
        { status: 404 },
      );
    }

    const bookmark = await prisma.bookmark.findUnique({
      where: { userId_lessonId: { userId, lessonId: lesson.id } },
      select: { id: true, createdAt: true, updatedAt: true },
    });

    return NextResponse.json({
      success: true,
      bookmarked: Boolean(bookmark),
      bookmark,
    });
  } catch (error) {
    console.error("Error in GET /api/lessons/[lessonId]/bookmark:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load bookmark state." },
      { status: 500 },
    );
  }
}
