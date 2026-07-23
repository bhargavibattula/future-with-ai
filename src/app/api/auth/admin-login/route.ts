import { NextResponse } from "next/server";
import { generateOTP, sendOTPEmail, otpStore } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const envAdminEmail = (process.env.ADMIN_EMAIL || "shanmukharani20@gmail.com").trim().toLowerCase();
    const envAdminPassword = (process.env.ADMIN_PASSWORD || "AdminSecurePass123!").trim();

    const inputEmail = (email || "").trim().toLowerCase();
    const inputPassword = (password || "").trim();

    // Verify Admin Credentials strictly against environment variables
    if (inputEmail !== envAdminEmail || inputPassword !== envAdminPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin credentials. Access denied.",
        },
        { status: 401 }
      );
    }

    // Generate 6-digit 2FA OTP code
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins expiry

    // Save in OTP store
    otpStore.set(envAdminEmail, { otp, expiresAt });

    // Send 2FA email via SMTP
    const mailResult = await sendOTPEmail(envAdminEmail, otp, "2FA");

    if (mailResult.sent) {
      return NextResponse.json({
        success: true,
        message: `Admin 2FA verification code sent to ${envAdminEmail}`,
        adminEmail: envAdminEmail,
      });
    } else {
      console.error("Mail delivery error for Admin 2FA:", mailResult.error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send 2FA verification email. Please check SMTP settings.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in admin-login route:", error);
    return NextResponse.json(
      { success: false, error: "Server error processing admin login." },
      { status: 500 }
    );
  }
}
