"use client";

import DashboardCourseGrid from "@/components/DashboardCourseGrid";
import { Sparkles } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F0FE] border border-[#EAE6FE] text-xs font-bold text-[#8B7FE8] mb-4 shadow-soft-sm self-start">
          <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
          <span>All AI Courses</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B2E] tracking-tight mb-4">
          Explore AI Courses
        </h1>
        <p className="text-base text-[#6B6785] max-w-lg">
          Browse all our interactive AI courses. Filter by tags or search for specific tools to find your next learning path.
        </p>
      </div>

      <DashboardCourseGrid />
    </div>
  );
}
