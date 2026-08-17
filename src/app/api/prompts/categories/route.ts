import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.promptCategory.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        _count: {
          select: { prompts: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error: any) {
    console.error("Error fetching prompt categories:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch prompt categories." },
      { status: 500 }
    );
  }
}
