"use client";

import React, { useEffect, useRef } from "react";
import {
  Users,
  UserCheck,
  BookOpen,
  Layers,
  DollarSign,
  Crown,
  Award,
  Activity,
  Zap,
  Coins,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { ADMIN_KPIS, AdminKPICard } from "@/data/adminData";
import gsap from "gsap";

export default function AdminOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Stagger
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".admin-kpi-card",
        { opacity: 0, y: 25, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Icon Resolver
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="w-5 h-5" />;
      case "UserCheck":
        return <UserCheck className="w-5 h-5" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "DollarSign":
        return <DollarSign className="w-5 h-5" />;
      case "Crown":
        return <Crown className="w-5 h-5" />;
      case "Award":
        return <Award className="w-5 h-5" />;
      case "Activity":
        return <Activity className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "Coins":
        return <Coins className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div ref={containerRef} className="space-y-8 select-none">
      {/* SECTION TITLE & HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#F5F2FF] text-[#8B7FE8] border border-[#E8E3FF] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] tracking-tight">
            Admin <span className="text-[#8B7FE8]">Dashboard</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#6B6785] bg-white border border-[#E8E3FF] px-3.5 py-1.5 rounded-full shadow-soft-sm">
            Live Metrics • Updated Just Now
          </span>
        </div>
      </div>

      {/* 10 TOP KPI CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ADMIN_KPIS.map((kpi) => (
          <div
            key={kpi.id}
            className="admin-kpi-card relative rounded-3xl bg-white border border-[#E8E3FF] p-4 sm:p-5 shadow-soft hover:shadow-soft-md transition-all duration-300 group overflow-hidden"
          >
            {/* Ambient Lighting */}
            <div className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#8B7FE8]/10 blur-xl group-hover:scale-125 transition-transform" />

            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-soft-sm transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: `${kpi.color}15`,
                  borderColor: `${kpi.color}30`,
                  color: kpi.color,
                }}
              >
                {getIcon(kpi.iconName)}
              </div>

              <span className="text-[10px] font-extrabold text-[#0E8566] bg-[#E6F9F0] px-2 py-0.5 rounded-full border border-[#9DD9C5] flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                {kpi.change}
              </span>
            </div>

            <span className="text-xs font-bold text-[#6B6785] block mb-1">
              {kpi.title}
            </span>

            <h3 className="text-2xl font-black text-[#1E1B2E] tracking-tight group-hover:text-[#8B7FE8] transition-colors mb-3">
              {kpi.value}
            </h3>

            {/* Sparkline Graphic */}
            <div className="w-full h-8 flex items-end gap-1 pt-1">
              {kpi.sparkline.map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t-sm transition-all duration-300 group-hover:opacity-100"
                  style={{
                    height: `${val}%`,
                    backgroundColor: kpi.color,
                    opacity: 0.6 + (idx / kpi.sparkline.length) * 0.4,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ANALYTICS CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Growth & Engagement Chart */}
        <div className="lg:col-span-8 rounded-3xl bg-white border border-[#E8E3FF] p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-[#1E1B2E] tracking-tight">
                User Growth & Active Learners
              </h3>
              <p className="text-xs text-[#6B6785] font-medium">
                Monthly active learner retention vs. total platform registrations.
              </p>
            </div>
            <span className="text-xs font-bold text-[#8B7FE8] bg-[#F5F2FF] border border-[#E8E3FF] px-3 py-1 rounded-full">
              2026 YTD
            </span>
          </div>

          {/* Simulated Interactive SVG Area Chart */}
          <div className="w-full h-64 relative flex items-end justify-between gap-3 pt-8 pb-4">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="userChartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B7FE8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8B7FE8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 80 Q 25 50 50 40 T 100 15 L 100 100 L 0 100 Z"
                fill="url(#userChartGrad)"
              />
              <path
                d="M 0 80 Q 25 50 50 40 T 100 15"
                fill="none"
                stroke="#8B7FE8"
                strokeWidth="3"
              />
            </svg>

            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month, idx) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-2 z-10">
                <div
                  className="w-full bg-[#8B7FE8]/20 hover:bg-[#8B7FE8] rounded-t-xl transition-all duration-300 group relative"
                  style={{ height: `${40 + idx * 8}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1E1B2E] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md pointer-events-none whitespace-nowrap transition-opacity">
                    {(12 + idx * 3.5).toFixed(1)}k Users
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#6B6785]">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue & Economy Breakdown */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-[#E8E3FF] p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-[#1E1B2E] tracking-tight">
                Subscription Split
              </h3>
              <Crown className="w-5 h-5 text-[#FFD89B]" />
            </div>

            <p className="text-xs text-[#6B6785] font-medium mb-6">
              Distribution of Free, Pro ($19/mo), and Enterprise tier accounts.
            </p>

            {/* Circular Gauge / Donut Segment */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#1E1B2E] mb-1">
                  <span>Pro Plan ($19/mo)</span>
                  <span className="text-[#8B7FE8]">65% ($83.4K)</span>
                </div>
                <div className="w-full h-2.5 bg-[#F5F2FF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8B7FE8] rounded-full w-[65%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#1E1B2E] mb-1">
                  <span>Enterprise Teams</span>
                  <span className="text-[#74D99F]">25% ($32.1K)</span>
                </div>
                <div className="w-full h-2.5 bg-[#E6F9F0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#74D99F] rounded-full w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#1E1B2E] mb-1">
                  <span>Free Tier Learners</span>
                  <span className="text-[#6B6785]">10% (14.2k)</span>
                </div>
                <div className="w-full h-2.5 bg-[#F8F9FC] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6B6785] rounded-full w-[10%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E3FF] flex items-center justify-between text-xs font-bold text-[#6B6785]">
            <span>Monthly Recurring Revenue</span>
            <span className="text-[#1E1B2E] font-black text-sm">$48,250 / mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
