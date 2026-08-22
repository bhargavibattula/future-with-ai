import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  getCoursePathData,
  UserCourseProgressState,
} from "@/data/coursePathData";

const EMPTY_PROGRESS: UserCourseProgressState = {
  completedLessonIds: [],
  completedModuleIds: [],
  quizScores: {},
  totalXp: 0,
  currentStreakDays: 0,
  lastActiveDate: new Date(0).toISOString(),
};

// Legacy type removed since CourseLesson no longer exists in Prisma schema

export async function resolvePersistentLesson(
  slug: string,
  staticLessonId: string,
): Promise<{ id: string } | null> {
  const cleanSlug = slug.toLowerCase().replace(/^course-/, "");
  const pathData = getCoursePathData(cleanSlug, EMPTY_PROGRESS);
  const parentModule = pathData.modules.find((module) =>
    module.lessons.some((lesson) => lesson.id === staticLessonId),
  );
  const staticLesson = parentModule?.lessons.find(
    (lesson) => lesson.id === staticLessonId,
  );

  if (!parentModule || !staticLesson) {
    return null;
  }

  return { id: staticLesson.id };
}
