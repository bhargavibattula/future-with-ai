import nodemailer from "nodemailer";

// In-memory global OTP store (persisted across Next.js dev reloads)
const globalForOtp = globalThis as unknown as {
  otpStore?: Map<string, { otp: string; expiresAt: number }>;
};

export const otpStore =
  globalForOtp.otpStore ?? new Map<string, { otp: string; expiresAt: number }>();

if (process.env.NODE_ENV !== "production") {
  globalForOtp.otpStore = otpStore;
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(
  toEmail: string,
  otp: string,
  purpose: "2FA" | "Forgot Password" | "Sign Up 2FA" = "2FA"
) {
  const rawUser = process.env.EMAIL_USER || "shanmukharani20@gmail.com";
  const rawPass = process.env.EMAIL_PASS || "jtytkdvizknjajvi";
  const user = rawUser.trim();
  const pass = rawPass.replace(/\s+/g, "").trim();

  // Configure Nodemailer Gmail Transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  // SUBJECT LINE (No OTP inside subject so phone notifications don't expose it)
  const subject = `[future.ai] Security Verification Code for your Account`;

  const purposeTitle =
    purpose === "Forgot Password"
      ? "Password Reset Code"
      : purpose === "Sign Up 2FA"
      ? "Account Registration Verification"
      : "Two-Factor Verification Code";

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Security Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F8F7FF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <!-- Hidden preheader text prevents OTP from appearing in push notification preview -->
        <div style="display:none;font-size:1px;color:#333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
          Your security verification code for future.ai is inside. Open this email to complete verification.
        </div>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8F7FF; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #FFFFFF; border: 1px solid #EAE6FE; border-radius: 24px; box-shadow: 0 12px 36px rgba(139, 127, 232, 0.08); overflow: hidden;">
                
                <!-- Top Brand Header -->
                <tr>
                  <td style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid #F3F0FE;">
                    <div style="display: inline-block; text-align: center;">
                      <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                        <tr>
                          <td style="width: 38px; height: 38px; background: linear-gradient(135deg, #8B7FE8, #D8D2FA); border-radius: 12px; text-align: center; color: #FFFFFF; font-size: 18px; font-weight: bold; line-height: 38px;">
                            ✦
                          </td>
                          <td style="padding-left: 10px; font-size: 24px; font-weight: 800; color: #1E1B2E; letter-spacing: -0.5px;">
                            future<span style="color: #8B7FE8;">.ai</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Email Body Content -->
                <tr>
                  <td style="padding: 32px;">
                    <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #1E1B2E; text-align: center; letter-spacing: -0.3px;">
                      ${purposeTitle}
                    </h1>
                    <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 1.6; color: #6B6785; text-align: center;">
                      Please enter the following 6-digit verification code to proceed with your authentication on <strong>future.ai</strong>.
                    </p>

                    <!-- OTP Highlight Box -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F3F0FE; border: 2px dashed #8B7FE8; border-radius: 18px; margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 24px; text-align: center;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #6B6785; margin-bottom: 8px;">
                            Your Verification Code
                          </div>
                          <div style="font-family: 'Courier New', Courier, monospace, sans-serif; font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #8B7FE8; margin: 0; padding-left: 10px;">
                            ${otp}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Expiry & Security Badge -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #EDF9F5; border: 1px solid #B8E8D8; border-radius: 14px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 600; color: #1E1B2E;">
                          ⏱️ Valid for <strong>10 minutes</strong>. Do not share this code with anyone.
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #6B6785; text-align: center;">
                      If you did not request this verification code, please ignore this email or secure your account.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 32px; background-color: #FCFBFF; border-top: 1px solid #EAE6FE; text-align: center; font-size: 11px; color: #6B6785;">
                    © ${new Date().getFullYear()} future.ai — Curated AI Directory & Tools
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"future.ai" <${user}>`,
    to: toEmail,
    subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { sent: true, info };
  } catch (err: any) {
    console.error("Nodemailer Email Delivery Notice:", err.message);
    return {
      sent: false,
      error: err.message,
    };
  }
}
