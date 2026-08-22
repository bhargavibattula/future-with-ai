"use client";

import { useMemo, useState, useEffect } from "react";

// Mock data generation
const generateActivityData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (365 - i));
    
    // Create somewhat realistic looking clusters of activity
    let count = 0;
    const random = Math.random();
    if (random > 0.7) count = Math.floor(Math.random() * 2) + 1; // 1-2
    if (random > 0.85) count = Math.floor(Math.random() * 2) + 3; // 3-4
    if (random > 0.95) count = Math.floor(Math.random() * 3) + 5; // 5-7
    
    data.push({
      date,
      count,
    });
  }
  return data;
};

export default function ActivityHeatmap() {
  const [activityData] = useState<{ date: Date; count: number }[]>(() => generateActivityData());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Stats calculation
  const totalSubmissions = useMemo(() => activityData.reduce((acc, curr) => acc + curr.count, 0), [activityData]);
  const activeDays = useMemo(() => activityData.filter((d) => d.count > 0).length, [activityData]);
  
  // Max streak calculation
  const maxStreak = useMemo(() => {
    let currentStreak = 0;
    let max = 0;
    for (const day of activityData) {
      if (day.count > 0) {
        currentStreak++;
        if (currentStreak > max) max = currentStreak;
      } else {
        currentStreak = 0;
      }
    }
    return max;
  }, [activityData]);

  // Color mapping function based on brand colors
  const getColor = (count: number) => {
    if (count === 0) return "bg-[#F3F0FE] dark:bg-[#1E1933]"; // Empty state
    if (count < 3) return "bg-[#D8D2FA]";   // Low activity
    if (count < 5) return "bg-[#B1A5F5]";   // Medium activity
    return "bg-[#8B7FE8]";                  // High activity
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (!isMounted) {
    return (
      <div className="bg-[var(--card)] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[var(--border)] shadow-sm min-h-[260px] flex items-center justify-center">
        <p className="text-[var(--foreground-secondary)] text-xs sm:text-sm">Loading activity data...</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--card)] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[var(--border)] shadow-sm mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-xl font-extrabold text-[var(--foreground)]">
            {totalSubmissions} submissions in the past one year
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-[var(--foreground-secondary)]">
          <div>
            Total active days: <span className="text-[var(--foreground)] font-bold">{activeDays}</span>
          </div>
          <div>
            Max streak: <span className="text-[var(--foreground)] font-bold">{maxStreak}</span>
          </div>
        </div>
      </div>

      <div className="sm:hidden text-[10px] font-bold text-[#8B7FE8] mb-2">
        <span>← Swipe horizontally to explore annual contributions →</span>
      </div>

      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#D8D2FA] scrollbar-track-transparent">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-53 gap-1 grid-rows-7 h-28 sm:h-32">
            {activityData.map((day, i) => (
              <div
                key={i}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[2px] sm:rounded-[3px] cursor-pointer hover:ring-2 hover:ring-[#8B7FE8]/50 transition-all ${getColor(day.count)}`}
                title={`${day.date.toDateString()}: ${day.count} submissions`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[11px] sm:text-xs font-bold text-[var(--foreground-secondary)] mt-2 px-1">
            {months.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-3 text-xs font-bold text-[var(--foreground-secondary)]">
        <span className="text-[11px]">Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-[2px] bg-[#F3F0FE] dark:bg-[#1E1933]"></div>
          <div className="w-3 h-3 rounded-[2px] bg-[#D8D2FA]"></div>
          <div className="w-3 h-3 rounded-[2px] bg-[#B1A5F5]"></div>
          <div className="w-3 h-3 rounded-[2px] bg-[#8B7FE8]"></div>
        </div>
        <span className="text-[11px]">More</span>
      </div>
    </div>
  );
}
