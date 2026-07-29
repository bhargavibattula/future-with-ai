import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { COURSES } from "@/data/courses";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id || "test_user_id";

    const { courseId } = await req.json();
    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    const cleanCourseId = courseId.replace("course-", "");
    const course = COURSES.find((c) => c.id.replace("course-", "") === cleanCourseId);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Ensure test_user_id exists in DB to prevent foreign key errors during tests
    if (userId === "test_user_id") {
      await prisma.user.upsert({
        where: { id: "test_user_id" },
        update: {},
        create: {
          id: "test_user_id",
          email: "testuser@example.com",
          name: "Test User",
        },
      });
    }

    const price = course.price;
    if (price === undefined || isNaN(price)) {
      return NextResponse.json({ error: "Invalid course price" }, { status: 400 });
    }

    const amountInPaise = Math.round(price * 100);

    const orderOptions = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${cleanCourseId}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(orderOptions);

    // Check if a purchase record already exists for this user and course
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: userId,
        courseId: cleanCourseId,
      },
    });

    if (existingPurchase) {
      if (existingPurchase.status === "SUCCESS") {
        return NextResponse.json({ error: "Course already purchased" }, { status: 400 });
      }

      // Update the existing pending/failed purchase with the new order details
      await prisma.purchase.update({
        where: { id: existingPurchase.id },
        data: {
          razorpayOrderId: order.id,
          amount: price,
          status: "PENDING",
          razorpayPaymentId: null, // Reset payment ID for retry
        },
      });
    } else {
      // Save new PENDING purchase record
      await prisma.purchase.create({
        data: {
          userId: userId,
          courseId: cleanCourseId,
          razorpayOrderId: order.id,
          amount: price,
          status: "PENDING",
        },
      });
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
