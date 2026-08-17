import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name, otp } = await req.json();

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
        { success: false, error: "Invalid 6-digit OTP code. Please check and try again." },
        { status: 400 }
      );
    }

    // Note: We DO NOT delete the OTP here! 
    // We leave it in the database so that the subsequent nextAuthSignIn("credentials") 
    // call can verify it again and delete it to establish the NextAuth session.

    // 3. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: emailStr },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists." },
        { status: 400 }
      );
    }

    // 4. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create User
    const newUser = await prisma.user.create({
      data: {
        email: emailStr,
        name: name || emailStr.split("@")[0],
        password: hashedPassword,
        twoFactorEnabled: true, // They verified email via OTP, so they have 2FA enabled
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully!",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error: any) {
    console.error("Error in registration route:", error);
    return NextResponse.json(
      { success: false, error: "Server error during registration." },
      { status: 500 }
    );
  }
}
