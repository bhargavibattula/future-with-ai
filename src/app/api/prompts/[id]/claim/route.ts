import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Prompt ID is required." },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required to copy or claim prompts." },
        { status: 401 }
      );
    }

    // Resolve User in database
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: session.user.id || "" },
          { email: session.user.email || "" },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User profile not found." },
        { status: 404 }
      );
    }

    // Verify Prompt existence
    const prompt = await prisma.prompt.findUnique({
      where: { id },
    });

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt not found." },
        { status: 404 }
      );
    }

    // Check if already claimed
    const existingClaim = await prisma.promptClaim.findUnique({
      where: {
        userId_promptId: {
          userId: user.id,
          promptId: prompt.id,
        },
      },
    });

    if (existingClaim) {
      return NextResponse.json(
        {
          success: false,
          isClaimed: true,
          error: "You have already claimed this prompt. It is locked for your account.",
        },
        { status: 400 }
      );
    }

    // Record new PromptClaim
    await prisma.promptClaim.create({
      data: {
        userId: user.id,
        promptId: prompt.id,
      },
    });

    return NextResponse.json({
      success: true,
      isClaimed: true,
      message: "Prompt content copied and claimed successfully!",
    });
  } catch (error: any) {
    console.error("Error creating prompt claim:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process prompt claim." },
      { status: 500 }
    );
  }
}
