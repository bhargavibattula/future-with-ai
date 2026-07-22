"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaStar } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#FCFBFF] py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1E1B2E] tracking-tight mb-4 font-['Space_Grotesk']">
          Why users choose <span className="text-[#8B7FE8]">Future.ai</span>
        </h2>
        <p className="text-lg text-[#6B6785] mb-12 lg:mb-16">
          Thousands of users trust Future.ai to learn AI.
        </p>

        {/* Bento Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">

          {/* Card 1: 28-Day Challenge (Spans 2 columns) */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#8B7FE8] to-[#6A47F9] rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between overflow-hidden relative shadow-xl shadow-[#8B7FE8]/20">
            <div className="z-10 w-full sm:w-1/2 text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-['Space_Grotesk']">The 28-Day AI Challenge</h3>
              <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-8">
                Take daily bite-sized steps at your own pace to transform your life and go from curious to pro
              </p>
              <button className="bg-white text-[#6A47F9] font-bold py-3 px-6 rounded-full text-sm hover:shadow-lg transition-all duration-300">
                Start my Challenge →
              </button>
            </div>

            {/* Mock UI Graphic */}
            <div className="hidden sm:block absolute right-[-20px] top-[10%] w-[340px] h-full bg-[#1E1B2E] rounded-tl-2xl rounded-bl-2xl p-6 border border-[#2A2640] shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-semibold">AI Mastery</span>
                <span className="bg-[#8B7FE8] text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold">28 modules</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Simulated grid items */}
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-[#2A2640] rounded-xl flex items-center justify-center relative">
                    {i === 1 && <span className="absolute -top-3 bg-white text-[#1E1B2E] text-[10px] px-2 py-0.5 rounded shadow">You are here</span>}
                    {i === 1 ? <div className="w-6 h-6 bg-white rounded-full"></div> : <div className="w-5 h-5 bg-[#6B6785]/30 rounded-full"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Rating */}
          <div className="bg-white border border-[#EAE6FE] rounded-3xl p-8 lg:p-10 flex flex-col items-center justify-center shadow-sm text-center">
            <div className="flex items-center gap-4 mb-4">
              <svg width="40" height="80" viewBox="0 0 40 80" className="text-[#B8E8D8] fill-current opacity-70"><path d="M30 10 Q10 40 30 70 Q10 60 10 40 Q10 20 30 10 Z" /></svg>
              <span className="text-6xl font-black text-[#1E1B2E] font-['Space_Grotesk'] tracking-tighter">4.5</span>
              <svg width="40" height="80" viewBox="0 0 40 80" className="text-[#B8E8D8] fill-current opacity-70"><path d="M10 10 Q30 40 10 70 Q30 60 30 40 Q30 20 10 10 Z" /></svg>
            </div>
            <p className="text-[#6B6785] text-sm leading-relaxed">
              * Average rating based on reviews across AppStore, Play Market and Trustpilot
            </p>
          </div>

          {/* Card 3: AI Tools */}
          <div className="bento-card group bg-white border border-[#EAE6FE] rounded-3xl p-8 lg:p-10 flex flex-col justify-end relative overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D8D2FA] transition-all duration-500 cursor-pointer">
            <div className="absolute top-8 left-8 right-8 h-32 bg-gradient-to-r from-[#F3F0FF] to-white rounded-2xl border border-[#D8D2FA] flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
              <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-500">
                <Image src="/images/dog-doctor.png" alt="Dog doctor" fill className="object-cover object-top" />
              </div>
              <div className="absolute bottom-4 left-4 bg-[#1E1B2E] text-white text-[11px] px-3 py-1.5 rounded-lg shadow-lg font-medium transition-transform duration-500 group-hover:-translate-y-1">
                Create a dog as a doctor
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#1E1B2E] mb-2 font-['Space_Grotesk'] mt-32">10+ leading AI tools</h3>
            <p className="text-[#6B6785] text-sm">
              Create text, images, video, and AI apps – all in one toolkit
            </p>
          </div>

          {/* Card 4: Learn on the go */}
          <div className="bg-white border border-[#EAE6FE] rounded-3xl p-8 lg:p-10 flex flex-col shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-bold text-[#1E1B2E] mb-2 font-['Space_Grotesk']">Learn on the go</h3>
            <p className="text-[#6B6785] text-sm mb-8">
              Listen to lessons like a podcast and master AI hands-free.
            </p>
            <div className="absolute bottom-6 left-6 right-6 h-20 flex items-center justify-center gap-1 opacity-60">
              {/* Fake Audio Waveform */}
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1.5 bg-[#8B7FE8] rounded-full" style={{ height: `${Math.random() * 100}%` }}></div>
              ))}
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-[#8B7FE8] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>

          {/* Card 5: Certificates */}
          <div className="bg-gradient-to-br from-[#8B7FE8] to-[#4F46E5] rounded-3xl p-8 flex flex-col justify-end shadow-lg shadow-[#8B7FE8]/20 relative overflow-hidden">
            <div className="absolute top-4 left-0 right-0 h-40 flex items-center justify-center opacity-80">
              {/* Badges mockup */}
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl rotate-12 absolute top-4 left-10"></div>
              <div className="w-14 h-14 bg-[#FFC9DE] rounded-full -rotate-12 absolute top-8 right-12"></div>
              <div className="w-16 h-16 bg-[#B8E8D8] rounded-2xl rotate-45 absolute bottom-4"></div>
            </div>

            <div className="z-10 relative">
              <h3 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk']">Prove skills, get ahead</h3>
              <p className="text-white/80 text-[13px] leading-relaxed mb-6">
                Earn a professional certificate that boosts your LinkedIn and shows employers you are future-ready
              </p>
              <button className="bg-white text-[#6A47F9] font-bold py-2.5 px-6 rounded-full text-xs hover:shadow-lg transition-all duration-300 w-fit">
                Get a certificate now →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
