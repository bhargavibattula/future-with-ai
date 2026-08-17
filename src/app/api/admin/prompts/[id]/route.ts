import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { auth } from "@/auth";

async function verifyAdminAccess() {
  try {
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get("future_ai_admin_session");
    if (adminCookie?.value) {
      return true;
    }
    const session = await auth();
    if (
      session?.user &&
      ((session.user as any).role === "Admin" ||
        (session.user as any).role === "Super Admin")
    ) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error verifying admin access:", error);
    return false;
  }
}

// PATCH/PUT: Update a prompt
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuthorized = await verifyAdminAccess();
  if (!isAuthorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin access required." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Prompt ID is required." },
        { status: 400 }
      );
    }

    const existingPrompt = await prisma.prompt.findUnique({
      where: { id },
    });

    if (!existingPrompt) {
      return NextResponse.json(
        { success: false, error: "Prompt not found." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { title, content, categoryId, type } = body || {};

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Prompt title is required." },
        { status: 400 }
      );
    }

    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { success: false, error: "Prompt content is required." },
        { status: 400 }
      );
    }

    if (typeof categoryId !== "string" || !categoryId.trim()) {
      return NextResponse.json(
        { success: false, error: "Prompt category is required." },
        { status: 400 }
      );
    }

    const validTypes = ["FREE", "PREMIUM", "ONE_TIME_PREMIUM"];
    const promptType = validTypes.includes(type) ? type : existingPrompt.type;

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedCategoryId = categoryId.trim();

    // Verify category exists
    const categoryExists = await prisma.promptCategory.findUnique({
      where: { id: trimmedCategoryId },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { success: false, error: "Selected category does not exist." },
        { status: 400 }
      );
    }

    const updatedPrompt = await prisma.prompt.update({
      where: { id },
      data: {
        title: trimmedTitle,
        content: trimmedContent,
        type: promptType as any,
        categoryId: trimmedCategoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Prompt updated successfully",
      prompt: updatedPrompt,
    });
  } catch (error: any) {
    console.error("Error updating prompt:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update prompt." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a prompt
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuthorized = await verifyAdminAccess();
  if (!isAuthorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin access required." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Prompt ID is required." },
        { status: 400 }
      );
    }

    const existingPrompt = await prisma.prompt.findUnique({
      where: { id },
    });

    if (!existingPrompt) {
      return NextResponse.json(
        { success: false, error: "Prompt not found." },
        { status: 404 }
      );
    }

    // Safely delete prompt (PromptClaim records cascade automatically per Prisma schema)
    await prisma.prompt.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Prompt deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting prompt:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete prompt." },
      { status: 500 }
    );
  }
}
