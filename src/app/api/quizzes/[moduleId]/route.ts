import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;

    const quiz = await prisma.quiz.findUnique({
      where: { moduleId },
      include: {
        questions: {
          orderBy: { orderIndex: "asc" }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json(
        { success: false, error: "Quiz not found" },
        { status: 404 }
      );
    }

    // Sanitize the questions to prevent users from seeing the correct answer in the network tab
    const sanitizedQuestions = quiz.questions.map(q => {
      let parsedOptions = null;
      if (q.options) {
        parsedOptions = typeof q.options === "string" ? JSON.parse(q.options) : q.options;
      }
      return {
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        codeSnippet: q.codeSnippet,
        options: parsedOptions,
        orderIndex: q.orderIndex,
      };
    });

    return NextResponse.json({
      success: true,
      quiz: {
        id: quiz.id,
        moduleId: quiz.moduleId,
        title: quiz.title,
        description: quiz.description,
        xpReward: quiz.xpReward,
        questions: sanitizedQuestions
      }
    });
  } catch (error: any) {
    console.error("Failed to fetch quiz:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
