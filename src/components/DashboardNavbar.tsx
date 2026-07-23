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
  Flame
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardNavbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const getInitial = (name?: string) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const navLinks = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
    { name: "AI Tools", href: "/dashboard/tools", icon: Wrench },
    { name: "Games", href: "/dashboard/games", icon: Gamepad2 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#EAE6FE] shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center shadow-soft-sm group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-extrabold tracking-tight text-[#1E1B2E]">
              future
            </span>
            <span className="text-xl font-extrabold text-[#8B7FE8]">
              .ai
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 py-1 text-sm font-semibold transition-colors relative ${
                  isActive ? "text-[#8B7FE8]" : "text-[#6B6785] hover:text-[#1E1B2E]"
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-[#8B7FE8] rounded-t-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side Actions / Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Flame / Points Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F5] border border-[#FFC9DE] text-[#C0336A] font-bold text-sm shadow-sm cursor-pointer hover:bg-[#FFE5EF] transition-colors">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>1</span>
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-[#F3F0FE] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center font-bold text-white shadow-soft-sm">
                {getInitial(user?.name)}
              </div>
              <span className="text-sm font-semibold text-[#1E1B2E] hidden lg:block">
                Profile
              </span>
              <ChevronDown className="w-4 h-4 text-[#6B6785] hidden lg:block" />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl p-2 shadow-xl border border-[#EAE6FE] animate-in fade-in slide-in-from-top-2 z-50">
                <div className="px-3 py-2 mb-1 bg-[#F3F0FE] rounded-xl border border-[#EAE6FE]">
                  <p className="text-sm font-bold text-[#1E1B2E] truncate">
                    {user?.name || "Guest"}
                  </p>
                  <p className="text-xs text-[#6B6785] truncate">
                    {user?.email || "guest@example.com"}
                  </p>
                </div>
                
                <Link
                  href="/dashboard/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-[#1E1B2E] rounded-xl hover:bg-[#F3F0FE] transition-colors"
                >
                  <User className="w-4 h-4 text-[#8B7FE8]" />
                  <span>Profile Settings</span>
                </Link>

                <div className="border-t border-[#EAE6FE] pt-1 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                      router.push("/");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-red-600 rounded-xl hover:bg-red-50 transition-colors"
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
           <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#FFF0F5] border border-[#FFC9DE] text-[#C0336A] font-bold text-xs shadow-sm">
             <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
             <span>1</span>
           </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1E1B2E] hover:bg-[#D8D2FA]/30 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#EAE6FE] px-4 py-4 space-y-4 animate-in slide-in-from-top">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${
                  pathname === link.href
                    ? "bg-[#F3F0FE] text-[#8B7FE8]"
                    : "text-[#1E1B2E] hover:bg-gray-50"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#EAE6FE]">
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
                router.push("/");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-semibold rounded-xl hover:bg-red-50"
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
