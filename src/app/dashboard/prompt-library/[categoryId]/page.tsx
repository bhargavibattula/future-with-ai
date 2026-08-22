"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Terminal,
  Sparkles,
  Crown,
  Zap,
  Lock,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  SearchX,
} from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  description: string | null;
}

interface PromptData {
  id: string;
  title: string;
  content: string;
  type: "FREE" | "PREMIUM" | "ONE_TIME_PREMIUM";
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  isClaimed?: boolean;
  createdAt: string;
}

export default function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.categoryId;

  const [category, setCategory] = useState<CategoryData | null>(null);
  const [prompts, setPrompts] = useState<PromptData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/prompts/category/${categoryId}`);
      const data = await res.json();
      if (data.success) {
        setCategory(data.category);
        setPrompts(data.prompts || []);
      } else {
        setError(data.error || "Failed to load category prompts.");
      }
    } catch (err: any) {
      console.error("Error fetching category details:", err);
      setError("Network error loading category prompts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  // TASK 12: Advanced Search (trimmed, case-insensitive, responsive)
  const cleanSearchQuery = searchQuery.trim().toLowerCase();
  const filteredPrompts = prompts.filter(
    (p) =>
      !cleanSearchQuery ||
      p.title.toLowerCase().includes(cleanSearchQuery) ||
      p.content.toLowerCase().includes(cleanSearchQuery) ||
      p.type.toLowerCase().includes(cleanSearchQuery)
  );

  const renderTypeBadge = (type: string, isClaimed?: boolean) => {
    if (isClaimed) {
      return (
        <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-200 inline-flex items-center gap-1">
          <Lock className="w-3 h-3 text-amber-600" /> Locked / Claimed
        </span>
      );
    }

    switch (type) {
      case "PREMIUM":
        return (
          <span className="bg-[#F5F2FF] text-[#8B7FE8] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#E8E3FF] inline-flex items-center gap-1">
            <Crown className="w-3 h-3 text-[#8B7FE8]" /> PREMIUM
          </span>
        );
      case "ONE_TIME_PREMIUM":
        return (
          <span className="bg-[#FFF0F5] text-[#C0336A] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#FFC9DE] inline-flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#C0336A]" /> ONE TIME
          </span>
        );
      default:
        return (
          <span className="bg-[#E6F9F0] text-[#0E8566] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#B7F2DA]">
            FREE
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 select-none font-sans">
      {/* BACK BUTTON */}
      <div>
        <Link
          href="/dashboard/prompt-library"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8B7FE8] hover:text-[#786BD6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Prompt Library</span>
        </Link>
      </div>

      {/* HEADER SECTION */}
      <div className="bg-[var(--card)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[var(--border)] shadow-soft relative overflow-hidden">
        <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#8B7FE8]/10 blur-2xl" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-extrabold text-[#8B7FE8] bg-[#F5F2FF] dark:bg-[#1E1933] px-3 py-1 rounded-full border border-[#E8E3FF] dark:border-white/10">
              Domain Category
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold text-[var(--foreground)] mt-2">
              {category ? category.name : "Loading Domain..."}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1 max-w-2xl font-medium">
              {category?.description || "Browse curated prompts in this domain category."}
            </p>
          </div>

          <div className="bg-[var(--background)] border border-[var(--border)] px-4 py-3 rounded-2xl text-center self-start sm:self-auto min-w-[120px]">
            <span className="text-xs font-bold text-[var(--foreground-secondary)] block">Available Prompts</span>
            <span className="text-xl font-extrabold text-[#8B7FE8]">{prompts.length}</span>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-[var(--card)] rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-[var(--border)] shadow-soft flex items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7FE8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts in this category..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[#8B7FE8] min-h-[44px]"
          />
        </div>
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
          {error}
        </div>
      )}

      {/* TASK 14: LOADING SKELETON OR PROMPTS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-[#E8E3FF] shadow-soft space-y-4 animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="w-24 h-5 rounded-full bg-[#F5F2FF]" />
                <div className="w-16 h-5 rounded-full bg-[#F5F2FF]" />
              </div>
              <div className="h-5 bg-[#F5F2FF] rounded-full w-3/4" />
              <div className="h-20 bg-[#FCFBFF] rounded-2xl border border-[#E8E3FF]" />
              <div className="pt-3 border-t border-[#F5F2FF] flex justify-between items-center">
                <div className="h-4 bg-[#F5F2FF] rounded-full w-20" />
                <div className="h-8 bg-[#F5F2FF] rounded-2xl w-28" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* TASK 13: POLISHED EMPTY STATES */}
          {prompts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-[#E8E3FF] text-center shadow-soft">
              <Terminal className="w-14 h-14 text-[#8B7FE8]/50 mx-auto mb-3" />
              <p className="text-base font-extrabold text-[#1E1B2E]">No Prompts Found</p>
              <p className="text-xs text-[#6B6785] mt-1">
                No prompts are available in this category yet.
              </p>
            </div>
          ) : filteredPrompts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-[#E8E3FF] text-center shadow-soft">
              <SearchX className="w-14 h-14 text-[#8B7FE8]/50 mx-auto mb-3" />
              <p className="text-base font-extrabold text-[#1E1B2E]">No Search Results</p>
              <p className="text-xs text-[#6B6785] mt-1 max-w-md mx-auto">
                No prompts matched your search query "{searchQuery.trim()}".
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 px-5 py-2.5 rounded-2xl text-xs font-extrabold text-[#8B7FE8] bg-[#F5F2FF] border border-[#E8E3FF] hover:bg-[#8B7FE8] hover:text-white transition-all cursor-pointer shadow-soft-sm"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative shadow-soft hover:shadow-soft-md ${
                    prompt.isClaimed
                      ? "border-amber-200 bg-amber-50/20"
                      : "border-[#E8E3FF] hover:border-[#8B7FE8]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold text-[#8B7FE8] bg-[#F5F2FF] px-2.5 py-0.5 rounded-full border border-[#E8E3FF]">
                        {prompt.category?.name || "Prompt"}
                      </span>
                      {renderTypeBadge(prompt.type, prompt.isClaimed)}
                    </div>

                    <h3 className="text-base font-extrabold text-[#1E1B2E] mb-2 line-clamp-1">
                      {prompt.title}
                    </h3>

                    <p className="text-xs font-mono text-[#6B6785] bg-[#FCFBFF] p-3 rounded-2xl border border-[#E8E3FF] line-clamp-3 leading-relaxed">
                      {prompt.content}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#F5F2FF] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#6B6785]">
                      {new Date(prompt.createdAt).toLocaleDateString()}
                    </span>

                    <Link
                      href={`/dashboard/prompt-library/prompt/${prompt.id}`}
                      className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                        prompt.isClaimed
                          ? "bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200"
                          : "bg-[#8B7FE8] text-white hover:bg-[#786BD6] shadow-soft-sm"
                      }`}
                    >
                      <span>{prompt.isClaimed ? "View Claimed Prompt" : "Open Prompt"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
