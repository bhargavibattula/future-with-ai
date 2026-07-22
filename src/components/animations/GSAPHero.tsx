"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ExploreCoursesButton from "@/components/ui/ExploreCoursesButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ════════════════════════════════════════════════════
   GSAPHero — GSAP.com-quality editorial hero
   Patterns: word-reveal translateY, floating organic shapes,
   ambient parallax, magnetic buttons, scroll-cue indicator.
   Palette: Lavender Dream (#FCFBFF, #8B7FE8, #D8D2FA, #B8E8D8, #FFC9DE)
   ════════════════════════════════════════════════════ */

export default function GSAPHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  /* ─── Master entrance timeline ─── */
  useGSAP(
    () => {
      if (!heroRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // 1. Eyebrow fade in
        tl.to(".hero-eyebrow", { opacity: 1, duration: 0.6 });

        // 2. Word reveals — set initial position via GSAP (not Tailwind, to avoid transform conflicts)
        gsap.set(".hero-word-inner", { yPercent: 115 });
        tl.to(".hero-word-inner", {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.08,
        }, "-=0.4");

        // 3. Paragraph fade
        tl.to(".hero-para", { opacity: 1, duration: 0.8 }, "-=0.5");

        // 4. Hero action buttons
        tl.to(".hero-actions", { opacity: 1, duration: 0.8 }, "-=0.6");

        // 5. Floating shapes pop in
        tl.from(".hero-shape", {
          opacity: 0,
          scale: 0.6,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.7)",
        }, "-=1.2");

        /* ─── Ambient float loops ─── */
        gsap.to(".shape-ring", {
          y: -24, rotate: 20, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
        gsap.to(".shape-blob", {
          y: 20, rotate: -10, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
        gsap.to(".shape-pill", {
          y: -14, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
        gsap.to(".shape-diamond", {
          y: 16, rotate: 225, duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut",
        });

        /* ─── Scroll parallax for shapes ─── */
        gsap.utils.toArray<HTMLElement>(".hero-shape").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.3");
          gsap.to(el, {
            yPercent: -30 * speed,
            scrollTrigger: {
              trigger: heroRef.current!,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }, heroRef);

      return () => ctx.revert();
    },
    { scope: heroRef }
  );

  /* ─── Word-wrap helper (each word in overflow-hidden container) ─── */
  const Word = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span className="inline-block overflow-hidden align-top">
      <span className={`hero-word-inner inline-block ${className}`}>
        {children}
      </span>
    </span>
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-[6vw] overflow-hidden bg-[#FCFBFF]"
    >
      {/* ═══ Eyebrow ═══ */}
      <div className="hero-eyebrow opacity-0 text-xs font-semibold tracking-[0.14em] uppercase text-[#6B6785] mb-5 flex items-center gap-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B7FE8]" />
        AI Learning, Reimagined
      </div>

      {/* ═══ Headline — editorial word-by-word reveal ═══ */}
      <h1 className="font-[var(--font-display)] font-semibold tracking-[-0.03em] leading-[0.98] text-[clamp(44px,8vw,108px)] max-w-[1100px] text-[#1E1B2E]">
        <Word>Learn</Word>
        <br />
        <Word>AI&nbsp;that&nbsp;</Word>
        <Word className="bg-gradient-to-r from-[#8B7FE8] via-[#6B5BD6] to-[#8B7FE8] bg-clip-text text-transparent">
          actually
        </Word>
        <br />
        <Word className="bg-gradient-to-r from-[#8B7FE8] via-[#6B5BD6] to-[#8B7FE8] bg-clip-text text-transparent">
          sticks.
        </Word>
      </h1>

      {/* ═══ Supporting paragraph ═══ */}
      <p className="hero-para opacity-0 max-w-[480px] mt-7 text-[17px] leading-relaxed text-[#6B6785]">
        Structured courses, AI voice lessons, streaks that pull you back,
        and certificates worth sharing — one platform built to make you
        finish what you start.
      </p>

      {/* ═══ Action buttons ═══ */}
      <div className="hero-actions opacity-0 mt-10 flex items-center gap-4 flex-wrap">
        {/* Primary CTA — ExploreCoursesButton with built-in magnetic + GSAP animations */}
        <ExploreCoursesButton />

        {/* Secondary button */}
        <button
          className="group flex items-center gap-2 font-[var(--font-display)] font-semibold text-[15px] text-[#1E1B2E] bg-transparent border-none cursor-pointer"
        >
          <span className="w-[38px] h-[38px] rounded-full border-[1.5px] border-[#1E1B2E] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
            ↗
          </span>
          Watch demo
        </button>
      </div>

      {/* ═══ Floating organic shapes ═══ */}

      {/* Conic gradient ring */}
      <div
        className="hero-shape shape-ring hidden lg:block absolute top-[14%] right-[20%] w-[120px] h-[120px] rounded-full will-change-transform"
        data-speed="0.4"
        style={{
          background: "conic-gradient(from 180deg, #8B7FE8, #B8E8D8, #FFC9DE, #8B7FE8)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 18px), #000 calc(100% - 17px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 18px), #000 calc(100% - 17px))",
        }}
      />

      {/* Gradient blob */}
      <div
        className="hero-shape shape-blob hidden lg:block absolute top-[46%] right-[6%] w-[230px] h-[230px] will-change-transform"
        data-speed="0.25"
        style={{
          background: "radial-gradient(circle at 32% 28%, #D8D2FA, #8B7FE8 75%)",
          borderRadius: "42% 58% 63% 37% / 45% 40% 60% 55%",
        }}
      />

      {/* Pill badge */}
      <div
        className="hero-shape shape-pill hidden lg:flex absolute top-[8%] right-[44%] w-[150px] h-[64px] rounded-full bg-[#B8E8D8] items-center justify-center font-[var(--font-display)] font-semibold text-sm text-[#1E1B2E] will-change-transform"
        data-speed="0.55"
      >
        Level up daily
      </div>

      {/* Diamond accent */}
      <div
        className="hero-shape shape-diamond hidden lg:block absolute top-[62%] right-[32%] w-[26px] h-[26px] bg-[#FFC9DE] rounded-[6px] rotate-45 will-change-transform"
        data-speed="0.7"
      />
    </section>
  );
}
