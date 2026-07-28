import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.promptCategory.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { prompts: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("PROMPT CATEGORY ERROR:", error);

    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
}
