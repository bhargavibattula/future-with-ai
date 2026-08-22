"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  BookOpen,
  TrendingUp,
  Flame,
  Filter,
  Layers,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Code2,
  Bot,
  Palette,
  SearchX,
  Compass,
} from "lucide-react";
import ToolBlogCard from "@/components/tools/ToolBlogCard";
import ToolBlogModal from "@/components/tools/ToolBlogModal";
import {
  TOOL_BLOGS,
  BLOG_CATEGORIES,
  ToolBlog,
  BlogCategoryType,
} from "@/data/toolBlogs";

export default function ToolsBlogHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategoryType>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"latest" | "trending" | "fastest">("latest");
  const [activeBlogModal, setActiveBlogModal] = useState<ToolBlog | null>(null);

  // Filter & Search Logic
  const filteredBlogs = useMemo(() => {
    return TOOL_BLOGS.filter((blog) => {
      // Category check
      const matchesCategory =
        selectedCategory === "ALL" || blog.category === selectedCategory;

      // Query check
      const cleanQuery = searchQuery.trim().toLowerCase();
      if (!cleanQuery) return matchesCategory;

      const inTitle = blog.title.toLowerCase().includes(cleanQuery);
      const inSubtitle = blog.subtitle.toLowerCase().includes(cleanQuery);
      const inExcerpt = blog.excerpt.toLowerCase().includes(cleanQuery);
      const inTags = blog.tags.some((tag) => tag.toLowerCase().includes(cleanQuery));
      const inTools = blog.toolsMentioned.some((tool) =>
        tool.name.toLowerCase().includes(cleanQuery)
      );

      return matchesCategory && (inTitle || inSubtitle || inExcerpt || inTags || inTools);
    }).sort((a, b) => {
      if (sortBy === "trending") {
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      }
      if (sortBy === "fastest") {
        const readA = parseInt(a.readTime) || 5;
        const readB = parseInt(b.readTime) || 5;
        return readA - readB;
      }
      // default: latest
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Quick stats counts
  const totalBlogs = TOOL_BLOGS.length;
  const trendingCount = TOOL_BLOGS.filter((b) => b.trending).length;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24 transition-colors duration-300">
      {/* Top Banner / Hero Header */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-10 border-b border-[var(--border)] bg-gradient-to-b from-[#161226]/40 via-[var(--background)] to-[var(--background)]">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#8B7FE8]/15 via-[#F0879B]/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B7FE8]/10 border border-[#8B7FE8]/30 text-xs font-extrabold text-[#8B7FE8] mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Tools & Engineering Blogs</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] font-['Plus_Jakarta_Sans',sans-serif]">
                AI Engineering <span className="text-[#8B7FE8]">Blog & Guides</span>
              </h1>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-base md:text-lg text-[var(--foreground-secondary)] max-w-2xl leading-relaxed">
                Simplified breakdowns, hands-on coding projects, career roadmaps, and benchmarks for cutting-edge AI tools.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
              <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm text-center">
                <div className="text-lg sm:text-xl font-extrabold text-[#8B7FE8]">{totalBlogs}</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-[var(--foreground-secondary)] uppercase tracking-wider">
                  Guides
                </div>
              </div>
              <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm text-center">
                <div className="text-lg sm:text-xl font-extrabold text-[#5CBFA0]">{trendingCount}</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-[var(--foreground-secondary)] uppercase tracking-wider">
                  Trending
                </div>
              </div>
              <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm text-center">
                <div className="text-lg sm:text-xl font-extrabold text-[#F0879B]">30+</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-[var(--foreground-secondary)] uppercase tracking-wider">
                  AI Tools
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar & Sort Row */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8A9F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tool name (e.g. Cursor, DeepSeek, Claude), topic, or keyword..."
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-xs sm:text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-secondary)] focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]/50 transition-all shadow-sm min-h-[44px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8E8A9F] hover:text-[var(--foreground)] px-2 py-1 rounded-md hover:bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort guides"
                className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-xs font-bold text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]/50 shadow-sm cursor-pointer min-h-[44px]"
              >
                <option value="latest">Latest Published</option>
                <option value="trending">Most Trending</option>
                <option value="fastest">Shortest Read Time</option>
              </select>
            </div>
          </div>

          {/* Horizontal Category Pill Tabs */}
          <div className="mt-5 sm:mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 uppercase tracking-wider min-h-[36px] ${
                    isActive
                      ? "bg-[#8B7FE8] text-white shadow-soft-sm scale-[1.02]"
                      : "bg-[var(--card)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--elevated)] border border-[var(--border)]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Results Count Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm font-semibold text-[var(--foreground-secondary)]">
            Showing <span className="font-bold text-[var(--foreground)]">{filteredBlogs.length}</span> {filteredBlogs.length === 1 ? "guide" : "guides"}
            {selectedCategory !== "ALL" && (
              <span> in <span className="text-[#8B7FE8] font-bold">{selectedCategory}</span></span>
            )}
          </div>

          {(selectedCategory !== "ALL" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#8B7FE8] hover:text-[#786BD6] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        {/* 3-Column Cards Grid (Matching Reference Screenshot) */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((blog) => (
              <ToolBlogCard
                key={blog.id}
                blog={blog}
                onReadModal={(b) => setActiveBlogModal(b)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center rounded-3xl bg-[var(--card)] border border-[var(--border)] p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#8B7FE8]/10 text-[#8B7FE8] flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
              No AI Guides Found
            </h3>
            <p className="text-sm text-[var(--foreground-secondary)] mb-6">
              We couldn&apos;t find any articles matching &quot;{searchQuery}&quot;. Try searching for another AI tool or reset your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#8B7FE8] hover:bg-[#786BD6] text-white text-xs font-bold shadow-soft-sm transition-all"
            >
              View All Guides
            </button>
          </div>
        )}
      </main>

      {/* Interactive Modal Reader */}
      <ToolBlogModal
        blog={activeBlogModal}
        onClose={() => setActiveBlogModal(null)}
      />
    </div>
  );
}
