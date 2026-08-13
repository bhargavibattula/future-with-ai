"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export function PremiumButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: PremiumButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-bold overflow-hidden transition-colors rounded-2xl active:scale-95";
  
  const variants = {
    primary: "bg-[#8B7FE8] text-white hover:bg-[#786BD6] shadow-[0_4px_14px_0_rgba(139,127,232,0.39)]",
    secondary: "bg-[#74D99F] text-[#0E2C20] hover:bg-[#52C582] shadow-[0_4px_14px_0_rgba(116,217,159,0.39)]",
    outline: "border-2 border-[#E8E3FF] dark:border-[#2A2640] text-[#1E1B2E] dark:text-white hover:border-[#8B7FE8] hover:bg-[#F5F2FF] dark:hover:bg-[#252136]",
    ghost: "text-[#6B6785] hover:text-[#1E1B2E] dark:text-[#A9A4C0] dark:hover:text-white hover:bg-[#F5F2FF] dark:hover:bg-[#252136]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    icon: "p-3",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
