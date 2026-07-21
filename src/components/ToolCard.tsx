"use client";

import { useState } from "react";
import { Star, ExternalLink, Bookmark, Sparkles, Eye } from "lucide-react";
import { AITool } from "@/data/tools";

interface ToolCardProps {
  tool: AITool;
  onOpenModal: (tool: AITool) => void;
}

export default function ToolCard({ tool, onOpenModal }: ToolCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl border border-[#EAE6FE] p-6 shadow-soft-sm hover:shadow-soft-md hover:border-[#8B7FE8]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            {/* Tool Icon */}
            <div
              className="w-13 h-13 rounded-2xl flex items-center justify-center font-bold text-xl shadow-soft-sm group-hover:scale-105 transition-transform"
              style={{ backgroundColor: tool.iconBgColor, color: tool.iconColor }}
            >
              {tool.name.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-[#1E1B2E] group-hover:text-[#8B7FE8] transition-colors">
                  {tool.name}
                </h3>
                {tool.featured && (
                  <span className="bg-[#D8D2FA] text-[#8B7FE8] text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6B6785] font-medium mt-0.5">
                {tool.category}
              </p>
            </div>
          </div>

          {/* Bookmark Button (Soft Pink Accent #FFC9DE) */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-xl transition-all ${
              isBookmarked
                ? "bg-[#FFC9DE] text-[#1E1B2E] shadow-soft-sm scale-105"
                : "bg-[#FCFBFF] text-[#6B6785] hover:bg-[#FFC9DE]/50 hover:text-[#1E1B2E]"
            }`}
            title={isBookmarked ? "Saved" : "Save tool"}
            aria-label="Save tool"
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
            />
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

        {/* Mint Tags (#B8E8D8 as requested for tags) */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tool.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#B8E8D8]/70 text-[#1E1B2E] text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#B8E8D8]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Rating, Pricing, Actions */}
      <div className="pt-4 border-t border-[#EAE6FE]/70 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs font-bold text-[#1E1B2E]">
            <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
            <span>{tool.rating}</span>
            <span className="text-[#6B6785] font-normal">({tool.reviewsCount})</span>
          </div>

          {/* Pricing Pill */}
          <span className="text-xs font-bold text-[#8B7FE8] bg-[#F3F0FE] px-2 py-0.5 rounded-full">
            {tool.pricing}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenModal(tool)}
            className="p-2 rounded-xl text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#D8D2FA]/40 transition-colors"
            title="Quick view"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#8B7FE8] hover:bg-[#786BD6] text-white p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold shadow-soft-sm hover:shadow-glow-primary transition-all flex items-center gap-1"
          >
            <span className="hidden sm:inline">Try</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
