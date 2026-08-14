"use client";

import React, { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMagneticButton } from "@/hooks/useMagneticButton";

/* ════════════════════════════════════════════════════
   ExploreCoursesButton — Premium CTA with black → purple fill hover

   • Pill shape (9999px), 58px height
   • Dark (#1E1B2E) default bg, purple (#8B7FE8) fill slides up on hover
   • Magnetic cursor-follow via useMagneticButton
   • Click compress → expand + ripple
   • Idle subtle float + glow pulse
   • Loading / disabled / light & dark themes
   ════════════════════════════════════════════════════ */

interface ExploreCoursesButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

export default function ExploreCoursesButton({
  children = "Explore Courses",
  onClick,
  loading = false,
  disabled = false,
  theme = "light",
  className = "",
}: ExploreCoursesButtonProps) {
  /* ─── Refs ─── */
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  /* ─── Magnetic effect ─── */
  const { outerRef, innerRef } = useMagneticButton<HTMLDivElement, HTMLDivElement>({
    strength: 0.35,
    enabled: !disabled && !loading,
  });

  /* ─── Idle: subtle float + glow pulse ─── */
  useGSAP(
    () => {
      if (disabled || loading) return;

      gsap.to(btnWrapRef.current, {
        y: -3,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.5,
          scale: 1.08,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: btnWrapRef, dependencies: [disabled, loading] }
  );

  /* ─── Hover: scale + arrow slide + fill up ─── */
  const handleMouseEnter = useCallback(() => {
    if (disabled || loading) return;

    gsap.to(btnWrapRef.current, {
      scale: 1.04,
      duration: 0.5,
      ease: "elastic.out(1, 0.6)",
    });

    // Purple fill slides up from bottom
    gsap.to(fillRef.current, {
      y: "0%",
      duration: 0.55,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    });

    gsap.to(arrowRef.current, {
      x: 6,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(textRef.current, {
      x: -2,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(glowRef.current, {
      opacity: 0.8,
      scale: 1.2,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [disabled, loading]);

  const handleMouseLeave = useCallback(() => {
    if (disabled || loading) return;

    gsap.to(btnWrapRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1.1, 0.5)",
    });

    // Purple fill slides back down
    gsap.to(fillRef.current, {
      y: "101%",
      duration: 0.55,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    });

    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.6)",
    });

    gsap.to(textRef.current, {
      x: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.6)",
    });

    gsap.to(glowRef.current, {
      opacity: 0.35,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [disabled, loading]);

  /* ─── Click: compress → expand → ripple ─── */
  const handleClick = useCallback(() => {
    if (disabled || loading) return;

    const clickTl = gsap.timeline();
    clickTl.to(btnWrapRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.in",
    });
    clickTl.to(btnWrapRef.current, {
      scale: 1.04,
      duration: 0.4,
      ease: "elastic.out(1.2, 0.4)",
    });

    if (rippleRef.current) {
      gsap.set(rippleRef.current, { scale: 0, opacity: 0.6 });
      gsap.to(rippleRef.current, {
        scale: 2.5,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    onClick?.();
  }, [disabled, loading, onClick]);

  /* ─── Theme tokens ─── */
  const isLight = theme === "light";
  const baseBg = isLight ? "#1E1B2E" : "#8B7FE8";
  const fillBg = isLight ? "#8B7FE8" : "#6B5BD6";
  const glowColor = isLight
    ? "rgba(139, 127, 232, 0.35)"
    : "rgba(139, 127, 232, 0.45)";

  return (
    <div ref={outerRef} className="inline-block will-change-transform">
      <div ref={innerRef}>
        <div
          ref={btnWrapRef}
          className="relative will-change-transform"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Glow */}
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-[9999px] opacity-35 blur-xl pointer-events-none -z-10 scale-110"
            style={{ background: glowColor }}
            aria-hidden="true"
          />

          {/* Button */}
          <button
            onClick={handleClick}
            disabled={disabled || loading}
            aria-busy={loading}
            aria-label={typeof children === "string" ? children : "Explore Courses"}
            className={`
              relative flex items-center justify-center gap-3
              h-[58px] px-[34px] rounded-[9999px]
              font-[var(--font-display)] font-semibold text-[15px]
              text-white border-none cursor-pointer select-none
              overflow-hidden isolate
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7FE8] focus-visible:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
              ${className}
            `}
            style={{
              backgroundColor: baseBg,
              boxShadow: "0 4px 20px rgba(30, 27, 46, 0.15), 0 1px 4px rgba(30, 27, 46, 0.08)",
            }}
          >
            {/* Purple fill that slides up from bottom on hover */}
            <span
              ref={fillRef}
              className="absolute inset-0 -z-[1] pointer-events-none"
              style={{
                backgroundColor: fillBg,
                transform: "translateY(101%)",
              }}
              aria-hidden="true"
            />

            {/* Ripple */}
            <span
              ref={rippleRef}
              className="absolute inset-0 rounded-[9999px] -z-[5] pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
                transformOrigin: "center",
                scale: 0,
                opacity: 0,
              }}
              aria-hidden="true"
            />

            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span ref={textRef} className="will-change-transform">
                  {children}
                </span>
                <span ref={arrowRef} className="text-lg will-change-transform" aria-hidden="true">
                  →
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
