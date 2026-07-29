import React from "react";
import CoursePathClient from "./CoursePathClient";
import { getCoursePathData } from "@/data/coursePathData";
import { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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
  const cleanSlug = slug.toLowerCase().replace("course-", "");
  
  const session = await auth();
  const userId = session?.user?.id || "test_user_id";
  let isPurchased = false;

  const purchase = await prisma.purchase.findFirst({
    where: {
      userId: userId,
      courseId: cleanSlug,
      status: "SUCCESS",
    },
  });
  if (purchase) {
    isPurchased = true;
  }

  return <CoursePathClient slug={slug} isPurchased={isPurchased} />;
}
