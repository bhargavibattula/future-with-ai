"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, CheckCircle2, Circle, Sparkles, Coins, Zap } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  rewardXP: number;
  rewardCoins: number;
}

export default function DailyGoalsCard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);

  const fetchDailyGoals = async () => {
    try {
      const res = await fetch("/api/daily-goals");
      const data = await res.json();
      if (data.success) {
        setGoals(data.goals);
        setCompletedCount(data.completedCount);
      }
    } catch (err) {
      console.error("Failed to fetch daily goals", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyGoals();
  }, []);

  const handleCompleteGoal = async (goalType: string) => {
    if (completingId) return;
    setCompletingId(goalType);
    try {
      const res = await fetch("/api/daily-goals/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalType }),
      });
      const data = await res.json();
      if (data.success) {
        setGoals((prev) =>
          prev.map((g) => (g.id === goalType ? { ...g, completed: true } : g))
        );
        setCompletedCount((prev) => Math.min(prev + 1, goals.length));
      }
    } catch (err) {
      console.error("Failed to complete goal", err);
    } finally {
      setCompletingId(null);
    }
  };

  const progressPercent = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

  return (
    <Card className="h-full border border-[var(--border)] bg-[var(--card)] shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl">Daily Goals</CardTitle>
              <CardDescription>Complete daily tasks to earn rewards</CardDescription>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            {completedCount}/{goals.length || 3} Completed
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full bg-[var(--border)] h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading ? (
          <div className="space-y-3 py-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 rounded-2xl bg-gray-200/50 dark:bg-gray-800/50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                goal.completed
                  ? "bg-emerald-500/5 border-emerald-500/20 text-[var(--foreground)]"
                  : "bg-[var(--background)] border-[var(--border)] hover:border-indigo-500/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => !goal.completed && handleCompleteGoal(goal.id)}
                  disabled={goal.completed || completingId === goal.id}
                  className={`p-1 transition-transform ${
                    goal.completed
                      ? "text-emerald-500 cursor-default"
                      : "text-gray-400 hover:text-indigo-500 hover:scale-110"
                  }`}
                  aria-label={`Mark ${goal.title} complete`}
                >
                  {goal.completed ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-500/20 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div>
                  <h4
                    className={`font-semibold text-sm ${
                      goal.completed ? "line-through opacity-75" : ""
                    }`}
                  >
                    {goal.title}
                  </h4>
                  <p className="text-xs text-[var(--foreground-secondary)]">
                    {goal.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Zap className="w-3 h-3" /> +{goal.rewardXP} XP
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                  <Coins className="w-3 h-3" /> +{goal.rewardCoins}
                </span>

                {!goal.completed && (
                  <button
                    onClick={() => handleCompleteGoal(goal.id)}
                    disabled={completingId === goal.id}
                    className="ml-1 text-xs font-medium px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-colors"
                  >
                    {completingId === goal.id ? "Completing..." : "Complete"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
