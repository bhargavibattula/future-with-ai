"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, ArrowRight, Play, Volume2, Flame, Award, ShieldCheck, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  const pill1Ref = useRef<HTMLDivElement>(null);
  const pill2Ref = useRef<HTMLDivElement>(null);
  const pill3Ref = useRef<HTMLDivElement>(null);
  const pill4Ref = useRef<HTMLDivElement>(null);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useGSAP(
    () => {
      if (!containerRef.current || !mockupRef.current) return;

      // Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-pill-badge", { y: -30, opacity: 0, duration: 0.8 })
        .from(headlineRef.current, { y: 40, opacity: 0, duration: 1 }, "-=0.4")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-cta-buttons", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(
          [pill1Ref.current, pill2Ref.current, pill3Ref.current, pill4Ref.current],
          {
            scale: 0,
            rotate: () => gsap.utils.random(-25, 25),
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "back.out(1.8)",
          },
          "-=0.6"
        )
        .from(
          mockupRef.current,
          {
            rotateX: 25,
            scale: 0.88,
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        );

      // Continuous Floating Physics for Badges (GSAP.com style)
      gsap.to(pill1Ref.current, {
        y: "-=12",
        rotate: "+=4",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(pill2Ref.current, {
        y: "+=15",
        rotate: "-=5",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(pill3Ref.current, {
        y: "-=10",
        rotate: "+=6",
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(pill4Ref.current, {
        y: "+=14",
        rotate: "-=4",
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ScrollTrigger 3D Un-tilt & Zoom Scrub
      gsap.to(mockupRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 1,
        },
        rotateX: 0,
        scale: 1,
        y: -30,
        boxShadow: "0 40px 80px rgba(139, 127, 232, 0.25)",
      });
    },
    { scope: containerRef }
  );

  // 3D Card Tilt Mouse Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(mockupRef.current, {
      rotateY: x / 40,
      rotateX: -y / 40,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!mockupRef.current) return;
    gsap.to(mockupRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] pt-12 pb-24 flex flex-col items-center justify-center overflow-hidden bg-[#FCFBFF]"
    >
      {/* Dynamic Ambient Glowing Mesh Backdrops */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blob-violet blur-3xl opacity-75 pointer-events-none animate-float-slow" />
      <div className="absolute top-10 right-[-10%] w-[550px] h-[550px] rounded-full bg-blob-mint blur-3xl opacity-70 pointer-events-none animate-float-delayed" />
      <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full bg-blob-pink blur-3xl opacity-60 pointer-events-none animate-pulse-subtle" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* Top Header Badge */}
        <div className="hero-pill-badge inline-block mb-6">
          <Badge variant="default" className="py-2 px-5 text-xs sm:text-sm font-extrabold shadow-soft-sm">
            <Sparkles className="w-4 h-4 text-[#8B7FE8] animate-pulse" />
            <span>Future With AI • Enterprise Learning Ecosystem</span>
          </Badge>
        </div>

        {/* Extraordinary Headline with Kinetic Pills Floating Around */}
        <div className="relative mb-8 max-w-4xl mx-auto">
          {/* Floating Kinetic Pill 1 (Soft Pink) */}
          <div
            ref={pill1Ref}
            className="absolute -top-8 -left-4 sm:-top-10 sm:left-4 z-20 bg-[#FFC9DE] text-[#1E1B2E] font-black text-xs sm:text-base px-4 py-1.5 rounded-2xl shadow-soft-md border border-[#FFC9DE] flex items-center gap-1.5 cursor-pointer hover:scale-110 transition-transform"
          >
            <Volume2 className="w-4 h-4 text-[#1E1B2E]" />
            <span>AI Voice Lessons</span>
          </div>

          {/* Floating Kinetic Pill 2 (Mint Accent) */}
          <div
            ref={pill2Ref}
            className="absolute -top-10 -right-2 sm:-top-12 sm:right-6 z-20 bg-[#B8E8D8] text-[#1E1B2E] font-black text-xs sm:text-base px-4 py-1.5 rounded-2xl shadow-soft-md border border-[#B8E8D8] flex items-center gap-1.5 cursor-pointer hover:scale-110 transition-transform"
          >
            <Flame className="w-4 h-4 text-[#1E1B2E]" />
            <span>Duolingo Streaks</span>
          </div>

          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1E1B2E] tracking-tight leading-[1.08]"
          >
            Learn AI with <br />
            <span className="text-[#8B7FE8] bg-gradient-to-r from-[#8B7FE8] via-[#6B5BD6] to-[#8B7FE8] bg-clip-text text-transparent underline decoration-[#D8D2FA] decoration-wavy">
              Next-Gen Voice
            </span>{" "}
            & Gamification
          </h1>

          {/* Floating Kinetic Pill 3 (Periwinkle Light) */}
          <div
            ref={pill3Ref}
            className="absolute -bottom-6 left-8 sm:-bottom-8 sm:left-16 z-20 bg-[#D8D2FA] text-[#8B7FE8] font-black text-xs sm:text-base px-4 py-1.5 rounded-2xl shadow-soft-md border border-[#D8D2FA] flex items-center gap-1.5 cursor-pointer hover:scale-110 transition-transform"
          >
            <BookOpen className="w-4 h-4 text-[#8B7FE8]" />
            <span>100+ Courses</span>
          </div>

          {/* Floating Kinetic Pill 4 (Primary Periwinkle) */}
          <div
            ref={pill4Ref}
            className="absolute -bottom-8 right-8 sm:-bottom-10 sm:right-16 z-20 bg-[#8B7FE8] text-white font-black text-xs sm:text-base px-4 py-1.5 rounded-2xl shadow-soft-md border border-[#8B7FE8] flex items-center gap-1.5 cursor-pointer hover:scale-110 transition-transform"
          >
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>PDF Certificates</span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle max-w-2xl mx-auto text-lg sm:text-xl text-[#6B6785] leading-relaxed mb-10 font-normal">
          Enterprise AI learning platform inspired by Coursera, Duolingo, LeetCode & Coursiv. Built with Next.js 15, Tailwind, and GSAP.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="w-full sm:w-auto text-base gap-2 h-14 px-8 shadow-soft-md hover:shadow-glow-primary">
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="w-full sm:w-auto text-base gap-2 h-14 px-8"
          >
            <Volume2 className={`w-5 h-5 text-[#8B7FE8] ${isPlayingAudio ? "animate-bounce" : ""}`} />
            <span>{isPlayingAudio ? "Pause ElevenLabs AI Voice" : "Play ElevenLabs AI Voice"}</span>
          </Button>
        </div>

        {/* 3D Dashboard Showcase Container with Mouse Tilt + GSAP Scroll Scrub */}
        <div
          ref={mockupRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative max-w-5xl mx-auto rounded-3xl bg-white border border-[#EAE6FE] shadow-soft-lg p-5 sm:p-8 text-left transition-all duration-200 transform-gpu cursor-pointer"
          style={{ perspective: "1200px" }}
        >
          {/* Top Header Mockup Bar */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#EAE6FE]">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFC9DE]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#B8E8D8]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#D8D2FA]" />
              <span className="text-xs font-bold text-[#6B6785] ml-3 hidden sm:inline">
                future-with-ai.app • SRS Enterprise LMS
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="mint" className="text-xs font-black">
                <Flame className="w-3.5 h-3.5" /> 14 Day Streak
              </Badge>
              <Badge variant="pink" className="text-xs font-black">
                <Award className="w-3.5 h-3.5" /> 3,420 XP
              </Badge>
            </div>
          </div>

          {/* Inner Interactive Card Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Active Course Player */}
            <div className="md:col-span-2 bg-[#FCFBFF] p-6 rounded-2xl border border-[#EAE6FE] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="default">Module 3 • Neural Networks</Badge>
                  <span className="text-xs font-bold text-[#8B7FE8]">78% Progress</span>
                </div>
                <h3 className="font-extrabold text-2xl text-[#1E1B2E] mb-2">
                  Building Production LLM Agents
                </h3>
                <p className="text-xs text-[#6B6785] mb-4">
                  Interactive lesson with ElevenLabs AI Voice explanation in English & Telugu.
                </p>

                {/* Animated Progress Bar */}
                <div className="w-full h-3 bg-[#D8D2FA]/50 rounded-full overflow-hidden mb-5">
                  <div className="w-[78%] h-full bg-[#8B7FE8] rounded-full shadow-soft-sm transition-all duration-500" />
                </div>
              </div>

              {/* Audio Waveform Simulation Bar */}
              <div className="bg-white p-4 rounded-xl border border-[#EAE6FE] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-10 h-10 rounded-xl bg-[#8B7FE8] text-white flex items-center justify-center shadow-soft-sm hover:scale-105 transition-transform"
                  >
                    {isPlayingAudio ? (
                      <span className="flex h-3.5 w-3.5 rounded-sm bg-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    )}
                  </button>

                  <div>
                    <h4 className="text-xs font-bold text-[#1E1B2E]">ElevenLabs AI Voice Narration</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[40, 75, 30, 90, 60, 100, 45, 80, 50, 70].map((h, i) => (
                        <span
                          key={i}
                          className={`w-1 rounded-full transition-all ${
                            isPlayingAudio ? "bg-[#8B7FE8] animate-pulse" : "bg-[#D8D2FA]"
                          }`}
                          style={{ height: isPlayingAudio ? `${h / 4}px` : "8px" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Button size="sm" variant="default" className="text-xs h-8 px-3">
                  Resume Lesson
                </Button>
              </div>
            </div>

            {/* Right: Gamification Stats & Verified Certificate */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#EAE6FE] shadow-soft-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#6B6785]">Daily XP Target</span>
                  <Zap className="w-4 h-4 text-[#8B7FE8]" />
                </div>
                <div className="text-3xl font-black text-[#8B7FE8]">350 / 500</div>
                <span className="text-[11px] font-medium text-[#6B6785]">Complete 1 quiz to claim rewards</span>
              </div>

              <div className="bg-[#B8E8D8]/40 p-5 rounded-2xl border border-[#B8E8D8] shadow-soft-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#1E1B2E]">AI Coins Balance</h4>
                    <span className="text-xl font-black text-[#1E1B2E]">1,850 Coins</span>
                  </div>
                  <Badge variant="mint">Wallet</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
