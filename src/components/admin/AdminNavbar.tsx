"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Bell,
  Sparkles,
  User,
  BookOpen,
  HelpCircle,
  Award,
  Shield,
  LogOut,
  ChevronDown,
  X,
} from "lucide-react";
import { AdminTab } from "./AdminSidebar";
import DarkModeToggle from "@/components/DarkModeToggle";

interface AdminNavbarProps {
  onSelectTab: (tab: AdminTab) => void;
  onOpenQuickCreate: (type: string) => void;
}

export default function AdminNavbar({ onSelectTab, onOpenQuickCreate }: AdminNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const quickCreateRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (quickCreateRef.current && !quickCreateRef.current.contains(e.target as Node)) {
        setQuickCreateOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-xl border-b border-[#E8E3FF] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* GLOBAL SEARCH INPUT */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7FE8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Global Search (Users, Courses, Lessons, Certificates)..."
            className="w-full pl-10 pr-12 py-2 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] focus:border-[#8B7FE8] focus:ring-4 focus:ring-[#8B7FE8]/15 text-[#1E1B2E] placeholder-[#6B6785] text-xs font-semibold outline-none transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-extrabold bg-white border border-[#E8E3FF] text-[#6B6785] rounded-md shadow-soft-sm">
            ⌘K
          </kbd>
        </div>

        {/* RIGHT NAVBAR ACTIONS */}
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          {/* QUICK CREATE DROPDOWN BUTTON */}
          <div ref={quickCreateRef} className="relative">
            <button
              type="button"
              onClick={() => setQuickCreateOpen(!quickCreateOpen)}
              className="px-4 py-2 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Create</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {quickCreateOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-[#E8E3FF] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    setQuickCreateOpen(false);
                    onOpenQuickCreate("course");
                    onSelectTab("courses");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#1E1B2E] hover:bg-[#F5F2FF] hover:text-[#8B7FE8] rounded-xl transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#8B7FE8]" />
                  <span>+ New Course</span>
                </button>
                <button
                  onClick={() => {
                    setQuickCreateOpen(false);
                    onOpenQuickCreate("user");
                    onSelectTab("users");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#1E1B2E] hover:bg-[#F5F2FF] hover:text-[#8B7FE8] rounded-xl transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#74D99F]" />
                  <span>+ New User</span>
                </button>
                <button
                  onClick={() => {
                    setQuickCreateOpen(false);
                    onOpenQuickCreate("quiz");
                    onSelectTab("quizzes");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#1E1B2E] hover:bg-[#F5F2FF] hover:text-[#8B7FE8] rounded-xl transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#8FD8FF]" />
                  <span>+ New Quiz</span>
                </button>
                <button
                  onClick={() => {
                    setQuickCreateOpen(false);
                    onOpenQuickCreate("certificate");
                    onSelectTab("certificates");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#1E1B2E] hover:bg-[#F5F2FF] hover:text-[#8B7FE8] rounded-xl transition-colors"
                >
                  <Award className="w-3.5 h-3.5 text-[#FF9EB3]" />
                  <span>+ New Certificate</span>
                </button>
              </div>
            )}
          </div>

          {/* NOTIFICATION BELL BUTTON */}
          <button
            type="button"
            onClick={() => onSelectTab("notifications")}
            className="relative w-9 h-9 rounded-2xl bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF9EB3] border-2 border-white text-[9px] font-extrabold text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* ADMIN PROFILE DROPDOWN */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-2xl hover:bg-[#F5F2FF] transition-colors cursor-pointer"
            >
              <div className="w-9 h-9 rounded-2xl bg-[#F5F2FF] border border-[#E8E3FF] overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shanmukha"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B6785]" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-[#E8E3FF] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 border-b border-[#E8E3FF] mb-1">
                  <span className="text-xs font-extrabold text-[#1E1B2E] block">
                    Shanmukha Rani
                  </span>
                  <span className="text-[10px] font-bold text-[#8B7FE8] block">
                    Super Admin • shanm@future.ai
                  </span>
                </div>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onSelectTab("settings");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#1E1B2E] hover:bg-[#F5F2FF] hover:text-[#8B7FE8] rounded-xl transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#8B7FE8]" />
                  <span>Admin Settings</span>
                </button>
                <Link
                  href="/"
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#FF9EB3] hover:bg-[#FFF0F5] rounded-xl transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit Admin</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
