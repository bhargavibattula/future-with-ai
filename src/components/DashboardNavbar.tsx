"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Home,
  BookOpen,
  Wrench,
  Gamepad2,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Flame,
  Bookmark,
  ShieldCheck,
  LayoutDashboard,
  Terminal,
  Trophy,
  Compass,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function DashboardNavbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [xpCount, setXpCount] = useState<number>(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Sync streak count dynamically from backend API & custom events
  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const res = await fetch("/api/streak");
        const json = await res.json();
        if (res.ok && json.success) {
          if (json.data?.progress?.currentStreak !== undefined) {
            setStreakCount(json.data.progress.currentStreak);
          }
          if (json.data?.progress?.totalXP !== undefined) {
            setXpCount(json.data.progress.totalXP);
          }
        }
      } catch (err) {
        console.error("Failed to fetch streak in navbar:", err);
      }
    };

    fetchStreak();

    const handleStreakUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<number>;
      if (customEvt.detail !== undefined && typeof customEvt.detail === "number") {
        setStreakCount(customEvt.detail);
      } else {
        fetchStreak();
      }
    };

    const handleXpUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<number>;
      if (customEvt.detail !== undefined && typeof customEvt.detail === "number") {
        setXpCount((prev) => prev + customEvt.detail);
      } else {
        fetchStreak();
      }
    };

    window.addEventListener("streak-updated", handleStreakUpdate);
    window.addEventListener("xp-updated", handleXpUpdate);
    window.addEventListener("storage", handleStreakUpdate);
    return () => {
      window.removeEventListener("streak-updated", handleStreakUpdate);
      window.removeEventListener("xp-updated", handleXpUpdate);
      window.removeEventListener("storage", handleStreakUpdate);
    };
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setProfileDropdownOpen(false);
      }
      if (learnRef.current && !learnRef.current.contains(target)) {
        setLearnDropdownOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(target)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitial = (name?: string) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const isLearnActive =
    pathname === "/dashboard/courses" || pathname.startsWith("/dashboard/prompt-library");
  const isToolsActive =
    pathname === "/dashboard/tools" || pathname === "/dashboard/games";

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--card)] border-b border-[var(--border)] shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center shadow-soft-sm group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-extrabold tracking-tight text-[var(--foreground)]">
              future
            </span>
            <span className="text-xl font-extrabold text-[#8B7FE8]">
              .ai
            </span>
          </div>
        </Link>

        {/* Minimal Clean Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-bold select-none">
          {/* Home Link */}
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 py-1 transition-colors relative ${
              pathname === "/dashboard"
                ? "text-[#8B7FE8]"
                : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
            {pathname === "/dashboard" && (
              <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-[#8B7FE8] rounded-t-full" />
            )}
          </Link>

          {/* Learn Subsection Dropdown */}
          <div className="relative" ref={learnRef}>
            <button
              type="button"
              onClick={() => {
                setLearnDropdownOpen(!learnDropdownOpen);
                setToolsDropdownOpen(false);
              }}
              onMouseEnter={() => setLearnDropdownOpen(true)}
              className={`flex items-center gap-1.5 py-1 transition-colors ${
                isLearnActive
                  ? "text-[#8B7FE8]"
                  : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learn & Prompts</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  learnDropdownOpen ? "rotate-180" : ""
                }`}
              />
              {isLearnActive && (
                <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-[#8B7FE8] rounded-t-full" />
              )}
            </button>

            {learnDropdownOpen && (
              <div
                onMouseLeave={() => setLearnDropdownOpen(false)}
                className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#1A1827] rounded-2xl p-3 shadow-xl border border-[#EAE6FE] dark:border-[#332C4A] animate-in fade-in slide-in-from-top-2 z-50 space-y-1"
              >
                <div className="px-3 py-1.5 text-[10px] font-extrabold tracking-wider uppercase text-[#8B7FE8]">
                  Learning Subsections
                </div>

                <Link
                  href="/dashboard/courses"
                  onClick={() => setLearnDropdownOpen(false)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                    pathname === "/dashboard/courses"
                      ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                      : "hover:bg-[#F8F6FF] dark:hover:bg-[#231E38] text-[var(--foreground)]"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[#F5F2FF] dark:bg-[#2A2440] text-[#8B7FE8] mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs">Interactive Courses</div>
                    <div className="text-[11px] font-normal text-[var(--foreground-secondary)]">
                      Structured path-based learning modules
                    </div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/prompt-library"
                  onClick={() => setLearnDropdownOpen(false)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                    pathname.startsWith("/dashboard/prompt-library")
                      ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                      : "hover:bg-[#F8F6FF] dark:hover:bg-[#231E38] text-[var(--foreground)]"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[#F5F2FF] dark:bg-[#2A2440] text-[#8B7FE8] mt-0.5">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs">Prompt Library</div>
                    <div className="text-[11px] font-normal text-[var(--foreground-secondary)]">
                      Curated AI prompt templates & domains
                    </div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/bookmarks"
                  onClick={() => setLearnDropdownOpen(false)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                    pathname === "/dashboard/bookmarks"
                      ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                      : "hover:bg-[#F8F6FF] dark:hover:bg-[#231E38] text-[var(--foreground)]"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[#F5F2FF] dark:bg-[#2A2440] text-[#8B7FE8] mt-0.5">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs">Saved Lessons</div>
                    <div className="text-[11px] font-normal text-[var(--foreground-secondary)]">
                      Your bookmarked lessons
                    </div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/wallet"
                  onClick={() => setLearnDropdownOpen(false)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                    pathname === "/dashboard/wallet"
                      ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                      : "hover:bg-[#F8F6FF] dark:hover:bg-[#231E38] text-[var(--foreground)]"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[#F5F2FF] dark:bg-[#2A2440] text-[#8B7FE8] mt-0.5">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs">AI Coins Wallet</div>
                    <div className="text-[11px] font-normal text-[var(--foreground-secondary)]">
                      Balance & transaction history
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Tools & Practice Dropdown */}
          <div className="relative" ref={toolsRef}>
            <button
              type="button"
              onClick={() => {
                setToolsDropdownOpen(!toolsDropdownOpen);
                setLearnDropdownOpen(false);
              }}
              onMouseEnter={() => setToolsDropdownOpen(true)}
              className={`flex items-center gap-1.5 py-1 transition-colors ${
                isToolsActive
                  ? "text-[#8B7FE8]"
                  : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Tools & Arcade</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  toolsDropdownOpen ? "rotate-180" : ""
                }`}
              />
              {isToolsActive && (
                <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-[#8B7FE8] rounded-t-full" />
              )}
            </button>

            {toolsDropdownOpen && (
              <div
                onMouseLeave={() => setToolsDropdownOpen(false)}
                className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#1A1827] rounded-2xl p-3 shadow-xl border border-[#EAE6FE] dark:border-[#332C4A] animate-in fade-in slide-in-from-top-2 z-50 space-y-1"
              >
                <div className="px-3 py-1.5 text-[10px] font-extrabold tracking-wider uppercase text-[#8B7FE8]">
                  Ecosystem Subsections
                </div>

                <Link
                  href="/dashboard/tools"
                  onClick={() => setToolsDropdownOpen(false)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                    pathname === "/dashboard/tools"
                      ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                      : "hover:bg-[#F8F6FF] dark:hover:bg-[#231E38] text-[var(--foreground)]"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[#F5F2FF] dark:bg-[#2A2440] text-[#8B7FE8] mt-0.5">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs">AI Tools Directory</div>
                    <div className="text-[11px] font-normal text-[var(--foreground-secondary)]">
                      Discover 100+ curated AI tools
                    </div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/games"
                  onClick={() => setToolsDropdownOpen(false)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                    pathname === "/dashboard/games"
                      ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                      : "hover:bg-[#F8F6FF] dark:hover:bg-[#231E38] text-[var(--foreground)]"
                  }`}
                >
                  <div className="p-2 rounded-lg bg-[#F5F2FF] dark:bg-[#2A2440] text-[#8B7FE8] mt-0.5">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs">Interactive Games</div>
                    <div className="text-[11px] font-normal text-[var(--foreground-secondary)]">
                      AI challenge arcade & mini-games
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Leaderboard Link */}
          <Link
            href="/dashboard/leaderboard"
            className={`flex items-center gap-2 py-1 transition-colors relative ${
              pathname === "/dashboard/leaderboard"
                ? "text-[#8B7FE8]"
                : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Leaderboard</span>
            {pathname === "/dashboard/leaderboard" && (
              <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-[#8B7FE8] rounded-t-full" />
            )}
          </Link>
        </nav>

        {/* Right side Actions / Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <DarkModeToggle />

          {/* Flame / Streak Badge */}
          <Link 
            href="/dashboard/streak"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] dark:bg-[#2A1520] border border-[#FFC9DE] dark:border-[#F0879B]/40 text-[#C0336A] dark:text-[#FFC9DE] font-black text-sm shadow-soft-sm cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse-subtle" />
            <span>{streakCount}</span>
          </Link>

          {/* XP Badge */}
          <Link 
            href="/dashboard/leaderboard"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0FDF4] dark:bg-[#142A1D] border border-[#BBF7D0] dark:border-[#22C55E]/40 text-[#166534] dark:text-[#86EFAC] font-black text-sm shadow-soft-sm cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{xpCount} XP</span>
          </Link>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-[#F3F0FE] dark:hover:bg-[#282142] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center font-bold text-white shadow-soft-sm">
                {getInitial(user?.name)}
              </div>
              <span className="text-sm font-semibold text-[var(--foreground)] hidden lg:block">
                Profile
              </span>
              <ChevronDown className="w-4 h-4 text-[var(--foreground-secondary)] hidden lg:block" />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1A1827] rounded-2xl p-2 shadow-xl border border-[#EAE6FE] dark:border-[#332C4A] animate-in fade-in slide-in-from-top-2 z-50">
                <div className="px-3 py-2 mb-1 bg-[#F3F0FE] dark:bg-[#251E3A] rounded-xl border border-[#EAE6FE] dark:border-[#332C4A]">
                  <p className="text-sm font-bold text-[var(--foreground)] truncate">
                    {user?.name || "Guest"}
                  </p>
                  <p className="text-xs text-[var(--foreground-secondary)] truncate">
                    {user?.email || "guest@example.com"}
                  </p>
                </div>
                
                <Link
                  href="/dashboard"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-[var(--foreground)] rounded-xl hover:bg-[#F3F0FE] dark:hover:bg-[#282142] transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#8B7FE8]" />
                  <span>Dashboard</span>
                </Link>
                
                <Link
                  href={`/dashboard/profile/${user?.name?.toLowerCase().replace(/\s+/g, '-') || 'guest'}`}
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-[var(--foreground)] rounded-xl hover:bg-[#F3F0FE] dark:hover:bg-[#282142] transition-colors"
                >
                  <User className="w-4 h-4 text-[#8B7FE8]" />
                  <span>My Account</span>
                </Link>

                <Link
                  href="/dashboard/tools"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-[var(--foreground)] rounded-xl hover:bg-[#F3F0FE] dark:hover:bg-[#282142] transition-colors"
                >
                  <Bookmark className="w-4 h-4 text-[#8B7FE8]" />
                  <span>Saved AI Tools</span>
                </Link>

                <Link
                  href="/dashboard/bookmarks"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-[var(--foreground)] rounded-xl hover:bg-[#F3F0FE] dark:hover:bg-[#282142] transition-colors"
                >
                  <Bookmark className="w-4 h-4 text-[#8B7FE8]" />
                  <span>Saved Lessons</span>
                </Link>

                <div className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-[var(--foreground)] rounded-xl hover:bg-[#F3F0FE] dark:hover:bg-[#282142] transition-colors cursor-default">
                  <ShieldCheck className="w-4 h-4 text-[#8B7FE8]" />
                  <span>2FA Security Active</span>
                </div>

                <div className="border-t border-[#EAE6FE] dark:border-[#332C4A] pt-1 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                      router.push("/");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <Link 
            href="/dashboard/streak"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF0F5] dark:bg-[#2A1520] border border-[#FFC9DE] dark:border-[#F0879B]/40 text-[#C0336A] dark:text-[#FFC9DE] font-black text-xs shadow-soft-sm"
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>{streakCount}</span>
          </Link>
          <Link 
            href="/dashboard/leaderboard"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0FDF4] dark:bg-[#142A1D] border border-[#BBF7D0] dark:border-[#22C55E]/40 text-[#166534] dark:text-[#86EFAC] font-black text-xs shadow-soft-sm"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{xpCount}</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--foreground)] hover:bg-[#D8D2FA]/30 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Clean Grouped Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1A1827] border-b border-[#EAE6FE] dark:border-[#332C4A] px-4 py-4 space-y-4 animate-in slide-in-from-top">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm ${
                pathname === "/dashboard"
                  ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                  : "text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-[#231E38]"
              }`}
            >
              <Home className="w-5 h-5 text-[#8B7FE8]" />
              <span>Home Dashboard</span>
            </Link>

            {/* Learn Group */}
            <div className="space-y-1 pt-1">
              <div className="px-4 text-[10px] font-extrabold uppercase tracking-wider text-[#8B7FE8]">
                Learn & Prompts
              </div>
              <Link
                href="/dashboard/courses"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm ${
                  pathname === "/dashboard/courses"
                    ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                    : "text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-[#231E38]"
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#8B7FE8]" />
                <span>Interactive Courses</span>
              </Link>
              <Link
                href="/dashboard/prompt-library"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm ${
                  pathname.startsWith("/dashboard/prompt-library")
                    ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                    : "text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-[#231E38]"
                }`}
              >
                <Terminal className="w-4 h-4 text-[#8B7FE8]" />
                <span>Prompt Library</span>
              </Link>
            </div>

            {/* Tools Group */}
            <div className="space-y-1 pt-1">
              <div className="px-4 text-[10px] font-extrabold uppercase tracking-wider text-[#8B7FE8]">
                Tools & Arcade
              </div>
              <Link
                href="/dashboard/tools"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm ${
                  pathname === "/dashboard/tools"
                    ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                    : "text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-[#231E38]"
                }`}
              >
                <Wrench className="w-4 h-4 text-[#8B7FE8]" />
                <span>AI Tools Directory</span>
              </Link>
              <Link
                href="/dashboard/games"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm ${
                  pathname === "/dashboard/games"
                    ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                    : "text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-[#231E38]"
                }`}
              >
                <Gamepad2 className="w-4 h-4 text-[#8B7FE8]" />
                <span>Interactive Games</span>
              </Link>
            </div>

            {/* Leaderboard */}
            <div className="pt-1">
              <Link
                href="/dashboard/leaderboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm ${
                  pathname === "/dashboard/leaderboard"
                    ? "bg-[#F3F0FE] dark:bg-[#282142] text-[#8B7FE8]"
                    : "text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-[#231E38]"
                }`}
              >
                <Trophy className="w-4 h-4 text-[#8B7FE8]" />
                <span>Leaderboard</span>
              </Link>
            </div>
          </nav>

          <div className="pt-2 border-t border-[#EAE6FE] dark:border-[#332C4A]">
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
                router.push("/");
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 font-semibold text-sm rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out ({user?.name || 'Guest'})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
