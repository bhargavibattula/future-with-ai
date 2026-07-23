"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, Lock, Play, Trophy, Zap, Sparkles } from "lucide-react";
import { CourseModule } from "@/data/coursePathData";
import { motion } from "framer-motion";
import gsap from "gsap";

interface CoursePathRoadmapProps {
  modules: CourseModule[];
  onSelectModule: (module: CourseModule) => void;
}

export default function CoursePathRoadmap({
  modules,
  onSelectModule,
}: CoursePathRoadmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // 1. Modules fade up with stagger and subtle bounce
      gsap.fromTo(
        ".roadmap-module-node",
        { opacity: 0, scale: 0.8, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.6)",
        }
      );

      // 2. SVG Paths draw themselves
      gsap.fromTo(
        ".connector-path",
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-2 select-none">
      {/* RIGHT COLUMN CANVAS CONTAINER (Generous Whitespace, 70% Column) */}
      <div className="relative w-full overflow-x-auto pb-8">
        {/* DESKTOP CANVAS (ViewBox 700 x 840) */}
        <div className="hidden md:block relative w-[700px] h-[840px] mx-auto">
          {/* 6PX SOLID ROUNDED SVG CONNECTOR PATHS */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            viewBox="0 0 700 840"
          >
            <defs>
              {/* Flowing Active Gradient for Current Connector */}
              <linearGradient id="activeFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#74D99F" />
                <stop offset="50%" stopColor="#8B7FE8" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>

              {/* Subtle Glow Filter */}
              <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/*
              GEOMETRY MATH (700 x 840 Canvas):
              Tile size = 78px x 78px (Radius = 39px)
              Col 1 Center X = 160 (Left Edge = 121, Right Edge = 199)
              Col 2 Center X = 540 (Left Edge = 501, Right Edge = 579)

              Row 1 Y = 70  (Top = 31,  Bottom = 109) -> Mod 1 (Col 1)
              Row 2 Y = 210 (Top = 171, Bottom = 249) -> Mod 2 (Col 2)
              Row 3 Y = 350 (Top = 311, Bottom = 389) -> Mod 3 (Col 1)
              Row 4 Y = 490 (Top = 451, Bottom = 529) -> Mod 4 (Col 2)
              Row 5 Y = 630 (Top = 591, Bottom = 669) -> Mod 5 (Col 1)
              Row 6 Y = 770 (Top = 731, Bottom = 809) -> Mod 6 (Col 2 - Certificate)
            */}

            {/* Connector 1: Mod 1 Right (199, 70) -> Mod 2 Top (540, 171) [COMPLETED: Mint #74D99F] */}
            <path
              d="M 199 70 L 515 70 Q 540 70 540 95 L 540 171"
              fill="none"
              stroke="#74D99F"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="connector-path"
            />

            {/* Connector 2: Mod 2 Left (501, 210) -> Mod 3 Top (160, 311) [CURRENT: Animated Lavender Gradient] */}
            <path
              d="M 501 210 L 185 210 Q 160 210 160 235 L 160 311"
              fill="none"
              stroke="url(#activeFlowGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="connector-path"
              filter="url(#pathGlow)"
            />

            {/* Connector 3: Mod 3 Right (199, 350) -> Mod 4 Top (540, 451) [UPCOMING: Light Lavender #E9E2FF] */}
            <path
              d="M 199 350 L 515 350 Q 540 350 540 375 L 540 451"
              fill="none"
              stroke="#E9E2FF"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="connector-path"
            />

            {/* Connector 4: Mod 4 Left (501, 490) -> Mod 5 Top (160, 591) [UPCOMING: Light Lavender #E9E2FF] */}
            <path
              d="M 501 490 L 185 490 Q 160 490 160 515 L 160 591"
              fill="none"
              stroke="#E9E2FF"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="connector-path"
            />

            {/* Connector 5: Mod 5 Right (199, 630) -> Mod 6 Top (540, 731) [UPCOMING: Light Lavender #E9E2FF] */}
            <path
              d="M 199 630 L 515 630 Q 540 630 540 655 L 540 731"
              fill="none"
              stroke="#E9E2FF"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="connector-path"
            />
          </svg>

          {/* 6 MODULE SQUARE TILES + TITLE UNDERNEATH */}
          {modules.map((mod, idx) => {
            const positions = [
              { left: 160, top: 70 },  // Mod 1 (Top Left)
              { left: 540, top: 210 }, // Mod 2 (Top Right)
              { left: 160, top: 350 }, // Mod 3 (Middle Left)
              { left: 540, top: 490 }, // Mod 4 (Middle Right)
              { left: 160, top: 630 }, // Mod 5 (Bottom Left)
              { left: 540, top: 770 }, // Mod 6 (Bottom Right - Certificate)
            ];

            const pos = positions[idx] || positions[0];

            return (
              <div
                key={mod.id}
                style={{
                  left: `${pos.left}px`,
                  top: `${pos.top}px`,
                }}
                className="roadmap-module-node absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center cursor-pointer group"
                onClick={() => onSelectModule(mod)}
                onMouseEnter={() => setHoveredModuleId(mod.id)}
                onMouseLeave={() => setHoveredModuleId(null)}
              >
                {/* 78px Rounded Square Tile */}
                <SquareModuleTile
                  module={mod}
                  isHovered={hoveredModuleId === mod.id}
                />

                {/* Module Title Directly Below Square (No descriptions, no cards) */}
                <div className="mt-2.5 text-center max-w-[150px] select-none">
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#1E1B2E] tracking-tight group-hover:text-[#8B7FE8] transition-colors leading-tight">
                    {mod.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE RESPONSIVE LAYOUT (< md) */}
        <div className="md:hidden relative flex flex-col items-center gap-12 w-full py-6">
          {/* Vertical Connecting Line */}
          <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-[#74D99F] via-[#8B7FE8] to-[#E9E2FF] rounded-full z-0" />

          {modules.map((mod) => (
            <div
              key={mod.id}
              className="roadmap-module-node relative z-10 flex flex-col items-center cursor-pointer group"
              onClick={() => onSelectModule(mod)}
            >
              <SquareModuleTile module={mod} isHovered={false} />

              <div className="mt-2.5 text-center max-w-[170px]">
                <h4 className="text-sm font-extrabold text-[#1E1B2E] tracking-tight group-hover:text-[#8B7FE8] transition-colors leading-tight">
                  {mod.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// SQUARE MODULE TILE (Exact 78px size & states)
// ----------------------------------------------------
function SquareModuleTile({
  module,
  isHovered,
}: {
  module: CourseModule;
  isHovered: boolean;
}) {
  const isCompleted = module.status === "completed";
  const isCurrent = module.status === "current";
  const isLocked = module.status === "locked";
  const isAssessment = module.number === 6;

  // Exact state styling matching reference:
  // Completed: Soft mint green gradient + white check icon
  // Current: Lavender gradient + white play icon + pulse glow
  // Locked: White background + lavender border + lock icon
  // Assessment: White background + purple trophy icon
  let tileStyle = "";
  if (isCompleted) {
    tileStyle =
      "bg-gradient-to-br from-[#74D99F] to-[#52C582] text-white shadow-[0_10px_25px_rgba(116,217,159,0.35)] border-2 border-white";
  } else if (isCurrent) {
    tileStyle =
      "bg-gradient-to-br from-[#8B7FE8] to-[#786BD6] text-white shadow-[0_12px_32px_rgba(139,127,232,0.45)] border-2 border-white animate-pulse";
  } else if (isAssessment) {
    tileStyle =
      "bg-white border-2 border-[#8B7FE8]/60 text-[#8B7FE8] shadow-soft-sm";
  } else {
    tileStyle =
      "bg-white border-2 border-[#E8E3FF] text-[#8B7FE8] shadow-soft-sm";
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className={`relative w-[78px] h-[78px] rounded-[22px] flex items-center justify-center transition-all duration-300 ${tileStyle}`}
    >
      {/* Subtle Specular Reflection */}
      <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/25 via-transparent to-black/10 pointer-events-none" />

      {/* CENTER ICON */}
      <div className="relative z-10 flex items-center justify-center">
        {isCompleted && (
          <Check className="w-8 h-8 stroke-[3.5] text-white drop-shadow-sm" />
        )}

        {isCurrent && (
          <Play className="w-7 h-7 fill-white text-white drop-shadow-sm ml-0.5" />
        )}

        {isLocked && !isAssessment && (
          <Lock className="w-6 h-6 text-[#8B7FE8]/70" />
        )}

        {isAssessment && (
          <Trophy className="w-7 h-7 text-[#8B7FE8]" />
        )}
      </div>

      {/* Current Zap Indicator Badge */}
      {isCurrent && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#74D99F] border-2 border-white flex items-center justify-center text-white shadow-sm z-20">
          <Zap className="w-3 h-3 fill-white" />
        </span>
      )}
    </motion.div>
  );
}
