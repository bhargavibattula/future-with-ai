"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  Play,
  Lock,
  Clock,
  Star,
  Sparkles,
  BookOpen,
  ChevronRight,
  HelpCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { CourseModule, CourseLesson, CourseQuiz } from "@/data/coursePathData";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface CourseModuleModalProps {
  module: CourseModule | null;
  onClose: () => void;
  onOpenLesson?: (module: CourseModule, lesson: CourseLesson) => void;
  onOpenQuiz?: (module: CourseModule, quiz: CourseQuiz) => void;
}

export default function CourseModuleModal({
  module,
  onClose,
}: CourseModuleModalProps) {
  const router = useRouter();
  if (!module) return null;

  const isLocked = module.status === "locked";
  const isCompleted = module.status === "completed";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1E1B2E]/50 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-2xl rounded-3xl bg-white dark:bg-[#1A1726] border border-[#E8E3FF] dark:border-[#2A2640] shadow-2xl p-6 sm:p-8 overflow-hidden font-sans"
        >
          {/* Top Ambient Glow */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#8B7FE8]/15 blur-2xl" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F5F2FF] dark:bg-[#252136] border border-[#E8E3FF] dark:border-[#3A3554] flex items-center justify-center text-[#6B6785] dark:text-[#A9A4C0] hover:text-[#1E1B2E] dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Info */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#F5F2FF] dark:bg-[#252136] text-[#8B7FE8] border border-[#E8E3FF] dark:border-[#3A3554]">
                {module.subtitle}
              </span>

              {isCompleted && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E6F9F0] dark:bg-[#0E2C20] text-[#0E8566] dark:text-[#5CBFA0] border border-[#9DD9C5] dark:border-[#5CBFA0]/30">
                  Completed ✓
                </span>
              )}

              {module.status === "current" && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8B7FE8] text-white shadow-sm">
                  In Progress ⚡
                </span>
              )}

              {isLocked && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F2FF] dark:bg-[#252136] text-[#6B6785] dark:text-[#A9A4C0] border border-[#E8E3FF] dark:border-[#3A3554]">
                  Locked 🔒
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] dark:text-white tracking-tight mb-2">
              {module.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#6B6785] dark:text-[#B3B3B3] font-medium leading-relaxed mb-4">
              {module.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#6B6785] dark:text-[#A9A4C0]">
              <span className="flex items-center gap-1.5 bg-[#F8F9FC] dark:bg-[#252136] px-3 py-1.5 rounded-full border border-[#E8E3FF] dark:border-[#3A3554]">
                <Clock className="w-3.5 h-3.5 text-[#8B7FE8]" />
                {module.duration}
              </span>
              <span className="flex items-center gap-1.5 bg-[#F8F9FC] dark:bg-[#252136] px-3 py-1.5 rounded-full border border-[#E8E3FF] dark:border-[#3A3554]">
                <Star className="w-3.5 h-3.5 text-[#74D99F] fill-[#74D99F]" />
                +{module.xp} XP total reward
              </span>
              <span className="flex items-center gap-1.5 bg-[#F8F9FC] dark:bg-[#252136] px-3 py-1.5 rounded-full border border-[#E8E3FF] dark:border-[#3A3554]">
                <BookOpen className="w-3.5 h-3.5 text-[#8B7FE8]" />
                {module.completionPercentage}% Progress
              </span>
            </div>
          </div>

          {/* LESSONS & QUIZ LIST */}
          <div className="space-y-3 mb-6 max-h-[360px] overflow-y-auto pr-1">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#6B6785] dark:text-[#A9A4C0]">
              Module Curriculum ({module.lessons.length} Lessons + Quiz)
            </h4>

            {module.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                onClick={() => !lesson.locked && router.push(`/courses/${module.id.replace('mod-', '') ? 'lovable' : 'lovable'}/lessons/${lesson.id}`)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  lesson.locked
                    ? "bg-[#F8F9FC] dark:bg-[#13111C] border-[#E8E3FF] dark:border-[#2A2640] opacity-60 cursor-not-allowed"
                    : "bg-white dark:bg-[#201D30] border-[#E8E3FF] dark:border-[#2A2640] hover:border-[#8B7FE8] cursor-pointer shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 ${
                      lesson.completed
                        ? "bg-[#E6F9F0] text-[#0E8566] border border-[#9DD9C5]"
                        : lesson.locked
                        ? "bg-[#F5F2FF] text-[#A5A1C0] border border-[#E8E3FF]"
                        : "bg-[#F5F2FF] text-[#8B7FE8] border border-[#E8E3FF]"
                    }`}
                  >
                    {lesson.completed ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <BookOpen className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#1E1B2E] dark:text-white block">
                      {idx + 1}. {lesson.title}
                    </span>
                    <span className="text-[11px] font-medium text-[#6B6785] dark:text-[#B3B3B3]">
                      {lesson.estimatedDuration} • +{lesson.xpReward || 50} XP
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {lesson.locked ? (
                    <Lock className="w-4 h-4 text-[#6B6785]" />
                  ) : lesson.completed ? (
                    <span className="text-[10px] font-bold text-[#0E8566] bg-[#E6F9F0] px-2.5 py-1 rounded-full border border-[#9DD9C5]">
                      Completed
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-[#8B7FE8] text-white hover:bg-[#786BD6] transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      Start Lesson
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* MODULE QUIZ NODE */}
            {module.quiz && (
              <div
                onClick={() => !isLocked && router.push(`/courses/lovable/quiz/${module.id}`)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isLocked
                    ? "bg-[#F8F9FC] dark:bg-[#13111C] border-[#E8E3FF] dark:border-[#2A2640] opacity-60 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#F5F2FF] to-[#FFFFFF] dark:from-[#252136] dark:to-[#1A1726] border-[#8B7FE8]/50 hover:border-[#8B7FE8] cursor-pointer shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#8B7FE8] text-white flex items-center justify-center text-xs font-extrabold shrink-0 shadow-sm">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#1E1B2E] dark:text-white block">
                      {module.quiz.title}
                    </span>
                    <span className="text-[11px] font-medium text-[#8B7FE8]">
                      5 Interactive Questions • +{module.quiz.xpReward || 100} XP Bonus
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isLocked ? (
                    <Lock className="w-4 h-4 text-[#6B6785]" />
                  ) : (
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-[#74D99F] text-[#0E8566] hover:bg-[#52C582] transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5 fill-[#0E8566]" />
                      Take Quiz
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MODAL FOOTER */}
          <div className="pt-4 border-t border-[#E8E3FF] dark:border-[#2A2640] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B6785] dark:text-[#B3B3B3]">
              {isLocked
                ? "Complete previous modules to unlock."
                : isCompleted
                ? "You have completed this module!"
                : "Select a lesson above to start learning."}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl text-xs font-extrabold bg-[#F5F2FF] dark:bg-[#252136] text-[#8B7FE8] border border-[#E8E3FF] dark:border-[#3A3554] hover:opacity-80 transition-opacity"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
