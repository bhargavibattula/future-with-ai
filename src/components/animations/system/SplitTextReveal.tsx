"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SplitTextRevealProps {
  text: string;
  type?: "words" | "chars" | "lines";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  direction?: "up" | "down" | "left" | "right";
  rotation?: number;
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  badgeWords?: { word: string; bg: string; text: string; rotate?: number }[];
}

export default function SplitTextReveal({
  text,
  type = "words",
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  ease = "power4.out",
  direction = "up",
  rotation = 2,
  start = "top 85%",
  end = "bottom 20%",
  scrub = false,
  badgeWords = [],
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = containerRef.current.querySelectorAll(".split-unit");
      if (!items || items.length === 0) return;

      const yOffset = direction === "up" ? 50 : direction === "down" ? -50 : 0;
      const xOffset = direction === "left" ? 50 : direction === "right" ? -50 : 0;

      const animProps: gsap.TweenVars = {
        opacity: 0,
        y: yOffset,
        x: xOffset,
        rotate: rotation,
        duration,
        delay,
        ease,
        stagger,
      };

      if (scrub) {
        animProps.scrollTrigger = {
          trigger: containerRef.current,
          start,
          end,
          scrub,
        };
      } else {
        animProps.scrollTrigger = {
          trigger: containerRef.current,
          start,
          toggleActions: "play none none reverse",
        };
      }

      gsap.from(items, animProps);
    },
    { scope: containerRef }
  );

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`inline-block max-w-full ${className}`}>
      <span className="inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] items-baseline">
        {words.map((word, idx) => {
          // Check if word matches any badge word style (like GSAP.com colorful pills)
          const badgeMatch = badgeWords.find(
            (b) => b.word.toLowerCase() === word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
          );

          if (badgeMatch) {
            return (
              <span
                key={idx}
                className="split-unit inline-block overflow-hidden py-0.5 px-1 align-baseline"
              >
                <span
                  className="inline-block px-3 py-1 rounded-2xl text-xs sm:text-base font-black shadow-md transition-transform hover:scale-105"
                  style={{
                    backgroundColor: badgeMatch.bg,
                    color: badgeMatch.text,
                    transform: `rotate(${badgeMatch.rotate || 0}deg)`,
                  }}
                >
                  {word}
                </span>
              </span>
            );
          }

          if (type === "chars") {
            const chars = word.split("");
            return (
              <span key={idx} className="inline-block whitespace-nowrap overflow-hidden py-1">
                {chars.map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="split-unit inline-block transition-gpu origin-bottom-left"
                  >
                    {char}
                  </span>
                ))}
              </span>
            );
          }

          return (
            <span key={idx} className="inline-block overflow-hidden py-1">
              <span className="split-unit inline-block transition-gpu origin-bottom-left">
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </div>
  );
}
