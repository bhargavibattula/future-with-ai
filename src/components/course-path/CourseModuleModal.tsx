"use client";

import React, { useState } from "react";
import { X, Check, Play, Lock, Clock, Star, Sparkles, BookOpen, Video, Code, HelpCircle } from "lucide-react";
import { CourseModule, CourseLesson } from "@/data/coursePathData";
import { motion, AnimatePresence } from "framer-motion";

interface CourseModuleModalProps {
  module: CourseModule | null;
  onClose: () => void;
  onLessonComplete?: (moduleId: string, lessonId: string) => void;
}

export default function CourseModuleModal({
  module,
  onClose,
  onLessonComplete,
}: CourseModuleModalProps) {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

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
          className="fixed inset-0 bg-[#1E1B2E]/40 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-xl rounded-3xl bg-white border border-[#E8E3FF] shadow-2xl p-6 sm:p-8 overflow-hidden"
        >
          {/* Top Ambient Glow */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#8B7FE8]/15 blur-2xl" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#6B6785] hover:text-[#1E1B2E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Info */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#F5F2FF] text-[#8B7FE8] border border-[#E8E3FF]">
                {module.subtitle}
              </span>

              {isCompleted && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E6F9F0] text-[#0E8566] border border-[#9DD9C5]">
                  Completed ✓
                </span>
              )}

              {module.status === "current" && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#8B7FE8] text-white">
                  In Progress ⚡
                </span>
              )}

              {isLocked && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F5F2FF] text-[#8B7FE8] border border-[#E8E3FF]">
                  Locked 🔒
                </span>
              )}
            </div>

            <h3 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
              {module.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#6B6785] font-medium leading-relaxed mb-4">
              {module.description}
            </p>

            <div className="flex items-center gap-4 text-xs font-bold text-[#6B6785]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8B7FE8]" />
                {module.duration}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#74D99F] fill-[#74D99F]" />
                +{module.xp} XP reward
              </span>
            </div>
          </div>

          {/* LESSONS LIST */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#6B6785]">
              Module Lessons ({module.lessons.length})
            </h4>

            {module.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                onClick={() => !isLocked && setActiveLessonId(lesson.id)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isLocked
                    ? "bg-[#F8F9FC] border-[#E8E3FF] opacity-60 cursor-not-allowed"
                    : activeLessonId === lesson.id
                    ? "bg-[#F5F2FF] border-[#8B7FE8] shadow-sm cursor-pointer"
                    : "bg-white border-[#E8E3FF] hover:border-[#8B7FE8]/50 cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Lesson Icon */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 ${
                      lesson.completed
                        ? "bg-[#E6F9F0] text-[#0E8566] border border-[#9DD9C5]"
                        : "bg-[#F5F2FF] text-[#8B7FE8] border border-[#E8E3FF]"
                    }`}
                  >
                    {lesson.completed ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : lesson.type === "video" ? (
                      <Video className="w-4 h-4" />
                    ) : lesson.type === "interactive" ? (
                      <Code className="w-4 h-4" />
                    ) : (
                      <BookOpen className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#1E1B2E] block">
                      {idx + 1}. {lesson.title}
                    </span>
                    <span className="text-[10px] font-semibold text-[#6B6785]">
                      {lesson.duration} • {lesson.type}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isLocked ? (
                    <Lock className="w-4 h-4 text-[#8B7FE8]/60" />
                  ) : lesson.completed ? (
                    <span className="text-[10px] font-bold text-[#0E8566] bg-[#E6F9F0] px-2 py-0.5 rounded-full border border-[#9DD9C5]">
                      Done
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-[#8B7FE8] text-white hover:bg-[#786BD6] transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      Start
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* MODAL FOOTER */}
          <div className="pt-4 border-t border-[#E8E3FF] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B6785]">
              {isLocked
                ? "Complete previous modules to unlock."
                : isCompleted
                ? "You have completed this module!"
                : "Ready to continue?"}
            </span>

            <button
              type="button"
              onClick={onClose}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
                isLocked
                  ? "bg-[#F5F2FF] text-[#8B7FE8] border border-[#E8E3FF]"
                  : "bg-[#8B7FE8] text-white hover:bg-[#786BD6] shadow-soft-sm"
              }`}
            >
              {isLocked ? "Close" : isCompleted ? "Review Module" : "Continue Module"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
