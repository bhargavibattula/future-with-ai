"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import FlameMascot from "@/components/dashboard/FlameMascot";
import DashboardCourseGrid from "@/components/DashboardCourseGrid";
import {
  Sparkles,
  Target,
  PenTool,
  Layers,
  Briefcase,
  Award,
  BookOpen,
  Zap,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Play,
  Check,
  ShieldCheck,
  ChevronRight,
  Gamepad2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface TimelineActivity {
  id: string;
  title: string;
  timeAgo: string;
  type: "quiz" | "lesson" | "streak" | "certificate";
}

const mockActivities: TimelineActivity[] = [
  { id: "1", title: "Completed Module 4: LoRA & QLoRA Fine-tuning", timeAgo: "15 mins ago", type: "lesson" },
  { id: "2", title: "Scored 100% on Prompt Engineering Assessment", timeAgo: "2 hours ago", type: "quiz" },
  { id: "3", title: "Hit 14-Day Streak Milestone 🎉", timeAgo: "Yesterday", type: "streak" },
  { id: "4", title: "Earned Certificate: AI Tools & Architecture", timeAgo: "3 days ago", type: "certificate" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [courseProgress, setCourseProgress] = useState<number>(0);
  const [isMascotCelebrating, setIsMascotCelebrating] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  // DOM Refs for GSAP
  const pageRef = useRef<HTMLDivElement>(null);
  const ringPathRef = useRef<SVGCircleElement>(null);
  const ringCounterRef = useRef<HTMLSpanElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Fetch live backend data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        if (res.ok && json.success) {
          setDashboardData(json.data);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchDashboard();
  }, []);

  const totalLessons = dashboardData?.progress?.totalLessons ?? 125;
  const totalXP = dashboardData?.progress?.totalXP ?? 3420;
  const currentStreak = dashboardData?.progress?.currentStreak ?? 14;

  // GSAP Entrance & Count-up Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCourseProgress(78);
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Course Progress Ring Arc Tween
      if (ringPathRef.current) {
        const length = ringPathRef.current.getTotalLength();
        gsap.set(ringPathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(ringPathRef.current, {
          strokeDashoffset: length * (1 - 0.78),
          duration: 1.6,
          ease: "power3.out",
        });
      }

      // Count-up for Progress Percentage
      if (ringCounterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 78,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            if (ringCounterRef.current) {
              ringCounterRef.current.textContent = `${Math.round(obj.val)}%`;
            }
          },
        });
      }

      // 2. Learning Statistics GSAP Counters
      if (stat1Ref.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: totalLessons,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            if (stat1Ref.current) stat1Ref.current.textContent = Math.round(obj.val).toString();
          },
        });
      }

      if (stat2Ref.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 87,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            if (stat2Ref.current) stat2Ref.current.textContent = `${Math.round(obj.val)}%`;
          },
        });
      }

      if (stat3Ref.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: totalXP,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            if (stat3Ref.current) stat3Ref.current.textContent = Math.round(obj.val).toLocaleString();
          },
        });
      }

      // 3. Staggered Timeline Activity Fade-in
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, [totalLessons, totalXP]);

  return (
    <div ref={pageRef} className="relative min-h-screen bg-[#FCFBFF] text-[#1E1B2E] overflow-hidden">
      {/* AMBIENT MESH BACKGROUND LIGHT ORBS */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#8B7FE8]/15 via-[#D8D2FA]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#FFC9DE]/15 via-[#FFF0F5]/30 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        {/* 1. HERO & FLOATING QUICK ACTIONS BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-[#EAE6FE] shadow-soft-md backdrop-blur-md">
          <div>
            <Badge variant="primary" className="mb-2">
              <Sparkles className="w-3.5 h-3.5 text-white" /> Welcome Back
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1E1B2E] tracking-tight">
              Hello, {user?.name || "Bhargavi"}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6785] mt-1">
              You are on a <strong>{currentStreak}-day streak</strong>. Continue your AI Mastery pathway.
            </p>
          </div>

          {/* FLOATING QUICK ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/courses/claude">
              <Button size="sm" className="bg-[#8B7FE8] hover:bg-[#786BD6] text-white shadow-soft-sm font-extrabold gap-1.5">
                <Play className="w-4 h-4 fill-white" /> Continue Learning
              </Button>
            </Link>

            <Link href="/dashboard/games">
              <Button size="sm" variant="accentPink" className="font-extrabold gap-1.5">
                <Gamepad2 className="w-4 h-4 text-[#1E1B2E]" /> AI Games
              </Button>
            </Link>

            <Link href="/dashboard/streak">
              <Button size="sm" variant="mint" className="font-extrabold gap-1.5">
                <Flame className="w-4 h-4 text-[#1E1B2E] fill-[#1E1B2E]" /> Practice Quiz
              </Button>
            </Link>

            <Link href="/dashboard/leaderboard">
              <Button size="sm" variant="accentPink" className="font-extrabold gap-1.5">
                <Award className="w-4 h-4 text-[#1E1B2E]" /> Leaderboard
              </Button>
            </Link>
          </div>
        </div>

        {/* 2. LEARNING STATISTICS CARDS (WITH GSAP COUNTERS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* STAT CARD 1 */}
          <Card className="bg-white border-[#EAE6FE] shadow-soft-sm hover:-translate-y-1 transition-all hover:shadow-soft-md group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B6785]">Total Lessons Done</span>
                <div className="text-3xl font-black text-[#1E1B2E] mt-1 flex items-center gap-1">
                  <span ref={stat1Ref}>0</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#F3F0FE] text-[#8B7FE8] flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* STAT CARD 2 */}
          <Card className="bg-white border-[#EAE6FE] shadow-soft-sm hover:-translate-y-1 transition-all hover:shadow-soft-md group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B6785]">Avg Quiz Accuracy</span>
                <div className="text-3xl font-black text-[#5CBFA0] mt-1">
                  <span ref={stat2Ref}>0%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#EDF9F5] text-[#5CBFA0] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* STAT CARD 3 */}
          <Card className="bg-white border-[#EAE6FE] shadow-soft-sm hover:-translate-y-1 transition-all hover:shadow-soft-md group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B6785]">Total XP Points</span>
                <div className="text-3xl font-black text-[#8B7FE8] mt-1">
                  <span ref={stat3Ref}>0</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#F3F0FE] text-[#8B7FE8] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          {/* STAT CARD 4 */}
          <Card className="bg-white border-[#EAE6FE] shadow-soft-sm hover:-translate-y-1 transition-all hover:shadow-soft-md group">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B6785]">Certificates Earned</span>
                <div className="text-3xl font-black text-[#1E1B2E] mt-1">
                  4 Issued
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F5] text-[#F0879B] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. MAIN DASHBOARD CONTENT GRID: COURSE PROGRESS & STREAK PREVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* COURSE PROGRESS CARD WITH CIRCULAR RING (7 Cols) */}
          <Card className="lg:col-span-7 bg-white border-[#EAE6FE] shadow-soft-sm flex flex-col justify-between">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="default">Active Pathway</Badge>
                <span className="text-xs font-bold text-[#8B7FE8]">Module 4 of 12</span>
              </div>
              <CardTitle className="text-xl font-black text-[#1E1B2E] mt-2">
                Claude & LLM Fine-Tuning Program
              </CardTitle>
              <CardDescription className="text-xs text-[#6B6785]">
                Master prompt engineering, LoRA adaptation, and model deployment.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
                {/* CIRCULAR PROGRESS RING */}
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0 group">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="#F3F0FE"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      ref={ringPathRef}
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="#8B7FE8"
                      strokeWidth="10"
                      fill="transparent"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span
                      ref={ringCounterRef}
                      className="text-2xl font-black text-[#1E1B2E] tracking-tight group-hover:scale-110 transition-transform"
                    >
                      0%
                    </span>
                    <span className="text-[9px] font-extrabold uppercase text-[#6B6785]">
                      Overall
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="text-sm font-black text-[#1E1B2E]">
                    Current Lesson: LoRA Fine-Tuning Mechanics
                  </h4>
                  <p className="text-xs text-[#6B6785] leading-relaxed">
                    Adjust model weights with minimal VRAM footprint using quantized adapter parameters.
                  </p>
                  <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                    <Link href="/courses/claude">
                      <Button size="sm" className="text-xs font-bold gap-1 shadow-soft-sm">
                        Resume Lesson <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FLAME MASCOT STREAK CARD PREVIEW (5 Cols) */}
          <Card className="lg:col-span-5 bg-[var(--card)] border border-[var(--border)] shadow-soft-sm flex flex-col justify-between">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="primary" className="text-[10px]">
                  Daily Streak
                </Badge>
                <span className="text-xs font-bold text-[#8B7FE8]">14 Days Active</span>
              </div>
              <CardTitle className="text-xl font-black text-[var(--foreground)] mt-2">
                Streak Flame Mascot
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="flex items-center justify-center p-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
                <FlameMascot
                  isCelebrating={isMascotCelebrating}
                  onCelebrationComplete={() => setIsMascotCelebrating(false)}
                />
              </div>

              <div className="text-center space-y-2">
                <h4 className="text-sm font-black text-[var(--foreground)]">Keep the Flame Alive! 🔥</h4>
                <p className="text-xs text-[var(--foreground-secondary)]">
                  Complete today's quiz to extend your streak and unlock milestone badges.
                </p>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <Button
                    size="sm"
                    onClick={() => setIsMascotCelebrating(true)}
                    className="bg-[#8B7FE8] hover:bg-[#786BD6] text-white font-extrabold text-xs shadow-soft-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-white" /> Boost Flame
                  </Button>

                  <Link href="/dashboard/streak">
                    <Button size="sm" variant="outline" className="text-xs font-extrabold border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--background-secondary)]">
                      Full Streak Hub ➔
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4. SECOND ROW: AI INSIGHTS & RECENT ACTIVITY TIMELINE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* AI RECOMMENDATION CARD (6 Cols) */}
          <Card className="lg:col-span-6 bg-gradient-to-br from-[#F3F0FE] via-white to-[#EDF9F5] border border-[#D8D2FA] shadow-soft-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge variant="primary" className="text-[10px]">
                  <Sparkles className="w-3 h-3 text-white" /> AI Recommendation
                </Badge>
                <span className="text-xs font-bold text-[#6B6785]">Est. 18 min</span>
              </div>
              <CardTitle className="text-lg font-black text-[#1E1B2E] mt-2">
                Machine Learning & Neural Nets Basics
              </CardTitle>
              <CardDescription className="text-xs text-[#6B6785]">
                Based on your recent quiz accuracy, reviewing backpropagation will boost your benchmark score by 12%.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#EAE6FE] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8B7FE8] text-white flex items-center justify-center font-black">
                    AI
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#1E1B2E] block">
                      Recommended Practice Quiz
                    </span>
                    <span className="text-[11px] text-[#6B6785]">10 Questions • Multiple Choice</span>
                  </div>
                </div>

                <Link href="/courses/claude">
                  <Button size="sm" className="text-xs font-bold shadow-soft-sm">
                    Start Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* RECENT ACTIVITY TIMELINE (6 Cols) */}
          <Card className="lg:col-span-6 bg-white border-[#EAE6FE] shadow-soft-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-black text-[#1E1B2E] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#8B7FE8]" />
                Recent Learning Activity
              </CardTitle>
              <CardDescription className="text-xs text-[#6B6785]">
                Your recent progress timeline.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div ref={timelineRef} className="space-y-3">
                {mockActivities.map((act) => (
                  <div
                    key={act.id}
                    className="timeline-item p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] hover:border-[#8B7FE8]/50 hover:shadow-soft-sm transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#F3F0FE] text-[#8B7FE8] flex items-center justify-center font-bold text-xs shrink-0">
                        {act.type === "lesson" ? (
                          <BookOpen className="w-4 h-4" />
                        ) : act.type === "quiz" ? (
                          <Target className="w-4 h-4 text-[#5CBFA0]" />
                        ) : (
                          <Flame className="w-4 h-4 text-[#F0879B]" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1E1B2E] block">
                          {act.title}
                        </span>
                        <span className="text-[10px] text-[#6B6785] font-semibold">
                          {act.timeAgo}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B6785]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 5. EXPLORE COURSES GRID SECTION */}
        <Card className="bg-white border-[#EAE6FE] shadow-soft-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-[#1E1B2E]">Explore AI Certificate Programs</h3>
              <p className="text-xs text-[#6B6785] mt-0.5">
                Enroll in specialized tracks and claim verified certificates.
              </p>
            </div>

            <Link
              href="/dashboard/courses"
              className="px-4 py-2 bg-[#F3F0FE] text-[#8B7FE8] text-xs font-extrabold rounded-xl hover:bg-[#EAE6FE] transition-colors"
            >
              View All Courses ➔
            </Link>
          </div>

          <DashboardCourseGrid />
        </Card>
      </div>
    </div>
  );
}
