import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params;
    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: "Category ID is required." },
        { status: 400 }
      );
    }

    const category = await prisma.promptCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    // Get current user session if available
    const session = await auth();
    let currentUserId: string | null = null;

    if (session?.user) {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { id: session.user.id || "" },
            { email: session.user.email || "" },
          ],
        },
      });
      if (user) {
        currentUserId = user.id;
      }
    }

    // Fetch prompts in this category
    const prompts = await prisma.prompt.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
      },
    });

    // If user is logged in, fetch user claims
    let claimedPromptIds = new Set<string>();
    if (currentUserId) {
      const userClaims = await prisma.promptClaim.findMany({
        where: {
          userId: currentUserId,
          promptId: { in: prompts.map((p) => p.id) },
        },
        select: { promptId: true },
      });
      claimedPromptIds = new Set(userClaims.map((c) => c.promptId));
    }

    const promptsWithClaimStatus = prompts.map((prompt) => ({
      ...prompt,
      isClaimed: claimedPromptIds.has(prompt.id),
    }));

    return NextResponse.json({
      success: true,
      category,
      prompts: promptsWithClaimStatus,
    });
  } catch (error: any) {
    console.error("Error fetching category prompts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch category prompts." },
      { status: 500 }
    );
  }
}
