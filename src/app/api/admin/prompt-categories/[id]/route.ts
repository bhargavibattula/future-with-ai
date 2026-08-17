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

// PATCH/PUT: Update a prompt category
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
        { success: false, error: "Category ID is required." },
        { status: 400 }
      );
    }

    const existingCategory = await prisma.promptCategory.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const rawName = body?.name;
    const rawDescription = body?.description;

    if (typeof rawName !== "string" || !rawName.trim()) {
      return NextResponse.json(
        { success: false, error: "Category name is required." },
        { status: 400 }
      );
    }

    const trimmedName = rawName.trim();
    const trimmedDescription =
      typeof rawDescription === "string" ? rawDescription.trim() : null;

    // Check for duplicate category name excluding the current record
    const duplicate = await prisma.promptCategory.findFirst({
      where: {
        id: { not: id },
        name: {
          equals: trimmedName,
        },
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { success: false, error: "A category with this name already exists." },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.promptCategory.update({
      where: { id },
      data: {
        name: trimmedName,
        description: trimmedDescription || null,
      },
      include: {
        _count: {
          select: { prompts: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error: any) {
    console.error("Error updating prompt category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update category." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a prompt category
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
        { success: false, error: "Category ID is required." },
        { status: 400 }
      );
    }

    const existingCategory = await prisma.promptCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { prompts: true },
        },
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    // Safety rule: Cannot delete category if prompts are assigned to it
    const promptsCount = existingCategory._count?.prompts ?? 0;
    if (promptsCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot delete category because prompts are assigned to it.",
        },
        { status: 400 }
      );
    }

    await prisma.promptCategory.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting prompt category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete category." },
      { status: 500 }
    );
  }
}
