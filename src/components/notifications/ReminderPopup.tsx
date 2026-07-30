"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { ReminderItem } from "./ReminderTrigger";

interface ReminderPopupProps {
  reminder: ReminderItem | null;
  onClose?: () => void;
}

export default function ReminderPopup({ reminder, onClose }: ReminderPopupProps) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (reminder) {
      setVisible(true);
      // Auto-dismiss after 9 seconds
      const timer = setTimeout(() => {
        handleDismiss();
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [reminder]);

  const handleDismiss = async () => {
    setVisible(false);
    onClose?.();
    if (reminder?.id) {
      try {
        await fetch("/api/reminders", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: reminder.id, dismissed: true }),
        });
      } catch (err) {
        console.error("Failed to dismiss reminder:", err);
      }
    }
  };

  if (!reminder || !visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white dark:bg-[#1A1827] p-5 rounded-3xl border border-[#EAE6FE] dark:border-[#332C4A] shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Ambient Top Glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#8B7FE8]/20 rounded-full blur-xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close reminder"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          {/* Emoji Badge */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B7FE8]/20 to-[#D8D2FA]/30 dark:from-[#8B7FE8]/30 dark:to-[#332C4A] flex items-center justify-center text-2xl shrink-0 border border-[#EAE6FE] dark:border-[#332C4A]">
            {reminder.emoji || "💡"}
          </div>

          <div className="pr-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#8B7FE8]" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B7FE8]">
                Smart Motivation
              </span>
            </div>
            <h4 className="text-sm font-black text-[var(--foreground)] leading-snug">
              {reminder.title}
            </h4>
            <p className="text-xs text-[var(--foreground-secondary)] mt-1 leading-relaxed">
              {reminder.message}
            </p>

            <div className="mt-3.5 flex items-center gap-2">
              <Link
                href={reminder.ctaHref || "/dashboard"}
                onClick={handleDismiss}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#8B7FE8] hover:bg-[#786BD6] text-white font-extrabold text-xs shadow-soft-sm transition-all active:scale-95"
              >
                <span>{reminder.ctaLabel || "Let's Go"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-[var(--foreground-secondary)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
