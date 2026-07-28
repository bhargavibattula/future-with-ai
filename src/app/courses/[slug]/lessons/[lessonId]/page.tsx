import React from "react";
import CourseLessonClient from "./CourseLessonClient";
import { getCoursePathData } from "@/data/coursePathData";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}): Promise<Metadata> {
  const { slug, lessonId } = await params;
  const pathData = getCoursePathData(slug);
  const lesson = pathData.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.id === lessonId);

  return {
    title: `${lesson ? lesson.title : "Lesson"} — ${pathData.course.title}`,
    description: lesson ? lesson.description : pathData.course.description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;

  return <CourseLessonClient slug={slug} lessonId={lessonId} />;
}
