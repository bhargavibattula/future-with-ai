"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, ArrowRight, BookOpen, Flame, Volume2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPKineticScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;

      // Clean GSAP Pin-Scroll Horizontal Track in Lavender Dream Light Canvas
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth * 1.2}`,
          invalidateOnRefresh: true,
        },
      });

      // Subtle float animation for pill badges
      gsap.to(".k-pill-float-1", {
        y: "-=8",
        rotate: "-=3",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".k-pill-float-2", {
        y: "+=10",
        rotate: "+=4",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#FCFBFF] text-[#1E1B2E] flex flex-col justify-center border-b border-[#EAE6FE]"
    >
      {/* Background Ambient Lavender Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[550px] h-[550px] rounded-full bg-blob-violet blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-blob-mint blur-3xl opacity-65 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-blob-pink blur-3xl opacity-50 pointer-events-none" />

      {/* Top Section Header */}
      <div className="absolute top-8 left-6 sm:left-12 z-20 flex items-center justify-between right-6 sm:right-12">
        <div>
          <Badge variant="default" className="mb-1.5 shadow-soft-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8B7FE8]" />
            <span>Lavender Dream Architecture • GSAP Scroll</span>
          </Badge>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#1E1B2E] tracking-tight">
            Future With AI Platform Features
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-[#6B6785]">
          <span>Scroll down to navigate</span>
          <ArrowRight className="w-4 h-4 text-[#8B7FE8]" />
        </div>
      </div>

      {/* HORIZONTAL PINNED TRACK CONTAINER */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 px-6 sm:px-12 w-max h-[76vh] pt-16 z-10"
      >
        {/* CARD 1: HERO INTRO & KINETIC TEXT */}
        <div className="w-[85vw] sm:w-[70vw] lg:w-[50vw] h-full rounded-3xl bg-white border border-[#EAE6FE] p-8 sm:p-12 shadow-soft-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#D8D2FA]/40 blur-3xl pointer-events-none" />

          <div>
            <Badge variant="default" className="mb-4">
              AI Learning Ecosystem
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-black text-[#1E1B2E] tracking-tight leading-[1.15] mb-6">
              Learn AI with <br />
              <span className="k-pill-float-1 inline-block bg-[#D8D2FA] text-[#8B7FE8] px-4 py-1 rounded-2xl font-black text-2xl sm:text-4xl shadow-soft-sm mr-2">
                AI Voice
              </span>
              &
              <span className="k-pill-float-2 inline-block bg-[#FFC9DE] text-[#1E1B2E] px-4 py-1 rounded-2xl font-black text-2xl sm:text-4xl shadow-soft-sm ml-2">
                Gamification
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#6B6785] leading-relaxed mb-6">
              An enterprise platform inspired by Coursera, Duolingo, LeetCode & Coursiv. Structured learning paths, instant ElevenLabs speech synthesis, and verifiable certificates.
            </p>
          </div>

          <div className="pt-6 border-t border-[#EAE6FE] flex items-center justify-between">
            <span className="text-xs font-bold text-[#6B6785]">01 / 04</span>
            <Button variant="default" size="sm" className="gap-2">
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CARD 2: STRUCTURED COURSES (Coursera Inspired) */}
        <div className="w-[85vw] sm:w-[70vw] lg:w-[50vw] h-full rounded-3xl bg-white border border-[#EAE6FE] p-8 sm:p-12 shadow-soft-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#D8D2FA]/40 blur-3xl pointer-events-none" />

          <div>
            <div className="w-13 h-13 rounded-2xl bg-[#D8D2FA] text-[#8B7FE8] flex items-center justify-center font-bold text-xl mb-5 shadow-soft-sm">
              <BookOpen className="w-6 h-6" />
            </div>

            <Badge variant="default" className="mb-3">
              Inspired by Coursera
            </Badge>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1E1B2E] mb-3">
              Structured Learning Paths
            </h3>

            <p className="text-sm sm:text-base text-[#6B6785] leading-relaxed mb-5">
              Category → Course → Module → Lesson → Quiz → Assessment → Certificate. Structured step-by-step progress tracking for enterprise teams.
            </p>

            <div className="bg-[#FCFBFF] p-4 rounded-2xl border border-[#EAE6FE] space-y-2 text-xs font-semibold text-[#1E1B2E]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B7FE8]" />
                <span>100+ Hands-on AI Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B8E8D8]" />
                <span>Interactive Practice Sandbox</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#EAE6FE] flex items-center justify-between">
            <span className="text-xs font-bold text-[#6B6785]">02 / 04</span>
            <Button variant="primaryLight" size="sm" className="gap-2">
              <span>View Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CARD 3: GAMIFICATION & STREAKS (Duolingo Inspired) */}
        <div className="w-[85vw] sm:w-[70vw] lg:w-[50vw] h-full rounded-3xl bg-white border border-[#EAE6FE] p-8 sm:p-12 shadow-soft-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#B8E8D8]/40 blur-3xl pointer-events-none" />

          <div>
            <div className="w-13 h-13 rounded-2xl bg-[#B8E8D8] text-[#1E1B2E] flex items-center justify-center font-bold text-xl mb-5 shadow-soft-sm">
              <Flame className="w-6 h-6" />
            </div>

            <Badge variant="mint" className="mb-3">
              Inspired by Duolingo & LeetCode
            </Badge>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1E1B2E] mb-3">
              Gamification & Daily Streaks
            </h3>

            <p className="text-sm sm:text-base text-[#6B6785] leading-relaxed mb-5">
              GitHub-style activity calendar heatmaps, XP rewards, streak freeze protections (500 AI Coins), and live daily/weekly leaderboards.
            </p>

            <div className="bg-[#FCFBFF] p-4 rounded-2xl border border-[#EAE6FE] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B6785]">Current Streak</span>
                <div className="text-xl font-black text-[#1E1B2E]">14 Days Active</div>
              </div>
              <Badge variant="mint">3,420 XP</Badge>
            </div>
          </div>

          <div className="pt-6 border-t border-[#EAE6FE] flex items-center justify-between">
            <span className="text-xs font-bold text-[#6B6785]">03 / 04</span>
            <Button variant="mint" size="sm" className="gap-2">
              <span>View Leaderboard</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CARD 4: ELEVENLABS AI VOICE & PDF CERTIFICATES */}
        <div className="w-[85vw] sm:w-[70vw] lg:w-[50vw] h-full rounded-3xl bg-white border border-[#EAE6FE] p-8 sm:p-12 shadow-soft-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#FFC9DE]/40 blur-3xl pointer-events-none" />

          <div>
            <div className="w-13 h-13 rounded-2xl bg-[#FFC9DE] text-[#1E1B2E] flex items-center justify-center font-bold text-xl mb-5 shadow-soft-sm">
              <Volume2 className="w-6 h-6" />
            </div>

            <Badge variant="pink" className="mb-3">
              ElevenLabs & LinkedIn Certificates
            </Badge>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1E1B2E] mb-3">
              Multilingual Voice & PDF Certificates
            </h3>

            <p className="text-sm sm:text-base text-[#6B6785] leading-relaxed mb-5">
              Listen to AI voice lessons in English & Telugu. Earn verifiable PDF certificates with QR code verification and Cloudflare R2 storage.
            </p>

            <div className="bg-[#FCFBFF] p-4 rounded-2xl border border-[#EAE6FE] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E1B2E]">
                <ShieldCheck className="w-4 h-4 text-[#8B7FE8]" />
                <span>Cloudflare R2 Storage</span>
              </div>
              <Badge variant="pink">QR Verified</Badge>
            </div>
          </div>

          <div className="pt-6 border-t border-[#EAE6FE] flex items-center justify-between">
            <span className="text-xs font-bold text-[#6B6785]">04 / 04</span>
            <Button variant="accentPink" size="sm" className="gap-2">
              <span>View Certificate Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
