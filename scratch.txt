"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  ChevronLeft,
  Award,
  HelpCircle
} from "lucide-react";
import {
  CourseModule,
  CourseLesson,
  getCoursePathData,
  getStoredUserProgress,
  saveUserProgress,
  UserCourseProgressState
} from "@/data/coursePathData";

interface CourseLessonClientProps {
  slug: string;
  lessonId: string;
}

export default function CourseLessonClient({ slug, lessonId }: CourseLessonClientProps) {
  const router = useRouter();
  const [progressState, setProgressState] = useState<UserCourseProgressState | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const saved = getStoredUserProgress(slug);
    setProgressState(saved);
  }, [slug]);

  const pathData = getCoursePathData(slug, progressState || undefined);

  // Find module & lesson
  let parentModule: CourseModule | null = null;
  let targetLesson: CourseLesson | null = null;

  for (const mod of pathData.modules) {
    const found = mod.lessons.find((l) => l.id === lessonId);
    if (found) {
      parentModule = mod;
      targetLesson = found;
      break;
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!parentModule || !targetLesson) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 text-center px-4">
          <h2 className="text-2xl font-extrabold mb-4">Lesson Not Found</h2>
          <p className="text-[#6B6785] mb-6">The requested lesson could not be loaded.</p>
          <Link
            href={`/courses/${slug}`}
            className="px-6 py-3 rounded-2xl bg-[#8B7FE8] text-white font-bold text-xs"
          >
            Return to Course Path
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentLessonIndex = parentModule.lessons.findIndex((l) => l.id === targetLesson.id);
  const previousLesson = currentLessonIndex > 0 ? parentModule.lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < parentModule.lessons.length - 1 ? parentModule.lessons[currentLessonIndex + 1] : null;

  const handleMarkComplete = () => {
    setProgressState((prev) => {
      const state = prev || getStoredUserProgress(slug);
      if (state.completedLessonIds.includes(lessonId)) return state;

      const updatedCompletedLessons = [...state.completedLessonIds, lessonId];
      let updatedCompletedModules = [...state.completedModuleIds];
      let bonusXp = 50;

      if (parentModule) {
        const allLessonsDone = parentModule.lessons.every(
          (l) => l.id === lessonId || updatedCompletedLessons.includes(l.id)
        );

        if (allLessonsDone && !parentModule.quiz && !updatedCompletedModules.includes(parentModule.id)) {
          updatedCompletedModules.push(parentModule.id);
          bonusXp += parentModule.xp;
        }
      }

      const newState: UserCourseProgressState = {
        ...state,
        completedLessonIds: updatedCompletedLessons,
        completedModuleIds: updatedCompletedModules,
        totalXp: state.totalXp + bonusXp,
        lastActiveDate: new Date().toISOString(),
      };

      saveUserProgress(slug, newState);
      return newState;
    });
  };

  const handleCopy = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(codeText);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans relative">
      {/* Top Fixed Reading Scroll Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-[#E8E3FF] dark:bg-[#2A2640]">
        <div
          className="h-full bg-gradient-to-r from-[#8B7FE8] to-[#74D99F] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />

      {/* Main Full Page Reading Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sticky Sub-Header Bar */}
        <div className="sticky top-20 z-40 mb-8 p-4 rounded-2xl bg-white/90 dark:bg-[#1A1726]/90 backdrop-blur-md border border-[#E8E3FF] dark:border-[#2A2640] shadow-soft flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/courses/${slug}`}
              className="px-3.5 py-2 rounded-xl bg-[#F5F2FF] dark:bg-[#252136] border border-[#E8E3FF] dark:border-[#3A3554] text-xs font-extrabold text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Roadmap</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-[#6B6785] dark:text-[#A9A4C0]">
              <span>{parentModule.subtitle}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#1E1B2E] dark:text-white font-bold truncate max-w-[300px]">
                {targetLesson.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-extrabold bg-[#E6F9F0] text-[#0E8566] border border-[#9DD9C5]">
              <Zap className="w-3.5 h-3.5 fill-[#0E8566]" />
              +{targetLesson.xpReward || 50} XP
            </span>

            {targetLesson.completed ? (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E6F9F0] text-[#0E8566] border border-[#9DD9C5] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Completed
              </span>
            ) : (
              <button
                type="button"
                onClick={handleMarkComplete}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#8B7FE8] hover:bg-[#786BD6] text-white shadow-soft-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Mark Complete</span>
              </button>
            )}
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT: Left Interactive Sidebar (30%) & Right Content Canvas (70%) */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          {/* LEFT SIDEBAR: Module Lessons Index */}
          <div className="lg:col-span-3 w-full sticky top-36 space-y-4">
            <div className="w-full rounded-3xl bg-white/80 dark:bg-[#1A1726]/80 backdrop-blur-xl border border-[#E8E3FF] dark:border-[#2A2640] p-5 shadow-soft">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#6B6785] dark:text-[#A9A4C0] mb-3">
                {parentModule.subtitle} ({parentModule.lessons.length} Lessons)
              </h4>

              <div className="space-y-2 mb-4">
                {parentModule.lessons.map((les, idx) => {
                  const isActive = les.id === targetLesson!.id;
                  return (
                    <button
                      key={les.id}
                      type="button"
                      disabled={les.locked}
                      onClick={() => router.push(`/courses/${slug}/lessons/${les.id}`)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                        isActive
                          ? "bg-[#F5F2FF] dark:bg-[#252136] border-[#8B7FE8] shadow-sm cursor-pointer"
                          : les.locked
                          ? "bg-[#F5F2FF]/40 dark:bg-[#13111C]/40 border-transparent opacity-50 cursor-not-allowed"
                          : "bg-white dark:bg-[#201D30] border-[#E8E3FF] dark:border-[#2A2640] hover:border-[#8B7FE8]/50 cursor-pointer"
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
                            isActive ? "text-[#8B7FE8]" : "text-[#1E1B2E] dark:text-white"
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

                {/* Direct Module Quiz Link */}
                {parentModule.quiz && (
                  <button
                    type="button"
                    onClick={() => router.push(`/courses/${slug}/quiz/${parentModule.id}`)}
                    className="w-full p-3 rounded-2xl border border-[#8B7FE8]/50 bg-gradient-to-r from-[#F5F2FF] to-[#FFFFFF] dark:from-[#252136] dark:to-[#1A1726] text-left transition-all flex items-center gap-2.5 cursor-pointer hover:border-[#8B7FE8]"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#8B7FE8] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      <HelpCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-[#8B7FE8] block truncate">
                        {parentModule.quiz.title}
                      </span>
                      <span className="text-[10px] font-medium text-[#6B6785] dark:text-[#A9A4C0]">
                        5 Questions • +100 XP
                      </span>
                    </div>
                  </button>
                )}
              </div>

              {/* Module Progress Ring Summary */}
              <div className="pt-3 border-t border-[#E8E3FF] dark:border-[#2A2640]">
                <div className="flex items-center justify-between text-xs font-extrabold text-[#1E1B2E] dark:text-white mb-1.5">
                  <span>Module Progress</span>
                  <span>{parentModule.completionPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-[#E8E3FF] dark:bg-[#2A2640] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#74D99F] transition-all duration-500"
                    style={{ width: `${parentModule.completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT MAIN READING CANVAS (70% Width) */}
          <div className="lg:col-span-7 w-full rounded-3xl bg-white dark:bg-[#1A1726] border border-[#E8E3FF] dark:border-[#2A2640] p-6 sm:p-10 md:p-12 shadow-soft space-y-8">
            {/* Header Title Section */}
            <div className="border-b border-[#E8E3FF] dark:border-[#2A2640] pb-6">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#8B7FE8] mb-2">
                <BookOpen className="w-4 h-4" />
                <span>{parentModule.title}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#1E1B2E] dark:text-white tracking-tight mb-3">
                {targetLesson.title}
              </h1>

              <p className="text-sm sm:text-base text-[#6B6785] dark:text-[#B3B3B3] font-medium leading-relaxed mb-4">
                {targetLesson.description}
              </p>

              <div className="flex items-center gap-4 text-xs font-bold text-[#6B6785] dark:text-[#A9A4C0]">
                <span className="flex items-center gap-1 bg-[#F8F9FC] dark:bg-[#252136] px-3 py-1.5 rounded-full border border-[#E8E3FF] dark:border-[#3A3554]">
                  <Clock className="w-3.5 h-3.5 text-[#8B7FE8]" />
                  Est. Reading time: {targetLesson.readingTimeMinutes || 5} mins
                </span>
                <span className="flex items-center gap-1 bg-[#F8F9FC] dark:bg-[#252136] px-3 py-1.5 rounded-full border border-[#E8E3FF] dark:border-[#3A3554]">
                  <Sparkles className="w-3.5 h-3.5 text-[#74D99F]" />
                  Interactive Premium Guide
                </span>
              </div>
            </div>

            {/* RICH READING CONTENT SECTIONS */}
            {targetLesson.contentSections && targetLesson.contentSections.length > 0 ? (
              <div className="space-y-6 text-[#1E1B2E] dark:text-[#E2DEF5]">
                {targetLesson.contentSections.map((sec, idx) => {
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
                {targetLesson.description}
              </div>
            )}

            {/* BOTTOM NAVIGATION FOOTER */}
            <div className="pt-8 border-t border-[#E8E3FF] dark:border-[#2A2640] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                {previousLesson && !previousLesson.locked ? (
                  <button
                    type="button"
                    onClick={() => router.push(`/courses/${slug}/lessons/${previousLesson.id}`)}
                    className="px-4 py-2.5 rounded-2xl text-xs font-extrabold bg-[#F5F2FF] dark:bg-[#252136] text-[#8B7FE8] border border-[#E8E3FF] dark:border-[#3A3554] hover:opacity-80 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev: {previousLesson.title}</span>
                  </button>
                ) : <div />}
              </div>

              <div className="flex items-center gap-3">
                {!targetLesson.completed && (
                  <button
                    type="button"
                    onClick={handleMarkComplete}
                    className="px-5 py-3 rounded-2xl text-xs font-extrabold bg-[#8B7FE8] hover:bg-[#786BD6] text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Mark Lesson Complete</span>
                  </button>
                )}

                {nextLesson && !nextLesson.locked ? (
                  <button
                    type="button"
                    onClick={() => router.push(`/courses/${slug}/lessons/${nextLesson.id}`)}
                    className="px-5 py-3 rounded-2xl text-xs font-extrabold bg-[#74D99F] hover:bg-[#52C582] text-[#0E8566] shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next Lesson</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                ) : parentModule.quiz ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleMarkComplete();
                      router.push(`/courses/${slug}/quiz/${parentModule.id}`);
                    }}
                    className="px-5 py-3 rounded-2xl text-xs font-extrabold bg-[#8B7FE8] hover:bg-[#786BD6] text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Take Module Quiz Now</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
