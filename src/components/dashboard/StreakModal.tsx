"use client";

import { X } from "lucide-react";
import StreakCalendar from "@/components/dashboard/StreakCalendar";

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLeaderboard?: () => void;
}

export default function StreakModal({ isOpen, onClose, onOpenLeaderboard }: StreakModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop matching the site theme */}
      <div 
        className="absolute inset-0 bg-[#1E1B2E]/60 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col z-10">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-10 h-10 rounded-2xl bg-white text-[#8B7FE8] hover:bg-[#F3F0FE] flex items-center justify-center transition-all shadow-xl z-20 border border-[#EAE6FE]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Reuse the themed StreakCalendar */}
        <StreakCalendar 
          onOpenLeaderboard={() => {
            onClose();
            if (onOpenLeaderboard) onOpenLeaderboard();
          }} 
        />
      </div>
    </div>
  );
}
