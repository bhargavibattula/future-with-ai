import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/authenticated-user";
import { prisma } from "@/lib/prisma";
import { resolvePersistentLesson } from "@/lib/course-identity";

async function resolveLesson(lessonId: string, request: Request) {
  const courseSlug = new URL(request.url).searchParams.get("courseSlug")?.trim();
  if (courseSlug) {
    return resolvePersistentLesson(courseSlug, lessonId);
  }

  return { id: lessonId };
}

export async function DELETE(
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
    const lesson = await resolveLesson(lessonId, request);
    if (!lesson) {
      return NextResponse.json(
        { success: false, error: "Lesson not found." },
        { status: 404 },
      );
    }

    const deleted = await prisma.bookmark.deleteMany({
      where: { userId, lessonId: lesson.id },
    });

    return NextResponse.json({
      success: true,
      bookmarked: false,
      deleted: deleted.count > 0,
    });
  } catch (error) {
    console.error("Error in DELETE /api/bookmarks/[lessonId]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove bookmark." },
      { status: 500 },
    );
  }
}
