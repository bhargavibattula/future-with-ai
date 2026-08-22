"use client";

import { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPStreakHeatmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Generate 210 cells (7 rows x 30 columns)
  const cellsData = useMemo(() => {
    const items = [];
    const weights = [0.42, 0.28, 0.2, 0.1];
    
    // Use a fixed seed for consistent hydration
    let seed = 12345;
    const pseudoRandom = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 210; i++) {
      const r = pseudoRandom();
      let lvl = 0, acc = 0;
      for (let l = 0; l < weights.length; l++) {
        acc += weights[l];
        if (r <= acc) {
          lvl = l;
          break;
        }
      }
      items.push({ id: i, lvl });
    }
    return items;
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Section Fade-in for Header
      gsap.from(".journey-head-item", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 85%",
        },
      });

      // Cell Reveal Animation
      gsap.to(".streak-cell", {
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: {
          amount: 1.4,
          from: "start",
          grid: [7, 30],
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-[6vw] relative w-full bg-[#FCFBFF] dark:bg-[#0A0A0A] transition-colors overflow-hidden">
      
      {/* Header */}
      <div ref={headRef} className="max-w-[640px] mx-auto mb-8 sm:mb-12 lg:mb-16 text-center flex flex-col items-center">
        <div className="journey-head-item flex items-center gap-2.5 text-[#6B6785] dark:text-[#8E8A9F] text-xs font-semibold tracking-[0.14em] uppercase mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8B7FE8]" />
          LEARNING JOURNEY
        </div>
        <h2 className="journey-head-item font-['Space_Grotesk'] font-semibold text-2xl sm:text-4xl lg:text-[50px] tracking-[-0.02em] leading-tight text-[#1E1B2E] dark:text-white">
          Your streak, mapped like<br className="hidden sm:block" />
          a year of showing up
        </h2>
      </div>

      {/* Heatmap Responsive Scroll Wrapper */}
      <div className="w-full overflow-x-auto pb-3 scrollbar-none">
        <div 
          ref={gridRef}
          className="min-w-[650px] max-w-[900px] mx-auto grid gap-[5px] grid-cols-[repeat(30,minmax(0,1fr))] px-2"
        >
          {cellsData.map((cell) => {
            const bgClass =
              cell.lvl === 3
                ? "bg-[#8B7FE8]"
                : cell.lvl === 2
                ? "bg-[#D8D2FA] dark:bg-[#584D9B]"
                : cell.lvl === 1
                ? "bg-[#F3F0FE] dark:bg-[#282142]"
                : "bg-[#EAE6FE]/40 dark:bg-white/5";

            return (
              <div
                key={cell.id}
                className={`streak-cell aspect-square rounded-[3px] scale-0 ${bgClass} transition-colors`}
              />
            );
          })}
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="sm:hidden text-center text-[11px] text-[#6B6785] dark:text-[#8E8A9F] mt-2">
        ← Swipe horizontally to view full activity heatmap →
      </div>

      {/* Caption/Legend */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 sm:mt-[36px] text-[13px] text-[#6B6785]">
        <span className="flex items-center gap-2">
          <i className="w-2.5 h-2.5 rounded-[3px] bg-[#D8D2FA] block" /> Lesson
        </span>
        <span className="flex items-center gap-2">
          <i className="w-2.5 h-2.5 rounded-[3px] bg-[#B8E8D8] block" /> Goal hit
        </span>
        <span className="flex items-center gap-2">
          <i className="w-2.5 h-2.5 rounded-[3px] bg-[#8B7FE8] block" /> Perfect day
        </span>
        <span className="flex items-center gap-2">
          <i className="w-2.5 h-2.5 rounded-[3px] bg-[#FFC9DE] block" /> Challenge
        </span>
      </div>
      
    </section>
  );
}
