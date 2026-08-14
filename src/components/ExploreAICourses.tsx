"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Star,
  Clock,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import Link from "next/link";
import { AICourse, COURSES } from "@/data/courses";

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

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        alpha: Math.random() * 0.4 + 0.2,
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

// 3D Glossy Hero Artwork Header (Apple/OpenAI Product Shot Quality)
function CourseVisualHeader({ course }: { course: AICourse }) {
  const Logo = course.LogoComponent;
  return (
    <div className={`relative h-48 w-full rounded-t-[28px] overflow-hidden bg-gradient-to-b ${course.gradient} flex items-center justify-center p-6 border-b border-[#EAE6FE]`}>
      {/* Soft Studio Ambient Lighting Blobs */}
      <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/50 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#8B7FE8]/25 blur-2xl pointer-events-none" />

      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E1B2E_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05] pointer-events-none" />

      {/* 3D Floor Shadow under the Floating Glossy Tile */}
      <div
        className="absolute bottom-6 w-24 h-4 rounded-full bg-black/20 blur-md pointer-events-none transition-transform duration-300 group-hover:scale-90 opacity-70"
      />

      {/* PREMIUM 3D GLOSSY CUBE TILE SHOWCASING OFFICIAL LOGO */}
      <div
        className="relative z-10 w-24 h-24 sm:w-26 sm:h-26 rounded-[24px] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105 select-none"
        style={{
          background: course.tileBg,
          boxShadow: `${course.tileShadow}, inset 0 2px 5px rgba(255, 255, 255, 0.7), inset 0 -3px 6px rgba(0, 0, 0, 0.25)`,
          borderTop: "2px solid rgba(255, 255, 255, 0.65)",
          borderLeft: "2px solid rgba(255, 255, 255, 0.65)",
          borderBottom: "2px solid rgba(0, 0, 0, 0.25)",
          borderRight: "2px solid rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Specular Top-Left Glass Reflection Overlay */}
        <div
          className="absolute inset-0 rounded-[24px] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
          }}
        />

        {/* Centered Official Logo */}
        <div className="relative z-10 drop-shadow-md">
          <Logo className="w-12 h-12 sm:w-13 sm:h-13" />
        </div>
      </div>

      {/* Top Left Pink Accent Badge */}
      <div className="absolute top-3.5 left-3.5 z-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC] shadow-sm">
          <Sparkles className="w-3 h-3 text-[#8B7FE8]" />
          {course.badge}
        </span>
      </div>

      {/* Top Right Duration Pill */}
      <div className="absolute top-3.5 right-3.5 z-20">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#1E1B2E] backdrop-blur-md border border-[#EAE6FE]">
          <Clock className="w-3 h-3 text-[#8B7FE8]" />
          {course.duration}
        </span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SINGLE COURSE CARD COMPONENT
// ----------------------------------------------------
function CourseCard({ course }: { course: AICourse }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative shrink-0 select-none group transition-all duration-300 ease-out"
      style={{
        width: "340px",
        height: "480px",
      }}
    >
      {/* Card Container */}
      <div
        className="w-full h-full rounded-[30px] bg-white/95 border border-[#EAE6FE] backdrop-blur-xl flex flex-col justify-between overflow-hidden relative transition-all duration-300 ease-out"
        style={{
          transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
          boxShadow: isHovered
            ? "0 18px 40px rgba(139, 127, 232, 0.16)"
            : "0 8px 30px rgba(139, 127, 232, 0.08)",
        }}
      >
        {/* Accent Border Glow on Hover */}
        <div
          className={`absolute inset-0 rounded-[30px] pointer-events-none transition-opacity duration-300 border-2 border-[#8B7FE8]/50 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* 3D Glossy Hero Artwork Header */}
        <CourseVisualHeader course={course} />

        {/* Card Body Info */}
        <div className="p-6 flex-1 flex flex-col justify-between relative z-20">
          <div>
            {/* Title & Rating */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight group-hover:text-[#8B7FE8] transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center gap-1 bg-[#F3F0FE] border border-[#EAE6FE] px-2.5 py-0.5 rounded-full text-xs font-bold text-[#1E1B2E]">
                <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
                <span>{course.rating}</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs text-[#6B6785] leading-relaxed mb-4 line-clamp-2 font-medium">
              {course.description}
            </p>

            {/* 3 Technology Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#B8E8D8] text-[#1E1B2E] border border-[#9DD9C5]">
                {course.tags[0]}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#D8D2FA] text-[#4B3FBF] border border-[#C4BDFA]">
                {course.tags[1]}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFF0F5] text-[#C0336A] border border-[#FFC9DE]">
                {course.tags[2]}
              </span>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-3 border-t border-[#EAE6FE] flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6B6785] uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#8B7FE8]" />
              Interactive Module
            </span>

            <Link
              href={`/courses/${course.id.replace("course-", "")}`}
              className="relative group/btn inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all duration-300 active:scale-95"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN COMPONENT: ExploreAICourses
// ----------------------------------------------------
export default function ExploreAICourses() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  // Duplicated 9 courses internally for perfect infinite horizontal loop
  const coursesList = COURSES;
  const doubledCourses = [...coursesList, ...coursesList, ...coursesList];

  // Drag & Wheel & Velocity State
  const [isPaused, setIsPaused] = useState(false);
  const scrollPosRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const velocityRef = useRef(0);

  // Single card item width (340px card + 28px gap = 368px)
  const ITEM_WIDTH = 368;
  const SINGLE_SET_WIDTH = coursesList.length * ITEM_WIDTH; // 9 * 368 = 3312px

  // Auto Scroll Engine Loop
  const updatePosition = useCallback(() => {
    let newPos = scrollPosRef.current;

    // Apply auto scroll speed if not paused or dragging
    if (!isPaused && !isDraggingRef.current) {
      newPos += 1.2 + velocityRef.current;
    } else {
      newPos += velocityRef.current;
    }

    // Apply inertia decay
    velocityRef.current *= 0.92;
    if (Math.abs(velocityRef.current) < 0.01) velocityRef.current = 0;

    // Seamless infinite looping wrap
    if (newPos >= SINGLE_SET_WIDTH) {
      newPos %= SINGLE_SET_WIDTH;
    } else if (newPos < 0) {
      newPos = SINGLE_SET_WIDTH + (newPos % SINGLE_SET_WIDTH);
    }

    scrollPosRef.current = newPos;

    // Apply GSAP translation to carousel track
    if (carouselTrackRef.current) {
      gsap.set(carouselTrackRef.current, {
        x: -newPos,
      });
    }

    // Update bottom progress bar (0% to 100%)
    if (progressFillRef.current) {
      const progressPercent = (newPos / SINGLE_SET_WIDTH) * 100;
      progressFillRef.current.style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
    }

    animFrameRef.current = requestAnimationFrame(updatePosition);
  }, [isPaused, SINGLE_SET_WIDTH]);

  // Start Animation Loop on Mount
  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(updatePosition);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updatePosition]);

  // GSAP ScrollTrigger Entrance Reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".explore-courses-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      gsap.from(".explore-courses-carousel", {
        opacity: 0,
        y: 60,
        duration: 1.0,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse Wheel Handler for Horizontal Scrolling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY || e.deltaX;
    velocityRef.current += delta * 0.15;
  };

  // Pointer / Drag Event Handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragStartScrollRef.current = scrollPosRef.current;
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = startXRef.current - e.clientX;
    scrollPosRef.current = dragStartScrollRef.current + deltaX;
    velocityRef.current = deltaX * 0.1;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <section
      ref={sectionRef}
      id="explore"
      className="relative w-full bg-[#FCFBFF] text-[#1E1B2E] py-20 overflow-hidden select-none"
    >
      {/* Background Animated Floating Particles Canvas */}
      <FloatingParticlesCanvas />

      {/* Ambient Moving Radial Glow Blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D8D2FA]/30 blur-[100px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FFC9DE]/30 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#B8E8D8]/20 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="explore-courses-header flex flex-col items-center text-center mb-12">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F0FE] border border-[#EAE6FE] text-xs font-bold text-[#8B7FE8] mb-4 shadow-soft-sm">
            <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
            <span>Interactive Learning Directory</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1E1B2E] mb-4">
            Explore <span className="text-[#8B7FE8]">AI Courses</span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg text-[#6B6785] font-medium leading-relaxed">
            Learn the world&apos;s most powerful AI tools through beautifully designed interactive courses.
          </p>
        </div>

        {/* INFINITE CAROUSEL SCROLL CONTAINER */}
        <div
          className="explore-courses-carousel relative w-full overflow-hidden cursor-grab active:cursor-grabbing py-6"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)"
          }}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left & Right Gradient Fade Mask Overlays (Removed to fix white cast in dark mode, handled by mask-image above) */}

          {/* Horizontal Track */}
          <div
            ref={carouselTrackRef}
            className="flex items-center gap-7 w-max will-change-transform"
          >
            {doubledCourses.map((course, idx) => (
              <CourseCard key={`${course.id}-${idx}`} course={course} />
            ))}
          </div>
        </div>

        {/* BOTTOM PROGRESS BAR */}
        <div className="mt-8 max-w-xl mx-auto flex flex-col items-center gap-2">
          <div className="w-full h-2 bg-[#EAE6FE] rounded-full overflow-hidden relative border border-[#EAE6FE]">
            <div
              ref={progressFillRef}
              className="h-full rounded-full bg-gradient-to-r from-[#8B7FE8] via-[#B8E8D8] to-[#FFC9DE] transition-all duration-75"
              style={{ width: "0%" }}
            />
          </div>
          <span className="text-[11px] font-semibold text-[#6B6785] tracking-wider uppercase">
            Scroll or drag to explore 9 courses
          </span>
        </div>
      </div>
    </section>
  );
}
