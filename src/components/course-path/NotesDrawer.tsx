"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, FileText, Plus, Pencil, Trash2, Save, Loader2 } from "lucide-react";

interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: string;   // static lesson id
  courseSlug: string;
  lessonTitle?: string;
}

export default function NotesDrawer({ isOpen, onClose, lessonId, courseSlug, lessonTitle }: NotesDrawerProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create state
  const [newContent, setNewContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Delete state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    if (!lessonId || !courseSlug) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/lesson-notes?lessonId=${encodeURIComponent(lessonId)}&courseSlug=${encodeURIComponent(courseSlug)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load notes.");
      setNotes(data.notes || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }, [lessonId, courseSlug]);

  useEffect(() => {
    if (isOpen) void loadNotes();
  }, [isOpen, loadNotes]);

  const handleCreate = async () => {
    if (!newContent.trim()) return;
    setCreating(true);
    setCreateError(null);
    try {
      const res = await fetch("/api/lesson-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, courseSlug, content: newContent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create note.");
      setNotes((prev) => [data.note, ...prev]);
      setNewContent("");
    } catch (err: unknown) {
      setCreateError(err instanceof Error ? err.message : "Failed to create note.");
    } finally {
      setCreating(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editContent.trim()) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/lesson-notes/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save note.");
      setNotes((prev) => prev.map((n) => (n.id === editingId ? data.note : n)));
      setEditingId(null);
      setEditContent("");
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Failed to save note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    setDeletingId(noteId);
    try {
      const res = await fetch(`/api/lesson-notes/${noteId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to delete note.");
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete note.");
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
    setSaveError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
    setSaveError(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      {/* Drawer panel */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col border-l border-[#EAE6FE]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EAE6FE] px-5 py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#8B7FE8]" />
            <div>
              <h2 className="text-sm font-black text-[#1E1B2E]">My Notes</h2>
              {lessonTitle && (
                <p className="text-[11px] text-[#6B6785] truncate max-w-[180px]">{lessonTitle}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notes drawer"
            className="rounded-xl p-1.5 text-[#6B6785] hover:bg-[#F3F0FE] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* New note input */}
        <div className="border-b border-[#EAE6FE] px-5 py-4">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your notes here..."
            rows={3}
            className="w-full resize-none rounded-xl border border-[#EAE6FE] bg-[#FCFBFF] px-3 py-2.5 text-sm text-[#1E1B2E] placeholder-[#6B6785]/60 focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]/40 focus:border-[#8B7FE8] transition-all"
          />
          {createError && <p className="mt-1 text-xs text-red-600">{createError}</p>}
          <button
            type="button"
            onClick={() => void handleCreate()}
            disabled={creating || !newContent.trim()}
            className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-[#8B7FE8] px-4 py-2 text-xs font-bold text-white hover:bg-[#7C6FD6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {creating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
            {creating ? "Saving..." : "Save Note"}
          </button>
        </div>

        {/* Notes list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">{error}</div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-10 gap-2 text-sm text-[#6B6785]">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading notes...
            </div>
          ) : notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText className="h-8 w-8 text-[#8B7FE8] opacity-40 mb-3" />
              <p className="text-sm font-bold text-[#1E1B2E]">No notes yet</p>
              <p className="text-xs text-[#6B6785] mt-1">Write your first note above!</p>
            </div>
          ) : (
            <>
              <p className="text-[11px] font-black uppercase tracking-wider text-[#6B6785]">
                {notes.length} saved {notes.length === 1 ? "note" : "notes"}
              </p>
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-[#EAE6FE] bg-[#FCFBFF] p-4"
                >
                  {editingId === note.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-[#8B7FE8] bg-white px-3 py-2 text-sm text-[#1E1B2E] focus:outline-none focus:ring-2 focus:ring-[#8B7FE8]/40 transition-all"
                        autoFocus
                      />
                      {saveError && <p className="text-xs text-red-600">{saveError}</p>}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => void handleSaveEdit()}
                          disabled={saving || !editContent.trim()}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#8B7FE8] px-3 py-1.5 text-xs font-bold text-white disabled:opacity-50 hover:bg-[#7C6FD6] transition-colors"
                        >
                          {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                          {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#EAE6FE] px-3 py-1.5 text-xs font-bold text-[#6B6785] hover:bg-[#F3F0FE] transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-[#1E1B2E] leading-relaxed whitespace-pre-wrap">{note.content}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[11px] text-[#6B6785]">
                          {new Date(note.updatedAt).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(note)}
                            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-[#6B6785] hover:bg-[#F3F0FE] transition-colors"
                          >
                            <Pencil className="h-3 w-3" /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDelete(note.id)}
                            disabled={deletingId === note.id}
                            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            {deletingId === note.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
