"use client";

import { useState } from "react";
import { Sparkles, Send, CheckCircle2 } from "lucide-react";

export default function SubmitSection() {
  const [toolName, setToolName] = useState("");
  const [toolUrl, setToolUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (toolName && toolUrl) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setToolName("");
        setToolUrl("");
      }, 4000);
    }
  };

  return (
    <section id="submit" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-gradient-to-r from-[#D8D2FA]/70 via-white to-[#FFC9DE]/60 rounded-3xl p-8 sm:p-14 border border-[#EAE6FE] shadow-soft-md relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#8B7FE8] text-white flex items-center justify-center mx-auto mb-4 shadow-soft-sm">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B2E] mb-3">
            Have an AI tool to share?
          </h2>
          <p className="text-base text-[#6B6785] mb-8 leading-relaxed">
            Submit your AI product or recommendation to get featured in the toolkit.ai directory and reach over 50,000 monthly creators.
          </p>

          {submitted ? (
            <div className="bg-[#B8E8D8] text-[#1E1B2E] p-4 rounded-2xl font-bold flex items-center justify-center gap-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-5 h-5 text-[#1E1B2E]" />
              <span>Thank you! Your tool submission has been queued for review.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="text"
                required
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                placeholder="Tool Name (e.g. MyAiApp)"
                className="w-full sm:w-1/2 px-4 py-3 rounded-2xl bg-white border border-[#EAE6FE] focus:border-[#8B7FE8] text-[#1E1B2E] text-sm font-medium outline-none shadow-soft-sm"
              />
              <input
                type="url"
                required
                value={toolUrl}
                onChange={(e) => setToolUrl(e.target.value)}
                placeholder="Website URL (https://...)"
                className="w-full sm:w-1/2 px-4 py-3 rounded-2xl bg-white border border-[#EAE6FE] focus:border-[#8B7FE8] text-[#1E1B2E] text-sm font-medium outline-none shadow-soft-sm"
              />
              <button
                type="submit"
                className="bg-[#8B7FE8] hover:bg-[#786BD6] text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-soft-md hover:shadow-glow-primary transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Submit</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
