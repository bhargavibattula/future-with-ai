"use client";

import React, { useState } from "react";
import { Bot, Sparkles, Cpu, Sliders, Play, Code } from "lucide-react";
import { ADMIN_AI_PROMPTS } from "@/data/adminData";

export default function AdminAIManagementSection() {
  const [prompts] = useState(ADMIN_AI_PROMPTS);

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight">
            AI <span className="text-[#8B7FE8]">Management & Tutor Prompts</span>
          </h2>
          <p className="text-xs text-[#6B6785] font-medium">
            Configure system instructions, model choices, temperature settings, and AI tutors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {prompts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-3xl p-6 border border-[#E8E3FF] shadow-soft space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#8B7FE8]" />
                <h3 className="text-base font-extrabold text-[#1E1B2E]">{p.title}</h3>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#EBF8FF] text-[#2B6CB0] border border-[#BEE3F8]">
                {p.model}
              </span>
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-[#1E1B2E] block mb-1">
                System Prompt Template
              </label>
              <textarea
                rows={3}
                defaultValue={p.promptTemplate}
                className="w-full p-3 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-mono outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-[#6B6785]">
              <span>Temperature: {p.temperature}</span>
              <span>Used {p.usesCount} times</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
