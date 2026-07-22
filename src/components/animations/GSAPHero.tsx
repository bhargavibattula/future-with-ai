"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, ArrowRight, Play, Volume2, Flame, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  SplitTextReveal,
  HorizontalReveal,
  SVGFloat,
  SVGParallax,
  MagneticButton,
  GlowCursor,
  CardReveal,
} from "@/components/animations/system";

import {
  AIBrainSVG,
  RobotSVG,
  CodeWindowSVG,
  LightningSVG,
  StarSparkleSVG,
  FloatingCubeSVG,
} from "@/components/animations/HeroSVGs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPHero() {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const mockupContainerRef = useRef<HTMLDivElement>(null);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useGSAP(
    () => {
      if (!heroContainerRef.current || !mockupContainerRef.current) return;

      // Master GSAP ScrollTrigger Scrub Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          markers: false,
        },
      });

      // Hero Mockup 3D Un-tilt & Zoom Scrub
      masterTl.to(
        mockupContainerRef.current,
        {
          rotateX: 0,
          scale: 1,
          y: -30,
          boxShadow: "0 30px 70px rgba(139, 127, 232, 0.22)",
          ease: "power2.out",
        },
        0
      );

      // Hero Floating Elements Staggered Parallax Scroll Out
      const floatingElements = gsap.utils.toArray<HTMLElement>(".hero-floating-svg");
      floatingElements.forEach((el, index) => {
        const dir = index % 2 === 0 ? 1 : -1;
        masterTl.to(
          el,
          {
            y: dir * 100,
            rotate: dir * 35,
            opacity: 0.4,
            ease: "none",
          },
          0
        );
      });
    },
    { scope: heroContainerRef }
  );

  return (
    <section
      ref={heroContainerRef}
      className="relative min-h-[96vh] pt-12 pb-24 flex flex-col items-center justify-center overflow-hidden bg-[#FCFBFF] text-[#1E1B2E] selection:bg-[#D8D2FA] selection:text-[#1E1B2E]"
    >
      {/* 1. Subtle Glow Cursor Aura with Soft Lavender Hue */}
      <GlowCursor color="rgba(139, 127, 232, 0.18)" size={320} blur={80} />

      {/* 2. Soft Ambient Glowing Mesh Backdrops (Original Website Palette) */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blob-violet blur-3xl opacity-75 pointer-events-none" />
      <div className="absolute top-10 right-[-10%] w-[550px] h-[550px] rounded-full bg-blob-mint blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full bg-blob-pink blur-3xl opacity-60 pointer-events-none" />

      {/* 3. Floating Vector SVGs with Physics & Parallax (Soft Light Aesthetic) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Top-Left: AI Brain SVG */}
        <SVGParallax speed={50} rotateSpeed={15} className="hero-floating-svg absolute top-12 left-4 sm:left-14">
          <SVGFloat floatDistance={18} rotateDegree={10} duration={3.8}>
            <div className="p-3.5 rounded-2xl bg-white/90 border border-[#EAE6FE] shadow-soft-md backdrop-blur-md">
              <AIBrainSVG className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>
          </SVGFloat>
        </SVGParallax>

        {/* Top-Right: Robot AI Agent SVG */}
        <SVGParallax speed={-45} rotateSpeed={-20} className="hero-floating-svg absolute top-16 right-4 sm:right-16">
          <SVGFloat floatDistance={16} rotateDegree={-12} duration={3.5}>
            <div className="p-3.5 rounded-2xl bg-white/90 border border-[#B8E8D8] shadow-soft-md backdrop-blur-md">
              <RobotSVG className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>
          </SVGFloat>
        </SVGParallax>

        {/* Mid-Left: Code Window SVG */}
        <SVGParallax speed={35} rotateSpeed={-12} className="hero-floating-svg absolute top-[46%] left-4 sm:left-10">
          <SVGFloat floatDistance={14} rotateDegree={6} duration={4.2}>
            <div className="p-3 rounded-2xl bg-white/90 border border-[#D8D2FA] shadow-soft-md backdrop-blur-md hidden sm:block">
              <CodeWindowSVG className="w-16 h-12 sm:w-18 sm:h-14" />
            </div>
          </SVGFloat>
        </SVGParallax>

        {/* Mid-Right: Floating Cubes SVG */}
        <SVGParallax speed={-60} rotateSpeed={25} className="hero-floating-svg absolute top-[44%] right-4 sm:right-12">
          <SVGFloat floatDistance={20} rotateDegree={14} duration={3.6}>
            <div className="p-3 rounded-2xl bg-white/90 border border-[#FFC9DE] shadow-soft-md backdrop-blur-md">
              <FloatingCubeSVG className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>
          </SVGFloat>
        </SVGParallax>

        {/* Bottom-Left: Lightning Bolt SVG */}
        <SVGParallax speed={25} rotateSpeed={8} className="hero-floating-svg absolute bottom-24 left-16 hidden md:block">
          <SVGFloat floatDistance={12} rotateDegree={-8} duration={3.2}>
            <LightningSVG className="w-9 h-13" />
          </SVGFloat>
        </SVGParallax>

        {/* Bottom-Right: Star Sparkle SVG */}
        <SVGParallax speed={-30} rotateSpeed={-15} className="hero-floating-svg absolute bottom-20 right-20 hidden md:block">
          <SVGFloat floatDistance={15} rotateDegree={16} duration={4.4}>
            <StarSparkleSVG className="w-9 h-9" />
          </SVGFloat>
        </SVGParallax>
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center z-20">
        {/* Top Header Badge matching site theme */}
        <div className="inline-block mb-6">
          <Badge variant="default" className="py-2 px-5 text-xs sm:text-sm font-extrabold shadow-soft-sm">
            <Sparkles className="w-4 h-4 text-[#8B7FE8] animate-pulse" />
            <span>Future With AI • Enterprise Learning Ecosystem</span>
          </Badge>
        </div>

        {/* Headline revealed with Horizontal Reveal & SplitText in light theme */}
        <div className="relative mb-8 max-w-5xl mx-auto">
          <HorizontalReveal direction="left-to-right" duration={1.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1E1B2E] tracking-tight leading-[1.08]">
              <SplitTextReveal
                text="Learn AI with"
                type="words"
                stagger={0.05}
                className="text-[#1E1B2E]"
              />
              <br />
              <span className="text-[#8B7FE8] bg-gradient-to-r from-[#8B7FE8] via-[#6B5BD6] to-[#8B7FE8] bg-clip-text text-transparent underline decoration-[#D8D2FA] decoration-wavy">
                <SplitTextReveal
                  text="Next-Gen Kinetic Voice"
                  type="words"
                  stagger={0.07}
                  badgeWords={[
                    { word: "Next-Gen", bg: "#FFC9DE", text: "#1E1B2E", rotate: -3 },
                    { word: "Kinetic", bg: "#B8E8D8", text: "#1E1B2E", rotate: 4 },
                  ]}
                />
              </span>{" "}
              & Gamification
            </h1>
          </HorizontalReveal>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#6B6785] leading-relaxed mb-10 font-normal">
          Enterprise AI learning platform inspired by Coursera, Duolingo, LeetCode & Coursiv. Built with Next.js 15, Tailwind, and GSAP.
        </p>

        {/* Magnetic CTA Buttons in original theme colors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <MagneticButton strength={0.35}>
            <Button size="lg" className="w-full sm:w-auto text-base font-bold gap-2 h-14 px-8 shadow-soft-md hover:shadow-glow-primary">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </MagneticButton>

          <MagneticButton strength={0.3}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-full sm:w-auto text-base font-bold gap-2 h-14 px-8 border-[#EAE6FE] hover:bg-[#F3F0FE] text-[#1E1B2E]"
            >
              <Volume2 className={`w-5 h-5 text-[#8B7FE8] ${isPlayingAudio ? "animate-bounce" : ""}`} />
              <span>{isPlayingAudio ? "Pause ElevenLabs AI Voice" : "Play ElevenLabs AI Voice"}</span>
            </Button>
          </MagneticButton>
        </div>

        {/* 4. Interactive 3D Card Dashboard Showcase in Light Theme */}
        <CardReveal direction="bottom" duration={1.1} tilt3d={true}>
          <div
            ref={mockupContainerRef}
            className="relative max-w-5xl mx-auto rounded-3xl bg-white border border-[#EAE6FE] shadow-soft-lg p-5 sm:p-8 text-left transition-all duration-200 transform-gpu cursor-pointer"
            style={{ perspective: "1200px" }}
          >
            {/* Top Bar */}
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

            {/* Inner Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Active Course */}
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

                  <div className="w-full h-3 bg-[#D8D2FA]/50 rounded-full overflow-hidden mb-5">
                    <div className="w-[78%] h-full bg-[#8B7FE8] rounded-full shadow-soft-sm transition-all duration-500" />
                  </div>
                </div>

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

              {/* Stats */}
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
        </CardReveal>
      </div>
    </section>
  );
}
