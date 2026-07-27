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
  PieChart,
  Brain,
  CheckCircle2,
  Activity,
  Star,
  Calendar,
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

export interface HeatmapDay {
  dayNum: number;
  dateStr: string;
  level: 0 | 1 | 2 | 3 | 4;
  studyTimeMin: number;
  xpEarned: number;
  lessonsDone: number;
  quizScore: number;
}

export interface DifficultyMetric {
  tier: "Easy" | "Medium" | "Hard" | "Challenge";
  color: string;
  bgSoft: string;
  completed: number;
  total: number;
  pct: number;
}

export interface Day365Tile {
  index: number;
  monthStr: string;
  dateStr: string;
  level: 0 | 1 | 2 | 3 | 4;
  streak: number;
  lessonsDone: number;
  quizAttempts: number;
  studyTimeMin: number;
  xpEarned: number;
  achievement?: string;
  isToday?: boolean;
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

const mock90HeatmapDays: HeatmapDay[] = Array.from({ length: 90 }, (_, i) => {
  const dayNum = i + 1;
  const levels: (0 | 1 | 2 | 3 | 4)[] = [
    0, 2, 4, 1, 3, 0, 4, 2, 1, 3, 4, 0, 2, 4, 3, 1, 0, 2, 4, 3, 1, 4, 0, 2, 3, 4, 1, 2, 0, 3,
    4, 1, 2, 0, 3, 4, 2, 1, 0, 3, 4, 2, 1, 4, 0, 2, 3, 4, 1, 0, 2, 4, 3, 1, 0, 4, 2, 1, 3, 4,
    0, 2, 4, 1, 3, 0, 2, 4, 3, 1, 4, 0, 2, 3, 4, 1, 2, 0, 3, 4, 1, 2, 0, 3, 4, 2, 1, 0, 3, 4,
  ];
  const level = levels[i];
  return {
    dayNum,
    dateStr: `Day ${dayNum}`,
    level,
    studyTimeMin: level * 20,
    xpEarned: level * 80,
    lessonsDone: level * 2,
    quizScore: level > 0 ? 85 + level * 3 : 0,
  };
});

const mockDifficultyMetrics: DifficultyMetric[] = [
  { tier: "Easy", color: "#5CBFA0", bgSoft: "#EDF9F5", completed: 254, total: 956, pct: 27 },
  { tier: "Medium", color: "#8B7FE8", bgSoft: "#F3F0FE", completed: 251, total: 2091, pct: 12 },
  { tier: "Hard", color: "#F0879B", bgSoft: "#FFF0F5", completed: 40, total: 956, pct: 4 },
  { tier: "Challenge", color: "#8B7FE8", bgSoft: "#D8D2FA", completed: 15, total: 300, pct: 5 },
];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const mock365Tiles: Day365Tile[] = Array.from({ length: 364 }, (_, i) => {
  const weekIdx = Math.floor(i / 7);
  const monthIdx = Math.floor(weekIdx / 4.33) % 12;
  const monthStr = monthNames[monthIdx];

  const levels: (0 | 1 | 2 | 3 | 4)[] = [
    0, 2, 4, 1, 3, 0, 4, 2, 1, 3, 4, 0, 2, 4, 3, 1, 0, 2, 4, 3, 1, 4, 0, 2, 3, 4, 1, 2, 0, 3,
    4, 1, 2, 0, 3, 4, 2, 1, 0, 3, 4, 2, 1, 4, 0, 2, 3, 4, 1, 0, 2, 4, 3, 1, 0, 4, 2, 1, 3, 4,
  ];
  const level = levels[i % levels.length];

  return {
    index: i,
    monthStr,
    dateStr: `${monthStr} ${(i % 28) + 1}, 2025`,
    level,
    streak: level > 0 ? 14 : 0,
    lessonsDone: level * 2,
    quizAttempts: level > 0 ? level + 1 : 0,
    studyTimeMin: level * 25,
    xpEarned: level * 90,
    achievement: level === 4 ? "Perfect Day Badge" : undefined,
    isToday: i === 210,
  };
});

export default function StreaksPanel() {
  const [streakCount, setStreakCount] = useState<number>(14);
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>("August 2025");
  const [hoveredBar, setHoveredBar] = useState<DailyAnalyticsBar | null>(null);
  const [hoveredHeatmapSquare, setHoveredHeatmapSquare] = useState<HeatmapDay | null>(null);
  const [hoveredRing, setHoveredRing] = useState<DifficultyMetric | null>(null);

  // Selected 365 Tile for Dedicated Details Panel
  const [selected365Tile, setSelected365Tile] = useState<Day365Tile | null>(null);
  const [focusedTileIndex, setFocusedTileIndex] = useState<number>(210);

  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const digit1Ref = useRef<HTMLSpanElement>(null);
  const digit2Ref = useRef<HTMLSpanElement>(null);
  const barsContainerRef = useRef<HTMLDivElement>(null);
  const heatmapGridRef = useRef<HTMLDivElement>(null);
  const heatmap365GridRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);
  const consistencyRingRef = useRef<SVGCircleElement>(null);
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

      if (heatmapGridRef.current) {
        const squares = heatmapGridRef.current.querySelectorAll(".heatmap-90-square");
        gsap.fromTo(
          squares,
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.006,
            ease: "back.out(1.5)",
          }
        );
      }

      if (heatmap365GridRef.current) {
        const cols = heatmap365GridRef.current.querySelectorAll(".heatmap-365-col");
        gsap.fromTo(
          cols,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.012,
            ease: "power2.out",
          }
        );
      }

      if (ringsRef.current) {
        const rings = ringsRef.current.querySelectorAll(".radial-ring-circle");
        rings.forEach((ring) => {
          const circle = ring as SVGCircleElement;
          const length = circle.getTotalLength();
          const targetPct = parseFloat(circle.getAttribute("data-pct") || "0");
          gsap.set(circle, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(circle, {
            strokeDashoffset: length * (1 - targetPct / 100),
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2,
          });
        });
      }

      if (consistencyRingRef.current) {
        const length = consistencyRingRef.current.getTotalLength();
        gsap.set(consistencyRingRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(consistencyRingRef.current, {
          strokeDashoffset: length * (1 - 0.92),
          duration: 1.6,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Keyboard Navigation (Arrow Keys, Enter/Space, Escape) & Click Outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected365Tile(null);
        return;
      }

      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter", " "].includes(e.key)) {
        let nextIdx = focusedTileIndex;
        if (e.key === "ArrowLeft") nextIdx = Math.max(0, focusedTileIndex - 7);
        if (e.key === "ArrowRight") nextIdx = Math.min(363, focusedTileIndex + 7);
        if (e.key === "ArrowUp") nextIdx = Math.max(0, focusedTileIndex - 1);
        if (e.key === "ArrowDown") nextIdx = Math.min(363, focusedTileIndex + 1);

        if (nextIdx !== focusedTileIndex) {
          setFocusedTileIndex(nextIdx);
        }

        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const targetTile = mock365Tiles[focusedTileIndex];
          if (targetTile) {
            handleTileClick(targetTile);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedTileIndex]);

  // Animate Details Panel Entrance / Cross-Fade on Selection
  const handleTileClick = (tile: Day365Tile) => {
    setSelected365Tile(tile);
    setFocusedTileIndex(tile.index);

    if (detailsPanelRef.current) {
      gsap.fromTo(
        detailsPanelRef.current,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    }
  };

  // Trigger celebration & digit-by-digit count animation
  const triggerCelebration = () => {
    setIsCelebrating(true);
    const nextVal = streakCount + 1;
    setStreakCount(nextVal);

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
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#8B7FE8]/25 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FFC9DE]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
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

              <p
                ref={quoteRef}
                className="text-xs sm:text-sm text-[#FFC9DE] font-black mt-1 max-w-md h-6"
              >
                {motivationalQuotes[quoteIndex]}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
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

      {/* 2. ORIGINAL 365-DAY LEETCODE-INSPIRED LEARNING ACTIVITY HEATMAP */}
      <Card className="bg-white border-[#EAE6FE] shadow-soft-sm p-6">
        <CardHeader className="p-0 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg sm:text-xl font-black text-[#1E1B2E] flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#8B7FE8] fill-[#8B7FE8]" />
                Learning Consistency
              </CardTitle>
              <CardDescription className="text-xs text-[#6B6785]">
                Click any tile below to view detailed daily activity metrics.
              </CardDescription>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#6B6785]">
              <span className="text-[11px]">Less</span>
              <span className="w-3 h-3 rounded-sm bg-[#F3F0FE] border border-[#EAE6FE]" title="No Activity" />
              <span className="w-3 h-3 rounded-sm bg-[#D8D2FA]" title="Very Low" />
              <span className="w-3 h-3 rounded-sm bg-[#8B7FE8]" title="Medium" />
              <span className="w-3 h-3 rounded-sm bg-[#786BD6]" title="High" />
              <span className="w-3 h-3 rounded-sm bg-[#8B7FE8] shadow-glow-primary ring-1 ring-[#FFC9DE]" title="Perfect Day" />
              <span className="text-[11px]">More</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          {/* 365-DAY HEATMAP CONTAINER (52 WEEKS x 7 DAYS) */}
          <div className="overflow-x-auto pb-4 pt-2">
            {/* Top Month Labels Header */}
            <div className="flex justify-between text-[11px] font-extrabold text-[#6B6785] mb-3 min-w-[720px] px-8">
              {monthNames.map((m, idx) => (
                <span key={idx}>{m}</span>
              ))}
            </div>

            <div className="flex items-start gap-3 min-w-[720px]">
              {/* Day Labels Column */}
              <div className="flex flex-col justify-between text-[10px] font-bold text-[#6B6785] h-24 py-1 shrink-0">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* 52 Columns Grid */}
              <div ref={heatmap365GridRef} className="flex-1 flex gap-1.5 justify-between">
                {Array.from({ length: 52 }, (_, colIdx) => (
                  <div key={colIdx} className="heatmap-365-col flex flex-col gap-1.5">
                    {Array.from({ length: 7 }, (_, rowIdx) => {
                      const tileIndex = colIdx * 7 + rowIdx;
                      const tile = mock365Tiles[tileIndex] || mock365Tiles[0];
                      const isSelected = selected365Tile?.index === tile.index;
                      const isFocused = focusedTileIndex === tile.index;

                      let bgClass = "bg-[#F3F0FE] border border-[#EAE6FE]";
                      if (tile.level === 1) bgClass = "bg-[#D8D2FA]";
                      if (tile.level === 2) bgClass = "bg-[#8B7FE8]";
                      if (tile.level === 3) bgClass = "bg-[#786BD6]";
                      if (tile.level === 4) bgClass = "bg-[#8B7FE8] shadow-glow-primary ring-2 ring-[#FFC9DE]";

                      return (
                        <button
                          key={tileIndex}
                          onClick={() => handleTileClick(tile)}
                          className={`w-3.5 h-3.5 rounded-sm transition-all duration-200 cursor-pointer hover:scale-125 focus:outline-none ${bgClass} ${
                            isSelected
                              ? "scale-140 shadow-glow-primary ring-2 ring-[#8B7FE8] z-20 animate-pulse"
                              : isFocused
                              ? "ring-2 ring-[#1E1B2E]"
                              : tile.isToday
                              ? "ring-2 ring-[#1E1B2E]"
                              : ""
                          }`}
                          aria-label={`Select ${tile.dateStr}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DEDICATED CLICK-TO-VIEW DETAILS PANEL POSITIONED BELOW HEATMAP */}
          {selected365Tile && (
            <div
              ref={detailsPanelRef}
              className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#F3F0FE] via-white to-[#FCFBFF] border-2 border-[#8B7FE8]/50 shadow-soft-md space-y-4"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between border-b border-[#EAE6FE] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#8B7FE8] text-white flex items-center justify-center font-black shadow-soft-sm">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-[#1E1B2E]">
                      {selected365Tile.dateStr} Details
                    </h4>
                    <span className="text-xs font-bold text-[#6B6785]">
                      Day {selected365Tile.index + 1} of 365
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="primary" className="text-[10px]">
                    {selected365Tile.level > 0 ? "Active Day" : "Inactive Day"}
                  </Badge>
                  <button
                    onClick={() => setSelected365Tile(null)}
                    className="p-1.5 rounded-full hover:bg-[#F3F0FE] text-[#6B6785] transition-colors"
                    aria-label="Close details panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 8-Grid Metrics Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-white border border-[#EAE6FE] flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785]">
                    📚 Lessons Completed
                  </span>
                  <span className="text-base font-black text-[#1E1B2E] mt-1">
                    {selected365Tile.lessonsDone} Lessons
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#EAE6FE] flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785]">
                    📝 Quiz Attempts
                  </span>
                  <span className="text-base font-black text-[#1E1B2E] mt-1">
                    {selected365Tile.quizAttempts} Quizzes
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#EAE6FE] flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785]">
                    ⏱ Study Time
                  </span>
                  <span className="text-base font-black text-[#5CBFA0] mt-1">
                    {selected365Tile.studyTimeMin} Mins
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#EAE6FE] flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785]">
                    ⭐ XP Earned
                  </span>
                  <span className="text-base font-black text-[#8B7FE8] mt-1">
                    +{selected365Tile.xpEarned} XP
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#EAE6FE] flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785]">
                    🔥 Daily Streak
                  </span>
                  <span className="text-base font-black text-[#FFC9DE] mt-1">
                    {selected365Tile.streak} Days
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#EAE6FE] flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785]">
                    🎯 Completion Rate
                  </span>
                  <span className="text-base font-black text-[#1E1B2E] mt-1">
                    {selected365Tile.level > 0 ? `${75 + selected365Tile.level * 5}%` : "0%"}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#EAE6FE] flex flex-col justify-between sm:col-span-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785]">
                    🏆 Achievements Earned
                  </span>
                  <span className="text-xs font-extrabold text-[#8B7FE8] mt-1 truncate">
                    {selected365Tile.achievement || "No Badge Earned"}
                  </span>
                </div>
              </div>

              {/* AI Daily Insight Message */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#EAE6FE] flex items-center gap-3 text-xs font-semibold text-[#1E1B2E]">
                <Brain className="w-5 h-5 text-[#8B7FE8] shrink-0" />
                <div>
                  {selected365Tile.level > 0 ? (
                    <span>
                      Great job studying on <strong>{selected365Tile.dateStr}</strong>! You maintained your 14-day streak and earned <strong>+{selected365Tile.xpEarned} XP</strong>.
                    </span>
                  ) : (
                    <span>
                      No learning activity recorded for this day. Complete a lesson today to keep your streak alive!
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SUMMARY PANEL WITH 92% CONSISTENCY SCORE RING */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-[#EAE6FE] items-center">
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785] block">
                  Current Streak
                </span>
                <span className="text-lg font-black text-[#8B7FE8]">14 Days</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785] block">
                  Longest Streak
                </span>
                <span className="text-lg font-black text-[#1E1B2E]">18 Days</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785] block">
                  Learning Days
                </span>
                <span className="text-lg font-black text-[#5CBFA0]">268 Days</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785] block">
                  Study Hours
                </span>
                <span className="text-lg font-black text-[#8B7FE8]">142 Hours</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785] block">
                  Total XP Earned
                </span>
                <span className="text-lg font-black text-[#1E1B2E]">3,420 XP</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6785] block">
                  Perfect Days
                </span>
                <span className="text-lg font-black text-[#F0879B]">34 Days</span>
              </div>
            </div>

            <div className="md:col-span-4 p-4 rounded-2xl bg-gradient-to-br from-[#F3F0FE] to-white border border-[#D8D2FA] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#1E1B2E] block">
                  AI Consistency Score
                </span>
                <span className="text-[10px] text-[#6B6785] font-semibold">
                  Top 5% among all active AI platform learners.
                </span>
              </div>

              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="32" stroke="#F3F0FE" strokeWidth="7" fill="transparent" />
                  <circle
                    ref={consistencyRingRef}
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#8B7FE8"
                    strokeWidth="7"
                    fill="transparent"
                    strokeLinecap="round"
                  />
                </svg>

                <span className="absolute text-sm font-black text-[#8B7FE8]">92%</span>
              </div>
            </div>
          </div>

          {/* AI-Generated Learning Insights */}
          <div className="p-4 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] space-y-2">
            <div className="text-xs font-black text-[#8B7FE8] flex items-center gap-1.5">
              <Brain className="w-4 h-4" /> AI Consistency Insights
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-semibold text-[#1E1B2E]">
              <div className="p-2.5 rounded-xl bg-white border border-[#EAE6FE] flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#8B7FE8] shrink-0" />
                <span>You've studied 18 consecutive days.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EAE6FE] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#5CBFA0] shrink-0" />
                <span>Most productive day: Wednesday.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EAE6FE] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#F0879B] shrink-0" />
                <span>34% more quizzes solved on weekends.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EAE6FE] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8B7FE8] shrink-0" />
                <span>Improving consistently this month.</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. WEEKLY STREAK ANALYTICS BAR GRAPH */}
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

      {/* 4. 90-DAY HEATMAP */}
      <Card className="bg-white border-[#EAE6FE] shadow-soft-sm p-6">
        <CardHeader className="p-0 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg font-black text-[#1E1B2E] flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#8B7FE8]" />
                90-Day Activity Log
              </CardTitle>
              <CardDescription className="text-xs text-[#6B6785]">
                Recent 90-day learning activity breakdown.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          <div
            ref={heatmapGridRef}
            className="grid grid-cols-10 sm:grid-cols-15 gap-2 pt-2 pb-2"
          >
            {mock90HeatmapDays.map((day) => {
              let bgClass = "bg-[#F3F0FE] border border-[#EAE6FE]";
              if (day.level === 1) bgClass = "bg-[#D8D2FA]";
              if (day.level === 2) bgClass = "bg-[#8B7FE8]";
              if (day.level === 3) bgClass = "bg-[#786BD6]";
              if (day.level === 4) bgClass = "bg-[#8B7FE8] shadow-glow-primary ring-2 ring-[#FFC9DE]";

              const isHovered = hoveredHeatmapSquare?.dayNum === day.dayNum;

              return (
                <div
                  key={day.dayNum}
                  onMouseEnter={() => setHoveredHeatmapSquare(day)}
                  onMouseLeave={() => setHoveredHeatmapSquare(null)}
                  className={`heatmap-90-square h-8 sm:h-9 rounded-xl flex items-center justify-center text-[10px] font-extrabold cursor-pointer transition-all duration-200 hover:scale-125 hover:z-20 relative ${bgClass}`}
                >
                  <span className={day.level >= 2 ? "text-white" : "text-[#6B6785]"}>
                    {day.dayNum}
                  </span>

                  {isHovered && (
                    <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center animate-in fade-in duration-200">
                      <div className="bg-[#1E1B2E] text-white p-3 rounded-2xl shadow-soft-lg text-xs space-y-1 whitespace-nowrap border border-[#8B7FE8]">
                        <div className="font-black text-[#FFC9DE] border-b border-white/10 pb-1">
                          Day {day.dayNum} Activity Log
                        </div>
                        <div>⏱️ Study Time: {day.studyTimeMin} mins</div>
                        <div>⚡ XP Earned: +{day.xpEarned} XP</div>
                        <div>📖 Lessons: {day.lessonsDone} Completed</div>
                        <div>🎯 Quiz Score: {day.quizScore}%</div>
                      </div>
                      <div className="w-2 h-2 bg-[#1E1B2E] rotate-45 -mt-1" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 5. STREAK PERFORMANCE ANALYTICS (CONCENTRIC RINGS) */}
      <Card className="bg-white border-[#EAE6FE] shadow-soft-sm p-6">
        <CardHeader className="p-0 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-black text-[#1E1B2E] flex items-center gap-2">
                <PieChart className="w-5 h-5 text-[#8B7FE8]" />
                Learning Performance
              </CardTitle>
              <CardDescription className="text-xs text-[#6B6785]">
                Difficulty-wise completion progress across quiz tiers.
              </CardDescription>
            </div>
            <Badge variant="primary">Analytics</Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center relative py-4">
              <svg
                ref={ringsRef}
                viewBox="0 0 160 160"
                className="w-48 h-48 sm:w-56 sm:h-56 transform -rotate-90"
              >
                <circle cx="80" cy="80" r="62" stroke="#EDF9F5" strokeWidth="9" fill="transparent" />
                <circle cx="80" cy="80" r="48" stroke="#F3F0FE" strokeWidth="9" fill="transparent" />
                <circle cx="80" cy="80" r="34" stroke="#FFF0F5" strokeWidth="9" fill="transparent" />
                <circle cx="80" cy="80" r="20" stroke="#F3F0FE" strokeWidth="9" fill="transparent" />

                <circle
                  className="radial-ring-circle transition-all duration-300 cursor-pointer"
                  data-pct="27"
                  cx="80"
                  cy="80"
                  r="62"
                  stroke="#5CBFA0"
                  strokeWidth="9"
                  fill="transparent"
                  strokeDasharray="390"
                  strokeDashoffset="390"
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredRing(mockDifficultyMetrics[0])}
                  onMouseLeave={() => setHoveredRing(null)}
                />

                <circle
                  className="radial-ring-circle transition-all duration-300 cursor-pointer"
                  data-pct="12"
                  cx="80"
                  cy="80"
                  r="48"
                  stroke="#8B7FE8"
                  strokeWidth="9"
                  fill="transparent"
                  strokeDasharray="301"
                  strokeDashoffset="301"
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredRing(mockDifficultyMetrics[1])}
                  onMouseLeave={() => setHoveredRing(null)}
                />

                <circle
                  className="radial-ring-circle transition-all duration-300 cursor-pointer"
                  data-pct="4"
                  cx="80"
                  cy="80"
                  r="34"
                  stroke="#F0879B"
                  strokeWidth="9"
                  fill="transparent"
                  strokeDasharray="213"
                  strokeDashoffset="213"
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredRing(mockDifficultyMetrics[2])}
                  onMouseLeave={() => setHoveredRing(null)}
                />

                <circle
                  className="radial-ring-circle transition-all duration-300 cursor-pointer"
                  data-pct="5"
                  cx="80"
                  cy="80"
                  r="20"
                  stroke="#D8D2FA"
                  strokeWidth="9"
                  fill="transparent"
                  strokeDasharray="125"
                  strokeDashoffset="125"
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredRing(mockDifficultyMetrics[3])}
                  onMouseLeave={() => setHoveredRing(null)}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xl font-black text-[#1E1B2E]">
                  {hoveredRing ? `${hoveredRing.pct}%` : "Overall"}
                </span>
                <span className="text-[10px] font-extrabold uppercase text-[#6B6785]">
                  {hoveredRing ? hoveredRing.tier : "Difficulty"}
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              {mockDifficultyMetrics.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-[#EAE6FE] bg-[#FCFBFF] flex items-center justify-between gap-4 hover:border-[#8B7FE8]/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-soft-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <span className="text-xs font-black text-[#1E1B2E] block">
                        {item.tier} Difficulty
                      </span>
                      <span className="text-[10px] font-bold text-[#6B6785]">
                        {item.completed} / {item.total.toLocaleString()} Completed
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div className="w-24 h-2 bg-[#F3F0FE] rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-xs font-black text-[#1E1B2E] w-10">
                      {item.pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6. STREAK JOURNEY PATH */}
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

      {/* 7. STREAK MILESTONES & REWARDS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                        ? "bg-[#8B7FE8] text-white shadow-soft-md"
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
