"use client";

import { X, Star, ExternalLink, Zap, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { AITool } from "@/data/tools";

interface ToolModalProps {
  tool: AITool | null;
  onClose: () => void;
}

export default function ToolModal({ tool, onClose }: ToolModalProps) {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto scrollbar-none bg-[var(--card)] rounded-2xl sm:rounded-3xl shadow-soft-lg border border-[var(--border)] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Banner Background */}
        <div className="h-28 sm:h-32 bg-gradient-to-r from-[#D8D2FA] via-[#F3F0FE] to-[#FFC9DE] dark:from-[#1E1933] dark:via-[#13111C] dark:to-[#221B2E] p-4 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/80 dark:bg-[#1E1933]/80 hover:bg-white dark:hover:bg-[#1E1933] text-[var(--foreground)] rounded-full backdrop-blur-sm transition-all shadow-soft-sm min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-0 relative">
          {/* Tool Icon Overlay */}
          <div className="-mt-10 sm:-mt-12 mb-4 flex items-end justify-between">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-soft-md border-4 border-white dark:border-[#13111C]"
              style={{ backgroundColor: tool.iconBgColor, color: tool.iconColor }}
            >
              {tool.name.substring(0, 2).toUpperCase()}
            </div>

            <span className="bg-[#B8E8D8] text-[#1E1B2E] text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-[#B8E8D8]">
              {tool.pricing} Plan
            </span>
          </div>

          {/* Title & Tagline */}
          <div className="mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)]">{tool.name}</h2>
              {tool.featured && (
                <span className="bg-[#D8D2FA] dark:bg-[#1E1933] text-[#8B7FE8] text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Tool
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#8B7FE8] mt-1">
              {tool.tagline}
            </p>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)] mb-5 sm:mb-6">
            <div className="flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-[var(--border)] pb-2.5 sm:pb-0">
              <div className="flex items-center gap-1 text-xs font-bold text-[var(--foreground-secondary)] mb-1">
                <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
                Rating
              </div>
              <span className="text-sm sm:text-base font-extrabold text-[var(--foreground)]">{tool.rating} / 5.0</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-[var(--border)] py-2.5 sm:py-0">
              <div className="flex items-center gap-1 text-xs font-bold text-[var(--foreground-secondary)] mb-1">
                <Users className="w-3.5 h-3.5 text-[#8B7FE8]" />
                Active Users
              </div>
              <span className="text-sm sm:text-base font-extrabold text-[var(--foreground)]">{tool.stats.monthlyUsers}</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center pt-2.5 sm:pt-0">
              <div className="flex items-center gap-1 text-xs font-bold text-[var(--foreground-secondary)] mb-1">
                <Zap className="w-3.5 h-3.5 text-[#8B7FE8]" />
                Performance
              </div>
              <span className="text-sm sm:text-base font-extrabold text-[var(--foreground)]">{tool.stats.speedRating}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5 sm:mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-secondary)] mb-1.5 sm:mb-2">
              About this tool
            </h4>
            <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* Mint Tags */}
          <div className="mb-6 sm:mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-secondary)] mb-1.5 sm:mb-2">
              Capabilities & Tags
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tool.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#B8E8D8]/70 dark:bg-[#5CBFA0]/20 text-[#1E1B2E] dark:text-[#B8E8D8] text-xs font-semibold px-3 py-1 rounded-xl border border-[#B8E8D8] dark:border-[#5CBFA0]/40 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#1E1B2E] dark:text-[#B8E8D8]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-[var(--border)]">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors min-h-[44px]"
            >
              Close
            </button>

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#8B7FE8] hover:bg-[#786BD6] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-soft-md hover:shadow-glow-primary transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
