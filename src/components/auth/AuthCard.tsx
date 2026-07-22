"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  RefreshCw,
  Info,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { setStoredUser } from "@/lib/auth";

export type AuthMode =
  | "login"
  | "signup"
  | "forgot-password"
  | "2fa"
  | "reset-new-password";

interface AuthCardProps {
  initialMode?: AuthMode;
  onModeChange?: (mode: AuthMode) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export default function AuthCard({
  initialMode = "login",
  onModeChange,
  isModal = false,
  onClose,
}: AuthCardProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Form input states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // 6-digit OTP array state
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer & Resend State
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  // Feedback states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Toast Popup State (Top-Right Notification)
  const [toast, setToast] = useState<{
    type: "success" | "error" | "info";
    title: string;
    message: string;
  } | null>(null);

  // Purpose tracker for 2FA vs Forgot Password
  const [otpPurpose, setOtpPurpose] = useState<"2FA" | "Forgot Password" | "Sign Up 2FA">("2FA");

  // Show auto-dismiss toast in top-right
  const showToast = (
    type: "success" | "error" | "info",
    title: string,
    message: string
  ) => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // Timer countdown hook
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === "2fa" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [mode, timer]);

  const switchMode = (newMode: AuthMode) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", color: "bg-gray-200" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-400" };
    if (score === 2 || score === 3)
      return { score: 2, label: "Medium", color: "bg-amber-400" };
    return { score: 3, label: "Strong", color: "bg-emerald-400" };
  };

  const strength = getPasswordStrength(password || newPassword);

  // Send OTP Call to API (`/api/auth/send-otp`)
  const requestOtpDispatch = async (
    targetEmail: string,
    purpose: "2FA" | "Forgot Password" | "Sign Up 2FA"
  ) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, purpose }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setOtpPurpose(purpose);
        setTimer(60);
        setCanResend(false);
        setOtpValues(["", "", "", "", "", ""]);
        setSuccessMsg(`Verification code sent to ${targetEmail}`);

        showToast(
          "success",
          "OTP Sent",
          `Verification code sent to ${targetEmail}. Please check your inbox.`
        );
        setMode("2fa");
      } else {
        const friendlyErr = data.error || "Could not deliver OTP email. Please check your address.";
        setErrorMsg(friendlyErr);
        showToast("error", "Email Delivery Issue", friendlyErr);
      }
    } catch (err: any) {
      setLoading(false);
      const networkErr = "Connection issue sending verification email. Please try again.";
      setErrorMsg(networkErr);
      showToast("error", "Network Error", networkErr);
    }
  };

  // OTP Input handlers (Auto-advance & paste)
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);

    // Auto advance focus
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, 6);
    if (/^\d+$/.test(pasted)) {
      const newOtp = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
      setOtpValues(newOtp);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Mode 1: Login Submit -> Trigger 2FA
    if (mode === "login") {
      if (!email.trim() || !email.includes("@")) {
        const msg = "Please enter a valid email address.";
        setErrorMsg(msg);
        showToast("error", "Invalid Email", msg);
        return;
      }
      if (!password) {
        const msg = "Please enter your password.";
        setErrorMsg(msg);
        showToast("error", "Password Required", msg);
        return;
      }

      await requestOtpDispatch(email, "2FA");
      return;
    }

    // Mode 2: Signup Submit -> Trigger 2FA
    if (mode === "signup") {
      if (!fullName.trim()) {
        const msg = "Please enter your full name.";
        setErrorMsg(msg);
        showToast("error", "Name Required", msg);
        return;
      }
      if (!email.trim() || !email.includes("@")) {
        const msg = "Please enter a valid email address.";
        setErrorMsg(msg);
        showToast("error", "Invalid Email", msg);
        return;
      }
      if (password !== confirmPassword) {
        const msg = "Passwords do not match.";
        setErrorMsg(msg);
        showToast("error", "Password Mismatch", msg);
        return;
      }
      if (!agreeTerms) {
        const msg = "Please accept the Terms of Service & Privacy Policy.";
        setErrorMsg(msg);
        showToast("error", "Terms Required", msg);
        return;
      }

      await requestOtpDispatch(email, "Sign Up 2FA");
      return;
    }

    // Mode 3: Forgot Password Request Submit -> Trigger OTP
    if (mode === "forgot-password") {
      if (!email.trim() || !email.includes("@")) {
        const msg = "Please enter a valid email address.";
        setErrorMsg(msg);
        showToast("error", "Invalid Email", msg);
        return;
      }

      await requestOtpDispatch(email, "Forgot Password");
      return;
    }

    // Mode 4: 2FA Verification Submit
    if (mode === "2fa") {
      const fullOtp = otpValues.join("");
      if (fullOtp.length < 6) {
        const msg = "Please enter the complete 6-digit OTP code sent to your email.";
        setErrorMsg(msg);
        showToast("error", "Incomplete OTP", msg);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: fullOtp }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
          if (otpPurpose === "Forgot Password") {
            setSuccessMsg("OTP Verified! Please set your new password below.");
            showToast("success", "OTP Verified", "Please enter your new password.");
            setMode("reset-new-password");
          } else {
            // Save user profile session!
            const displayName = fullName.trim() || email.split("@")[0];
            setStoredUser({ name: displayName, email: email.trim() });

            // SUCCESS OTP VERIFICATION FOR LOGIN / SIGNUP -> REDIRECT TO HOME PAGE!
            setSuccessMsg(`Welcome, ${displayName}! Redirecting to home page...`);
            showToast(
              "success",
              "Authentication Successful",
              `Welcome, ${displayName}! Redirecting to home page...`
            );
            setTimeout(() => {
              if (isModal && onClose) onClose();
              router.push("/");
            }, 1200);
          }
        } else {
          const err = data.error || "Invalid 6-digit OTP code. Please check your email and try again.";
          setErrorMsg(err);
          showToast("error", "Verification Failed", err);
        }
      } catch (err: any) {
        setLoading(false);
        const serviceErr = "Verification service unavailable. Try again.";
        setErrorMsg(serviceErr);
        showToast("error", "Service Error", serviceErr);
      }
      return;
    }

    // Mode 5: Set New Password -> REDIRECT TO HOME PAGE
    if (mode === "reset-new-password") {
      if (!newPassword || newPassword.length < 6) {
        const msg = "New password must be at least 6 characters.";
        setErrorMsg(msg);
        showToast("error", "Weak Password", msg);
        return;
      }
      if (newPassword !== confirmNewPassword) {
        const msg = "New passwords do not match.";
        setErrorMsg(msg);
        showToast("error", "Password Mismatch", msg);
        return;
      }

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg("Password reset successfully! Redirecting to home page...");
        showToast(
          "success",
          "Password Updated",
          "Password reset successfully! Redirecting to home page..."
        );
        setTimeout(() => {
          if (isModal && onClose) onClose();
          router.push("/");
        }, 1200);
      }, 1000);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Floating Pop-Up Toast Notification Banner below Navbar (top-24, z-[9999]) */}
      {toast && (
        <div className="fixed top-24 right-6 sm:right-8 z-[9999] max-w-sm w-full animate-in slide-in-from-right-8 fade-in duration-300 pointer-events-none">
          <div
            className={`p-4 sm:p-5 rounded-2xl shadow-2xl border-2 flex items-start gap-3.5 bg-white text-[#1E1B2E] pointer-events-auto transition-all ${
              toast.type === "success"
                ? "border-[#B8E8D8] shadow-emerald-500/10"
                : toast.type === "error"
                ? "border-[#FFC9DE] shadow-red-500/10"
                : "border-[#8B7FE8] shadow-purple-500/10"
            }`}
          >
            {toast.type === "success" && (
              <div className="w-9 h-9 rounded-xl bg-[#EDF9F5] border border-[#B8E8D8] text-[#1E1B2E] flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            )}
            {toast.type === "error" && (
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F5] border border-[#FFC9DE] text-red-600 flex items-center justify-center shrink-0 shadow-sm">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
            {toast.type === "info" && (
              <div className="w-9 h-9 rounded-xl bg-[#F3F0FE] border border-[#D8D2FA] text-[#8B7FE8] flex items-center justify-center shrink-0 shadow-sm">
                <Info className="w-5 h-5 text-[#8B7FE8]" />
              </div>
            )}

            <div className="flex-1 space-y-1">
              <h4 className="text-sm font-bold text-[#1E1B2E] tracking-tight">
                {toast.title}
              </h4>
              <p className="text-xs font-medium text-[#4A4560] leading-relaxed">
                {toast.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ambient background soft glowing blobs */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-blob-violet blur-2xl opacity-80 pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blob-pink blur-2xl opacity-80 pointer-events-none" />

      {/* Main Glassmorphic Auth Card */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EAE6FE] bg-white/95 backdrop-blur-xl transition-all duration-300">
        {/* Header with Brand Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="flex items-center gap-2 mb-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center shadow-soft-sm group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-extrabold tracking-tight text-[#1E1B2E]">
                future
              </span>
              <span className="text-2xl font-extrabold text-[#8B7FE8]">
                .ai
              </span>
            </div>
          </Link>

          {mode === "login" && (
            <>
              <h1 className="text-2xl font-bold text-[#1E1B2E] tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-[#6B6785] mt-1">
                Enter your credentials to access your account
              </p>
            </>
          )}

          {mode === "signup" && (
            <>
              <h1 className="text-2xl font-bold text-[#1E1B2E] tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-[#6B6785] mt-1">
                Join thousands exploring the future of AI tools
              </p>
            </>
          )}

          {mode === "forgot-password" && (
            <>
              <div className="w-12 h-12 rounded-full bg-[#F3F0FE] text-[#8B7FE8] flex items-center justify-center mb-2 mt-1">
                <KeyRound className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-[#1E1B2E] tracking-tight">
                Reset your password
              </h1>
              <p className="text-sm text-[#6B6785] mt-1">
                Enter your email address to receive an OTP verification code from{" "}
                <span className="font-semibold text-[#8B7FE8]">
                  future.ai
                </span>
              </p>
            </>
          )}

          {mode === "2fa" && (
            <>
              <div className="w-12 h-12 rounded-full bg-[#EDF9F5] text-[#1E1B2E] border border-[#B8E8D8] flex items-center justify-center mb-2 mt-1">
                <Smartphone className="w-6 h-6 text-[#8B7FE8]" />
              </div>
              <h1 className="text-2xl font-bold text-[#1E1B2E] tracking-tight">
                Two-Factor Authentication
              </h1>
              <p className="text-sm text-[#6B6785] mt-1">
                We sent a 6-digit OTP code to{" "}
                <span className="font-semibold text-[#8B7FE8]">{email}</span>
              </p>
              <div className="mt-1.5 text-[11px] text-[#6B6785] bg-[#F3F0FE] px-3 py-1 rounded-full inline-flex items-center gap-1 border border-[#EAE6FE]">
                <span>Sender:</span>
                <strong className="text-[#1E1B2E]">shanmukharani20@gmail.com</strong>
              </div>
            </>
          )}

          {mode === "reset-new-password" && (
            <>
              <div className="w-12 h-12 rounded-full bg-[#F3F0FE] text-[#8B7FE8] flex items-center justify-center mb-2 mt-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-[#1E1B2E] tracking-tight">
                Set New Password
              </h1>
              <p className="text-sm text-[#6B6785] mt-1">
                Please create a strong new password for your account
              </p>
            </>
          )}
        </div>

        {/* Mode Switcher Tabs (Only for Login / Sign Up) */}
        {(mode === "login" || mode === "signup") && (
          <div className="flex p-1 bg-[#F3F0FE] rounded-2xl mb-6 border border-[#EAE6FE]/80">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                mode === "login"
                  ? "bg-white text-[#1E1B2E] shadow-sm"
                  : "text-[#6B6785] hover:text-[#1E1B2E]"
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                mode === "signup"
                  ? "bg-white text-[#1E1B2E] shadow-sm"
                  : "text-[#6B6785] hover:text-[#1E1B2E]"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* In-Card Clean Alert Notifications */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-[#FFF0F5] border border-[#FFC9DE] text-red-700 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-[#EDF9F5] border border-[#B8E8D8] text-[#1E1B2E] text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sign Up: Full Name */}
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1B2E] block">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6785]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl text-sm text-[#1E1B2E] placeholder-[#6B6785]/60 focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]/50 focus:border-[#8B7FE8] transition-all"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          {(mode === "login" || mode === "signup" || mode === "forgot-password") && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1B2E] block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6785]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl text-sm text-[#1E1B2E] placeholder-[#6B6785]/60 focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]/50 focus:border-[#8B7FE8] transition-all"
                />
              </div>
            </div>
          )}

          {/* Password Fields */}
          {(mode === "login" || mode === "signup") && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#1E1B2E]">
                  Password
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => switchMode("forgot-password")}
                    className="text-xs text-[#8B7FE8] font-semibold hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6785]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl text-sm text-[#1E1B2E] placeholder-[#6B6785]/60 focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]/50 focus:border-[#8B7FE8] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B6785] hover:text-[#1E1B2E]"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Meter for Signup */}
              {mode === "signup" && password.length > 0 && (
                <div className="pt-1 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-[#6B6785]">
                    <span>Password strength:</span>
                    <span className="font-semibold text-[#1E1B2E]">
                      {strength.label}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#EAE6FE] rounded-full overflow-hidden flex gap-1">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strength.score >= 1 ? strength.color : "bg-transparent"
                      } flex-1 rounded-full`}
                    />
                    <div
                      className={`h-full transition-all duration-300 ${
                        strength.score >= 2 ? strength.color : "bg-transparent"
                      } flex-1 rounded-full`}
                    />
                    <div
                      className={`h-full transition-all duration-300 ${
                        strength.score >= 3 ? strength.color : "bg-transparent"
                      } flex-1 rounded-full`}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Confirm Password (Signup only) */}
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1E1B2E] block">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6785]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl text-sm text-[#1E1B2E] placeholder-[#6B6785]/60 focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]/50 focus:border-[#8B7FE8] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B6785] hover:text-[#1E1B2E]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 6-DIGIT OTP INPUT (2FA Mode) */}
          {mode === "2fa" && (
            <div className="py-2 space-y-4">
              <div className="flex justify-between items-center gap-2">
                {otpValues.map((val, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    className="w-12 h-14 text-center text-xl font-bold rounded-2xl bg-[#FCFBFF] border-2 border-[#EAE6FE] text-[#1E1B2E] focus:outline-none focus:border-[#8B7FE8] focus:ring-4 focus:ring-[#8B7FE8]/20 transition-all shadow-sm"
                  />
                ))}
              </div>

              {/* Resend Timer & Action */}
              <div className="flex items-center justify-between text-xs text-[#6B6785] pt-1">
                <span>Didn&apos;t receive code?</span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={() => requestOtpDispatch(email, otpPurpose)}
                    className="text-[#8B7FE8] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
                  </button>
                ) : (
                  <span className="font-semibold text-[#1E1B2E]">
                    Resend in {timer}s
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Reset New Password Mode */}
          {mode === "reset-new-password" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1E1B2E] block">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6785]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl text-sm text-[#1E1B2E] placeholder-[#6B6785]/60 focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]/50 focus:border-[#8B7FE8] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B6785] hover:text-[#1E1B2E]"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {newPassword.length > 0 && (
                  <div className="pt-1 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-[#6B6785]">
                      <span>Strength:</span>
                      <span className="font-semibold text-[#1E1B2E]">
                        {strength.label}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#EAE6FE] rounded-full overflow-hidden flex gap-1">
                      <div
                        className={`h-full transition-all duration-300 ${
                          strength.score >= 1 ? strength.color : "bg-transparent"
                        } flex-1 rounded-full`}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          strength.score >= 2 ? strength.color : "bg-transparent"
                        } flex-1 rounded-full`}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          strength.score >= 3 ? strength.color : "bg-transparent"
                        } flex-1 rounded-full`}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1E1B2E] block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6785]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl text-sm text-[#1E1B2E] placeholder-[#6B6785]/60 focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]/50 focus:border-[#8B7FE8] transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Remember Me Checkbox (Login) */}
          {mode === "login" && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#8B7FE8] focus:ring-[#8B7FE8] border-[#EAE6FE]"
                />
                <span className="text-xs text-[#6B6785]">Remember me</span>
              </label>
            </div>
          )}

          {/* Terms Checkbox (Signup) */}
          {mode === "signup" && (
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-[#8B7FE8] focus:ring-[#8B7FE8] border-[#EAE6FE]"
                />
                <span className="text-xs text-[#6B6785] leading-snug">
                  I agree to the{" "}
                  <a href="#" className="text-[#8B7FE8] font-semibold hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#8B7FE8] font-semibold hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
          )}

          {/* Main Action Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="default"
              disabled={loading}
              className="w-full py-3 h-12 text-sm font-semibold flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === "login" && "Continue with 2FA"}
                    {mode === "signup" && "Proceed to 2FA Verification"}
                    {mode === "forgot-password" && "Send Email OTP"}
                    {mode === "2fa" && "Verify OTP & Continue"}
                    {mode === "reset-new-password" && "Update Password"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          {/* Back to Login link */}
          {(mode === "forgot-password" || mode === "2fa") && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="inline-flex items-center text-xs font-semibold text-[#8B7FE8] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Back to Log In
              </button>
            </div>
          )}

          {/* Social Logins Divider (Login & Signup) */}
          {(mode === "login" || mode === "signup") && (
            <>
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#EAE6FE]" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-[#6B6785]">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    requestOtpDispatch("google.user@example.com", "2FA")
                  }
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl text-xs font-semibold text-[#1E1B2E] hover:bg-[#F3F0FE] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  onClick={() =>
                    requestOtpDispatch("github.user@example.com", "2FA")
                  }
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl text-xs font-semibold text-[#1E1B2E] hover:bg-[#F3F0FE] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
