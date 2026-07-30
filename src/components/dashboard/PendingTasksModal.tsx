"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, CheckCircle2, Circle, Target, Sparkles, ArrowRight, Zap, Coins } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface Goal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  rewardXP: number;
  rewardCoins: number;
}

export default function PendingTasksModal() {
  const { user } = useAuth();
  const [pendingGoals, setPendingGoals] = useState<Goal[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) return;

    // Check if dismissed during current browser session
    const SESSION_DISMISS_KEY = `pending_tasks_dismissed_${user.email || user.name || "user"}`;
    if (sessionStorage.getItem(SESSION_DISMISS_KEY)) {
      setLoading(false);
      return;
    }

    const checkPendingTasks = async () => {
      try {
        const res = await fetch("/api/daily-goals");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.goals)) {
            const pending = data.goals.filter((g: Goal) => !g.completed);
            if (pending.length > 0) {
              setPendingGoals(pending);
              setIsOpen(true);
            }
          }
        }
      } catch (err) {
        console.error("Failed to check pending tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    checkPendingTasks();
  }, [user]);

  const handleClose = () => {
    setIsOpen(false);
    if (user) {
      const SESSION_DISMISS_KEY = `pending_tasks_dismissed_${user.email || user.name || "user"}`;
      sessionStorage.setItem(SESSION_DISMISS_KEY, "true");
    }
  };

  if (!isOpen || pendingGoals.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1A1827] rounded-3xl p-6 sm:p-8 border border-[#EAE6FE] dark:border-[#332C4A] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#8B7FE8]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* 'X' Cancel / Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Cancel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center text-white shadow-soft-md shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8B7FE8]" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B7FE8]">
                Daily Action Required
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[var(--foreground)] tracking-tight">
              You Have Pending Tasks Today!
            </h3>
          </div>
        </div>

        <p className="text-xs text-[var(--foreground-secondary)] mb-4 leading-relaxed">
          Complete your remaining <strong>{pendingGoals.length} task{pendingGoals.length > 1 ? "s" : ""}</strong> to maintain your daily streak and earn bonus rewards:
        </p>

        {/* Pending Tasks List */}
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 mb-6">
          {pendingGoals.map((task) => (
            <div
              key={task.id}
              className="p-3.5 rounded-2xl bg-[#FCFBFF] dark:bg-[#231E38]/80 border border-[#EAE6FE] dark:border-[#332C4A] flex items-center justify-between gap-3 hover:border-[#8B7FE8]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Circle className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-black text-[var(--foreground)]">
                    {task.title}
                  </h4>
                  <p className="text-[11px] text-[var(--foreground-secondary)] mt-0.5">
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#F3F0FE] dark:bg-[#2F274C] text-[#8B7FE8] text-[10px] font-extrabold">
                  <Zap className="w-3 h-3" /> +{task.rewardXP}
                </span>
                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold">
                  <Coins className="w-3 h-3" /> +{task.rewardCoins}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#EAE6FE] dark:border-[#332C4A]">
          <button
            onClick={handleClose}
            type="button"
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-[var(--foreground-secondary)] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleClose}
            type="button"
            className="px-6 py-2.5 rounded-xl bg-[#8B7FE8] hover:bg-[#786BD6] text-white font-extrabold text-xs shadow-soft-sm transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Okay</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
