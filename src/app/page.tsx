"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolGrid from "@/components/ToolGrid";
import ToolModal from "@/components/ToolModal";
import HowItWorks from "@/components/HowItWorks";
import SubmitSection from "@/components/SubmitSection";
import Footer from "@/components/Footer";
import { AITool } from "@/data/tools";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalTool, setActiveModalTool] = useState<AITool | null>(null);

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    // Smooth scroll down to explore section if selecting from Hero
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBFF] text-[#1E1B2E]">
      {/* Navigation Header */}
      <Navbar onSearchClick={() => handleCategorySelect("All")} />

      {/* Main Content Body */}
      <main className="flex-grow">
        {/* Hero Section (Matching toolkit.ai visual layout) */}
        <Hero
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        {/* Interactive AI Tool Directory & Grid */}
        <ToolGrid
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onOpenModal={(tool) => setActiveModalTool(tool)}
        />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Tool Submission & CTA Section */}
        <SubmitSection />
      </main>

      {/* Quick View Modal */}
      <ToolModal
        tool={activeModalTool}
        onClose={() => setActiveModalTool(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
