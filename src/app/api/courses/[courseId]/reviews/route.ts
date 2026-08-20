import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const { courseId } = await params;
    if (!courseId) return NextResponse.json({ reviews: [], avgRating: 0, count: 0 });

    const course = await (prisma as any).course.findUnique({ where: { id: courseId } });
    if (!course) return NextResponse.json({ error: "Course not found." }, { status: 404 });

    const reviews = await (prisma as any).review.findMany({ where: { courseId }, include: { user: { select: { id: true, name: true, email: true, image: true } } }, orderBy: { createdAt: "desc" } });

    const agg = await (prisma as any).review.aggregate({ where: { courseId }, _avg: { rating: true }, _count: { _all: true } });

    return NextResponse.json({ reviews, avgRating: agg._avg.rating || 0, count: agg._count._all || reviews.length });
  } catch (err: any) {
    console.error("GET /api/courses/[courseId]/reviews error:", err);
    return NextResponse.json({ reviews: [], avgRating: 0, count: 0, error: "Failed to fetch reviews." }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const session = await auth();
    let userId = session?.user?.id;
    if (!userId && session?.user?.email) {
      const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (dbUser) userId = dbUser.id;
    }
    if (!userId) return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });

    const { courseId } = await params;
    if (!courseId) return NextResponse.json({ success: false, error: "Missing courseId." }, { status: 400 });

    const course = await (prisma as any).course.findUnique({ where: { id: courseId } });
    if (!course) return NextResponse.json({ success: false, error: "Course not found." }, { status: 404 });

    const body = await req.json();
    const rating = Number(body?.rating || 0);
    const text = String(body?.text || "").trim();

    if (!rating || rating < 1 || rating > 5) return NextResponse.json({ success: false, error: "Invalid rating." }, { status: 400 });
    if (text.length > 2000) return NextResponse.json({ success: false, error: "Review text too long." }, { status: 400 });

    // Prevent duplicate review per user & course
    const existing = await (prisma as any).review.findUnique({ where: { userId_courseId: { userId, courseId } } }).catch(() => null);
    if (existing) return NextResponse.json({ success: false, error: "You have already reviewed this course." }, { status: 409 });

    const created = await (prisma as any).review.create({ data: { userId, courseId, rating, text } });

    return NextResponse.json({ success: true, review: created });
  } catch (err: any) {
    console.error("POST /api/courses/[courseId]/reviews error:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed to submit review." }, { status: 500 });
  }
}
