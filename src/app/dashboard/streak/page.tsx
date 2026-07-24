"use client";

import { useState, useEffect } from "react";
import { getUserStreakData, getLeaderboardData, StreakDay, LeaderboardUser } from "@/data/leaderboard";
import Link from "next/link";
import { 
  ChevronLeft, ChevronRight, Share2, Info, Trophy, Flame, Zap, 
  TrendingUp, Star, Award, ArrowRight, Calendar, Target
} from "lucide-react";

export default function StreakPage() {
  const [data, setData] = useState<{ currentStreak: number; maxStreak: number; calendar: StreakDay[] } | null>(null);
  const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    getUserStreakData().then(setData);
    getLeaderboardData().then(u => setTopUsers(u.slice(0, 3)));
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#FCFBFF] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#EAE6FE] border-t-[#8B7FE8] animate-spin" />
          <p className="text-[#6B6785] font-semibold text-sm">Loading your streak...</p>
        </div>
      </div>
    );
  }

  const completedDays = data.calendar.filter(d => d.status === "completed").length;
  const missedDays = data.calendar.filter(d => d.status === "missed").length;
  const totalTracked = completedDays + missedDays;
  const completionRate = totalTracked > 0 ? Math.round((completedDays / totalTracked) * 100) : 0;

  const statCards = [
    { label: "Current Streak", value: data.currentStreak, suffix: "days", icon: Flame, gradient: "from-orange-400 via-orange-500 to-pink-500", glow: "shadow-orange-500/25", bg: "bg-orange-50", text: "text-orange-600" },
    { label: "Best Streak", value: data.maxStreak, suffix: "days", icon: Trophy, gradient: "from-[#8B7FE8] via-[#786BD6] to-[#6C5ED0]", glow: "shadow-[#8B7FE8]/25", bg: "bg-[#F3F0FE]", text: "text-[#8B7FE8]" },
    { label: "Completion Rate", value: completionRate, suffix: "%", icon: TrendingUp, gradient: "from-emerald-400 via-teal-500 to-cyan-500", glow: "shadow-emerald-500/25", bg: "bg-emerald-50", text: "text-emerald-600" },
    { label: "Days Active", value: completedDays, suffix: "days", icon: Star, gradient: "from-amber-400 via-yellow-500 to-orange-400", glow: "shadow-amber-500/25", bg: "bg-amber-50", text: "text-amber-600" },
  ];

  return (
    <div className="min-h-screen bg-[#FCFBFF]">

      {/* ─────────── PAGE HEADER ─────────── */}
      <div className="relative overflow-hidden">
        {/* Layered gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B2E] via-[#252240] to-[#1A1830]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#8B7FE8]/15 rounded-full blur-[100px]" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D8D2FA]/8 rounded-full blur-[60px]" />
        </div>
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.04]" 
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 sm:pt-20 sm:pb-28">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left: Title area */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 backdrop-blur-sm mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Active Learner</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-black text-white leading-none tracking-tight mb-4">
                Your <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-[#A096ED]">
                    Streak
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-[#A096ED] rounded-full blur-sm" />
                </span>
              </h1>
              <p className="text-base text-white/40 max-w-xs leading-relaxed">
                Build an unbreakable learning habit. Every flame counts.
              </p>
            </div>

            {/* Right: Quick current/max display */}
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-3xl px-8 py-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-5xl font-black text-white mt-2">{data.currentStreak}</p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Current</p>
              </div>
              <div className="w-px h-16 bg-white/10" />
              <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-3xl px-8 py-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B7FE8] to-[#6C5ED0] flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-5xl font-black text-white mt-2">{data.maxStreak}</p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Best</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────── STAT CARDS ─────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-[#EAE6FE] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg ${stat.glow} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-3xl font-black text-[#1E1B2E]">
                {stat.value}<span className="text-lg font-bold text-[#B0ACC0] ml-0.5">{stat.suffix}</span>
              </p>
              <p className="text-[11px] text-[#6B6785] font-bold uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────── MAIN CONTENT ─────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* ── Calendar Card ── */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-3xl border border-[#EAE6FE] shadow-[0_4px_40px_rgba(139,127,232,0.07)] overflow-hidden">
            
            {/* Calendar header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#F3F0FE]">
              <button className="w-10 h-10 rounded-xl border border-[#EAE6FE] flex items-center justify-center text-[#6B6785] hover:bg-[#F3F0FE] hover:text-[#8B7FE8] hover:border-[#D8D2FA] transition-all">
                <Info className="w-4.5 h-4.5" />
              </button>
              
              <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-xl flex items-center justify-center text-[#6B6785] hover:bg-[#F3F0FE] hover:text-[#8B7FE8] transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="px-7 py-2.5 rounded-2xl bg-gradient-to-r from-[#1E1B2E] to-[#2D2A4A] text-white font-extrabold text-base tracking-wide shadow-md">
                  July 2026
                </div>
                <button className="w-9 h-9 rounded-xl flex items-center justify-center text-[#6B6785] hover:bg-[#F3F0FE] hover:text-[#8B7FE8] transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <button className="w-10 h-10 rounded-xl border border-[#EAE6FE] flex items-center justify-center text-[#6B6785] hover:bg-[#F3F0FE] hover:text-[#8B7FE8] hover:border-[#D8D2FA] transition-all">
                <Share2 className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 px-6 sm:px-8 pt-6 pb-3">
              {daysOfWeek.map(d => (
                <div key={d} className="text-center text-[11px] font-black text-[#8B7FE8] uppercase tracking-widest">{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-y-2 px-6 sm:px-8 pb-8">
              {/* Prev month overflow */}
              <div className="flex items-center justify-center py-3"><span className="text-[#D8D2FA] text-sm font-semibold">30</span></div>
              <div className="flex items-center justify-center py-3"><span className="text-[#D8D2FA] text-sm font-semibold">31</span></div>

              {data.calendar.map((day, idx) => {
                const num = idx + 1;
                const isToday = num === 26;
                return (
                  <div key={idx} className="flex items-center justify-center py-2 relative group">
                    {day.status === "completed" && (
                      <button className={`w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-pink-500 flex items-center justify-center shadow-md shadow-orange-400/20 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30 transition-all ${isToday ? 'ring-2 ring-offset-2 ring-[#8B7FE8]' : ''}`}>
                        <Flame className="w-5 h-5 text-white drop-shadow-sm" />
                      </button>
                    )}
                    {day.status === "missed" && (
                      <button className="w-11 h-11 rounded-2xl bg-[#F8F7FF] border-2 border-[#EAE6FE] flex items-center justify-center hover:border-[#D8D2FA] hover:scale-105 transition-all">
                        <span className="text-xl leading-none select-none">😔</span>
                      </button>
                    )}
                    {day.status === "future" && isToday && (
                      <div className="w-11 h-11 rounded-2xl border-2 border-dashed border-[#8B7FE8] flex items-center justify-center bg-[#F3F0FE] animate-pulse">
                        <span className="text-sm font-black text-[#8B7FE8]">{num}</span>
                      </div>
                    )}
                    {day.status === "future" && !isToday && (
                      <div className="w-11 h-11 flex items-center justify-center">
                        <span className="text-sm font-semibold text-[#C4C0D0]">{num}</span>
                      </div>
                    )}

                    {/* Tooltip */}
                    {(day.status === "completed" || day.status === "missed") && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 rounded-xl bg-[#1E1B2E] text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20">
                        Jul {num} · {day.status === "completed" ? "🔥 Done" : "💔 Missed"}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-[#1E1B2E] rotate-45 -mt-1" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Next month overflow */}
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <div key={`n-${n}`} className="flex items-center justify-center py-3">
                  <span className="text-[#D8D2FA] text-sm font-semibold">{n}</span>
                </div>
              ))}
            </div>

            {/* Legend + progress */}
            <div className="px-8 py-6 bg-gradient-to-r from-[#FCFBFF] to-[#F3F0FE] border-t border-[#EAE6FE]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 shadow-sm" />
                    <span className="text-xs font-bold text-[#6B6785]">Active day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg border-2 border-[#EAE6FE] bg-[#F8F7FF]" />
                    <span className="text-xs font-bold text-[#6B6785]">Missed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg border-2 border-dashed border-[#8B7FE8] bg-[#F3F0FE]" />
                    <span className="text-xs font-bold text-[#6B6785]">Today</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#6B6785]">{completionRate}% this month</span>
                  <div className="w-32 h-2 bg-[#EAE6FE] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8B7FE8] to-[#A096ED] rounded-full"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="flex flex-col gap-6">

          {/* Monthly breakdown */}
          <div className="bg-white rounded-3xl border border-[#EAE6FE] p-6 shadow-[0_4px_20px_rgba(139,127,232,0.06)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#F3F0FE] flex items-center justify-center">
                <Calendar className="w-4.5 h-4.5 text-[#8B7FE8]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1E1B2E]">Monthly Breakdown</h3>
                <p className="text-[10px] text-[#6B6785]">July 2026</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-[#6B6785]">Completed</span>
                  <span className="text-xs font-extrabold text-[#1E1B2E]">{completedDays} days</span>
                </div>
                <div className="h-2.5 bg-[#F3F0FE] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full transition-all duration-700" style={{ width: `${(completedDays / 31) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-[#6B6785]">Missed</span>
                  <span className="text-xs font-extrabold text-[#1E1B2E]">{missedDays} days</span>
                </div>
                <div className="h-2.5 bg-[#F3F0FE] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#C4C0D0] to-[#B0ACC0] rounded-full transition-all duration-700" style={{ width: `${(missedDays / 31) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-[#6B6785]">Remaining</span>
                  <span className="text-xs font-extrabold text-[#1E1B2E]">{31 - completedDays - missedDays} days</span>
                </div>
                <div className="h-2.5 bg-[#F3F0FE] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#D8D2FA] to-[#EAE6FE] rounded-full transition-all duration-700" style={{ width: `${((31 - completedDays - missedDays) / 31) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl p-3.5 text-center">
                <p className="text-2xl font-black text-[#1E1B2E]">{completedDays}</p>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">✅ Done</p>
              </div>
              <div className="bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl p-3.5 text-center">
                <p className="text-2xl font-black text-[#1E1B2E]">{missedDays}</p>
                <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">❌ Missed</p>
              </div>
            </div>
          </div>

          {/* Motivation card */}
          <div className="relative bg-gradient-to-br from-[#1E1B2E] via-[#252245] to-[#2D2A4A] rounded-3xl p-6 overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#8B7FE8]/15 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -ml-8 -mb-8" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8B7FE8] to-[#6C5ED0] flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-black text-white/50 uppercase tracking-widest">Progress to Record</span>
              </div>
              <p className="text-2xl font-black text-white mb-1">{data.maxStreak - data.currentStreak} days away</p>
              <p className="text-sm text-white/40 mb-5 leading-relaxed">from beating your all-time streak of {data.maxStreak} days</p>
              
              {/* Mini progress bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-[#8B7FE8] to-orange-400 rounded-full transition-all"
                  style={{ width: `${Math.min((data.currentStreak / data.maxStreak) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-white/30 font-bold">
                <span>0</span>
                <span>Record: {data.maxStreak}</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-3xl border border-[#EAE6FE] p-6 shadow-[0_4px_20px_rgba(139,127,232,0.06)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#F3F0FE] flex items-center justify-center">
                <Award className="w-4.5 h-4.5 text-[#8B7FE8]" />
              </div>
              <h3 className="text-sm font-extrabold text-[#1E1B2E]">Achievements</h3>
            </div>

            <div className="space-y-2">
              {[
                { emoji: "🔥", name: "First Flame", desc: "Day 1 complete", unlocked: data.maxStreak >= 1 },
                { emoji: "⚡", name: "Week Warrior", desc: "7-day streak", unlocked: data.maxStreak >= 7 },
                { emoji: "🏆", name: "Month Master", desc: "30-day streak", unlocked: data.maxStreak >= 30 },
                { emoji: "💎", name: "Century Club", desc: "100-day streak", unlocked: data.maxStreak >= 100 },
              ].map((b) => (
                <div key={b.name} className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${b.unlocked ? 'bg-[#FCFBFF] hover:bg-[#F3F0FE]' : 'opacity-40 bg-gray-50'}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl ${b.unlocked ? 'bg-[#F3F0FE]' : 'bg-gray-100 grayscale'}`}>{b.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-extrabold text-[#1E1B2E] truncate">{b.name}</p>
                    <p className="text-[10px] text-[#6B6785]">{b.desc}</p>
                  </div>
                  {b.unlocked && (
                    <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[10px] font-black flex-shrink-0">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard CTA */}
          <Link href="/dashboard/leaderboard" className="group block bg-gradient-to-br from-[#8B7FE8] via-[#786BD6] to-[#6C5ED0] rounded-3xl p-6 text-white shadow-xl shadow-[#8B7FE8]/20 hover:shadow-2xl hover:shadow-[#8B7FE8]/30 hover:-translate-y-1 transition-all overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-inner flex-shrink-0">
                <Trophy className="w-6 h-6 text-[#FFD700] drop-shadow-sm" />
              </div>
              <div className="flex-1">
                <p className="text-base font-extrabold leading-tight">View Leaderboard</p>
                <p className="text-xs text-white/60 mt-0.5">See where you rank globally</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
