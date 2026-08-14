"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Trophy, Flame, User, Crown, Medal, Award } from "lucide-react";
import { getLeaderboardData, LeaderboardUser } from "@/data/leaderboard";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    if (isOpen) {
      getLeaderboardData().then(setUsers);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1E1B2E]/60 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl border border-[#EAE6FE] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-2xl bg-[#F3F0FE] text-[#8B7FE8] hover:bg-[#EAE6FE] hover:text-[#1E1B2E] flex items-center justify-center transition-all z-20 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ======= PODIUM SECTION ======= */}
        <div className="relative bg-gradient-to-br from-[#FCFBFF] via-[#F3F0FE] to-[#EAE6FE] pt-10 pb-8 px-6 sm:px-10 border-b border-[#EAE6FE] overflow-hidden">
          
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#8B7FE8]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D8D2FA]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Title */}
          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#EAE6FE] shadow-sm mb-4">
              <Trophy className="w-4 h-4 text-[#FFD700]" />
              <span className="text-xs font-extrabold text-[#8B7FE8] uppercase tracking-wider">Top Performers</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#1E1B2E] tracking-tight">Leaderboard</h2>
          </div>

          {/* Podium */}
          <div className="flex items-end justify-center gap-3 sm:gap-6 relative z-10">

            {/* 2nd Place */}
            {top3[1] && (
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="relative mb-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-4 border-[#C0C0C0] flex items-center justify-center shadow-lg overflow-hidden">
                    {top3[1].avatar ? (
                      <img src={top3[1].avatar} alt={top3[1].name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-7 h-7 text-[#C0C0C0]" />
                    )}
                  </div>
                  {/* Crown/badge */}
                  <div className="absolute -top-3 -right-1 w-7 h-7 rounded-full bg-[#C0C0C0] flex items-center justify-center shadow-md">
                    <span className="text-white font-extrabold text-xs">2</span>
                  </div>
                </div>
                
                {/* Pedestal */}
                <div className="w-28 sm:w-32 bg-gradient-to-t from-[#E8E8E8] to-[#F5F5F5] rounded-t-2xl py-4 px-3 text-center border border-[#E0E0E0] border-b-0 shadow-inner">
                  <p className="text-sm font-extrabold text-[#1E1B2E] truncate">{top3[1].name}</p>
                  <p className="text-[10px] text-[#6B6785] mt-1">Max: {top3[1].maxStreak}</p>
                  <p className="text-[10px] text-[#6B6785]">Current: {top3[1].currentStreak}</p>
                </div>
                <div className="w-28 sm:w-32 h-16 sm:h-20 bg-gradient-to-b from-[#F0F0F0] to-[#E4E4E4] rounded-b-xl border border-t-0 border-[#DDD]"></div>
              </div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <div className="flex flex-col items-center -mt-6">
                {/* Crown */}
                <Crown className="w-8 h-8 text-[#FFD700] mb-1 drop-shadow-lg" />
                
                {/* Avatar */}
                <div className="relative mb-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-4 border-[#FFD700] flex items-center justify-center shadow-xl overflow-hidden shadow-[#FFD700]/20">
                    {top3[0].avatar ? (
                      <img src={top3[0].avatar} alt={top3[0].name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-9 h-9 text-[#FFD700]" />
                    )}
                  </div>
                  {/* Badge */}
                  <div className="absolute -top-2 -right-1 w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center shadow-lg">
                    <span className="text-white font-extrabold text-sm">1</span>
                  </div>
                </div>
                
                {/* Pedestal */}
                <div className="w-32 sm:w-40 bg-gradient-to-t from-[#FFF4D6] to-[#FFFCF0] rounded-t-2xl py-4 px-3 text-center border border-[#FFE7A3] border-b-0 shadow-inner">
                  <p className="text-base font-extrabold text-[#1E1B2E] truncate">{top3[0].name}</p>
                  <p className="text-[10px] text-[#6B6785] mt-1">Max: {top3[0].maxStreak}</p>
                  <p className="text-[10px] text-[#6B6785]">Current: {top3[0].currentStreak}</p>
                </div>
                <div className="w-32 sm:w-40 h-24 sm:h-28 bg-gradient-to-b from-[#FFF8E1] to-[#FFEDB3] rounded-b-xl border border-t-0 border-[#FFE7A3]"></div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="flex flex-col items-center mt-4">
                {/* Avatar */}
                <div className="relative mb-3">
                  <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white border-4 border-[#CD7F32] flex items-center justify-center shadow-lg overflow-hidden">
                    {top3[2].avatar ? (
                      <img src={top3[2].avatar} alt={top3[2].name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-[#CD7F32]" />
                    )}
                  </div>
                  <div className="absolute -top-3 -right-1 w-7 h-7 rounded-full bg-[#CD7F32] flex items-center justify-center shadow-md">
                    <span className="text-white font-extrabold text-xs">3</span>
                  </div>
                </div>
                
                {/* Pedestal */}
                <div className="w-24 sm:w-28 bg-gradient-to-t from-[#F5E6D2] to-[#FFF5EB] rounded-t-2xl py-3 px-3 text-center border border-[#E8D0B3] border-b-0 shadow-inner">
                  <p className="text-sm font-extrabold text-[#1E1B2E] truncate">{top3[2].name}</p>
                  <p className="text-[10px] text-[#6B6785] mt-1">Max: {top3[2].maxStreak}</p>
                  <p className="text-[10px] text-[#6B6785]">Current: {top3[2].currentStreak}</p>
                </div>
                <div className="w-24 sm:w-28 h-12 sm:h-16 bg-gradient-to-b from-[#FAECD8] to-[#F0D9B5] rounded-b-xl border border-t-0 border-[#E8D0B3]"></div>
              </div>
            )}

          </div>
        </div>

        {/* ======= TABLE SECTION ======= */}
        <div className="flex-1 overflow-auto px-4 sm:px-8 py-6 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] uppercase tracking-widest text-[#8B7FE8] font-extrabold border-b-2 border-[#EAE6FE]">
                <th className="pb-4 px-2">Rank</th>
                <th className="pb-4 px-2">Name</th>
                <th className="pb-4 px-2 text-center">Current Streak</th>
                <th className="pb-4 px-2 text-center">Max Streak</th>
                <th className="pb-4 px-2 text-center">DSA Problems</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((user) => (
                <tr key={user.rank} className="border-b border-[#F3F0FE] hover:bg-[#FCFBFF] transition-colors group">
                  <td className="py-4 px-2">
                    <span className="text-sm font-extrabold text-[#8B7FE8]">#{user.rank}</span>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F3F0FE] border-2 border-[#EAE6FE] flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-[#8B7FE8] transition-colors">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[#8B7FE8] text-xs font-extrabold">{user.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#1E1B2E] group-hover:text-[#8B7FE8] transition-colors">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-100">
                      <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                      <span className="font-extrabold text-[#1E1B2E] text-sm">{user.currentStreak}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F3F0FE] border border-[#EAE6FE]">
                      <Trophy className="w-4 h-4 text-[#8B7FE8]" />
                      <span className="font-extrabold text-[#1E1B2E] text-sm">{user.maxStreak}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className="font-extrabold text-[#1E1B2E] text-sm">{user.dsaProblem}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ======= PAGINATION ======= */}
        <div className="px-6 py-5 border-t border-[#EAE6FE] flex items-center justify-center gap-4 bg-[#FCFBFF]">
          <button className="w-10 h-10 rounded-2xl bg-white border border-[#EAE6FE] text-[#6B6785] flex items-center justify-center hover:bg-[#F3F0FE] hover:text-[#8B7FE8] hover:border-[#D8D2FA] transition-all shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-[#8B7FE8] text-white text-sm font-extrabold shadow-soft-sm">1</span>
            <span className="text-sm font-bold text-[#6B6785]">of</span>
            <span className="text-sm font-bold text-[#1E1B2E]">1699</span>
          </div>
          <button className="w-10 h-10 rounded-2xl bg-white border border-[#EAE6FE] text-[#6B6785] flex items-center justify-center hover:bg-[#F3F0FE] hover:text-[#8B7FE8] hover:border-[#D8D2FA] transition-all shadow-sm">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
