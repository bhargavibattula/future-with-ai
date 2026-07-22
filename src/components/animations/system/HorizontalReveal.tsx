"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HorizontalRevealProps {
  children: React.ReactNode;
  direction?: "left-to-right" | "right-to-left";
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export default function HorizontalReveal({
  children,
  direction = "left-to-right",
  duration = 1.2,
  delay = 0,
  ease = "power4.inOut",
  className = "",
  start = "top 85%",
  end = "bottom 30%",
  scrub = false,
}: HorizontalRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const initialClip =
        direction === "left-to-right"
          ? "polygon(0 0, 0% 0, 0% 100%, 0 100%)"
          : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";

      const targetClip = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

      gsap.fromTo(
        containerRef.current,
        {
          clipPath: initialClip,
          webkitClipPath: initialClip,
          opacity: 0.2,
        },
        {
          clipPath: targetClip,
          webkitClipPath: targetClip,
          opacity: 1,
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
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
