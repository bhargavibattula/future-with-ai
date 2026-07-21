"use client";

import { useState } from "react";
import { Star, ExternalLink, Bookmark, Sparkles, Eye } from "lucide-react";
import { AITool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  tool: AITool;
  onOpenModal: (tool: AITool) => void;
}

export default function ToolCard({ tool, onOpenModal }: ToolCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="card-gsap-hover group relative bg-white rounded-3xl border border-[#EAE6FE] p-6 shadow-soft-sm flex flex-col justify-between">
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
                  <Badge variant="default" className="text-[10px] py-0 px-2">
                    <Sparkles className="w-3 h-3" /> Featured
                  </Badge>
                )}
              </div>
              <p className="text-xs text-[#6B6785] font-medium mt-0.5">
                {tool.category}
              </p>
            </div>
          </div>

          {/* Bookmark Button */}
          <Button
            variant={isBookmarked ? "accentPink" : "ghost"}
            size="icon"
            onClick={() => setIsBookmarked(!isBookmarked)}
            title={isBookmarked ? "Saved" : "Save tool"}
            aria-label="Save tool"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Tagline */}
        <p className="text-sm font-semibold text-[#1E1B2E] mb-2 line-clamp-1">
          {tool.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-[#6B6785] leading-relaxed mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Mint Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tool.tags.map((tag, idx) => (
            <Badge key={idx} variant="mint">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-[#EAE6FE]/70 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-bold text-[#1E1B2E]">
            <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
            <span>{tool.rating}</span>
            <span className="text-[#6B6785] font-normal">({tool.reviewsCount})</span>
          </div>

          <Badge variant="default">{tool.pricing}</Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenModal(tool)}
            title="Quick view"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4 text-[#6B6785]" />
          </Button>

          <Button asChild variant="default" size="sm">
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              <span>Try</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
