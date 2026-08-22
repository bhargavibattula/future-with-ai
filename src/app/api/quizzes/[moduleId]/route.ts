import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { moduleId } = params;

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
    const sanitizedQuestions = quiz.questions.map(q => ({
      id: q.id,
      type: q.type,
      prompt: q.prompt,
      codeSnippet: q.codeSnippet,
      options: q.options ? JSON.parse(q.options as string) : null,
      orderIndex: q.orderIndex
    }));

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
