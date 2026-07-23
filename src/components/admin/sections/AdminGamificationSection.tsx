"use client";

import React, { useState } from "react";
import { Zap, Coins, Flame, Trophy, Sparkles, Plus, Award } from "lucide-react";
import { ADMIN_BADGES, AdminBadge } from "@/data/adminData";

export default function AdminGamificationSection() {
  const [badges, setBadges] = useState<AdminBadge[]>(ADMIN_BADGES);

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight">
            Gamification & <span className="text-[#8B7FE8]">Economy Studio</span>
          </h2>
          <p className="text-xs text-[#6B6785] font-medium">
            Configure XP multipliers, coin rewards, daily streak bonuses, and badge unlock rules.
          </p>
        </div>
      </div>

      {/* ECONOMY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-[#E8E3FF] shadow-soft">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF8FF] text-[#2B6CB0] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#6B6785] uppercase">
                Base XP Rate
              </span>
              <h3 className="text-xl font-black text-[#1E1B2E]">1.5x Multiplier</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E8E3FF] shadow-soft">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF0F5] text-[#C0336A] flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#6B6785] uppercase">
                Daily Coin Cap
              </span>
              <h3 className="text-xl font-black text-[#1E1B2E]">500 Coins / Day</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E8E3FF] shadow-soft">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-[#E6F9F0] text-[#0E8566] flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#6B6785] uppercase">
                Max Streak Shield
              </span>
              <h3 className="text-xl font-black text-[#1E1B2E]">3 Days Active</h3>
            </div>
          </div>
        </div>
      </div>

      {/* BADGES CATALOG */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E3FF] shadow-soft space-y-4">
        <h3 className="text-base font-extrabold text-[#1E1B2E]">
          Active Badges Catalog ({badges.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 rounded-2xl border border-[#E8E3FF] bg-[#FCFBFF] flex items-center gap-3"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: badge.bgColor,
                  borderColor: badge.borderColor,
                }}
              >
                <Sparkles className="w-6 h-6 text-[#8B7FE8]" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#1E1B2E]">{badge.name}</h4>
                <span className="text-[10px] font-bold text-[#6B6785] block">
                  +{badge.xpBonus} XP • +{badge.coinBonus} Coins
                </span>
                <span className="text-[9px] font-extrabold text-[#0E8566]">
                  {badge.unlockedCount} Earned
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
