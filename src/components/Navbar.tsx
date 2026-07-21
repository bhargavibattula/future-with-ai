"use client";

import { useState } from "react";
import { Sparkles, Menu, X, ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-[#EAE6FE]/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center shadow-soft-sm group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5.5 h-5.5 text-white" />
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-extrabold tracking-tight text-[#1E1B2E]">
              future
            </span>
            <span className="text-2xl font-extrabold text-[#8B7FE8]">
              .ai
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-9 text-[15px] font-medium text-[#1E1B2E]">
          <a
            href="#explore"
            className="hover:text-[#8B7FE8] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B7FE8] hover:after:w-full after:transition-all"
          >
            Explore
          </a>
          <a
            href="#ecosystem"
            className="hover:text-[#8B7FE8] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B7FE8] hover:after:w-full after:transition-all"
          >
            Ecosystem
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#8B7FE8] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B7FE8] hover:after:w-full after:transition-all"
          >
            How it works
          </a>
          <a
            href="#submit"
            className="hover:text-[#8B7FE8] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B7FE8] hover:after:w-full after:transition-all"
          >
            Submit Tool
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {onSearchClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchClick}
              title="Search AI Tools"
              aria-label="Search AI Tools"
            >
              <Search className="w-5 h-5 text-[#6B6785]" />
            </Button>
          )}

          <Button asChild variant="default" size="default">
            <a href="#explore" className="flex items-center gap-1.5">
              <span>Get started</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1E1B2E] hover:bg-[#D8D2FA]/30 rounded-xl transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FCFBFF] border-b border-[#EAE6FE] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3 font-medium text-[#1E1B2E]">
            <a
              href="#explore"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#8B7FE8] border-b border-[#EAE6FE]/50"
            >
              Explore Tools
            </a>
            <a
              href="#ecosystem"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#8B7FE8] border-b border-[#EAE6FE]/50"
            >
              Ecosystem
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#8B7FE8] border-b border-[#EAE6FE]/50"
            >
              How it works
            </a>
            <a
              href="#submit"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#8B7FE8]"
            >
              Submit Tool
            </a>
          </nav>

          <div className="pt-2">
            <Button asChild variant="default" className="w-full">
              <a
                href="#explore"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2"
              >
                <span>Get started</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
