"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin, FaYoutube, FaDiscord } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#EAE6FE] pt-16 pb-12 text-[#1E1B2E] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP NEWSLETTER BANNER CARD */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#F3F0FE] via-[#FCFBFF] to-[#EDF9F5] border border-[#D8D2FA] shadow-soft-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B7FE8] text-white text-xs font-black mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekly AI Insights</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1E1B2E] tracking-tight mb-2">
              Stay ahead in the AI revolution
            </h3>
            <p className="text-xs sm:text-sm font-bold text-[#4A4665] leading-relaxed">
              Join 50,000+ professionals receiving curated AI course updates, prompt guides, and tool breakdowns every Tuesday.
            </p>
          </div>

          {/* Newsletter Input Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]"
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              className="px-4 py-3 rounded-2xl bg-white border border-[#D8D2FA] text-xs font-bold text-[#1E1B2E] placeholder-[#6B6785] focus:outline-none focus:ring-2 focus:ring-[#8B7FE8] shadow-inner flex-grow"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-[#8B7FE8] hover:bg-[#786BD6] text-white text-xs font-black shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Subscribe Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* MAIN 4-COLUMN FOOTER LINKS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#EAE6FE]">
          
          {/* Col 1 & 2: Brand, Tagline & Socials */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#8B7FE8] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 fill-white" />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-[#1E1B2E] tracking-tight">Future</span>
                <span className="text-2xl font-black text-[#8B7FE8]">.ai</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-bold text-[#4A4665] leading-relaxed max-w-sm mb-6">
              Empowering learners worldwide to master cutting-edge AI tools through interactive courses, hands-on challenges, and industry-recognized certificates.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              {[
                { name: "Twitter", Icon: FaXTwitter, href: "#" },
                { name: "GitHub", Icon: FaGithub, href: "#" },
                { name: "Discord", Icon: FaDiscord, href: "#" },
                { name: "LinkedIn", Icon: FaLinkedin, href: "#" },
                { name: "YouTube", Icon: FaYoutube, href: "#" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.name}
                  className="w-9 h-9 rounded-xl bg-[#F3F0FE] hover:bg-[#8B7FE8] text-[#8B7FE8] hover:text-white border border-[#D8D2FA] flex items-center justify-center transition-all shadow-sm"
                >
                  <item.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Popular AI Courses */}
          <div>
            <h4 className="text-xs font-black text-[#1E1B2E] uppercase tracking-wider mb-4">
              Popular Courses
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-[#4A4665]">
              <li>
                <a href="#explore" className="hover:text-[#8B7FE8] transition-colors flex items-center gap-1.5">
                  <span>ChatGPT Masterclass</span>
                </a>
              </li>
              <li>
                <a href="#explore" className="hover:text-[#8B7FE8] transition-colors flex items-center gap-1.5">
                  <span>Claude 3.5 Sonnet Workflows</span>
                </a>
              </li>
              <li>
                <a href="#explore" className="hover:text-[#8B7FE8] transition-colors flex items-center gap-1.5">
                  <span>Gemini Pro Prompting</span>
                </a>
              </li>
              <li>
                <a href="#explore" className="hover:text-[#8B7FE8] transition-colors flex items-center gap-1.5">
                  <span>Midjourney v6 Photorealism</span>
                </a>
              </li>
              <li>
                <a href="#explore" className="hover:text-[#8B7FE8] transition-colors flex items-center gap-1.5">
                  <span>Cursor AI Web Development</span>
                </a>
              </li>
              <li>
                <a href="#explore" className="hover:text-[#8B7FE8] transition-colors flex items-center gap-1.5">
                  <span>Lovable & No-Code AI</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Features */}
          <div>
            <h4 className="text-xs font-black text-[#1E1B2E] uppercase tracking-wider mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-[#4A4665]">
              <li>
                <a href="#challenge" className="hover:text-[#8B7FE8] transition-colors">
                  28-Day AI Challenge
                </a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-[#8B7FE8] transition-colors">
                  Interactive Learning Dashboard
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-[#8B7FE8] transition-colors">
                  Verified Certificates
                </a>
              </li>
              <li>
                <a href="#heatmap" className="hover:text-[#8B7FE8] transition-colors">
                  Skill Heatmaps & Streaks
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-[#8B7FE8] transition-colors">
                  AI Industry Insights
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Account & Company */}
          <div>
            <h4 className="text-xs font-black text-[#1E1B2E] uppercase tracking-wider mb-4">
              Account & Legal
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-[#4A4665]">
              <li>
                <Link href="/login" className="hover:text-[#8B7FE8] transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-[#8B7FE8] transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#8B7FE8] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8B7FE8] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8B7FE8] transition-[#8B7FE8]">
                  Security & Trust
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#4A4665]">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Future.ai Inc. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
