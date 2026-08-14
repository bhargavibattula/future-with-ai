"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface GlowCursorProps {
  color?: string;
  size?: number;
  blur?: number;
  className?: string;
}

export default function GlowCursor({
  color = "rgba(124, 92, 252, 0.25)",
  size = 280,
  blur = 60,
  className = "",
}: GlowCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !cursorRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX - size / 2);
      yTo(e.clientY - size / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-opacity duration-300 hidden md:block ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
