"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, FileText, HelpCircle, Share2, MessageSquare, Wallet, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardReveal, SVGFloat } from "@/components/animations/system";
import {
  AIBrainSVG,
  RobotSVG,
  CodeWindowSVG,
  LightningSVG,
  CertificateRibbonSVG,
  QuizPuzzleSVG,
} from "@/components/animations/HeroSVGs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPParallaxGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".parallax-card");

      cards.forEach((card, index) => {
        const speed = (index % 3 + 1) * 20;

        gsap.to(card, {
          y: -speed,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef }
  );

  const features = [
    {
      icon: Cpu,
      svg: AIBrainSVG,
      title: "AI Voice Lessons",
      badge: "Lifelike Audio",
      bgSoft: "#D8D2FA",
      textColor: "#8B7FE8",
      description: "Generates high quality audio explanations for lessons in English and Telugu with custom playback rates.",
    },
    {
      icon: FileText,
      svg: CodeWindowSVG,
      title: "AI Notes Generator",
      badge: "One-Click Summary",
      bgSoft: "#FFC9DE",
      textColor: "#1E1B2E",
      description: "Automatically condenses course modules into key takeaways, cheat sheets, and downloadable PDFs.",
    },
    {
      icon: HelpCircle,
      svg: QuizPuzzleSVG,
      title: "AI Quiz Engine",
      badge: "12 Question Types",
      bgSoft: "#B8E8D8",
      textColor: "#1E1B2E",
      description: "Supports Multiple Choice, Match the Following, Drag & Drop, Fill in Blank, and Scenario-Based AI Quizzes.",
    },
    {
      icon: Share2,
      svg: CertificateRibbonSVG,
      title: "AI LinkedIn Post Generator",
      badge: "Social Proof",
      bgSoft: "#F3F0FE",
      textColor: "#8B7FE8",
      description: "Transforms course completions, streak milestones, and certificate badges into viral LinkedIn posts.",
    },
    {
      icon: MessageSquare,
      svg: RobotSVG,
      title: "AI Doubt Solver & Mentor",
      badge: "24/7 Assistance",
      bgSoft: "#EDF9F5",
      textColor: "#1E1B2E",
      description: "Ask questions on any lesson code snippet or math proof to receive step-by-step Socratic guidance.",
    },
    {
      icon: Wallet,
      svg: LightningSVG,
      title: "AI Coin Economy",
      badge: "Virtual Wallet",
      bgSoft: "#FFF0F5",
      textColor: "#6B6785",
      description: "Earn AI coins for completing daily lessons & quizzes. Redeem for course discounts and exclusive workshops.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden bg-[#FCFBFF]"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="default" className="mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#8B7FE8]" />
          SRS Section 17 • Built-in AI Features
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1B2E] tracking-tight">
          Supercharged AI Learning Tools
        </h2>
        <p className="text-base sm:text-lg text-[#6B6785] mt-4">
          Every tool is engineered to boost learner engagement, retention, and course completion speed.
        </p>
      </div>

      {/* Grid of Parallax Floating Cards with 3D Tilt & SVG Motion */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, idx) => {
          const SVGComponent = item.svg;
          return (
            <CardReveal key={idx} direction={idx % 2 === 0 ? "bottom" : "top"} delay={idx * 0.1} tilt3d={true}>
              <div
                className="parallax-card h-full bg-white rounded-3xl p-8 border border-[#EAE6FE] shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shadow-soft-sm relative overflow-hidden"
                      style={{ backgroundColor: item.bgSoft, color: item.textColor }}
                    >
                      <SVGFloat floatDistance={6} rotateDegree={4} duration={3}>
                        <SVGComponent className="w-8 h-8" />
                      </SVGFloat>
                    </div>
                    <Badge variant="outline">{item.badge}</Badge>
                  </div>

                  <h3 className="text-xl font-bold text-[#1E1B2E] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6B6785] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EAE6FE]/70 flex items-center justify-between text-xs font-semibold text-[#8B7FE8] group-hover:text-[#6B5BD6] transition-colors">
                  <span>Explore Feature</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </CardReveal>
          );
        })}
      </div>
    </section>
  );
}
