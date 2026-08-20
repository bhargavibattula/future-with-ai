import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const language = searchParams.get("language");
    const minDuration = searchParams.get("minDuration");
    const maxDuration = searchParams.get("maxDuration");

    // Build the where clause dynamically
    const where: any = {
      isPublished: true,
    };

    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = {
        name: { equals: category, mode: "insensitive" }
      };
    }

    if (difficulty) {
      where.difficulty = { equals: difficulty, mode: "insensitive" };
    }

    if (language) {
      where.language = { equals: language, mode: "insensitive" };
    }

    if (minDuration || maxDuration) {
      where.duration = {};
      if (minDuration) {
        where.duration.gte = parseInt(minDuration, 10);
      }
      if (maxDuration) {
        where.duration.lte = parseInt(maxDuration, 10);
      }
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: courses,
      count: courses.length,
    });
  } catch (error) {
    console.error("[COURSE_SEARCH_GET]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
