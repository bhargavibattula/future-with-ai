"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, CheckCheck, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { ReminderItem } from "./ReminderTrigger";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
}

export default function NotificationCenter({
  isOpen,
  onClose,
  onUnreadCountChange,
}: NotificationCenterProps) {
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReminders = async () => {
    try {
      const res = await fetch("/api/reminders");
      if (res.ok) {
        const data = await res.json();
        setReminders(data.reminders || []);
        const unread = (data.reminders || []).filter((r: ReminderItem) => !r.read).length;
        onUnreadCountChange?.(unread);
      }
    } catch (err) {
      console.error("Failed to fetch reminders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [isOpen]);

  const handleMarkAllRead = async () => {
    try {
      await fetch("/api/reminders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true }),
      });
      setReminders((prev) => prev.map((r) => ({ ...r, read: true })));
      onUnreadCountChange?.(0);
    } catch (err) {
      console.error("Failed to mark all read:", err);
    }
  };

  const handleDismiss = async (id: string) => {
    try {
      await fetch("/api/reminders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, dismissed: true }),
      });
      const updated = reminders.filter((r) => r.id !== id);
      setReminders(updated);
      const unread = updated.filter((r) => !r.read).length;
      onUnreadCountChange?.(unread);
    } catch (err) {
      console.error("Failed to dismiss reminder:", err);
    }
  };

  if (!isOpen) return null;

  const unreadCount = reminders.filter((r) => !r.read).length;

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1A1827] rounded-3xl p-4 shadow-2xl border border-[#EAE6FE] dark:border-[#332C4A] z-50 animate-in fade-in slide-in-from-top-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EAE6FE] dark:border-[#332C4A]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-[#F3F0FE] dark:bg-[#251E3A] text-[#8B7FE8]">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-[var(--foreground)] flex items-center gap-1.5">
              Notifications
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#8B7FE8] text-white text-[10px] font-black">
                  {unreadCount}
                </span>
              )}
            </h3>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1 text-xs font-bold text-[#8B7FE8] hover:text-[#786BD6] transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      {/* Reminder List */}
      <div className="max-h-80 overflow-y-auto py-2 space-y-2 divide-y divide-gray-100 dark:divide-gray-800">
        {loading ? (
          <div className="py-8 text-center text-xs text-[var(--foreground-secondary)]">
            Evaluating activity...
          </div>
        ) : reminders.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#F3F0FE] dark:bg-[#251E3A] text-[#8B7FE8] mx-auto flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-[var(--foreground)]">All caught up!</p>
            <p className="text-[11px] text-[var(--foreground-secondary)]">
              No new reminders or notifications right now.
            </p>
          </div>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`p-3 rounded-2xl transition-colors relative group pt-3 ${
                !reminder.read
                  ? "bg-[#F8F6FF] dark:bg-[#231E38]/80 border border-[#EAE6FE] dark:border-[#332C4A]"
                  : "hover:bg-gray-50 dark:hover:bg-[#231E38]/40"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <span className="text-xl shrink-0 mt-0.5">{reminder.emoji || "💡"}</span>
                  <div>
                    <h4 className="text-xs font-black text-[var(--foreground)] leading-snug">
                      {reminder.title}
                    </h4>
                    <p className="text-[11px] text-[var(--foreground-secondary)] mt-0.5 leading-relaxed">
                      {reminder.message}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <Link
                        href={reminder.ctaHref || "/dashboard"}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#8B7FE8] hover:text-[#786BD6]"
                      >
                        {reminder.ctaLabel || "Let's Go"} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDismiss(reminder.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
