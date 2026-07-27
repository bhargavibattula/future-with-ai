"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Trophy,
  Crown,
  Flame,
  Zap,
  Target,
  Award,
  BookOpen,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Star,
  Search,
  ArrowLeft,
  User,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Typed Mock Interfaces
export interface LeaderboardUser {
  rank: number;
  name: string;
  avatarInitials: string;
  avatarBg: string;
  level: number;
  xp: number;
  accuracy: string;
  streak: number;
  coursesCompleted: number;
  sparklineData: number[];
  isCurrentUser?: boolean;
}

export interface AchievementItem {
  title: string;
  timeAgo: string;
  iconBg: string;
  iconColor: string;
}

// Sample Mock Data Array with Sparklines
const mockTopPerformers: Record<"daily" | "week" | "month" | "allTime", LeaderboardUser[]> = {
  daily: [
    { rank: 1, name: "Aarav Sharma", avatarInitials: "AS", avatarBg: "#8B7FE8", level: 12, xp: 950, accuracy: "98%", streak: 18, coursesCompleted: 6, sparklineData: [20, 35, 45, 60, 80, 95] },
    { rank: 2, name: "Ananya Rao", avatarInitials: "AR", avatarBg: "#B8E8D8", level: 10, xp: 820, accuracy: "95%", streak: 14, coursesCompleted: 5, sparklineData: [15, 30, 40, 55, 70, 82] },
    { rank: 3, name: "Vikram Patel", avatarInitials: "VP", avatarBg: "#FFC9DE", level: 9, xp: 750, accuracy: "94%", streak: 12, coursesCompleted: 4, sparklineData: [10, 25, 35, 50, 65, 75] },
    { rank: 4, name: "You (Bhargavi)", avatarInitials: "BB", avatarBg: "#8B7FE8", level: 8, xp: 680, accuracy: "96%", streak: 14, coursesCompleted: 4, sparklineData: [12, 28, 38, 52, 60, 68], isCurrentUser: true },
    { rank: 5, name: "Sneha Reddy", avatarInitials: "SR", avatarBg: "#D8D2FA", level: 8, xp: 610, accuracy: "92%", streak: 9, coursesCompleted: 3, sparklineData: [10, 20, 30, 45, 55, 61] },
  ],
  week: [
    { rank: 1, name: "Aarav Sharma", avatarInitials: "AS", avatarBg: "#8B7FE8", level: 12, xp: 4850, accuracy: "98%", streak: 18, coursesCompleted: 6, sparklineData: [200, 350, 450, 600, 800, 950] },
    { rank: 2, name: "Ananya Rao", avatarInitials: "AR", avatarBg: "#B8E8D8", level: 10, xp: 4210, accuracy: "95%", streak: 14, coursesCompleted: 5, sparklineData: [150, 300, 400, 550, 700, 820] },
    { rank: 3, name: "Vikram Patel", avatarInitials: "VP", avatarBg: "#FFC9DE", level: 9, xp: 3950, accuracy: "94%", streak: 12, coursesCompleted: 4, sparklineData: [100, 250, 350, 500, 650, 750] },
    { rank: 4, name: "You (Bhargavi)", avatarInitials: "BB", avatarBg: "#8B7FE8", level: 8, xp: 3420, accuracy: "96%", streak: 14, coursesCompleted: 4, sparklineData: [120, 280, 380, 520, 600, 680], isCurrentUser: true },
    { rank: 5, name: "Sneha Reddy", avatarInitials: "SR", avatarBg: "#D8D2FA", level: 8, xp: 3200, accuracy: "92%", streak: 9, coursesCompleted: 3, sparklineData: [100, 200, 300, 450, 550, 610] },
  ],
  month: [
    { rank: 1, name: "Ananya Rao", avatarInitials: "AR", avatarBg: "#B8E8D8", level: 14, xp: 16400, accuracy: "97%", streak: 28, coursesCompleted: 8, sparklineData: [1200, 2500, 4000, 8000, 12000, 16400] },
    { rank: 2, name: "Aarav Sharma", avatarInitials: "AS", avatarBg: "#8B7FE8", level: 13, xp: 15200, accuracy: "96%", streak: 25, coursesCompleted: 7, sparklineData: [1000, 2200, 3800, 7500, 11000, 15200] },
    { rank: 3, name: "You (Bhargavi)", avatarInitials: "BB", avatarBg: "#8B7FE8", level: 8, xp: 13800, accuracy: "96%", streak: 14, coursesCompleted: 4, sparklineData: [900, 2000, 3500, 7000, 10000, 13800], isCurrentUser: true },
    { rank: 4, name: "Vikram Patel", avatarInitials: "VP", avatarBg: "#FFC9DE", level: 11, xp: 12900, accuracy: "93%", streak: 20, coursesCompleted: 5, sparklineData: [800, 1800, 3200, 6500, 9500, 12900] },
  ],
  allTime: [
    { rank: 1, name: "Aarav Sharma", avatarInitials: "AS", avatarBg: "#8B7FE8", level: 24, xp: 48900, accuracy: "99%", streak: 64, coursesCompleted: 15, sparklineData: [5000, 12000, 22000, 35000, 42000, 48900] },
    { rank: 2, name: "Ananya Rao", avatarInitials: "AR", avatarBg: "#B8E8D8", level: 22, xp: 44200, accuracy: "98%", streak: 52, coursesCompleted: 14, sparklineData: [4500, 11000, 20000, 32000, 39000, 44200] },
    { rank: 3, name: "Vikram Patel", avatarInitials: "VP", avatarBg: "#FFC9DE", level: 19, xp: 38100, accuracy: "95%", streak: 41, coursesCompleted: 11, sparklineData: [4000, 9500, 17000, 27000, 33000, 38100] },
    { rank: 4, name: "You (Bhargavi)", avatarInitials: "BB", avatarBg: "#8B7FE8", level: 8, xp: 31800, accuracy: "96%", streak: 14, coursesCompleted: 4, sparklineData: [3500, 8000, 15000, 22000, 27000, 31800], isCurrentUser: true },
  ],
};

const mockRecentAchievements: AchievementItem[] = [
  { title: "Streak Master II (14 Days)", timeAgo: "2h ago", iconBg: "#F3F0FE", iconColor: "#8B7FE8" },
  { title: "Prompt Engineering Quiz Perfect 100%", timeAgo: "1d ago", iconBg: "#EDF9F5", iconColor: "#5CBFA0" },
  { title: "Level 8 Advancement Badge", timeAgo: "3d ago", iconBg: "#FFF0F5", iconColor: "#FFC9DE" },
];

export default function LeaderboardPanel() {
  const [timeframe, setTimeframe] = useState<"daily" | "week" | "month" | "allTime">("week");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const podiumRef = useRef<HTMLDivElement>(null);
  const crownRef = useRef<SVGSVGElement>(null);

  const currentData = mockTopPerformers[timeframe].filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const first = currentData.find((u) => u.rank === 1);
  const second = currentData.find((u) => u.rank === 2);
  const third = currentData.find((u) => u.rank === 3);
  const remaining = currentData.filter((u) => u.rank > 3);

  // GSAP 3D Floating Podium Oscillations & Entrance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Podium Rise-Up Entrance
      if (podiumRef.current) {
        const blocks = podiumRef.current.querySelectorAll(".podium-block");
        gsap.fromTo(
          blocks,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.6)",
          }
        );

        // Continuous Gentle 3D Floating Sine Wave Float for Podium
        gsap.to(blocks, {
          y: "-=6",
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
          ease: "sine.easeInOut",
        });
      }

      // 2. Crown Bounce & Rotation
      if (crownRef.current) {
        gsap.fromTo(
          crownRef.current,
          { scale: 0.4, rotate: -20 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.7,
            delay: 0.4,
            ease: "elastic.out(1.4, 0.4)",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [timeframe]);

  // Helper to generate SVG sparkline path string
  const renderSparkline = (data: number[]) => {
    const min = Math.min(...data);
    const max = Math.max(...data) || 1;
    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * 60;
        const y = 20 - ((val - min) / (max - min)) * 16;
        return `${x},${y}`;
      })
      .join(" ");
    return points;
  };

  return (
    <div ref={containerRef} className="space-y-8">
      {/* 1. WELCOME HEADER & ANIMATED FILTER TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE6FE] shadow-soft-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="default" className="gap-1">
              <Trophy className="w-3.5 h-3.5 text-[#8B7FE8]" />
              Gamified Leaderboard
            </Badge>
            <span className="text-xs font-bold text-[#6B6785]">Global Ranks</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#1E1B2E]">
            🏆 Top Performers & Community Ranks
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6785] mt-0.5">
            Rankings updated in real time based on XP, quiz accuracy & daily consistency.
          </p>
        </div>

        {/* Search Bar & Timeframe Filter Pills */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Expanding Search Bar */}
          <div className="relative w-full sm:w-48 group">
            <Search className="w-4 h-4 text-[#8B7FE8] absolute left-3 top-1/2 -translate-y-1/2 group-hover:rotate-12 transition-transform" />
            <input
              type="text"
              placeholder="Search user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs font-bold bg-[#FCFBFF] border border-[#EAE6FE] text-[#1E1B2E] outline-none focus:border-[#8B7FE8] focus:ring-2 focus:ring-[#8B7FE8]/20 transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="inline-flex p-1.5 rounded-full bg-[#FCFBFF] border border-[#EAE6FE] shadow-soft-sm gap-1">
            {(["daily", "week", "month", "allTime"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all capitalize ${
                  timeframe === t
                    ? "bg-[#8B7FE8] text-white shadow-glow-primary"
                    : "text-[#6B6785] hover:text-[#1E1B2E]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: PODIUM & RANKED TABLE (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* SECTION A: 3D FLOATING PODIUM FOR TOP 3 */}
          <Card className="bg-white border-[#EAE6FE] shadow-soft-sm overflow-hidden p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-black text-[#1E1B2E] flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#8B7FE8]" />
                Top 3 Champions Podium
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 pt-4">
              <div ref={podiumRef} className="flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6 pt-8 pb-4">
                {/* #2 PODIUM (LEFT FLANK - SILVER MINT) */}
                {second && (
                  <div className="podium-block w-full sm:w-1/3 flex flex-col items-center order-2 sm:order-1">
                    <div className="relative mb-3 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-[#B8E8D8] text-[#1E1B2E] font-black flex items-center justify-center text-xl border-4 border-white shadow-soft-md hover:scale-110 transition-transform">
                        {second.avatarInitials}
                      </div>
                      <span className="absolute -bottom-2 bg-[#1E1B2E] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border border-white">
                        #2 Silver
                      </span>
                    </div>
                    <div className="text-sm font-black text-[#1E1B2E] truncate max-w-[130px]">
                      {second.name}
                    </div>
                    <div className="text-xs font-bold text-[#8B7FE8]">{second.xp.toLocaleString()} XP</div>

                    {/* Platform Base */}
                    <div className="w-full h-28 bg-gradient-to-b from-[#EDF9F5] to-[#B8E8D8]/50 border-2 border-[#B8E8D8] rounded-t-2xl mt-3 flex flex-col items-center justify-center p-3 text-center shadow-soft-sm">
                      <span className="text-xs font-black text-[#1E1B2E]">{second.accuracy} Acc</span>
                      <span className="text-[10px] font-bold text-[#6B6785]">🔥 {second.streak} Day Streak</span>
                    </div>
                  </div>
                )}

                {/* #1 PODIUM (CENTER ELEVATED - GOLD PURPLE) */}
                {first && (
                  <div className="podium-block w-full sm:w-1/3 flex flex-col items-center order-1 sm:order-2">
                    <div className="relative mb-3 flex flex-col items-center">
                      <Crown
                        ref={crownRef}
                        className="w-8 h-8 text-[#8B7FE8] fill-[#8B7FE8] absolute -top-8 animate-pulse-subtle"
                      />
                      <div className="w-22 h-22 rounded-full bg-[#8B7FE8] text-white font-black flex items-center justify-center text-2xl border-4 border-[#D8D2FA] shadow-glow-primary hover:scale-110 transition-transform">
                        {first.avatarInitials}
                      </div>
                      <span className="absolute -bottom-2 bg-[#8B7FE8] text-white text-xs font-black px-3 py-0.5 rounded-full border border-white shadow-soft-sm">
                        #1 Champion
                      </span>
                    </div>
                    <div className="text-base font-black text-[#1E1B2E] truncate max-w-[140px] mt-1">
                      {first.name}
                    </div>
                    <div className="text-sm font-black text-[#8B7FE8]">{first.xp.toLocaleString()} XP</div>

                    {/* Platform Base */}
                    <div className="w-full h-40 bg-gradient-to-b from-[#F3F0FE] via-white to-[#D8D2FA]/50 border-2 border-[#8B7FE8] rounded-t-2xl mt-3 flex flex-col items-center justify-center p-3 text-center shadow-glow-primary">
                      <Badge variant="primary" className="mb-1 text-[10px]">
                        Level {first.level}
                      </Badge>
                      <span className="text-sm font-black text-[#1E1B2E]">{first.accuracy} Acc</span>
                      <span className="text-xs font-extrabold text-[#8B7FE8]">🔥 {first.streak} Day Streak</span>
                    </div>
                  </div>
                )}

                {/* #3 PODIUM (RIGHT FLANK - BRONZE PINK) */}
                {third && (
                  <div className="podium-block w-full sm:w-1/3 flex flex-col items-center order-3">
                    <div className="relative mb-3 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-[#FFC9DE] text-[#1E1B2E] font-black flex items-center justify-center text-xl border-4 border-white shadow-soft-md hover:scale-110 transition-transform">
                        {third.avatarInitials}
                      </div>
                      <span className="absolute -bottom-2 bg-[#1E1B2E] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border border-white">
                        #3 Bronze
                      </span>
                    </div>
                    <div className="text-sm font-black text-[#1E1B2E] truncate max-w-[130px]">
                      {third.name}
                    </div>
                    <div className="text-xs font-bold text-[#8B7FE8]">{third.xp.toLocaleString()} XP</div>

                    {/* Platform Base */}
                    <div className="w-full h-24 bg-gradient-to-b from-[#FFF0F5] to-[#FFC9DE]/50 border-2 border-[#FFC9DE] rounded-t-2xl mt-3 flex flex-col items-center justify-center p-3 text-center shadow-soft-sm">
                      <span className="text-xs font-black text-[#1E1B2E]">{third.accuracy} Acc</span>
                      <span className="text-[10px] font-bold text-[#6B6785]">🔥 {third.streak} Day Streak</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SECTION B: COMPLETE RANKING TABLE FOR RANKS 4+ */}
          <Card className="bg-white border-[#EAE6FE] shadow-soft-sm p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-black text-[#1E1B2E]">
                Leaderboard Rankings (Ranks 4+)
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 space-y-3">
              {remaining.map((user) => (
                <div
                  key={user.rank}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-md ${
                    user.isCurrentUser
                      ? "bg-[#F3F0FE] border-[#8B7FE8] ring-2 ring-[#8B7FE8]/30 font-black"
                      : "bg-[#FCFBFF] border-[#EAE6FE] hover:border-[#8B7FE8]"
                  }`}
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-sm font-black text-[#1E1B2E] w-6">#{user.rank}</span>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 shadow-soft-sm"
                      style={{ backgroundColor: user.avatarBg }}
                    >
                      {user.avatarInitials}
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#1E1B2E] flex items-center gap-2">
                        {user.name}
                        {user.isCurrentUser && (
                          <Badge variant="primary" className="text-[9px] py-0 px-1.5">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-[10px] text-[#6B6785] font-bold">
                        Level {user.level} • {user.accuracy} Accuracy • {user.coursesCompleted} Courses
                      </div>
                    </div>
                  </div>

                  {/* Sparkline Mini Trend Graph */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-[#6B6785]">Weekly Trend</span>
                      <svg className="w-16 h-6 overflow-visible">
                        <polyline
                          fill="none"
                          stroke="#8B7FE8"
                          strokeWidth="2"
                          points={renderSparkline(user.sparklineData)}
                        />
                      </svg>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-black text-[#8B7FE8]">
                        {user.xp.toLocaleString()} XP
                      </div>
                      <div className="text-[10px] font-extrabold text-[#6B6785] flex items-center justify-end gap-1">
                        <Flame className="w-3.5 h-3.5 text-[#8B7FE8] fill-[#8B7FE8]" />
                        {user.streak} Days
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* SIDEBAR CARD 1: YOUR STATS SUMMARY */}
          <Card className="bg-white border-[#EAE6FE] shadow-soft-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-black text-[#1E1B2E] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#8B7FE8]" />
                Your Stats Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] flex items-center justify-between">
                <span className="font-extrabold text-[#6B6785]">Total XP Earned</span>
                <span className="font-black text-[#8B7FE8] text-sm">3,420 XP</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] flex items-center justify-between">
                <span className="font-extrabold text-[#6B6785]">Avg Quiz Accuracy</span>
                <span className="font-black text-[#1E1B2E] text-sm">96%</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] flex items-center justify-between">
                <span className="font-extrabold text-[#6B6785]">Current Day Streak</span>
                <span className="font-black text-[#1E1B2E] text-sm flex items-center gap-1">
                  <Flame className="w-4 h-4 text-[#8B7FE8] fill-[#8B7FE8]" /> 14 Days
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] flex items-center justify-between">
                <span className="font-extrabold text-[#6B6785]">Courses Completed</span>
                <span className="font-black text-[#8B7FE8] text-sm flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-[#8B7FE8]" /> 4 / 6
                </span>
              </div>
            </CardContent>
          </Card>

          {/* SIDEBAR CARD 2: RECENT ACHIEVEMENTS */}
          <Card className="bg-white border-[#EAE6FE] shadow-soft-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-black text-[#1E1B2E] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#8B7FE8]" />
                Recent Achievements
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {mockRecentAchievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] hover:border-[#8B7FE8]/40 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-soft-sm"
                    style={{ backgroundColor: ach.iconBg }}
                  >
                    <Star className="w-4 h-4" style={{ color: ach.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-[#1E1B2E] truncate">
                      {ach.title}
                    </div>
                    <div className="text-[10px] font-bold text-[#6B6785]">
                      Unlocked {ach.timeAgo}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* SIDEBAR CARD 3: AI INSIGHT CARD */}
          <Card className="bg-gradient-to-br from-[#F3F0FE] via-white to-[#EDF9F5] border border-[#D8D2FA] shadow-soft-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="primary" className="text-[10px]">
                  <Sparkles className="w-3 h-3 text-white" /> AI Insight
                </Badge>
              </div>
              <CardTitle className="text-base font-black text-[#1E1B2E] mt-1">
                You're in the top 5% this week! 🎉
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-xs text-[#6B6785] leading-relaxed">
                Completing <strong>1 more lesson today</strong> will move you from <strong>Rank #4</strong> into the <strong>Top 3 Podium</strong> on the weekly leaderboard!
              </p>

              <Button size="sm" className="w-full text-xs font-extrabold justify-center gap-1.5 shadow-soft-sm">
                Start Next Lesson Now
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
