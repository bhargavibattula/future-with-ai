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
    <section id="submit" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="bg-gradient-to-r from-[#D8D2FA]/70 via-white to-[#FFC9DE]/60 dark:from-[#1E1933] dark:via-[#13111C] dark:to-[#1C1625] rounded-2xl sm:rounded-3xl p-5 sm:p-14 border border-[#EAE6FE] dark:border-white/10 shadow-soft-md relative overflow-hidden transition-colors">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#8B7FE8] text-white flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-soft-sm">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-2.5 sm:mb-3">
            Have an AI tool to share?
          </h2>
          <p className="text-xs sm:text-base text-[var(--foreground-secondary)] mb-6 sm:mb-8 leading-relaxed">
            Submit your AI product or recommendation to get featured in the future.ai directory and reach over 50,000 monthly creators.
          </p>

          {submitted ? (
            <div className="bg-[#B8E8D8] text-[#1E1B2E] p-4 rounded-2xl font-bold flex items-center justify-center gap-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-5 h-5 text-[#1E1B2E]" />
              <span className="text-xs sm:text-sm">Thank you! Your tool submission has been queued for review.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="text"
                required
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                placeholder="Tool Name (e.g. MyAiApp)"
                className="w-full sm:w-1/2 px-4 py-3 rounded-2xl bg-white dark:bg-[#1A1827] border border-[#EAE6FE] dark:border-white/15 focus:border-[#8B7FE8] text-[var(--foreground)] placeholder-[#6B6785] dark:placeholder-[#8E8A9F] text-xs sm:text-sm font-medium outline-none shadow-soft-sm min-h-[44px]"
              />
              <input
                type="url"
                required
                value={toolUrl}
                onChange={(e) => setToolUrl(e.target.value)}
                placeholder="Website URL (https://...)"
                className="w-full sm:w-1/2 px-4 py-3 rounded-2xl bg-white dark:bg-[#1A1827] border border-[#EAE6FE] dark:border-white/15 focus:border-[#8B7FE8] text-[var(--foreground)] placeholder-[#6B6785] dark:placeholder-[#8E8A9F] text-xs sm:text-sm font-medium outline-none shadow-soft-sm min-h-[44px]"
              />
              <button
                type="submit"
                className="bg-[#8B7FE8] hover:bg-[#786BD6] text-white px-6 py-3 rounded-2xl font-semibold text-xs sm:text-sm shadow-soft-md hover:shadow-glow-primary transition-all flex items-center justify-center gap-2 whitespace-nowrap min-h-[44px]"
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
