"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Search, Filter, SlidersHorizontal, Sparkles, RefreshCw } from "lucide-react";
import { AI_TOOLS, CATEGORIES, AITool } from "@/data/tools";
import ToolCard from "./ToolCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const [visibleTools, setVisibleTools] = useState<AITool[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Refs for GSAP
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pillContainerRef = useRef<HTMLDivElement>(null);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const didMount = useRef(false);

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;
      const matchesPricing =
        pricingFilter === "All" || tool.pricing === pricingFilter;
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
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, pricingFilter, searchQuery, sortBy]);

  // GSAP: Scroll entrance — stagger cards in from below
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".tool-card");
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 28 });

    const triggers = ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
        });
      },
      start: "top 92%",
    }) as ScrollTrigger[];

    return () => {
      triggers.forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleTools]);

  // GSAP: Filter transition — animate out, swap, animate in
  const animateFilterChange = useCallback((incoming: AITool[]) => {
    const grid = gridRef.current;
    if (!grid || !didMount.current) {
      setVisibleTools(incoming);
      return;
    }

    const cards = grid.querySelectorAll<HTMLElement>(".tool-card");
    if (!cards.length) {
      setVisibleTools(incoming);
      return;
    }

    setIsFiltering(true);
    gsap.to(cards, {
      opacity: 0,
      scale: 0.96,
      duration: 0.18,
      stagger: 0.03,
      ease: "power1.in",
      onComplete: () => {
        setVisibleTools(incoming);
        setIsFiltering(false);
      },
    });
  }, []);

  // Update visible tools with animation on filter change
  useEffect(() => {
    if (!didMount.current) {
      setVisibleTools(filteredTools);
      didMount.current = true;
      return;
    }
    animateFilterChange(filteredTools);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTools]);

  // GSAP: Gliding active pill indicator
  const moveIndicatorToPill = useCallback((key: string) => {
    const pillEl = pillRefs.current.get(key);
    const indicator = activeIndicatorRef.current;
    if (!pillEl || !indicator) return;

    const pillRect = pillEl.getBoundingClientRect();
    const containerRect = pillContainerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const left = pillRect.left - containerRect.left;
    const width = pillRect.width;

    gsap.to(indicator, {
      x: left,
      width,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, []);

  // Move indicator on category change
  useEffect(() => {
    moveIndicatorToPill(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Position indicator on mount
  useEffect(() => {
    const timer = setTimeout(() => moveIndicatorToPill(selectedCategory), 80);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      id="explore"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden"
    >
      {/* Faint lavender radial blob behind entire section */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #D8D2FA 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 w-[350px] h-[350px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, #FFC9DE 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Search & Filter Header Container */}
      <div
        className="relative bg-white rounded-3xl p-6 sm:p-8 mb-10"
        style={{
          border: "1px solid #D8D2FA",
          boxShadow:
            "0 4px 24px rgba(139, 127, 232, 0.10), 0 1px 4px rgba(139, 127, 232, 0.06)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Input */}
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7FE8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tool name, topic, capability, or tag..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#FCFBFF] border border-[#D8D2FA] focus:border-[#8B7FE8] focus:ring-4 focus:ring-[#D8D2FA]/50 text-[#1E1B2E] placeholder-[#6B6785] text-sm font-medium outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8B7FE8] hover:text-[#1E1B2E] bg-[#D8D2FA]/50 px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Pricing & Sorting */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-1.5 bg-[#F3F0FE] border border-[#D8D2FA] rounded-2xl px-3 py-2 text-xs font-semibold text-[#1E1B2E]">
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

            <div className="flex items-center gap-1.5 bg-[#F3F0FE] border border-[#D8D2FA] rounded-2xl px-3 py-2 text-xs font-semibold text-[#1E1B2E]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B7FE8]" />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "trending" | "rating" | "reviews")
                }
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

        {/* Category Pills with Gliding Active Indicator */}
        <div
          ref={pillContainerRef}
          className="relative flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
        >
          {/* Gliding background indicator */}
          <div
            ref={activeIndicatorRef}
            className="absolute top-0 left-0 h-full rounded-full bg-[#8B7FE8] pointer-events-none"
            style={{ width: 0, zIndex: 0 }}
          />

          {/* "All" pill */}
          <button
            ref={(el) => { if (el) pillRefs.current.set("All", el); }}
            onClick={() => onCategorySelect("All")}
            className={`relative z-10 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-150 flex items-center gap-1.5 ${
              selectedCategory === "All"
                ? "text-white"
                : "text-[#8B7FE8] bg-[#D8D2FA]/40 border border-[#D8D2FA] hover:bg-[#D8D2FA]/60"
            }`}
          >
            All Categories
            <span
              className={`text-[10px] px-1.5 rounded-full font-bold ${
                selectedCategory === "All"
                  ? "bg-white/20 text-white"
                  : "bg-[#B8E8D8] text-[#1E1B2E]"
              }`}
            >
              {AI_TOOLS.length}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                ref={(el) => { if (el) pillRefs.current.set(cat.slug, el); }}
                onClick={() => onCategorySelect(cat.slug)}
                className={`relative z-10 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-150 flex items-center gap-1.5 ${
                  isSelected
                    ? "text-white"
                    : "text-[#8B7FE8] bg-[#D8D2FA]/40 border border-[#D8D2FA] hover:bg-[#D8D2FA]/60"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 rounded-full font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#B8E8D8] text-[#1E1B2E]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Section Header */}
      <div className="flex items-center justify-between mb-7">
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
            className="text-xs font-bold text-[#8B7FE8] hover:text-[#786BD6] flex items-center gap-1 bg-[#F3F0FE] px-3 py-1.5 rounded-full transition-colors border border-[#D8D2FA]"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        )}
      </div>

      {/* Tools Cards Grid */}
      {visibleTools.length > 0 ? (
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 transition-opacity duration-150 ${
            isFiltering ? "opacity-0" : "opacity-100"
          }`}
        >
          {visibleTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onOpenModal={onOpenModal} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-[#EAE6FE] text-center max-w-lg mx-auto"
          style={{ boxShadow: "0 8px 30px rgba(139, 127, 232, 0.08)" }}
        >
          <div className="w-16 h-16 rounded-full bg-[#FFC9DE]/60 text-[#1E1B2E] flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#1E1B2E] mb-2">No AI tools found</h3>
          <p className="text-sm text-[#6B6785] mb-6">
            We couldn&apos;t find any tools matching your search criteria. Try removing
            filters or searching for another term.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              onCategorySelect("All");
              setPricingFilter("All");
            }}
            className="bg-[#8B7FE8] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-soft-md hover:bg-[#786BD6] transition-colors"
          >
            Show All Tools
          </button>
        </div>
      )}
    </section>
  );
}
