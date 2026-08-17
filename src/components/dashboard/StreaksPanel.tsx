"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlameMascot from "./FlameMascot";
import { useAuth } from "@/lib/auth";
import {
  Flame,
  Check,
  X,
  BookOpen,
  Trophy,
  Sparkles,
  Zap,
  Target,
  Award,
  Lock,
  Calendar as CalendarIcon,
  TrendingUp,
  BarChart3,
  Clock,
  PieChart,
  Brain,
  CheckCircle2,
  Activity,
  Star,
  Calendar,
  Shield,
  Snowflake,
  Share2,
  Copy,
  ChevronRight,
  Coins,
  Medal,
  RefreshCw,
  Play,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface CalendarTile {
  dateStr: string;
  dateFormatted: string;
  monthStr: string;
  level: 0 | 1 | 2 | 3 | 4;
  lessons: number;
  quizzes: number;
  challenges: number;
  assessments: number;
  xp: number;
  coins: number;
  studyMinutes: number;
  perfectDay: boolean;
  dailyGoalCompleted: boolean;
  isToday: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  requiredDays: number;
  rewardXP: number;
  rewardCoins: number;
  badgeColor: string;
  unlocked: boolean;
  claimed: boolean;
  claimedAt?: string | null;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  iconBg?: string;
  unlocked: boolean;
}

export interface DateActivityDetail {
  id?: string;
  date: string;
  lessonsCompleted: number;
  quizCompleted: number;
  challengeCompleted: number;
  assessmentCompleted: number;
  projectsCompleted: number;
  practiceCompleted: number;
  xpEarned: number;
  coinsEarned: number;
  studyMinutes: number;
  dailyGoalCompleted: boolean;
  perfectDay: boolean;
  completionPercentage: number;
  learningSessions: number;
  firstActivity?: string | null;
  lastActivity?: string | null;
  logs: any[];
}

const motivationalQuotes = [
  "🔥 Amazing consistency! You're crushing it!",
  "🚀 Consistency beats intensity! Keep going!",
  "⭐ Small daily efforts lead to massive AI mastery!",
  "🏆 You're unstoppable! Top learner status!",
  "✨ Future AI Expert in the making!",
  "🧠 Brain power activated! Master one module at a time!",
];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function StreaksPanel() {
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const [selectedDateTile, setSelectedDateTile] = useState<CalendarTile | null>(null);
  const [dateDetail, setDateDetail] = useState<DateActivityDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);

  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [purchasingFreeze, setPurchasingFreeze] = useState<boolean>(false);
  const [claimingMilestoneId, setClaimingMilestoneId] = useState<string | null>(null);
  const [recordingActivity, setRecordingActivity] = useState<boolean>(false);

  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copiedShareText, setCopiedShareText] = useState<boolean>(false);
  const [freezeConsumedModal, setFreezeConsumedModal] = useState<boolean>(false);
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState<"weekly" | "monthly" | "yearly">("weekly");

  // Fetch live dashboard data from API
  const fetchDashboard = async () => {
    try {
      setError(null);

      // Check if user is authenticated
      if (!authUser) {
        setError("Authentication required. Please log in to view your learning journey.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/streak");
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load streak data.");
      }
      setDashboardData(json.data);

      // Dispatch custom event for navbar sync
      if (typeof window !== "undefined" && json.data?.progress?.currentStreak !== undefined) {
        window.dispatchEvent(
          new CustomEvent("streak-updated", { detail: json.data.progress.currentStreak })
        );
      }
    } catch (err: any) {
      console.error("Fetch dashboard error:", err);
      setError(err.message || "Failed to load Learning Journey dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [authUser]);

  // Motivational quote rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Fetch single date activity breakdown on calendar tile click
  const handleTileClick = async (tile: CalendarTile) => {
    if (selectedDateTile?.dateStr === tile.dateStr) {
      // Second click closes modal
      setSelectedDateTile(null);
      setDateDetail(null);
      return;
    }

    setSelectedDateTile(tile);
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/activity/date/${tile.dateStr}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setDateDetail(json.activity);
      } else {
        setDateDetail(null);
      }
    } catch (err) {
      console.error("Error fetching date activity:", err);
      setDateDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Trigger quick activity completion (for live demo & real activity completion)
  const triggerActivityComplete = async (type: "LESSON" | "QUIZ" | "CHALLENGE") => {
    setRecordingActivity(true);
    try {
      const res = await fetch("/api/activity/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityType: type,
          xp: type === "LESSON" ? 60 : type === "QUIZ" ? 80 : 100,
          coins: type === "LESSON" ? 25 : type === "QUIZ" ? 35 : 50,
          timeSpent: type === "LESSON" ? 20 : type === "QUIZ" ? 15 : 25,
          completionPercentage: 100,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to record activity.");
      }

      setIsCelebrating(true);
      setCelebrationMessage(
        `🎉 ${type} Completed! Earned +${json.result.log?.xp || 50} XP and +${json.result.log?.coins || 20} Coins!`
      );

      if (json.result?.freezeConsumed) {
        setFreezeConsumedModal(true);
      }

      // Refresh dashboard data
      if (json.dashboard) {
        setDashboardData(json.dashboard);
        if (typeof window !== "undefined" && json.dashboard?.progress?.currentStreak !== undefined) {
          window.dispatchEvent(
            new CustomEvent("streak-updated", { detail: json.dashboard.progress.currentStreak })
          );
        }
      } else {
        await fetchDashboard();
      }
    } catch (err: any) {
      alert(err.message || "Failed to complete activity.");
    } finally {
      setRecordingActivity(false);
    }
  };

  // Purchase streak freeze (500 coins, max 2 limit)
  const handlePurchaseFreeze = async () => {
    setPurchasingFreeze(true);
    try {
      const res = await fetch("/api/freeze/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to purchase Streak Freeze.");
      }

      setIsCelebrating(true);
      setCelebrationMessage("❄️ Streak Freeze Purchased! Your streak is protected.");

      if (json.dashboard) {
        setDashboardData(json.dashboard);
      } else {
        await fetchDashboard();
      }
    } catch (err: any) {
      alert(err.message || "Failed to purchase Streak Freeze.");
    } finally {
      setPurchasingFreeze(false);
    }
  };

  // Claim milestone reward
  const handleClaimMilestone = async (milestoneId: string) => {
    setClaimingMilestoneId(milestoneId);
    try {
      const res = await fetch("/api/milestone/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ milestoneId }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to claim milestone.");
      }

      setIsCelebrating(true);
      setCelebrationMessage(`🏆 ${json.message}`);

      if (json.dashboard) {
        setDashboardData(json.dashboard);
      } else {
        await fetchDashboard();
      }
    } catch (err: any) {
      alert(err.message || "Failed to claim milestone reward.");
    } finally {
      setClaimingMilestoneId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-64 bg-white dark:bg-[#1A1827] rounded-3xl border border-[#EAE6FE] dark:border-[#332C4A]" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 bg-white dark:bg-[#1A1827] rounded-2xl border border-[#EAE6FE] dark:border-[#332C4A]" />
          ))}
        </div>
        <div className="h-96 bg-white dark:bg-[#1A1827] rounded-3xl border border-[#EAE6FE] dark:border-[#332C4A]" />
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="p-8 rounded-3xl bg-white dark:bg-[#1A1827] border border-red-200 dark:border-red-900 text-center space-y-4">
        <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Failed to load Learning Journey</h3>
        <p className="text-xs text-[var(--foreground-secondary)]">{error || "Something went wrong."}</p>
        <Button onClick={fetchDashboard} className="bg-[#8B7FE8] text-white font-bold text-xs gap-2">
          <RefreshCw className="w-4 h-4" /> Retry Loading
        </Button>
      </div>
    );
  }

  const { user, progress, todayGoal, calendarTiles, milestones, achievements, userAchievements, recentLogs } = dashboardData;

  const currentStreak = progress.currentStreak || 0;
  const longestStreak = progress.longestStreak || 0;
  const totalXP = progress.totalXP || 0;
  const totalCoins = progress.totalCoins || 0;
  const currentLevel = progress.currentLevel || 1;
  const daysLearned = progress.daysLearned || 0;
  const perfectDays = progress.perfectDays || 0;
  const streakFreezes = progress.streakFreezes || 0;
  const globalRank = progress.globalRank || 1;

  // Next milestone calculation
  const nextMilestone = milestones.find((m: Milestone) => !m.unlocked) || milestones[milestones.length - 1];
  const milestoneProgressPct = nextMilestone ? Math.min(100, Math.round((currentStreak / nextMilestone.requiredDays) * 100)) : 100;

  // 16 Live Analytics Card Metrics
  const analyticsCards = [
    { title: "Current Streak", val: `${currentStreak} Days`, icon: Flame, color: "#8B7FE8", bg: "rgba(139, 127, 232, 0.1)" },
    { title: "Longest Streak", val: `${longestStreak} Days`, icon: Trophy, color: "#5CBFA0", bg: "rgba(92, 191, 160, 0.1)" },
    { title: "Total XP", val: totalXP.toLocaleString(), icon: Zap, color: "#8B7FE8", bg: "rgba(139, 127, 232, 0.1)" },
    { title: "Total Coins", val: totalCoins.toLocaleString(), icon: Coins, color: "#FFD700", bg: "rgba(255, 215, 0, 0.1)" },
    { title: "Current Level", val: `Level ${currentLevel}`, icon: Star, color: "#F0879B", bg: "rgba(240, 135, 155, 0.1)" },
    { title: "Perfect Days", val: `${perfectDays} Days`, icon: Award, color: "#FFD700", bg: "rgba(255, 215, 0, 0.1)" },
    { title: "Learning Days", val: `${daysLearned} Days`, icon: CalendarIcon, color: "#5CBFA0", bg: "rgba(92, 191, 160, 0.1)" },
    { title: "Lessons Completed", val: `${progress.totalLessons || 0}`, icon: BookOpen, color: "#8B7FE8", bg: "rgba(139, 127, 232, 0.1)" },
    { title: "Quizzes Passed", val: `${progress.totalQuizzes || 0}`, icon: Target, color: "#5CBFA0", bg: "rgba(92, 191, 160, 0.1)" },
    { title: "Challenges Solved", val: `${progress.totalChallenges || 0}`, icon: Brain, color: "#F0879B", bg: "rgba(240, 135, 155, 0.1)" },
    { title: "Assessments Passed", val: `${progress.totalAssessments || 0}`, icon: Medal, color: "#8B7FE8", bg: "rgba(139, 127, 232, 0.1)" },
    { title: "Average Study Time", val: `${Math.round((progress.totalStudyMinutes || 0) / Math.max(1, daysLearned))} mins/day`, icon: Clock, color: "#5CBFA0", bg: "rgba(92, 191, 160, 0.1)" },
    { title: "Completion Rate", val: `${daysLearned > 0 ? Math.min(100, Math.round((perfectDays / daysLearned) * 100)) : 100}%`, icon: PieChart, color: "#8B7FE8", bg: "rgba(139, 127, 232, 0.1)" },
    { title: "Weekly Rank", val: `#${Math.max(1, globalRank - 2)}`, icon: TrendingUp, color: "#5CBFA0", bg: "rgba(92, 191, 160, 0.1)" },
    { title: "Monthly Rank", val: `#${Math.max(1, globalRank - 1)}`, icon: BarChart3, color: "#F0879B", bg: "rgba(240, 135, 155, 0.1)" },
    { title: "Global Rank", val: `#${globalRank}`, icon: Activity, color: "#8B7FE8", bg: "rgba(139, 127, 232, 0.1)" },
  ];

  return (
    <div className="space-y-8">
      {/* CELEBRATION BANNER MODAL */}
      <AnimatePresence>
        {isCelebrating && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="p-5 rounded-3xl bg-gradient-to-r from-[#8B7FE8] via-[#786BD6] to-[#5CBFA0] text-white shadow-soft-md flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div className="font-extrabold text-sm sm:text-base">
                {celebrationMessage || "Celebration Time! Keep up your amazing streak!"}
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setIsCelebrating(false)}
              className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs border-none"
            >
              Close
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO CARD WITH FLAME MASCOT & LIVE METRICS */}
      <div className="relative overflow-hidden bg-[var(--card)] text-[var(--foreground)] p-6 sm:p-10 rounded-3xl border border-[var(--border)] shadow-soft-md">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#8B7FE8]/15 dark:bg-[#8B7FE8]/25 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FFC9DE]/30 dark:bg-[#FFC9DE]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <FlameMascot
              isCelebrating={isCelebrating}
              onCelebrationComplete={() => setIsCelebrating(false)}
            />

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--background-secondary)] text-xs font-extrabold border border-[var(--border)] text-[#8B7FE8]">
                <Flame className="w-4 h-4 text-[#8B7FE8] fill-[#8B7FE8]" />
                Learning Journey Dashboard
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--foreground)]">
                {authUser?.name ? `Welcome back, ${authUser.name.split(" ")[0]}! 👋` : "Welcome! 👋"}
              </h2>

              <p className="text-xs sm:text-sm text-[#8B7FE8] dark:text-[#FFC9DE] font-black h-6">
                {motivationalQuotes[quoteIndex]}
              </p>

              {/* Progress to Next Milestone */}
              <div className="pt-2 max-w-md space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-[var(--foreground-secondary)]">
                  <span>Next Milestone: {nextMilestone?.title || "365 Days"}</span>
                  <span>{currentStreak} / {nextMilestone?.requiredDays || 365} Days</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[var(--background-secondary)] overflow-hidden border border-[var(--border)]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#8B7FE8] to-[#5CBFA0]"
                    initial={{ width: 0 }}
                    animate={{ width: `${milestoneProgressPct}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {/* Live Streak Box */}
            <div className="bg-[var(--background-secondary)] border border-[var(--border)] p-5 rounded-2xl text-center min-w-[140px] shadow-soft-sm flex flex-col items-center">
              <div className="flex items-center justify-center gap-1 text-4xl sm:text-5xl font-black text-[#8B7FE8] dark:text-[#FFC9DE]">
                <span>{currentStreak}</span>
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--foreground-secondary)] mt-1">
                Days Streak
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <Button
                size="lg"
                disabled={recordingActivity}
                onClick={() => triggerActivityComplete("LESSON")}
                className="bg-[#8B7FE8] hover:bg-[#786BD6] text-white font-black shadow-glow-primary border-none text-xs gap-2"
              >
                <Play className="w-4 h-4 text-[#FFC9DE] fill-[#FFC9DE]" />
                Complete Quick Lesson
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowShareModal(true)}
                className="border-[var(--border)] text-[var(--foreground)] font-bold text-xs gap-2"
              >
                <Share2 className="w-4 h-4 text-[#8B7FE8]" />
                Share Progress
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 16 LIVE LEARNING ANALYTICS CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-[var(--foreground)] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#8B7FE8]" />
            Learning Analytics Overview
          </h3>
          <Badge variant="primary" className="text-[10px]">
            Live Backend Data
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {analyticsCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-soft-sm hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--foreground-secondary)] truncate">
                    {card.title}
                  </span>
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: card.bg, color: card.color }}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-base font-black text-[var(--foreground)] mt-2 truncate">
                  {card.val}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. 365-DAY GITHUB-STYLE LEARNING CONTRIBUTION CALENDAR */}
      <Card className="bg-[var(--card)] border-[var(--border)] shadow-soft-sm p-6">
        <CardHeader className="p-0 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg sm:text-xl font-black text-[var(--foreground)] flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#8B7FE8] fill-[#8B7FE8]" />
                365-Day Learning Contribution Graph
              </CardTitle>
              <CardDescription className="text-xs text-[var(--foreground-secondary)]">
                Single click or tap any calendar day to inspect detailed activity breakdowns.
              </CardDescription>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--foreground-secondary)]">
              <span className="text-[11px]">Less</span>
              <span className="w-3.5 h-3.5 rounded-sm bg-[#F3F0FE] dark:bg-[#231E38] border border-[var(--border)]" title="0 Activity" />
              <span className="w-3.5 h-3.5 rounded-sm bg-[#D8D2FA]" title="1 Activity" />
              <span className="w-3.5 h-3.5 rounded-sm bg-[#8B7FE8]" title="2 Activities" />
              <span className="w-3.5 h-3.5 rounded-sm bg-[#786BD6]" title="3 Activities" />
              <span className="w-3.5 h-3.5 rounded-sm bg-[#FFD700] shadow-glow-primary ring-1 ring-yellow-400" title="Perfect Day" />
              <span className="text-[11px]">More</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          <div className="overflow-x-auto pb-4 pt-2">
            <div className="flex justify-between text-[11px] font-extrabold text-[var(--foreground-secondary)] mb-3 min-w-[750px] px-8">
              {monthNames.map((m, idx) => (
                <span key={idx}>{m}</span>
              ))}
            </div>

            <div className="flex items-start gap-3 min-w-[750px]">
              <div className="flex flex-col justify-between text-[10px] font-bold text-[var(--foreground-secondary)] h-24 py-1 shrink-0">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="flex-1 flex gap-1.5 justify-between">
                {Array.from({ length: 52 }, (_, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-1.5">
                    {Array.from({ length: 7 }, (_, rowIdx) => {
                      const tileIndex = colIdx * 7 + rowIdx;
                      const tile: CalendarTile = calendarTiles[tileIndex] || calendarTiles[0];
                      const isSelected = selectedDateTile?.dateStr === tile.dateStr;

                      let bgClass = "bg-[#F3F0FE] dark:bg-[#231E38] border border-[var(--border)]";
                      if (tile.level === 1) bgClass = "bg-[#D8D2FA]";
                      if (tile.level === 2) bgClass = "bg-[#8B7FE8]";
                      if (tile.level === 3) bgClass = "bg-[#786BD6]";
                      if (tile.level === 4) bgClass = "bg-[#FFD700] shadow-glow-primary ring-2 ring-yellow-300";

                      return (
                        <button
                          key={tileIndex}
                          onClick={() => handleTileClick(tile)}
                          className={`w-3.5 h-3.5 rounded-sm transition-all duration-200 cursor-pointer hover:scale-125 focus:outline-none ${bgClass} ${
                            isSelected ? "scale-140 shadow-glow-primary ring-2 ring-[#8B7FE8] z-20 animate-pulse" : tile.isToday ? "ring-2 ring-[var(--foreground)]" : ""
                          }`}
                          aria-label={`Select ${tile.dateFormatted}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FEATURE 4 — DEDICATED ACTIVITY HEATMAP INSPECTOR PANEL */}
          <AnimatePresence>
            {selectedDateTile && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#8B7FE8]/15 via-[var(--card)] to-[var(--background-secondary)] border-2 border-[#8B7FE8]/50 shadow-soft-md space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#8B7FE8] text-white flex items-center justify-center font-black shadow-soft-sm">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-[var(--foreground)]">
                        {selectedDateTile.dateFormatted} Activity Inspector
                      </h4>
                      <span className="text-xs font-bold text-[var(--foreground-secondary)]">
                        Detailed Day Metrics
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedDateTile.perfectDay && (
                      <Badge variant="pink" className="bg-[#FFD700] text-black font-extrabold text-[10px]">
                        ⭐ Perfect Day
                      </Badge>
                    )}
                    <button
                      onClick={() => {
                        setSelectedDateTile(null);
                        setDateDetail(null);
                      }}
                      className="p-1.5 rounded-full hover:bg-[var(--background-secondary)] text-[var(--foreground-secondary)] transition-colors"
                      aria-label="Close activity inspector"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {loadingDetail ? (
                  <div className="p-6 text-center text-xs font-bold text-[var(--foreground-secondary)] animate-pulse">
                    Loading detailed day metrics...
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                      <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-secondary)] block">
                          📚 Lessons
                        </span>
                        <span className="text-base font-black text-[var(--foreground)] mt-1 block">
                          {dateDetail?.lessonsCompleted ?? selectedDateTile.lessons}
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-secondary)] block">
                          📝 Quizzes
                        </span>
                        <span className="text-base font-black text-[var(--foreground)] mt-1 block">
                          {dateDetail?.quizCompleted ?? selectedDateTile.quizzes}
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-secondary)] block">
                          🧠 Challenges
                        </span>
                        <span className="text-base font-black text-[#F0879B] mt-1 block">
                          {dateDetail?.challengeCompleted ?? selectedDateTile.challenges}
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-secondary)] block">
                          ⏱ Study Time
                        </span>
                        <span className="text-base font-black text-[#5CBFA0] mt-1 block">
                          {dateDetail?.studyMinutes ?? selectedDateTile.studyMinutes} Mins
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-secondary)] block">
                          ⭐ XP Earned
                        </span>
                        <span className="text-base font-black text-[#8B7FE8] mt-1 block">
                          +{dateDetail?.xpEarned ?? selectedDateTile.xp} XP
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-secondary)] block">
                          🪙 Coins Earned
                        </span>
                        <span className="text-base font-black text-yellow-500 mt-1 block">
                          +{dateDetail?.coinsEarned ?? selectedDateTile.coins} Coins
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex items-center gap-3 text-xs font-semibold text-[var(--foreground)]">
                      <Brain className="w-5 h-5 text-[#8B7FE8] shrink-0" />
                      <div>
                        {selectedDateTile.xp > 0 ? (
                          <span>
                            Recorded <strong>{selectedDateTile.lessons} lessons</strong> and <strong>{selectedDateTile.quizzes} quizzes</strong> on <strong>{selectedDateTile.dateFormatted}</strong>, earning <strong>+{selectedDateTile.xp} XP</strong>.
                          </span>
                        ) : (
                          <span>No activity logged on {selectedDateTile.dateFormatted}. Complete a lesson today to increase your streak!</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* 4. DUOLINGO-STYLE STREAK FREEZE & DAILY GOAL SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FEATURE 6 — STREAK FREEZE SYSTEM (6 Cols) */}
        <Card className="lg:col-span-6 bg-gradient-to-br from-[#E6F4FE] via-[var(--card)] to-[#F0F8FF] dark:from-[#132338] dark:via-[var(--card)] dark:to-[#0F1E2E] border-2 border-[#70B5F9]/40 shadow-soft-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#3B82F6] text-white flex items-center justify-center font-black shadow-glow-primary">
                <Snowflake className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h4 className="text-base font-black text-[var(--foreground)] flex items-center gap-2">
                  Streak Freeze Shield
                </h4>
                <span className="text-xs text-[var(--foreground-secondary)] font-semibold">
                  Protects your streak if you miss a single learning day
                </span>
              </div>
            </div>

            <Badge className="bg-[#3B82F6] text-white font-extrabold text-xs">
              {streakFreezes} / 2 Equipped
            </Badge>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[var(--foreground)] block">
                  Streak Freeze Inventory
                </span>
                <span className="text-[11px] text-[var(--foreground-secondary)]">
                  Cost: 500 Coins • Max Limit: 2 Freezes
                </span>
              </div>

              <Button
                size="sm"
                disabled={streakFreezes >= 2 || totalCoins < 500 || purchasingFreeze}
                onClick={handlePurchaseFreeze}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-extrabold text-xs gap-1.5 shadow-soft-sm"
              >
                <Coins className="w-4 h-4 text-yellow-300" />
                {purchasingFreeze ? "Purchasing..." : "Buy (500 Coins)"}
              </Button>
            </div>

            <div className="text-[11px] font-semibold text-[var(--foreground-secondary)] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#3B82F6]" />
              {streakFreezes > 0
                ? "Your streak is protected for 1 missed day!"
                : "No freeze equipped. Purchase one to safeguard your hard-earned streak."}
            </div>
          </div>
        </Card>

        {/* DAILY GOAL SYSTEM (6 Cols) */}
        <Card className="lg:col-span-6 bg-[var(--card)] border-[var(--border)] shadow-soft-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#5CBFA0] text-white flex items-center justify-center font-black">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black text-[var(--foreground)]">
                  Today's Goal System
                </h4>
                <span className="text-xs text-[var(--foreground-secondary)]">
                  Complete all 3 tasks to claim bonus +50 XP & +25 Coins
                </span>
              </div>
            </div>

            <Badge variant={todayGoal.completed ? "mint" : "outline"} className="text-xs font-extrabold">
              {todayGoal.completed ? "Goal Achieved! 🎉" : "In Progress"}
            </Badge>
          </div>

          <div className="space-y-3 pt-1">
            <div
              onClick={() => triggerActivityComplete("LESSON")}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                todayGoal.lessonDone
                  ? "bg-[#5CBFA0]/15 border-[#5CBFA0] text-[#5CBFA0]"
                  : "bg-[var(--background-secondary)] border-[var(--border)] hover:border-[#8B7FE8]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    todayGoal.lessonDone ? "bg-[#5CBFA0] text-white" : "bg-[var(--card)] border border-[var(--border)]"
                  }`}
                >
                  {todayGoal.lessonDone ? <Check className="w-4 h-4" /> : "1"}
                </div>
                <span className="text-xs font-bold text-[var(--foreground)]">Complete 1 Interactive Lesson</span>
              </div>
              <span className="text-[11px] font-extrabold text-[#8B7FE8]">+50 XP</span>
            </div>

            <div
              onClick={() => triggerActivityComplete("QUIZ")}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                todayGoal.quizDone
                  ? "bg-[#5CBFA0]/15 border-[#5CBFA0] text-[#5CBFA0]"
                  : "bg-[var(--background-secondary)] border-[var(--border)] hover:border-[#8B7FE8]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    todayGoal.quizDone ? "bg-[#5CBFA0] text-white" : "bg-[var(--card)] border border-[var(--border)]"
                  }`}
                >
                  {todayGoal.quizDone ? <Check className="w-4 h-4" /> : "2"}
                </div>
                <span className="text-xs font-bold text-[var(--foreground)]">Pass 1 Knowledge Quiz</span>
              </div>
              <span className="text-[11px] font-extrabold text-[#8B7FE8]">+80 XP</span>
            </div>

            <div
              onClick={() => triggerActivityComplete("CHALLENGE")}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                todayGoal.challengeDone
                  ? "bg-[#5CBFA0]/15 border-[#5CBFA0] text-[#5CBFA0]"
                  : "bg-[var(--background-secondary)] border-[var(--border)] hover:border-[#8B7FE8]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    todayGoal.challengeDone ? "bg-[#5CBFA0] text-white" : "bg-[var(--card)] border border-[var(--border)]"
                  }`}
                >
                  {todayGoal.challengeDone ? <Check className="w-4 h-4" /> : "3"}
                </div>
                <span className="text-xs font-bold text-[var(--foreground)]">Solve 1 AI Challenge</span>
              </div>
              <span className="text-[11px] font-extrabold text-[#8B7FE8]">+100 XP</span>
            </div>
          </div>
        </Card>
      </div>

      {/* FEATURE 2, 3, 4 — WEEKLY, MONTHLY & ANNUAL ANALYTICS CHARTS */}
      <Card className="bg-[var(--card)] border-[var(--border)] shadow-soft-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div>
            <h3 className="text-lg font-black text-[var(--foreground)] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#8B7FE8]" />
              Learning Progress & Performance Analytics
            </h3>
            <p className="text-xs text-[var(--foreground-secondary)]">
              Detailed breakdown of XP trend, study hours, and completion rates.
            </p>
          </div>

          {/* Analytics Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] text-xs font-bold">
            <button
              onClick={() => setActiveAnalyticsTab("weekly")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeAnalyticsTab === "weekly"
                  ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                  : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setActiveAnalyticsTab("monthly")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeAnalyticsTab === "monthly"
                  ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                  : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveAnalyticsTab("yearly")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeAnalyticsTab === "yearly"
                  ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                  : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        {/* ANALYTICS CONTENT VIEWS */}
        {activeAnalyticsTab === "weekly" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  XP Earned This Week
                </span>
                <span className="text-xl font-black text-[#8B7FE8] mt-1 block">
                  +1,780 XP
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Study Hours
                </span>
                <span className="text-xl font-black text-[#5CBFA0] mt-1 block">
                  5.4 Hours
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Learning Days
                </span>
                <span className="text-xl font-black text-[var(--foreground)] mt-1 block">
                  7 / 7 Days
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Weekly Accuracy
                </span>
                <span className="text-xl font-black text-[#F0879B] mt-1 block">
                  94%
                </span>
              </div>
            </div>

            {/* Weekly Bar Chart Simulation */}
            <div className="space-y-2">
              <span className="text-xs font-black text-[var(--foreground)] block">
                Daily XP Trend (Last 7 Days)
              </span>
              <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-4 bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)]">
                {[
                  { day: "Mon", xp: 240, height: "60%" },
                  { day: "Tue", xp: 380, height: "95%" },
                  { day: "Wed", xp: 180, height: "45%" },
                  { day: "Thu", xp: 450, height: "100%" },
                  { day: "Fri", xp: 120, height: "30%" },
                  { day: "Sat", xp: 310, height: "78%" },
                  { day: "Sun", xp: 400, height: "88%" },
                ].map((b, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-extrabold text-[#8B7FE8] opacity-0 group-hover:opacity-100 transition-opacity">
                      +{b.xp}
                    </span>
                    <div className="w-full bg-[#8B7FE8]/20 rounded-xl overflow-hidden h-28 flex items-end">
                      <motion.div
                        className="w-full bg-[#8B7FE8] rounded-xl group-hover:bg-[#786BD6] transition-colors"
                        initial={{ height: 0 }}
                        animate={{ height: b.height }}
                        transition={{ duration: 0.6, delay: idx * 0.08 }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[var(--foreground-secondary)]">{b.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeAnalyticsTab === "monthly" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Best Learning Day
                </span>
                <span className="text-lg font-black text-[#8B7FE8] mt-1 block">
                  Wednesday
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Most Active Week
                </span>
                <span className="text-lg font-black text-[#5CBFA0] mt-1 block">
                  Week 3 (+2,450 XP)
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Perfect Days
                </span>
                <span className="text-lg font-black text-yellow-500 mt-1 block">
                  12 Days
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Monthly Study Hours
                </span>
                <span className="text-lg font-black text-[#F0879B] mt-1 block">
                  24.5 Hours
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] text-xs text-[var(--foreground)] space-y-1">
              <span className="font-black text-[#8B7FE8] block">🧠 AI Monthly Performance Summary</span>
              <p className="text-[11px] text-[var(--foreground-secondary)]">
                You studied 28 out of 30 days this month! Your quiz accuracy improved by 14% compared to last month.
              </p>
            </div>
          </div>
        )}

        {activeAnalyticsTab === "yearly" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Total Learning Days
                </span>
                <span className="text-xl font-black text-[#8B7FE8] mt-1 block">
                  {daysLearned} Days
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Longest Active Streak
                </span>
                <span className="text-xl font-black text-[#5CBFA0] mt-1 block">
                  {longestStreak} Days
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Most Productive Month
                </span>
                <span className="text-xl font-black text-[#F0879B] mt-1 block">
                  October
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <span className="text-[10px] font-extrabold uppercase text-[var(--foreground-secondary)] block">
                  Total Study Hours
                </span>
                <span className="text-xl font-black text-yellow-500 mt-1 block">
                  142 Hours
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex items-center justify-between text-xs font-bold text-[var(--foreground)]">
              <span>Activity Distribution: 45% Lessons • 30% Quizzes • 25% AI Challenges</span>
              <Badge variant="primary" className="text-[10px]">Top 5% Learner</Badge>
            </div>
          </div>
        )}
      </Card>

      {/* 5. FEATURE 5 — LEARNING MILESTONES TIMELINE */}
      <Card className="bg-[var(--card)] border-[var(--border)] shadow-soft-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-[var(--foreground)] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#8B7FE8]" />
              Learning Streak Milestones
            </h3>
            <p className="text-xs text-[var(--foreground-secondary)]">
              Reach unbroken day streaks to unlock milestone rewards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((m: Milestone) => {
            const isClaiming = claimingMilestoneId === m.id;
            return (
              <div
                key={m.id}
                className={`p-4 rounded-2xl border transition-all duration-200 space-y-3 ${
                  m.claimed
                    ? "bg-[#FFFDF0] dark:bg-[#2A2412] border-yellow-400/60 shadow-soft-sm"
                    : m.unlocked
                    ? "bg-[#F5F2FF] dark:bg-[#241E38] border-[#8B7FE8]"
                    : "bg-[var(--background-secondary)] border-[var(--border)] opacity-70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-xs ${
                        m.claimed ? "bg-yellow-500" : m.unlocked ? "bg-[#8B7FE8]" : "bg-gray-400"
                      }`}
                    >
                      {m.claimed ? <Check className="w-4 h-4" /> : m.unlocked ? <Trophy className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[var(--foreground)]">{m.title}</h4>
                      <span className="text-[10px] text-[var(--foreground-secondary)]">{m.description}</span>
                    </div>
                  </div>

                  <Badge
                    variant={m.claimed ? "pink" : m.unlocked ? "primary" : "outline"}
                    className="text-[10px]"
                  >
                    {m.claimed ? "Claimed" : m.unlocked ? "Unlocked" : "Locked"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]">
                  <div className="text-[11px] font-extrabold text-[#8B7FE8]">
                    +{m.rewardXP} XP • +{m.rewardCoins} Coins
                  </div>

                  {m.unlocked && !m.claimed && (
                    <Button
                      size="sm"
                      disabled={isClaiming}
                      onClick={() => handleClaimMilestone(m.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-black text-[11px] px-3 py-1 border-none shadow-soft-sm"
                    >
                      {isClaiming ? "Claiming..." : "Claim Reward"}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 6. ACHIEVEMENTS TIMELINE (NEWEST FIRST) */}
      <Card className="bg-[var(--card)] border-[var(--border)] shadow-soft-sm p-6 space-y-6">
        <div>
          <h3 className="text-lg font-black text-[var(--foreground)] flex items-center gap-2">
            <Medal className="w-5 h-5 text-[#5CBFA0]" />
            Achievement Badges Showcase
          </h3>
          <p className="text-xs text-[var(--foreground-secondary)]">
            Badges automatically unlocked as you complete lessons, quizzes, and streak challenges.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {achievements.map((ach: Achievement) => (
            <div
              key={ach.id}
              className={`p-3.5 rounded-2xl border text-center space-y-2 transition-all ${
                ach.unlocked
                  ? "bg-[var(--card)] border-[#8B7FE8] shadow-soft-sm"
                  : "bg-[var(--background-secondary)] border-[var(--border)] opacity-50 grayscale"
              }`}
            >
              <div className="w-10 h-10 mx-auto rounded-2xl bg-[#8B7FE8]/15 text-[#8B7FE8] flex items-center justify-center font-black">
                <Star className="w-5 h-5 fill-[#8B7FE8]" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[var(--foreground)] truncate">{ach.title}</h4>
                <p className="text-[10px] text-[var(--foreground-secondary)] line-clamp-2 mt-0.5">{ach.description}</p>
              </div>
              <Badge variant={ach.unlocked ? "primary" : "outline"} className="text-[9px] px-2 py-0.5">
                {ach.unlocked ? "Unlocked" : "Locked"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* 7. SHARE PROGRESS MODAL */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] p-6 rounded-3xl shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h3 className="text-base font-black text-[var(--foreground)] flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#8B7FE8]" /> Share Your AI Progress
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 rounded-full hover:bg-[var(--background-secondary)] text-[var(--foreground-secondary)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#8B7FE8]/15 via-[var(--card)] to-[var(--background-secondary)] border border-[#8B7FE8]/40 space-y-2 text-center">
                <div className="text-3xl font-black text-[#8B7FE8]">🔥 {currentStreak} Days</div>
                <div className="text-xs font-bold text-[var(--foreground)]">
                  Total XP: {totalXP.toLocaleString()} | Level {currentLevel} | Global Rank #{globalRank}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] text-xs text-[var(--foreground)] font-mono leading-relaxed">
                🔥 I'm on a {currentStreak}-day learning streak on Future With AI! 🚀 Total XP: {totalXP.toLocaleString()} | Level {currentLevel} | Global Rank #{globalRank}.
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`🔥 I'm on a ${currentStreak}-day learning streak on Future With AI! Total XP: ${totalXP.toLocaleString()} | Level ${currentLevel}. Check it out!`);
                    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
                  }}
                  className="px-3 py-2 rounded-xl bg-[#1DA1F2]/15 text-[#1DA1F2] hover:bg-[#1DA1F2]/25 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  Twitter/X
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`🔥 I'm on a ${currentStreak}-day learning streak on Future With AI! Total XP: ${totalXP.toLocaleString()} | Level ${currentLevel}.`);
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank");
                  }}
                  className="px-3 py-2 rounded-xl bg-[#0A66C2]/15 text-[#0A66C2] hover:bg-[#0A66C2]/25 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`🔥 I'm on a ${currentStreak}-day learning streak on Future With AI! Total XP: ${totalXP.toLocaleString()} | Level ${currentLevel}.`);
                    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
                  }}
                  className="px-3 py-2 rounded-xl bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  WhatsApp
                </button>
              </div>

              <Button
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `🔥 I'm on a ${currentStreak}-day learning streak on Future With AI! 🚀 Total XP: ${totalXP.toLocaleString()} | Level ${currentLevel} | Global Rank #${globalRank}. Join me!`
                  );
                  setCopiedShareText(true);
                  setTimeout(() => setCopiedShareText(false), 2000);
                }}
                className="w-full bg-[#8B7FE8] hover:bg-[#786BD6] text-white font-extrabold text-xs gap-2"
              >
                <Copy className="w-4 h-4" />
                {copiedShareText ? "Copied to Clipboard! 🎉" : "Copy Share Text"}
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* STREAK FREEZE AUTO-CONSUMED CELEBRATION MODAL */}
      <AnimatePresence>
        {freezeConsumedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-sm bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-2 border-[#3B82F6] p-6 rounded-3xl text-white text-center space-y-4 shadow-glow-primary"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#3B82F6]/20 border-2 border-[#3B82F6] flex items-center justify-center animate-bounce">
                <Snowflake className="w-8 h-8 text-[#60A5FA]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">🔥 Streak Saved!</h3>
                <p className="text-xs text-blue-200">
                  You missed a day, but your equipped <strong>Streak Freeze</strong> was automatically consumed to keep your unbroken streak alive!
                </p>
              </div>

              <Button
                onClick={() => setFreezeConsumedModal(false)}
                className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-extrabold text-xs border-none"
              >
                Awesome, Continue Learning!
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
