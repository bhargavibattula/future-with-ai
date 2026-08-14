"use client";

import React from "react";
import { FaMobileAlt, FaPenNib, FaBullhorn } from "react-icons/fa";

const workflows = [
  {
    id: 1,
    icon: <FaMobileAlt className="text-[#8B7FE8] text-xl" />,
    title: "Social Influence & Blogging",
    description: "Craft viral social media scripts, build a powerful personal brand, and manage consistent content calendars for all your channels.",
    tags: ["AI in SMM", "AI Social Influence & Blogging"],
  },
  {
    id: 2,
    icon: <FaPenNib className="text-[#8B7FE8] text-xl" />,
    title: "Copywriting & Content Strategy",
    description: "Draft high-converting sales copy, script viral social media content, and maintain engaging blogs that resonate with your audience.",
    tags: ["AI in SMM", "AI Social Influence & Blogging"],
  },
  {
    id: 3,
    icon: <FaBullhorn className="text-[#8B7FE8] text-xl" />,
    title: "Marketing & Sales",
    description: "Generate 50+ ad variations, personalize outreach emails at scale, and optimize your marketing funnels for maximum conversion.",
    tags: ["AI in Marketing", "Sales Automation"],
  },
  {
    id: 4,
    icon: <FaMobileAlt className="text-[#8B7FE8] text-xl" />,
    title: "Social Influence & Blogging",
    description: "Craft viral social media scripts, build a powerful personal brand, and manage consistent content calendars for all your channels.",
    tags: ["AI in SMM", "AI Social Influence & Blogging"],
  },
];

export default function AIToolWorkflows() {
  return (
    <section className="w-full bg-[#FCFBFF] py-24 px-6 sm:px-12 lg:px-24 overflow-hidden relative border-b border-[#EAE6FE]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Sticky Header */}
        <div className="flex flex-col z-10 lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1B2E] tracking-tight leading-tight font-['Space_Grotesk'] mb-2">
            AI is a tool.
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#6A47F9] tracking-tight leading-tight font-['Space_Grotesk'] mb-6">
            Your results are the goal.
          </h2>
          <p className="text-lg md:text-xl text-[#6B6785] leading-relaxed max-w-md">
            See how mastering these tools transforms your specific workflow.
          </p>
        </div>

        {/* Right Side: Vertical Marquee */}
        <div className="relative h-[400px] lg:h-[600px] overflow-hidden marquee-container mask-vertical flex justify-center lg:justify-end mt-10 lg:mt-0">
          
          {/* Fading Edges (Removed to fix white cast, handled by mask-image) */}
          {/* Scrolling Track - Increased speed by forcing animation-duration to 8s */}
          <div className="flex flex-col gap-6 w-full max-w-[500px] animate-marquee-up" style={{ animationDuration: '8s' }}>
            {/* Double the array for seamless infinite scroll */}
            {[...workflows, ...workflows, ...workflows].map((workflow, index) => (
              <div 
                key={`${workflow.id}-${index}`} 
                className="bg-white border border-[#EAE6FE] rounded-2xl p-8 flex flex-col hover:border-[#8B7FE8] transition-colors duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] border border-[#D8D2FA] flex items-center justify-center">
                    {workflow.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1E1B2E] font-['Space_Grotesk']">{workflow.title}</h3>
                </div>
                
                <p className="text-[#6B6785] text-sm leading-relaxed mb-6">
                  {workflow.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {workflow.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="bg-[#F3F0FF] text-[#6A47F9] text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-[#D8D2FA]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Global CSS for Vertical Mask */}
      <style dangerouslySetInnerHTML={{__html: `
        .mask-vertical {
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }
      `}} />
    </section>
  );
}
