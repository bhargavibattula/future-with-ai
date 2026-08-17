"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SVGParallaxProps {
  children: React.ReactNode;
  speed?: number;
  rotateSpeed?: number;
  className?: string;
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  mouseParallax?: boolean;
}

export default function SVGParallax({
  children,
  speed = 40,
  rotateSpeed = 15,
  className = "",
  start = "top bottom",
  end = "bottom top",
  scrub = 1,
  mouseParallax = true,
}: SVGParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.to(containerRef.current, {
        y: -speed,
        rotate: rotateSpeed,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
        },
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (!mouseParallax || typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xFactor = (e.clientX / innerWidth - 0.5) * (speed * 0.3);
      const yFactor = (e.clientY / innerHeight - 0.5) * (speed * 0.3);

      gsap.to(containerRef.current, {
        x: xFactor,
        y: `-=${yFactor}`,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseParallax, speed]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
