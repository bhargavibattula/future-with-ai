import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
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

    const prompt = await prisma.prompt.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt not found." },
        { status: 404 }
      );
    }

    // Get current user session
    const session = await auth();
    let isClaimed = false;

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
        const claim = await prisma.promptClaim.findUnique({
          where: {
            userId_promptId: {
              userId: user.id,
              promptId: prompt.id,
            },
          },
        });
        if (claim) {
          isClaimed = true;
        }
      }
    }

    return NextResponse.json({
      success: true,
      prompt,
      isClaimed,
    });
  } catch (error: any) {
    console.error("Error fetching prompt detail:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch prompt details." },
      { status: 500 }
    );
  }
}
