"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import AuthCard, { AuthMode } from "./AuthCard";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) {

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Dark backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#1E1B2E]/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md my-auto px-2 sm:px-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:-top-3 sm:-right-3 z-30 p-2 rounded-full bg-white dark:bg-[#1E1933] text-[#1E1B2E] dark:text-white shadow-lg border border-[#EAE6FE] dark:border-white/20 hover:bg-[#F3F0FE] dark:hover:bg-[#282142] transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <AuthCard initialMode={initialMode} isModal={true} onClose={onClose} />
      </div>
    </div>
  );
}
