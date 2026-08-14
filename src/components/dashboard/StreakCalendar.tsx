"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Info, Share, Trophy, User, Flame, Frown, Check, Clock } from "lucide-react";
import { getUserStreakData, StreakDay } from "@/data/leaderboard";

interface StreakCalendarProps {
  onOpenLeaderboard?: () => void;
}

export default function StreakCalendar({ onOpenLeaderboard }: StreakCalendarProps) {
  const [data, setData] = useState<{ currentStreak: number; maxStreak: number; calendar: StreakDay[] } | null>(null);

  useEffect(() => {
    getUserStreakData().then(setData);
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  if (!data) return null;

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6FE] shadow-[0_8px_30px_rgba(139,127,232,0.08)] flex flex-col h-full relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B7FE8]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <button className="w-10 h-10 rounded-2xl bg-[#F3F0FE] text-[#8B7FE8] flex items-center justify-center hover:bg-[#EAE6FE] transition-colors shadow-sm">
          <Info className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4">
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B6785] hover:bg-[#F3F0FE] hover:text-[#8B7FE8] transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="px-6 py-2 rounded-2xl bg-gradient-to-r from-[#8B7FE8] to-[#A096ED] text-white font-extrabold text-lg shadow-soft-md">
            July
          </div>
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B6785] hover:bg-[#F3F0FE] hover:text-[#8B7FE8] transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <button className="w-10 h-10 rounded-2xl bg-[#F3F0FE] text-[#8B7FE8] flex items-center justify-center hover:bg-[#EAE6FE] transition-colors shadow-sm">
          <Share className="w-5 h-5" />
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-2 mb-6 text-center text-sm font-bold text-[#8B7FE8] uppercase tracking-wider relative z-10">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-6 gap-x-2 text-center mb-10 flex-1 relative z-10">
        {/* Placeholder days for previous month */}
        <div className="text-sm font-semibold text-[#D8D2FA] flex items-center justify-center">30</div>
        <div className="text-sm font-semibold text-[#D8D2FA] flex items-center justify-center">31</div>
        
        {data.calendar.map((day, idx) => {
          const dateNum = idx + 1;
          const isToday = dateNum === 26;
          
          return (
            <div key={idx} className="flex flex-col items-center justify-center gap-1.5 relative group cursor-pointer">
              {day.status === "completed" && (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-400 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/20 transform group-hover:scale-110 transition-transform">
                  <Flame className="w-5 h-5 text-white fill-white" />
                </div>
              )}
              {day.status === "missed" && (
                <div className="w-10 h-10 rounded-2xl bg-[#F8F9FA] border-2 border-[#EAE6FE] flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Frown className="w-5 h-5 text-[#A09CAB]" />
                </div>
              )}
              {day.status === "future" && isToday && (
                <div className="w-10 h-10 rounded-2xl bg-[#F3F0FE] border-2 border-[#8B7FE8] flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(139,127,232,0.3)] animate-pulse">
                  <Clock className="w-5 h-5 text-[#8B7FE8]" />
                </div>
              )}
              {day.status === "future" && !isToday && (
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center">
                  <span className={`text-sm font-bold ${dateNum <= 31 ? 'text-[#6B6785]' : 'text-[#D8D2FA]'}`}>
                    {dateNum}
                  </span>
                </div>
              )}
              
              {/* Highlight dot for current day */}
              {isToday && (
                <div className="absolute -bottom-3 w-1.5 h-1.5 bg-[#8B7FE8] rounded-full" />
              )}
            </div>
          );
        })}
        {/* Fill remaining slots */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={`next-${num}`} className="text-sm font-semibold text-[#D8D2FA] flex items-center justify-center">
            {num}
          </div>
        ))}
      </div>

      {/* Bottom Stats & Leaderboard */}
      <div className="mt-auto pt-6 border-t border-[#EAE6FE] relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="flex-1 w-full flex justify-between items-center px-6 py-4 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] shadow-soft-sm">
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold text-[#6B6785] uppercase tracking-wider mb-1">Current</span>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                <span className="text-2xl font-extrabold text-[#1E1B2E]">{data.currentStreak}</span>
              </div>
            </div>
            <div className="w-px h-10 bg-[#EAE6FE]"></div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-[#6B6785] uppercase tracking-wider mb-1">Max Streak</span>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#8B7FE8]" />
                <span className="text-2xl font-extrabold text-[#1E1B2E]">{data.maxStreak}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onOpenLeaderboard}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#1E1B2E] to-[#2D2A43] text-white flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-md group"
          >
            <Trophy className="w-5 h-5 text-[#FFD700] group-hover:scale-110 transition-transform" />
            <span className="font-extrabold tracking-wide">View Leaderboard</span>
          </button>
        </div>

        {/* Podium Bottom Area */}
        <div className="flex items-end justify-center gap-4 sm:gap-10">
          
          {/* Rank 2 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-4 border-[#C0C0C0] z-10 relative shadow-lg">
                <User className="w-5 h-5 text-[#C0C0C0]" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#C0C0C0] rounded-sm transform rotate-45 z-0"></div>
            </div>
            <span className="text-xs font-extrabold text-[#6B6785] mt-2">Rank 2</span>
          </div>

          {/* Rank 1 */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-[#FFD700] z-10 relative shadow-xl overflow-hidden shadow-[#FFD700]/30">
                 <img src="https://i.pravatar.cc/150?u=harsraj007" alt="Rank 1" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#FFD700] rounded-sm transform rotate-45 z-0"></div>
            </div>
            <span className="text-sm font-extrabold text-[#1E1B2E] mt-2">Rank 1</span>
          </div>

          {/* Rank 3 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-4 border-[#CD7F32] z-10 relative shadow-lg">
                <User className="w-5 h-5 text-[#CD7F32]" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#CD7F32] rounded-sm transform rotate-45 z-0"></div>
            </div>
            <span className="text-xs font-extrabold text-[#6B6785] mt-2">Rank 3</span>
          </div>
          
          {/* User Rank (Mocked) */}
          <div className="flex flex-col items-center ml-4 sm:ml-8 border-l-2 border-[#EAE6FE] pl-4 sm:pl-8 opacity-60 hover:opacity-100 transition-opacity">
            <div className="relative mb-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#EAE6FE] z-10 relative">
                <User className="w-4 h-4 text-[#A09CAB]" />
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#6B6785] bg-[#F3F0FE] px-2 py-1 rounded-md uppercase">Your Rank</span>
          </div>

        </div>
      </div>
    </div>
  );
}
