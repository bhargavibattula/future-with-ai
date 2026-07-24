"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Menu,
  X,
  ArrowUpRight,
  Search,
  LogIn,
  UserPlus,
  User,
  LogOut,
  ChevronDown,
  Bookmark,
  Settings,
  Shield,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/AuthModal";
import { AuthMode } from "@/components/auth/AuthCard";
import { useAuth } from "@/lib/auth";
import DarkModeToggle from "@/components/DarkModeToggle";

interface NavbarProps {
  onSearchClick?: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>("login");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openAuth = (mode: AuthMode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const getInitial = (name?: string) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav border-b border-[#EAE6FE]/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
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
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9 text-[15px] font-medium text-[#1E1B2E]">
            <Link
              href="/#explore"
              className="hover:text-[#8B7FE8] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B7FE8] hover:after:w-full after:transition-all"
            >
              Explore
            </Link>
            <Link
              href="/#ecosystem"
              className="hover:text-[#8B7FE8] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B7FE8] hover:after:w-full after:transition-all"
            >
              Ecosystem
            </Link>
            <Link
              href="/#how-it-works"
              className="hover:text-[#8B7FE8] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B7FE8] hover:after:w-full after:transition-all"
            >
              How it works
            </Link>
            <Link
              href="/#submit"
              className="hover:text-[#8B7FE8] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B7FE8] hover:after:w-full after:transition-all"
            >
              Submit Tool
            </Link>
          </nav>

          {/* Action Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Dark mode toggle */}
            <DarkModeToggle />

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

            {user ? (
              /* LOGGED IN STATE: User Profile Avatar & Dropdown Menu */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white border border-[#EAE6FE] shadow-soft-sm hover:border-[#8B7FE8]/60 transition-all duration-200"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center font-bold text-white shadow-soft-sm">
                      {getInitial(user.name)}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                  </div>
                  <span className="text-sm font-semibold text-[#1E1B2E] max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#6B6785] transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass-card rounded-3xl p-3 shadow-2xl border border-[#EAE6FE] bg-white/98 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="px-3 py-2.5 mb-1 bg-[#F3F0FE] rounded-2xl border border-[#EAE6FE]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#8B7FE8] text-white flex items-center justify-center font-bold text-sm">
                          {getInitial(user.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#1E1B2E] truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-[#6B6785] truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#1E1B2E] rounded-xl hover:bg-[#F3F0FE] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#8B7FE8]" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/#explore"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#1E1B2E] rounded-xl hover:bg-[#F3F0FE] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#8B7FE8]" />
                        <span>My Account</span>
                      </Link>
                      <Link
                        href="/#explore"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#1E1B2E] rounded-xl hover:bg-[#F3F0FE] transition-colors"
                      >
                        <Bookmark className="w-4 h-4 text-[#8B7FE8]" />
                        <span>Saved AI Tools</span>
                      </Link>
                      <Link
                        href="/#explore"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#1E1B2E] rounded-xl hover:bg-[#F3F0FE] transition-colors"
                      >
                        <Shield className="w-4 h-4 text-[#8B7FE8]" />
                        <span>2FA Security Active</span>
                      </Link>
                    </div>

                    <div className="border-t border-[#EAE6FE] pt-1.5 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* LOGGED OUT STATE: Log in & Sign Up Buttons */
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="default"
                  className="text-[#1E1B2E] hover:text-[#8B7FE8] font-semibold"
                >
                  <Link href="/login">Log in</Link>
                </Button>

                <Button asChild variant="default" size="default">
                  <Link href="/signup" className="flex items-center gap-1.5">
                    <span>Sign Up</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <DarkModeToggle />
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
            {user && (
              <div className="p-3 bg-[#F3F0FE] rounded-2xl border border-[#EAE6FE] flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#8B7FE8] text-white flex items-center justify-center font-bold">
                  {getInitial(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1E1B2E] truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-[#6B6785] truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            <nav className="flex flex-col space-y-3 font-medium text-[#1E1B2E]">
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#8B7FE8] hover:text-[#786BD6] border-b border-[#EAE6FE]/50 font-bold flex items-center gap-2"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
              )}
              <Link
                href="/#explore"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#8B7FE8] border-b border-[#EAE6FE]/50"
              >
                Explore Tools
              </Link>
              <Link
                href="/#ecosystem"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#8B7FE8] border-b border-[#EAE6FE]/50"
              >
                Ecosystem
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#8B7FE8] border-b border-[#EAE6FE]/50"
              >
                How it works
              </Link>
              <Link
                href="/#submit"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#8B7FE8]"
              >
                Submit Tool
              </Link>
            </nav>

            <div className="pt-2 flex flex-col gap-2.5">
              {user ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log Out ({user.name})</span>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-center"
                  >
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <LogIn className="w-4 h-4 text-[#8B7FE8]" />
                      <span>Log in</span>
                    </Link>
                  </Button>

                  <Button asChild variant="default" className="w-full">
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Create Account</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Embedded Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
