"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";

interface ConceptCardProps {
  title?: string;
  points: string[];
  onComplete: () => void;
}

export function ConceptCard({ title, points, onComplete }: ConceptCardProps) {
  const [revealedCount, setRevealedCount] = useState(1);
  const isComplete = revealedCount >= points.length;

  const handleRevealNext = () => {
    if (!isComplete) {
      setRevealedCount((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] p-8">
      {title && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-10"
        >
          <Sparkles className="w-6 h-6 text-[#8B7FE8]" />
          <h2 className="text-3xl font-black text-[#1E1B2E] dark:text-white tracking-tight text-center">
            {title}
          </h2>
        </motion.div>
      )}

      <div className="w-full space-y-6 mb-12">
        <AnimatePresence>
          {points.slice(0, revealedCount).map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
              className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-[#1A1726] border border-[#E8E3FF] dark:border-[#2A2640] shadow-sm"
            >
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-6 h-6 text-[#74D99F]" />
              </div>
              <p className="text-lg text-[#4A4660] dark:text-[#C5C0E0] leading-relaxed font-medium">
                {point}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={revealedCount}
      >
        <PremiumButton 
          onClick={handleRevealNext}
          variant={isComplete ? "secondary" : "primary"}
          size="lg"
          className="w-full sm:w-auto min-w-[200px]"
        >
          {isComplete ? "Continue" : "Next Point"}
        </PremiumButton>
      </motion.div>
    </div>
  );
}
