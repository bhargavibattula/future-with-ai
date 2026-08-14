import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, otp } = await req.json();

    if (!email || !password || !otp) {
      return NextResponse.json(
        { success: false, error: "Email, password, and OTP are required." },
        { status: 400 }
      );
    }

    const emailStr = email.toLowerCase().trim();

    // 1. Verify OTP
    const storedToken = await prisma.verificationToken.findFirst({
      where: { identifier: emailStr },
    });

    if (!storedToken) {
      return NextResponse.json(
        { success: false, error: "No OTP found or code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    if (Date.now() > storedToken.expires.getTime()) {
      await prisma.verificationToken.delete({
        where: { token: storedToken.token },
      });
      return NextResponse.json(
        { success: false, error: "OTP has expired. Please request a new code." },
        { status: 400 }
      );
    }

    if (storedToken.token !== otp.toString().trim()) {
      return NextResponse.json(
        { success: false, error: "Invalid 6-digit OTP code." },
        { status: 400 }
      );
    }

    // 2. Hash New Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Update User
    const updatedUser = await prisma.user.update({
      where: { email: emailStr },
      data: { password: hashedPassword },
    });

    // 4. Do not delete the OTP here, let nextAuthSignIn consume it during auto-login
    // await prisma.verificationToken.delete({
    //   where: { token: storedToken.token },
    // });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (error: any) {
    console.error("Error in reset password route:", error);
    
    // Handle case where user does not exist
    if (error.code === 'P2025') {
        return NextResponse.json(
            { success: false, error: "User not found." },
            { status: 404 }
        );
    }

    return NextResponse.json(
      { success: false, error: "Server error during password reset." },
      { status: 500 }
    );
  }
}
