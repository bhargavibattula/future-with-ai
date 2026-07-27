"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import FlameMascot from "./FlameMascot";
import {
  Flame,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Trophy,
  Sparkles,
  Zap,
  Target,
  Award,
  Lock,
  Calendar as CalendarIcon,
  MapPin,
  TrendingUp,
  BarChart3,
  Clock,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface MilestoneItem {
  days: number;
  label: string;
  unlocked: boolean;
  rewardXP: number;
}

export interface RewardItem {
  id: string;
  title: string;
  category: string;
  iconBg: string;
  unlocked: boolean;
}

export interface DailyAnalyticsBar {
  day: string;
  completedLessons: number;
  studyTimeMin: number;
  xpEarned: number;
  streakEnergyPct: number;
}

const mockAnalyticsBars: DailyAnalyticsBar[] = [
  { day: "Mon", completedLessons: 4, studyTimeMin: 45, xpEarned: 240, streakEnergyPct: 80 },
  { day: "Tue", completedLessons: 6, studyTimeMin: 60, xpEarned: 380, streakEnergyPct: 100 },
  { day: "Wed", completedLessons: 3, studyTimeMin: 30, xpEarned: 180, streakEnergyPct: 60 },
  { day: "Thu", completedLessons: 7, studyTimeMin: 75, xpEarned: 450, streakEnergyPct: 100 },
  { day: "Fri", completedLessons: 2, studyTimeMin: 20, xpEarned: 120, streakEnergyPct: 40 },
  { day: "Sat", completedLessons: 5, studyTimeMin: 50, xpEarned: 310, streakEnergyPct: 90 },
  { day: "Sun", completedLessons: 6, studyTimeMin: 65, xpEarned: 400, streakEnergyPct: 95 },
];

const mockMilestones: MilestoneItem[] = [
  { days: 3, label: "3 Days Streak", unlocked: true, rewardXP: 100 },
  { days: 7, label: "7 Days Streak", unlocked: true, rewardXP: 250 },
  { days: 15, label: "15 Days Streak", unlocked: true, rewardXP: 500 },
  { days: 30, label: "30 Days Streak", unlocked: false, rewardXP: 1000 },
  { days: 50, label: "50 Days Streak", unlocked: false, rewardXP: 2000 },
  { days: 100, label: "100 Days Streak", unlocked: false, rewardXP: 5000 },
];

const mockRewards: RewardItem[] = [
  { id: "1", title: "Consistency Master", category: "Streak", iconBg: "#F3F0FE", unlocked: true },
  { id: "2", title: "Early Learner", category: "Habit", iconBg: "#EDF9F5", unlocked: true },
  { id: "3", title: "Fast Finisher", category: "Speed", iconBg: "#FFF0F5", unlocked: true },
  { id: "4", title: "Weekly Goal Hit", category: "Target", iconBg: "#D8D2FA", unlocked: true },
];

const motivationalQuotes = [
  "🔥 Amazing consistency! You're crushing it!",
  "🚀 Keep going! One lesson at a time!",
  "⭐ One more day to reach 15 Days!",
  "🏆 You're unstoppable! Top 5% Learner!",
  "✨ Future AI Expert in the making!",
];

const journeyNodes = [
  { day: 1, label: "Start", status: "completed" },
  { day: 2, label: "Day 2", status: "completed" },
  { day: 5, label: "Day 5", status: "completed" },
  { day: 10, label: "Day 10", status: "completed" },
  { day: 14, label: "Current", status: "current" },
  { day: 20, label: "Goal", status: "future" },
];

export default function StreaksPanel() {
  const [streakCount, setStreakCount] = useState<number>(14);
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>("August 2025");
  const [hoveredBar, setHoveredBar] = useState<DailyAnalyticsBar | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const digit1Ref = useRef<HTMLSpanElement>(null);
  const digit2Ref = useRef<HTMLSpanElement>(null);
  const barsContainerRef = useRef<HTMLDivElement>(null);
  const energyFillRef = useRef<HTMLDivElement>(null);

  // Rotating Motivational Quotes GSAP Text Reveal
  useEffect(() => {
    const interval = setInterval(() => {
      if (!quoteRef.current) return;
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
          gsap.to(quoteRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.4)",
          });
        },
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // GSAP Animations on Mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Weekly Streak Analytics Bar Chart Height Grow & Bounce
      if (barsContainerRef.current) {
        const bars = barsContainerRef.current.querySelectorAll(".analytics-bar");
        gsap.fromTo(
          bars,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "bottom center",
            duration: 0.9,
            stagger: 0.08,
            ease: "back.out(1.4)",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Trigger celebration & digit-by-digit count animation
  const triggerCelebration = () => {
    setIsCelebrating(true);
    const nextVal = streakCount + 1;
    setStreakCount(nextVal);

    // Animate Digits Independently
    const digitStr = nextVal.toString().padStart(2, "0");
    if (digit1Ref.current) {
      gsap.fromTo(
        digit1Ref.current,
        { y: -20, opacity: 0, scale: 1.4 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }
      );
      digit1Ref.current.textContent = digitStr[0];
    }
    if (digit2Ref.current) {
      gsap.fromTo(
        digit2Ref.current,
        { y: 20, opacity: 0, scale: 1.4 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: "back.out(2)" }
      );
      digit2Ref.current.textContent = digitStr[1];
    }

    // Animate Energy Bar Liquid Fill
    if (energyFillRef.current) {
      gsap.fromTo(
        energyFillRef.current,
        { width: "70%" },
        { width: "85%", duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }
  };

  const digits = streakCount.toString().padStart(2, "0");

  return (
    <div ref={containerRef} className="space-y-8">
      {/* 1. MAIN MASCOT CARD WITH FIRE AURA & ROTATING QUOTE */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1E1B2E] via-[#2A2540] to-[#1A1830] text-white p-6 sm:p-10 rounded-3xl border border-[#D8D2FA]/40 shadow-glow-primary">
        {/* Animated Background Aura Orbs */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#8B7FE8]/25 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FFC9DE]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Flame Mascot Display */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <FlameMascot
              isCelebrating={isCelebrating}
              onCelebrationComplete={() => setIsCelebrating(false)}
            />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-extrabold mb-2 border border-white/20">
                <Flame className="w-4 h-4 text-[#FFC9DE] fill-[#FFC9DE]" />
                Daily Streak Status
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Well done! 🔥
              </h2>

              {/* Rotating Motivational Message */}
              <p
                ref={quoteRef}
                className="text-xs sm:text-sm text-[#FFC9DE] font-black mt-1 max-w-md h-6"
              >
                {motivationalQuotes[quoteIndex]}
              </p>
            </div>
          </div>

          {/* INDEPENDENT DIGIT ANIMATED COUNTER & CELEBRATE BUTTON */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {/* Digit-by-Digit Animated Streak Counter */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center min-w-[150px] shadow-soft-md flex flex-col items-center">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-black text-[#FFC9DE]">
                <span ref={digit1Ref} className="inline-block transition-transform">
                  {digits[0]}
                </span>
                <span ref={digit2Ref} className="inline-block transition-transform">
                  {digits[1]}
                </span>
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/70 mt-1">
                Days Streak
              </span>
            </div>

            <Button
              size="lg"
              onClick={triggerCelebration}
              className="bg-gradient-to-r from-[#8B7FE8] to-[#786BD6] hover:from-[#786BD6] hover:to-[#8B7FE8] text-white font-black shadow-glow-primary border border-white/20"
            >
              <Sparkles className="w-5 h-5 mr-1 text-[#FFC9DE]" />
              Celebrate Streak
            </Button>
          </div>
        </div>
      </div>

      {/* 2. WEEKLY STREAK ANALYTICS BAR GRAPH (MAJOR HIGHLIGHT) */}
      <Card className="bg-white border-[#EAE6FE] shadow-soft-sm p-6">
        <CardHeader className="p-0 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg font-black text-[#1E1B2E] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#8B7FE8]" />
                Weekly Streak Analytics
              </CardTitle>
              <CardDescription className="text-xs text-[#6B6785]">
                Hover over daily bars to view detailed lessons, study time, and XP metrics.
              </CardDescription>
            </div>
            <Badge variant="mint" className="self-start sm:self-center">
              Active Week
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* BAR CHART GRAPH */}
          <div
            ref={barsContainerRef}
            className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-4 border-b border-[#EAE6FE] relative"
          >
            {mockAnalyticsBars.map((bar, idx) => {
              const heightPct = (bar.completedLessons / 7) * 100;
              const isHovered = hoveredBar?.day === bar.day;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredBar(bar)}
                  onMouseLeave={() => setHoveredBar(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {/* Rich Interactive Tooltip on Hover */}
                  {isHovered && (
                    <div className="absolute bottom-full mb-3 z-30 flex flex-col items-center pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                      <div className="bg-[#1E1B2E] text-white p-3 rounded-2xl shadow-soft-lg text-xs space-y-1 whitespace-nowrap border border-[#8B7FE8]">
                        <div className="font-black text-[#FFC9DE] border-b border-white/10 pb-1">
                          {bar.day} Performance Log
                        </div>
                        <div className="flex items-center gap-2 font-bold text-white/90">
                          <BookOpen className="w-3.5 h-3.5 text-[#8B7FE8]" />
                          <span>{bar.completedLessons} Lessons Done</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-white/90">
                          <Clock className="w-3.5 h-3.5 text-[#5CBFA0]" />
                          <span>{bar.studyTimeMin} Mins Study Time</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-white/90">
                          <Zap className="w-3.5 h-3.5 text-[#FFC9DE]" />
                          <span>+{bar.xpEarned} XP Earned</span>
                        </div>
                      </div>
                      <div className="w-2.5 h-2.5 bg-[#1E1B2E] rotate-45 -mt-1.5" />
                    </div>
                  )}

                  {/* Rounded Gradient Bar */}
                  <div className="w-full max-w-[40px] bg-[#F3F0FE] rounded-2xl overflow-hidden h-full flex flex-col justify-end p-1">
                    <div
                      className={`w-full rounded-xl bg-gradient-to-t from-[#8B7FE8] via-[#786BD6] to-[#5CBFA0] analytics-bar transition-all duration-300 ${
                        isHovered ? "shadow-glow-primary scale-105" : ""
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>

                  <span
                    className={`text-xs font-black mt-2 transition-colors ${
                      isHovered ? "text-[#8B7FE8]" : "text-[#6B6785]"
                    }`}
                  >
                    {bar.day}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 3. DAILY STREAK JOURNEY NODE PATH */}
      <Card className="bg-white border-[#EAE6FE] shadow-soft-sm p-6">
        <CardHeader className="p-0 mb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-black text-[#1E1B2E] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#8B7FE8]" />
              Daily Streak Journey Path
            </CardTitle>
            <Badge variant="mint">Active Trail</Badge>
          </div>
          <CardDescription className="text-xs text-[#6B6785]">
            Progress through streak waypoints to reach your 20-day goal.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative py-6 flex items-center justify-between overflow-x-auto gap-4">
            {/* Background Journey Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-[#F3F0FE] -translate-y-1/2 z-0" />
            <div className="absolute top-1/2 left-8 w-[70%] h-1 bg-[#8B7FE8] -translate-y-1/2 z-0 shadow-glow-primary" />

            {journeyNodes.map((node, idx) => {
              const isCurrent = node.status === "current";
              const isCompleted = node.status === "completed";

              return (
                <div key={idx} className="relative z-10 flex flex-col items-center shrink-0 group">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-xs transition-transform group-hover:scale-125 ${
                      isCurrent
                        ? "bg-[#8B7FE8] text-white ring-4 ring-[#D8D2FA] shadow-glow-primary scale-110 animate-bounce"
                        : isCompleted
                        ? "bg-[#5CBFA0] text-white shadow-soft-sm"
                        : "bg-white border-2 border-[#EAE6FE] text-[#6B6785]"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : node.day}
                  </div>
                  <span className="text-[11px] font-extrabold text-[#1E1B2E] mt-2">
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 4. GITHUB-STYLE MONTHLY HEATMAP GRID & LIQUID ENERGY BAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MONTHLY HEATMAP GRID (8 Cols) */}
        <Card className="lg:col-span-8 bg-white border-[#EAE6FE] shadow-soft-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-black text-[#1E1B2E] flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#8B7FE8]" />
                  Monthly Contribution Heatmap
                </CardTitle>
                <CardDescription className="text-xs text-[#6B6785]">
                  GitHub-style daily study heatmap grid.
                </CardDescription>
              </div>

              {/* Month Selector */}
              <div className="flex items-center gap-2 bg-[#FCFBFF] border border-[#EAE6FE] p-1 rounded-full">
                <button
                  onClick={() => setSelectedMonth("July 2025")}
                  className="p-1 rounded-full hover:bg-[#F3F0FE] text-[#6B6785] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-extrabold text-[#1E1B2E] px-2">
                  {selectedMonth}
                </span>
                <button
                  onClick={() => setSelectedMonth("September 2025")}
                  className="p-1 rounded-full hover:bg-[#F3F0FE] text-[#6B6785] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 pt-2">
            <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-xs font-extrabold text-[#6B6785]">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 31 }, (_, i) => {
                const dayNum = i + 1;
                const isToday = dayNum === 24;
                const isCompleted = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24].includes(dayNum);
                const isMissed = [7, 13, 21].includes(dayNum);

                let styleClass = "bg-[#F3F0FE] text-[#6B6785]";
                if (isCompleted) {
                  styleClass = "bg-[#8B7FE8] text-white font-black shadow-soft-sm";
                } else if (isMissed) {
                  styleClass = "bg-[#FFF0F5] text-[#FFC9DE] border border-[#FFC9DE] opacity-70";
                }

                return (
                  <div
                    key={dayNum}
                    className={`group relative h-10 rounded-xl flex items-center justify-center text-xs cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-soft-md overflow-hidden ${styleClass} ${
                      isToday ? "ring-2 ring-[#1E1B2E] animate-pulse" : ""
                    }`}
                  >
                    <span>{dayNum}</span>

                    {/* Tooltip on Hover */}
                    <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-20">
                      <div className="bg-[#1E1B2E] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-soft-lg whitespace-nowrap">
                        Aug {dayNum}: {isCompleted ? "🔥 3 Lessons Done" : isMissed ? "❌ Missed" : "Future"}
                      </div>
                      <div className="w-2 h-2 bg-[#1E1B2E] rotate-45 -mt-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* LIQUID STREAK ENERGY BAR CARD (4 Cols) */}
        <Card className="lg:col-span-4 bg-white border-[#EAE6FE] shadow-soft-sm flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="primary" className="text-[10px]">
                Energy Fill
              </Badge>
              <span className="text-xs font-black text-[#8B7FE8]">70% Charged</span>
            </div>
            <CardTitle className="text-lg font-black text-[#1E1B2E] mt-2">
              Streak Energy Reservoir
            </CardTitle>
            <CardDescription className="text-xs text-[#6B6785]">
              Liquid energy builds as you complete lessons.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="relative h-12 rounded-2xl bg-[#F3F0FE] border border-[#EAE6FE] overflow-hidden p-1">
              <div
                ref={energyFillRef}
                className="h-full rounded-xl bg-gradient-to-r from-[#8B7FE8] via-[#786BD6] to-[#5CBFA0] transition-all duration-700 relative overflow-hidden shadow-glow-primary"
                style={{ width: "70%" }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-marquee-horizontal" />
              </div>
            </div>

            <div className="text-xs font-bold text-[#6B6785] text-center">
              ⚡ <strong>30% remaining</strong> to reach full streak charge level.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. STREAK MILESTONES & REWARDS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MILESTONE BADGES (7 Cols) */}
        <Card className="lg:col-span-7 bg-white border-[#EAE6FE] shadow-soft-sm">
          <CardHeader>
            <CardTitle className="text-lg font-black text-[#1E1B2E] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#8B7FE8]" />
              Streak Milestones
            </CardTitle>
            <CardDescription className="text-xs text-[#6B6785]">
              Reach streak thresholds to unlock permanent badges & XP boosts.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mockMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all duration-300 ${
                    m.unlocked
                      ? "bg-gradient-to-b from-[#F3F0FE] to-white border-[#8B7FE8] shadow-soft-sm hover:-translate-y-1 hover:shadow-glow-primary"
                      : "bg-[#FCFBFF] border-[#EAE6FE] opacity-60 backdrop-blur-sm"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black mb-2 ${
                      m.unlocked
                        ? "bg-[#8B7FE8] text-[#FFFFFF] shadow-soft-md"
                        : "bg-[#F3F0FE] text-[#6B6785]"
                    }`}
                  >
                    {m.unlocked ? <Trophy className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                  </div>

                  <span className="text-xs font-black text-[#1E1B2E]">{m.label}</span>
                  <span className="text-[10px] font-bold text-[#8B7FE8] mt-1">
                    +{m.rewardXP} XP Bonus
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* MOTIVATIONAL REWARDS (5 Cols) */}
        <Card className="lg:col-span-5 bg-white border-[#EAE6FE] shadow-soft-sm">
          <CardHeader>
            <CardTitle className="text-lg font-black text-[#1E1B2E] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#8B7FE8]" />
              Unlocked Streak Rewards
            </CardTitle>
            <CardDescription className="text-xs text-[#6B6785]">
              Achievements earned for consistent study habits.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {mockRewards.map((reward) => (
              <div
                key={reward.id}
                className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] flex items-center justify-between hover:border-[#8B7FE8]/50 hover:shadow-soft-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[#8B7FE8] shrink-0"
                    style={{ backgroundColor: reward.iconBg }}
                  >
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#1E1B2E] block">
                      {reward.title}
                    </span>
                    <span className="text-[10px] text-[#6B6785] font-bold">
                      Category: {reward.category}
                    </span>
                  </div>
                </div>

                <Badge variant="mint" className="text-[9px]">
                  Unlocked
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
