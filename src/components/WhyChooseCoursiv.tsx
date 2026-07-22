"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, Star, Award, Laptop, Smartphone, Tablet, Users, CheckCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------
// FLOATING PARTICLES BACKGROUND CANVAS
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
        radius: Math.random() * 2.5 + 0.8,
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
        ctx.shadowBlur = 6;
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
// BENTO CARD CONTAINER (Apple & Linear Product Banner Style)
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
      className={`bento-card group relative rounded-[36px] bg-white/90 border border-[#EAE6FE] backdrop-blur-2xl p-7 sm:p-9 overflow-hidden transition-all duration-300 ease-out select-none flex flex-col justify-between ${className}`}
      style={{
        boxShadow: isHovered
          ? "0 24px 50px rgba(139, 127, 232, 0.18)"
          : "0 10px 32px rgba(139, 127, 232, 0.08)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
      }}
    >
      {/* Cursor Radial Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[36px]"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Subtle Glowing Border on Hover */}
      <div
        className={`absolute inset-0 rounded-[36px] pointer-events-none transition-opacity duration-300 border-2 border-[#8B7FE8]/50 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}

// ----------------------------------------------------
// REBUILT VISUAL STORYTELLING BENTO SECTION
// ----------------------------------------------------
export default function WhyChooseCoursiv() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header Reveal
      gsap.from(".storytelling-header", {
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
      className="relative w-full bg-[#FCFBFF] text-[#1E1B2E] py-24 sm:py-32 overflow-hidden select-none"
    >
      {/* Background Animated Floating Particles Canvas */}
      <FloatingParticlesCanvas />

      {/* Soft Ambient Radial Glow Blobs */}
      <div className="pointer-events-none absolute -top-36 right-1/4 w-[550px] h-[550px] rounded-full bg-[#D8D2FA]/35 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-36 left-1/4 w-[550px] h-[550px] rounded-full bg-[#FFC9DE]/35 blur-[130px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-[#B8E8D8]/25 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER (Minimal Text, High Impact) */}
        <div className="storytelling-header flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-[#F3F0FE] border border-[#EAE6FE] text-xs font-bold text-[#8B7FE8] mb-4 shadow-soft-sm">
            <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
            <span>Product Showcase</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E1B2E] mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#8B7FE8] via-[#786BD6] to-[#A855F7] bg-clip-text text-transparent">
              Coursiv AI?
            </span>
          </h2>

          <p className="max-w-xl text-base sm:text-lg text-[#6B6785] font-medium leading-relaxed">
            Everything you need to master today&apos;s leading AI tools with interactive lessons, hands-on projects, and industry-recognized certificates.
          </p>
        </div>

        {/* ORGANIC BENTO GRID STORYTELLING (60% Illustration Weight) */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          
          {/* ==================================================
              CARD 1: HERO CARD (2X Width on Desktop) - 60% Visual
             ================================================== */}
          <BentoCard className="lg:col-span-2 min-h-[540px] bg-gradient-to-br from-white via-[#FCFBFF] to-[#F3F0FE]/90">
            {/* Top Text (40% Area) */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC] shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B7FE8]" />
                  Guided Roadmap
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#B8E8D8] text-[#1E1B2E] border border-[#9DD9C5]">
                  30 Modules
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
                30-Day AI Learning Challenge
              </h3>
              <p className="text-sm sm:text-base text-[#6B6785] font-medium max-w-lg">
                Follow a guided learning path that helps you master AI tools through bite-sized daily lessons.
              </p>
            </div>

            {/* HUGE 3D ROADMAP ILLUSTRATION (60% Area) */}
            <div className="relative w-full h-64 sm:h-72 my-4 rounded-3xl bg-gradient-to-r from-[#F3F0FE] via-white to-[#EDF9F5] border border-[#EAE6FE] shadow-inner overflow-hidden flex items-center justify-center p-6">
              {/* Soft Ambient Background Blur */}
              <div className="absolute inset-0 bg-[radial-gradient(#8B7FE8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#FFC9DE]/40 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#B8E8D8]/40 blur-3xl pointer-events-none" />

              {/* 3D Connected Line */}
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-3 bg-gradient-to-r from-[#10B981] via-[#3B82F6] to-[#9333EA] rounded-full shadow-inner" />

              {/* Floating 3D AI Logo Tiles */}
              <div className="relative z-10 w-full flex items-center justify-between">
                {[
                  { name: "ChatGPT", bg: "from-[#26BA92] to-[#0E8566]", day: "Day 1-6" },
                  { name: "Claude", bg: "from-[#E08226] to-[#A6570A]", day: "Day 7-12" },
                  { name: "Gemini", bg: "from-[#3B82F6] to-[#1D4ED8]", day: "Day 13-18", current: true },
                  { name: "Midjourney", bg: "from-[#9333EA] to-[#7E22CE]", day: "Day 19-24" },
                  { name: "Cursor", bg: "from-[#38BDF8] to-[#0284C7]", day: "Day 25-30" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center relative group">
                    {item.current && (
                      <div className="absolute -top-11 text-xs font-extrabold px-3 py-1 rounded-full bg-[#8B7FE8] text-white shadow-lg whitespace-nowrap animate-bounce border border-white">
                        You are here ✦
                      </div>
                    )}
                    {/* 3D Acrylic Tile */}
                    <div
                      className={`w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br ${item.bg} text-white flex items-center justify-center font-extrabold text-base sm:text-lg border-2 border-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2`}
                      style={{ boxShadow: "0 12px 28px rgba(0,0,0,0.18)" }}
                    >
                      {item.name.substring(0, 2)}
                    </div>
                    <span className="text-xs font-extrabold text-[#1E1B2E] mt-2 hidden sm:block">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-[#6B6785]">
                Daily 15-minute interactive lessons
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all duration-300 active:scale-95"
              >
                <span>Start Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </BentoCard>

          {/* ==================================================
              CARD 2: TALL FEATURE CARD (Earn Certificates - 580px Height)
             ================================================== */}
          <BentoCard className="lg:row-span-2 min-h-[580px] bg-gradient-to-b from-white via-[#FFF0F5]/50 to-[#FCFBFF] justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC] mb-4">
                <Award className="w-3.5 h-3.5 text-[#8B7FE8]" />
                Industry Credential
              </div>

              <h3 className="text-3xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
                Earn Certificates
              </h3>
              <p className="text-sm text-[#6B6785] font-medium leading-relaxed mb-6">
                Complete learning paths and earn beautiful certificates that showcase your AI expertise.
              </p>
            </div>

            {/* HUGE 3D CERTIFICATE PRODUCT ILLUSTRATION (60% Area) */}
            <div className="relative w-full h-80 my-4 p-6 rounded-3xl bg-gradient-to-b from-[#FCFBFF] via-white to-[#F3F0FE] border border-[#EAE6FE] shadow-inner overflow-hidden flex flex-col justify-between items-center text-center">
              {/* Background ambient lighting */}
              <div className="absolute w-40 h-40 rounded-full bg-[#D8D2FA]/50 blur-3xl pointer-events-none" />

              {/* 3D Certificate Document Graphic */}
              <div className="relative z-10 w-full p-6 rounded-2xl bg-white border border-[#EAE6FE] shadow-xl flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] text-white flex items-center justify-center font-black text-3xl shadow-lg mb-3">
                  ✦
                </div>
                <span className="text-base font-black text-[#1E1B2E] tracking-tight block">
                  Verified AI Specialist
                </span>
                <span className="text-xs text-[#6B6785] font-bold mt-1 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Shareable on LinkedIn & Resumes
                </span>
              </div>

              {/* Gold Ribbon Badge */}
              <div className="relative z-10 w-full pt-3">
                <button
                  type="button"
                  className="w-full py-3 rounded-2xl bg-[#8B7FE8] text-white text-xs font-extrabold shadow-md hover:bg-[#786BD6] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Certificates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              <span className="text-xs font-bold text-[#6B6785]">
                Recognized by leading tech employers worldwide
              </span>
            </div>
          </BentoCard>

          {/* ==================================================
              CARD 3: MEDIUM ILLUSTRATION CARD (Learn by Building)
             ================================================== */}
          <BentoCard className="min-h-[440px] bg-gradient-to-br from-white via-[#EDF9F5]/40 to-[#FCFBFF]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#B8E8D8] text-[#1E1B2E] border border-[#9DD9C5] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                Hands-On Projects
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
                Learn by Building
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6785] font-medium leading-relaxed mb-4">
                Build real-world projects using the most popular AI platforms.
              </p>
            </div>

            {/* LARGE FLOATING 3D GLASS CARDS SHOWCASE (60% Area) */}
            <div className="relative w-full h-52 p-4 rounded-3xl bg-gradient-to-b from-[#FCFBFF] to-[#EDF9F5] border border-[#EAE6FE] shadow-inner overflow-hidden flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2.5 w-full">
                {[
                  { name: "ChatGPT", col: "bg-[#10B981]/20 border-[#10B981]/40 text-[#0E8566]" },
                  { name: "Claude", col: "bg-[#F59E0B]/20 border-[#F59E0B]/40 text-[#A6570A]" },
                  { name: "Gemini", col: "bg-[#3B82F6]/20 border-[#3B82F6]/40 text-[#1D4ED8]" },
                  { name: "Midjourney", col: "bg-[#9333EA]/20 border-[#9333EA]/40 text-[#7E22CE]" },
                  { name: "Cursor", col: "bg-[#38BDF8]/20 border-[#38BDF8]/40 text-[#0284C7]" },
                  { name: "Lovable", col: "bg-[#F43F5E]/20 border-[#F43F5E]/40 text-[#E11D48]" },
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
              CARD 4: MEDIUM ILLUSTRATION CARD (Learn Anywhere)
             ================================================== */}
          <BentoCard className="min-h-[440px] bg-gradient-to-br from-white via-[#F3F0FE]/60 to-[#FCFBFF]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#D8D2FA] text-[#4B3FBF] border border-[#C4BDFA] mb-4">
                <Smartphone className="w-3.5 h-3.5 text-[#8B7FE8]" />
                Multi-Device Access
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
                Learn Anywhere
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6785] font-medium leading-relaxed mb-4">
                Watch videos, read notes, complete quizzes, and listen to lessons from any device.
              </p>
            </div>

            {/* LARGE DEVICE SHOWCASE ILLUSTRATION (60% Area) */}
            <div className="relative w-full h-52 p-5 rounded-3xl bg-gradient-to-b from-[#FCFBFF] to-[#F3F0FE] border border-[#EAE6FE] shadow-inner overflow-hidden flex items-center justify-around text-[#8B7FE8]">
              <div className="flex flex-col items-center group/dev">
                <Laptop className="w-12 h-12 drop-shadow-md transition-transform group-hover/dev:scale-110" />
                <span className="text-xs font-extrabold text-[#1E1B2E] mt-1.5">Desktop</span>
              </div>
              <div className="flex flex-col items-center group/dev">
                <Tablet className="w-10 h-10 drop-shadow-md transition-transform group-hover/dev:scale-110" />
                <span className="text-xs font-extrabold text-[#1E1B2E] mt-1.5">Tablet</span>
              </div>
              <div className="flex flex-col items-center group/dev">
                <Smartphone className="w-9 h-9 drop-shadow-md transition-transform group-hover/dev:scale-110" />
                <span className="text-xs font-extrabold text-[#1E1B2E] mt-1.5">Mobile</span>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
