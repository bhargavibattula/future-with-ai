"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursePathHeader from "@/components/course-path/CoursePathHeader";
import CoursePathLeftPanel from "@/components/course-path/CoursePathLeftPanel";
import CoursePathRoadmap from "@/components/course-path/CoursePathRoadmap";
import CourseModuleModal from "@/components/course-path/CourseModuleModal";
import CoursePathBottomSections from "@/components/course-path/CoursePathBottomSections";
import { DetailedCoursePath, CourseModule, getCoursePathData } from "@/data/coursePathData";

interface CoursePathClientProps {
  slug: string;
}

export default function CoursePathClient({ slug }: CoursePathClientProps) {
  const [pathData, setPathData] = useState<DetailedCoursePath>(() =>
    getCoursePathData(slug)
  );
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);

  // Continue Learning action (opens current module)
  const handleContinueLearning = () => {
    const currentModule =
      pathData.modules.find((m) => m.status === "current") || pathData.modules[0];
    setSelectedModule(currentModule);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {/* Soft Ambient Radial Lighting Blobs (matching homepage palette) */}
        <div className="pointer-events-none fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D8D2FA]/25 blur-[120px]" />
        <div className="pointer-events-none fixed bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FFC9DE]/25 blur-[120px]" />
        <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B8E8D8]/15 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Header Card */}
          <CoursePathHeader data={pathData} />

          {/* TWO-COLUMN BODY LAYOUT (30% Left Sticky Column / 70% Right Learning Canvas) */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
            {/* LEFT COLUMN (30% Width) */}
            <div className="lg:col-span-3 w-full">
              <CoursePathLeftPanel
                data={pathData}
                onContinueLearning={handleContinueLearning}
              />
            </div>

            {/* RIGHT COLUMN: Interactive Learning Canvas (70% Width) */}
            <div className="lg:col-span-7 w-full">
              <div className="w-full rounded-3xl bg-white/80 backdrop-blur-xl border border-[#E8E3FF] p-6 sm:p-8 shadow-soft">
                <CoursePathRoadmap
                  modules={pathData.modules}
                  onSelectModule={(mod) => setSelectedModule(mod)}
                />
              </div>
            </div>
          </div>

          {/* BOTTOM SECTIONS: Resources, Achievements, Next Course */}
          <CoursePathBottomSections data={pathData} />
        </div>
      </main>

      {/* Module Detail Interactive Modal */}
      <CourseModuleModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
