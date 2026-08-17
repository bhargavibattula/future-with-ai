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

// GET: Fetch all categories with prompt counts
export async function GET() {
  const isAuthorized = await verifyAdminAccess();
  if (!isAuthorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin access required." },
      { status: 401 }
    );
  }

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
  } catch (error: any) {
    console.error("Error fetching prompt categories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch prompt categories." },
      { status: 500 }
    );
  }
}

// POST: Create a new prompt category
export async function POST(req: Request) {
  const isAuthorized = await verifyAdminAccess();
  if (!isAuthorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin access required." },
      { status: 401 }
    );
  }

  try {
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

    // Check for duplicate category name
    const existing = await prisma.promptCategory.findFirst({
      where: {
        name: {
          equals: trimmedName,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "A category with this name already exists." },
        { status: 400 }
      );
    }

    const category = await prisma.promptCategory.create({
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

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        category,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating prompt category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create category." },
      { status: 500 }
    );
  }
}
