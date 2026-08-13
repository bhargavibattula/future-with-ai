"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionWrapperProps {
  children: React.ReactNode;
  animationKey: string | number;
}

export function TransitionWrapper({ children, animationKey }: TransitionWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial={{ opacity: 0, x: 20, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -20, scale: 0.98 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          opacity: { duration: 0.2 }
        }}
        className="w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
