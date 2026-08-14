"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Play, CheckCircle2 } from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";

interface InteractiveDemoCardProps {
  title: string;
  description: string;
  codeSnippet?: string;
  onComplete: () => void;
}

export function InteractiveDemoCard({
  title,
  description,
  codeSnippet,
  onComplete,
}: InteractiveDemoCardProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh] p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B2E] dark:text-white tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-[#6B6785] dark:text-[#A9A4C0] text-lg font-medium">
          {description}
        </p>
      </motion.div>

      <div className="w-full bg-[#13111C] rounded-3xl overflow-hidden border border-[#2A2640] shadow-xl mb-8">
        <div className="flex items-center justify-between px-4 py-3 bg-[#1A1726] border-b border-[#2A2640]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-xs font-mono font-bold text-[#6B6785]">Terminal</span>
          <div className="w-4" /> {/* Spacer */}
        </div>
        
        <div className="p-6 relative min-h-[200px] flex flex-col">
          {codeSnippet && (
            <pre className="font-mono text-sm text-[#E2DEF5] whitespace-pre-wrap mb-4">
              {codeSnippet}
            </pre>
          )}

          <div className="mt-auto flex justify-end">
            {!hasExecuted ? (
              <PremiumButton
                size="sm"
                onClick={handleExecute}
                disabled={isExecuting}
                className="gap-2"
              >
                {isExecuting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Terminal className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
                {isExecuting ? "Compiling..." : "Run Code"}
              </PremiumButton>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-[#74D99F] font-bold text-sm bg-[#0E2C20] px-4 py-2 rounded-xl"
              >
                <CheckCircle2 className="w-5 h-5" />
                Execution Successful
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasExecuted ? 1 : 0.5 }}
        className="w-full flex justify-center"
      >
        <PremiumButton
          size="lg"
          variant={hasExecuted ? "primary" : "ghost"}
          onClick={onComplete}
          disabled={!hasExecuted}
          className="min-w-[200px]"
        >
          Continue
        </PremiumButton>
      </motion.div>
    </div>
  );
}
