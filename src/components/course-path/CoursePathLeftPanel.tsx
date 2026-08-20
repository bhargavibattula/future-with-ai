"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  CheckCircle2,
  Flame,
  Zap,
  Award,
  ShieldCheck,
  Check,
} from "lucide-react";
import { DetailedCoursePath } from "@/data/coursePathData";
import gsap from "gsap";

interface CoursePathLeftPanelProps {
  data: DetailedCoursePath;
  onContinueLearning: () => void;
  onToggleCompleteAll?: () => void;
}

export default function CoursePathLeftPanel({
  data,
  onContinueLearning,
  onToggleCompleteAll,
}: CoursePathLeftPanelProps) {
  const router = useRouter();
  const is100Percent = data.progressPercent === 100;
  const [aboutOpen, setAboutOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);

  // GSAP animation
  useEffect(() => {
    if (!panelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }, panelRef);

    return () => ctx.revert();
  }, []);

  const handleViewCertificate = () => {
    router.push(`/certificate/${data.slug}`);
  };

  return (
    <div ref={panelRef} className="w-full sticky top-24 space-y-5 select-none font-sans">
      {/* 30% STICKY PROGRESS / COMPLETION CARD */}
      <div className="w-full rounded-[28px] bg-white/90 dark:bg-[#171717]/90 backdrop-blur-xl border border-[#E8E3FF] dark:border-[#2A2540] p-5 sm:p-6 shadow-soft relative overflow-hidden">
        {/* Soft Ambient Corner Glow */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#8B7FE8]/10 blur-2xl" />

        {is100Percent ? (
          /* ====================================
             1. COURSE COMPLETED CARD (100% State)
             ==================================== */
          <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#E6F9F0] via-[#FFFFFF] to-[#F5F2FF] dark:from-[#0E2018] dark:via-[#171717] dark:to-[#1A1830] border border-[#9DD9C5] dark:border-[#5CBFA0]/40 p-5 sm:p-6 text-center mb-5 shadow-soft-sm">
            {/* Scalloped Verified Check Badge */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white dark:bg-[#0A0A0A] border border-[#5CBFA0] shadow-md flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#5CBFA0]/50 animate-[spin_35s_linear_infinite]" />
              <div className="w-11 h-11 rounded-full bg-[#5CBFA0] text-[#0A0A0A] flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-6 h-6 stroke-[3]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-[#5CBFA0] text-[#0A0A0A] mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Course Completed
            </div>

            <h3 className="text-lg font-black text-[#1E1B2E] dark:text-white tracking-tight mb-1">
              Congratulations! 🎉
            </h3>
            <p className="text-xs text-[#6B6785] dark:text-[#B3B3B3] font-medium leading-relaxed mb-4">
              You have completed 100% of <strong className="text-[#1E1B2E] dark:text-white">{data.course.title}</strong>. Your verifiable certificate is ready.
            </p>

            {/* Progress bar */}
            <div className="flex items-center gap-3 bg-white/70 dark:bg-[#0A0A0A]/70 p-2.5 rounded-xl border border-[#9DD9C5]/50 dark:border-[#5CBFA0]/20 mb-4">
              <div className="flex-1 h-2.5 bg-[#E8E3FF] dark:bg-[#2A2540] rounded-full overflow-hidden">
                <div className="h-full bg-[#5CBFA0] rounded-full w-full" />
              </div>
              <span className="text-xs font-extrabold text-[#5CBFA0]">100%</span>
            </div>

            {/* View Certificate CTA Button */}
            <button
              onClick={handleViewCertificate}
              className="w-full py-3.5 px-4 rounded-2xl text-xs font-extrabold text-[#0A0A0A] bg-[#5CBFA0] hover:bg-[#48ac8e] shadow-md shadow-[#5CBFA0]/25 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>View Certificate</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        ) : (
          /* ====================================
             2. IN PROGRESS CARD (<100% State)
             ==================================== */
          <div className="relative w-full rounded-2xl bg-[#FCFBFF] dark:bg-[#0A0A0A] border border-[#E8E3FF] dark:border-[#2A2540] p-5 sm:p-6 text-center mb-5 shadow-soft-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white dark:bg-[#171717] border border-[#E8E3FF] dark:border-[#2A2540] shadow-soft-sm flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#8B7FE8]/40 animate-[spin_35s_linear_infinite]" />
              <div className="w-10 h-10 rounded-full bg-[#F5F2FF] dark:bg-[#1A1830] border border-[#E8E3FF] dark:border-[#8B7FE8]/30 flex items-center justify-center text-[#8B7FE8]">
                <Lock className="w-5 h-5 text-[#8B7FE8]" />
              </div>
            </div>

            <h3 className="text-base font-extrabold text-[#1E1B2E] dark:text-white mb-2 tracking-tight">
              Earn your certificate
            </h3>

            <div className="mt-4 pt-4 border-t border-[#E8E3FF]/80 dark:border-[#2A2540] text-left">
              <p className="text-xs font-extrabold text-[#1E1B2E] dark:text-white mb-1">
                You&apos;re on the right track!
              </p>
              <p className="text-xs text-[#6B6785] dark:text-[#B3B3B3] font-medium leading-relaxed mb-4">
                Keep going and unlock your personalized certificate of completion.
              </p>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#E8E3FF] dark:bg-[#2A2540] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5CBFA0] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${data.progressPercent}%` }}
                  />
                </div>
                <span className="text-xs font-extrabold text-[#1E1B2E] dark:text-white">
                  {data.progressPercent}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ACCORDION: ABOUT THIS COURSE */}
        <div className="border border-[#E8E3FF] dark:border-[#2A2540] rounded-2xl overflow-hidden bg-white dark:bg-[#171717] mb-5">
          <button
            type="button"
            onClick={() => setAboutOpen(!aboutOpen)}
            className="w-full p-4 flex items-center justify-between text-xs font-extrabold text-[#1E1B2E] dark:text-white hover:bg-[#F5F2FF]/50 dark:hover:bg-[#1A1830]/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
              <span>About this course</span>
            </div>
            {aboutOpen ? (
              <ChevronUp className="w-4 h-4 text-[#6B6785]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#6B6785]" />
            )}
          </button>

          {aboutOpen && (
            <div className="px-4 pb-4 text-xs font-medium text-[#6B6785] dark:text-[#B3B3B3] leading-relaxed border-t border-[#E8E3FF]/60 dark:border-[#2A2540] pt-3 space-y-2">
              <p>{data.course.description}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-bold text-[#1E1B2E] dark:text-white">
                <div className="bg-[#F8F9FC] dark:bg-[#0A0A0A] p-2 rounded-xl border border-[#E8E3FF] dark:border-[#2A2540] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8B7FE8]" />
                  <span>{data.course.duration}</span>
                </div>
                <div className="bg-[#F8F9FC] dark:bg-[#0A0A0A] p-2 rounded-xl border border-[#E8E3FF] dark:border-[#2A2540] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5CBFA0]" />
                  <span>
                    {data.completedModulesCount}/{data.totalModulesCount} Units
                  </span>
                </div>
                <div className="bg-[#F8F9FC] dark:bg-[#0A0A0A] p-2 rounded-xl border border-[#E8E3FF] dark:border-[#2A2540] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#F0879B]" />
                  <span suppressHydrationWarning>{data.currentStreak}</span>
                </div>
                <div className="bg-[#F8F9FC] dark:bg-[#0A0A0A] p-2 rounded-xl border border-[#E8E3FF] dark:border-[#2A2540] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#8B7FE8]" />
                  <span suppressHydrationWarning>{data.xpEarned} XP</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="space-y-2.5">
          {!is100Percent && (
            <button
              type="button"
              onClick={onContinueLearning}
              className="w-full py-3.5 px-4 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}

          {is100Percent ? (
            <button
              type="button"
              onClick={handleViewCertificate}
              className="w-full py-3.5 px-4 rounded-2xl text-xs font-extrabold text-[#0A0A0A] bg-[#5CBFA0] hover:bg-[#48ac8e] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>View Certificate</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold bg-[#F5F2FF] dark:bg-[#1A1830] text-[#A5A1C0] border border-[#E8E3FF] dark:border-[#2A2540] cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#A5A1C0]" />
              <span>View Certificate (Complete 100%)</span>
            </button>
          )}

          {/* Quick Simulation Toggle for Testing */}
          {onToggleCompleteAll && (
            <button
              type="button"
              onClick={onToggleCompleteAll}
              className="w-full py-2 px-3 rounded-xl text-[11px] font-bold text-[#8B7FE8] bg-[#F5F2FF] dark:bg-[#1A1830] border border-[#D8D2FA] dark:border-[#8B7FE8]/30 hover:opacity-80 transition-opacity flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {is100Percent ? "Reset Course Progress" : "Simulate 100% Course Completion"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
