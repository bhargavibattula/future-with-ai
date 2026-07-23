import { NextResponse } from "next/server";
import { otpStore } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const envAdminEmail = (process.env.ADMIN_EMAIL || "shanmukharani20@gmail.com").trim().toLowerCase();
    const inputEmail = (email || "").trim().toLowerCase();
    const inputOtp = (otp || "").trim();

    if (inputEmail !== envAdminEmail) {
      return NextResponse.json(
        { success: false, error: "Unauthorized admin verification request." },
        { status: 401 }
      );
    }

    const record = otpStore.get(envAdminEmail);

    if (!record) {
      return NextResponse.json(
        { success: false, error: "2FA session expired. Please log in again." },
        { status: 400 }
      );
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(envAdminEmail);
      return NextResponse.json(
        { success: false, error: "2FA OTP code has expired (10 min limit). Please request a new code." },
        { status: 400 }
      );
    }

    if (record.otp !== inputOtp) {
      return NextResponse.json(
        { success: false, error: "Invalid 2FA code. Please check your email and try again." },
        { status: 400 }
      );
    }

    // Clear used OTP code
    otpStore.delete(envAdminEmail);

    const adminProfile = {
      name: "Shanmukha Rani",
      email: envAdminEmail,
      role: "Super Admin",
      isAdmin: true,
      authenticatedAt: new Date().toISOString(),
    };

    const response = NextResponse.json({
      success: true,
      message: "Admin 2FA verification successful!",
      admin: adminProfile,
    });

    // Set secure admin session cookie (24 hour session)
    response.cookies.set({
      name: "future_ai_admin_session",
      value: JSON.stringify(adminProfile),
      httpOnly: false, // Accessible to client-side session checker
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    console.error("Error in admin-verify-2fa route:", error);
    return NextResponse.json(
      { success: false, error: "Server error verifying admin 2FA." },
      { status: 500 }
    );
  }
}
