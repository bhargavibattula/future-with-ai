"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface SVGFloatProps {
  children: React.ReactNode;
  floatDistance?: number;
  rotateDegree?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  direction?: "vertical" | "horizontal" | "both";
  interactiveHover?: boolean;
}

export default function SVGFloat({
  children,
  floatDistance = 16,
  rotateDegree = 8,
  duration = 3.5,
  delay = 0,
  ease = "sine.inOut",
  className = "",
  direction = "vertical",
  interactiveHover = true,
}: SVGFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const vars: gsap.TweenVars = {
        repeat: -1,
        yoyo: true,
        ease,
        duration,
        delay,
      };

      if (direction === "vertical" || direction === "both") {
        vars.y = `-=${floatDistance}`;
      }
      if (direction === "horizontal" || direction === "both") {
        vars.x = `+=${floatDistance * 0.7}`;
      }
      if (rotateDegree !== 0) {
        vars.rotate = `+=${rotateDegree}`;
      }

      gsap.to(containerRef.current, vars);
    },
    { scope: containerRef }
  );

  const handleMouseEnter = () => {
    if (!interactiveHover || !containerRef.current) return;
    gsap.to(containerRef.current, {
      scale: 1.15,
      duration: 0.3,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = () => {
    if (!interactiveHover || !containerRef.current) return;
    gsap.to(containerRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}
