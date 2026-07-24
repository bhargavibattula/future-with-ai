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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      {children}
    </div>
  );
}
