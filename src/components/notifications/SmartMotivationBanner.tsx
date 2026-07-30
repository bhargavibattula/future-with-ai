"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Flame, Target, Trophy, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function SmartMotivationBanner() {
  const { user } = useAuth();
  const streak = user?.streak || 0;
  const xp = user?.xp || 0;

  // Next milestone calculation
  const milestoneLevels = [5, 10, 25, 50, 100];
  const totalLessons = Math.floor(xp / 100);
  const nextMilestone = milestoneLevels.find((m) => m > totalLessons) || 100;
  const lessonsLeft = Math.max(1, nextMilestone - totalLessons);

  return (
    <div className="bg-gradient-to-r from-[#F3F0FE] via-white to-[#EDF9F5] dark:from-[#231E38] dark:via-[#1A1827] dark:to-[#1D2B2A] rounded-3xl p-6 border border-[#EAE6FE] dark:border-[#332C4A] shadow-soft-sm relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8B7FE8]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#251E3A] border border-[#EAE6FE] dark:border-[#332C4A] text-[#8B7FE8] flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-6 h-6 text-[#8B7FE8]" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8B7FE8]/10 text-[#8B7FE8] dark:text-[#D8D2FA] text-[10px] font-black uppercase tracking-wider">
                Smart Motivation & AI Assistant
              </span>
              {streak > 0 && (
                <span className="flex items-center gap-1 text-xs font-bold text-orange-500">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  {streak}-Day Streak
                </span>
              )}
            </div>

            <h3 className="text-base font-extrabold text-[var(--foreground)]">
              {streak > 5
                ? "You're on fire! Keep up your awesome momentum."
                : "Boost your daily AI progress!"}
            </h3>

            <p className="text-xs text-[var(--foreground-secondary)] mt-1 flex items-center gap-1.5 flex-wrap">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>
                <strong>{lessonsLeft} more lesson{lessonsLeft > 1 ? "s" : ""}</strong> to reach your next milestone ({nextMilestone} total lessons).
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/courses/claude"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#8B7FE8] hover:bg-[#786BD6] text-white font-extrabold text-xs shadow-soft-sm transition-all active:scale-95"
          >
            <Target className="w-4 h-4" />
            <span>Continue Learning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
