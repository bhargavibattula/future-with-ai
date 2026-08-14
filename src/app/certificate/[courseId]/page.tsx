"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificateTemplate from "@/components/certificate/CertificateTemplate";
import WriteWithAIModal from "@/components/certificate/WriteWithAIModal";
import { COURSES } from "@/data/courses";
import { useAuth } from "@/lib/auth";
import {
  ShieldCheck,
  Download,
  Copy,
  Check,
  Share2,
  Sparkles,
  Award,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  UserCheck,
} from "lucide-react";

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 1.47 1.47 1.47 1.47 0 0 0-1.47-1.47Z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z" />
    </svg>
  );
}

interface CertificatePageProps {
  params: Promise<{ courseId: string }>;
}

export default function CertificatePage({ params }: CertificatePageProps) {
  const resolvedParams = use(params);
  const rawCourseId = resolvedParams.courseId;
  const cleanCourseId = rawCourseId.toLowerCase().startsWith("course-")
    ? rawCourseId
    : `course-${rawCourseId}`;

  const { user } = useAuth();
  const userEmail = user?.email || "";

  const course = COURSES.find(
    (c) => c.id === cleanCourseId || c.id.replace("course-", "") === rawCourseId
  ) || COURSES[0];

  const [loading, setLoading] = useState<boolean>(true);
  const [generating, setGenerating] = useState<boolean>(false);
  const [certificate, setCertificate] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [origin, setOrigin] = useState<string>("https://futurewithai.com");

  // Editable Student Name state
  const [inputStudentName, setInputStudentName] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Sync user name when user loads
  useEffect(() => {
    if (user?.name) {
      setInputStudentName(user.name);
    } else if (user?.email) {
      const emailPrefix = user.email.split("@")[0];
      setInputStudentName(emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1));
    }
  }, [user]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchExistingCertificate = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const queryUser = userEmail || "usr_demo_learner";
        const res = await fetch(`/api/certificates/${rawCourseId}?userId=${encodeURIComponent(queryUser)}`);
        const data = await res.json();
        if (isSubscribed) {
          if (data.success && data.certificate) {
            setCertificate(data.certificate);
            if (data.certificate.studentName) {
              setInputStudentName(data.certificate.studentName);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching existing certificate:", err);
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchExistingCertificate();

    return () => {
      isSubscribed = false;
    };
  }, [rawCourseId, userEmail]);

  const handleGenerateCertificate = async (force: boolean = false) => {
    setGenerating(true);
    setErrorMsg("");
    try {
      const currentOrigin = typeof window !== "undefined" ? window.location.origin : origin;
      const finalName = inputStudentName.trim() || (user?.name || user?.email?.split("@")[0] || "Valued Learner");

      const res = await fetch("/api/certificates/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: rawCourseId,
          userId: userEmail || "usr_demo_learner",
          studentName: finalName,
          userName: finalName,
          progressPercent: 100,
          forceRegenerate: force,
          appUrl: currentOrigin,
        }),
      });

      const data = await res.json();
      if (data.success && data.certificate) {
        setCertificate(data.certificate);
      } else {
        setErrorMsg(data.error || "Failed to generate certificate.");
      }
    } catch (err) {
      console.error("Error calling generate certificate API:", err);
      setErrorMsg("Network error generating certificate. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const currentStudentName = certificate?.studentName || inputStudentName || user?.name || "Valued Learner";

  const verificationUrl = certificate?.certificateId
    ? `${origin}/verify/${certificate.certificateId}`
    : `${origin}/verify/FWAI-2026-DEMO`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      verificationUrl
    )}`;
    window.open(url, "_blank");
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      verificationUrl
    )}`;
    window.open(url, "_blank");
  };

  const handleDownloadPDF = () => {
    if (certificate?.pdfUrl) {
      window.open(certificate.pdfUrl, "_blank");
    } else if (certificate?.certificateId) {
      window.open(`/api/certificates/download/${certificate.certificateId}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Soft Background Blobs */}
        <div className="pointer-events-none fixed top-10 left-10 w-[450px] h-[450px] rounded-full bg-[#8B7FE8]/15 blur-[120px]" />
        <div className="pointer-events-none fixed bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#5CBFA0]/15 blur-[120px]" />

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href={`/courses/${rawCourseId.replace("course-", "")}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#8B7FE8] hover:text-[#786BD6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course Pathway
          </Link>
        </div>

        {/* Header Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#E6F9F0] text-[#0E8566] dark:bg-[#0E2018] dark:text-[#5CBFA0] border border-[#9DD9C5] dark:border-[#5CBFA0]/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Certification
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1E1B2E] dark:text-white">
              {course.title} <span className="text-[#8B7FE8]">Certificate</span>
            </h1>
            <p className="text-sm text-[#6B6785] dark:text-[#B3B3B3] font-medium mt-1">
              Official verifiable credential issued by Future With AI platform.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center rounded-3xl bg-white/80 dark:bg-[#171717]/80 backdrop-blur-xl border border-[#E8E3FF] dark:border-[#2A2540] p-12">
            <RefreshCw className="w-8 h-8 text-[#8B7FE8] animate-spin mb-3" />
            <span className="text-sm font-bold text-[#6B6785] dark:text-[#B3B3B3]">
              Loading certificate details...
            </span>
          </div>
        ) : !certificate ? (
          /* Pre-generation state */
          <div className="max-w-2xl mx-auto text-center rounded-3xl bg-white dark:bg-[#171717] border border-[#E8E3FF] dark:border-[#2A2540] p-8 sm:p-12 shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-[#F3F0FE] dark:bg-[#1A1830] text-[#8B7FE8] flex items-center justify-center mx-auto mb-4 border border-[#D8D2FA] dark:border-[#8B7FE8]/30">
              <Award className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E1B2E] dark:text-white mb-2">
              Ready to Claim Your Certificate!
            </h2>
            <p className="text-sm text-[#6B6785] dark:text-[#B3B3B3] font-medium mb-6 max-w-md mx-auto">
              Congratulations on reaching 100% completion in{" "}
              <strong className="text-[#1E1B2E] dark:text-white">{course.title}</strong>. Enter your full name as you would like it to appear on your official credential:
            </p>

            {/* Student Name Input */}
            <div className="max-w-md mx-auto mb-6 text-left">
              <label className="block text-xs font-extrabold text-[#6B6785] uppercase tracking-wider mb-2">
                Full Name for Certificate
              </label>
              <input
                type="text"
                value={inputStudentName}
                onChange={(e) => setInputStudentName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-2xl bg-[#FCFBFF] dark:bg-[#1E1E1E] border border-[#D8D2FA] dark:border-[#2A2540] text-sm font-bold text-[#1E1B2E] dark:text-white focus:outline-none focus:border-[#8B7FE8]"
              />
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 text-xs font-bold border border-rose-200 dark:border-rose-900">
                {errorMsg}
              </div>
            )}

            <button
              onClick={() => handleGenerateCertificate(false)}
              disabled={generating}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#8B7FE8] text-white font-extrabold text-sm hover:bg-[#786BD6] shadow-lg shadow-[#8B7FE8]/25 transition-all disabled:opacity-50"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Assets & PDF...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Certificate
                </>
              )}
            </button>
          </div>
        ) : (
          /* Post-generation state: Main Certificate View + Sidebar Action Controls */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Preview (Center 8 Cols) */}
            <div className="lg:col-span-8 w-full space-y-6">
              <CertificateTemplate
                certificateId={certificate.certificateId}
                studentName={currentStudentName}
                courseTitle={certificate.courseTitle || `${course.title} Mastery`}
                issuedDate={
                  certificate.issuedDate
                    ? new Date(certificate.issuedDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "July 2026"
                }
                courseDuration={certificate.courseDuration || course.duration}
                qrCodeUrl={certificate.qrCodeUrl}
                verificationUrl={verificationUrl}
              />
            </div>

            {/* Side Action Panel (4 Cols) */}
            <div className="lg:col-span-4 w-full space-y-6">
              {/* Credentials & Details Card */}
              <div className="rounded-3xl bg-white dark:bg-[#171717] border border-[#E8E3FF] dark:border-[#2A2540] p-6 shadow-soft space-y-5">
                <h3 className="text-base font-extrabold text-[#1E1B2E] dark:text-white border-b border-[#E8E3FF] dark:border-[#2A2540] pb-3">
                  Certificate Actions
                </h3>

                {/* Edit Student Name Form */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-extrabold text-[#6B6785] uppercase tracking-wider">
                    Name on Certificate
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputStudentName}
                      onChange={(e) => setInputStudentName(e.target.value)}
                      placeholder="Your full name"
                      className="flex-1 px-3 py-2 rounded-xl bg-[#FCFBFF] dark:bg-[#1E1E1E] border border-[#D8D2FA] dark:border-[#2A2540] text-xs font-bold text-[#1E1B2E] dark:text-white focus:outline-none focus:border-[#8B7FE8]"
                    />
                    <button
                      onClick={() => handleGenerateCertificate(true)}
                      disabled={generating}
                      className="px-3 py-2 rounded-xl bg-[#F3F0FE] text-[#8B7FE8] font-bold text-xs hover:bg-[#EAE6FE] transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      Update
                    </button>
                  </div>
                </div>

                {/* Main PDF Download */}
                <button
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#8B7FE8] text-white font-extrabold text-sm hover:bg-[#786BD6] transition-all shadow-md shadow-[#8B7FE8]/20"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>

                {/* Write with AI Modal Trigger */}
                <button
                  onClick={() => setIsAIModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#F5F2FF] to-[#EDF9F5] dark:from-[#1A1830] dark:to-[#0E2018] border border-[#D8D2FA] dark:border-[#8B7FE8]/40 text-[#8B7FE8] dark:text-[#5CBFA0] font-extrabold text-sm hover:opacity-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
                  Write with AI Caption
                </button>

                {/* Copy Verification Link */}
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#F8F7FF] dark:bg-[#1E1E1E] border border-[#EAE6FE] dark:border-white/10 text-[#1E1B2E] dark:text-white font-bold text-xs hover:bg-[#F3F0FE] dark:hover:bg-[#2A2540] transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[#8B7FE8]" />}
                  {copiedLink ? "Link Copied!" : "Copy Verification Link"}
                </button>

                {/* Regenerate QR Code / Assets button */}
                <button
                  onClick={() => handleGenerateCertificate(true)}
                  disabled={generating}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F5F2FF] dark:bg-[#1A1830] border border-[#D8D2FA] dark:border-[#8B7FE8]/30 text-[#8B7FE8] font-bold text-xs hover:bg-[#EAE6FE] transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${generating ? "animate-spin" : ""}`} />
                  {generating ? "Updating..." : "Regenerate Certificate Assets"}
                </button>

                {/* Social Share Buttons */}
                <div className="pt-2">
                  <span className="text-[11px] font-extrabold text-[#6B6785] dark:text-[#808080] uppercase tracking-wider block mb-3">
                    Share Certificate
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleShareLinkedIn}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0077B5]/10 text-[#0077B5] border border-[#0077B5]/30 text-xs font-bold hover:bg-[#0077B5] hover:text-white transition-colors"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                      LinkedIn
                    </button>
                    <button
                      onClick={handleShareFacebook}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/30 text-xs font-bold hover:bg-[#1877F2] hover:text-white transition-colors"
                    >
                      <FacebookIcon className="w-4 h-4" />
                      Facebook
                    </button>
                  </div>
                </div>
              </div>

              {/* Public Verification Banner */}
              <div className="rounded-3xl bg-[#F3F0FE] dark:bg-[#1A1830] border border-[#D8D2FA] dark:border-[#8B7FE8]/30 p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#8B7FE8]">
                  <ExternalLink className="w-4 h-4" />
                  Public Verification Link
                </div>
                <p className="text-xs text-[#6B6785] dark:text-[#B3B3B3] font-medium leading-relaxed">
                  Anyone can verify this credential without signing in by scanning the QR code or visiting:
                </p>
                <Link
                  href={`/verify/${certificate.certificateId}`}
                  target="_blank"
                  className="text-xs font-mono font-bold text-[#8B7FE8] underline break-all block hover:opacity-80"
                >
                  {verificationUrl}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Groq AI Caption Modal */}
      <WriteWithAIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        studentName={currentStudentName}
        courseName={course.title}
        verificationUrl={verificationUrl}
      />

      <Footer />
    </div>
  );
}
