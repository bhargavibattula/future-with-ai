"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FlameMascotProps {
  isCelebrating?: boolean;
  onCelebrationComplete?: () => void;
  className?: string;
}

export default function FlameMascot({
  isCelebrating = false,
  onCelebrationComplete,
  className = "",
}: FlameMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flameBodyRef = useRef<SVGGElement>(null);
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const leftHandRef = useRef<SVGPathElement>(null);
  const rightHandRef = useRef<SVGPathElement>(null);
  const sparklesRef = useRef<SVGGElement>(null);
  const embersRef = useRef<SVGGElement>(null);
  const confettiContainerRef = useRef<HTMLDivElement>(null);

  // Mouse Tracking for Eye & Body Tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Eye tracking pupils offset
      if (leftPupilRef.current && rightPupilRef.current) {
        gsap.to([leftPupilRef.current, rightPupilRef.current], {
          x: deltaX * 3.5,
          y: deltaY * 3.5,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      // Slight character body tilt toward cursor
      if (flameBodyRef.current) {
        gsap.to(flameBodyRef.current, {
          rotation: deltaX * 6,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Idle Animations (Breathing, Blinking, Floating Embers, Hand Wave)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Gentle breathing scale & sway
      if (flameBodyRef.current) {
        gsap.to(flameBodyRef.current, {
          scaleY: 1.05,
          scaleX: 0.96,
          transformOrigin: "bottom center",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
        });
      }

      // 2. Eye blinking
      const blinkTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3.5 });
      if (leftEyeRef.current && rightEyeRef.current) {
        blinkTimeline
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 0.1,
            transformOrigin: "center center",
            duration: 0.12,
            ease: "power2.in",
          })
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 1,
            transformOrigin: "center center",
            duration: 0.12,
            ease: "power2.out",
          });
      }

      // 3. Tiny hands subtle wave
      if (leftHandRef.current && rightHandRef.current) {
        gsap.to(leftHandRef.current, {
          rotation: -12,
          transformOrigin: "right center",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
        });
        gsap.to(rightHandRef.current, {
          rotation: 12,
          transformOrigin: "left center",
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
        });
      }

      // 4. Sparkles floating animation
      if (sparklesRef.current) {
        const sparkles = sparklesRef.current.children;
        gsap.to(sparkles, {
          y: -10,
          opacity: 0.9,
          duration: 1.5,
          stagger: 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
        });
      }

      // 5. Floating Embers rising up
      if (embersRef.current) {
        const embers = embersRef.current.children;
        gsap.to(embers, {
          y: -25,
          x: "random(-10, 10)",
          opacity: 0,
          duration: 2.2,
          stagger: 0.4,
          repeat: -1,
          ease: "power1.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Celebration Jump & Confetti Burst
  useEffect(() => {
    if (!isCelebrating) return;

    const ctx = gsap.context(() => {
      // Flame jump & spin animation
      if (flameBodyRef.current) {
        gsap.timeline({
          onComplete: () => {
            if (onCelebrationComplete) onCelebrationComplete();
          },
        })
          .to(flameBodyRef.current, {
            scaleY: 0.75,
            scaleX: 1.2,
            duration: 0.15,
            ease: "power2.in",
          })
          .to(flameBodyRef.current, {
            y: -40,
            scaleY: 1.25,
            scaleX: 0.85,
            rotation: 360,
            duration: 0.5,
            ease: "back.out(2)",
          })
          .to(flameBodyRef.current, {
            y: 0,
            scaleY: 1,
            scaleX: 1,
            rotation: 0,
            duration: 0.4,
            ease: "bounce.out",
          });
      }

      // Palette Confetti Burst
      if (confettiContainerRef.current) {
        const paletteColors = ["#8B7FE8", "#FFC9DE", "#B8E8D8", "#D8D2FA", "#786BD6"];
        for (let i = 0; i < 28; i++) {
          const confetti = document.createElement("div");
          const color = paletteColors[i % paletteColors.length];
          const size = Math.random() * 8 + 6;

          confetti.style.position = "absolute";
          confetti.style.width = `${size}px`;
          confetti.style.height = `${size}px`;
          confetti.style.backgroundColor = color;
          confetti.style.borderRadius = Math.random() > 0.4 ? "50%" : "3px";
          confetti.style.left = "50%";
          confetti.style.top = "50%";
          confetti.style.pointerEvents = "none";
          confetti.style.zIndex = "30";

          confettiContainerRef.current.appendChild(confetti);

          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 100 + 40;
          const targetX = Math.cos(angle) * distance;
          const targetY = Math.sin(angle) * distance - 30;

          gsap.to(confetti, {
            x: targetX,
            y: targetY,
            rotation: Math.random() * 360,
            opacity: 0,
            scale: 0.3,
            duration: 1 + Math.random() * 0.4,
            ease: "power3.out",
            onComplete: () => confetti.remove(),
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isCelebrating, onCelebrationComplete]);

  return (
    <div ref={containerRef} className={`relative inline-block cursor-pointer ${className}`}>
      {/* Confetti Container Overlay */}
      <div ref={confettiContainerRef} className="absolute inset-0 pointer-events-none z-30" />

      {/* SVG Mascot Character */}
      <svg
        viewBox="0 0 160 180"
        className="w-32 h-36 sm:w-40 sm:h-44 drop-shadow-[0_12px_30px_rgba(139,127,232,0.35)] overflow-visible"
      >
        {/* Soft Radial Glow Base */}
        <defs>
          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B7FE8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8B7FE8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="outerFlame" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B7FE8" />
            <stop offset="50%" stopColor="#786BD6" />
            <stop offset="100%" stopColor="#8B7FE8" />
          </linearGradient>
          <linearGradient id="innerFlame" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFC9DE" />
            <stop offset="60%" stopColor="#D8D2FA" />
            <stop offset="100%" stopColor="#8B7FE8" />
          </linearGradient>
          <linearGradient id="coreHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B8E8D8" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Glow Halo behind mascot */}
        <circle cx="80" cy="110" r="70" fill="url(#flameGlow)" />

        {/* Floating Sparkles around character */}
        <g ref={sparklesRef}>
          <path d="M 28 48 L 31 54 L 37 57 L 31 60 L 28 66 L 25 60 L 19 57 L 25 54 Z" fill="#FFC9DE" opacity="0.9" />
          <path d="M 132 62 L 134 67 L 139 69 L 134 71 L 132 76 L 130 71 L 125 69 L 130 67 Z" fill="#B8E8D8" opacity="0.9" />
          <path d="M 122 28 L 123 32 L 127 33 L 123 34 L 122 38 L 121 34 L 117 33 L 121 32 Z" fill="#D8D2FA" opacity="0.8" />
        </g>

        {/* Floating Embers */}
        <g ref={embersRef}>
          <circle cx="45" cy="130" r="2.5" fill="#FFC9DE" opacity="0.8" />
          <circle cx="115" cy="125" r="2" fill="#B8E8D8" opacity="0.8" />
          <circle cx="75" cy="140" r="2" fill="#D8D2FA" opacity="0.8" />
        </g>

        {/* Main Flame Character Group */}
        <g ref={flameBodyRef}>
          {/* Outer Flame Silhouette */}
          <path
            d="M 80 15 
               C 105 45, 135 75, 135 110 
               C 135 142, 110 162, 80 162 
               C 50 162, 25 142, 25 110 
               C 25 75, 55 45, 80 15 Z"
            fill="url(#outerFlame)"
          />

          {/* Inner Layer Flame Accent */}
          <path
            d="M 80 40 
               C 98 65, 120 88, 120 115 
               C 120 138, 102 154, 80 154 
               C 58 154, 40 138, 40 115 
               C 40 88, 62 65, 80 40 Z"
            fill="url(#innerFlame)"
          />

          {/* Core Spark Highlight */}
          <path
            d="M 80 70 
               C 90 85, 102 100, 102 120 
               C 102 133, 92 144, 80 144 
               C 68 144, 58 133, 58 120 
               C 58 100, 70 85, 80 70 Z"
            fill="url(#coreHighlight)"
          />

          {/* Tiny Cute Waving Hands */}
          <path
            ref={leftHandRef}
            d="M 38 112 Q 22 105, 20 115"
            stroke="#8B7FE8"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            ref={rightHandRef}
            d="M 122 112 Q 138 105, 140 115"
            stroke="#8B7FE8"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cute Face: Eyes & Pupil Tracking */}
          <g>
            {/* Left Eye */}
            <circle ref={leftEyeRef} cx="66" cy="108" r="5" fill="#1E1B2E" />
            <circle ref={leftPupilRef} cx="68" cy="106" r="1.8" fill="#FFFFFF" />

            {/* Right Eye */}
            <circle ref={rightEyeRef} cx="94" cy="108" r="5" fill="#1E1B2E" />
            <circle ref={rightPupilRef} cx="96" cy="106" r="1.8" fill="#FFFFFF" />
          </g>

          {/* Cute Smiling Mouth */}
          <path
            d="M 72 118 Q 80 126, 88 118"
            stroke="#1E1B2E"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Rosy Cheeks */}
          <circle cx="58" cy="115" r="4" fill="#FFC9DE" opacity="0.8" />
          <circle cx="102" cy="115" r="4" fill="#FFC9DE" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
