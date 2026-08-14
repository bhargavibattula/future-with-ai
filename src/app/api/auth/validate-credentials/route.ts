import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * POST /api/auth/validate-credentials
 * 
 * Validates email + password BEFORE sending OTP.
 * This prevents sending OTP emails when the password is wrong.
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Please provide both email and password." },
        { status: 400 }
      );
    }

    const emailStr = String(email).toLowerCase().trim();
    const passwordStr = String(password);

    // 1. Find the user
    const user = await prisma.user.findUnique({
      where: { email: emailStr },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 2. Validate password
    const isPasswordValid = await bcrypt.compare(passwordStr, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 3. Credentials are valid
    return NextResponse.json({
      success: true,
      message: "Credentials validated successfully.",
      twoFactorEnabled: user.twoFactorEnabled,
    });
  } catch (error: unknown) {
    console.error("Error validating credentials:", error);
    return NextResponse.json(
      { success: false, error: "Server error during credential validation." },
      { status: 500 }
    );
  }
}
