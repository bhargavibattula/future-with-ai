"use client";

import React from "react";
import Image from "next/image";

const toolIcons = [
  { src: "/ai-tools/chatgpt.png", name: "ChatGPT" },
  { src: "/ai-tools/claude.png", name: "Claude" },
  { src: "/ai-tools/gemini.png", name: "Gemini" },
  { src: "/ai-tools/midjourney.png", name: "Midjourney" },
  { src: "/ai-tools/dalle.png", name: "DALL·E" },
  { src: "/ai-tools/perplexity.png", name: "Perplexity" },
  { src: "/ai-tools/runway.png", name: "Runway" },
  { src: "/ai-tools/canva.png", name: "Canva" },
  { src: "/ai-tools/cursor.png", name: "Cursor" },
  { src: "/ai-tools/copilot.png", name: "Copilot" },
  { src: "/ai-tools/sora.png", name: "Sora" },
  { src: "/ai-tools/elevenlabs.png", name: "ElevenLabs" },
  { src: "/ai-tools/jasper.png", name: "Jasper" },
  { src: "/ai-tools/synthesia.png", name: "Synthesia" },
  { src: "/ai-tools/stable-diffusion.png", name: "Stable Diffusion" },
  { src: "/ai-tools/v0.png", name: "v0" },
  { src: "/ai-tools/writesonic.png", name: "Writesonic" },
];

export default function PracticalAISkills() {
  const col1 = [...toolIcons.slice(0, 6), ...toolIcons.slice(0, 6), ...toolIcons.slice(0, 6)];
  const col2 = [...toolIcons.slice(6, 12), ...toolIcons.slice(6, 12), ...toolIcons.slice(6, 12)];
  const col3 = [...toolIcons.slice(12), ...toolIcons.slice(0, 5), ...toolIcons.slice(12), ...toolIcons.slice(0, 5), ...toolIcons.slice(12), ...toolIcons.slice(0, 5)];

  return (
    <section className="w-full bg-slate-50 dark:bg-[#0A061E] py-24 px-6 sm:px-12 lg:px-24 overflow-hidden relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="flex flex-col z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight font-['Space_Grotesk'] mb-6 transition-colors duration-300">
            Upgrade your life <br />
            with practical <span className="text-[#8B7FE8]">AI skills</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 leading-relaxed max-w-md mb-8 transition-colors duration-300">
            Learn the tools. Build the skills. Get the certificate - in 28 days.
          </p>
          <div>
            <button className="bg-[#6A47F9] hover:bg-[#5a3ae0] text-white font-semibold py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg shadow-[#6A47F9]/25 hover:shadow-xl hover:shadow-[#6A47F9]/40 hover:scale-105">
              Start now
            </button>
          </div>
        </div>

        {/* Right Side: Animated Grid of AI Tool Logos */}
        <div className="relative h-[400px] lg:h-[520px] overflow-hidden practical-ai-mask flex gap-5 lg:gap-6 justify-center lg:justify-end">
          
          {/* Column 1 - Moving Down */}
          <div className="flex flex-col gap-5 lg:gap-6 w-[110px] lg:w-[140px] practical-ai-down">
            {col1.map((tool, index) => (
              <div key={`c1-${index}`} className="w-[110px] h-[110px] lg:w-[140px] lg:h-[140px] rounded-[1.75rem] overflow-hidden shadow-xl shadow-black/20 flex-shrink-0 bg-white dark:bg-slate-900 flex items-center justify-center p-6 border border-slate-100 dark:border-slate-800">
                <Image src={tool.src} alt={tool.name} width={140} height={140} className="w-full h-full object-contain drop-shadow-md" />
              </div>
            ))}
          </div>

          {/* Column 2 - Moving Up */}
          <div className="flex flex-col gap-5 lg:gap-6 w-[110px] lg:w-[140px] practical-ai-up" style={{ animationDelay: '-3s' }}>
            {col2.map((tool, index) => (
              <div key={`c2-${index}`} className="w-[110px] h-[110px] lg:w-[140px] lg:h-[140px] rounded-[1.75rem] overflow-hidden shadow-xl shadow-black/20 flex-shrink-0 bg-white dark:bg-slate-900 flex items-center justify-center p-6 border border-slate-100 dark:border-slate-800">
                <Image src={tool.src} alt={tool.name} width={140} height={140} className="w-full h-full object-contain drop-shadow-md" />
              </div>
            ))}
          </div>

          {/* Column 3 - Moving Down */}
          <div className="flex flex-col gap-5 lg:gap-6 w-[110px] lg:w-[140px] practical-ai-down hidden sm:flex" style={{ animationDelay: '-6s' }}>
            {col3.map((tool, index) => (
              <div key={`c3-${index}`} className="w-[110px] h-[110px] lg:w-[140px] lg:h-[140px] rounded-[1.75rem] overflow-hidden shadow-xl shadow-black/20 flex-shrink-0 bg-white dark:bg-slate-900 flex items-center justify-center p-6 border border-slate-100 dark:border-slate-800">
                <Image src={tool.src} alt={tool.name} width={140} height={140} className="w-full h-full object-contain drop-shadow-md" />
              </div>
            ))}
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .practical-ai-mask {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
        }
        @keyframes practicalDown {
          0% { transform: translateY(-33.33%); }
          100% { transform: translateY(0%); }
        }
        @keyframes practicalUp {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-33.33%); }
        }
        .practical-ai-down {
          animation: practicalDown 20s linear infinite;
        }
        .practical-ai-up {
          animation: practicalUp 20s linear infinite;
        }
      `}} />
    </section>
  );
}
