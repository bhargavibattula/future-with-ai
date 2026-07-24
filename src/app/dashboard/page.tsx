"use client";

import { useAuth } from "@/lib/auth";
import DashboardCourseGrid from "@/components/DashboardCourseGrid";
import WeeklyStreaks from "@/components/dashboard/WeeklyStreaks";
import { Sparkles, Target, PenTool, Layers, Briefcase, Award } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E]">Certificate Programs</h2>
        <Link 
          href="/dashboard/courses" 
          className="px-5 py-2.5 bg-[#F3F0FE] text-[#8B7FE8] text-sm font-bold rounded-xl hover:bg-[#EAE6FE] transition-colors shadow-sm"
        >
          View All
        </Link>
      </div>

      {/* Certificate Program Banner */}
      <div className="bg-[#F9F8FF] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between border border-[#EAE6FE] mb-10 shadow-sm transition-all hover:shadow-md hover:border-[#D8D2FA]">
        
        <div className="flex items-center gap-6 mb-8 lg:mb-0 w-full lg:w-auto">
          {/* Mock Graphic */}
          <div className="w-32 h-20 sm:w-40 sm:h-24 rounded-2xl bg-gradient-to-br from-[#4AA5FF] to-[#8EE4FF] relative overflow-hidden flex-shrink-0 shadow-inner">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:10px_10px]" />
            <div className="absolute top-3 left-3 flex gap-1.5">
              <div className="w-3 h-1 bg-green-500 rounded-full" />
              <div className="w-2 h-1 bg-white rounded-full" />
              <div className="w-4 h-1 bg-white rounded-full" />
            </div>
            <div className="absolute top-6 left-3 flex gap-1.5">
              <div className="w-2 h-1 bg-white rounded-full" />
              <div className="w-5 h-1 bg-red-400 rounded-full" />
            </div>
            <div className="absolute top-9 left-3 flex gap-1.5">
              <div className="w-4 h-1 bg-yellow-400 rounded-full" />
            </div>
            <PenTool className="absolute bottom-2 right-2 w-10 h-10 text-white opacity-90 drop-shadow-md rotate-[-15deg]" />
          </div>
          
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E1B2E] max-w-[220px] leading-tight tracking-tight">
            Claude-Powered Accounting Program
          </h3>
        </div>

        {/* Claim Tracker UI */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-[20px] p-2 sm:p-3 border border-[#EAE6FE] shadow-soft-sm overflow-x-auto w-full lg:w-auto">
          {/* Tracker Items */}
          {[
            { icon: Target, color: "bg-[#F48566]", label: "30%" },
            { icon: Briefcase, color: "bg-[#D88C78]", label: "0%" },
            { icon: Layers, color: "bg-[#D4A5B6]", label: "0%" },
            { icon: Award, color: "bg-[#C4B7D6]", label: "0%" },
            { icon: Award, color: "bg-[#E0D8A5]", label: "0%" }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center justify-center p-2 rounded-2xl min-w-[56px] border ${idx === 0 ? "border-[#8B7FE8] bg-[#F9F8FF]" : "border-transparent"}`}
            >
              <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center mb-1.5 shadow-sm text-white`}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-bold ${idx === 0 ? "text-[#8B7FE8]" : "text-[#A19DBC]"}`}>
                {item.label}
              </span>
            </div>
          ))}
          
          <button className="h-[68px] px-6 ml-2 bg-[#C8C2F5] text-white text-xs font-bold rounded-2xl shadow-sm hover:bg-[#8B7FE8] transition-colors">
            Claim
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Recently Opened Course */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6FE] shadow-[0_8px_30px_rgba(139,127,232,0.05)] flex flex-col">
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden relative shadow-md flex-shrink-0">
              <img 
                src="/images/courses/claude.png" 
                alt="Claude Course" 
                className="w-full h-full object-cover object-top" 
              />
            </div>
            <div className="pt-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] mb-2 tracking-tight">Claude</h3>
              <p className="text-sm font-medium text-[#6B6785]">Creativity Stimulation</p>
            </div>
          </div>

          <div className="mb-8 mt-auto">
            <div className="flex justify-between items-center text-xs font-bold text-[#6B6785] mb-3">
              <span>3/10 lessons completed</span>
              <span className="text-[#4F46E5]">30%</span>
            </div>
            <div className="w-full h-2.5 bg-[#F3F0FE] rounded-full overflow-hidden">
              <div className="h-full bg-[#4F46E5] rounded-full w-[30%] transition-all duration-1000 ease-out"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/dashboard/courses" 
              className="flex items-center justify-center py-3.5 rounded-2xl bg-[#F3F0FE] text-[#8B7FE8] font-bold text-sm hover:bg-[#EAE6FE] transition-colors"
            >
              Other courses
            </Link>
            <Link 
              href="/courses/claude" 
              className="flex items-center justify-center py-3.5 rounded-2xl bg-[#4F46E5] text-white font-bold text-sm hover:bg-[#4338CA] shadow-[0_8px_20px_rgba(79,70,229,0.25)] transition-all hover:-translate-y-0.5 active:scale-95"
            >
              Continue learning
            </Link>
          </div>
        </div>

        {/* Weekly Streaks Widget */}
        <WeeklyStreaks />

      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6FE] shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1E1B2E] mb-2">Explore AI tools</h2>
            <p className="text-sm text-[#6B6785]">
              Discover new tools and enhance your productivity.
            </p>
          </div>
          <Link href="/dashboard/courses" className="px-4 py-2 bg-[#F3F0FE] text-[#8B7FE8] text-sm font-bold rounded-xl hover:bg-[#EAE6FE] transition-colors">
            View All
          </Link>
        </div>

        <DashboardCourseGrid />
      </div>
    </div>
  );
}
