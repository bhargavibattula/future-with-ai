import { NextResponse } from "next/server";
import { getAuthenticatedUserId } from "@/lib/authenticated-user";
import { prisma } from "@/lib/prisma";
import { resolvePersistentLesson } from "@/lib/course-identity";

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const courseSlug = String(body?.courseSlug || "").trim();
    const staticLessonId = String(body?.lessonId || "").trim();

    if (!courseSlug || !staticLessonId) {
      return NextResponse.json(
        { success: false, error: "courseSlug and lessonId are required." },
        { status: 400 },
      );
    }

    const lesson = await resolvePersistentLesson(courseSlug, staticLessonId);
    if (!lesson) {
      return NextResponse.json(
        { success: false, error: "Lesson not found." },
        { status: 404 },
      );
    }

    const bookmark = await prisma.bookmark.upsert({
      where: { userId_lessonId: { userId, lessonId: lesson.id } },
      update: {},
      create: { userId, lessonId: lesson.id },
      select: {
        id: true,
        lessonId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      bookmarked: true,
      bookmark: {
        ...bookmark,
        courseSlug: lesson.module.course.slug,
        staticLessonId: lesson.staticId,
      },
    });
  } catch (error) {
    console.error("Error in POST /api/bookmarks:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save bookmark." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: {
        id: true,
        lessonId: true,
        createdAt: true,
        lesson: {
          select: {
            id: true,
            staticId: true,
            title: true,
            description: true,
            estimatedDuration: true,
            module: {
              select: {
                staticId: true,
                title: true,
                course: {
                  select: { slug: true, title: true },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      bookmarks: bookmarks.map((bookmark) => ({
        id: bookmark.id,
        lessonId: bookmark.lessonId,
        createdAt: bookmark.createdAt,
        lesson: {
          id: bookmark.lesson.id,
          staticId: bookmark.lesson.staticId,
          title: bookmark.lesson.title,
          description: bookmark.lesson.description,
          estimatedDuration: bookmark.lesson.estimatedDuration,
          module: bookmark.lesson.module,
        },
      })),
    });
  } catch (error) {
    console.error("Error in GET /api/bookmarks:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load bookmarks." },
      { status: 500 },
    );
  }
}
