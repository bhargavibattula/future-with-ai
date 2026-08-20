"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, BookmarkCheck, FileText } from "lucide-react";
import NotesDrawer from "@/components/course-path/NotesDrawer";
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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(true);
  const [bookmarkSaving, setBookmarkSaving] = useState(false);
  const [bookmarkError, setBookmarkError] = useState<string | null>(null);
  const [notesOpen, setNotesOpen] = useState(false);

  useEffect(() => {
    const saved = getStoredUserProgress(slug);
    setProgressState(saved);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    const loadBookmark = async () => {
      setBookmarkLoading(true);
      setBookmarkError(null);
      try {
        const response = await fetch(
          `/api/lessons/${encodeURIComponent(lessonId)}/bookmark?courseSlug=${encodeURIComponent(slug)}`,
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Failed to load bookmark state.");
        if (!cancelled) setIsBookmarked(Boolean(data.bookmarked));
      } catch (error: unknown) {
        if (!cancelled) {
          setBookmarkError(error instanceof Error ? error.message : "Failed to load bookmark state.");
        }
      } finally {
        if (!cancelled) setBookmarkLoading(false);
      }
    };

    void loadBookmark();
    return () => {
      cancelled = true;
    };
  }, [lessonId, slug]);

  const handleBookmarkToggle = async () => {
    setBookmarkSaving(true);
    setBookmarkError(null);
    try {
      const url = `/api/bookmarks/${encodeURIComponent(lessonId)}?courseSlug=${encodeURIComponent(slug)}`;
      const response = await fetch(isBookmarked ? url : "/api/bookmarks", {
        method: isBookmarked ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: isBookmarked ? undefined : JSON.stringify({ courseSlug: slug, lessonId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to update bookmark.");
      setIsBookmarked(Boolean(data.bookmarked));
    } catch (error: unknown) {
      setBookmarkError(error instanceof Error ? error.message : "Failed to update bookmark.");
    } finally {
      setBookmarkSaving(false);
    }
  };

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
    <div className="min-h-screen bg-[var(--background)]">
      <NotesDrawer
        isOpen={notesOpen}
        onClose={() => setNotesOpen(false)}
        lessonId={lessonId}
        courseSlug={slug}
        lessonTitle={targetLesson?.title}
      />
      <LessonContainer
        cards={generatedCards}
        onFinishLesson={handleMarkComplete}
        onExit={handleExit}
        lessonTitle={targetLesson.title}
        actions={
          <div className="flex items-center gap-2">
            {bookmarkError && <span className="text-xs text-red-600 hidden sm:inline">{bookmarkError}</span>}
            <button
              type="button"
              onClick={() => void handleBookmarkToggle()}
              disabled={bookmarkLoading || bookmarkSaving}
              aria-label={isBookmarked ? "Remove lesson bookmark" : "Bookmark lesson"}
              title={isBookmarked ? "Bookmarked" : "Bookmark lesson"}
              className="inline-flex items-center gap-2 rounded-xl border border-[#EAE6FE] bg-white px-3 py-1.5 text-xs font-bold text-[#6B6785] shadow-sm transition-colors hover:bg-[#F3F0FE] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {bookmarkLoading || bookmarkSaving ? (
                "Saving..."
              ) : isBookmarked ? (
                <><BookmarkCheck className="h-4 w-4 text-[#8B7FE8]" /> <span className="hidden sm:inline">Bookmarked</span></>
              ) : (
                <><Bookmark className="h-4 w-4" /> <span className="hidden sm:inline">Bookmark</span></>
              )}
            </button>
            <button
              type="button"
              onClick={() => setNotesOpen(true)}
              aria-label="Open lesson notes"
              title="My Notes"
              className="inline-flex items-center gap-2 rounded-xl border border-[#EAE6FE] bg-white px-3 py-1.5 text-xs font-bold text-[#6B6785] shadow-sm transition-colors hover:bg-[#F3F0FE]"
            >
              <FileText className="h-4 w-4" /> <span className="hidden sm:inline">Notes</span>
            </button>
          </div>
        }
      />
    </div>
  );
}
