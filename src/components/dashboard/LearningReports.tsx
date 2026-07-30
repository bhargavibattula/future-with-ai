"use client";

import WeeklyReportCard from "./WeeklyReportCard";
import MonthlyReportCard from "./MonthlyReportCard";

export default function LearningReports() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-6">
        <WeeklyReportCard />
      </div>
      <div className="lg:col-span-6">
        <MonthlyReportCard />
      </div>
    </div>
  );
}
