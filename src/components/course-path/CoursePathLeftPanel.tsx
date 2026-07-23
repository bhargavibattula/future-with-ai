"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Download,
} from "lucide-react";
import { DetailedCoursePath } from "@/data/coursePathData";
import gsap from "gsap";

interface CoursePathLeftPanelProps {
  data: DetailedCoursePath;
  onContinueLearning: () => void;
}

export default function CoursePathLeftPanel({
  data,
  onContinueLearning,
}: CoursePathLeftPanelProps) {
  const is100Percent = data.progressPercent === 100;
  const [aboutOpen, setAboutOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);

  // GSAP slide from left on load
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

  return (
    <div ref={panelRef} className="w-full sticky top-24 space-y-5 select-none">
      {/* 30% STICKY PROGRESS CARD (Identical layout to reference image) */}
      <div className="w-full rounded-[28px] bg-white/90 backdrop-blur-xl border border-[#E8E3FF] p-5 sm:p-6 shadow-soft relative overflow-hidden">
        {/* Soft Ambient Corner Lighting */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#8B7FE8]/10 blur-2xl" />

        {/* LARGE CERTIFICATE PREVIEW CARD */}
        <div className="relative w-full rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] p-5 sm:p-6 text-center mb-5 shadow-soft-sm">
          {/* Lock Illustration Scalloped Badge */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white border border-[#E8E3FF] shadow-soft-sm flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#8B7FE8]/40 animate-[spin_35s_linear_infinite]" />
            <div className="w-10 h-10 rounded-full bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8]">
              <Lock className="w-5 h-5 text-[#8B7FE8]" />
            </div>
          </div>

          <h3 className="text-base font-extrabold text-[#1E1B2E] mb-2 tracking-tight">
            Earn your certificate
          </h3>

          {/* Progress message subtext */}
          <div className="mt-4 pt-4 border-t border-[#E8E3FF]/80 text-left">
            <p className="text-xs font-extrabold text-[#1E1B2E] mb-1">
              You&apos;re on the right track!
            </p>
            <p className="text-xs text-[#6B6785] font-medium leading-relaxed mb-4">
              Keep going and unlock your personalized certificate of completion.
            </p>

            {/* Horizontal progress bar + percentage on right */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-[#E8E3FF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#74D99F] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${data.progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-extrabold text-[#1E1B2E]">
                {data.progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* ACCORDION: ABOUT THIS COURSE */}
        <div className="border border-[#E8E3FF] rounded-2xl overflow-hidden bg-white mb-5">
          <button
            type="button"
            onClick={() => setAboutOpen(!aboutOpen)}
            className="w-full p-4 flex items-center justify-between text-xs font-extrabold text-[#1E1B2E] hover:bg-[#F5F2FF]/50 transition-colors"
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
            <div className="px-4 pb-4 text-xs font-medium text-[#6B6785] leading-relaxed border-t border-[#E8E3FF]/60 pt-3 space-y-2">
              <p>{data.course.description}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-bold text-[#1E1B2E]">
                <div className="bg-[#F8F9FC] p-2 rounded-xl border border-[#E8E3FF] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8B7FE8]" />
                  <span>{data.course.duration}</span>
                </div>
                <div className="bg-[#F8F9FC] p-2 rounded-xl border border-[#E8E3FF] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#74D99F]" />
                  <span>{data.completedModulesCount}/{data.totalModulesCount} Units</span>
                </div>
                <div className="bg-[#F8F9FC] p-2 rounded-xl border border-[#E8E3FF] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#FFC9DE]" />
                  <span>{data.currentStreak}</span>
                </div>
                <div className="bg-[#F8F9FC] p-2 rounded-xl border border-[#E8E3FF] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#8FD8FF]" />
                  <span>{data.xpEarned} XP</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onContinueLearning}
            className="w-full py-3.5 px-4 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all duration-300 active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            disabled={!is100Percent}
            className={`w-full py-3.5 px-4 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
              is100Percent
                ? "bg-[#74D99F] text-white hover:bg-[#52C582] shadow-soft-sm cursor-pointer"
                : "bg-[#F5F2FF] text-[#A5A1C0] border border-[#E8E3FF] cursor-not-allowed"
            }`}
          >
            {is100Percent ? (
              <>
                <Download className="w-4 h-4" />
                <span>Download Certificate</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#A5A1C0]" />
                <span>Download Certificate (100%)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
