"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export interface ReminderItem {
  id: string;
  type: string;
  title: string;
  message: string;
  emoji: string;
  ctaLabel: string;
  ctaHref: string;
  read: boolean;
  dismissed: boolean;
  date: string;
  createdAt: string;
}

interface ReminderTriggerProps {
  onReminderTriggered?: (reminder: ReminderItem) => void;
}

export default function ReminderTrigger({ onReminderTriggered }: ReminderTriggerProps) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Check cooldown in localStorage (1 hour)
    const LAST_EVAL_KEY = `future_ai_reminder_eval_${user.email || user.name || "user"}`;
    const lastEval = localStorage.getItem(LAST_EVAL_KEY);

    if (lastEval) {
      const timeSince = Date.now() - parseInt(lastEval, 10);
      if (timeSince < 60 * 60 * 1000) {
        // Less than 1 hour, skip evaluation trigger
        return;
      }
    }

    const evaluateReminders = async () => {
      try {
        const res = await fetch("/api/reminders/evaluate", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          if (data.reminder) {
            localStorage.setItem(LAST_EVAL_KEY, Date.now().toString());
            onReminderTriggered?.(data.reminder);
          }
        }
      } catch (err) {
        console.error("Failed to evaluate reminders:", err);
      }
    };

    evaluateReminders();
  }, [user, onReminderTriggered]);

  return null;
}
