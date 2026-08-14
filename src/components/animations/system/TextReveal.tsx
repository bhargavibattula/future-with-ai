"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  ease?: string;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export default function TextReveal({
  children,
  delay = 0,
  duration = 0.8,
  ease = "power3.out",
  direction = "up",
  className = "",
  start = "top 85%",
  end = "bottom 20%",
  scrub = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
      const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: yOffset,
          x: xOffset,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease,
          scrollTrigger: scrub
            ? {
                trigger: containerRef.current,
                start,
                end,
                scrub,
              }
            : {
                trigger: containerRef.current,
                start,
                toggleActions: "play none none reverse",
              },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
