import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — Future.ai Platform",
  description: "Enterprise administration suite for Future.ai courses, users, analytics, and visual roadmap builder.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFF] text-[#1E1B2E] font-sans selection:bg-[#D8D2FA] selection:text-[#1E1B2E]">
      {children}
    </div>
  );
}
