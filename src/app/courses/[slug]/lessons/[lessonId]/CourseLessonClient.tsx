"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CourseModule,
  CourseLesson,
  getCoursePathData,
  getStoredUserProgress,
  saveUserProgress,
  UserCourseProgressState
} from "@/data/coursePathData";

import { LessonContainer } from "@/components/cards/LessonContainer";
import { VideoCard } from "@/components/cards/VideoCard";
import { AudioCard } from "@/components/cards/AudioCard";
import { ConceptCard } from "@/components/cards/ConceptCard";
import { InteractiveDemoCard } from "@/components/cards/InteractiveDemoCard";
import { KnowledgeCheckCard } from "@/components/cards/KnowledgeCheckCard";
import { PremiumButton } from "@/components/ui/PremiumButton";

interface CourseLessonClientProps {
  slug: string;
  lessonId: string;
}

export default function CourseLessonClient({ slug, lessonId }: CourseLessonClientProps) {
  const router = useRouter();
  const [progressState, setProgressState] = useState<UserCourseProgressState | null>(null);

  useEffect(() => {
    const saved = getStoredUserProgress(slug);
    setProgressState(saved);
  }, [slug]);

  const pathData = getCoursePathData(slug, progressState || undefined);

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

  const handleMarkComplete = () => {
    if (!parentModule || !targetLesson) return;
    
    setProgressState((prev) => {
      const state = prev || getStoredUserProgress(slug);
      if (state.completedLessonIds.includes(lessonId)) return state;

      const updatedCompletedLessons = [...state.completedLessonIds, lessonId];
      let updatedCompletedModules = [...state.completedModuleIds];
      let bonusXp = targetLesson!.xpReward || 50;

      const allLessonsDone = parentModule!.lessons.every(
        (l) => l.id === lessonId || updatedCompletedLessons.includes(l.id)
      );

      if (allLessonsDone && !parentModule!.quiz && !updatedCompletedModules.includes(parentModule!.id)) {
        updatedCompletedModules.push(parentModule!.id);
        bonusXp += parentModule!.xp;
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

    router.push(`/courses/${slug}`);
  };

  const handleExit = () => {
    router.push(`/courses/${slug}`);
  };

  const generatedCards = useMemo(() => {
    if (!targetLesson) return [];

    const cards: any[] = [];
    let currentId = 0;

    // 1. Always start with a Video Card for that premium feel
    cards.push({
      id: `card-${currentId++}`,
      type: "video",
      props: {
        render: ({ onComplete }: any) => (
          <VideoCard 
            title={`Welcome to: ${targetLesson.title}`} 
            onComplete={onComplete} 
          />
        )
      }
    });

    // 2. Then an Audio introduction
    cards.push({
      id: `card-${currentId++}`,
      type: "audio",
      props: {
        render: ({ onComplete }: any) => (
          <AudioCard 
            title="Lesson Overview" 
            transcript={targetLesson.description || "Welcome to this interactive lesson."} 
            onComplete={onComplete} 
          />
        )
      }
    });

    // 3. Process Content Sections dynamically
    if (targetLesson.contentSections) {
      let currentPoints: string[] = [];
      let currentTitle = "Concept";

      targetLesson.contentSections.forEach((sec, idx) => {
        if (sec.type === "heading" && sec.title) {
          if (currentPoints.length > 0) {
            // Push previous concept card
            const pts = [...currentPoints];
            const title = currentTitle;
            cards.push({
              id: `card-${currentId++}`,
              type: "concept",
              props: {
                render: ({ onComplete }: any) => (
                  <ConceptCard title={title} points={pts} onComplete={onComplete} />
                )
              }
            });
            currentPoints = [];
          }
          currentTitle = sec.title;
        } else if (sec.type === "paragraph" || sec.type === "callout" || sec.type === "tip" || sec.type === "note") {
          if (sec.content) currentPoints.push(sec.content);
        } else if (sec.type === "code") {
          // If code, push an interactive demo card instead!
          cards.push({
            id: `card-${currentId++}`,
            type: "interactive",
            props: {
              render: ({ onComplete }: any) => (
                <InteractiveDemoCard 
                  title={sec.title || "Interactive Demo"} 
                  description="Run this code to see it in action." 
                  codeSnippet={sec.code} 
                  onComplete={onComplete} 
                />
              )
            }
          });
        }
      });

      // Push any remaining concept points
      if (currentPoints.length > 0) {
        const pts = [...currentPoints];
        const title = currentTitle;
        cards.push({
          id: `card-${currentId++}`,
          type: "concept",
          props: {
            render: ({ onComplete }: any) => (
              <ConceptCard title={title} points={pts} onComplete={onComplete} />
            )
          }
        });
      }
    }

    // 4. End with a Knowledge Check
    cards.push({
      id: `card-${currentId++}`,
      type: "knowledge",
      props: {
        render: ({ onComplete }: any) => (
          <KnowledgeCheckCard 
            question={`Are you ready to complete "${targetLesson.title}"?`}
            options={["Yes, I understand it fully!", "No, I need to review.", "I want to ask AI."]}
            correctAnswer="Yes, I understand it fully!"
            explanation="Excellent! You're making great progress."
            onComplete={onComplete}
          />
        )
      }
    });

    return cards;
  }, [targetLesson]);

  if (!parentModule || !targetLesson) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-black mb-4 text-[#1E1B2E] dark:text-white">Lesson Not Found</h2>
        <PremiumButton onClick={handleExit}>Return to Roadmap</PremiumButton>
      </div>
    );
  }

  return (
    <LessonContainer 
      cards={generatedCards} 
      onFinishLesson={handleMarkComplete} 
      onExit={handleExit} 
      lessonTitle={targetLesson.title}
    />
  );
}
