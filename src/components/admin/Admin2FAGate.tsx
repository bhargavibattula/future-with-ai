"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Admin2FAGateProps {
  onAuthenticated: () => void;
}

export default function Admin2FAGate({ onAuthenticated }: Admin2FAGateProps) {
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");

  // Input states
  const [email, setEmail] = useState("shanmukharani20@gmail.com");
  const [password, setPassword] = useState("");

  // OTP inputs
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Feedback states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [timer, setTimer] = useState(60);

  // Timer countdown
  useEffect(() => {
    if (step !== "2fa" || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  // Step 1: Submit Admin Password -> Request 2FA OTP
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg("Please enter admin email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setSuccessMsg(`2FA verification code dispatched to ${email}`);
        setStep("2fa");
        setTimer(60);
      } else {
        setErrorMsg(data.error || "Invalid admin credentials. Access denied.");
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg("Failed to connect to admin authentication service.");
    }
  };

  // OTP input handler
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otpValues];
    newOtp[index] = val.slice(-1);
    setOtpValues(newOtp);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Step 2: Submit 2FA Code -> Verify & Unlock Admin
  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const fullOtp = otpValues.join("");
    if (fullOtp.length < 6) {
      setErrorMsg("Please enter the complete 6-digit 2FA code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/admin-verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: fullOtp }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setSuccessMsg("2FA verified! Granting Super Admin access...");
        setTimeout(() => {
          onAuthenticated();
        }, 1000);
      } else {
        setErrorMsg(data.error || "Invalid 2FA code. Check your email.");
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg("Failed to verify 2FA code.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFF] text-[#1E1B2E] selection:bg-[#D8D2FA] selection:text-[#1E1B2E]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Soft Ambient Radial Lighting */}
        <div className="pointer-events-none absolute top-1/4 left-10 w-96 h-96 bg-[#D8D2FA]/30 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-[#FFC9DE]/30 blur-3xl rounded-full" />

        <div className="w-full max-w-md bg-white border border-[#E8E3FF] rounded-3xl p-6 sm:p-8 shadow-soft relative z-10 select-none">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-[#8B7FE8] to-[#A78BFA] flex items-center justify-center text-white shadow-soft-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-[#1E1B2E] tracking-tight">
              Future.ai <span className="text-[#8B7FE8]">Admin Gate</span>
            </h2>
            <p className="text-xs text-[#6B6785] font-medium mt-1">
              {step === "credentials"
                ? "Enter seeded environment admin credentials."
                : "Enter 6-digit 2FA code sent to admin email."}
            </p>
          </div>

          {/* Error / Success Feedback */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-[#FFF0F5] border border-[#FFC9DE] text-xs font-bold text-[#C0336A] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-[#E6F9F0] border border-[#9DD9C5] text-xs font-bold text-[#0E8566] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* STEP 1: CREDENTIALS FORM */}
          {step === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-[#1E1B2E] block mb-1">
                  Admin Email (Seeded in .env.local)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7FE8]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="shanmukharani20@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#1E1B2E] block mb-1">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7FE8]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? "Verifying Credentials..." : "Request 2FA OTP Code"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* STEP 2: 2FA OTP VERIFICATION FORM */
            <form onSubmit={handleVerify2FA} className="space-y-5">
              <div className="flex items-center justify-center gap-2 my-4">
                {otpValues.map((val, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-12 rounded-2xl text-center text-lg font-black bg-[#FCFBFF] border-2 border-[#E8E3FF] focus:border-[#8B7FE8] focus:ring-4 focus:ring-[#8B7FE8]/15 outline-none transition-all"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? "Verifying 2FA..." : "Unlock Admin Dashboard"}
                <KeyRound className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs font-bold text-[#6B6785] pt-2">
                <span>Resend code in {timer}s</span>
                <button
                  type="button"
                  onClick={() => setStep("credentials")}
                  className="text-[#8B7FE8] hover:underline"
                >
                  Change Email / Re-login
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
