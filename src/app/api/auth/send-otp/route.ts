import { NextResponse } from "next/server";
import { generateOTP, sendOTPEmail, otpStore } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email, purpose = "2FA" } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Save OTP in memory store
    otpStore.set(email.toLowerCase(), { otp, expiresAt });

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
        error: "Unable to process OTP request. Please try again.",
      },
      { status: 500 }
    );
  }
}
