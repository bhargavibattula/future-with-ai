"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBFF] text-[#1E1B2E] selection:bg-[#D8D2FA] selection:text-[#1E1B2E]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Soft background ambient gradients */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blob-violet blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blob-pink blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blob-mint blur-3xl opacity-40 pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <AuthCard initialMode="login" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
