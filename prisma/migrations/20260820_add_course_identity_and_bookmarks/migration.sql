CREATE TABLE IF NOT EXISTS "CourseModule" (
  "id" TEXT PRIMARY KEY,
  "courseId" TEXT NOT NULL,
  "staticId" TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "subtitle" TEXT,
  "description" TEXT,
  "duration" TEXT,
  "xp" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "CourseModule_courseId_fkey"
    FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE,
  CONSTRAINT "CourseModule_courseId_staticId_key"
    UNIQUE ("courseId", "staticId")
);

CREATE INDEX IF NOT EXISTS "CourseModule_courseId_order_idx"
  ON "CourseModule" ("courseId", "order");

CREATE TABLE IF NOT EXISTS "CourseLesson" (
  "id" TEXT PRIMARY KEY,
  "moduleId" TEXT NOT NULL,
  "staticId" TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "subtitle" TEXT,
  "description" TEXT,
  "estimatedDuration" TEXT,
  "readingTimeMinutes" INTEGER,
  "type" TEXT NOT NULL,
  "xpReward" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "CourseLesson_moduleId_fkey"
    FOREIGN KEY ("moduleId") REFERENCES "CourseModule" ("id") ON DELETE CASCADE,
  CONSTRAINT "CourseLesson_moduleId_staticId_key"
    UNIQUE ("moduleId", "staticId")
);

CREATE INDEX IF NOT EXISTS "CourseLesson_moduleId_order_idx"
  ON "CourseLesson" ("moduleId", "order");

CREATE TABLE IF NOT EXISTS "Bookmark" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "lessonId" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "Bookmark_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
  CONSTRAINT "Bookmark_lessonId_fkey"
    FOREIGN KEY ("lessonId") REFERENCES "CourseLesson" ("id") ON DELETE CASCADE,
  CONSTRAINT "Bookmark_userId_lessonId_key"
    UNIQUE ("userId", "lessonId")
);

CREATE INDEX IF NOT EXISTS "Bookmark_userId_createdAt_idx"
  ON "Bookmark" ("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "Bookmark_lessonId_idx"
  ON "Bookmark" ("lessonId");
