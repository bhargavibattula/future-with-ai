"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SectionTransitionProps {
  children: React.ReactNode;
  pin?: boolean;
  scrub?: boolean | number;
  transitionType?: "push" | "wipe" | "scale" | "fade";
  className?: string;
  start?: string;
  end?: string;
}

export default function SectionTransition({
  children,
  pin = false,
  scrub = 1,
  transitionType = "push",
  className = "",
  start = "top top",
  end = "bottom top",
}: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !innerRef.current) return;

      if (transitionType === "scale") {
        gsap.fromTo(
          innerRef.current,
          { scale: 0.9, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "top top",
              scrub,
            },
          }
        );
      } else if (transitionType === "wipe") {
        gsap.fromTo(
          innerRef.current,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "top center",
              scrub,
            },
          }
        );
      }

      if (pin) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start,
          end,
          pin: innerRef.current,
          pinSpacing: true,
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div ref={innerRef} className="w-full">
        {children}
      </div>
    </div>
  );
}
