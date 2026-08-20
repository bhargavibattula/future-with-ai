"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, X, Send } from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { TransitionWrapper } from "@/components/animations/TransitionWrapper";

interface CardData {
  id: string;
  type: "concept" | "video" | "audio" | "knowledge" | "interactive";
  props: any;
}

interface LessonContainerProps {
  cards: CardData[];
  onFinishLesson: () => void;
  onExit: () => void;
  lessonTitle: string;
  actions?: React.ReactNode;
}

export function LessonContainer({ cards, onFinishLesson, onExit, lessonTitle, actions }: LessonContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");

  // Prevent scrolling on body when lesson is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const progressPercentage = ((currentIndex + 1) / cards.length) * 100;

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinishLesson();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentCard = cards[currentIndex];

  const renderCard = () => {
    // This assumes the card components are imported in the parent and passed rendered,
    // OR we render them here based on type. Since we pass props, we'll render dynamically.
    // However, to keep this generic, we'll let the parent map types to components, 
    // or we can import them directly here to make LessonContainer smart.
    
    // For this implementation, we will assume the parent passes pre-rendered elements in `props.render`
    // or we import them. Let's do the latter for cleaner API.
    return (
      <div className="w-full max-w-5xl mx-auto h-full overflow-y-auto hide-scrollbar pb-32 pt-6 px-4">
        <TransitionWrapper animationKey={currentCard.id}>
          {currentCard.props.render({ onComplete: handleNext })}
        </TransitionWrapper>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] flex flex-col">
      {/* Top Header / Progress */}
      <header className="h-16 px-4 sm:px-8 border-b border-[#E8E3FF] dark:border-[#2A2640] flex items-center justify-between bg-white/80 dark:bg-[#1A1726]/80 backdrop-blur-xl">
        <button onClick={onExit} className="p-2 -ml-2 rounded-xl text-[#6B6785] hover:bg-[#F5F2FF] dark:hover:bg-[#252136] transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="w-full h-3 bg-[#E8E3FF] dark:bg-[#2A2640] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8B7FE8] to-[#74D99F]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {actions}
          <div className="w-10 flex justify-end font-bold text-xs text-[#8B7FE8]">
            {currentIndex + 1}/{cards.length}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-[#F8F9FC] dark:bg-[#13111C]">
        {renderCard()}
      </main>

      {/* Bottom Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent dark:from-[#1A1726] dark:via-[#1A1726]">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <PremiumButton
            variant="ghost"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`gap-2 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </PremiumButton>

          <PremiumButton
            variant="outline"
            onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
            className="gap-2 border-[#8B7FE8] text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </PremiumButton>

          <PremiumButton
            variant="primary"
            onClick={handleNext}
            className="gap-2"
          >
            {currentIndex === cards.length - 1 ? "Finish" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </PremiumButton>
        </div>
      </footer>

      {/* AI Assistant Sliding Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isAiPanelOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-16 bottom-0 right-0 w-full sm:w-[400px] bg-white dark:bg-[#1A1726] border-l border-[#E8E3FF] dark:border-[#2A2640] shadow-2xl flex flex-col z-50"
      >
        <div className="p-4 border-b border-[#E8E3FF] dark:border-[#2A2640] flex justify-between items-center bg-[#F5F2FF] dark:bg-[#252136]">
          <div className="flex items-center gap-2 text-[#8B7FE8] font-bold">
            <Sparkles className="w-5 h-5" />
            AI Tutor
          </div>
          <button onClick={() => setIsAiPanelOpen(false)} className="p-1 rounded-md hover:bg-white/50 dark:hover:bg-[#1A1726]/50">
            <X className="w-5 h-5 text-[#6B6785]" />
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
          <div className="p-4 rounded-2xl rounded-tl-none bg-[#F5F2FF] dark:bg-[#252136] text-[#1E1B2E] dark:text-white inline-block max-w-[90%] border border-[#E8E3FF] dark:border-[#3A3554]">
            Hi! Need help with "{lessonTitle}"? I can explain it simply, give an analogy, or translate it for you.
          </div>
        </div>

        <div className="p-4 border-t border-[#E8E3FF] dark:border-[#2A2640] bg-white dark:bg-[#1A1726]">
          <div className="relative">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-[#F8F9FC] dark:bg-[#13111C] border border-[#E8E3FF] dark:border-[#2A2640] rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#8B7FE8] dark:text-white"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#8B7FE8] text-white rounded-lg hover:bg-[#786BD6] transition-colors">
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
