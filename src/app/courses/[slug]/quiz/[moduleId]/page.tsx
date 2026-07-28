import React from "react";
import CourseQuizClient from "./CourseQuizClient";
import { getCoursePathData } from "@/data/coursePathData";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; moduleId: string }>;
}): Promise<Metadata> {
  const { slug, moduleId } = await params;
  const pathData = getCoursePathData(slug);
  const targetModule = pathData.modules.find((m) => m.id === moduleId);

  return {
    title: `${targetModule ? targetModule.quiz?.title || targetModule.title + " Quiz" : "Quiz"} — ${pathData.course.title}`,
    description: targetModule ? targetModule.description : pathData.course.description,
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string; moduleId: string }>;
}) {
  const { slug, moduleId } = await params;

  return <CourseQuizClient slug={slug} moduleId={moduleId} />;
}
