"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  FolderArchive,
  MessageSquare,
  Sparkles,
  Award,
  Zap,
  ArrowRight,
  Star,
  Clock,
  Download,
  ExternalLink,
} from "lucide-react";
import { DetailedCoursePath, CourseResource, CourseBadge } from "@/data/coursePathData";
import { COURSES } from "@/data/courses";

interface CoursePathBottomSectionsProps {
  data: DetailedCoursePath;
}

export default function CoursePathBottomSections({ data }: CoursePathBottomSectionsProps) {
  // Find recommended course object
  const recommendedCourse =
    COURSES.find((c) => c.id.replace("course-", "") === data.recommendedSlug) ||
    COURSES[1];
  const RecommendedLogo = recommendedCourse.LogoComponent;

  return (
    <div className="w-full space-y-12 mt-16 pt-12 border-t border-[#E8E3FF]">
      {/* 1. COURSE RESOURCES SECTION */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#1E1B2E] tracking-tight">
              Course <span className="text-[#8B7FE8]">Resources</span>
            </h3>
            <p className="text-xs text-[#6B6785] font-medium">
              Supplementary learning materials, templates, and downloadable assets.
            </p>
          </div>
        </div>

        {/* 4 Soft Glass Resource Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.resources.map((res) => {
            let icon = <FileText className="w-5 h-5 text-[#8B7FE8]" />;
            let badgeBg = "bg-[#F5F2FF] text-[#8B7FE8] border-[#E8E3FF]";

            if (res.type === "notes") {
              icon = <BookOpen className="w-5 h-5 text-[#74D99F]" />;
              badgeBg = "bg-[#E6F9F0] text-[#0E8566] border-[#9DD9C5]";
            } else if (res.type === "files") {
              icon = <FolderArchive className="w-5 h-5 text-[#8FD8FF]" />;
              badgeBg = "bg-[#EBF8FF] text-[#2B6CB0] border-[#BEE3F8]";
            } else if (res.type === "community") {
              icon = <MessageSquare className="w-5 h-5 text-[#F8AFCB]" />;
              badgeBg = "bg-[#FFF0F5] text-[#C0336A] border-[#FFC9DE]";
            }

            return (
              <div
                key={res.id}
                className="w-full rounded-2xl bg-white/80 backdrop-blur-md border border-[#E8E3FF] p-5 shadow-soft-sm hover:border-[#8B7FE8]/50 hover:shadow-soft transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${badgeBg}`}
                    >
                      {icon}
                    </div>
                    <span className="text-[10px] font-bold text-[#6B6785] bg-[#F8F9FC] border border-[#E8E3FF] px-2.5 py-1 rounded-full">
                      {res.sizeOrMeta}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-[#1E1B2E] tracking-tight group-hover:text-[#8B7FE8] transition-colors mb-1.5 line-clamp-1">
                    {res.title}
                  </h4>

                  <p className="text-xs text-[#6B6785] font-medium leading-relaxed mb-4 line-clamp-2">
                    {res.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#F5F2FF] text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white border border-[#E8E3FF] transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{res.linkText}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ACHIEVEMENTS & BADGES SECTION */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] border border-[#FFC9DE] flex items-center justify-center text-[#C0336A]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#1E1B2E] tracking-tight">
              Earned <span className="text-[#8B7FE8]">Badges & Milestones</span>
            </h3>
            <p className="text-xs text-[#6B6785] font-medium">
              Collect achievements as you progress through interactive modules.
            </p>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.badges.map((badge) => (
            <div
              key={badge.id}
              className={`w-full rounded-2xl p-5 border flex items-center gap-4 transition-all duration-300 ${
                badge.unlocked
                  ? "bg-white border-[#E8E3FF] shadow-soft-sm hover:scale-[1.02]"
                  : "bg-[#F8F9FC]/60 border-[#E8E3FF] opacity-60"
              }`}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm"
                style={{
                  backgroundColor: badge.bgColor,
                  borderColor: badge.borderColor,
                  color: badge.textColor,
                }}
              >
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h4 className="text-sm font-extrabold text-[#1E1B2E]">
                    {badge.name}
                  </h4>
                  {badge.unlocked ? (
                    <span className="text-[9px] font-extrabold bg-[#E6F9F0] text-[#0E8566] px-2 py-0.5 rounded-full border border-[#9DD9C5]">
                      Earned
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold bg-[#F5F2FF] text-[#8B7FE8] px-2 py-0.5 rounded-full border border-[#E8E3FF]">
                      Locked
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B6785] font-medium leading-snug line-clamp-2">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. RECOMMENDED NEXT COURSE (Large Premium Glass Card) */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-[#E6F9F0] border border-[#9DD9C5] flex items-center justify-center text-[#0E8566]">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#1E1B2E] tracking-tight">
              Recommended <span className="text-[#8B7FE8]">Next Course</span>
            </h3>
            <p className="text-xs text-[#6B6785] font-medium">
              Continue your AI learning trajectory with this curated next step.
            </p>
          </div>
        </div>

        {/* Large Premium Card */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#F5F2FF] via-[#FFFFFF] to-[#F8F9FC] border border-[#E8E3FF] p-6 sm:p-8 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#8B7FE8]/15 blur-3xl" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* 3D Tile */}
            <div
              className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center select-none shadow-soft"
              style={{
                background: recommendedCourse.tileBg,
                boxShadow: `${recommendedCourse.tileShadow}`,
              }}
            >
              <RecommendedLogo className="w-11 h-11" />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC]">
                  {recommendedCourse.badge}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-[#6B6785]">
                  <Star className="w-3.5 h-3.5 fill-[#8B7FE8] text-[#8B7FE8]" />
                  {recommendedCourse.rating}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-[#6B6785]">
                  <Clock className="w-3.5 h-3.5 text-[#8B7FE8]" />
                  {recommendedCourse.duration}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold text-[#1E1B2E] tracking-tight group-hover:text-[#8B7FE8] transition-colors mb-1">
                {recommendedCourse.title} Learning Path
              </h4>

              <p className="text-xs sm:text-sm text-[#6B6785] font-medium leading-relaxed max-w-xl">
                {recommendedCourse.description}
              </p>
            </div>
          </div>

          <Link
            href={`/courses/${recommendedCourse.id.replace("course-", "")}`}
            className="shrink-0 w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <span>View Learning Path</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
