"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BookOpen, Flame, Volume2, ShieldCheck, HelpCircle, ArrowRight, CheckCircle2, Sparkles, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;

      // GSAP Pin-Scroll Horizontal Track (Inspired by gsap.com)
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Background Kinetic Marquee Scroll
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          x: "-30%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: 0.5,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#1E1B2E] text-white flex flex-col justify-center"
    >
      {/* Background Kinetic Marquee Text (gsap.com Style) */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[18vw] font-black uppercase text-white/5 pointer-events-none select-none tracking-tighter"
      >
        FUTURE WITH AI • GSAP SCROLL • COURSERA • DUOLINGO • LEETCODE •
      </div>

      {/* Top Header Badge */}
      <div className="absolute top-8 left-6 sm:left-12 z-20">
        <Badge variant="default" className="mb-2 bg-[#8B7FE8] text-white border-none">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          GSAP Horizontal Showcase • gsap.com Inspired
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          Explore Platform Ecosystem Architecture
        </h2>
      </div>

      {/* Horizontal Track containing 5 Full-Screen Width Showcase Cards */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 px-6 sm:px-12 w-max h-[78vh] pt-20 z-10"
      >
        {/* CARD 1: Structured AI Learning Hierarchy */}
        <div className="w-[85vw] sm:w-[68vw] lg:w-[50vw] h-full rounded-3xl bg-[#28243D] border border-[#3E385B] p-8 sm:p-12 shadow-soft-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#8B7FE8]/20 blur-3xl pointer-events-none" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#8B7FE8] text-white flex items-center justify-center font-bold text-2xl mb-6 shadow-soft-md">
              <BookOpen className="w-7 h-7" />
            </div>

            <Badge variant="default" className="mb-3 bg-[#D8D2FA] text-[#8B7FE8]">
              Inspired by Coursera
            </Badge>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              1. Structured Course Architecture
            </h3>

            <p className="text-base text-[#B8B4D0] leading-relaxed mb-6">
              Category → Course → Module → Lesson → Quiz → Assessment → Certificate. Structured learning paths designed for enterprise scalability.
            </p>

            {/* Visual Node Tree Diagram */}
            <div className="bg-[#1E1B2E] p-4 rounded-2xl border border-[#3E385B] space-y-2 text-xs font-mono mb-6">
              <div className="flex items-center gap-2 text-[#D8D2FA]">
                <span className="w-2 h-2 rounded-full bg-[#8B7FE8]" />
                Category: Generative AI & LLMs
              </div>
              <div className="pl-4 text-[#B8E8D8] flex items-center gap-2">
                └─ Course: Building Production Agents
              </div>
              <div className="pl-8 text-white flex items-center gap-2">
                └─ Module 3: Tool Calling & Function Execution
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#3E385B] flex items-center justify-between">
            <span className="text-xs font-bold text-[#B8B4D0]">01 / 05</span>
            <Button variant="default" size="sm" className="gap-1.5">
              <span>View Course Tree</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CARD 2: Gamification & Streak Rewards */}
        <div className="w-[85vw] sm:w-[68vw] lg:w-[50vw] h-full rounded-3xl bg-[#28243D] border border-[#3E385B] p-8 sm:p-12 shadow-soft-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#B8E8D8]/20 blur-3xl pointer-events-none" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#B8E8D8] text-[#1E1B2E] flex items-center justify-center font-bold text-2xl mb-6 shadow-soft-md">
              <Flame className="w-7 h-7" />
            </div>

            <Badge variant="mint" className="mb-3">
              Inspired by Duolingo & LeetCode
            </Badge>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              2. Gamification & Streak Engine
            </h3>

            <p className="text-base text-[#B8B4D0] leading-relaxed mb-6">
              GitHub-style activity calendar heatmaps, daily streak shields, streak freeze protections (500 AI Coins), and live daily/weekly leaderboards.
            </p>

            {/* GitHub-style Heatmap Simulation */}
            <div className="bg-[#1E1B2E] p-4 rounded-2xl border border-[#3E385B] mb-6">
              <span className="text-xs font-bold text-[#B8B4D0] mb-2 block">Learning Journey Heatmap</span>
              <div className="grid grid-cols-12 gap-1.5">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-4 rounded-sm ${
                      i % 5 === 0
                        ? "bg-[#B8E8D8]"
                        : i % 3 === 0
                        ? "bg-[#8B7FE8]"
                        : i % 2 === 0
                        ? "bg-[#D8D2FA]/40"
                        : "bg-[#3E385B]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#3E385B] flex items-center justify-between">
            <span className="text-xs font-bold text-[#B8B4D0]">02 / 05</span>
            <Button variant="mint" size="sm" className="gap-1.5">
              <span>Explore Gamification</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CARD 3: ElevenLabs Multilingual AI Voice */}
        <div className="w-[85vw] sm:w-[68vw] lg:w-[50vw] h-full rounded-3xl bg-[#28243D] border border-[#3E385B] p-8 sm:p-12 shadow-soft-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#FFC9DE]/20 blur-3xl pointer-events-none" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#FFC9DE] text-[#1E1B2E] flex items-center justify-center font-bold text-2xl mb-6 shadow-soft-md">
              <Volume2 className="w-7 h-7" />
            </div>

            <Badge variant="pink" className="mb-3">
              Powered by ElevenLabs API
            </Badge>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              3. AI Voice Lesson Narrations
            </h3>

            <p className="text-base text-[#B8B4D0] leading-relaxed mb-6">
              Instant speech synthesis in English & Telugu. Listen on the go with custom playback rates (1.0x - 2.0x) and automated AI summary notes.
            </p>

            <div className="bg-[#1E1B2E] p-4 rounded-2xl border border-[#3E385B] flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFC9DE] text-[#1E1B2E] flex items-center justify-center font-bold">
                  EN
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">English & Telugu Synthesis</h4>
                  <span className="text-[11px] text-[#B8B4D0]">High-fidelity voice audio</span>
                </div>
              </div>
              <Badge variant="pink">1.25x Speed</Badge>
            </div>
          </div>

          <div className="pt-6 border-t border-[#3E385B] flex items-center justify-between">
            <span className="text-xs font-bold text-[#B8B4D0]">03 / 05</span>
            <Button variant="accentPink" size="sm" className="gap-1.5">
              <span>Test Voice Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CARD 4: Verifiable PDF Certificates */}
        <div className="w-[85vw] sm:w-[68vw] lg:w-[50vw] h-full rounded-3xl bg-[#28243D] border border-[#3E385B] p-8 sm:p-12 shadow-soft-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#8B7FE8]/20 blur-3xl pointer-events-none" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#8B7FE8] text-white flex items-center justify-center font-bold text-2xl mb-6 shadow-soft-md">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <Badge variant="default" className="mb-3 bg-[#D8D2FA] text-[#8B7FE8]">
              Inspired by LinkedIn Learning
            </Badge>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              4. Verifiable PDF Certificates
            </h3>

            <p className="text-base text-[#B8B4D0] leading-relaxed mb-6">
              Generated using `pdf-lib` and stored immutably on Cloudflare R2. Complete with unique certificate IDs, embedded QR verification URLs, and direct LinkedIn sharing.
            </p>

            <div className="bg-[#1E1B2E] p-4 rounded-2xl border border-[#3E385B] flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <QrCode className="w-8 h-8 text-[#8B7FE8]" />
                <div>
                  <h4 className="text-xs font-bold text-white">QR Code Public Verification</h4>
                  <span className="text-[11px] text-[#B8B4D0]">ID: CERT-2026-8942</span>
                </div>
              </div>
              <Badge variant="default">Verified</Badge>
            </div>
          </div>

          <div className="pt-6 border-t border-[#3E385B] flex items-center justify-between">
            <span className="text-xs font-bold text-[#B8B4D0]">04 / 05</span>
            <Button variant="default" size="sm" className="gap-1.5">
              <span>View Certificate Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CARD 5: AI Quiz Engine & 12 Question Types */}
        <div className="w-[85vw] sm:w-[68vw] lg:w-[50vw] h-full rounded-3xl bg-[#28243D] border border-[#3E385B] p-8 sm:p-12 shadow-soft-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#B8E8D8]/20 blur-3xl pointer-events-none" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#B8E8D8] text-[#1E1B2E] flex items-center justify-center font-bold text-2xl mb-6 shadow-soft-md">
              <HelpCircle className="w-7 h-7" />
            </div>

            <Badge variant="mint" className="mb-3">
              SRS Section 11 • Quiz Engine
            </Badge>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              5. Interactive Quiz Engine
            </h3>

            <p className="text-base text-[#B8B4D0] leading-relaxed mb-6">
              12 question types: Multiple Choice, True/False, Multiple Select, Fill in Blank, Match Following, Drag & Drop, Sequence Ordering, Scenario-Based, Audio/Image Questions, Flashcards & Timed Tests.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#B8E8D8] mb-6">
              <div className="bg-[#1E1B2E] p-2.5 rounded-xl border border-[#3E385B] flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B8E8D8]" /> Match Following
              </div>
              <div className="bg-[#1E1B2E] p-2.5 rounded-xl border border-[#3E385B] flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B8E8D8]" /> Drag & Drop
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#3E385B] flex items-center justify-between">
            <span className="text-xs font-bold text-[#B8B4D0]">05 / 05</span>
            <Button variant="mint" size="sm" className="gap-1.5">
              <span>Start Practice Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
