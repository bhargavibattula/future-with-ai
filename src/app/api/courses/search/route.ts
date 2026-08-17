import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || "";
    const category = url.searchParams.get("category");
    const difficulty = url.searchParams.get("difficulty");
    const language = url.searchParams.get("language");
    const duration = url.searchParams.get("duration");

    const where: any = {};
    const and: any[] = [];

    if (q) {
      const qLower = q;
      and.push({ OR: [
        { title: { contains: qLower, mode: "insensitive" } },
        { description: { contains: qLower, mode: "insensitive" } },
        { tags: { has: qLower } },
      ] });
    }
    if (category) and.push({ category: { equals: category } });
    if (difficulty) and.push({ difficulty: { equals: difficulty } });
    if (language) and.push({ language: { equals: language } });
    if (duration) and.push({ duration: { contains: duration } });

    if (and.length > 0) where.AND = and;

    const courses = await (prisma as any).course.findMany({ where, orderBy: { createdAt: "desc" }, take: 100 });

    return NextResponse.json({ courses });
  } catch (err: any) {
    console.error("GET /api/courses/search error:", err);
    return NextResponse.json({ courses: [], error: "Search failed." }, { status: 500 });
  }
}
