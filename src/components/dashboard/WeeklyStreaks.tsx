"use client";

import { Check, Flame } from "lucide-react";

export default function WeeklyStreaks() {
  const days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  // Mock data for completed days
  const completedDays = [0, 1]; // e.g. Wed and Thu are completed
  const currentDayIndex = 1; // Thu

  return (
    <div className="bg-white rounded-[24px] p-6 border border-[#EAE6FE] shadow-[0_8px_30px_rgba(139,127,232,0.05)] w-full flex flex-col justify-between h-full min-h-[220px]">
      <div>
        <h3 className="text-[11px] font-bold text-[#8B7FE8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5" />
          Weekly Streaks
        </h3>
        <h4 className="text-xl font-extrabold text-[#1E1B2E] tracking-tight mb-8">
          Help you build learning habit
        </h4>
      </div>

      <div>
        <div className="flex items-center justify-between gap-1 sm:gap-2 mb-6">
          {days.map((day, index) => {
            const isCompleted = completedDays.includes(index);
            const isToday = index === currentDayIndex;
            
            return (
              <div key={day} className="flex flex-col items-center gap-3">
                <div 
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                    isCompleted 
                      ? "bg-[#E6F8F0] border-2 border-[#22C55E]" 
                      : isToday 
                        ? "bg-[#FCFBFF] border-2 border-[#D8D2FA]" 
                        : "bg-white border-2 border-[#EAE6FE]"
                  }`}
                >
                  {isCompleted && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] stroke-[3]" />}
                </div>
                <span className={`text-[11px] sm:text-xs font-bold ${isToday ? "text-[#1E1B2E]" : "text-[#6B6785]"}`}>
                  {day}
                </span>
              </div>
            );
          })}
        </div>
        
        <p className="text-sm font-bold text-[#1E1B2E]">
          Today's task is complete
        </p>
      </div>
    </div>
  );
}
