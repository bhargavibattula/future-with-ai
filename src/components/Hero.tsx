"use client";

import { useState, useEffect } from "react";
import { Sparkles, PenTool, Palette, Code2, ArrowRight } from "lucide-react";

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
  }, [dynamicWords.length]);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-28">
      {/* Background Soft Blobs (Soft, Calm, Trustworthy) */}
      <div className="absolute top-0 left-[-5%] w-[420px] h-[420px] rounded-full bg-blob-violet blur-3xl opacity-80 pointer-events-none animate-float-slow" />
      <div className="absolute top-12 right-[-2%] w-[400px] h-[400px] rounded-full bg-blob-mint blur-3xl opacity-75 pointer-events-none animate-float-delayed" />
      <div className="absolute bottom-[-10%] left-[35%] w-[380px] h-[380px] rounded-full bg-blob-pink blur-3xl opacity-70 pointer-events-none animate-pulse-subtle" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Pill Badge: 500+ tools indexed */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#F3F0FE] dark:bg-[#1E1933] border border-[#D8D2FA] dark:border-white/10 text-xs sm:text-sm font-medium text-[#8B7FE8] mb-6 sm:mb-8 shadow-soft-sm hover:border-[#8B7FE8]/50 transition-all cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-[#8B7FE8] animate-ping" />
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B7FE8]" />
          <span>500+ tools indexed</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] tracking-tight leading-[1.15] mb-4 sm:mb-6">
          Find the right AI tool <br className="hidden sm:inline" />
          for{" "}
          <span className="relative inline-block min-w-[140px] sm:min-w-[320px] text-[#8B7FE8] text-center sm:text-left">
            <span className="inline-block transition-all duration-500 transform font-black border-b-2 sm:border-b-4 border-[#D8D2FA]">
              {dynamicWords[wordIndex]}
            </span>
          </span>
          , in seconds
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-[var(--foreground-secondary)] leading-relaxed mb-8 sm:mb-10 font-normal">
          A curated directory of AI tools, ranked and reviewed so you spend less
          time searching and more time building.
        </p>

        {/* Dual Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <a
            href="#explore"
            className="w-full sm:w-auto bg-[#8B7FE8] hover:bg-[#786BD6] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold shadow-soft-md hover:shadow-glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>Browse tools</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto bg-[var(--card)] hover:bg-[var(--elevated)] text-[var(--foreground)] border border-[var(--border)] hover:border-[#8B7FE8]/40 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>See how it works</span>
          </a>
        </div>

        {/* Hero Bottom Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto pt-2 sm:pt-4">
          {/* Card 1: Writing assistants */}
          <button
            onClick={() => onCategorySelect("Writing")}
            className={`text-left p-4 sm:p-6 rounded-2xl border transition-all duration-300 min-h-[44px] ${
              selectedCategory === "Writing"
                ? "bg-[var(--card)] border-[#8B7FE8] shadow-soft-md ring-2 ring-[#8B7FE8]/20"
                : "bg-[var(--card)] border-[var(--border)] hover:border-[#8B7FE8]/40 hover:shadow-soft-sm hover:-translate-y-1"
            }`}
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: "#D8D2FA", color: "#8B7FE8" }}
            >
              <PenTool className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-bold text-[var(--foreground)] text-base sm:text-lg mb-1">
              Writing assistants
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[var(--foreground-secondary)]">128 tools</p>
          </button>

          {/* Card 2: Image generation */}
          <button
            onClick={() => onCategorySelect("Image Generation")}
            className={`text-left p-4 sm:p-6 rounded-2xl border transition-all duration-300 min-h-[44px] ${
              selectedCategory === "Image Generation"
                ? "bg-[var(--card)] border-[#8B7FE8] shadow-soft-md ring-2 ring-[#8B7FE8]/20"
                : "bg-[var(--card)] border-[var(--border)] hover:border-[#8B7FE8]/40 hover:shadow-soft-sm hover:-translate-y-1"
            }`}
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: "#B8E8D8", color: "#1E1B2E" }}
            >
              <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-bold text-[var(--foreground)] text-base sm:text-lg mb-1">
              Image generation
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[var(--foreground-secondary)]">94 tools</p>
          </button>

          {/* Card 3: Coding tools */}
          <button
            onClick={() => onCategorySelect("Coding")}
            className={`text-left p-4 sm:p-6 rounded-2xl border transition-all duration-300 min-h-[44px] ${
              selectedCategory === "Coding"
                ? "bg-[var(--card)] border-[#8B7FE8] shadow-soft-md ring-2 ring-[#8B7FE8]/20"
                : "bg-[var(--card)] border-[var(--border)] hover:border-[#8B7FE8]/40 hover:shadow-soft-sm hover:-translate-y-1"
            }`}
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: "#FFC9DE", color: "#1E1B2E" }}
            >
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-bold text-[var(--foreground)] text-base sm:text-lg mb-1">
              Coding tools
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[var(--foreground-secondary)]">156 tools</p>
          </button>
        </div>
      </div>
    </section>
  );
}
