"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  BookOpen,
  Copy,
  Check,
  Zap,
  Sparkles,
  Lock,
  Play,
  Award,
  ChevronLeft,
  Share2
} from "lucide-react";
import { CourseModule, CourseLesson, LessonContentSection } from "@/data/coursePathData";
import { motion, AnimatePresence } from "framer-motion";

interface CourseLessonModalProps {
  module: CourseModule | null;
  lesson: CourseLesson | null;
  onClose: () => void;
  onMarkComplete: (moduleId: string, lessonId: string) => void;
  onNavigateLesson: (nextLesson: CourseLesson) => void;
}

export default function CourseLessonModal({
  module,
  lesson,
  onClose,
  onMarkComplete,
  onNavigateLesson,
}: CourseLessonModalProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (target) {
        const totalHeight = target.scrollHeight - target.clientHeight;
        if (totalHeight > 0) {
          const progress = Math.min(100, Math.max(0, (target.scrollTop / totalHeight) * 100));
          setScrollProgress(progress);
        }
      }
    };

    const container = document.getElementById("lesson-scroll-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [lesson]);

  if (!module || !lesson) return null;

  const currentLessonIndex = module.lessons.findIndex((l) => l.id === lesson.id);
  const previousLesson = currentLessonIndex > 0 ? module.lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < module.lessons.length - 1 ? module.lessons[currentLessonIndex + 1] : null;

  const handleCopy = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(codeText);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1E1B2E]/60 backdrop-blur-lg"
          onClick={onClose}
        />

        {/* Fullscreen Reading Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-6xl h-[92vh] rounded-3xl bg-white dark:bg-[#151322] border border-[#E8E3FF] dark:border-[#2A2640] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Top Reading Progress Bar */}
          <div className="w-full h-1.5 bg-[#E8E3FF] dark:bg-[#2A2640] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8B7FE8] to-[#74D99F] transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Top Navbar Header */}
          <div className="px-6 py-4 border-b border-[#E8E3FF] dark:border-[#2A2640] flex items-center justify-between bg-white/80 dark:bg-[#151322]/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-[#F5F2FF] dark:bg-[#252136] border border-[#E8E3FF] dark:border-[#3A3554] text-xs font-extrabold text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Roadmap</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#6B6785] dark:text-[#A9A4C0]">
                <span>{module.subtitle}</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#1E1B2E] dark:text-white font-bold truncate max-w-[200px]">
                  {lesson.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-[#E6F9F0] text-[#0E8566] border border-[#9DD9C5]">
                <Zap className="w-3.5 h-3.5 fill-[#0E8566]" />
                +{lesson.xpReward || 50} XP
              </span>

              {lesson.completed ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E6F9F0] text-[#0E8566] border border-[#9DD9C5] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onMarkComplete(module.id, lesson.id)}
                  className="px-4 py-1.5 rounded-xl text-xs font-extrabold bg-[#8B7FE8] hover:bg-[#786BD6] text-white shadow-soft-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Mark Complete</span>
                </button>
              )}
            </div>
          </div>

          {/* TWO COLUMN READING LAYOUT */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* LEFT SIDEBAR: LESSON NAVIGATION (3 Columns) */}
            <div className="hidden lg:block lg:col-span-3 border-r border-[#E8E3FF] dark:border-[#2A2640] bg-[#F8F9FC] dark:bg-[#1A1726] p-5 overflow-y-auto font-sans">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#6B6785] dark:text-[#A9A4C0] mb-3">
                Module Content ({module.lessons.length})
              </h4>

              <div className="space-y-2 mb-6">
                {module.lessons.map((les, idx) => {
                  const isActive = les.id === lesson.id;
                  return (
                    <button
                      key={les.id}
                      type="button"
                      disabled={les.locked}
                      onClick={() => onNavigateLesson(les)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                        isActive
                          ? "bg-white dark:bg-[#252136] border-[#8B7FE8] shadow-sm cursor-pointer"
                          : les.locked
                          ? "bg-[#F5F2FF]/40 dark:bg-[#13111C]/40 border-transparent opacity-50 cursor-not-allowed"
                          : "bg-white/60 dark:bg-[#201D30]/60 border-[#E8E3FF] dark:border-[#2A2640] hover:border-[#8B7FE8]/50 cursor-pointer"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          les.completed
                            ? "bg-[#E6F9F0] text-[#0E8566]"
                            : isActive
                            ? "bg-[#8B7FE8] text-white"
                            : "bg-[#E8E3FF] text-[#8B7FE8]"
                        }`}
                      >
                        {les.completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span
                          className={`text-xs font-bold block truncate ${
                            isActive
                              ? "text-[#8B7FE8]"
                              : "text-[#1E1B2E] dark:text-white"
                          }`}
                        >
                          {les.title}
                        </span>
                        <span className="text-[10px] font-medium text-[#6B6785] dark:text-[#A9A4C0]">
                          {les.estimatedDuration}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progress Summary Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#201D30] border border-[#E8E3FF] dark:border-[#2A2640]">
                <div className="flex items-center justify-between text-xs font-extrabold text-[#1E1B2E] dark:text-white mb-2">
                  <span>Module Progress</span>
                  <span>{module.completionPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-[#E8E3FF] dark:bg-[#2A2640] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#74D99F] transition-all duration-500"
                    style={{ width: `${module.completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT MAIN READING CANVAS (9 Columns) */}
            <div
              id="lesson-scroll-container"
              className="col-span-1 lg:col-span-9 h-full overflow-y-auto p-6 sm:p-10 md:p-12 space-y-8 bg-white dark:bg-[#151322]"
            >
              {/* Header Title Section */}
              <div className="border-b border-[#E8E3FF] dark:border-[#2A2640] pb-6">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#8B7FE8] mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{module.title}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-[#1E1B2E] dark:text-white tracking-tight mb-3">
                  {lesson.title}
                </h1>

                <p className="text-sm sm:text-base text-[#6B6785] dark:text-[#B3B3B3] font-medium leading-relaxed mb-4">
                  {lesson.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-bold text-[#6B6785] dark:text-[#A9A4C0]">
                  <span className="flex items-center gap-1 bg-[#F8F9FC] dark:bg-[#252136] px-3 py-1.5 rounded-full border border-[#E8E3FF] dark:border-[#3A3554]">
                    <Clock className="w-3.5 h-3.5 text-[#8B7FE8]" />
                    Est. Reading time: {lesson.readingTimeMinutes || 5} mins
                  </span>
                  <span className="flex items-center gap-1 bg-[#F8F9FC] dark:bg-[#252136] px-3 py-1.5 rounded-full border border-[#E8E3FF] dark:border-[#3A3554]">
                    <Sparkles className="w-3.5 h-3.5 text-[#74D99F]" />
                    Interactive Premium Guide
                  </span>
                </div>
              </div>

              {/* RICH READING CONTENT SECTIONS */}
              {lesson.contentSections && lesson.contentSections.length > 0 ? (
                <div className="space-y-6 text-[#1E1B2E] dark:text-[#E2DEF5]">
                  {lesson.contentSections.map((sec, idx) => {
                    if (sec.type === "heading") {
                      return (
                        <h2
                          key={idx}
                          className="text-xl sm:text-2xl font-extrabold text-[#1E1B2E] dark:text-white tracking-tight pt-4 border-t border-[#E8E3FF]/60 dark:border-[#2A2640]"
                        >
                          {sec.title}
                        </h2>
                      );
                    }

                    if (sec.type === "paragraph") {
                      return (
                        <p
                          key={idx}
                          className="text-sm sm:text-base text-[#4A4660] dark:text-[#C5C0E0] leading-relaxed font-normal whitespace-pre-line"
                        >
                          {sec.content}
                        </p>
                      );
                    }

                    if (sec.type === "callout" || sec.type === "note" || sec.type === "tip" || sec.type === "warning" || sec.type === "example") {
                      let borderGrad = "border-[#8B7FE8] bg-[#F5F2FF] dark:bg-[#1E1A30]";
                      if (sec.variant === "tip" || sec.type === "tip") borderGrad = "border-[#74D99F] bg-[#E6F9F0] dark:bg-[#0E2C20]";
                      if (sec.variant === "warning" || sec.type === "warning") borderGrad = "border-[#FFC9DE] bg-[#FFF0F5] dark:bg-[#301622]";

                      return (
                        <div
                          key={idx}
                          className={`p-5 rounded-2xl border-l-4 ${borderGrad} space-y-1.5 shadow-sm`}
                        >
                          {sec.title && (
                            <h4 className="text-sm font-extrabold text-[#1E1B2E] dark:text-white flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-[#8B7FE8]" />
                              {sec.title}
                            </h4>
                          )}
                          <p className="text-xs sm:text-sm text-[#4A4660] dark:text-[#D4CFED] font-medium leading-relaxed whitespace-pre-line">
                            {sec.content}
                          </p>
                        </div>
                      );
                    }

                    if (sec.type === "code") {
                      return (
                        <div key={idx} className="rounded-2xl bg-[#13111C] border border-[#2A2640] overflow-hidden shadow-lg">
                          <div className="px-4 py-2.5 bg-[#1A1726] border-b border-[#2A2640] flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-[#8B7FE8]">
                              {sec.title || sec.language || "Code Example"}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(sec.code || "")}
                              className="px-2.5 py-1 rounded-lg bg-[#252136] hover:bg-[#3A3554] text-[11px] font-bold text-white transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              {copiedCode === sec.code ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-[#74D99F]" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy Code</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-[#E2DEF5] leading-relaxed">
                            <code>{sec.code}</code>
                          </pre>
                        </div>
                      );
                    }

                    if (sec.type === "table" && sec.tableHeaders && sec.tableRows) {
                      return (
                        <div key={idx} className="overflow-x-auto rounded-2xl border border-[#E8E3FF] dark:border-[#2A2640] shadow-sm">
                          <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="bg-[#F5F2FF] dark:bg-[#1E1A30] text-[#1E1B2E] dark:text-white font-extrabold border-b border-[#E8E3FF] dark:border-[#2A2640]">
                              <tr>
                                {sec.tableHeaders.map((th, hIdx) => (
                                  <th key={hIdx} className="p-3.5">{th}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E3FF] dark:divide-[#2A2640]">
                              {sec.tableRows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-[#F8F9FC] dark:hover:bg-[#1A1726]">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-3.5 text-[#4A4660] dark:text-[#C5C0E0] font-medium">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#F5F2FF] dark:bg-[#1E1A30] text-sm text-[#4A4660] leading-relaxed">
                  {lesson.description}
                </div>
              )}

              {/* BOTTOM NAVIGATION FOOTER */}
              <div className="pt-8 border-t border-[#E8E3FF] dark:border-[#2A2640] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {previousLesson && !previousLesson.locked ? (
                    <button
                      type="button"
                      onClick={() => onNavigateLesson(previousLesson)}
                      className="px-4 py-2.5 rounded-2xl text-xs font-extrabold bg-[#F5F2FF] dark:bg-[#252136] text-[#8B7FE8] border border-[#E8E3FF] dark:border-[#3A3554] hover:opacity-80 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Prev: {previousLesson.title}</span>
                    </button>
                  ) : <div />}
                </div>

                <div className="flex items-center gap-3">
                  {!lesson.completed && (
                    <button
                      type="button"
                      onClick={() => onMarkComplete(module.id, lesson.id)}
                      className="px-5 py-3 rounded-2xl text-xs font-extrabold bg-[#8B7FE8] hover:bg-[#786BD6] text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Mark Lesson Complete</span>
                    </button>
                  )}

                  {nextLesson && !nextLesson.locked && (
                    <button
                      type="button"
                      onClick={() => onNavigateLesson(nextLesson)}
                      className="px-5 py-3 rounded-2xl text-xs font-extrabold bg-[#74D99F] hover:bg-[#52C582] text-[#0E8566] shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Next Lesson</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
