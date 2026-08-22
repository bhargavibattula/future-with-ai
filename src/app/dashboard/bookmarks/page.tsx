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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[#8B7FE8] mb-2">
            <Bookmark className="w-5 h-5 fill-current" />
            <span className="text-xs font-black uppercase tracking-wider">Learning library</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--foreground)]">Saved Lessons</h1>
          <p className="text-sm text-[var(--foreground-secondary)] mt-2">Your bookmarked lessons, ready when you are.</p>
        </div>
        <button type="button" onClick={() => void loadBookmarks()} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-[#EAE6FE] bg-white px-3 py-2 text-sm font-bold text-[var(--foreground)] hover:bg-[#F3F0FE] disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="rounded-3xl border border-[#EAE6FE] bg-white p-8 text-sm text-[var(--foreground-secondary)]">Loading saved lessons...</div>
      ) : bookmarks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#D8D2FA] bg-white p-10 text-center">
          <Bookmark className="mx-auto w-8 h-8 text-[#8B7FE8]" />
          <h2 className="mt-3 text-lg font-black text-[var(--foreground)]">No saved lessons yet</h2>
          <p className="mt-1 text-sm text-[var(--foreground-secondary)]">Bookmark a lesson from its player to find it here.</p>
          <Link href="/dashboard/courses" className="inline-flex mt-5 rounded-xl bg-[#8B7FE8] px-4 py-2 text-sm font-bold text-white">Explore courses</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((bookmark) => {
            const { lesson } = bookmark;
            return (
              <article key={bookmark.id} className="rounded-3xl border border-[#EAE6FE] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[#8B7FE8]">{lesson.module.course.title} · {lesson.module.title}</p>
                    <h2 className="mt-2 text-lg font-black text-[var(--foreground)]">{lesson.title}</h2>
                  </div>
                  <Bookmark className="w-5 h-5 shrink-0 text-[#8B7FE8] fill-current" />
                </div>
                {lesson.description && <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)] line-clamp-3">{lesson.description}</p>}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-xs text-[var(--foreground-secondary)]">{lesson.estimatedDuration || "Lesson"}</span>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => void removeBookmark(bookmark)} className="rounded-xl border border-[#EAE6FE] px-3 py-2 text-xs font-bold text-[var(--foreground-secondary)] hover:bg-[#FFF0F5]">Remove</button>
                    <Link href={`/courses/${lesson.module.course.slug}/lessons/${lesson.staticId}`} className="inline-flex items-center gap-1 rounded-xl bg-[#8B7FE8] px-3 py-2 text-xs font-bold text-white">
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
