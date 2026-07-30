"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Award, Lock, CheckCircle2, Flame, Star, BookOpen } from "lucide-react";

interface AchievementItem {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  unlocked: boolean;
  unlockedAt: string | null;
}

export default function AchievementTimeline() {
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch("/api/achievements");
        const data = await res.json();
        if (data.success) {
          setAchievements(data.achievements);
        }
      } catch (err) {
        console.error("Failed to fetch achievements", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  const getIcon = (code: string) => {
    switch (code) {
      case "JOINED":
        return <Star className="w-4 h-4 text-amber-500" />;
      case "FIRST_LESSON":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "STREAK_7":
        return <Flame className="w-4 h-4 text-orange-500" />;
      case "XP_500":
        return <Trophy className="w-4 h-4 text-purple-500" />;
      case "LESSONS_100":
        return <Award className="w-4 h-4 text-emerald-500" />;
      default:
        return <Trophy className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <Card className="h-full border border-[var(--border)] bg-[var(--card)] shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg sm:text-xl">Achievement Timeline</CardTitle>
            <CardDescription>Your learning journey milestones</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="space-y-4 py-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-2xl bg-gray-200/50 dark:bg-gray-800/50 animate-pulse" />
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-6 text-sm text-[var(--foreground-secondary)]">
            No achievements unlocked yet.
          </div>
        ) : (
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border)]">
            {achievements.map((item) => (
              <div key={item.id} className="relative flex items-start justify-between gap-4 group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-[var(--card)] transition-colors ${
                    item.unlocked
                      ? "border-amber-500 bg-amber-500/10 text-amber-500"
                      : "border-gray-300 dark:border-gray-700 text-gray-400"
                  }`}
                >
                  {item.unlocked ? (
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                  ) : (
                    <Lock className="w-2.5 h-2.5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                      {getIcon(item.code)}
                    </span>
                    <h4
                      className={`font-semibold text-sm ${
                        item.unlocked ? "text-[var(--foreground)]" : "text-[var(--foreground-secondary)]"
                      }`}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[var(--foreground-secondary)] mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  {item.unlocked ? (
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {item.unlockedAt
                        ? new Date(item.unlockedAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })
                        : "Unlocked"}
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-gray-400 bg-gray-500/10 px-2 py-0.5 rounded-full">
                      Locked
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
