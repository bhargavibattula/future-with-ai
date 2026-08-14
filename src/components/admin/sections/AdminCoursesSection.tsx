"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Grid,
  List,
  Sparkles,
  Clock,
  Star,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Eye,
  CheckCircle,
} from "lucide-react";
import { COURSES, AICourse } from "@/data/courses";

export default function AdminCoursesSection() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [coursesList, setCoursesList] = useState<AICourse[]>(COURSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);

  // New Course Form State
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const filteredCourses = coursesList.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDuplicate = (course: AICourse) => {
    const dup: AICourse = {
      ...course,
      id: `${course.id}-copy-${Date.now()}`,
      title: `${course.title} (Copy)`,
    };
    setCoursesList([dup, ...coursesList]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this course from catalog?")) {
      setCoursesList((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight">
            Course <span className="text-[#8B7FE8]">Catalog Studio</span>
          </h2>
          <p className="text-xs text-[#6B6785] font-medium">
            Manage interactive AI tool pathways, 3D tiles, modules, and publishing rules.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateDrawer(true)}
          className="px-4 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* SEARCH & VIEW CONTROLS */}
      <div className="bg-white rounded-3xl p-4 border border-[#E8E3FF] shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7FE8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search course title..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-xl border transition-colors ${
              viewMode === "grid"
                ? "bg-[#8B7FE8] text-white border-[#8B7FE8]"
                : "bg-[#F5F2FF] text-[#8B7FE8] border-[#E8E3FF]"
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-xl border transition-colors ${
              viewMode === "list"
                ? "bg-[#8B7FE8] text-white border-[#8B7FE8]"
                : "bg-[#F5F2FF] text-[#8B7FE8] border-[#E8E3FF]"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const Logo = course.LogoComponent;
            return (
              <div
                key={course.id}
                className="rounded-3xl bg-white border border-[#E8E3FF] shadow-soft hover:shadow-soft-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Tile Header */}
                <div
                  className={`h-40 w-full bg-gradient-to-b ${course.gradient} flex items-center justify-center p-4 relative border-b border-[#E8E3FF]`}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
                    style={{ background: course.tileBg }}
                  >
                    <Logo className="w-10 h-10" />
                  </div>

                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FFC9DE] text-[#1E1B2E] border border-[#FFB0CC]">
                    {course.badge}
                  </span>

                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#1E1B2E] border border-[#E8E3FF] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8B7FE8]" />
                    {course.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-lg font-extrabold text-[#1E1B2E] group-hover:text-[#8B7FE8] transition-colors">
                        {course.title}
                      </h3>
                      <span className="flex items-center gap-1 text-xs font-bold text-[#1E1B2E] bg-[#F5F2FF] px-2 py-0.5 rounded-full border border-[#E8E3FF]">
                        <Star className="w-3 h-3 fill-[#8B7FE8] text-[#8B7FE8]" />
                        {course.rating}
                      </span>
                    </div>

                    <p className="text-xs text-[#6B6785] font-medium line-clamp-2 leading-relaxed mb-4">
                      {course.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#E8E3FF] flex items-center justify-between text-xs font-bold">
                    <span className="text-[#0E8566] bg-[#E6F9F0] px-2.5 py-0.5 rounded-full border border-[#9DD9C5]">
                      Published
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDuplicate(course)}
                        className="p-1.5 rounded-xl hover:bg-[#F5F2FF] text-[#8B7FE8]"
                        title="Duplicate Course"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-1.5 rounded-xl hover:bg-red-50 text-red-500"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-3xl border border-[#E8E3FF] shadow-soft overflow-hidden">
          <div className="divide-y divide-[#E8E3FF]">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-[#F5F2FF]/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: course.tileBg }}
                  >
                    <course.LogoComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#1E1B2E]">
                      {course.title}
                    </h4>
                    <span className="text-xs text-[#6B6785] font-medium line-clamp-1">
                      {course.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#6B6785]">
                    {course.duration} • Rating {course.rating}
                  </span>
                  <button
                    onClick={() => handleDuplicate(course)}
                    className="p-2 rounded-xl bg-[#F5F2FF] text-[#8B7FE8]"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE COURSE DRAWER */}
      {showCreateDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#1E1B2E]/40 backdrop-blur-md">
          <div className="bg-white border-l border-[#E8E3FF] w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-[#1E1B2E]">
                  Create New AI Course
                </h3>
                <button
                  onClick={() => setShowCreateDrawer(false)}
                  className="text-[#6B6785] hover:text-[#1E1B2E]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-extrabold text-[#1E1B2E] block mb-1">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. DeepSeek AI Mastery"
                    className="w-full p-3 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#1E1B2E] block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Brief course summary..."
                    className="w-full p-3 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E3FF]">
              <button
                type="button"
                onClick={() => {
                  if (newTitle) {
                    setCoursesList([
                      {
                        id: `course-${Date.now()}`,
                        title: newTitle,
                        description: newDesc || "Newly added AI tool course.",
                        tags: ["New", "AI", "Mastery"],
                        badge: "New",
                        rating: 5.0,
                        duration: "3.0 hrs",
                        LogoComponent: Sparkles,
                        gradient: "from-[#F5F2FF] to-[#FFFFFF]",
                        accentColor: "#8B7FE8",
                        glowColor: "rgba(139,127,232,0.25)",
                        tileBg: "linear-gradient(145deg, #8B7FE8, #786BD6)",
                        tileShadow: "0 10px 25px rgba(139,127,232,0.3)",
                      },
                      ...coursesList,
                    ]);
                    setShowCreateDrawer(false);
                    setNewTitle("");
                    setNewDesc("");
                  }
                }}
                className="w-full py-3 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6]"
              >
                Publish Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
