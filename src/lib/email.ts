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

  const subject = `[future.ai] Your ${purpose} Verification Code: ${otp}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; background-color: #FCFBFF; color: #1E1B2E; margin: 0; padding: 40px 20px; }
          .container { max-width: 480px; margin: 0 auto; background: #FFFFFF; border: 1px solid #EAE6FE; border-radius: 24px; padding: 36px; box-shadow: 0 10px 30px rgba(139, 127, 232, 0.08); }
          .logo-badge { width: 36px; height: 36px; background: linear-gradient(135deg, #8B7FE8, #D8D2FA); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; text-align: center; line-height: 36px; }
          .logo-text { font-size: 22px; font-weight: 800; color: #1E1B2E; letter-spacing: -0.5px; }
          .logo-accent { color: #8B7FE8; }
          h2 { font-size: 20px; font-weight: 700; margin-top: 16px; margin-bottom: 8px; color: #1E1B2E; }
          p { font-size: 14px; color: #6B6785; line-height: 1.6; margin-bottom: 24px; }
          .otp-box { background: #F3F0FE; border: 1.5px dashed #8B7FE8; border-radius: 16px; padding: 20px; text-align: center; margin: 24px 0; }
          .otp-code { font-family: monospace, monospace; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #8B7FE8; margin: 0; }
          .footer { font-size: 12px; color: #6B6785; border-top: 1px solid #EAE6FE; padding-top: 20px; margin-top: 28px; text-align: center; }
        </style>
      </head>
      <body>
        <div className="container">
          <div>
            <span className="logo-badge">✦</span>
            <span className="logo-text">future<span className="logo-accent">.ai</span></span>
          </div>
          <h2>Verification Code (${purpose})</h2>
          <p>Please enter the following 6-digit code to complete your ${purpose} verification. Valid for 10 minutes.</p>
          <div className="otp-box">
            <div className="otp-code">${otp}</div>
          </div>
          <p style="font-size: 12px; color: #6B6785;">If you did not request this code, please ignore this email.</p>
          <div className="footer">
            © ${new Date().getFullYear()} future.ai — Sent from <strong>shanmukharani20@gmail.com</strong>
          </div>
        </div>
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
