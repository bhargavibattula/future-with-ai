"use client";

import { useState, useRef, useEffect } from "react";
import { Star, ExternalLink, Bookmark, Sparkles, Eye } from "lucide-react";
import { AITool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

interface ToolCardProps {
  tool: AITool;
  onOpenModal: (tool: AITool) => void;
}

// Semantic tag colors — each position encodes meaning
const TAG_VARIANTS = [
  // Slot 0 — skill/category identity: mint
  "bg-[#B8E8D8] text-[#1E1B2E] border border-[#9DD9C5]",
  // Slot 1 — capability/feature: lavender primary-light
  "bg-[#D8D2FA] text-[#4B3FBF] border border-[#C4BDFA]",
  // Slot 2+ — supporting metadata: soft pink
  "bg-[#FFF0F5] text-[#C0336A] border border-[#FFC9DE]",
];

// Pricing pill — tinted by tier
const PRICING_STYLES: Record<string, string> = {
  Free: "bg-[#EDF9F5] text-emerald-700 border border-[#B8E8D8]",
  Freemium: "bg-[#F3F0FE] text-[#8B7FE8] border border-[#D8D2FA]",
  Paid: "bg-[#FFF0F5] text-[#C0336A] border border-[#FFC9DE]",
};

export default function ToolCard({ tool, onOpenModal }: ToolCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const tryBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const avatar = avatarRef.current;
    const tryBtn = tryBtnRef.current;
    if (!card || !avatar) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(card, {
      y: -5,
      boxShadow: "0 20px 50px rgba(139, 127, 232, 0.18)",
      duration: 0.25,
      ease: "power2.out",
    })
      .to(
        avatar,
        { scale: 1.1, rotate: 4, duration: 0.25, ease: "back.out(2)" },
        "<"
      )
      .to(
        tryBtn,
        { scale: 1.08, duration: 0.2, ease: "power2.out" },
        "<0.05"
      );

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="tool-card group relative bg-[var(--card)] rounded-2xl sm:rounded-3xl border border-[var(--border)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(139,127,232,0.08)] hover:shadow-[0_12px_30px_rgba(139,127,232,0.18)] dark:shadow-none"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            {/* Tool Avatar — gradient tile with depth */}
            <div
              ref={avatarRef}
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center font-bold text-lg sm:text-xl ring-2 ring-white/60 shadow-md shrink-0"
              style={{
                background: `linear-gradient(135deg, ${tool.iconBgColor} 0%, ${tool.iconBgColor}99 60%, #ffffff44 100%)`,
                color: tool.iconColor,
              }}
            >
              {tool.name.substring(0, 2).toUpperCase()}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h3 className="font-bold text-base sm:text-lg text-[var(--foreground)] group-hover:text-[#8B7FE8] transition-colors leading-tight truncate">
                  {tool.name}
                </h3>
                {/* Featured badge — pink accent */}
                {tool.featured && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFC9DE] text-[#8B1A4A] border border-[#FFB0CC]">
                    <Sparkles className="w-2.5 h-2.5" />
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--foreground-secondary)] font-medium mt-0.5 truncate">
                {tool.category}
              </p>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            title={isBookmarked ? "Saved" : "Save tool"}
            aria-label="Save tool"
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 ${
              isBookmarked
                ? "bg-[#FFC9DE] text-[#8B1A4A]"
                : "bg-[#F3F0FE] dark:bg-[#1E1933] text-[var(--foreground-secondary)] hover:bg-[#FFC9DE] hover:text-[#8B1A4A]"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-semibold text-[var(--foreground)] mb-1.5 sm:mb-2 line-clamp-1">
          {tool.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Semantic Tags — color encodes meaning per slot */}
        <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
          {tool.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full ${
                TAG_VARIANTS[Math.min(idx, TAG_VARIANTS.length - 1)]
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 sm:pt-4 border-t border-[var(--border)] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs font-bold text-[var(--foreground)]">
            <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
            <span>{tool.rating}</span>
            <span className="text-[var(--foreground-secondary)] font-normal text-[11px]">({tool.reviewsCount})</span>
          </div>

          {/* Pricing pill — tinted by tier */}
          <span
            className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full ${
              PRICING_STYLES[tool.pricing] ?? "bg-[#F3F0FE] dark:bg-[#1E1933] text-[#8B7FE8] border border-[#D8D2FA] dark:border-white/10"
            }`}
          >
            {tool.pricing}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onOpenModal(tool)}
            title="Quick view"
            aria-label="Quick view"
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#F3F0FE] dark:bg-[#1E1933] text-[var(--foreground-secondary)] hover:bg-[#D8D2FA] hover:text-[#8B7FE8] transition-all duration-200 min-h-[36px]"
          >
            <Eye className="w-4 h-4" />
          </button>

          <a
            ref={tryBtnRef}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#8B7FE8] text-white text-xs font-bold shadow-soft-sm hover:bg-[#786BD6] transition-colors duration-200 min-h-[36px]"
          >
            <span>Try</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
