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

// ----------------------------------------------------
// CUSTOM AI BRAND LOGOS (Distinct for each of the 9 cards)
// ----------------------------------------------------
function ChatGPTLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7947.7947 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.535-3.0137l.142.0852 4.783 2.7582a.771.771 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.342 9.712a4.4755 4.4755 0 0 1 2.3415-1.9729V13.3a.7947.7947 0 0 0 .388.6813l5.8428 3.3685-2.02 1.1686a.0757.0757 0 0 1-.071 0l-4.8303-2.7913A4.4944 4.4944 0 0 1 2.342 9.712zm16.5963 3.8558-5.8428-3.3733 2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6767 8.1042v-5.6773a.79.79 0 0 0-.4018-.6811zm2.0107-3.0231l-.142-.0852-4.7735-2.7582a.771.771 0 0 0-.7806 0l-5.8428 3.3685V8.7356a.0804.0804 0 0 1 .0332-.0615l4.8303-2.7913a4.4992 4.4992 0 0 1 6.6754 4.6601zm-10.5422-5.435a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7947.7947 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V9.6109a4.504 4.504 0 0 1 4.4945-4.4944z"
        fill="#10A37F"
      />
    </svg>
  );
}

function ClaudeLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.827 3.518a1.5 1.5 0 0 0-2.654 0L9.42 6.84 5.753 5.405a1.5 1.5 0 0 0-1.928 1.928l1.435 3.667-3.322 1.753a1.5 1.5 0 0 0 0 2.654l3.322 1.753-1.435 3.667a1.5 1.5 0 0 0 1.928 1.928l3.667-1.435 1.753 3.322a1.5 1.5 0 0 0 2.654 0l1.753-3.322 3.667 1.435a1.5 1.5 0 0 0 1.928-1.928l-1.435-3.667 3.322-1.753a1.5 1.5 0 0 0 0-2.654l-3.322-1.753 1.435-3.667a1.5 1.5 0 0 0-1.928-1.928l-3.667 1.435-1.753-3.322z"
        fill="#D97706"
      />
    </svg>
  );
}

function GeminiLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
        fill="url(#geminiGradient)"
      />
      <defs>
        <linearGradient id="geminiGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1A73E8" />
          <stop offset="0.5" stopColor="#8AB4F8" />
          <stop offset="1" stopColor="#E8EAED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MidjourneyLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 17.5L8.5 7L13 13.5L16.5 9.5L21 17.5H3Z"
        fill="url(#midjourneyGradient)"
        stroke="#9333EA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.5" cy="6.5" r="2.5" fill="#EC4899" />
      <defs>
        <linearGradient id="midjourneyGradient" x1="3" y1="7" x2="21" y2="17.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9333EA" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function KlingLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="13" height="14" rx="3" fill="#06B6D4" />
      <polygon points="15,9 22,5 22,19 15,15" fill="#0284C7" />
    </svg>
  );
}

function CanvaLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="url(#canvaGradient)" />
      <path
        d="M15 9C14.2 8.2 13.1 7.8 11.8 7.8C9.2 7.8 7.2 9.8 7.2 12.5C7.2 15.2 9.2 17.2 11.8 17.2C13.2 17.2 14.3 16.7 15.2 15.8"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="canvaGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CursorLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5 3.5L19.5 12L12.5 14.5L9.5 20.5L4.5 3.5Z"
        fill="#38BDF8"
        stroke="#0284C7"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LovableLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#lovableGradient)"
      />
      <defs>
        <linearGradient id="lovableGradient" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43F5E" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function OmniLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#8B7FE8" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="12" cy="12" r="4" fill="#6366F1" />
    </svg>
  );
}

// ----------------------------------------------------
// COURSE DATA (Exact 9 courses with their distinct AI logos)
// ----------------------------------------------------
export interface AICourse {
  id: string;
  title: string;
  description: string;
  tags: [string, string, string];
  badge: string;
  rating: number;
  duration: string;
  LogoComponent: React.ElementType;
  gradient: string;
  accentColor: string;
  glowColor: string;
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
    LogoComponent: ChatGPTLogo,
    gradient: "from-[#8B7FE8] via-[#D8D2FA] to-[#B8E8D8]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(139, 127, 232, 0.25)",
  },
  {
    id: "course-claude",
    title: "Claude",
    description: "Advanced reasoning, writing and large project workflows.",
    tags: ["Reasoning", "Writing", "Projects"],
    badge: "Top Rated",
    rating: 4.95,
    duration: "4.0 hrs",
    LogoComponent: ClaudeLogo,
    gradient: "from-[#FFC9DE] via-[#FFF0F5] to-[#D8D2FA]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(255, 201, 222, 0.3)",
  },
  {
    id: "course-gemini",
    title: "Gemini",
    description: "Google's multimodal AI assistant for developers.",
    tags: ["Workspace", "Research", "Coding"],
    badge: "New",
    rating: 4.88,
    duration: "3.0 hrs",
    LogoComponent: GeminiLogo,
    gradient: "from-[#B8E8D8] via-[#EDF9F5] to-[#D8D2FA]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(184, 232, 216, 0.3)",
  },
  {
    id: "course-midjourney",
    title: "Midjourney",
    description: "Create stunning AI illustrations and concept art.",
    tags: ["Art", "Illustrations", "Design"],
    badge: "Trending",
    rating: 4.92,
    duration: "4.5 hrs",
    LogoComponent: MidjourneyLogo,
    gradient: "from-[#D8D2FA] via-[#F3F0FE] to-[#FFC9DE]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(139, 127, 232, 0.25)",
  },
  {
    id: "course-kling",
    title: "Kling AI",
    description: "Generate cinematic AI videos from prompts.",
    tags: ["Video", "Animation", "Creator"],
    badge: "Featured",
    rating: 4.85,
    duration: "3.8 hrs",
    LogoComponent: KlingLogo,
    gradient: "from-[#B8E8D8] via-[#D8D2FA] to-[#FFC9DE]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(184, 232, 216, 0.3)",
  },
  {
    id: "course-canva",
    title: "Canva AI",
    description: "Create presentations, graphics and social content.",
    tags: ["Design", "Branding", "Templates"],
    badge: "Essentials",
    rating: 4.87,
    duration: "2.5 hrs",
    LogoComponent: CanvaLogo,
    gradient: "from-[#FFC9DE] via-[#D8D2FA] to-[#EDF9F5]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(255, 201, 222, 0.3)",
  },
  {
    id: "course-cursor",
    title: "Cursor",
    description: "AI-powered IDE for faster software development.",
    tags: ["Coding", "Debugging", "Refactoring"],
    badge: "Pro Choice",
    rating: 4.98,
    duration: "5.0 hrs",
    LogoComponent: CursorLogo,
    gradient: "from-[#8B7FE8] via-[#D8D2FA] to-[#EDF9F5]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(139, 127, 232, 0.25)",
  },
  {
    id: "course-lovable",
    title: "Lovable",
    description: "Build beautiful full-stack web applications using AI.",
    tags: ["Frontend", "Backend", "Apps"],
    badge: "Full Stack",
    rating: 4.91,
    duration: "4.2 hrs",
    LogoComponent: LovableLogo,
    gradient: "from-[#FFC9DE] via-[#B8E8D8] to-[#D8D2FA]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(255, 201, 222, 0.3)",
  },
  {
    id: "course-omni",
    title: "Omni",
    description: "Unified AI workspace with multiple models.",
    tags: ["Agents", "Workflow", "Automation"],
    badge: "Enterprise",
    rating: 4.89,
    duration: "3.2 hrs",
    LogoComponent: OmniLogo,
    gradient: "from-[#D8D2FA] via-[#B8E8D8] to-[#F3F0FE]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(139, 127, 232, 0.25)",
  },
];

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

// Course Card Visual Header with Real AI Brand Logo
function CourseVisualHeader({ course }: { course: AICourse }) {
  const Logo = course.LogoComponent;
  return (
    <div className={`relative h-44 w-full rounded-t-[28px] overflow-hidden bg-gradient-to-br ${course.gradient} flex items-center justify-center p-6 border-b border-[#EAE6FE]`}>
      {/* Subtle Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E1B2E_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.06] pointer-events-none" />

      {/* Ambient Glowing Blobs */}
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/40 blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#8B7FE8]/20 blur-xl pointer-events-none" />

      {/* Distinct AI Brand Logo Tile */}
      <div
        className="relative z-10 w-20 h-20 rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105"
        style={{ boxShadow: `0 10px 25px ${course.glowColor}` }}
      >
        <Logo className="w-11 h-11" />
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
// SINGLE COURSE CARD COMPONENT (Refined, Subtle Hover Lift)
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
      {/* Refined Card Container: Smooth Subtle -4px Lift on Hover (No Heavy 3D Tilt) */}
      <div
        className="w-full h-full rounded-[30px] bg-white/95 border border-[#EAE6FE] backdrop-blur-xl flex flex-col justify-between overflow-hidden relative transition-all duration-300 ease-out"
        style={{
          transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
          boxShadow: isHovered
            ? "0 18px 40px rgba(139, 127, 232, 0.16)"
            : "0 8px 30px rgba(139, 127, 232, 0.08)",
        }}
      >
        {/* Subtle Accent Border Glow on Hover */}
        <div
          className={`absolute inset-0 rounded-[30px] pointer-events-none transition-opacity duration-300 border-2 border-[#8B7FE8]/50 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Card Header Visual with Authentic AI Logo */}
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

            <button
              type="button"
              className="relative group/btn inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all duration-300 active:scale-95"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
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
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left & Right Gradient Fade Mask Overlays */}
          <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FCFBFF] to-transparent z-30" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FCFBFF] to-transparent z-30" />

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
