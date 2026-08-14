import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp, peek } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Email and OTP are required." },
        { status: 400 }
      );
    }

    const stored = await prisma.verificationToken.findFirst({
      where: { identifier: email.toLowerCase() },
    });

    if (!stored) {
      return NextResponse.json(
        { success: false, error: "No OTP found or code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    if (Date.now() > stored.expires.getTime()) {
      await prisma.verificationToken.delete({
        where: { token: stored.token },
      });
      return NextResponse.json(
        { success: false, error: "OTP has expired. Please request a new code." },
        { status: 400 }
      );
    }

    if (stored.token !== otp.toString().trim()) {
      return NextResponse.json(
        { success: false, error: "Invalid 6-digit OTP code. Please check and try again." },
        { status: 400 }
      );
    }

    // OTP Verified successfully! Remove used OTP from database unless peek is true.
    if (!peek) {
      await prisma.verificationToken.delete({
        where: { token: stored.token },
      });
    }

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully!",
    });
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { success: false, error: "Verification failed." },
      { status: 500 }
    );
  }
}
