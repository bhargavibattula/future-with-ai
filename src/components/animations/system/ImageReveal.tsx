"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ImageRevealProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  scaleFrom?: number;
}

export default function ImageReveal({
  children,
  duration = 1.2,
  delay = 0,
  ease = "power3.inOut",
  className = "",
  start = "top 85%",
  end = "bottom 20%",
  scrub = false,
  scaleFrom = 1.3,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !imageRef.current) return;

      const tl = gsap.timeline({
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
      });

      tl.fromTo(
        containerRef.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration, delay, ease }
      ).fromTo(
        imageRef.current,
        { scale: scaleFrom },
        { scale: 1, duration, ease: "power2.out" },
        `<`
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imageRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
