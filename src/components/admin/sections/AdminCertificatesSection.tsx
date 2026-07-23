"use client";

import React, { useState } from "react";
import { Award, QrCode, Sparkles, CheckCircle, Download, ExternalLink } from "lucide-react";
import { ADMIN_CERTIFICATES, AdminCertificateTemplate } from "@/data/adminData";

export default function AdminCertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<AdminCertificateTemplate>(
    ADMIN_CERTIFICATES[0]
  );

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight">
            Certificates <span className="text-[#8B7FE8]">Studio & Verification</span>
          </h2>
          <p className="text-xs text-[#6B6785] font-medium">
            Customize certificate templates, preview live credentials, and issue verification URLs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* TEMPLATES LIST */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-extrabold text-[#1E1B2E]">Active Templates</h3>
          {ADMIN_CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                selectedCert.id === cert.id
                  ? "bg-white border-[#8B7FE8] shadow-soft-md ring-2 ring-[#8B7FE8]/20"
                  : "bg-white border-[#E8E3FF] shadow-soft hover:border-[#8B7FE8]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-[#1E1B2E]">
                  {cert.title}
                </span>
                <span className="text-[10px] font-bold bg-[#E6F9F0] text-[#0E8566] px-2.5 py-0.5 rounded-full border border-[#9DD9C5]">
                  {cert.issuedCount} Issued
                </span>
              </div>
              <span className="text-xs text-[#6B6785] font-medium block">
                Course: {cert.courseTitle}
              </span>
            </div>
          ))}
        </div>

        {/* LIVE CERTIFICATE PREVIEW CARD */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#F5F2FF] via-[#FFFFFF] to-[#F8F9FC] rounded-3xl border border-[#E8E3FF] p-8 shadow-soft relative overflow-hidden text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#8B7FE8] to-[#A78BFA] flex items-center justify-center text-white shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B7FE8] block mb-2">
            OFFICIAL VERIFIED CERTIFICATE OF COMPLETION
          </span>

          <h3 className="text-2xl font-black text-[#1E1B2E] tracking-tight mb-2">
            {selectedCert.title}
          </h3>

          <p className="text-xs text-[#6B6785] font-medium max-w-sm mx-auto mb-6">
            This credential verifies that the recipient has completed all course requirements for{" "}
            <span className="font-bold text-[#1E1B2E]">{selectedCert.courseTitle}</span> on Future.ai.
          </p>

          <div className="flex items-center justify-center gap-6 p-4 rounded-2xl bg-white border border-[#E8E3FF] max-w-sm mx-auto">
            <img
              src={selectedCert.qrCodeUrl}
              alt="QR Code"
              className="w-16 h-16 rounded-xl border border-[#E8E3FF]"
            />
            <div className="text-left text-xs font-bold text-[#1E1B2E]">
              <span className="block text-[10px] text-[#6B6785] uppercase">
                Verification URL
              </span>
              <span className="text-[#8B7FE8] font-extrabold">future.ai/verify/{selectedCert.id}</span>
              <span className="block text-[10px] text-[#74D99F] mt-1 font-semibold">
                ✓ Cryptographically Signed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
