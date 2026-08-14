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

    // Parallelize category fetch and auth session lookup
    const [category, session] = await Promise.all([
      prisma.promptCategory.findUnique({
        where: { id: categoryId },
      }),
      auth().catch(() => null),
    ]);

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    // Resolve user ID efficiently if session exists
    let currentUserId: string | null = null;
    if (session?.user?.id || session?.user?.email) {
      const userWhere = session.user.id
        ? { id: session.user.id }
        : { email: session.user.email as string };

      const user = await prisma.user.findFirst({
        where: userWhere,
        select: { id: true },
      });
      if (user) {
        currentUserId = user.id;
      }
    }

    // Fetch prompts in this category with targeted select
    const prompts = await prisma.prompt.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        type: true,
        categoryId: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // If user is logged in, fetch user claims for these prompts
    let claimedPromptIds = new Set<string>();
    if (currentUserId && prompts.length > 0) {
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
