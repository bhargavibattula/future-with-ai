"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Trophy,
  Award,
  Smartphone,
  Tablet,
  Laptop,
  Play,
  Volume2,
  Users,
  MessageSquare,
  Compass,
  Zap,
  ShieldCheck,
  Flame,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------
// FLOATING PARTICLES CANVAS
// ----------------------------------------------------
function FloatingParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    const colors = ["#8B7FE8", "#D8D2FA", "#FFC9DE", "#B8E8D8"];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.1,
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.x > width ? -width : p.x < 0 ? width : p.vx;
        p.y += p.y > height ? -height : p.y < 0 ? height : p.vy;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

// ----------------------------------------------------
// BENTO CARD CONTAINER (Apple & Linear Inspired)
// ----------------------------------------------------
function BentoCard({
  children,
  className = "",
  glowColor = "rgba(139, 127, 232, 0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bento-card group relative rounded-[32px] bg-white/85 border border-[#EAE6FE] backdrop-blur-2xl p-7 sm:p-9 overflow-hidden transition-all duration-300 ease-out select-none flex flex-col justify-between ${className}`}
      style={{
        boxShadow: isHovered
          ? "0 22px 50px rgba(139, 127, 232, 0.18)"
          : "0 10px 32px rgba(139, 127, 232, 0.08)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
      }}
    >
      {/* Cursor Radial Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[32px]"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Subtle Glowing Border on Hover */}
      <div
        className={`absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 border-2 border-[#8B7FE8]/50 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN MARKETING BENTO SECTION
// ----------------------------------------------------
export default function WhyChooseCoursiv() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header Reveal
      gsap.from(".coursiv-header", {
        opacity: 0,
        y: 40,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
        },
      });

      // Bento Cards Stagger Reveal
      gsap.from(".bento-card", {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 78%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-coursiv"
      className="relative w-full bg-[#FCFBFF] text-[#1E1B2E] py-24 sm:py-28 overflow-hidden select-none"
    >
      {/* Background Animated Floating Particles Canvas */}
      <FloatingParticlesCanvas />

      {/* Soft Ambient Radial Blobs */}
      <div className="pointer-events-none absolute -top-36 right-1/4 w-[550px] h-[550px] rounded-full bg-[#D8D2FA]/35 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-36 left-1/4 w-[550px] h-[550px] rounded-full bg-[#FFC9DE]/35 blur-[130px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-[#B8E8D8]/25 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="coursiv-header flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F0FE] border border-[#EAE6FE] text-xs font-bold text-[#8B7FE8] mb-4 shadow-soft-sm">
            <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
            <span>Premium Learning Experience</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E1B2E] mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#8B7FE8] via-[#786BD6] to-[#A855F7] bg-clip-text text-transparent">
              Coursiv AI?
            </span>
          </h2>

          <p className="max-w-2xl text-base sm:text-lg text-[#6B6785] font-medium leading-relaxed">
            Everything you need to master today&apos;s leading AI tools with interactive lessons, hands-on projects, and industry-recognized certificates.
          </p>
        </div>

        {/* TRUE BENTO GRID (Visual-First Marketing Showcase) */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          
          {/* ==================================================
              CARD 1 (LARGE HERO CARD - 2X WIDTH ON DESKTOP)
             ================================================== */}
          <BentoCard className="lg:col-span-2 min-h-[500px] bg-gradient-to-br from-white/95 via-[#FCFBFF] to-[#F3F0FE]/90">
            {/* Top Typography (25%) */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC] shadow-sm">
                  <Trophy className="w-3.5 h-3.5 text-[#8B7FE8]" />
                  Guided Learning Path
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#B8E8D8] text-[#1E1B2E] border border-[#9DD9C5]">
                  30 Modules
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
                30-Day AI Learning Challenge
              </h3>
              <p className="text-sm sm:text-base text-[#6B6785] leading-relaxed max-w-xl font-medium">
                Follow a guided learning path that helps you master AI tools through bite-sized daily lessons and hands-on milestones.
              </p>
            </div>

            {/* Huge 3D Interactive Roadmap Illustration (50% Image Area) */}
            <div className="relative w-full py-8 px-6 my-2 rounded-3xl bg-gradient-to-r from-[#F3F0FE]/80 via-white to-[#EDF9F5]/80 border border-[#EAE6FE] shadow-inner overflow-hidden flex items-center justify-center">
              {/* Ambient Glowing Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#8B7FE8_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.06] pointer-events-none" />

              {/* Connecting 3D Gradient Line */}
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-2.5 bg-gradient-to-r from-[#10B981] via-[#3B82F6] to-[#9333EA] rounded-full shadow-sm" />

              {/* Connected Milestone Nodes */}
              <div className="relative z-10 w-full flex items-center justify-between">
                {[
                  { name: "ChatGPT", color: "from-[#10B981] to-[#059669]", shadow: "rgba(16, 185, 129, 0.4)", day: "Day 1-6" },
                  { name: "Claude", color: "from-[#F59E0B] to-[#D97706]", shadow: "rgba(245, 158, 11, 0.4)", day: "Day 7-12" },
                  { name: "Gemini", color: "from-[#3B82F6] to-[#1D4ED8]", shadow: "rgba(59, 130, 246, 0.4)", day: "Day 13-18", active: true },
                  { name: "Midjourney", color: "from-[#9333EA] to-[#7E22CE]", shadow: "rgba(147, 51, 234, 0.4)", day: "Day 19-24" },
                  { name: "Cursor", color: "from-[#38BDF8] to-[#0284C7]", shadow: "rgba(56, 189, 248, 0.4)", day: "Day 25-30" },
                ].map((node, i) => (
                  <div key={i} className="flex flex-col items-center relative group">
                    {node.active && (
                      <div className="absolute -top-10 text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#8B7FE8] text-white shadow-lg whitespace-nowrap animate-bounce border border-white">
                        You are here ✦
                      </div>
                    )}
                    {/* 3D Glossy Node Tile */}
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${node.color} text-white flex items-center justify-center font-extrabold text-sm sm:text-base border-2 border-white shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1`}
                      style={{ boxShadow: `0 10px 24px ${node.shadow}` }}
                    >
                      {node.name.substring(0, 2)}
                    </div>
                    <span className="text-xs font-extrabold text-[#1E1B2E] mt-2 hidden sm:block">
                      {node.name}
                    </span>
                    <span className="text-[10px] font-semibold text-[#6B6785] hidden sm:block">
                      {node.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="flex items-center justify-between pt-4">
              <span className="text-xs font-semibold text-[#6B6785] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#8B7FE8]" />
                Daily 15-minute lessons
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all duration-300 active:scale-95"
              >
                <span>Start Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </BentoCard>

          {/* ==================================================
              CARD 2 (TRUSTED BY LEARNERS - RATING SHOWCASE)
             ================================================== */}
          <BentoCard className="min-h-[500px] bg-gradient-to-br from-white/95 via-[#FFF0F5]/60 to-[#FCFBFF] justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC] mb-4 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
                Top Rated Platform
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
                Trusted by 50,000+ Learners
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6785] leading-relaxed font-medium mb-6">
                Join thousands of students and working professionals mastering AI skills daily.
              </p>
            </div>

            {/* Huge 3D Rating & Laurel Graphics Visual (50% Image Area) */}
            <div className="my-4 p-8 rounded-3xl bg-gradient-to-b from-[#FCFBFF] to-[#F3F0FE] border border-[#EAE6FE] text-center shadow-inner relative overflow-hidden flex flex-col items-center justify-center">
              {/* Glowing Background Blob */}
              <div className="absolute w-32 h-32 rounded-full bg-[#FFC9DE]/50 blur-2xl pointer-events-none" />

              {/* Floating Golden Stars */}
              <div className="flex justify-center gap-1.5 text-amber-400 mb-3 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-7 h-7 fill-amber-400 text-amber-400 drop-shadow-md animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>

              {/* Huge 4.9 Rating Number */}
              <div className="text-5xl sm:text-6xl font-black text-[#1E1B2E] tracking-tight relative z-10 mb-1">
                4.9 <span className="text-2xl font-extrabold text-[#8B7FE8]">/ 5.0</span>
              </div>

              <p className="text-xs font-extrabold text-[#6B6785] uppercase tracking-wider relative z-10">
                Based on 12,500+ Verified Reviews
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2 text-xs font-extrabold text-[#1E1B2E]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>98% Course Completion Satisfaction</span>
            </div>
          </BentoCard>

          {/* ==================================================
              CARD 3 (LEARN BY BUILDING - FLOATING 3D CARDS)
             ================================================== */}
          <BentoCard className="min-h-[460px] bg-gradient-to-br from-white/95 via-[#EDF9F5]/50 to-[#FCFBFF]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#B8E8D8] text-[#1E1B2E] border border-[#9DD9C5] mb-4">
                <Flame className="w-3.5 h-3.5 text-[#10B981]" />
                Hands-On Projects
              </div>

              <h3 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
                Learn by Building
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6785] leading-relaxed font-medium mb-6">
                Build real-world projects using the most popular AI platforms.
              </p>
            </div>

            {/* Large Floating 3D Glass Cards Stack (50% Image Area) */}
            <div className="relative w-full h-56 p-4 rounded-3xl bg-gradient-to-b from-[#FCFBFF] to-[#EDF9F5] border border-[#EAE6FE] shadow-inner overflow-hidden flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2.5 w-full">
                {[
                  { name: "ChatGPT", col: "bg-[#10B981]/15 border-[#10B981]/30 text-[#0E8566]" },
                  { name: "Claude", col: "bg-[#F59E0B]/15 border-[#F59E0B]/30 text-[#A6570A]" },
                  { name: "Gemini", col: "bg-[#3B82F6]/15 border-[#3B82F6]/30 text-[#1D4ED8]" },
                  { name: "Midjourney", col: "bg-[#9333EA]/15 border-[#9333EA]/30 text-[#7E22CE]" },
                  { name: "Cursor", col: "bg-[#38BDF8]/15 border-[#38BDF8]/30 text-[#0284C7]" },
                  { name: "Lovable", col: "bg-[#F43F5E]/15 border-[#F43F5E]/30 text-[#E11D48]" },
                  { name: "Kling AI", col: "bg-[#06B6D4]/15 border-[#06B6D4]/30 text-[#0284C7]" },
                  { name: "Canva AI", col: "bg-[#7D2AE8]/15 border-[#7D2AE8]/30 text-[#6366F1]" },
                  { name: "Omni", col: "bg-[#8B7FE8]/15 border-[#8B7FE8]/30 text-[#8B7FE8]" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl text-center text-xs font-black border backdrop-blur-md shadow-sm transition-all duration-300 group-hover:scale-105 ${item.col}`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* ==================================================
              CARD 4 (LEARN ANYWHERE - DEVICE SHOWCASE)
             ================================================== */}
          <BentoCard className="min-h-[460px] bg-gradient-to-br from-white/95 via-[#F3F0FE]/70 to-[#FCFBFF]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#D8D2FA] text-[#4B3FBF] border border-[#C4BDFA] mb-4">
                <Zap className="w-3.5 h-3.5 text-[#8B7FE8]" />
                Multi-Device Access
              </div>

              <h3 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
                Learn Anywhere
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6785] leading-relaxed font-medium mb-6">
                Watch videos, read notes, complete quizzes, and listen to lessons from any device.
              </p>
            </div>

            {/* Large Device & Podcast Waveform Showcase Illustration (50% Image Area) */}
            <div className="relative w-full h-56 p-6 rounded-3xl bg-gradient-to-b from-[#FCFBFF] to-[#F3F0FE] border border-[#EAE6FE] shadow-inner overflow-hidden flex flex-col justify-between">
              {/* Device Icons Row */}
              <div className="flex items-center justify-around text-[#8B7FE8]">
                <div className="flex flex-col items-center">
                  <Laptop className="w-10 h-10 drop-shadow-md" />
                  <span className="text-[10px] font-bold text-[#1E1B2E] mt-1">Laptop</span>
                </div>
                <div className="flex flex-col items-center">
                  <Tablet className="w-8 h-8 drop-shadow-md" />
                  <span className="text-[10px] font-bold text-[#1E1B2E] mt-1">Tablet</span>
                </div>
                <div className="flex flex-col items-center">
                  <Smartphone className="w-7 h-7 drop-shadow-md" />
                  <span className="text-[10px] font-bold text-[#1E1B2E] mt-1">Mobile</span>
                </div>
              </div>

              {/* Audio Waveform & Player Badge */}
              <div className="p-3 rounded-2xl bg-white/90 border border-[#EAE6FE] shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B7FE8] text-white flex items-center justify-center shadow-md">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1E1B2E] block">Audio Sync & Notes</span>
                    <span className="text-[10px] text-[#6B6785] font-semibold flex items-center gap-1">
                      <Volume2 className="w-3 h-3 text-[#8B7FE8]" /> Offline Listening
                    </span>
                  </div>
                </div>

                {/* Animated Equalizer Waveform Bars */}
                <div className="flex items-end gap-1 h-5">
                  {[12, 20, 16, 24, 14, 18, 10].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#8B7FE8] rounded-full animate-pulse"
                      style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* ==================================================
              CARD 5 (EARN CERTIFICATES - TALLEST HERO CARD)
             ================================================== */}
          <BentoCard className="min-h-[460px] bg-gradient-to-br from-white/95 via-[#FFF0F5]/50 to-[#FCFBFF]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC] mb-4">
                <Award className="w-3.5 h-3.5 text-[#8B7FE8]" />
                Industry Credential
              </div>

              <h3 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
                Earn Certificates
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6785] leading-relaxed font-medium mb-6">
                Complete learning paths and earn beautiful certificates that showcase your AI expertise.
              </p>
            </div>

            {/* Large Certificate Illustration & Gold Ribbon (50% Image Area) */}
            <div className="relative w-full h-56 p-6 rounded-3xl bg-gradient-to-b from-[#FCFBFF] to-[#FFF0F5] border border-[#EAE6FE] shadow-inner overflow-hidden flex flex-col justify-between items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] text-white flex items-center justify-center shadow-lg font-black text-2xl mb-1">
                ✦
              </div>

              <div>
                <span className="text-sm font-black text-[#1E1B2E] block tracking-tight">
                  Verified AI Specialist
                </span>
                <span className="text-xs text-[#6B6785] font-semibold flex items-center justify-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Shareable on LinkedIn & Resumes
                </span>
              </div>

              <button
                type="button"
                className="w-full py-2.5 rounded-xl bg-white border border-[#EAE6FE] text-xs font-extrabold text-[#8B7FE8] hover:bg-[#F3F0FE] transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                <span>View Sample Certificate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
