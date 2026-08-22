"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaStar } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#FCFBFF] dark:bg-[#0A0A0A] py-12 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1E1B2E] dark:text-white tracking-tight mb-3 text-center font-['Space_Grotesk']">
          Why users choose <span className="text-[#8B7FE8]">Future.ai</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[#6B6785] dark:text-[#A09CAE] mb-10 lg:mb-16 text-center max-w-xl">
          Thousands of developers, founders, and professionals trust Future.ai to master AI.
        </p>

        {/* Bento Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-auto">

          {/* Card 1: 28-Day Challenge (Spans 2 columns on lg+) */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#8B7FE8] to-[#6A47F9] rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between overflow-hidden relative shadow-xl shadow-[#8B7FE8]/20 min-h-[300px]">
            <div className="z-10 w-full sm:w-1/2 text-white">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 font-['Space_Grotesk']">The 28-Day AI Challenge</h3>
              <p className="text-white/80 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8">
                Take daily bite-sized steps at your own pace to transform your skills and go from curious to AI engineer.
              </p>
              <a href="#explore" className="inline-flex items-center justify-center bg-white text-[#6A47F9] font-bold py-3 px-6 rounded-full text-xs sm:text-sm hover:shadow-lg transition-all duration-300 w-full sm:w-auto min-h-[44px]">
                Start my Challenge →
              </a>
            </div>

            {/* Mock UI Graphic */}
            <div className="hidden lg:block absolute right-[-20px] top-[10%] w-[320px] h-full bg-[#1E1B2E] rounded-tl-2xl rounded-bl-2xl p-6 border border-[#2A2640] shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-semibold text-xs">AI Mastery</span>
                <span className="bg-[#8B7FE8] text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold">28 modules</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-[#2A2640] rounded-xl flex items-center justify-center relative">
                    {i === 1 && <span className="absolute -top-3 bg-white text-[#1E1B2E] text-[10px] px-2 py-0.5 rounded shadow font-bold">Active</span>}
                    {i === 1 ? <div className="w-5 h-5 bg-white rounded-full"></div> : <div className="w-4 h-4 bg-[#6B6785]/30 rounded-full"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Rating */}
          <div className="bg-white dark:bg-[#141220] border border-[#EAE6FE] dark:border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center shadow-sm text-center">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <svg width="32" height="64" viewBox="0 0 40 80" className="text-[#5CBFA0] fill-current opacity-70"><path d="M30 10 Q10 40 30 70 Q10 60 10 40 Q10 20 30 10 Z" /></svg>
              <span className="text-5xl sm:text-6xl font-black text-[#1E1B2E] dark:text-white font-['Space_Grotesk'] tracking-tighter">4.5</span>
              <svg width="32" height="64" viewBox="0 0 40 80" className="text-[#5CBFA0] fill-current opacity-70"><path d="M10 10 Q30 40 10 70 Q30 60 30 40 Q30 20 10 10 Z" /></svg>
            </div>
            <p className="text-[#6B6785] dark:text-[#A09CAE] text-xs sm:text-sm leading-relaxed">
              * Average rating based on 10,000+ developer reviews across AppStore, Play Market and Trustpilot
            </p>
          </div>

          {/* Card 3: AI Tools */}
          <div className="bento-card group bg-white dark:bg-[#141220] border border-[#EAE6FE] dark:border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-end relative overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D8D2FA] transition-all duration-500 cursor-pointer min-h-[280px] sm:min-h-[340px] md:min-h-0">
            <div className="absolute top-6 left-6 right-6 h-28 sm:h-32 bg-gradient-to-r from-[#F3F0FF] to-white dark:from-[#1C182B] dark:to-[#141220] rounded-2xl border border-[#D8D2FA] dark:border-white/10 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
              <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-500">
                <Image src="/images/dog-doctor.png" alt="Dog doctor" fill className="object-cover object-top" />
              </div>
              <div className="absolute bottom-3 left-3 bg-[#1E1B2E] text-white text-[10px] sm:text-[11px] px-2.5 py-1 rounded-lg shadow-lg font-medium">
                Create with AI Tools
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1E1B2E] dark:text-white mb-1.5 font-['Space_Grotesk'] mt-28 sm:mt-32">50+ Leading AI Tools</h3>
            <p className="text-[#6B6785] dark:text-[#A09CAE] text-xs sm:text-sm">
              Code copilots, image generation, video avatars, and AI agents
            </p>
          </div>

          {/* Card 4: Learn on the go */}
          <div className="bg-white dark:bg-[#141220] border border-[#EAE6FE] dark:border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col shadow-sm relative overflow-hidden min-h-[280px] sm:min-h-[340px] md:min-h-0">
            <h3 className="text-lg sm:text-xl font-bold text-[#1E1B2E] dark:text-white mb-1.5 font-['Space_Grotesk']">Learn on the go</h3>
            <p className="text-[#6B6785] dark:text-[#A09CAE] text-xs sm:text-sm mb-8">
              Interactive lessons, quizzes, and voice-assisted guides.
            </p>
            <div className="absolute bottom-6 left-6 right-6 h-16 sm:h-20 flex items-center justify-center gap-1 opacity-70">
              {[40, 75, 30, 85, 50, 95, 60, 35, 80, 45, 90, 65, 25, 70, 55, 85, 40, 75, 50, 30].map((h, i) => (
                <div key={i} className="w-1 sm:w-1.5 bg-[#8B7FE8] rounded-full" style={{ height: `${h}%` }}></div>
              ))}
              <div className="absolute bottom-1 right-1 w-9 h-9 sm:w-10 sm:h-10 bg-[#8B7FE8] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5"></div>
              </div>
            </div>
          </div>

          {/* Card 5: Certificates */}
          <div className="bg-gradient-to-br from-[#8B7FE8] to-[#4F46E5] rounded-3xl p-6 sm:p-8 flex flex-col justify-end shadow-lg shadow-[#8B7FE8]/20 relative overflow-hidden min-h-[280px] sm:min-h-[340px] md:min-h-0">
            <div className="absolute top-4 left-0 right-0 h-32 sm:h-40 flex items-center justify-center opacity-80 pointer-events-none">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl rotate-12 absolute top-4 left-10"></div>
              <div className="w-12 h-12 bg-[#FFC9DE] rounded-full -rotate-12 absolute top-6 right-10"></div>
              <div className="w-14 h-14 bg-[#B8E8D8] rounded-2xl rotate-45 absolute bottom-2"></div>
            </div>

            <div className="z-10 relative">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-['Space_Grotesk']">Prove skills, get ahead</h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-5">
                Earn cryptographic verified certificates to showcase on LinkedIn.
              </p>
              <a href="#certificates" className="inline-flex items-center justify-center bg-white text-[#6A47F9] font-bold py-2.5 px-5 rounded-full text-xs hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
                Explore Certificates →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
