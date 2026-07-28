"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Terminal,
  Search,
  Sparkles,
  BookOpen,
  ArrowRight,
  RefreshCw,
  FolderOpen,
  Layers,
  Code2,
  Cpu,
  FileCode2,
  GraduationCap,
  Briefcase,
  Activity,
  SearchX,
} from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  _count?: {
    prompts: number;
  };
}

export default function PromptLibraryHomePage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/prompts/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
      } else {
        setError(data.error || "Failed to load categories.");
      }
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      setError("Network error loading prompt categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // TASK 12: Advanced Search (trimmed, case-insensitive, responsive)
  const cleanSearchQuery = searchQuery.trim().toLowerCase();
  const filteredCategories = categories.filter(
    (cat) =>
      !cleanSearchQuery ||
      cat.name.toLowerCase().includes(cleanSearchQuery) ||
      (cat.description && cat.description.toLowerCase().includes(cleanSearchQuery))
  );

  // Helper icon assignment based on category name
  const getCategoryIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("web") || n.includes("code") || n.includes("frontend") || n.includes("backend")) {
      return Code2;
    }
    if (n.includes("ai") || n.includes("agent") || n.includes("prompt")) {
      return Cpu;
    }
    if (n.includes("interview") || n.includes("resume") || n.includes("career")) {
      return Briefcase;
    }
    if (n.includes("dsa") || n.includes("algorithm") || n.includes("data structure")) {
      return FileCode2;
    }
    if (n.includes("health") || n.includes("fitness") || n.includes("nutrition")) {
      return Activity;
    }
    return GraduationCap;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none font-sans">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#1E1B2E] via-[#2A2440] to-[#1E1B2E] p-8 sm:p-12 border border-[#362F54] text-white shadow-soft-lg">
        {/* Soft Ambient Radial Lights */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#8B7FE8]/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FFC9DE]/20 blur-[100px]" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-extrabold text-[#D8D2FA]">
            <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
            <span>Curated Prompt Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Explore Curated <span className="text-[#8B7FE8]">AI Prompts</span>
          </h1>

          <p className="text-sm sm:text-base text-[#D8D2FA]/80 leading-relaxed font-medium">
            Browse domain-specific prompt templates engineered for Web Development, AI Agents, Interview Prep, Resume Optimization, and Algorithm problem solving.
          </p>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="bg-white rounded-3xl p-4 border border-[#E8E3FF] shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7FE8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompt domain categories..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#6B6785]">
          <span>Total Domains:</span>
          <span className="bg-[#F5F2FF] text-[#8B7FE8] px-3 py-1 rounded-full border border-[#E8E3FF]">
            {categories.length} Categories
          </span>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
          {error}
        </div>
      )}

      {/* TASK 14: LOADING SKELETON STATE */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-[#E8E3FF] shadow-soft space-y-4 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F5F2FF]" />
                <div className="w-20 h-6 rounded-full bg-[#F5F2FF]" />
              </div>
              <div className="h-5 bg-[#F5F2FF] rounded-full w-2/3" />
              <div className="h-3 bg-[#F5F2FF] rounded-full w-full" />
              <div className="h-3 bg-[#F5F2FF] rounded-full w-4/5" />
              <div className="pt-4 border-t border-[#F5F2FF] flex justify-between">
                <div className="h-4 bg-[#F5F2FF] rounded-full w-1/3" />
                <div className="h-4 bg-[#F5F2FF] rounded-full w-6" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* TASK 13: POLISHED EMPTY STATES */}
          {categories.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-[#E8E3FF] text-center shadow-soft">
              <FolderOpen className="w-14 h-14 text-[#8B7FE8]/50 mx-auto mb-3" />
              <p className="text-base font-extrabold text-[#1E1B2E]">No Categories Found</p>
              <p className="text-xs text-[#6B6785] mt-1 max-w-md mx-auto">
                No prompt categories are currently available in the library. Please check back later.
              </p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-[#E8E3FF] text-center shadow-soft">
              <SearchX className="w-14 h-14 text-[#8B7FE8]/50 mx-auto mb-3" />
              <p className="text-base font-extrabold text-[#1E1B2E]">No Search Results</p>
              <p className="text-xs text-[#6B6785] mt-1 max-w-md mx-auto">
                No categories matched your search term "{searchQuery.trim()}".
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((cat) => {
                const promptCount = cat._count?.prompts ?? 0;
                const IconComponent = getCategoryIcon(cat.name);

                return (
                  <Link
                    key={cat.id}
                    href={`/dashboard/prompt-library/${cat.id}`}
                    className="group bg-white rounded-3xl p-6 border border-[#E8E3FF] shadow-soft hover:shadow-soft-lg hover:border-[#8B7FE8] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Top ambient highlight glow on hover */}
                    <div className="pointer-events-none absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#8B7FE8]/10 group-hover:scale-150 transition-transform duration-500 blur-xl" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8] group-hover:bg-[#8B7FE8] group-hover:text-white transition-colors duration-300 shadow-soft-sm">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-extrabold text-[#8B7FE8] bg-[#F5F2FF] px-3 py-1 rounded-full border border-[#E8E3FF]">
                          {promptCount} {promptCount === 1 ? "Prompt" : "Prompts"}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-[#1E1B2E] group-hover:text-[#8B7FE8] transition-colors">
                        {cat.name}
                      </h3>

                      <p className="text-xs text-[#6B6785] mt-2 line-clamp-2 leading-relaxed">
                        {cat.description || "Collection of production-ready prompts for this category domain."}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#F5F2FF] flex items-center justify-between text-xs font-extrabold text-[#8B7FE8]">
                      <span>Explore Domain Prompts</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
