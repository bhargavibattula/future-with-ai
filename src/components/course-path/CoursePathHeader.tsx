"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Clock, BarChart3, Calendar, ChevronRight, BookOpen, Star } from "lucide-react";
import { DetailedCoursePath } from "@/data/coursePathData";

interface CoursePathHeaderProps {
  data: DetailedCoursePath;
}

export default function CoursePathHeader({ data }: CoursePathHeaderProps) {
  const { course, fullTitle, lastUpdated, level, progressPercent } = data;
  const Logo = course.LogoComponent;

  return (
    <div className="w-full relative mb-8">
      {/* BREADCRUMB NAVIGATION */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-[#6B6785] mb-4">
        <Link href="/" className="hover:text-[#8B7FE8] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4BDFA]" />
        <Link href="/#explore" className="hover:text-[#8B7FE8] transition-colors">
          Courses
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C4BDFA]" />
        <span className="text-[#1E1B2E] font-bold">{course.title}</span>
      </nav>

      {/* GLASS COURSE HEADER CARD */}
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#F5F2FF] via-[#FFFFFF] to-[#F8F9FC] border border-[#E8E3FF] backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-soft overflow-hidden">
        {/* Soft Ambient Background Glow Blobs */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#8B7FE8]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#74D99F]/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#8B7FE8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-8">
          {/* LEFT: 3D Glossy Icon Tile & Title Specs */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left flex-1">
            {/* 3D Glossy Cube Tile */}
            <div
              className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center select-none transition-transform hover:scale-105"
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
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                }}
              />
              <div className="relative z-10 drop-shadow-md">
                <Logo className="w-13 h-13 sm:w-14 sm:h-14" />
              </div>
            </div>

            {/* Course Details Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC]">
                  <Sparkles className="w-3 h-3 text-[#8B7FE8]" />
                  {course.badge}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#F5F2FF] text-[#8B7FE8] border border-[#E8E3FF]">
                  <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
                  {course.rating} Rating
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
                {course.title} <span className="text-[#8B7FE8]">Learning Path</span>
              </h1>

              <p className="text-sm sm:text-base text-[#6B6785] font-medium leading-relaxed max-w-2xl mb-4">
                {course.description}
              </p>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-bold text-[#6B6785]">
                <div className="flex items-center gap-1.5 bg-white/80 border border-[#E8E3FF] px-3 py-1.5 rounded-full shadow-soft-sm">
                  <Clock className="w-4 h-4 text-[#8B7FE8]" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 border border-[#E8E3FF] px-3 py-1.5 rounded-full shadow-soft-sm">
                  <BarChart3 className="w-4 h-4 text-[#74D99F]" />
                  <span>{level}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 border border-[#E8E3FF] px-3 py-1.5 rounded-full shadow-soft-sm">
                  <Calendar className="w-4 h-4 text-[#8B7FE8]" />
                  <span>Updated {lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: OVERALL PROGRESS RING */}
          <div className="shrink-0 flex flex-col items-center justify-center bg-white/90 border border-[#E8E3FF] rounded-3xl p-5 shadow-soft min-w-[160px]">
            <div className="relative w-24 h-24 flex items-center justify-center mb-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                {/* Background Circle Track */}
                <path
                  className="text-[#E8E3FF]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Completed Mint Arc */}
                <path
                  className="text-[#74D99F] transition-all duration-1000 ease-out"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-[#1E1B2E]">
                  {progressPercent}%
                </span>
                <span className="text-[10px] font-bold text-[#6B6785] uppercase tracking-wider">
                  Progress
                </span>
              </div>
            </div>

            <span className="text-xs font-bold text-[#6B6785] text-center">
              {data.completedModulesCount} of {data.totalModulesCount} Modules
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
