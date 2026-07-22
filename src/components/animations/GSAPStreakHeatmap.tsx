"use client";

import { useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Flame, Trophy, Calendar, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type TileType = "lesson" | "goal" | "perfect" | "challenge";

interface HeatmapTile {
  id: number;
  dayIndex: number;
  colIndex: number;
  dateStr: string;
  type: TileType;
  activityCount: number;
}

const LEGEND_ITEMS: { type: TileType; label: string; bgClass: string; hexColor: string; description: string }[] = [
  {
    type: "lesson",
    label: "Lesson",
    bgClass: "bg-[#E2DCFE]",
    hexColor: "#E2DCFE",
    description: "Completed standard AI course module or interactive coding exercise",
  },
  {
    type: "goal",
    label: "Goal hit",
    bgClass: "bg-[#B4F1DC]",
    hexColor: "#B4F1DC",
    description: "Reached daily target study minutes or lesson count",
  },
  {
    type: "perfect",
    label: "Perfect day",
    bgClass: "bg-[#7C5CFC]",
    hexColor: "#7C5CFC",
    description: "Mastered all daily goals + zero error quiz attempt",
  },
  {
    type: "challenge",
    label: "Challenge",
    bgClass: "bg-[#FFC9DE]",
    hexColor: "#FFC9DE",
    description: "Finished weekly AI hackathon or capstone project submission",
  },
];

export default function GSAPStreakHeatmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<TileType | "all">("all");
  const [hoveredTile, setHoveredTile] = useState<HeatmapTile | null>(null);

  // Generate 7 rows x 38 columns (266 total days) with a realistic distribution matching the screenshot
  const tilesData = useMemo<HeatmapTile[]>(() => {
    const totalCols = 38;
    const totalRows = 7;
    const items: HeatmapTile[] = [];

    let seed = 42;
    const pseudoRandom = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const now = new Date(2026, 6, 22);

    for (let c = 0; c < totalCols; c++) {
      for (let r = 0; r < totalRows; r++) {
        const id = c * totalRows + r;
        const daysAgo = (totalCols - 1 - c) * 7 + (6 - r);
        const tileDate = new Date(now);
        tileDate.setDate(now.getDate() - daysAgo);

        const rand = pseudoRandom();
        let type: TileType;

        // Realistic clusters matching image
        if (rand < 0.58) {
          type = "lesson";
        } else if (rand < 0.80) {
          type = "goal";
        } else if (rand < 0.92) {
          type = "perfect";
        } else {
          type = "challenge";
        }

        const dateStr = tileDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        items.push({
          id,
          dayIndex: r,
          colIndex: c,
          dateStr,
          type,
          activityCount: type === "perfect" ? 5 : type === "challenge" ? 4 : type === "goal" ? 3 : 2,
        });
      }
    }
    return items;
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Header Reveal
      tl.from(headerRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      // 2. Tile Wave Reveal Animation
      const tileEls = gsap.utils.toArray<HTMLElement>(".streak-tile");
      if (tileEls.length > 0) {
        tl.from(
          tileEls,
          {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            stagger: {
              amount: 1.1,
              grid: [7, 38],
              from: "start",
            },
          },
          "-=0.3"
        );
      }

      // 3. Stats & Legend Reveal
      if (statsRef.current && legendRef.current) {
        tl.from(
          [statsRef.current, legendRef.current],
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    },
    { scope: containerRef }
  );

  // Handle category filter highlighting
  const handleFilterClick = (type: TileType) => {
    const newFilter = activeFilter === type ? "all" : type;
    setActiveFilter(newFilter);

    const tileEls = gsap.utils.toArray<HTMLElement>(".streak-tile");
    tileEls.forEach((el) => {
      const tileType = el.getAttribute("data-type");
      if (newFilter === "all" || tileType === newFilter) {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          opacity: 0.25,
          scale: 0.85,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <section
      ref={containerRef}
      className="w-[#100%] max-w-full bg-[#FCFBFF] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative border-t border-b border-[#F0EBFD]/60"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#D8D2FA]/30 via-[#FFC9DE]/20 to-[#B4F1DC]/30 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section matching screenshot */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          {/* Subheading Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F0FE] text-[#7C5CFC] text-xs font-bold uppercase tracking-widest mb-5 border border-[#E4DCFE]">
            <span className="w-2 h-2 rounded-full bg-[#7C5CFC] animate-pulse" />
            <span>LEARNING JOURNEY</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1B2E] tracking-tight leading-[1.15]">
            Your streak, mapped like <br className="hidden sm:inline" />
            a year of showing up
          </h2>
        </div>

        {/* Heatmap Grid Box */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#EAE6FE] shadow-soft-sm relative">
          {/* Top Quick Stats Bar */}
          <div
            ref={statsRef}
            className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#F0EBFD] text-xs sm:text-sm"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] text-[#FF4D8D] flex items-center justify-center font-bold">
                  <Flame className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="font-extrabold text-[#1E1B2E] text-base leading-none">248 Days</div>
                  <div className="text-[#86829D] text-xs mt-0.5">Current Streak</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-[#F0EBFD]" />

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#EDF9F5] text-[#10B981] flex items-center justify-center font-bold">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-[#1E1B2E] text-base leading-none">1,240 XP</div>
                  <div className="text-[#86829D] text-xs mt-0.5">Yearly Points</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#7C5CFC] bg-[#F4F1FE] px-3 py-1.5 rounded-full border border-[#E5DEFE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Top 3% Learner Consistency</span>
            </div>
          </div>

          {/* Grid Container */}
          <div className="overflow-x-auto pb-4 scrollbar-none">
            <div
              ref={gridRef}
              className="inline-grid grid-rows-7 grid-flow-col gap-1.5 sm:gap-2 min-w-max mx-auto"
            >
              {tilesData.map((tile) => {
                return (
                  <div
                    key={tile.id}
                    data-type={tile.type}
                    onMouseEnter={() => setHoveredTile(tile)}
                    onMouseLeave={() => setHoveredTile(null)}
                    className={`streak-tile w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-[5px] sm:rounded-[6px] transition-all duration-200 cursor-pointer relative hover:scale-130 hover:z-30 hover:shadow-md ${
                      tile.type === "lesson"
                        ? "bg-[#E2DCFE] hover:bg-[#D5CCFE]"
                        : tile.type === "goal"
                        ? "bg-[#B4F1DC] hover:bg-[#9DECCE]"
                        : tile.type === "perfect"
                        ? "bg-[#7C5CFC] hover:bg-[#6A47F9]"
                        : "bg-[#FFC9DE] hover:bg-[#FFB1D1]"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Interactive Tooltip Status on Hover */}
          <div className="h-6 mt-3 text-center transition-all duration-200">
            {hoveredTile ? (
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E1B2E] bg-[#F4F1FE] px-3 py-1 rounded-full border border-[#E5DEFE] animate-fade-in">
                <Calendar className="w-3.5 h-3.5 text-[#7C5CFC]" />
                <span>{hoveredTile.dateStr}</span>
                <span className="text-[#86829D]">•</span>
                <span className="capitalize font-bold text-[#7C5CFC]">
                  {hoveredTile.type === "perfect"
                    ? "Perfect Day"
                    : hoveredTile.type === "goal"
                    ? "Goal Hit"
                    : hoveredTile.type}
                </span>
                <span className="text-[#86829D]">({hoveredTile.activityCount} AI modules completed)</span>
              </span>
            ) : (
              <span className="text-xs text-[#9893B0]">
                Hover over any day tile to inspect learning progress details
              </span>
            )}
          </div>

          {/* Bottom Legend Matching Screenshot Exactly */}
          <div
            ref={legendRef}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 pt-6 border-t border-[#F0EBFD]"
          >
            {LEGEND_ITEMS.map((item) => {
              const isActive = activeFilter === item.type;
              return (
                <button
                  key={item.type}
                  onClick={() => handleFilterClick(item.type)}
                  className={`group flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 py-1 px-2.5 rounded-lg border ${
                    isActive
                      ? "border-[#D8CEFE] bg-[#F7F5FF] text-[#1E1B2E] shadow-2xs"
                      : "border-transparent text-[#6B6785] hover:text-[#1E1B2E]"
                  }`}
                  title={item.description}
                >
                  <span
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[4px] sm:rounded-[5px] transition-transform duration-200 group-hover:scale-110 ${item.bgClass}`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
