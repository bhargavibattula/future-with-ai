"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Code,
  PenTool,
  Cpu,
  Layers,
  Palette,
  Video,
  Layout,
  Terminal,
  Zap,
  Globe,
  Star,
  Clock,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------
// COURSE DATA (Exact 9 courses in exact order)
// ----------------------------------------------------
export interface AICourse {
  id: string;
  title: string;
  description: string;
  tags: [string, string, string];
  badge: string;
  rating: number;
  duration: string;
  icon: React.ElementType;
  gradient: string;
  accentColor: string;
  glowColor: string;
  imageVisual: string; // SVG visual style identifier
}

export const COURSES: AICourse[] = [
    {
      id: "course-chatgpt",
      title: "ChatGPT",
      description: "Complete toolkit for productivity, coding and automation.",
      tags: ["Prompting", "Coding", "Automation"],
      badge: "Most Popular",
      rating: 4.9,
      duration: "3.5 hrs",
      icon: Cpu,
      gradient: "from-[#10A37F] via-[#0D8A6A] to-[#085E48]",
      accentColor: "#10A37F",
      glowColor: "rgba(16, 163, 127, 0.35)",
      imageVisual: "chatgpt",
    },
    {
      id: "course-claude",
      title: "Claude",
      description: "Advanced reasoning, writing and large project workflows.",
      tags: ["Reasoning", "Writing", "Projects"],
      badge: "Top Rated",
      rating: 4.95,
      duration: "4.0 hrs",
      icon: PenTool,
      gradient: "from-[#D97706] via-[#B45309] to-[#78350F]",
      accentColor: "#D97706",
      glowColor: "rgba(217, 119, 6, 0.35)",
      imageVisual: "claude",
    },
    {
      id: "course-gemini",
      title: "Gemini",
      description: "Google's multimodal AI assistant for developers.",
      tags: ["Workspace", "Research", "Coding"],
      badge: "New",
      rating: 4.88,
      duration: "3.0 hrs",
      icon: Globe,
      gradient: "from-[#1A73E8] via-[#4285F4] to-[#8AB4F8]",
      accentColor: "#4285F4",
      glowColor: "rgba(66, 133, 244, 0.35)",
      imageVisual: "gemini",
    },
    {
      id: "course-midjourney",
      title: "Midjourney",
      description: "Create stunning AI illustrations and concept art.",
      tags: ["Art", "Illustrations", "Design"],
      badge: "Trending",
      rating: 4.92,
      duration: "4.5 hrs",
      icon: Palette,
      gradient: "from-[#9333EA] via-[#C084FC] to-[#EC4899]",
      accentColor: "#9333EA",
      glowColor: "rgba(147, 51, 234, 0.35)",
      imageVisual: "midjourney",
    },
    {
      id: "course-kling",
      title: "Kling AI",
      description: "Generate cinematic AI videos from prompts.",
      tags: ["Video", "Animation", "Creator"],
      badge: "Featured",
      rating: 4.85,
      duration: "3.8 hrs",
      icon: Video,
      gradient: "from-[#06B6D4] via-[#0284C7] to-[#3B82F6]",
      accentColor: "#06B6D4",
      glowColor: "rgba(6, 182, 212, 0.35)",
      imageVisual: "kling",
    },
    {
      id: "course-canva",
      title: "Canva AI",
      description: "Create presentations, graphics and social content.",
      tags: ["Design", "Branding", "Templates"],
      badge: "Essentials",
      rating: 4.87,
      duration: "2.5 hrs",
      icon: Layout,
      gradient: "from-[#00C4CC] via-[#7D2AE8] to-[#9B51E0]",
      accentColor: "#7D2AE8",
      glowColor: "rgba(125, 42, 232, 0.35)",
      imageVisual: "canva",
    },
    {
      id: "course-cursor",
      title: "Cursor",
      description: "AI-powered IDE for faster software development.",
      tags: ["Coding", "Debugging", "Refactoring"],
      badge: "Pro Choice",
      rating: 4.98,
      duration: "5.0 hrs",
      icon: Terminal,
      gradient: "from-[#38BDF8] via-[#6366F1] to-[#4F46E5]",
      accentColor: "#38BDF8",
      glowColor: "rgba(56, 189, 248, 0.35)",
      imageVisual: "cursor",
    },
    {
      id: "course-lovable",
      title: "Lovable",
      description: "Build beautiful full-stack web applications using AI.",
      tags: ["Frontend", "Backend", "Apps"],
      badge: "Full Stack",
      rating: 4.91,
      duration: "4.2 hrs",
      icon: Code,
      gradient: "from-[#F43F5E] via-[#E11D48] to-[#A855F7]",
      accentColor: "#F43F5E",
      glowColor: "rgba(244, 63, 94, 0.35)",
      imageVisual: "lovable",
    },
    {
      id: "course-omni",
      title: "Omni",
      description: "Unified AI workspace with multiple models.",
      tags: ["Agents", "Workflow", "Automation"],
      badge: "Enterprise",
      rating: 4.89,
      duration: "3.2 hrs",
      icon: Layers,
      gradient: "from-[#8B7FE8] via-[#6366F1] to-[#3B82F6]",
      accentColor: "#8B7FE8",
      glowColor: "rgba(139, 127, 232, 0.35)",
      imageVisual: "omni",
    },
  ];

// ----------------------------------------------------
// REACT BITS COMPONENTS (Spotlight, ShinyText, Badge, Particles)
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

    const colors = ["#8B7FE8", "#D8D2FA", "#38BDF8", "#F43F5E", "#10A37F"];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.2,
        alpha: Math.random() * 0.5 + 0.2,
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
        ctx.shadowBlur = 8;
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

function ShinyText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      className={`inline-block bg-gradient-to-r from-white via-[#D8D2FA] to-white bg-[length:200%_auto] bg-clip-text text-transparent animate-shiny-shimmer ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(110deg, #ffffff 0%, #D8D2FA 45%, #ffffff 55%, #ffffff 100%)",
        backgroundSize: "250% 100%",
        animation: "shinyText 4s linear infinite",
      }}
    >
      {text}
    </span>
  );
}

// Course Card Visual SVG Generator Header
function CourseVisualHeader({ course }: { course: AICourse }) {
  const IconComponent = course.icon;
  return (
    <div className={`relative h-44 w-full rounded-t-[28px] overflow-hidden bg-gradient-to-br ${course.gradient} flex items-center justify-center p-6 border-b border-white/10 group-hover:scale-[1.02] transition-transform duration-500`}>
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      {/* Floating Geometric Orbs */}
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/20 blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-black/30 blur-xl pointer-events-none" />

      {/* Center Icon Badge */}
      <div
        className="relative z-10 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{ boxShadow: `0 10px 30px ${course.glowColor}` }}
      >
        <IconComponent className="w-10 h-10 text-white drop-shadow-md" />
      </div>

      {/* Top Left Badge */}
      <div className="absolute top-3.5 left-3.5 z-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-black/40 text-white border border-white/20 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3 h-3 text-[#D8D2FA]" />
          {course.badge}
        </span>
      </div>

      {/* Top Right Duration */}
      <div className="absolute top-3.5 right-3.5 z-20">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/90 backdrop-blur-md border border-white/15">
          <Clock className="w-3 h-3" />
          {course.duration}
        </span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SINGLE SPOTLIGHT COURSE CARD COMPONENT (3D Tilt + Cursor Spotlight)
// ----------------------------------------------------
function CourseCard({ course }: { course: AICourse }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Calculate 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 14;
    const tiltY = (centerX - x) / 14;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative shrink-0 select-none group transition-all duration-300 ease-out"
      style={{
        width: "340px",
        height: "480px",
        perspective: "1000px",
      }}
    >
      {/* 3D Tilting Card Container */}
      <div
        className="w-full h-full rounded-[30px] bg-[#120F24]/90 border border-white/10 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-2xl relative transition-transform duration-200 ease-out"
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          boxShadow: isHovered
            ? `0 20px 40px ${course.glowColor}, 0 0 0 1px ${course.accentColor}88`
            : "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* Cursor Spotlight Glow Effect */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[30px]"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${course.glowColor}, transparent 80%)`,
            }}
          />
        )}

        {/* Animated Gradient Border Glow on Hover */}
        <div
          className={`absolute inset-0 rounded-[30px] pointer-events-none transition-opacity duration-500 border-2 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ borderColor: course.accentColor }}
        />

        {/* Card Header Illustration */}
        <CourseVisualHeader course={course} />

        {/* Card Body Info */}
        <div className="p-6 flex-1 flex flex-col justify-between relative z-20">
          <div>
            {/* Title & Rating */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-[#D8D2FA] transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-xs font-bold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>{course.rating}</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs text-gray-300/80 leading-relaxed mb-4 line-clamp-2 font-medium">
              {course.description}
            </p>

            {/* 3 Technology Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {course.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 text-[#D8D2FA] border border-white/10 backdrop-blur-sm group-hover:border-[#8B7FE8]/40 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Magnetic CTA Button */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#8B7FE8]" />
              Interactive Module
            </span>

            <button
              type="button"
              className="relative group/btn inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold text-white overflow-hidden shadow-md transition-all duration-300 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${course.accentColor}, #8B7FE8)`,
              }}
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative z-10">Start Learning</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN COMPONENT: ExploreAICourses (Replaces Featured AI Directory)
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
      className="relative w-full bg-[#0A0814] text-white py-20 overflow-hidden select-none"
    >
      {/* Background Animated Floating Particles Canvas */}
      <FloatingParticlesCanvas />

      {/* Ambient Moving Radial Glow Blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-[#8B7FE8]/15 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 w-[600px] h-[600px] rounded-full bg-[#F43F5E]/10 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#38BDF8]/10 blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="explore-courses-header flex flex-col items-center text-center mb-12">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#D8D2FA] mb-4 backdrop-blur-md shadow-inner">
            <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
            <span>Interactive Learning Directory</span>
          </div>

          {/* Title with Shiny Text Shimmer */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            <ShinyText text="Explore AI Courses" />
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg text-gray-300/80 font-medium leading-relaxed">
            Learn the world&apos;s most powerful AI tools through beautifully designed interactive courses.
          </p>
        </div>

        {/* INFINITE CAROUSEL SCROLL CONTAINER */}
        <div
          className="explore-courses-carousel relative w-full overflow-hidden cursor-grab active:cursor-grabbing py-6"
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left & Right Gradient Blur Overlays */}
          <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#0A0814] to-transparent z-30" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#0A0814] to-transparent z-30" />

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
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/5 relative">
            <div
              ref={progressFillRef}
              className="h-full rounded-full bg-gradient-to-r from-[#8B7FE8] via-[#3B82F6] to-[#06B6D4] transition-all duration-75"
              style={{ width: "0%" }}
            />
          </div>
          <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase">
            Scroll or drag to explore 9 courses
          </span>
        </div>
      </div>
    </section>
  );
}
