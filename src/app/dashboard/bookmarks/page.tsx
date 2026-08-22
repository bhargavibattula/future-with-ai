"use client";

import Link from "next/link";
import { Bookmark, ExternalLink, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface BookmarkRecord {
  id: string;
  lessonId: string;
  createdAt: string;
  lesson: {
    staticId: string;
    title: string;
    description?: string | null;
    estimatedDuration?: string | null;
    module: {
      staticId: string;
      title: string;
      course: { slug: string; title: string };
    };
  };
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookmarks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/bookmarks");
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to load bookmarks.");
      setBookmarks(data.bookmarks || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load bookmarks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBookmarks();
  }, []);

  const removeBookmark = async (bookmark: BookmarkRecord) => {
    try {
      const response = await fetch(
        `/api/bookmarks/${encodeURIComponent(bookmark.lesson.staticId)}?courseSlug=${encodeURIComponent(bookmark.lesson.module.course.slug)}`,
        { method: "DELETE" },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to remove bookmark.");
      setBookmarks((current) => current.filter((item) => item.id !== bookmark.id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to remove bookmark.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 text-[#8B7FE8] mb-2">
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider">Learning library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)]">Saved Lessons</h1>
          <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1.5">Your bookmarked lessons, ready when you are.</p>
        </div>
        <button type="button" onClick={() => void loadBookmarks()} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#EAE6FE] dark:border-white/10 bg-white dark:bg-[#1E1B2E] px-3.5 py-2 text-xs sm:text-sm font-bold text-[var(--foreground)] hover:bg-[#F3F0FE] dark:hover:bg-white/5 disabled:opacity-60 min-h-[40px] w-full sm:w-auto">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && <div className="mb-5 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4 text-xs sm:text-sm text-red-700 dark:text-red-400">{error}</div>}

      {loading ? (
        <div className="rounded-3xl border border-[#EAE6FE] dark:border-white/10 bg-white dark:bg-[#13111C] p-8 text-xs sm:text-sm text-[var(--foreground-secondary)]">Loading saved lessons...</div>
      ) : bookmarks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#D8D2FA] dark:border-white/15 bg-white dark:bg-[#13111C] p-8 sm:p-10 text-center">
          <Bookmark className="mx-auto w-8 h-8 text-[#8B7FE8]" />
          <h2 className="mt-3 text-base sm:text-lg font-black text-[var(--foreground)]">No saved lessons yet</h2>
          <p className="mt-1 text-xs sm:text-sm text-[var(--foreground-secondary)]">Bookmark a lesson from its player to find it here.</p>
          <Link href="/dashboard/courses" className="inline-flex mt-5 rounded-xl bg-[#8B7FE8] hover:bg-[#786BD6] px-4 py-2.5 text-xs sm:text-sm font-bold text-white min-h-[40px] items-center justify-center">Explore courses</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((bookmark) => {
            const { lesson } = bookmark;
            return (
              <article key={bookmark.id} className="rounded-2xl sm:rounded-3xl border border-[#EAE6FE] dark:border-white/10 bg-white dark:bg-[#13111C] p-4 sm:p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold text-[#8B7FE8]">{lesson.module.course.title} · {lesson.module.title}</p>
                    <h2 className="mt-1.5 text-base sm:text-lg font-black text-[var(--foreground)]">{lesson.title}</h2>
                  </div>
                  <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-[#8B7FE8] fill-current" />
                </div>
                {lesson.description && <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[var(--foreground-secondary)] line-clamp-3">{lesson.description}</p>}
                <div className="mt-4 sm:mt-5 flex items-center justify-between gap-2">
                  <span className="text-[11px] sm:text-xs text-[var(--foreground-secondary)]">{lesson.estimatedDuration || "Lesson"}</span>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => void removeBookmark(bookmark)} className="rounded-xl border border-[#EAE6FE] dark:border-white/10 px-3 py-1.5 sm:py-2 text-xs font-bold text-[var(--foreground-secondary)] hover:bg-[#FFF0F5] dark:hover:bg-red-950/20 min-h-[36px]">Remove</button>
                    <Link href={`/courses/${lesson.module.course.slug}/lessons/${lesson.staticId}`} className="inline-flex items-center gap-1 rounded-xl bg-[#8B7FE8] hover:bg-[#786BD6] px-3 py-1.5 sm:py-2 text-xs font-bold text-white min-h-[36px]">
                      Open <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
