"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Clock,
  User,
  Calendar,
  Sparkles,
  Bookmark,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { ToolBlog } from "@/data/toolBlogs";

interface ToolBlogModalProps {
  blog: ToolBlog | null;
  onClose: () => void;
}

export default function ToolBlogModal({ blog, onClose }: ToolBlogModalProps) {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!blog) return null;

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/dashboard/tools/${blog.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#12101B] border border-white/15 shadow-2xl text-white overflow-hidden z-10">
        {/* Modal Top Bar / Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171424]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-[#8B7FE8]/20 text-[#8B7FE8] border border-[#8B7FE8]/30">
              <Sparkles className="w-3 h-3" />
              {blog.category}
            </span>
            <span className="hidden sm:inline-block text-xs text-[#8E8A9F]">
              • {blog.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/10"
              title="Copy Article Link"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border border-white/10"
              title="Bookmark Guide"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked ? "fill-[#8B7FE8] text-[#8B7FE8]" : ""
                }`}
              />
            </button>

            {/* Open Full Page */}
            <Link
              href={`/dashboard/tools/${blog.slug}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8B7FE8]/20 hover:bg-[#8B7FE8]/30 border border-[#8B7FE8]/40 text-xs font-bold text-[#D8D2FA] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Full Page
            </Link>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
          {/* Header Area */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              {blog.title}
            </h1>
            <p className="text-base sm:text-lg text-[#BDB9D0] leading-relaxed">
              {blog.subtitle}
            </p>

            {/* Author & Meta Row */}
            <div className="flex flex-wrap items-center gap-4 pt-3 pb-2 text-xs sm:text-sm text-[#8E8A9F] border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-semibold">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  {blog.author.name.charAt(0)}
                </div>
                <span>{blog.author.name}</span>
                <span className="text-[#6B6785] font-normal hidden sm:inline">
                  ({blog.author.role})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8B7FE8]" />
                <span>{blog.publishedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#5CBFA0]" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Cover Hero Banner */}
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-lg">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover object-center brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12101B] via-transparent to-transparent opacity-60" />
          </div>

          {/* Tools Mentioned Panel */}
          {blog.toolsMentioned && blog.toolsMentioned.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#1A1727] border border-[#8B7FE8]/20 space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#8B7FE8] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
                Featured AI Tools in this Article
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {blog.toolsMentioned.map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#141220] border border-white/5"
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{tool.name}</div>
                      <div className="text-[11px] text-[#A09CAE]">{tool.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Sections */}
          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-[#D2CFE0]">
            {blog.contentSections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  {section.heading}
                </h2>
                <p className="text-[#C4C0D4] leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>

                {/* Callout Box */}
                {section.callout && (
                  <div className="p-4 rounded-2xl bg-[#1E1933] border-l-4 border-[#8B7FE8] flex items-start gap-3 text-sm text-[#D8D2FA]">
                    <Lightbulb className="w-5 h-5 text-[#8B7FE8] shrink-0 mt-0.5" />
                    <div className="leading-relaxed">{section.callout.text}</div>
                  </div>
                )}

                {/* Code Snippet */}
                {section.codeSnippet && (
                  <div className="rounded-2xl bg-[#09080F] border border-white/10 overflow-hidden shadow-inner">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#171424] border-b border-white/10 text-xs font-mono text-[#8E8A9F]">
                      <span className="uppercase font-bold text-[#8B7FE8]">
                        {section.codeSnippet.language}
                      </span>
                      <button
                        onClick={() =>
                          copyCode(section.codeSnippet!.code, idx)
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-sans transition-colors"
                      >
                        {copiedCodeIdx === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-[#A9B1D6] leading-normal">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                    {section.codeSnippet.caption && (
                      <div className="px-4 py-1.5 bg-[#120F1D] border-t border-white/5 text-[11px] text-[#6B6785]">
                        {section.codeSnippet.caption}
                      </div>
                    )}
                  </div>
                )}

                {/* Key Takeaways */}
                {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#151222] border border-white/10 space-y-2.5">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#5CBFA0] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5CBFA0]" />
                      Key Takeaways & Action Points
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#D8D2FA]">
                      {section.keyTakeaways.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5CBFA0] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#8E8A9F] font-bold uppercase tracking-wider mr-1">
              Tags:
            </span>
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#1C182B] text-[#D8D2FA] border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="px-6 py-4 bg-[#171424] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#8E8A9F]">
            Enjoyed this guide? Share with fellow developers or explore more AI tools.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors"
            >
              Close
            </button>
            <Link
              href={`/dashboard/tools/${blog.slug}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B7FE8] to-[#786BD6] hover:from-[#9D8FEE] hover:to-[#8B7FE8] text-xs font-bold text-white shadow-soft-sm transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Open Dedicated Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
