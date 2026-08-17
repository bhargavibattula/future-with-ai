"use client";

import React, { useRef } from "react";
import gsap from "gsap";

export interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  duration?: number;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  duration = 0.6,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration,
      ease: "power2.out",
    });

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        x: x * (strength * 0.5),
        y: y * (strength * 0.5),
        duration,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: duration * 1.2,
      ease: "elastic.out(1.1, 0.4)",
    });

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: duration * 1.2,
        ease: "elastic.out(1.1, 0.4)",
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center transition-shadow cursor-pointer ${className}`}
    >
      <span ref={contentRef} className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
