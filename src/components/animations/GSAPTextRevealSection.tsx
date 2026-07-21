"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPTextRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const pill1Ref = useRef<HTMLSpanElement>(null);
  const pill2Ref = useRef<HTMLSpanElement>(null);
  const pill3Ref = useRef<HTMLSpanElement>(null);
  const pill4Ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !textContainerRef.current) return;

      const words = gsap.utils.toArray<HTMLElement>(".reveal-word");

      // Pin the section & scrub word reveal + badge popups (exact GSAP.com effect)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=150%",
        },
      });

      // Word by word highlight reveal
      tl.to(words, {
        color: "#1E1B2E",
        opacity: 1,
        stagger: 0.1,
        ease: "none",
      });

      // Inline Pill Badges popping in with rotation (inspired by GSAP.com "Nice and Easy", "Plug-and-play")
      tl.fromTo(
        pill1Ref.current,
        { scale: 0, rotate: -15, opacity: 0 },
        { scale: 1, rotate: -4, opacity: 1, ease: "back.out(2)" },
        "0.2"
      )
        .fromTo(
          pill2Ref.current,
          { scale: 0, rotate: 15, opacity: 0 },
          { scale: 1, rotate: 6, opacity: 1, ease: "back.out(2)" },
          "0.4"
        )
        .fromTo(
          pill3Ref.current,
          { scale: 0, rotate: -12, opacity: 0 },
          { scale: 1, rotate: -6, opacity: 1, ease: "back.out(2)" },
          "0.6"
        )
        .fromTo(
          pill4Ref.current,
          { scale: 0, rotate: 10, opacity: 0 },
          { scale: 1, rotate: 4, opacity: 1, ease: "back.out(2)" },
          "0.8"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#FCFBFF] border-y border-[#EAE6FE] flex items-center justify-center overflow-hidden px-4 sm:px-8 py-20"
    >
      {/* Background Soft Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blob-violet blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-blob-pink blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center z-10">
        <Badge variant="default" className="mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#8B7FE8]" />
          GSAP Scroll Text Reveal • Official GSAP.com Inspired
        </Badge>

        {/* Kinetic Giant Typography Container */}
        <div
          ref={textContainerRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.25] text-[#1E1B2E]/20"
        >
          <span className="reveal-word">Future </span>
          <span className="reveal-word">With </span>
          <span className="reveal-word">AI </span>
          <span className="reveal-word">makes </span>
          <span className="reveal-word">learning </span>

          {/* Inline GSAP Pill 1: Soft Pink Accent */}
          <span
            ref={pill1Ref}
            className="inline-block align-middle mx-1 sm:mx-2 px-4 py-1.5 rounded-2xl bg-[#FFC9DE] text-[#1E1B2E] font-black text-xl sm:text-3xl shadow-soft-md border border-[#FFC9DE]"
          >
            Structured
          </span>

          <span className="reveal-word">and </span>

          {/* Inline GSAP Pill 2: Periwinkle Primary Light Accent */}
          <span
            ref={pill2Ref}
            className="inline-block align-middle mx-1 sm:mx-2 px-4 py-1.5 rounded-2xl bg-[#D8D2FA] text-[#8B7FE8] font-black text-xl sm:text-3xl shadow-soft-md border border-[#D8D2FA]"
          >
            Interactive
          </span>

          <br className="hidden sm:inline" />

          <span className="reveal-word">Add </span>
          <span className="reveal-word">personality </span>
          <span className="reveal-word">to </span>
          <span className="reveal-word">your </span>
          <span className="reveal-word">skills </span>
          <span className="reveal-word">with </span>

          {/* Inline GSAP Pill 3: Mint Accent */}
          <span
            ref={pill3Ref}
            className="inline-block align-middle mx-1 sm:mx-2 px-4 py-1.5 rounded-2xl bg-[#B8E8D8] text-[#1E1B2E] font-black text-xl sm:text-3xl shadow-soft-md border border-[#B8E8D8]"
          >
            AI Voice
          </span>

          <span className="reveal-word">and </span>

          {/* Inline GSAP Pill 4: Primary Periwinkle */}
          <span
            ref={pill4Ref}
            className="inline-block align-middle mx-1 sm:mx-2 px-4 py-1.5 rounded-2xl bg-[#8B7FE8] text-white font-black text-xl sm:text-3xl shadow-soft-md border border-[#8B7FE8]"
          >
            Gamification
          </span>

          <span className="reveal-word">in </span>
          <span className="reveal-word">seconds.</span>
        </div>
      </div>
    </section>
  );
}
