import React from "react";
import CoursePathClient from "./CoursePathClient";
import { getCoursePathData } from "@/data/coursePathData";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pathData = getCoursePathData(slug);

  return {
    title: `${pathData.course.title} Course Learning Path — Future.ai`,
    description: pathData.course.description,
  };
}

export default async function CoursePathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CoursePathClient slug={slug} />;
}
