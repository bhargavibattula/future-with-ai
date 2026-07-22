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
      <div className="relative z-10 w-full max-w-md my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-20 p-2.5 rounded-full bg-white text-[#1E1B2E] shadow-lg border border-[#EAE6FE] hover:bg-[#F3F0FE] hover:scale-110 transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <AuthCard initialMode={initialMode} isModal={true} onClose={onClose} />
      </div>
    </div>
  );
}
