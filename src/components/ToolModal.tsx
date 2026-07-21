"use client";

import { X, Star, ExternalLink, ShieldCheck, Zap, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { AITool } from "@/data/tools";

interface ToolModalProps {
  tool: AITool | null;
  onClose: () => void;
}

export default function ToolModal({ tool, onClose }: ToolModalProps) {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1E1B2E]/40 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-soft-lg border border-[#EAE6FE] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Banner Background */}
        <div className="h-32 bg-gradient-to-r from-[#D8D2FA] via-[#F3F0FE] to-[#FFC9DE] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-[#1E1B2E] rounded-full backdrop-blur-sm transition-all shadow-soft-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          {/* Tool Icon Overlay */}
          <div className="-mt-12 mb-4 flex items-end justify-between">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center font-bold text-3xl shadow-soft-md border-4 border-white"
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
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-[#1E1B2E]">{tool.name}</h2>
              {tool.featured && (
                <span className="bg-[#D8D2FA] text-[#8B7FE8] text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Tool
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-[#8B7FE8] mt-1">
              {tool.tagline}
            </p>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] mb-6">
            <div className="flex flex-col items-center justify-center text-center border-r border-[#EAE6FE]">
              <div className="flex items-center gap-1 text-xs font-bold text-[#6B6785] mb-1">
                <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
                Rating
              </div>
              <span className="text-base font-extrabold text-[#1E1B2E]">{tool.rating} / 5.0</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center border-r border-[#EAE6FE]">
              <div className="flex items-center gap-1 text-xs font-bold text-[#6B6785] mb-1">
                <Users className="w-3.5 h-3.5 text-[#8B7FE8]" />
                Active Users
              </div>
              <span className="text-base font-extrabold text-[#1E1B2E]">{tool.stats.monthlyUsers}</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 text-xs font-bold text-[#6B6785] mb-1">
                <Zap className="w-3.5 h-3.5 text-[#8B7FE8]" />
                Performance
              </div>
              <span className="text-base font-extrabold text-[#1E1B2E]">{tool.stats.speedRating}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B6785] mb-2">
              About this tool
            </h4>
            <p className="text-sm text-[#1E1B2E] leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* Mint Tags (#B8E8D8) */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B6785] mb-2">
              Capabilities & Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#B8E8D8]/70 text-[#1E1B2E] text-xs font-semibold px-3 py-1 rounded-xl border border-[#B8E8D8] flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#1E1B2E]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAE6FE]">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-[#6B6785] hover:text-[#1E1B2E] transition-colors"
            >
              Close
            </button>

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8B7FE8] hover:bg-[#786BD6] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-soft-md hover:shadow-glow-primary transition-all flex items-center gap-2"
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
