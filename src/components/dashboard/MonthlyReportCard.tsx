"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays, Flame, BookOpen, Zap, Coins, TrendingUp } from "lucide-react";

interface MonthlyStats {
  daysLearned: number;
  longestStreak: number;
  lessonsCompleted: number;
  xpEarned: number;
  coinsEarned: number;
}

export default function MonthlyReportCard({ initialData }: { initialData?: MonthlyStats }) {
  const [stats, setStats] = useState<MonthlyStats | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      async function fetchReport() {
        try {
          const res = await fetch("/api/reports/learning");
          const data = await res.json();
          if (data.success && data.monthly) {
            setStats(data.monthly);
          }
        } catch (err) {
          console.error("Failed to fetch monthly report", err);
        } finally {
          setLoading(false);
        }
      }
      fetchReport();
    }
  }, [initialData]);

  const metrics = [
    {
      label: "Days Learned",
      value: stats?.daysLearned ?? 0,
      suffix: "days",
      icon: <CalendarDays className="w-4 h-4 text-blue-500" />,
      bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Longest Streak",
      value: stats?.longestStreak ?? 0,
      suffix: "days",
      icon: <Flame className="w-4 h-4 text-orange-500" />,
      bg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      label: "Lessons Completed",
      value: stats?.lessonsCompleted ?? 0,
      suffix: "lessons",
      icon: <BookOpen className="w-4 h-4 text-emerald-500" />,
      bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "XP Earned",
      value: stats?.xpEarned ?? 0,
      suffix: "XP",
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      label: "Coins Earned",
      value: stats?.coinsEarned ?? 0,
      suffix: "coins",
      icon: <Coins className="w-4 h-4 text-purple-500" />,
      bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <Card className="h-full border border-[var(--border)] bg-[var(--card)] shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg sm:text-xl">Monthly Statistics</CardTitle>
            <CardDescription>Performance metrics for the current month</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-gray-200/50 dark:bg-gray-800/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-1">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-purple-500/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[var(--foreground-secondary)]">{m.label}</span>
                  <div className={`p-1.5 rounded-xl ${m.bg}`}>{m.icon}</div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-[var(--foreground)]">{m.value.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-[var(--foreground-secondary)]">{m.suffix}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
