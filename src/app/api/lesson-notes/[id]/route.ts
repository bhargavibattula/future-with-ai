import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function getAuthenticatedUserId(): Promise<string | null> {
  const session = await auth();
  let userId = session?.user?.id;
  if (!userId && session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    userId = user?.id;
  }
  return userId || null;
}

/** PUT /api/lesson-notes/[id] — update a note */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content?.trim()) {
      return NextResponse.json({ success: false, error: "Content is required." }, { status: 400 });
    }

    // Verify ownership
    const existing = await prisma.lessonNote.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Note not found." }, { status: 404 });
    }

    if (existing.userId !== userId) {
      return NextResponse.json({ success: false, error: "Access denied." }, { status: 403 });
    }

    const note = await prisma.lessonNote.update({
      where: { id },
      data: { content: content.trim() },
      select: { id: true, content: true, createdAt: true, updatedAt: true },
    });

    return NextResponse.json({ success: true, note });
  } catch (error) {
    console.error("Error in PUT /api/lesson-notes/[id]:", error);
    return NextResponse.json({ success: false, error: "Failed to update note." }, { status: 500 });
  }
}

/** DELETE /api/lesson-notes/[id] — delete a note */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.lessonNote.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Note not found." }, { status: 404 });
    }

    if (existing.userId !== userId) {
      return NextResponse.json({ success: false, error: "Access denied." }, { status: 403 });
    }

    await prisma.lessonNote.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Note deleted." });
  } catch (error) {
    console.error("Error in DELETE /api/lesson-notes/[id]:", error);
    return NextResponse.json({ success: false, error: "Failed to delete note." }, { status: 500 });
  }
}
