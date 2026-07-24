"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function CertificateShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up animation for the entire section
    gsap.from(certRef.current, {
      y: 100,
      opacity: 0,
      rotationX: -15,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    // Bounce animation for the seal badge
    gsap.to(badgeRef.current, {
      y: -15,
      rotationZ: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-[#FCFBFF] text-[#1E1B2E] py-32 px-6 sm:px-12 overflow-hidden border-t border-b border-[#EAE6FE]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 max-w-xl">
          <h2 className="font-[var(--font-display)] font-bold text-5xl lg:text-7xl leading-tight">
            Finish the course.<br />
            <span className="text-[#8B7FE8]">Walk away with a certificate.</span>
          </h2>
          <p className="text-xl lg:text-2xl text-[#6B6785] leading-relaxed font-medium">
            Recognized AI certificates you can share on LinkedIn and your resume.
          </p>
        </div>

        {/* Right Content: Premium CSS Certificate Mockup */}
        <div className="relative w-full max-w-2xl mx-auto perspective-1000">
          <div 
            ref={certRef}
            className="relative bg-white rounded-xl shadow-2xl border border-gray-100 p-8 lg:p-12 transform rotate-y-12 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out"
            style={{ 
              backgroundImage: "radial-gradient(#8B7FE8 0.5px, transparent 0.5px), radial-gradient(#8B7FE8 0.5px, #ffffff 0.5px)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 10px 10px",
              opacity: 0.98
            }}
          >
            
            {/* Certificate Border Overlay */}
            <div className="absolute inset-4 border-2 border-[#D8D2FA] rounded-lg pointer-events-none" />
            
            {/* Header */}
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div className="font-[var(--font-display)] font-black text-2xl text-[#8B7FE8]">
                Toolkit.ai
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Certificate ID</div>
                <div className="text-xs font-mono text-gray-600">TK-2026-AI-99X</div>
              </div>
            </div>

            {/* Body */}
            <div className="text-center space-y-6 relative z-10">
              <div className="text-xs lg:text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">
                Certificate of Completion
              </div>
              <h3 className="font-serif text-3xl lg:text-4xl font-black tracking-tight" style={{ color: '#1E1B2E' }}>
                AI MASTERY PROGRAM
              </h3>
              
              <div className="pt-6 pb-2">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Issued To</div>
                <div className="text-2xl font-serif italic border-b border-gray-200 inline-block px-8 pb-2" style={{ color: '#1E1B2E' }}>
                  You
                </div>
              </div>
              
              <p className="text-[10px] lg:text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Awarded for the successful completion of the <strong className="text-gray-700">AI Certification Program</strong>, validating practical skills in using AI tools to improve productivity, creativity, and professional performance.
              </p>
            </div>

            {/* Footer Badges & Date */}
            <div className="mt-12 flex justify-between items-end relative z-10">
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Date of Issue</div>
                <div className="text-sm font-bold" style={{ color: '#1E1B2E' }}>30 March 2026</div>
              </div>
              
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#D8D2FA] border-2 border-white flex items-center justify-center text-xs shadow-sm">🧠</div>
                <div className="w-8 h-8 rounded-full bg-[#FFC9DE] border-2 border-white flex items-center justify-center text-xs shadow-sm">⚡</div>
                <div className="w-8 h-8 rounded-full bg-[#B8E8D8] border-2 border-white flex items-center justify-center text-xs shadow-sm">🚀</div>
              </div>
            </div>

            {/* The Floating Premium Seal Badge */}
            <div 
              ref={badgeRef}
              className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#8B7FE8] to-[#1E1B2E] rounded-full shadow-2xl flex items-center justify-center z-20"
              style={{ clipPath: "polygon(50% 0%, 61% 11%, 77% 11%, 83% 25%, 98% 34%, 93% 50%, 98% 66%, 83% 75%, 77% 89%, 61% 89%, 50% 100%, 39% 89%, 23% 89%, 17% 75%, 2% 66%, 7% 50%, 2% 34%, 17% 25%, 23% 11%, 39% 11%)" }}
            >
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center">
                <span className="font-[var(--font-display)] font-black text-4xl text-white italic">Tk</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
