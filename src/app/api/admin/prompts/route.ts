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

// GET: Fetch all prompts with their associated category
export async function GET() {
  const isAuthorized = await verifyAdminAccess();
  if (!isAuthorized) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin access required." },
      { status: 401 }
    );
  }

  try {
    const prompts = await prisma.prompt.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      prompts,
    });
  } catch (error: any) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch prompts." },
      { status: 500 }
    );
  }
}

// POST: Create a new prompt
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
    const { title, content, categoryId, type } = body || {};

    // Validate inputs
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

    // Validate PromptType enum if provided
    const validTypes = ["FREE", "PREMIUM", "ONE_TIME_PREMIUM"];
    const promptType = validTypes.includes(type) ? type : "FREE";

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedCategoryId = categoryId.trim();

    // Verify category existence
    const categoryExists = await prisma.promptCategory.findUnique({
      where: { id: trimmedCategoryId },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { success: false, error: "Selected category does not exist." },
        { status: 400 }
      );
    }

    const prompt = await prisma.prompt.create({
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

    return NextResponse.json(
      {
        success: true,
        message: "Prompt created successfully",
        prompt,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating prompt:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create prompt." },
      { status: 500 }
    );
  }
}
