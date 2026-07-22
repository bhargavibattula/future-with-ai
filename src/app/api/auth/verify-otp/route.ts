import { NextResponse } from "next/server";
import { otpStore } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Email and OTP are required." },
        { status: 400 }
      );
    }

    const stored = otpStore.get(email.toLowerCase());

    if (!stored) {
      return NextResponse.json(
        { success: false, error: "No OTP found or code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email.toLowerCase());
      return NextResponse.json(
        { success: false, error: "OTP has expired. Please request a new code." },
        { status: 400 }
      );
    }

    if (stored.otp !== otp.toString().trim()) {
      return NextResponse.json(
        { success: false, error: "Invalid 6-digit OTP code. Please check and try again." },
        { status: 400 }
      );
    }

    // OTP Verified successfully! Remove used OTP from memory.
    otpStore.delete(email.toLowerCase());

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
