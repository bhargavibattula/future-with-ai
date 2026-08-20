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

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }

    const query = new URL(request.url).searchParams.get("q")?.trim() || "";
    if (query.length < 2) {
      return NextResponse.json({ success: true, recipients: [] });
    }

    const recipients = await prisma.user.findMany({
      where: {
        id: { not: userId },
        OR: [
          { name: { contains: query } },
          { email: { contains: query } },
        ],
      },
      orderBy: { name: "asc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return NextResponse.json({ success: true, recipients });
  } catch (error) {
    console.error("Error in GET /api/store/recipients:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search recipients." },
      { status: 500 },
    );
  }
}
