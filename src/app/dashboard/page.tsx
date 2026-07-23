"use client";

import { useAuth } from "@/lib/auth";
import DashboardCourseGrid from "@/components/DashboardCourseGrid";
import WeeklyStreaks from "@/components/dashboard/WeeklyStreaks";
import { Sparkles } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 sm:mb-12">
        {/* Welcome Section */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F0FE] border border-[#EAE6FE] text-xs font-bold text-[#8B7FE8] mb-4 shadow-soft-sm self-start">
            <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
            <span>Interactive Learning Environment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B2E] tracking-tight mb-4">
            Welcome back, <span className="text-[#8B7FE8]">{user?.name || "Learner"}</span>
          </h1>
          <p className="text-base text-[#6B6785] max-w-lg">
            Pick up where you left off or start a new interactive AI course today. Keep building your daily learning habit!
          </p>
        </div>

        {/* Streaks Widget */}
        <div className="flex justify-start lg:justify-end">
          <div className="w-full max-w-md">
            <WeeklyStreaks />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6FE] shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] mb-2">Certificate Programs</h2>
          <p className="text-sm text-[#6B6785]">
            Complete interactive modules to earn verifiable certificates.
          </p>
        </div>
        
        <DashboardCourseGrid />
      </div>
    </div>
  );
}
