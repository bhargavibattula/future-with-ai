"use client";

import React from "react";
import LeaderboardPanel from "@/components/dashboard/LeaderboardPanel";
import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#FCFBFF] text-[#1E1B2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-6">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#EAE6FE] text-[#6B6785] hover:text-[#1E1B2E] hover:border-[#8B7FE8] transition-all text-xs font-extrabold shadow-soft-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <Link
            href="/dashboard/streak"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#8B7FE8] text-white hover:bg-[#786BD6] transition-all text-xs font-extrabold shadow-soft-sm"
          >
            <Flame className="w-4 h-4" />
            View My Streak
          </Link>
        </div>

        {/* Leaderboard Panel Component */}
        <LeaderboardPanel />
      </div>
    </div>
  );
}
