"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, Award, Laptop, Smartphone, Tablet, CheckCircle, Compass } from "lucide-react";

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
// BENTO CARD CONTAINER (Explicit High-Contrast Black Text)
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
      className={`bento-card group relative rounded-[36px] bg-white border border-[#D8D2FA] p-7 sm:p-9 overflow-hidden transition-all duration-300 ease-out select-none flex flex-col justify-between ${className}`}
      style={{
        color: "#1E1B2E",
        boxShadow: isHovered
          ? "0 24px 50px rgba(139, 127, 232, 0.22)"
          : "0 12px 36px rgba(139, 127, 232, 0.10)",
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
        className={`absolute inset-0 rounded-[36px] pointer-events-none transition-opacity duration-300 border-2 border-[#8B7FE8] ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}

// ----------------------------------------------------
// HIGH-CONTRAST REBUILT VISUAL STORYTELLING BENTO SECTION
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
      className="relative w-full bg-[#FCFBFF] py-24 sm:py-32 overflow-hidden select-none"
      style={{ color: "#1E1B2E" }}
    >
      {/* Background Animated Floating Particles Canvas */}
      <FloatingParticlesCanvas />

      {/* Soft Ambient Radial Glow Blobs */}
      <div className="pointer-events-none absolute -top-36 right-1/4 w-[550px] h-[550px] rounded-full bg-[#D8D2FA]/40 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-36 left-1/4 w-[550px] h-[550px] rounded-full bg-[#FFC9DE]/40 blur-[130px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-[#B8E8D8]/30 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="storytelling-header flex flex-col items-center text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full text-xs font-black mb-4 shadow-md"
            style={{ backgroundColor: "#8B7FE8", color: "#FFFFFF" }}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Product Showcase</span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ color: "#1E1B2E" }}
          >
            Why Choose{" "}
            <span style={{ color: "#8B7FE8" }}>
              Coursiv AI?
            </span>
          </h2>

          <p
            className="max-w-xl text-base sm:text-lg font-bold leading-relaxed"
            style={{ color: "#4A4665" }}
          >
            Everything you need to master today&apos;s leading AI tools with interactive lessons, hands-on projects, and industry-recognized certificates.
          </p>
        </div>

        {/* HIGH-CONTRAST ORGANIC BENTO GRID */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          
          {/* ==================================================
              CARD 1: HERO CARD (2X Width on Desktop) - 60% Visual
             ================================================== */}
          <BentoCard className="lg:col-span-2 min-h-[540px] bg-white border border-[#D8D2FA]">
            {/* Top Text (40% Area) */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black shadow-sm"
                  style={{ backgroundColor: "#8B7FE8", color: "#FFFFFF" }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  Guided Roadmap
                </span>
                <span
                  className="px-3.5 py-1 rounded-full text-xs font-black shadow-sm"
                  style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}
                >
                  30 Modules
                </span>
              </div>

              <h3
                className="text-3xl sm:text-4xl font-black tracking-tight mb-2"
                style={{ color: "#1E1B2E" }}
              >
                30-Day AI Learning Challenge
              </h3>
              <p
                className="text-sm sm:text-base font-bold max-w-lg"
                style={{ color: "#4A4665" }}
              >
                Follow a guided learning path that helps you master AI tools through bite-sized daily lessons.
              </p>
            </div>

            {/* HUGE 3D ROADMAP ILLUSTRATION (60% Area) */}
            <div
              className="relative w-full h-64 sm:h-72 my-4 rounded-3xl border border-[#D8D2FA] shadow-inner overflow-hidden flex items-center justify-center p-6"
              style={{ backgroundColor: "#F3F0FE" }}
            >
              {/* Soft Ambient Background Blur */}
              <div className="absolute inset-0 bg-[radial-gradient(#8B7FE8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.12] pointer-events-none" />

              {/* 3D Connected Line */}
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-3.5 bg-gradient-to-r from-[#10B981] via-[#3B82F6] to-[#9333EA] rounded-full shadow-md" />

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
                      <div
                        className="absolute -top-11 text-xs font-black px-3.5 py-1.5 rounded-full shadow-xl whitespace-nowrap animate-bounce border-2 border-white"
                        style={{ backgroundColor: "#8B7FE8", color: "#FFFFFF" }}
                      >
                        You are here ✦
                      </div>
                    )}
                    {/* 3D Acrylic Tile */}
                    <div
                      className={`w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br ${item.bg} text-white flex items-center justify-center font-black text-base sm:text-lg border-2 border-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2`}
                      style={{ boxShadow: "0 12px 28px rgba(0,0,0,0.22)" }}
                    >
                      {item.name.substring(0, 2)}
                    </div>
                    <span
                      className="text-xs font-black mt-2 hidden sm:block"
                      style={{ color: "#1E1B2E" }}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex items-center justify-between pt-2">
              <span
                className="text-xs font-extrabold flex items-center gap-1.5"
                style={{ color: "#4A4665" }}
              >
                <Compass className="w-4 h-4 text-[#8B7FE8]" />
                Daily 15-minute interactive lessons
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-md transition-all duration-300 active:scale-95"
              >
                <span>Start Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </BentoCard>

          {/* ==================================================
              CARD 2: TALL FEATURE CARD (Earn Certificates - 580px Height)
             ================================================== */}
          <BentoCard className="lg:row-span-2 min-h-[580px] bg-white border border-[#D8D2FA] justify-between">
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black shadow-sm mb-4"
                style={{ backgroundColor: "#F59E0B", color: "#FFFFFF" }}
              >
                <Award className="w-3.5 h-3.5 text-white" />
                Industry Credential
              </div>

              <h3
                className="text-3xl font-black tracking-tight mb-2"
                style={{ color: "#1E1B2E" }}
              >
                Earn Certificates
              </h3>
              <p
                className="text-sm font-bold leading-relaxed mb-6"
                style={{ color: "#4A4665" }}
              >
                Complete learning paths and earn beautiful certificates that showcase your AI expertise.
              </p>
            </div>

            {/* HUGE HIGH-CONTRAST CERTIFICATE ILLUSTRATION (60% Area) */}
            <div
              className="relative w-full h-80 my-4 p-6 rounded-3xl border border-[#D8D2FA] shadow-inner overflow-hidden flex flex-col justify-between items-center text-center"
              style={{ backgroundColor: "#F3F0FE" }}
            >
              {/* Background ambient lighting */}
              <div className="absolute w-40 h-40 rounded-full bg-[#8B7FE8]/30 blur-3xl pointer-events-none" />

              {/* 3D Certificate Document Graphic */}
              <div className="relative z-10 w-full p-6 rounded-2xl bg-white border-2 border-[#8B7FE8] shadow-2xl flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-2xl text-white flex items-center justify-center font-black text-3xl shadow-lg mb-3"
                  style={{ backgroundColor: "#8B7FE8" }}
                >
                  ✦
                </div>
                <span
                  className="text-lg font-black tracking-tight block"
                  style={{ color: "#1E1B2E" }}
                >
                  Verified AI Specialist
                </span>
                <span
                  className="text-xs font-black mt-1 flex items-center gap-1"
                  style={{ color: "#10B981" }}
                >
                  <CheckCircle className="w-4 h-4 text-[#10B981]" /> Shareable on LinkedIn & Resumes
                </span>
              </div>

              {/* Gold Ribbon Badge */}
              <div className="relative z-10 w-full pt-3">
                <button
                  type="button"
                  className="w-full py-3 rounded-2xl bg-[#8B7FE8] text-white text-xs font-black shadow-md hover:bg-[#786BD6] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Certificates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              <span
                className="text-xs font-extrabold"
                style={{ color: "#4A4665" }}
              >
                Recognized by leading tech employers worldwide
              </span>
            </div>
          </BentoCard>

          {/* ==================================================
              CARD 3: MEDIUM ILLUSTRATION CARD (Learn by Building)
             ================================================== */}
          <BentoCard className="min-h-[440px] bg-white border border-[#D8D2FA]">
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black shadow-sm mb-4"
                style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                Hands-On Projects
              </div>

              <h3
                className="text-2xl sm:text-3xl font-black tracking-tight mb-2"
                style={{ color: "#1E1B2E" }}
              >
                Learn by Building
              </h3>
              <p
                className="text-xs sm:text-sm font-bold leading-relaxed mb-4"
                style={{ color: "#4A4665" }}
              >
                Build real-world projects using the most popular AI platforms.
              </p>
            </div>

            {/* HIGH-CONTRAST SOLID 3D AI TILES SHOWCASE (60% Area) */}
            <div
              className="relative w-full h-52 p-4 rounded-3xl border border-[#D8D2FA] shadow-inner overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "#F3F0FE" }}
            >
              <div className="grid grid-cols-3 gap-3 w-full">
                {[
                  { name: "ChatGPT", bg: "bg-[#10B981]" },
                  { name: "Claude", bg: "bg-[#F59E0B]" },
                  { name: "Gemini", bg: "bg-[#3B82F6]" },
                  { name: "Midjourney", bg: "bg-[#9333EA]" },
                  { name: "Cursor", bg: "bg-[#0284C7]" },
                  { name: "Lovable", bg: "bg-[#F43F5E]" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl text-center text-xs font-black text-white shadow-md border-2 border-white transition-all duration-300 group-hover:scale-105 ${item.bg}`}
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
          <BentoCard className="min-h-[440px] bg-white border border-[#D8D2FA]">
            <div>
              {/* Category Badge - High Contrast Solid Purple with White Text */}
              <div
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black shadow-sm mb-4"
                style={{ backgroundColor: "#8B7FE8", color: "#FFFFFF" }}
              >
                <Smartphone className="w-3.5 h-3.5 text-white" />
                Multi-Device Access
              </div>

              {/* Title - Explicit Dark Color #1E1B2E */}
              <h3
                className="text-2xl sm:text-3xl font-black tracking-tight mb-2"
                style={{ color: "#1E1B2E" }}
              >
                Learn Anywhere
              </h3>
              
              {/* Description - Explicit Dark Slate Color #4A4665 */}
              <p
                className="text-xs sm:text-sm font-bold leading-relaxed mb-4"
                style={{ color: "#4A4665" }}
              >
                Watch videos, read notes, complete quizzes, and listen to lessons from any device.
              </p>
            </div>

            {/* HIGH-CONTRAST DEVICE TILES SHOWCASE (60% Area) */}
            <div
              className="relative w-full h-52 p-5 rounded-3xl border border-[#D8D2FA] shadow-inner overflow-hidden flex items-center justify-around"
              style={{ backgroundColor: "#F3F0FE" }}
            >
              <div className="flex flex-col items-center group/dev">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover/dev:scale-110"
                  style={{ backgroundColor: "#8B7FE8", color: "#FFFFFF" }}
                >
                  <Laptop className="w-7 h-7 text-white" />
                </div>
                <span
                  className="text-sm font-black mt-2 block"
                  style={{ color: "#1E1B2E" }}
                >
                  Desktop
                </span>
              </div>

              <div className="flex flex-col items-center group/dev">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover/dev:scale-110"
                  style={{ backgroundColor: "#8B7FE8", color: "#FFFFFF" }}
                >
                  <Tablet className="w-7 h-7 text-white" />
                </div>
                <span
                  className="text-sm font-black mt-2 block"
                  style={{ color: "#1E1B2E" }}
                >
                  Tablet
                </span>
              </div>

              <div className="flex flex-col items-center group/dev">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover/dev:scale-110"
                  style={{ backgroundColor: "#8B7FE8", color: "#FFFFFF" }}
                >
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <span
                  className="text-sm font-black mt-2 block"
                  style={{ color: "#1E1B2E" }}
                >
                  Mobile
                </span>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
