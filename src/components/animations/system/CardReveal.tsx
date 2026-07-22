"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CardRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "bottom" | "top";
  delay?: number;
  duration?: number;
  stagger?: number;
  tilt3d?: boolean;
  className?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export default function CardReveal({
  children,
  direction = "bottom",
  delay = 0,
  duration = 0.9,
  tilt3d = true,
  className = "",
  start = "top 85%",
  end = "bottom 20%",
  scrub = false,
}: CardRevealProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      const xOffset = direction === "left" ? -80 : direction === "right" ? 80 : 0;
      const yOffset = direction === "bottom" ? 80 : direction === "top" ? -80 : 0;

      gsap.fromTo(
        cardRef.current,
        {
          x: xOffset,
          y: yOffset,
          opacity: 0,
          scale: 0.94,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: scrub
            ? {
                trigger: cardRef.current,
                start,
                end,
                scrub,
              }
            : {
                trigger: cardRef.current,
                start,
                toggleActions: "play none none reverse",
              },
        }
      );
    },
    { scope: cardRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt3d || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(cardRef.current, {
      rotateY: x / 25,
      rotateX: -y / 25,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!tilt3d || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu transition-shadow ${className}`}
      style={{ perspective: "1000px" }}
    >
      {children}
    </div>
  );
}
