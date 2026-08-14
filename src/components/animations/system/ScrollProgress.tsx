"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollProgressProps {
  color?: string;
  height?: string;
  position?: "top" | "bottom";
  className?: string;
}

export default function ScrollProgress({
  color = "linear-gradient(90deg, #7C5CFC, #FF2A85, #00F0FF)",
  height = "3px",
  position = "top",
  className = "",
}: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!progressRef.current || typeof window === "undefined") return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  });

  return (
    <div
      className={`fixed ${position === "top" ? "top-0" : "bottom-0"} left-0 w-full z-50 pointer-events-none ${className}`}
      style={{ height }}
    >
      <div
        ref={progressRef}
        className="w-full h-full origin-left transform-gpu scale-x-0"
        style={{ background: color }}
      />
    </div>
  );
}
