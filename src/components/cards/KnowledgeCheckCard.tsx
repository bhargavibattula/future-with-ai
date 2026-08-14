"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, BrainCircuit } from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";

interface KnowledgeCheckCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  onComplete: () => void;
}

export function KnowledgeCheckCard({
  question,
  options,
  correctAnswer,
  explanation,
  onComplete,
}: KnowledgeCheckCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSelect = (option: string) => {
    if (isRevealed) return;
    setSelectedAnswer(option);
    setIsRevealed(true);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 mb-10 text-center"
      >
        <div className="p-4 bg-[#F5F2FF] dark:bg-[#252136] rounded-full mb-2">
          <BrainCircuit className="w-8 h-8 text-[#8B7FE8]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B2E] dark:text-white tracking-tight">
          {question}
        </h2>
      </motion.div>

      <div className="w-full space-y-4 mb-8">
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isActuallyCorrect = option === correctAnswer;

          let btnStateClasses = "bg-white dark:bg-[#1A1726] border-[#E8E3FF] dark:border-[#2A2640] hover:border-[#8B7FE8]/50";
          
          if (isRevealed) {
            if (isActuallyCorrect) {
              btnStateClasses = "bg-[#E6F9F0] dark:bg-[#0E2C20] border-[#74D99F] text-[#0E8566] dark:text-[#74D99F]";
            } else if (isSelected && !isActuallyCorrect) {
              btnStateClasses = "bg-[#FFF0F5] dark:bg-[#301622] border-[#FFC9DE] text-[#D80056] dark:text-[#FFC9DE]";
            } else {
              btnStateClasses = "opacity-50 grayscale";
            }
          }

          return (
            <motion.button
              key={idx}
              onClick={() => handleSelect(option)}
              whileHover={!isRevealed ? { y: -2 } : {}}
              whileTap={!isRevealed ? { scale: 0.98 } : {}}
              className={`w-full p-5 rounded-2xl border-2 text-left font-bold text-lg transition-all duration-300 flex items-center justify-between shadow-sm ${btnStateClasses}`}
            >
              <span>{option}</span>
              {isRevealed && isActuallyCorrect && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                </motion.div>
              )}
              {isRevealed && isSelected && !isActuallyCorrect && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  <XCircle className="w-6 h-6 stroke-[3]" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            className="w-full flex flex-col items-center"
          >
            {explanation && (
              <div className={`w-full p-5 mb-8 rounded-2xl border ${isCorrect ? 'bg-[#E6F9F0] border-[#74D99F] text-[#0E2C20]' : 'bg-[#FFF0F5] border-[#FFC9DE] text-[#301622]'}`}>
                <h4 className="font-extrabold mb-1">{isCorrect ? 'Great job!' : 'Not quite.'}</h4>
                <p className="text-sm font-medium">{explanation}</p>
              </div>
            )}
            
            <PremiumButton onClick={onComplete} size="lg" className="w-full sm:w-auto min-w-[200px]">
              Continue
            </PremiumButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
