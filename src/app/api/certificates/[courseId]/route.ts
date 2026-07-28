import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: any }
) {
  try {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    const courseId = resolvedParams?.courseId;
    const { searchParams } = new URL(req.url);
    const inputUserId = (searchParams.get("userId") || "usr_demo_learner").trim();

    if (!courseId) {
      return NextResponse.json(
        { success: false, error: "Course ID is required." },
        { status: 400 }
      );
    }

    const cleanCourseId = courseId.toLowerCase().startsWith("course-")
      ? courseId
      : `course-${courseId}`;

    // Find User by ID or email
    const userRecord = await prisma.user.findFirst({
      where: {
        OR: [
          { id: inputUserId },
          { email: inputUserId },
        ],
      },
    }).catch(() => null);

    const validUserId = userRecord?.id || inputUserId;

    let certificate: any = null;
    try {
      certificate = await prisma.certificate.findFirst({
        where: {
          courseId: cleanCourseId,
          OR: [
            { userId: validUserId },
            { userId: inputUserId },
          ],
        },
      });
    } catch (dbErr) {
      console.warn("Database lookup warning for certificate:", dbErr);
    }

    if (!certificate) {
      return NextResponse.json({
        success: true,
        certificate: null,
        message: "No certificate generated yet for this course.",
      });
    }

    return NextResponse.json({
      success: true,
      certificate,
    });
  } catch (error: any) {
    console.error("Error fetching course certificate:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error fetching certificate." },
      { status: 500 }
    );
  }
}
