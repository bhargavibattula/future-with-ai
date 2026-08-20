"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursePathHeader from "@/components/course-path/CoursePathHeader";
import CoursePathLeftPanel from "@/components/course-path/CoursePathLeftPanel";
import CoursePathRoadmap from "@/components/course-path/CoursePathRoadmap";
import CourseModuleModal from "@/components/course-path/CourseModuleModal";
import CoursePathBottomSections from "@/components/course-path/CoursePathBottomSections";
import { useRouter } from "next/navigation";
import {
  DetailedCoursePath,
  CourseModule,
  getCoursePathData,
  UserCourseProgressState
} from "@/data/coursePathData";
import { useAuth } from "@/lib/auth";

interface CoursePathClientProps {
  slug: string;
}

export default function CoursePathClient({ slug }: CoursePathClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [progressState, setProgressState] = useState<UserCourseProgressState | null>(null);

  // Load progress state on mount
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const headers: Record<string, string> = {};
        if (user?.email) headers["X-User-Email"] = user.email;
        const res = await fetch(`/api/progress/course/${slug}`, { cache: "no-store", headers });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setProgressState({
              completedLessonIds: data.enrollment.completedLessonIds || [],
              completedModuleIds: data.enrollment.completedModuleIds || [],
              quizScores: data.enrollment.quizScores || {},
              totalXp: data.userProgress.totalXP || 0,
              currentStreakDays: data.userProgress.currentStreak || 1,
              lastActiveDate: new Date().toISOString(),
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch progress from DB", err);
      }
    };
    fetchProgress();
  }, [slug, user?.email]);

  const [pathData, setPathData] = useState<DetailedCoursePath>(() =>
    getCoursePathData(slug, progressState || undefined)
  );

  // Synchronize pathData when progressState changes
  useEffect(() => {
    if (progressState) {
      setPathData(getCoursePathData(slug, progressState));
    }
  }, [progressState, slug]);

  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);

  // Continue Learning action (navigates to first uncompleted lesson/module full page)
  const handleContinueLearning = () => {
    const currentModule =
      pathData.modules.find((m) => m.status === "current") || pathData.modules[0];
    const uncompletedLesson = currentModule.lessons.find((l) => !l.completed) || currentModule.lessons[0];

    if (uncompletedLesson) {
      router.push(`/courses/${slug}/lessons/${uncompletedLesson.id}`);
    } else {
      setSelectedModule(currentModule);
    }
  };

  // Mark lesson completed & award XP
  const handleMarkLessonComplete = (moduleId: string, lessonId: string) => {
    setProgressState((prev) => {
      const state = prev || {
        completedLessonIds: [],
        completedModuleIds: [],
        quizScores: {},
        totalXp: 0,
        currentStreakDays: 1,
        lastActiveDate: new Date().toISOString(),
      };
      if (state.completedLessonIds.includes(lessonId)) return state;

      const updatedCompletedLessons = [...state.completedLessonIds, lessonId];
      const targetModule = pathData.modules.find((m) => m.id === moduleId);

      let updatedCompletedModules = [...state.completedModuleIds];
      let bonusXp = 50;

      // Check if all lessons in module are now completed
      if (targetModule) {
        const allLessonsDone = targetModule.lessons.every(
          (l) => l.id === lessonId || updatedCompletedLessons.includes(l.id)
        );

        if (allLessonsDone && !targetModule.quiz && !updatedCompletedModules.includes(moduleId)) {
          updatedCompletedModules.push(moduleId);
          bonusXp += targetModule.xp;
        }
      }

      const newState: UserCourseProgressState = {
        ...state,
        completedLessonIds: updatedCompletedLessons,
        completedModuleIds: updatedCompletedModules,
        totalXp: state.totalXp + bonusXp,
        lastActiveDate: new Date().toISOString(),
      };
      
      return newState;
    });

    // Update active module state if open
    if (selectedModule && selectedModule.id === moduleId) {
      setSelectedModule((prev) =>
        prev
          ? {
              ...prev,
              lessons: prev.lessons.map((l) =>
                l.id === lessonId ? { ...l, completed: true } : l
              ),
            }
          : null
      );
    }

    // Trigger backend activity complete API for streak & XP tracking
    const actHeaders: Record<string, string> = { "Content-Type": "application/json" };
    if (user?.email) actHeaders["X-User-Email"] = user.email;
    fetch("/api/activity/complete", {
      method: "POST",
      headers: actHeaders,
      body: JSON.stringify({
        activityType: "LESSON",
        activityId: lessonId,
        courseId: slug,
        lessonId: lessonId,
        xp: 50,
        coins: 20,
        timeSpent: 15,
      }),
    }).catch((err) => console.error("Failed to record lesson activity:", err));
  };

  // Pass Quiz & Unlock Next Module
  const handleQuizPassed = (moduleId: string, score: number, xpReward: number) => {
    setProgressState((prev) => {
      const state = prev || {
        completedLessonIds: [],
        completedModuleIds: [],
        quizScores: {},
        totalXp: 0,
        currentStreakDays: 1,
        lastActiveDate: new Date().toISOString(),
      };
      const updatedModuleIds = state.completedModuleIds.includes(moduleId)
        ? state.completedModuleIds
        : [...state.completedModuleIds, moduleId];

      const newState: UserCourseProgressState = {
        ...state,
        completedModuleIds: updatedModuleIds,
        quizScores: { ...state.quizScores, [moduleId]: score },
        totalXp: state.totalXp + xpReward,
        lastActiveDate: new Date().toISOString(),
      };

      return newState;
    });
  };

  // Toggle 100% completion for testing & simulation
  const handleToggleCompleteAll = () => {
    if (pathData.progressPercent === 100) {
      const resetState: UserCourseProgressState = {
        completedLessonIds: [],
        completedModuleIds: [],
        quizScores: {},
        totalXp: 0,
        currentStreakDays: 1,
        lastActiveDate: new Date().toISOString(),
      };
      setProgressState(resetState);
    } else {
      const allLessonIds = pathData.modules.flatMap((m) => m.lessons.map((l) => l.id));
      const allModuleIds = pathData.modules.map((m) => m.id);

      const completeState: UserCourseProgressState = {
        completedLessonIds: allLessonIds,
        completedModuleIds: allModuleIds,
        quizScores: pathData.modules.reduce((acc, m) => ({ ...acc, [m.id]: 100 }), {}),
        totalXp: 3400,
        currentStreakDays: 12,
        lastActiveDate: new Date().toISOString(),
      };
      setProgressState(completeState);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {/* Soft Ambient Radial Lighting Blobs */}
        <div className="pointer-events-none fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D8D2FA]/25 blur-[120px]" />
        <div className="pointer-events-none fixed bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FFC9DE]/25 blur-[120px]" />
        <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B8E8D8]/15 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Header Card */}
          <CoursePathHeader data={pathData} />

          {/* TWO-COLUMN BODY LAYOUT (30% Left Sticky Column / 70% Right Learning Canvas) */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
            {/* LEFT COLUMN (30% Width) */}
            <div className="lg:col-span-3 w-full">
              <CoursePathLeftPanel
                data={pathData}
                onContinueLearning={handleContinueLearning}
                onToggleCompleteAll={handleToggleCompleteAll}
              />
            </div>

            {/* RIGHT COLUMN: Interactive Learning Canvas (70% Width) */}
            <div className="lg:col-span-7 w-full">
              <div className="w-full rounded-3xl bg-white/80 dark:bg-[#1A1726]/80 backdrop-blur-xl border border-[#E8E3FF] dark:border-[#2A2640] p-6 sm:p-8 shadow-soft">
                <CoursePathRoadmap
                  modules={pathData.modules}
                  onSelectModule={(mod) => setSelectedModule(mod)}
                />
              </div>
            </div>
          </div>

          {/* BOTTOM SECTIONS: Resources, Achievements, Next Course */}
          <CoursePathBottomSections data={pathData} />
        </div>
      </main>

      {/* Module Overview Modal */}
      <CourseModuleModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
