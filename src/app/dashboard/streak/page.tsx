"use client";

import React from "react";
import StreaksPanel from "@/components/dashboard/StreaksPanel";
import Link from "next/link";
import { ArrowLeft, Trophy, Sparkles } from "lucide-react";

export default function LearningJourneyPage() {
  return (
    <div className="min-h-screen bg-[#FCFBFF] dark:bg-[#0F0D17] text-[#1E1B2E] dark:text-[#EAE6FE] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-6">
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#1A1827] border border-[#EAE6FE] dark:border-[#332C4A] text-[#6B6785] dark:text-[#A09CB8] hover:text-[#1E1B2E] dark:hover:text-white hover:border-[#8B7FE8] transition-all text-xs font-extrabold shadow-soft-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[var(--foreground)] tracking-tight flex items-center gap-2">
                Learning Journey
                <Sparkles className="w-5 h-5 text-[#8B7FE8]" />
              </h1>
              <p className="text-xs text-[var(--foreground-secondary)]">
                Your complete learning analytics & streak mastery dashboard
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/leaderboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#8B7FE8] text-white hover:bg-[#786BD6] transition-all text-xs font-extrabold shadow-soft-sm self-stretch sm:self-auto justify-center"
          >
            <Trophy className="w-4 h-4" />
            View Leaderboard
          </Link>
        </div>

        {/* Streaks & Learning Journey Panel */}
        <StreaksPanel />
      </div>
    </div>
  );
}
