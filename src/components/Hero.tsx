"use client";

import { useState, useEffect } from "react";
import { Sparkles, PenTool, Palette, Code2, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/tools";

interface HeroProps {
  onCategorySelect: (categorySlug: string) => void;
  selectedCategory: string;
}

export default function Hero({ onCategorySelect, selectedCategory }: HeroProps) {
  const dynamicWords = ["writing", "coding", "image generation", "productivity"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Background Soft Blobs (Soft, Calm, Trustworthy) */}
      <div className="absolute top-0 left-[-5%] w-[420px] h-[420px] rounded-full bg-blob-violet blur-3xl opacity-80 pointer-events-none animate-float-slow" />
      <div className="absolute top-12 right-[-2%] w-[400px] h-[400px] rounded-full bg-blob-mint blur-3xl opacity-75 pointer-events-none animate-float-delayed" />
      <div className="absolute bottom-[-10%] left-[35%] w-[380px] h-[380px] rounded-full bg-blob-pink blur-3xl opacity-70 pointer-events-none animate-pulse-subtle" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Pill Badge: 500+ tools indexed */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F0FE] border border-[#D8D2FA] text-xs sm:text-sm font-medium text-[#8B7FE8] mb-8 shadow-soft-sm hover:border-[#8B7FE8]/50 transition-all cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-[#8B7FE8] animate-ping" />
          <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
          <span>500+ tools indexed</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#1E1B2E] tracking-tight leading-[1.15] mb-6">
          Find the right ai tool <br className="hidden sm:inline" />
          for{" "}
          <span className="relative inline-block min-w-[200px] sm:min-w-[320px] text-[#8B7FE8] text-left">
            <span className="inline-block transition-all duration-500 transform font-black border-b-4 border-[#D8D2FA]">
              {dynamicWords[wordIndex]}
            </span>
          </span>
          , in seconds
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#6B6785] leading-relaxed mb-10 font-normal">
          A curated directory of ai tools, ranked and reviewed so you spend less
          time searching and more time building.
        </p>

        {/* Dual Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#explore"
            className="w-full sm:w-auto bg-[#8B7FE8] hover:bg-[#786BD6] text-white px-8 py-3.5 rounded-full font-semibold shadow-soft-md hover:shadow-glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Browse tools</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto bg-white hover:bg-[#FCFBFF] text-[#1E1B2E] border border-[#EAE6FE] hover:border-[#8B7FE8]/40 px-8 py-3.5 rounded-full font-semibold shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>See how it works</span>
          </a>
        </div>

        {/* Hero Bottom Category Cards Grid (Matching reference mockup) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto pt-4">
          {/* Card 1: Writing assistants */}
          <button
            onClick={() => onCategorySelect("Writing")}
            className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
              selectedCategory === "Writing"
                ? "bg-white border-[#8B7FE8] shadow-soft-md ring-2 ring-[#8B7FE8]/20"
                : "bg-white/90 border-[#EAE6FE] hover:border-[#8B7FE8]/40 hover:shadow-soft-sm hover:-translate-y-1"
            }`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: "#D8D2FA", color: "#8B7FE8" }}
            >
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1E1B2E] text-lg mb-1">
              Writing assistants
            </h3>
            <p className="text-sm font-medium text-[#6B6785]">128 tools</p>
          </button>

          {/* Card 2: Image generation */}
          <button
            onClick={() => onCategorySelect("Image Generation")}
            className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
              selectedCategory === "Image Generation"
                ? "bg-white border-[#8B7FE8] shadow-soft-md ring-2 ring-[#8B7FE8]/20"
                : "bg-white/90 border-[#EAE6FE] hover:border-[#8B7FE8]/40 hover:shadow-soft-sm hover:-translate-y-1"
            }`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: "#B8E8D8", color: "#1E1B2E" }}
            >
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1E1B2E] text-lg mb-1">
              Image generation
            </h3>
            <p className="text-sm font-medium text-[#6B6785]">94 tools</p>
          </button>

          {/* Card 3: Coding tools */}
          <button
            onClick={() => onCategorySelect("Coding")}
            className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
              selectedCategory === "Coding"
                ? "bg-white border-[#8B7FE8] shadow-soft-md ring-2 ring-[#8B7FE8]/20"
                : "bg-white/90 border-[#EAE6FE] hover:border-[#8B7FE8]/40 hover:shadow-soft-sm hover:-translate-y-1"
            }`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: "#FFC9DE", color: "#1E1B2E" }}
            >
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1E1B2E] text-lg mb-1">
              Coding tools
            </h3>
            <p className="text-sm font-medium text-[#6B6785]">156 tools</p>
          </button>
        </div>
      </div>
    </section>
  );
}
