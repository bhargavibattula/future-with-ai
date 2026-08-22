"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificateTemplate from "@/components/certificate/CertificateTemplate";
import {
  ShieldCheck,
  ShieldAlert,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Download,
} from "lucide-react";

interface PublicVerifyPageProps {
  params: Promise<{ certificateId: string }>;
}

export default function PublicVerifyPage({ params }: PublicVerifyPageProps) {
  const resolvedParams = use(params);
  const certId = resolvedParams.certificateId;

  const [loading, setLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(false);
  const [certData, setCertData] = useState<any>(null);

  useEffect(() => {
    async function verifyCertificate() {
      setLoading(true);
      try {
        const res = await fetch(`/api/certificates/verify/${certId}`);
        const data = await res.json();
        if (data.success && data.certificate) {
          setVerified(true);
          setCertData(data.certificate);
        } else {
          setVerified(false);
        }
      } catch (err) {
        console.error("Verification lookup error:", err);
        setVerified(false);
      } finally {
        setLoading(false);
      }
    }

    if (certId) {
      verifyCertificate();
    }
  }, [certId]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 relative z-10">
        {/* Soft Radial Ambient Lighting */}
        <div className="pointer-events-none fixed top-10 left-1/3 w-[500px] h-[500px] rounded-full bg-[#8B7FE8]/15 blur-[130px]" />
        <div className="pointer-events-none fixed bottom-10 right-1/3 w-[500px] h-[500px] rounded-full bg-[#5CBFA0]/15 blur-[130px]" />

        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-[#171717]/80 backdrop-blur-xl border border-[#E8E3FF] dark:border-[#2A2540] p-6 sm:p-12">
            <RefreshCw className="w-8 h-8 text-[#8B7FE8] animate-spin mb-3" />
            <span className="text-sm font-bold text-[#6B6785] dark:text-[#B3B3B3]">
              Verifying Certificate ID #{certId}...
            </span>
          </div>
        ) : verified && certData ? (
          /* Valid Certificate Verification View */
          <div className="space-y-6 sm:space-y-8">
            {/* Status Header Banner */}
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#E6F9F0] via-[#F3F0FE] to-[#E6F9F0] dark:from-[#0E2018] dark:via-[#1A1830] dark:to-[#0E2018] border border-[#9DD9C5] dark:border-[#5CBFA0]/30 p-4 sm:p-8 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 text-center sm:text-left">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#5CBFA0] text-[#0A0A0A] flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="px-2.5 py-0.5 sm:px-3 rounded-full text-[10px] sm:text-xs font-extrabold bg-[#5CBFA0] text-[#0A0A0A]">
                      OFFICIALLY VERIFIED
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-[#6B6785] dark:text-[#B3B3B3]">
                      #{certData.certificateId}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-3xl font-black text-[#1E1B2E] dark:text-white">
                    ✅ Certificate Verified
                  </h1>
                  <p className="text-xs sm:text-sm text-[#6B6785] dark:text-[#B3B3B3] font-medium mt-1">
                    This certificate is authentic and registered on Future With AI platform.
                  </p>
                </div>
              </div>

              {certData.pdfUrl && (
                <a
                  href={certData.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-2xl bg-[#8B7FE8] text-white font-extrabold text-xs hover:bg-[#786BD6] transition-all shadow-md min-h-[44px]"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              )}
            </div>

            {/* Verification Key Details Summary Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#171717] border border-[#E8E3FF] dark:border-[#2A2540]">
                <span className="text-xs font-bold text-[#6B6785] dark:text-[#808080] uppercase tracking-wider block mb-1">
                  Student Name
                </span>
                <span className="text-lg font-extrabold text-[#1E1B2E] dark:text-white">
                  {certData.studentName}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#171717] border border-[#E8E3FF] dark:border-[#2A2540]">
                <span className="text-xs font-bold text-[#6B6785] dark:text-[#808080] uppercase tracking-wider block mb-1">
                  Course Title
                </span>
                <span className="text-lg font-extrabold text-[#5CBFA0]">
                  {certData.courseTitle}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#171717] border border-[#E8E3FF] dark:border-[#2A2540]">
                <span className="text-xs font-bold text-[#6B6785] dark:text-[#808080] uppercase tracking-wider block mb-1">
                  Completion Date
                </span>
                <span className="text-lg font-extrabold text-[#1E1B2E] dark:text-white">
                  {new Date(certData.issuedDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Interactive Certificate Preview Component */}
            <div className="pt-2">
              <CertificateTemplate
                certificateId={certData.certificateId}
                studentName={certData.studentName}
                courseTitle={certData.courseTitle}
                issuedDate={new Date(certData.issuedDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
                courseDuration={certData.courseDuration}
                qrCodeUrl={certData.qrCodeUrl}
              />
            </div>
          </div>
        ) : (
          /* Invalid / Not Found State */
          <div className="max-w-xl mx-auto text-center rounded-3xl bg-white dark:bg-[#171717] border border-rose-200 dark:border-rose-900/50 p-8 sm:p-12 shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-200 dark:border-rose-800">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-extrabold text-[#1E1B2E] dark:text-white mb-2">
              Certificate Not Found
            </h1>

            <p className="text-sm text-[#6B6785] dark:text-[#B3B3B3] font-medium leading-relaxed mb-6">
              We could not verify a certificate with ID{" "}
              <strong className="text-rose-600 font-mono">#{certId}</strong>. Please check the ID URL or verify that the certificate was issued by Future With AI.
            </p>

            <Link
              href="/#explore"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#8B7FE8] text-white font-extrabold text-xs hover:bg-[#786BD6] transition-colors"
            >
              Explore Official AI Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
