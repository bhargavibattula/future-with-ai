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
// Remove mockTopPerformers completely

const mockRecentAchievements: AchievementItem[] = [
  { title: "Streak Master II (14 Days)", timeAgo: "2h ago", iconBg: "rgba(139, 127, 232, 0.15)", iconColor: "#8B7FE8" },
  { title: "Prompt Engineering Quiz Perfect 100%", timeAgo: "1d ago", iconBg: "rgba(92, 191, 160, 0.15)", iconColor: "#5CBFA0" },
  { title: "Level 8 Advancement Badge", timeAgo: "3d ago", iconBg: "rgba(240, 135, 155, 0.15)", iconColor: "#FFC9DE" },
];

export default function LeaderboardPanel() {
  const [timeframe, setTimeframe] = useState<"daily" | "week" | "month" | "allTime">("week");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const podiumRef = useRef<HTMLDivElement>(null);
  const crownRef = useRef<SVGSVGElement>(null);

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        if (data.success) {
          const mapped = data.leaderboard.map((u: any) => ({
            rank: u.rank,
            name: u.name,
            avatarInitials: u.name.substring(0, 2).toUpperCase(),
            avatarBg: u.rank === 1 ? "#8B7FE8" : u.rank === 2 ? "#5CBFA0" : "#FFC9DE",
            level: u.level || 1,
            xp: u.xp,
            accuracy: "98%", // mock accuracy
            streak: u.streak,
            coursesCompleted: Math.max(1, Math.floor(u.level / 2)),
            sparklineData: [u.xp * 0.5, u.xp * 0.7, u.xp * 0.8, u.xp * 0.9, u.xp],
            isCurrentUser: u.name === "You" || u.name.includes("Bhargavi") // Simple heuristic
          }));
          setLeaderboardData(mapped);
        }
      } catch (e) {
        console.error("Failed to fetch leaderboard", e);
      }
    };

    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        if (res.ok && json.success) {
          setDashboardData(json.data);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchLeaderboard();
    fetchDashboard();
  }, []);

  const currentData = leaderboardData.filter((u) =>
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
        if (blocks.length > 0) {
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
  }, [timeframe, leaderboardData.length]);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--card)] p-6 rounded-3xl border border-[var(--border)] shadow-soft-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="default" className="gap-1">
              <Trophy className="w-3.5 h-3.5 text-[#8B7FE8]" />
              Gamified Leaderboard
            </Badge>
            <span className="text-xs font-bold text-[var(--foreground-secondary)]">Global Ranks</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--foreground)]">
            🏆 Top Performers & Community Ranks
          </h3>
          <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-0.5">
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
              className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs font-bold bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[#8B7FE8] focus:ring-2 focus:ring-[#8B7FE8]/20 transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="inline-flex p-1.5 rounded-full bg-[var(--background-secondary)] border border-[var(--border)] shadow-soft-sm gap-1">
            {(["daily", "week", "month", "allTime"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all capitalize ${
                  timeframe === t
                    ? "bg-[#8B7FE8] text-white shadow-glow-primary"
                    : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
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
          <Card className="bg-[var(--card)] border-[var(--border)] shadow-soft-sm overflow-hidden p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-black text-[var(--foreground)] flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#8B7FE8]" />
                Top 3 Champions Podium
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 pt-4">
              <div ref={podiumRef} className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-6 sm:gap-6 pt-6 pb-4 px-2">
                {/* #2 PODIUM (LEFT FLANK - SILVER MINT) */}
                {second && (
                  <div className="podium-block w-full max-w-[240px] sm:max-w-none sm:w-1/3 flex flex-col items-center order-2 sm:order-1">
                    <div className="relative mb-3 flex flex-col items-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#5CBFA0] text-white font-black flex items-center justify-center text-lg sm:text-xl border-4 border-[var(--card)] shadow-soft-md hover:scale-110 transition-transform">
                        {second.avatarInitials}
                      </div>
                      <span className="absolute -bottom-2 bg-[var(--foreground)] text-[var(--card)] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[var(--card)]">
                        #2 Silver
                      </span>
                    </div>
                    <div className="text-sm font-black text-[var(--foreground)] truncate max-w-[130px]">
                      {second.name}
                    </div>
                    <div className="text-xs font-bold text-[#8B7FE8]">{second.xp.toLocaleString()} XP</div>

                    {/* Platform Base */}
                    <div className="w-full h-24 sm:h-28 bg-gradient-to-b from-[#5CBFA0]/20 via-[var(--card)] to-[var(--background-secondary)] border-2 border-[#5CBFA0] rounded-2xl sm:rounded-t-2xl sm:rounded-b-none mt-3 flex flex-col items-center justify-center p-3 text-center shadow-soft-sm">
                      <span className="text-xs font-black text-[var(--foreground)]">{second.accuracy} Acc</span>
                      <span className="text-[10px] font-bold text-[var(--foreground-secondary)]">🔥 {second.streak} Day Streak</span>
                    </div>
                  </div>
                )}

                {/* #1 PODIUM (CENTER ELEVATED - GOLD PURPLE) */}
                {first && (
                  <div className="podium-block w-full max-w-[260px] sm:max-w-none sm:w-1/3 flex flex-col items-center order-1 sm:order-2">
                    <div className="relative mb-3 flex flex-col items-center">
                      <Crown
                        ref={crownRef}
                        className="w-7 h-7 sm:w-8 sm:h-8 text-[#8B7FE8] fill-[#8B7FE8] absolute -top-7 sm:-top-8 animate-pulse-subtle"
                      />
                      <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#8B7FE8] text-white font-black flex items-center justify-center text-xl sm:text-2xl border-4 border-[#D8D2FA] shadow-glow-primary hover:scale-110 transition-transform">
                        {first.avatarInitials}
                      </div>
                      <span className="absolute -bottom-2 bg-[#8B7FE8] text-white text-xs font-black px-3 py-0.5 rounded-full border border-white shadow-soft-sm">
                        #1 Champion
                      </span>
                    </div>
                    <div className="text-base font-black text-[var(--foreground)] truncate max-w-[140px] mt-1">
                      {first.name}
                    </div>
                    <div className="text-sm font-black text-[#8B7FE8]">{first.xp.toLocaleString()} XP</div>

                    {/* Platform Base */}
                    <div className="w-full h-32 sm:h-40 bg-gradient-to-b from-[#8B7FE8]/25 via-[var(--card)] to-[var(--background-secondary)] border-2 border-[#8B7FE8] rounded-2xl sm:rounded-t-2xl sm:rounded-b-none mt-3 flex flex-col items-center justify-center p-3 text-center shadow-glow-primary">
                      <Badge variant="primary" className="mb-1 text-[10px]">
                        Level {first.level}
                      </Badge>
                      <span className="text-sm font-black text-[var(--foreground)]">{first.accuracy} Acc</span>
                      <span className="text-xs font-extrabold text-[#8B7FE8]">🔥 {first.streak} Day Streak</span>
                    </div>
                  </div>
                )}

                {/* #3 PODIUM (RIGHT FLANK - BRONZE PINK) */}
                {third && (
                  <div className="podium-block w-full sm:w-1/3 flex flex-col items-center order-3">
                    <div className="relative mb-3 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-[#FFC9DE] text-[#1E1B2E] font-black flex items-center justify-center text-xl border-4 border-[var(--card)] shadow-soft-md hover:scale-110 transition-transform">
                        {third.avatarInitials}
                      </div>
                      <span className="absolute -bottom-2 bg-[var(--foreground)] text-[var(--card)] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[var(--card)]">
                        #3 Bronze
                      </span>
                    </div>
                    <div className="text-sm font-black text-[var(--foreground)] truncate max-w-[130px]">
                      {third.name}
                    </div>
                    <div className="text-xs font-bold text-[#8B7FE8]">{third.xp.toLocaleString()} XP</div>

                    {/* Platform Base */}
                    <div className="w-full h-24 bg-gradient-to-b from-[#FFC9DE]/20 via-[var(--card)] to-[var(--background-secondary)] border-2 border-[#FFC9DE] rounded-t-2xl mt-3 flex flex-col items-center justify-center p-3 text-center shadow-soft-sm">
                      <span className="text-xs font-black text-[var(--foreground)]">{third.accuracy} Acc</span>
                      <span className="text-[10px] font-bold text-[var(--foreground-secondary)]">🔥 {third.streak} Day Streak</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SECTION B: COMPLETE RANKING TABLE FOR RANKS 4+ */}
          <Card className="bg-[var(--card)] border-[var(--border)] shadow-soft-sm p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-black text-[var(--foreground)]">
                Leaderboard Rankings (Ranks 4+)
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 space-y-3">
              {remaining.map((user) => (
                <div
                  key={user.rank}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-md ${
                    user.isCurrentUser
                      ? "bg-[var(--background-secondary)] border-[#8B7FE8] ring-2 ring-[#8B7FE8]/30 font-black"
                      : "bg-[var(--card)] border-[var(--border)] hover:border-[#8B7FE8]"
                  }`}
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-sm font-black text-[var(--foreground)] w-6">#{user.rank}</span>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 shadow-soft-sm"
                      style={{ backgroundColor: user.avatarBg }}
                    >
                      {user.avatarInitials}
                    </div>
                    <div>
                      <div className="text-xs font-black text-[var(--foreground)] flex items-center gap-2">
                        {user.name}
                        {user.isCurrentUser && (
                          <Badge variant="primary" className="text-[9px] py-0 px-1.5">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-[10px] text-[var(--foreground-secondary)] font-bold">
                        Level {user.level} • {user.accuracy} Accuracy • {user.coursesCompleted} Courses
                      </div>
                    </div>
                  </div>

                  {/* Sparkline Mini Trend Graph */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-[var(--foreground-secondary)]">Weekly Trend</span>
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
                      <div className="text-[10px] font-extrabold text-[var(--foreground-secondary)] flex items-center justify-end gap-1">
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
          <Card className="bg-[var(--card)] border-[var(--border)] shadow-soft-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-black text-[var(--foreground)] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#8B7FE8]" />
                Your Stats Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex items-center justify-between">
                <span className="font-extrabold text-[var(--foreground-secondary)]">Total XP Earned</span>
                <span className="font-black text-[#8B7FE8] text-sm">{dashboardData?.progress?.totalXP || 0} XP</span>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex items-center justify-between">
                <span className="font-extrabold text-[var(--foreground-secondary)]">Avg Quiz Accuracy</span>
                <span className="font-black text-[var(--foreground)] text-sm">
                  {dashboardData?.progress?.totalQuizzes > 0 ? "98%" : "0%"}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex items-center justify-between">
                <span className="font-extrabold text-[var(--foreground-secondary)]">Current Day Streak</span>
                <span className="font-black text-[var(--foreground)] text-sm flex items-center gap-1">
                  <Flame className="w-4 h-4 text-[#8B7FE8] fill-[#8B7FE8]" /> {dashboardData?.progress?.currentStreak || 0} Days
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex items-center justify-between">
                <span className="font-extrabold text-[var(--foreground-secondary)]">Courses Completed</span>
                <span className="font-black text-[#8B7FE8] text-sm flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-[#8B7FE8]" /> {dashboardData?.progress?.totalAssessments || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* SIDEBAR CARD 2: RECENT ACHIEVEMENTS */}
          <Card className="bg-[var(--card)] border-[var(--border)] shadow-soft-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-black text-[var(--foreground)] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#8B7FE8]" />
                Recent Achievements
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {(dashboardData?.userAchievements?.length > 0
                ? dashboardData.userAchievements.slice(0, 3).map((ua: any) => ({
                    title: ua.title,
                    timeAgo: new Date(ua.unlockedAt).toLocaleDateString(),
                    iconBg: "rgba(139, 127, 232, 0.15)",
                    iconColor: "#8B7FE8"
                  }))
                : mockRecentAchievements
              ).map((ach: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[#8B7FE8]/40 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-soft-sm"
                    style={{ backgroundColor: ach.iconBg }}
                  >
                    <Star className="w-4 h-4" style={{ color: ach.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-[var(--foreground)] truncate">
                      {ach.title}
                    </div>
                    <div className="text-[10px] font-bold text-[var(--foreground-secondary)]">
                      Unlocked {ach.timeAgo}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* SIDEBAR CARD 3: AI INSIGHT CARD */}
          <Card className="bg-gradient-to-br from-[#8B7FE8]/15 via-[var(--card)] to-[#5CBFA0]/15 border border-[#8B7FE8]/30 shadow-soft-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="primary" className="text-[10px]">
                  <Sparkles className="w-3 h-3 text-white" /> AI Insight
                </Badge>
              </div>
              <CardTitle className="text-base font-black text-[var(--foreground)] mt-1">
                You're in the top {dashboardData?.progress?.globalRank ? Math.max(1, Math.round((dashboardData.progress.globalRank / 1000) * 100)) : 5}% this week! 🎉
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed">
                {dashboardData?.progress?.globalRank > 3
                  ? `Completing 1 more lesson today will move you from Rank #${dashboardData.progress.globalRank} into the Top 3 Podium on the weekly leaderboard!`
                  : "You are currently in the Top 3! Maintain your streak to defend your spot!"}
              </p>

              <Button size="sm" className="w-full text-xs font-extrabold justify-center gap-1.5 shadow-soft-sm bg-[#8B7FE8] hover:bg-[#786BD6] text-white">
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
