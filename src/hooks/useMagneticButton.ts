"use client";

import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";

/* ════════════════════════════════════════════════════
   useMagneticButton — GSAP quickTo() cursor-tracking hook
   
   Attaches magnetic mouse-follow to any element ref.
   Uses gsap.quickTo for 60fps-smooth interpolation.
   Resets with elastic easing on mouse leave.
   ════════════════════════════════════════════════════ */

interface MagneticOptions {
  /** How strongly the button follows the cursor (0–1). Default 0.35 */
  strength?: number;
  /** Inner content follows at a different rate. Default strength * 0.4 */
  innerStrength?: number;
  /** Duration of the follow interpolation in seconds. Default 0.5 */
  duration?: number;
  /** Whether the effect is active. Default true */
  enabled?: boolean;
}

export function useMagneticButton<
  TOuter extends HTMLElement = HTMLElement,
  TInner extends HTMLElement = HTMLElement,
>(options: MagneticOptions = {}) {
  const {
    strength = 0.35,
    innerStrength = strength * 0.4,
    duration = 0.5,
    enabled = true,
  } = options;

  const outerRef = useRef<TOuter>(null);
  const innerRef = useRef<TInner>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const outer = outerRef.current;
    if (!outer) return;

    // gsap.quickTo creates a re-usable tween that updates a single property
    const xTo = gsap.quickTo(outer, "x", { duration, ease: "power3" });
    const yTo = gsap.quickTo(outer, "y", { duration, ease: "power3" });

    let xToInner: ReturnType<typeof gsap.quickTo> | null = null;
    let yToInner: ReturnType<typeof gsap.quickTo> | null = null;

    if (innerRef.current) {
      xToInner = gsap.quickTo(innerRef.current, "x", { duration, ease: "power3" });
      yToInner = gsap.quickTo(innerRef.current, "y", { duration, ease: "power3" });
    }

    const handleMove = (e: MouseEvent) => {
      const rect = outer.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      xTo(relX * strength);
      yTo(relY * strength);

      if (xToInner && yToInner) {
        xToInner(relX * innerStrength);
        yToInner(relY * innerStrength);
      }
    };

    const handleLeave = () => {
      // Elastic snap-back
      gsap.to(outer, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1.1, 0.5)" });
      if (innerRef.current) {
        gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1.1, 0.5)" });
      }
    };

    outer.addEventListener("mousemove", handleMove);
    outer.addEventListener("mouseleave", handleLeave);

    return () => {
      outer.removeEventListener("mousemove", handleMove);
      outer.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, strength, innerStrength, duration]);

  return { outerRef, innerRef };
}
