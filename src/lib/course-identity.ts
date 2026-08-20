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

export type PersistentLesson = Prisma.CourseLessonGetPayload<{
  include: {
    module: {
      include: { course: true };
    };
  };
}>;

export async function resolvePersistentLesson(
  slug: string,
  staticLessonId: string,
): Promise<PersistentLesson | null> {
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

  return prisma.$transaction(async (tx) => {
    const course = await tx.course.upsert({
      where: { slug: cleanSlug },
      update: {
        title: pathData.course.title,
        description: pathData.course.description,
        duration: pathData.course.duration,
        image: pathData.course.image,
        tags: Array.from(pathData.course.tags),
      },
      create: {
        slug: cleanSlug,
        title: pathData.course.title,
        description: pathData.course.description,
        duration: pathData.course.duration,
        image: pathData.course.image,
        tags: Array.from(pathData.course.tags),
      },
    });

      const persistentModule = await tx.courseModule.upsert({
      where: {
        courseId_staticId: {
          courseId: course.id,
          staticId: parentModule.id,
        },
      },
      update: {
        order: parentModule.order,
        title: parentModule.title,
        subtitle: parentModule.subtitle,
        description: parentModule.description,
        duration: parentModule.duration,
        xp: parentModule.xp,
      },
      create: {
        courseId: course.id,
        staticId: parentModule.id,
        order: parentModule.order,
        title: parentModule.title,
        subtitle: parentModule.subtitle,
        description: parentModule.description,
        duration: parentModule.duration,
        xp: parentModule.xp,
      },
    });

    await tx.courseLesson.upsert({
      where: {
        moduleId_staticId: {
            moduleId: persistentModule.id,
          staticId: staticLesson.id,
        },
      },
      update: {
        order: staticLesson.order,
        title: staticLesson.title,
        subtitle: staticLesson.subtitle,
        description: staticLesson.description,
        estimatedDuration: staticLesson.estimatedDuration,
        readingTimeMinutes: staticLesson.readingTimeMinutes,
        type: staticLesson.type,
        xpReward: staticLesson.xpReward || 0,
      },
      create: {
          moduleId: persistentModule.id,
        staticId: staticLesson.id,
        order: staticLesson.order,
        title: staticLesson.title,
        subtitle: staticLesson.subtitle,
        description: staticLesson.description,
        estimatedDuration: staticLesson.estimatedDuration,
        readingTimeMinutes: staticLesson.readingTimeMinutes,
        type: staticLesson.type,
        xpReward: staticLesson.xpReward || 0,
      },
    });

    return tx.courseLesson.findUniqueOrThrow({
      where: {
        moduleId_staticId: {
            moduleId: persistentModule.id,
          staticId: staticLesson.id,
        },
      },
      include: {
        module: {
          include: { course: true },
        },
      },
    });
  });
}
