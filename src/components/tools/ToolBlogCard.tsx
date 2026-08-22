"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, ArrowRight, Bookmark, Sparkles, ExternalLink, Flame, Check } from "lucide-react";
import { ToolBlog } from "@/data/toolBlogs";

interface ToolBlogCardProps {
  blog: ToolBlog;
  onReadModal?: (blog: ToolBlog) => void;
}

export default function ToolBlogCard({ blog, onReadModal }: ToolBlogCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  // Determine badge color styling based on category (Light & Dark theme tailored)
  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "AI NEWS SIMPLIFIED":
        return "bg-[#F3F0FE] dark:bg-[#8B7FE8]/25 text-[#8B7FE8] dark:text-[#D8D2FA] border-[#D8D2FA] dark:border-[#8B7FE8]/40";
      case "CAREER GUIDANCE":
        return "bg-[#EDF9F5] dark:bg-[#5CBFA0]/25 text-[#0F8A62] dark:text-[#5CBFA0] border-[#B8E8D8] dark:border-[#5CBFA0]/40";
      case "CODING PROJECTS":
        return "bg-[#FFF0F5] dark:bg-[#F0879B]/25 text-[#D84C6F] dark:text-[#FFC9DE] border-[#FFC9DE] dark:border-[#F0879B]/40";
      case "DEV COPILOTS":
        return "bg-[#F3F0FE] dark:bg-[#8B7FE8]/25 text-[#8B7FE8] dark:text-[#D8D2FA] border-[#D8D2FA] dark:border-[#8B7FE8]/40";
      case "LLMS & REASONING":
        return "bg-[#EDF9F5] dark:bg-[#5CBFA0]/25 text-[#0F8A62] dark:text-[#B8E8D8] border-[#B8E8D8] dark:border-[#5CBFA0]/40";
      case "IMAGE & VIDEO":
        return "bg-[#FFF0F5] dark:bg-[#F0879B]/25 text-[#D84C6F] dark:text-[#FFC9DE] border-[#FFC9DE] dark:border-[#F0879B]/40";
      case "AUTONOMOUS AGENTS":
        return "bg-[#F3F0FE] dark:bg-[#8B7FE8]/25 text-[#8B7FE8] dark:text-[#8B7FE8] border-[#D8D2FA] dark:border-[#8B7FE8]/40";
      default:
        return "bg-[#F3F0FE] dark:bg-[#8B7FE8]/25 text-[#8B7FE8] dark:text-[#8B7FE8] border-[#D8D2FA] dark:border-[#8B7FE8]/40";
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // If modal trigger is provided, use it
    if (onReadModal) {
      onReadModal(blog);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-[#13111C] border border-[#EAE6FE] dark:border-white/10 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8B7FE8] dark:hover:border-[#8B7FE8]/60 shadow-[0_4px_20px_rgba(139,127,232,0.08)] hover:shadow-[0_12px_30px_rgba(139,127,232,0.18)] dark:shadow-none dark:hover:shadow-[0_0_30px_rgba(139,127,232,0.18)] cursor-pointer overflow-hidden"
    >
      {/* Background Subtle Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B7FE8]/5 via-transparent to-[#F0879B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

      {/* Top Banner Image with Category Badge */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#F3F0FE] dark:bg-[#0A0A0A] border border-[#EAE6FE] dark:border-white/10 mb-5">
        {!imgError ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out brightness-95 group-hover:brightness-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F0FE] to-[#D8D2FA] dark:from-[#1C182B] dark:to-[#0D0B14] p-4 text-center">
            <Sparkles className="w-8 h-8 text-[#8B7FE8] mb-2 animate-pulse" />
            <span className="text-xs font-bold text-[#1E1B2E] dark:text-white/80">{blog.title}</span>
          </div>
        )}

        {/* Top Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/60 pointer-events-none" />

        {/* Category Pill Badge (Matching Screenshot) */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md border shadow-sm ${getBadgeStyle(
              blog.category
            )}`}
          >
            {blog.category}
          </span>
        </div>

        {/* Bookmark & Trending Actions */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2">
          {blog.trending && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 dark:bg-amber-500/20 border border-amber-500/40 text-white dark:text-amber-300 text-[10px] font-bold backdrop-blur-md shadow-sm">
              <Flame className="w-3 h-3 fill-white dark:fill-amber-400" />
              HOT
            </span>
          )}
          <button
            type="button"
            onClick={toggleBookmark}
            title={isBookmarked ? "Remove Bookmark" : "Save Blog"}
            className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white transition-all backdrop-blur-md shadow-sm"
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${
                isBookmarked ? "fill-[#8B7FE8] text-[#8B7FE8]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E] dark:text-white group-hover:text-[#8B7FE8] dark:group-hover:text-[#8B7FE8] transition-colors leading-snug line-clamp-2 mb-2.5 font-['Plus_Jakarta_Sans',sans-serif]">
          {blog.title}
        </h3>

        {/* Excerpt Summary */}
        <p className="text-sm text-[#6B6785] dark:text-[#A09CAE] leading-relaxed line-clamp-3 mb-4 font-normal">
          {blog.excerpt}
        </p>

        {/* Tools Mentioned Micro-Chips */}
        {blog.toolsMentioned && blog.toolsMentioned.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-5">
            {blog.toolsMentioned.slice(0, 3).map((tool, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F3F0FE] dark:bg-[#1C1929] border border-[#EAE6FE] dark:border-white/5 text-[#8B7FE8] dark:text-[#D8D2FA]"
              >
                <Sparkles className="w-2.5 h-2.5 text-[#8B7FE8]" />
                {tool.name}
              </span>
            ))}
            {blog.toolsMentioned.length > 3 && (
              <span className="text-[10px] font-medium text-[#6B6785]">
                +{blog.toolsMentioned.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer (Author & Read Time - Matching Screenshot) */}
      <div className="pt-4 border-t border-[#EAE6FE] dark:border-white/5 flex items-center justify-between text-xs text-[#6B6785] dark:text-[#8E8A9F]">
        {/* Author Byline */}
        <div className="flex items-center gap-1.5 font-bold text-[#1E1B2E] dark:text-white/90">
          <User className="w-3.5 h-3.5 text-[#8B7FE8]" />
          <span className="truncate max-w-[120px] sm:max-w-[140px]">
            {blog.author.name}
          </span>
        </div>

        {/* Reading Time */}
        <div className="flex items-center gap-1 font-semibold text-[#6B6785] dark:text-[#A09CAE]">
          <Clock className="w-3.5 h-3.5 text-[#0F8A62] dark:text-[#5CBFA0]" />
          <span>{blog.readTime}</span>
        </div>
      </div>
    </div>
  );
}
