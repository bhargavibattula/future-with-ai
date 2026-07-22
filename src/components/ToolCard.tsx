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
      className="tool-card group relative bg-white rounded-3xl border border-[#EAE6FE] p-6 flex flex-col justify-between"
      style={{ boxShadow: "0 8px 30px rgba(139, 127, 232, 0.08)" }}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            {/* Tool Avatar — gradient tile with depth */}
            <div
              ref={avatarRef}
              className="w-13 h-13 rounded-2xl flex items-center justify-center font-bold text-xl ring-2 ring-white shadow-md"
              style={{
                background: `linear-gradient(135deg, ${tool.iconBgColor} 0%, ${tool.iconBgColor}99 60%, #ffffff44 100%)`,
                color: tool.iconColor,
              }}
            >
              {tool.name.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-lg text-[#1E1B2E] group-hover:text-[#8B7FE8] transition-colors leading-tight">
                  {tool.name}
                </h3>
                {/* Featured badge — pink accent, the highlight color */}
                {tool.featured && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFC9DE] text-[#8B1A4A] border border-[#FFB0CC]">
                    <Sparkles className="w-2.5 h-2.5" />
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6B6785] font-medium mt-0.5">
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
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
              isBookmarked
                ? "bg-[#FFC9DE] text-[#8B1A4A]"
                : "bg-[#F3F0FE] text-[#6B6785] hover:bg-[#FFC9DE] hover:text-[#8B1A4A]"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Tagline */}
        <p className="text-sm font-semibold text-[#1E1B2E] mb-2 line-clamp-1">
          {tool.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-[#6B6785] leading-relaxed mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Semantic Tags — color encodes meaning per slot */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tool.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                TAG_VARIANTS[Math.min(idx, TAG_VARIANTS.length - 1)]
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-[#EAE6FE]/70 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs font-bold text-[#1E1B2E]">
            <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
            <span>{tool.rating}</span>
            <span className="text-[#6B6785] font-normal">({tool.reviewsCount})</span>
          </div>

          {/* Pricing pill — tinted by tier */}
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              PRICING_STYLES[tool.pricing] ?? "bg-[#F3F0FE] text-[#8B7FE8] border border-[#D8D2FA]"
            }`}
          >
            {tool.pricing}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenModal(tool)}
            title="Quick view"
            aria-label="Quick view"
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#F3F0FE] text-[#6B6785] hover:bg-[#D8D2FA] hover:text-[#8B7FE8] transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>

          <a
            ref={tryBtnRef}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B7FE8] text-white text-xs font-bold shadow-soft-sm hover:bg-[#786BD6] transition-colors duration-200"
          >
            <span>Try</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
