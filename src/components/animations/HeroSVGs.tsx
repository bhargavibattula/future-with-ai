"use client";

import React from "react";

export const AIBrainSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F0FF" />
        <stop offset="50%" stopColor="#7C5CFC" />
        <stop offset="100%" stopColor="#FF2A85" />
      </linearGradient>
    </defs>
    <path
      d="M50 15C32 15 20 28 20 45C20 58 28 68 38 72V85H62V72C72 68 80 58 80 45C80 28 68 15 50 15Z"
      stroke="url(#brainGrad)"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path d="M35 35C40 30 45 35 50 30C55 35 60 30 65 35" stroke="url(#brainGrad)" strokeWidth="3" />
    <path d="M30 48C40 42 45 52 50 45C55 52 60 42 70 48" stroke="url(#brainGrad)" strokeWidth="3" />
    <circle cx="50" cy="30" r="3" fill="#00F0FF" />
    <circle cx="35" cy="45" r="3" fill="#FF2A85" />
    <circle cx="65" cy="45" r="3" fill="#7C5CFC" />
  </svg>
);

export const RobotSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E599" />
        <stop offset="100%" stopColor="#00F0FF" />
      </linearGradient>
    </defs>
    <rect x="25" y="30" width="50" height="42" rx="12" stroke="url(#botGrad)" strokeWidth="3.5" fill="#12101F" />
    <line x1="50" y1="15" x2="50" y2="30" stroke="url(#botGrad)" strokeWidth="3.5" />
    <circle cx="50" cy="12" r="5" fill="#00E599" />
    <circle cx="40" cy="48" r="5" fill="#00F0FF" />
    <circle cx="60" cy="48" r="5" fill="#00F0FF" />
    <path d="M38 62C44 66 56 66 62 62" stroke="url(#botGrad)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const CodeWindowSVG = ({ className = "w-20 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C5CFC" />
        <stop offset="100%" stopColor="#00F0FF" />
      </linearGradient>
    </defs>
    <rect x="10" y="10" width="100" height="70" rx="10" fill="#0D0B18" stroke="url(#codeGrad)" strokeWidth="3" />
    <circle cx="24" cy="24" r="3.5" fill="#FF5F56" />
    <circle cx="36" cy="24" r="3.5" fill="#FFBD2E" />
    <circle cx="48" cy="24" r="3.5" fill="#27C93F" />
    <line x1="10" y1="36" x2="110" y2="36" stroke="#25213B" strokeWidth="2" />
    <path d="M24 50L34 58L24 66" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="42" y1="66" x2="75" y2="66" stroke="#7C5CFC" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const LightningSVG = ({ className = "w-12 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD600" />
        <stop offset="100%" stopColor="#FF2A85" />
      </linearGradient>
    </defs>
    <path
      d="M35 5L10 48H32L22 85L52 40H30L35 5Z"
      fill="url(#boltGrad)"
      stroke="#FFD600"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const StarSparkleSVG = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 0C30 16.5685 43.4315 30 60 30C43.4315 30 30 43.4315 30 60C30 43.4315 16.5685 30 0 30C16.5685 30 30 16.5685 30 0Z"
      fill="url(#starGrad)"
    />
    <defs>
      <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F0FF" />
        <stop offset="100%" stopColor="#7C5CFC" />
      </linearGradient>
    </defs>
  </svg>
);

export const FloatingCubeSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15L85 35V70L50 90L15 70V35L50 15Z" fill="#18142A" stroke="#7C5CFC" strokeWidth="3" />
    <path d="M50 15V90" stroke="#7C5CFC" strokeWidth="2.5" />
    <path d="M50 52.5L85 35" stroke="#00F0FF" strokeWidth="2.5" />
    <path d="M50 52.5L15 35" stroke="#FF2A85" strokeWidth="2.5" />
  </svg>
);

export const CertificateRibbonSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="certGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B7FE8" />
        <stop offset="100%" stopColor="#D8D2FA" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="40" r="25" stroke="url(#certGrad)" strokeWidth="4" fill="#1E1B2E" />
    <path d="M50 25L54 34L64 35L56 42L59 52L50 46L41 52L44 42L36 35L46 34L50 25Z" fill="#8B7FE8" />
    <path d="M38 60L30 85L50 75L70 85L62 60" stroke="url(#certGrad)" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
  </svg>
);

export const QuizPuzzleSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="quizGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B8E8D8" />
        <stop offset="100%" stopColor="#8B7FE8" />
      </linearGradient>
    </defs>
    <rect x="20" y="20" width="60" height="60" rx="12" stroke="url(#quizGrad)" strokeWidth="3.5" fill="#1E1B2E" />
    <path d="M40 35H60M35 50H65M45 65H55" stroke="url(#quizGrad)" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="68" cy="35" r="4" fill="#B8E8D8" />
  </svg>
);

export const CircuitPathSVG = ({ className = "w-full h-24" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 50 Q 150 10 300 50 T 590 50"
      stroke="url(#circuitGrad)"
      strokeWidth="3"
      strokeDasharray="8 8"
    />
    <defs>
      <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B7FE8" />
        <stop offset="50%" stopColor="#B8E8D8" />
        <stop offset="100%" stopColor="#FFC9DE" />
      </linearGradient>
    </defs>
  </svg>
);
