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
  Layers,
  Code2,
  Compass,
  Zap,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------
// FLOATING PARTICLES CANVAS (Lavender Dream Palette)
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
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
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
// BENTO CARD WRAPPER WITH CURSOR SPOTLIGHT & HOVER LIFT
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
      className={`bento-card relative rounded-[32px] bg-white/80 border border-[#EAE6FE] backdrop-blur-xl p-7 sm:p-8 overflow-hidden transition-all duration-300 ease-out select-none ${className}`}
      style={{
        boxShadow: isHovered
          ? "0 20px 45px rgba(139, 127, 232, 0.16)"
          : "0 8px 30px rgba(139, 127, 232, 0.08)",
        transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
      }}
    >
      {/* Cursor Spotlight Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[32px]"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Subtle Border Glow */}
      <div
        className={`absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 border-2 border-[#8B7FE8]/40 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN COMPONENT: WhyChooseCoursiv
// ----------------------------------------------------
export default function WhyChooseCoursiv() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".coursiv-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
        },
      });

      // Bento cards staggered entrance
      gsap.from(".bento-card", {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 0.8,
        stagger: 0.12,
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
      className="relative w-full bg-[#FCFBFF] text-[#1E1B2E] py-24 overflow-hidden select-none"
    >
      {/* Floating Particles Canvas */}
      <FloatingParticlesCanvas />

      {/* Ambient Moving Radial Glow Blobs */}
      <div className="pointer-events-none absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D8D2FA]/30 blur-[110px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FFC9DE]/30 blur-[130px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#B8E8D8]/20 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="coursiv-header flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F0FE] border border-[#EAE6FE] text-xs font-bold text-[#8B7FE8] mb-4 shadow-soft-sm">
            <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
            <span>Why Choose Us</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1E1B2E] mb-4">
            Why Choose <span className="bg-gradient-to-r from-[#8B7FE8] via-[#786BD6] to-[#A855F7] bg-clip-text text-transparent">Coursiv AI?</span>
          </h2>

          <p className="max-w-2xl text-base sm:text-lg text-[#6B6785] font-medium leading-relaxed">
            Everything you need to master today&apos;s leading AI tools with interactive lessons, hands-on projects, and industry-recognized certificates.
          </p>
        </div>

        {/* BENTO GRID CONTAINER */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CARD 1: Large Hero (30-Day AI Challenge - Spans 2 Cols on Desktop) */}
          <BentoCard className="lg:col-span-2 min-h-[420px] bg-gradient-to-br from-white/90 via-[#FCFBFF] to-[#F3F0FE]/80">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC]">
                  <Trophy className="w-3.5 h-3.5 text-[#8B7FE8]" />
                  Guided Learning Path
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B8E8D8] text-[#1E1B2E] border border-[#9DD9C5]">
                  30 Modules
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] mb-2 tracking-tight">
                30-Day AI Learning Challenge
              </h3>
              <p className="text-sm text-[#6B6785] leading-relaxed max-w-xl font-medium mb-6">
                Follow a guided learning path that helps you master AI tools through bite-sized daily lessons and hands-on milestones.
              </p>

              {/* ROADMAP VISUAL WITH CONNECTED MILESTONE NODES */}
              <div className="p-5 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] shadow-inner mb-6">
                <div className="flex items-center justify-between relative">
                  {/* Connecting Gradient Line */}
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#8B7FE8] via-[#B8E8D8] to-[#FFC9DE] z-0 rounded-full" />

                  {/* Nodes: ChatGPT, Claude, Gemini, Midjourney, Cursor */}
                  {[
                    { name: "ChatGPT", color: "bg-[#10B981]", label: "Day 1-6" },
                    { name: "Claude", color: "bg-[#F59E0B]", label: "Day 7-12" },
                    { name: "Gemini", color: "bg-[#3B82F6]", label: "Day 13-18", current: true },
                    { name: "Midjourney", color: "bg-[#9333EA]", label: "Day 19-24" },
                    { name: "Cursor", color: "bg-[#38BDF8]", label: "Day 25-30" },
                  ].map((node, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center group">
                      {node.current && (
                        <div className="absolute -top-7 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#8B7FE8] text-white shadow-soft-sm whitespace-nowrap animate-bounce">
                          You are here
                        </div>
                      )}
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${node.color} text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white transition-transform group-hover:scale-110`}
                      >
                        {node.name.substring(0, 2)}
                      </div>
                      <span className="text-[10px] font-bold text-[#6B6785] mt-1.5 hidden sm:block">
                        {node.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-[#6B6785] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#8B7FE8]" />
                Daily 15-minute lessons
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all duration-300 active:scale-95"
              >
                <span>Start Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </BentoCard>

          {/* CARD 2: Trusted by Learners */}
          <BentoCard className="min-h-[420px] bg-gradient-to-br from-white/90 via-[#FFF0F5]/50 to-[#FCFBFF] justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC] mb-4">
                <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
                Top Rated Platform
              </div>

              <h3 className="text-2xl font-extrabold text-[#1E1B2E] mb-2 tracking-tight">
                Trusted by Learners
              </h3>
              <p className="text-xs text-[#6B6785] leading-relaxed font-medium mb-6">
                Join thousands of satisfied professionals and students mastering AI workflows every single day.
              </p>

              {/* RATING DISPLAY */}
              <div className="p-6 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] text-center shadow-inner">
                <div className="flex justify-center gap-1 text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-4xl font-extrabold text-[#1E1B2E] tracking-tight mb-1">
                  4.9 <span className="text-xl font-bold text-[#6B6785]">/ 5</span>
                </div>
                <p className="text-xs font-semibold text-[#6B6785]">
                  Based on 12,500+ learner reviews
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-[#1E1B2E]">98% Completion Satisfaction</span>
            </div>
          </BentoCard>

          {/* CARD 3: Learn by Building */}
          <BentoCard className="min-h-[380px] bg-gradient-to-br from-white/90 via-[#EDF9F5]/40 to-[#FCFBFF]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#B8E8D8] text-[#1E1B2E] border border-[#9DD9C5] mb-4">
                <Code2 className="w-3.5 h-3.5 text-[#10B981]" />
                Hands-on Projects
              </div>

              <h3 className="text-2xl font-extrabold text-[#1E1B2E] mb-2 tracking-tight">
                Learn by Building
              </h3>
              <p className="text-xs text-[#6B6785] leading-relaxed font-medium mb-5">
                Build real-world applications and workflows using the most popular AI platforms.
              </p>
            </div>

            {/* FLOATING AI BADGES GRID */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
              {[
                { name: "ChatGPT", bg: "bg-[#10B981]/15 text-[#0E8566]" },
                { name: "Claude", bg: "bg-[#F59E0B]/15 text-[#A6570A]" },
                { name: "Gemini", bg: "bg-[#3B82F6]/15 text-[#1D4ED8]" },
                { name: "Midjourney", bg: "bg-[#9333EA]/15 text-[#7E22CE]" },
                { name: "Cursor", bg: "bg-[#38BDF8]/15 text-[#0284C7]" },
                { name: "Lovable", bg: "bg-[#F43F5E]/15 text-[#E11D48]" },
                { name: "Kling AI", bg: "bg-[#06B6D4]/15 text-[#0284C7]" },
                { name: "Canva AI", bg: "bg-[#7D2AE8]/15 text-[#6366F1]" },
                { name: "Omni", bg: "bg-[#8B7FE8]/15 text-[#8B7FE8]" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl text-center text-[11px] font-extrabold border border-white/60 shadow-sm transition-transform hover:scale-105 ${item.bg}`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* CARD 4: Learn Anywhere */}
          <BentoCard className="min-h-[380px] bg-gradient-to-br from-white/90 via-[#F3F0FE]/60 to-[#FCFBFF]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#D8D2FA] text-[#4B3FBF] border border-[#C4BDFA] mb-4">
                <Zap className="w-3.5 h-3.5 text-[#8B7FE8]" />
                Multi-Device Access
              </div>

              <h3 className="text-2xl font-extrabold text-[#1E1B2E] mb-2 tracking-tight">
                Learn Anywhere
              </h3>
              <p className="text-xs text-[#6B6785] leading-relaxed font-medium mb-5">
                Watch videos, read notes, complete quizzes, and listen to lessons from any device seamlessly.
              </p>
            </div>

            {/* DEVICE PREVIEW & PODCAST WAVEFORM */}
            <div className="p-4 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B7FE8] text-white flex items-center justify-center shadow-md">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1E1B2E] block">Audio Lessons & Notes</span>
                  <span className="text-[10px] text-[#6B6785] font-semibold flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-[#8B7FE8]" /> Offline Listening Sync
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[#8B7FE8]">
                <Smartphone className="w-5 h-5" />
                <Tablet className="w-5 h-5" />
                <Laptop className="w-5 h-5" />
              </div>
            </div>
          </BentoCard>

          {/* CARD 5: Earn Certificates */}
          <BentoCard className="min-h-[380px] bg-gradient-to-br from-white/90 via-[#FFF0F5]/40 to-[#FCFBFF]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC] mb-4">
                <Award className="w-3.5 h-3.5 text-[#8B7FE8]" />
                Verified Credentials
              </div>

              <h3 className="text-2xl font-extrabold text-[#1E1B2E] mb-2 tracking-tight">
                Earn Certificates
              </h3>
              <p className="text-xs text-[#6B6785] leading-relaxed font-medium mb-5">
                Complete learning paths and earn beautiful certificates that showcase your AI expertise on LinkedIn.
              </p>
            </div>

            {/* CERTIFICATE PREVIEW CARD */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F3F0FE] to-[#FCFBFF] border border-[#EAE6FE] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] text-white flex items-center justify-center shadow-md font-bold">
                  ✦
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#1E1B2E] block">Verified AI Specialist</span>
                  <span className="text-[10px] text-[#6B6785] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Shareable Credential ID
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="text-xs font-bold text-[#8B7FE8] hover:text-[#786BD6] flex items-center gap-1"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </BentoCard>

          {/* CARD 6: Community Support */}
          <BentoCard className="min-h-[380px] bg-gradient-to-br from-white/90 via-[#EDF9F5]/40 to-[#FCFBFF]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#B8E8D8] text-[#1E1B2E] border border-[#9DD9C5] mb-4">
                <Users className="w-3.5 h-3.5 text-[#10B981]" />
                Peer Learning Network
              </div>

              <h3 className="text-2xl font-extrabold text-[#1E1B2E] mb-2 tracking-tight">
                Community Support
              </h3>
              <p className="text-xs text-[#6B6785] leading-relaxed font-medium mb-5">
                Join thousands of learners, participate in discussions, and solve challenges together in real time.
              </p>
            </div>

            {/* COMMUNITY AVATARS & CHAT BUBBLE */}
            <div className="p-4 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] flex items-center justify-between">
              <div className="flex items-center -space-x-2">
                {["#8B7FE8", "#3B82F6", "#10B981", "#F43F5E"].map((col, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full border-2 border-white text-white flex items-center justify-center font-bold text-xs shadow-sm"
                    style={{ backgroundColor: col }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F3F0FE] text-[#8B7FE8] flex items-center justify-center font-bold text-[10px]">
                  +5k
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F0FE] border border-[#EAE6FE] text-xs font-bold text-[#8B7FE8]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Forum</span>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
