"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, CheckCircle2, Circle } from "lucide-react";

interface DayStatus {
  day: string;
  date: string;
  active: boolean;
}

export default function WeeklyReportCard({ initialData }: { initialData?: DayStatus[] }) {
  const [weekly, setWeekly] = useState<DayStatus[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      async function fetchReport() {
        try {
          const res = await fetch("/api/reports/learning");
          const data = await res.json();
          if (data.success && data.weekly) {
            setWeekly(data.weekly);
          }
        } catch (err) {
          console.error("Failed to fetch weekly report", err);
        } finally {
          setLoading(false);
        }
      }
      fetchReport();
    }
  }, [initialData]);

  const activeDaysCount = weekly.filter((d) => d.active).length;

  return (
    <Card className="h-full border border-[var(--border)] bg-[var(--card)] shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl">Weekly Progress</CardTitle>
              <CardDescription>Activity checkmarks for Mon - Sun</CardDescription>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            {activeDaysCount}/7 Days Active
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-between items-center gap-2 py-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="w-10 h-16 rounded-2xl bg-gray-200/50 dark:bg-gray-800/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2 sm:gap-3 py-2">
            {weekly.map((item) => (
              <div
                key={item.date}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 ${
                  item.active
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "bg-[var(--background)] border-[var(--border)] text-[var(--foreground-secondary)]"
                }`}
              >
                <span className="text-xs font-bold mb-2">{item.day}</span>
                {item.active ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 dark:text-gray-700" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
