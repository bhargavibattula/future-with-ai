"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import GSAPHero from "@/components/animations/GSAPHero";
import BrandMarquee from "@/components/animations/BrandMarquee";
import AILayoffsStats from "@/components/AILayoffsStats";
import WhyChooseUs from "@/components/WhyChooseUs";
import ScrollProgress from "@/components/animations/system/ScrollProgress";
import GSAPTextRevealSection from "@/components/animations/GSAPTextRevealSection";
import GSAPStreakHeatmap from "@/components/animations/GSAPStreakHeatmap";
import GSAPHowItWorks from "@/components/animations/GSAPHowItWorks";
import CertificateShowcase from "@/components/animations/CertificateShowcase";
import InteractiveLearningDashboard from "@/components/InteractiveLearningDashboard";
import PlatformFeatures from "@/components/PlatformFeatures";
import AIToolWorkflows from "@/components/animations/AIToolWorkflows";
import ToolGrid from "@/components/ToolGrid";
import TestimonialsMarquee from "@/components/animations/TestimonialsMarquee";
import ExploreAICourses from "@/components/ExploreAICourses";
import ToolModal from "@/components/ToolModal";
import Footer from "@/components/Footer";
import { AITool } from "@/data/tools";

export default function Home() {
  const [activeModalTool, setActiveModalTool] = useState<AITool | null>(null);

  const handleSearchClick = () => {
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBFF] text-[#1E1B2E] selection:bg-[#D8D2FA] selection:text-[#1E1B2E]">
      <ScrollProgress />
      {/* Navbar Header */}
      <Navbar onSearchClick={handleSearchClick} />

      {/* Main Content Body */}
      <main className="flex-grow">
        {/* GSAP Hero Section */}
        <GSAPHero />

        {/* Brand Marquee (People who learn from us) */}
        <BrandMarquee />

        {/* AI Job Statistics Section */}
        <AILayoffsStats />

        {/* Why Choose Us Bento Grid */}
        <WhyChooseUs />

        {/* Premium Infinite Horizontal Scrolling "Explore AI Courses" Section */}
        <ExploreAICourses />

        {/* GSAP Text Reveal Section (GSAP.com Homepage Inspired) */}
        <GSAPTextRevealSection />

        {/* Learning Journey Heatmap Streak Section */}
        <GSAPStreakHeatmap />

        {/* Ultra Premium How It Works GSAP Horizontal Scroll */}
        <GSAPHowItWorks />

        {/* Dedicated Dark Certificate Showcase Section */}
        <CertificateShowcase />

        {/* Interactive Role Dashboard Experience (Learner, Instructor, Admin) */}
        <InteractiveLearningDashboard />

        {/* Platform Features Grid */}
        <PlatformFeatures />

        {/* AI Tool Workflows Vertical Marquee */}
        <AIToolWorkflows />

        {/* Premium Loved by Developers Testimonials Marquee */}
        <TestimonialsMarquee />
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
