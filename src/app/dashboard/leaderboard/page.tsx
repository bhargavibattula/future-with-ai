"use client";

import { useState, useEffect } from "react";
import { getLeaderboardData, LeaderboardUser } from "@/data/leaderboard";
import Link from "next/link";
import { 
  ChevronLeft, ChevronRight, Trophy, Flame, User, Crown, 
  Search, Zap, TrendingUp, Medal, ArrowLeft
} from "lucide-react";

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getLeaderboardData().then(setUsers);
  }, []);

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);
  const filtered = rest.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  // Podium order: 2, 1, 3
  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumStyles = [
    { // 2nd
      border: "border-[#C0C0C0]", 
      ring: "ring-[#C0C0C0]/30",
      numBg: "bg-gradient-to-br from-[#D0D0D0] to-[#A0A0A0]",
      barH: "h-24 sm:h-32",
      barBg: "bg-gradient-to-b from-[#F0F0F0] to-[#E0E0E0]",
      topBg: "bg-gradient-to-t from-[#EAEAEA] to-[#F5F5F5]",
      topBorder: "border-[#D8D8D8]",
      avatarSize: "w-16 h-16 sm:w-20 sm:h-20",
      labelColor: "text-[#888]",
      streakColor: "text-[#555]",
      zIndex: "z-10",
      mt: "mt-6 sm:mt-10",
    },
    { // 1st
      border: "border-[#FFD700]",
      ring: "ring-[#FFD700]/40",
      numBg: "bg-gradient-to-br from-[#FFE066] to-[#FFA500]",
      barH: "h-36 sm:h-48",
      barBg: "bg-gradient-to-b from-[#FFF8DC] to-[#FFE8A0]",
      topBg: "bg-gradient-to-t from-[#FFF0C0] to-[#FFFAED]",
      topBorder: "border-[#FFE07A]",
      avatarSize: "w-20 h-20 sm:w-28 sm:h-28",
      labelColor: "text-[#8B6A00]",
      streakColor: "text-[#FF8C00]",
      zIndex: "z-20",
      mt: "",
    },
    { // 3rd
      border: "border-[#CD7F32]",
      ring: "ring-[#CD7F32]/30",
      numBg: "bg-gradient-to-br from-[#E8A060] to-[#A0621A]",
      barH: "h-16 sm:h-24",
      barBg: "bg-gradient-to-b from-[#F5E8D4] to-[#E8D0B0]",
      topBg: "bg-gradient-to-t from-[#F0E0C8] to-[#FDF5ED]",
      topBorder: "border-[#D8C0A0]",
      avatarSize: "w-14 h-14 sm:w-18 sm:h-18",
      labelColor: "text-[#7A4A15]",
      streakColor: "text-[#A05010]",
      zIndex: "z-10",
      mt: "mt-10 sm:mt-16",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCFBFF]">

      {/* ─────────── HERO SECTION ─────────── */}
      <div className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B2E] via-[#252240] to-[#1A1830]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FFD700]/5 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#8B7FE8]/12 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#D8D2FA]/8 rounded-full blur-[80px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" 
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-12">
            <Link href="/dashboard/streak" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-white/12 transition-all text-sm font-bold backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Streak
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20">
              <Trophy className="w-4 h-4 text-[#FFD700]" />
              <span className="text-xs font-bold text-[#FFD700] uppercase tracking-widest">Global Rankings</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-16 sm:mb-24">
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-none tracking-tight">
              Leader
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-orange-400">
                board
              </span>
            </h1>
            <p className="text-base text-white/35 mt-4 max-w-sm mx-auto">
              The planet's most consistent learners, all in one place.
            </p>
          </div>

          {/* ── PODIUM ── */}
          <div className="flex items-end justify-center gap-2 sm:gap-4 pb-0">
            {podiumOrder.map((user, i) => {
              if (!user) return null;
              const s = podiumStyles[i];
              const rankNum = i === 0 ? 2 : i === 1 ? 1 : 3;
              return (
                <div key={user.name} className={`flex flex-col items-center flex-1 max-w-[180px] sm:max-w-[200px] ${s.mt} ${s.zIndex}`}>
                  
                  {/* Crown for 1st */}
                  {rankNum === 1 && (
                    <div className="mb-3 flex flex-col items-center">
                      <Crown className="w-10 h-10 text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
                    </div>
                  )}

                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div className={`${s.avatarSize} rounded-full border-4 ${s.border} bg-white flex items-center justify-center overflow-hidden shadow-2xl ring-4 ${s.ring}`}>
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-[#B0ACC0]" />
                      )}
                    </div>
                    {/* Rank badge */}
                    <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full ${s.numBg} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-black text-sm">{rankNum}</span>
                    </div>
                  </div>

                  {/* Name plate */}
                  <div className={`w-full rounded-t-2xl ${s.topBg} border ${s.topBorder} border-b-0 px-3 pt-5 pb-3 text-center`}>
                    <p className={`text-sm font-extrabold ${s.labelColor} truncate`}>{user.name}</p>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <Flame className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                      <span className={`text-sm font-black ${s.streakColor}`}>{user.currentStreak}</span>
                    </div>
                    {rankNum === 1 && (
                      <p className="text-[9px] text-[#AA8800]/60 font-bold uppercase tracking-wider mt-1">Max: {user.maxStreak}</p>
                    )}
                  </div>

                  {/* Pedestal */}
                  <div className={`w-full ${s.barH} ${s.barBg} border-x border-b ${s.topBorder} rounded-b-lg`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─────────── TABLE SECTION ─────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-2 relative z-10">
        <div className="bg-white rounded-3xl border border-[#EAE6FE] shadow-[0_20px_60px_rgba(139,127,232,0.10)] overflow-hidden">

          {/* Search bar */}
          <div className="px-6 sm:px-8 py-6 border-b border-[#F3F0FE] bg-gradient-to-r from-[#FCFBFF] to-white">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#8B7FE8]" />
                <input
                  type="text"
                  placeholder="Search any user..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-2xl border-2 border-[#EAE6FE] text-sm font-semibold text-[#1E1B2E] placeholder:text-[#C4C0D0] focus:outline-none focus:border-[#8B7FE8] focus:ring-4 focus:ring-[#8B7FE8]/8 transition-all bg-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 px-4 flex items-center gap-2 rounded-2xl bg-[#F3F0FE] border border-[#EAE6FE]">
                  <User className="w-4 h-4 text-[#8B7FE8]" />
                  <span className="text-sm font-bold text-[#1E1B2E]">{users.length.toLocaleString()}</span>
                  <span className="text-xs text-[#6B6785]">users</span>
                </div>
                <Link href="/dashboard/streak" className="h-12 px-4 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-100 hover:shadow-md transition-all">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-bold text-orange-600">My Streak</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#F3F0FE]">
                  {["Rank", "User", "Current Streak", "Max Streak", "DSA Problems"].map((h, i) => (
                    <th key={h} className={`px-4 sm:px-6 py-4 text-[10px] uppercase tracking-widest font-black text-[#8B7FE8] ${i >= 3 ? "hidden md:table-cell" : i >= 2 ? "hidden sm:table-cell" : ""} ${i > 0 ? (i === 1 ? "text-left" : "text-center") : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F0FE]">
                {filtered.map((user) => (
                  <tr key={user.rank} className="hover:bg-gradient-to-r hover:from-[#FCFBFF] hover:to-[#FAFAFE] transition-all group cursor-pointer">
                    
                    {/* Rank */}
                    <td className="px-4 sm:px-6 py-4">
                      <div className="w-10 h-10 rounded-xl border-2 border-[#EAE6FE] bg-[#F3F0FE] flex items-center justify-center group-hover:border-[#D8D2FA] group-hover:bg-[#EAE6FE] transition-all">
                        <span className="text-xs font-extrabold text-[#8B7FE8]">{user.rank}</span>
                      </div>
                    </td>

                    {/* User */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl border-2 border-[#EAE6FE] bg-[#F3F0FE] flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-[#8B7FE8]/40 transition-colors">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[#8B7FE8] text-sm font-extrabold">{user.name[0].toUpperCase()}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-[#1E1B2E] group-hover:text-[#8B7FE8] transition-colors">{user.name}</p>
                          <p className="text-[10px] text-[#B0ACC0] font-semibold">Active Learner</p>
                        </div>
                      </div>
                    </td>

                    {/* Current Streak */}
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-100">
                        <Flame className="w-4 h-4 text-orange-500 fill-orange-500 flex-shrink-0" />
                        <span className="font-extrabold text-[#1E1B2E] text-sm">{user.currentStreak}</span>
                      </div>
                    </td>

                    {/* Max Streak */}
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F3F0FE] border border-[#EAE6FE]">
                        <Trophy className="w-4 h-4 text-[#8B7FE8] flex-shrink-0" />
                        <span className="font-extrabold text-[#1E1B2E] text-sm">{user.maxStreak}</span>
                      </div>
                    </td>

                    {/* DSA */}
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-100">
                        <Zap className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="font-extrabold text-[#1E1B2E] text-sm">{user.dsaProblem}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 sm:px-8 py-5 border-t border-[#F3F0FE] flex items-center justify-between bg-[#FCFBFF]">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="w-10 h-10 rounded-2xl border-2 border-[#EAE6FE] bg-white text-[#6B6785] flex items-center justify-center hover:bg-[#F3F0FE] hover:text-[#8B7FE8] hover:border-[#D8D2FA] transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-xl text-sm font-extrabold transition-all ${page === n ? 'bg-[#8B7FE8] text-white shadow-lg shadow-[#8B7FE8]/20' : 'bg-white border border-[#EAE6FE] text-[#6B6785] hover:bg-[#F3F0FE] hover:text-[#8B7FE8] hover:border-[#D8D2FA]'}`}
                >{n}</button>
              ))}
              <span className="text-[#B0ACC0] font-bold px-1">…</span>
              <button className="w-9 h-9 rounded-xl text-sm font-extrabold bg-white border border-[#EAE6FE] text-[#6B6785] hover:bg-[#F3F0FE]">1699</button>
            </div>

            <button
              onClick={() => setPage(p => p + 1)}
              className="w-10 h-10 rounded-2xl border-2 border-[#EAE6FE] bg-white text-[#6B6785] flex items-center justify-center hover:bg-[#F3F0FE] hover:text-[#8B7FE8] hover:border-[#D8D2FA] transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom CTA - Your rank card */}
        <div className="mt-6 relative overflow-hidden bg-gradient-to-br from-[#1E1B2E] via-[#252245] to-[#2D2A4A] rounded-3xl p-7 sm:p-10 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B7FE8]/15 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFD700]/8 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <TrendingUp className="w-8 h-8 text-white/50" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-2">Climb the Ranks</p>
              <p className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Every day of learning<br className="hidden sm:block" /> moves you up.
              </p>
            </div>
            <Link
              href="/dashboard/streak"
              className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8B7FE8] to-[#6C5ED0] text-white font-extrabold shadow-xl shadow-[#8B7FE8]/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              <Flame className="w-5 h-5 text-orange-300" />
              Start Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
