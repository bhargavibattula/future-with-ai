"use client";

import React from "react";
import { ShieldCheck, Award, Sparkles, CheckCircle2 } from "lucide-react";

export interface CertificateTemplateProps {
  certificateId: string;
  studentName: string;
  courseTitle: string;
  issuedDate: string;
  courseDuration: string;
  qrCodeUrl?: string;
  verificationUrl?: string;
  className?: string;
}

export default function CertificateTemplate({
  certificateId,
  studentName,
  courseTitle,
  issuedDate,
  courseDuration,
  qrCodeUrl,
  verificationUrl = `https://futurewithai.com/verify/${certificateId}`,
  className = "",
}: CertificateTemplateProps) {
  const displayName = (studentName && studentName.trim()) ? studentName.trim() : "Valued Learner";

  return (
    <div
      className={`relative w-full max-w-4xl mx-auto rounded-[32px] bg-white text-[#1E1B2E] border-2 border-[#EAE6FE] shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden font-sans ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(139, 127, 232, 0.06) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(184, 232, 216, 0.08) 0%, transparent 40%)",
      }}
    >
      {/* Elegant Double Border Frame */}
      <div className="absolute inset-3 rounded-[24px] border-2 border-[#8B7FE8]/30 pointer-events-none" />
      <div className="absolute inset-5 rounded-[20px] border border-[#C5A059]/40 pointer-events-none" />

      {/* Decorative Subtle Corner Accents */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#8B7FE8]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#B8E8D8]/15 blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#EAE6FE]">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#8B7FE8] via-[#A599F2] to-[#B8E8D8] p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#8B7FE8]" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-[#1E1B2E] flex items-center gap-1.5">
              FUTURE WITH AI
            </h2>
            <p className="text-xs font-bold text-[#6B6785]">Verified Educational Credential</p>
          </div>
        </div>

        {/* Credentials Verified Badge */}
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#059669] bg-[#EDF9F5] px-4 py-2 rounded-full border border-[#B8E8D8] shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#059669]" />
          Credentials Verified
        </div>
      </div>

      {/* Main Certificate Content */}
      <div className="relative z-10 py-8 text-center space-y-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B7FE8] bg-[#F3F0FE] px-5 py-2 rounded-full border border-[#D8D2FA]">
            Certificate of Completion
          </span>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6B6785] mt-5">
            This is proudly presented to
          </p>
        </div>

        {/* Recipient Name */}
        <div className="py-1">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1E1B2E] uppercase font-serif">
            {displayName}
          </h1>
          <div className="w-56 h-1 bg-gradient-to-r from-[#8B7FE8] via-[#C5A059] to-[#B8E8D8] mx-auto mt-3 rounded-full shadow-sm" />
        </div>

        {/* Completion Statement */}
        <p className="text-sm sm:text-base text-[#6B6785] max-w-xl mx-auto font-medium leading-relaxed">
          for successfully achieving 100% completion in the master curriculum for
        </p>

        {/* Course Title Badge */}
        <div className="inline-block bg-[#F8F7FF] border border-[#D8D2FA] px-8 py-3.5 rounded-2xl shadow-sm">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#8B7FE8]">
            {courseTitle}
          </h3>
        </div>
      </div>

      {/* Footer Grid & QR Code */}
      <div className="relative z-10 pt-6 border-t border-[#EAE6FE] grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        {/* Issue Date */}
        <div className="bg-[#FCFBFF] p-4 rounded-2xl border border-[#EAE6FE]">
          <span className="text-[10px] font-extrabold text-[#6B6785] uppercase tracking-wider block mb-1">
            Issue Date
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-[#1E1B2E]">
            {issuedDate}
          </span>
        </div>

        {/* Course Duration */}
        <div className="bg-[#FCFBFF] p-4 rounded-2xl border border-[#EAE6FE]">
          <span className="text-[10px] font-extrabold text-[#6B6785] uppercase tracking-wider block mb-1">
            Course Length
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-[#1E1B2E]">
            {courseDuration}
          </span>
        </div>

        {/* Certificate ID */}
        <div className="bg-[#F3F0FE] p-4 rounded-2xl border border-[#D8D2FA]">
          <span className="text-[10px] font-extrabold text-[#8B7FE8] uppercase tracking-wider block mb-1">
            Certificate ID
          </span>
          <span className="text-xs sm:text-sm font-mono font-extrabold text-[#8B7FE8]">
            #{certificateId}
          </span>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center sm:items-end justify-center">
          <div className="w-20 h-20 bg-white p-1.5 rounded-xl shadow-md border border-[#EAE6FE] overflow-hidden flex items-center justify-center">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt={`QR code for ${certificateId}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-[#F3F0FE] flex items-center justify-center text-[9px] text-[#8B7FE8] font-mono text-center p-1">
                QR CODE
              </div>
            )}
          </div>
          <span className="text-[10px] font-bold text-[#6B6785] mt-1.5">
            Scan to Verify
          </span>
        </div>
      </div>
    </div>
  );
}
