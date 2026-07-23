"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Search, Sparkles, BookOpen, Star, Clock, ArrowRight } from "lucide-react";
import { COURSES, AICourse } from "@/data/courses";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Reuse the CourseVisualHeader component for consistency
import Link from "next/link";

function CourseVisualHeader({ course }: { course: AICourse }) {
  const Logo = course.LogoComponent;
  return (
    <div className={`relative h-44 w-full overflow-hidden bg-gradient-to-b ${course.gradient} flex items-center justify-center p-6 border-b border-[#EAE6FE]`}>
      <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/50 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#8B7FE8]/25 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1E1B2E_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05] pointer-events-none" />
      
      <div className="absolute bottom-6 w-24 h-4 rounded-full bg-black/20 blur-md pointer-events-none transition-transform duration-300 group-hover:scale-90 opacity-70" />

      <div
        className="relative z-10 w-24 h-24 rounded-[24px] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105 select-none"
        style={{
          background: course.tileBg,
          boxShadow: `${course.tileShadow}, inset 0 2px 5px rgba(255, 255, 255, 0.7), inset 0 -3px 6px rgba(0, 0, 0, 0.25)`,
          borderTop: "2px solid rgba(255, 255, 255, 0.65)",
          borderLeft: "2px solid rgba(255, 255, 255, 0.65)",
          borderBottom: "2px solid rgba(0, 0, 0, 0.25)",
          borderRight: "2px solid rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          className="absolute inset-0 rounded-[24px] pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
        />
        <div className="relative z-10 drop-shadow-md">
          <Logo className="w-12 h-12" />
        </div>
      </div>

      <div className="absolute top-3.5 left-3.5 z-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC] shadow-sm">
          <Sparkles className="w-3 h-3 text-[#8B7FE8]" />
          {course.badge}
        </span>
      </div>

      <div className="absolute top-3.5 right-3.5 z-20">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#1E1B2E] backdrop-blur-md border border-[#EAE6FE]">
          <Clock className="w-3 h-3 text-[#8B7FE8]" />
          {course.duration}
        </span>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: AICourse }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="course-card relative group transition-all duration-300 ease-out bg-white rounded-3xl border border-[#EAE6FE] overflow-hidden flex flex-col h-full"
      style={{
        transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
        boxShadow: isHovered
          ? "0 18px 40px rgba(139, 127, 232, 0.16)"
          : "0 8px 30px rgba(139, 127, 232, 0.05)",
      }}
    >
      <CourseVisualHeader course={course} />
      
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-extrabold text-[#1E1B2E] tracking-tight group-hover:text-[#8B7FE8] transition-colors">
              {course.title}
            </h3>
            <div className="flex items-center gap-1 bg-[#F3F0FE] border border-[#EAE6FE] px-2 py-0.5 rounded-full text-[11px] font-bold text-[#1E1B2E]">
              <Star className="w-3 h-3 fill-[#8B7FE8] text-[#8B7FE8]" />
              <span>{course.rating}</span>
            </div>
          </div>
          
          <p className="text-xs text-[#6B6785] leading-relaxed mb-4 line-clamp-2 font-medium">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#B8E8D8] text-[#1E1B2E] border border-[#9DD9C5]">
              {course.tags[0]}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D8D2FA] text-[#4B3FBF] border border-[#C4BDFA]">
              {course.tags[1]}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFF0F5] text-[#C0336A] border border-[#FFC9DE]">
              {course.tags[2]}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#EAE6FE] flex items-center justify-between mt-auto">
          <span className="text-[10px] font-bold text-[#6B6785] uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-[#8B7FE8]" />
            Interactive
          </span>
          <Link
            href={`/courses/${course.id.replace("course-", "")}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all active:scale-95 group/btn"
          >
            <span>Start</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DashboardCourseGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  // Extract all unique tags across courses for filtering
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    COURSES.forEach(c => c.tags.forEach(t => tagsSet.add(t)));
    return ["All", ...Array.from(tagsSet)].sort();
  }, []);

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag =
        activeTag === "All" || course.tags.includes(activeTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, activeTag]);

  // Entrance animation for cards
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".course-card");
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
        overwrite: true,
      }
    );
  }, [filteredCourses]);

  return (
    <div className="w-full">
      {/* Top Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 mb-8 border border-[#D8D2FA] shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7FE8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI courses..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#FCFBFF] border border-[#D8D2FA] focus:border-[#8B7FE8] focus:ring-4 focus:ring-[#D8D2FA]/50 text-[#1E1B2E] placeholder-[#6B6785] text-sm font-medium outline-none transition-all"
          />
        </div>
        
        {/* Scrollable tag filters */}
        <div className="flex-1 w-full overflow-x-auto pb-2 md:pb-0 scrollbar-none flex gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                activeTag === tag
                  ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                  : "bg-[#F3F0FE] text-[#6B6785] hover:text-[#1E1B2E] border border-[#EAE6FE]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Courses */}
      {filteredCourses.length > 0 ? (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 border border-[#EAE6FE] text-center max-w-md mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#FFF0F5] text-[#C0336A] flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1E1B2E] mb-2">No courses found</h3>
          <p className="text-sm text-[#6B6785] mb-6">
            We couldn&apos;t find any courses matching "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTag("All");
            }}
            className="text-sm font-bold text-[#8B7FE8] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
