"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  MapPin,
  HelpCircle,
  Target,
  Award,
  Zap,
  Bot,
  CreditCard,
  BarChart3,
  Bell,
  FolderArchive,
  FileSpreadsheet,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export type AdminTab =
  | "overview"
  | "users"
  | "courses"
  | "modules"
  | "roadmap"
  | "quizzes"
  | "assessments"
  | "certificates"
  | "gamification"
  | "ai"
  | "subscriptions"
  | "analytics"
  | "notifications"
  | "media"
  | "reports"
  | "security"
  | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
}

interface MenuItem {
  id: AdminTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users, badge: "52k", badgeColor: "bg-[#F5F2FF] text-[#8B7FE8]" },
  { id: "courses", label: "Courses", icon: BookOpen, badge: "9", badgeColor: "bg-[#E6F9F0] text-[#0E8566]" },
  { id: "modules", label: "Modules & Lessons", icon: Layers },
  { id: "roadmap", label: "Roadmap Builder", icon: MapPin, badge: "Canvas", badgeColor: "bg-[#FFC9DE] text-[#C0336A]" },
  { id: "quizzes", label: "Quiz Builder", icon: HelpCircle },
  { id: "assessments", label: "Assessments", icon: Target },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "gamification", label: "Gamification", icon: Zap, badge: "XP", badgeColor: "bg-[#FFF0F5] text-[#C0336A]" },
  { id: "ai", label: "AI Management", icon: Bot, badge: "AI", badgeColor: "bg-[#EBF8FF] text-[#2B6CB0]" },
  { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "media", label: "Media Library", icon: FolderArchive },
  { id: "reports", label: "Reports", icon: FileSpreadsheet },
  { id: "security", label: "Security & Roles", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ activeTab, onSelectTab }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-24 z-30 transition-all duration-300 ease-in-out shrink-0 select-none ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Floating Glass Sidebar Card */}
      <div className="w-full rounded-[28px] bg-white/90 backdrop-blur-xl border border-[#E8E3FF] p-3.5 shadow-soft relative flex flex-col justify-between min-h-[calc(100vh-140px)] overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#8B7FE8]/10 blur-2xl" />

        {/* TOP BRAND HEADER & TOGGLE BUTTON */}
        <div>
          <div className="flex items-center justify-between p-2 mb-3 pb-3 border-b border-[#E8E3FF]/70">
            <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center text-white shadow-soft-sm shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              {!collapsed && (
                <div className="flex items-baseline">
                  <span className="text-lg font-extrabold tracking-tight text-[#1E1B2E]">
                    future
                  </span>
                  <span className="text-lg font-extrabold text-[#8B7FE8]">
                    .admin
                  </span>
                </div>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="w-7 h-7 rounded-xl bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white transition-colors"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* MENU ITEMS LIST */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-260px)] scrollbar-none pr-0.5">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 group ${
                    isActive
                      ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                      : "text-[#6B6785] hover:text-[#1E1B2E] hover:bg-[#F6F2FF]"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? "text-white" : "text-[#8B7FE8]"
                      }`}
                    />
                    {!collapsed && (
                      <span className="truncate tracking-tight">{item.label}</span>
                    )}
                  </div>

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-[#E8E3FF] ${
                        isActive ? "bg-white/20 text-white border-white/30" : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM ADMIN USER FOOTER */}
        {!collapsed && (
          <div className="pt-3 border-t border-[#E8E3FF]/70 flex items-center gap-3 p-1">
            <div className="w-8 h-8 rounded-xl bg-[#F5F2FF] border border-[#E8E3FF] overflow-hidden shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shanmukha"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-extrabold text-[#1E1B2E] block truncate">
                Shanmukha Rani
              </span>
              <span className="text-[10px] font-bold text-[#8B7FE8] block truncate">
                Super Admin
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
