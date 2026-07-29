import { NextResponse } from "next/server";
import { auth } from "@/auth";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id || "test_user_id";

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required payment parameters" }, { status: 400 });
    }

    // Find the purchase record
    const purchase = await prisma.purchase.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
    });

    if (!purchase) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (purchase.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized access to order" }, { status: 403 });
    }

    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      // Payment verification failed
      await prisma.purchase.update({
        where: { razorpayOrderId: razorpay_order_id },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Success
    await prisma.purchase.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: "SUCCESS",
        razorpayPaymentId: razorpay_payment_id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
