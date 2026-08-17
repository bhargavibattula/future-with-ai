"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthCard from "@/components/auth/AuthCard";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Soft background ambient gradients */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blob-violet blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blob-pink blur-3xl opacity-60 pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <AuthCard initialMode="forgot-password" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
