"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface MaskRevealProps {
  children: React.ReactNode;
  type?: "circle" | "inset" | "diagonal";
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export default function MaskReveal({
  children,
  type = "circle",
  duration = 1.4,
  delay = 0,
  ease = "power3.inOut",
  className = "",
  start = "top 80%",
  end = "bottom 20%",
  scrub = false,
}: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      let fromMask = "circle(0% at 50% 50%)";
      let toMask = "circle(150% at 50% 50%)";

      if (type === "inset") {
        fromMask = "inset(50% 50% 50% 50% round 30px)";
        toMask = "inset(0% 0% 0% 0% round 0px)";
      } else if (type === "diagonal") {
        fromMask = "polygon(0 0, 0 0, 0 100%, 0 100%)";
        toMask = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      }

      gsap.fromTo(
        containerRef.current,
        { clipPath: fromMask, webkitClipPath: fromMask },
        {
          clipPath: toMask,
          webkitClipPath: toMask,
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
