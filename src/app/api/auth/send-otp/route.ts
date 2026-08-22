import { NextResponse } from "next/server";
import { generateOTP, sendOTPEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, purpose = "2FA", password } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (purpose === "2FA") {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
      if (!user || !user.password) {
        return NextResponse.json(
          { success: false, error: "Invalid email or password." },
          { status: 400 }
        );
      }
      if (!password) {
        return NextResponse.json(
          { success: false, error: "Password is required for 2FA." },
          { status: 400 }
        );
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, error: "Invalid email or password." },
          { status: 400 }
        );
      }
    }

    if (purpose === "Sign Up 2FA") {
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
      if (existingUser) {
        return NextResponse.json(
          { success: false, error: "An account with this email already exists." },
          { status: 400 }
        );
      }
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Save OTP in database
    await prisma.verificationToken.deleteMany({
      where: { identifier: email.toLowerCase() },
    });
    
    await prisma.verificationToken.create({
      data: {
        identifier: email.toLowerCase(),
        token: otp,
        expires: expiresAt,
      },
    });

    // Send real email via Gmail SMTP (shanmukharani20@gmail.com)
    const mailResult = await sendOTPEmail(email, otp, purpose);

    if (mailResult.sent) {
      return NextResponse.json({
        success: true,
        message: `OTP verification code sent to ${email}`,
      });
    } else {
      console.error("Mail delivery error details:", mailResult.error);
      const isBadCredentials =
        mailResult.error &&
        (mailResult.error.includes("535") ||
          mailResult.error.includes("BadCredentials") ||
          mailResult.error.includes("Username and Password not accepted"));

      const userErrorMsg = isBadCredentials
        ? "Gmail rejected the App Password for shanmukharani20@gmail.com. Please generate a new App Password at myaccount.google.com/apppasswords."
        : "Failed to deliver OTP email. Please check your email address and try again.";

      return NextResponse.json(
        {
          success: false,
          error: userErrorMsg,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in send-otp API:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Unable to process OTP request: ${error instanceof Error ? error.message : String(error)}`
      },
      { status: 500 }
    );
  }
}
