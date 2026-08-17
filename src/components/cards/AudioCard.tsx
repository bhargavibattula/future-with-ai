"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Languages, AudioLines } from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";

interface AudioCardProps {
  title: string;
  transcript: string;
  onComplete: () => void;
}

export function AudioCard({ title, transcript, onComplete }: AudioCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState<"en" | "te">("en");

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleLanguage = () => setLanguage(l => l === "en" ? "te" : "en");

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full p-8 rounded-3xl bg-white dark:bg-[#1A1726] border border-[#E8E3FF] dark:border-[#2A2640] shadow-soft flex flex-col items-center text-center mb-10"
      >
        <h2 className="text-2xl font-black text-[#1E1B2E] dark:text-white tracking-tight mb-8">
          {title}
        </h2>
        
        {/* Animated Waveform Placeholder */}
        <div className="flex items-center justify-center gap-1 mb-8 h-16">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: isPlaying ? [10, 40, 20, 60, 10] : 10 }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
              className="w-2 bg-[#8B7FE8] rounded-full"
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <PremiumButton variant="outline" size="icon" onClick={toggleLanguage} className="rounded-full">
            <Languages className="w-5 h-5 text-[#8B7FE8]" />
          </PremiumButton>
          
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-[#8B7FE8] hover:bg-[#786BD6] shadow-md flex items-center justify-center transition-transform active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white fill-current" />
            ) : (
              <Play className="w-8 h-8 text-white fill-current ml-1" />
            )}
          </button>
          
          <PremiumButton variant="outline" size="icon" className="rounded-full opacity-50 cursor-not-allowed">
            <span className="text-xs font-bold px-1">1x</span>
          </PremiumButton>
        </div>
        
        <div className="mt-6 text-sm font-bold text-[#6B6785] dark:text-[#A9A4C0]">
          Language: {language === "en" ? "English" : "Telugu"}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full mb-8 p-6 rounded-2xl bg-[#F5F2FF] dark:bg-[#252136] border border-[#E8E3FF] dark:border-[#3A3554]"
      >
        <div className="flex items-center gap-2 mb-3 text-[#8B7FE8]">
          <AudioLines className="w-4 h-4" />
          <h4 className="text-xs font-bold uppercase tracking-wider">Transcript</h4>
        </div>
        <p className="text-[#4A4660] dark:text-[#C5C0E0] leading-relaxed font-medium">
          {transcript}
        </p>
      </motion.div>

      <PremiumButton onClick={onComplete} size="lg" className="w-full sm:w-auto min-w-[200px]">
        Continue
      </PremiumButton>
    </div>
  );
}
