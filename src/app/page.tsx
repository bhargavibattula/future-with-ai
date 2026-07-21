"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import GSAPHero from "@/components/animations/GSAPHero";
import GSAPKineticScroll from "@/components/animations/GSAPKineticScroll";
import GSAPParallaxGrid from "@/components/animations/GSAPParallaxGrid";
import InteractiveLearningDashboard from "@/components/InteractiveLearningDashboard";
import ToolGrid from "@/components/ToolGrid";
import ToolModal from "@/components/ToolModal";
import Footer from "@/components/Footer";
import { AITool } from "@/data/tools";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalTool, setActiveModalTool] = useState<AITool | null>(null);

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBFF] text-[#1E1B2E] selection:bg-[#D8D2FA] selection:text-[#1E1B2E]">
      {/* Navbar Header */}
      <Navbar onSearchClick={() => handleCategorySelect("All")} />

      {/* Main Content Body */}
      <main className="flex-grow">
        {/* Extraordinary Hero Section with 3D Mouse Tilt & Floating Physics */}
        <GSAPHero />

        {/* Clean Lavender Dream GSAP Horizontal Scroll Feature Showcase */}
        <GSAPKineticScroll />

        {/* GSAP Parallax Floating Feature Grid */}
        <GSAPParallaxGrid />

        {/* Interactive Role Dashboard Experience (Learner, Instructor, Admin) */}
        <InteractiveLearningDashboard />

        {/* AI Tools & Learning Directory Grid */}
        <ToolGrid
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onOpenModal={(tool) => setActiveModalTool(tool)}
        />
      </main>

      {/* Quick View Detail Modal */}
      <ToolModal
        tool={activeModalTool}
        onClose={() => setActiveModalTool(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
