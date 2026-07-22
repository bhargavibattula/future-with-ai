"use client";

import { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal, Sparkles, RefreshCw } from "lucide-react";
import { AI_TOOLS, CATEGORIES, AITool } from "@/data/tools";
import ToolCard from "./ToolCard";

interface ToolGridProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onOpenModal: (tool: AITool) => void;
}

export default function ToolGrid({
  selectedCategory,
  onCategorySelect,
  onOpenModal,
}: ToolGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pricingFilter, setPricingFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"trending" | "rating" | "reviews">("trending");

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter((tool) => {
      // Category Filter
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;

      // Pricing Filter
      const matchesPricing =
        pricingFilter === "All" || tool.pricing === pricingFilter;

      // Search Query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tagline.toLowerCase().includes(query) ||
        tool.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesPricing && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      // Default: trending / featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, pricingFilter, searchQuery, sortBy]);

  return (
    <section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search & Filter Header Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6FE] shadow-soft-md mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Main Search Input Bar */}
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6785]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tool name, topic, capability, or tag..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE] focus:border-[#8B7FE8] focus:ring-4 focus:ring-[#D8D2FA]/50 text-[#1E1B2E] placeholder-[#6B6785] text-sm font-medium outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B6785] hover:text-[#1E1B2E] bg-[#D8D2FA]/50 px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Pricing & Sorting Selectors */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Pricing Select */}
            <div className="flex items-center gap-1.5 bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl px-3 py-2 text-xs font-semibold text-[#1E1B2E]">
              <Filter className="w-3.5 h-3.5 text-[#8B7FE8]" />
              <select
                value={pricingFilter}
                onChange={(e) => setPricingFilter(e.target.value)}
                aria-label="Filter by pricing model"
                className="bg-transparent text-[#1E1B2E] font-semibold outline-none cursor-pointer"
              >
                <option value="All">All Pricing</option>
                <option value="Free">Free Only</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl px-3 py-2 text-xs font-semibold text-[#1E1B2E]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B7FE8]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "trending" | "rating" | "reviews")}
                aria-label="Sort tools"
                className="bg-transparent text-[#1E1B2E] font-semibold outline-none cursor-pointer"
              >
                <option value="trending">Featured / Trending</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onCategorySelect("All")}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === "All"
                ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                : "bg-[#FCFBFF] text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#D8D2FA]/30 border border-[#EAE6FE]"
            }`}
          >
            All Categories ({AI_TOOLS.length})
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                    : "bg-[#FCFBFF] text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#D8D2FA]/30 border border-[#EAE6FE]"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#D8D2FA]/50 text-[#8B7FE8]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Results Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#8B7FE8]" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1B2E]">
            {selectedCategory === "All" ? "Featured AI Directory" : selectedCategory}
          </h2>
          <span className="bg-[#B8E8D8] text-[#1E1B2E] text-xs font-extrabold px-2.5 py-0.5 rounded-full ml-1">
            {filteredTools.length} results
          </span>
        </div>

        {(searchQuery || selectedCategory !== "All" || pricingFilter !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              onCategorySelect("All");
              setPricingFilter("All");
            }}
            className="text-xs font-bold text-[#8B7FE8] hover:text-[#786BD6] flex items-center gap-1 bg-[#F3F0FE] px-3 py-1.5 rounded-full transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        )}
      </div>

      {/* Tools Cards Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onOpenModal={onOpenModal} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-[#EAE6FE] text-center max-w-lg mx-auto shadow-soft-sm">
          <div className="w-16 h-16 rounded-full bg-[#FFC9DE]/60 text-[#1E1B2E] flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#1E1B2E] mb-2">No AI tools found</h3>
          <p className="text-sm text-[#6B6785] mb-6">
            We couldn&apos;t find any tools matching your search criteria. Try removing filters or searching for another term.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              onCategorySelect("All");
              setPricingFilter("All");
            }}
            className="bg-[#8B7FE8] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-soft-md"
          >
            Show All Tools
          </button>
        </div>
      )}
    </section>
  );
}
