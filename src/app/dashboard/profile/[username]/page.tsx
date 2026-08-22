"use client";

import { useAuth } from "@/lib/auth";
import ActivityHeatmap from "@/components/profile/ActivityHeatmap";
import BadgeShowcase from "@/components/profile/BadgeShowcase";
import ProfileCertificates from "@/components/profile/ProfileCertificates";
import { User, Mail, Calendar, Settings, Share2, Copy, Check } from "lucide-react";
import { useState, use } from "react";

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const resolvedParams = use(params);
  
  // Format the username from the URL (e.g. "bhargavi" -> "Bhargavi")
  const rawUsername = decodeURIComponent(resolvedParams.username || "");
  const displayUsername = rawUsername
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const getInitial = (name?: string) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-16">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mb-1.5">
            Profile Overview
          </h1>
          <p className="text-xs sm:text-sm text-[var(--foreground-secondary)]">
            View your activity, earned badges, and account details.
          </p>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-bold text-xs sm:text-sm shadow-sm hover:border-[#8B7FE8] hover:bg-[#F3F0FE] dark:hover:bg-[#1E1933] hover:text-[#8B7FE8] transition-all active:scale-95 min-h-[40px] w-full sm:w-auto"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          {copied ? "Link Copied!" : "Share Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
        {/* User Info Card */}
        <div className="bg-[var(--card)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[var(--border)] shadow-sm flex flex-col items-center text-center">
          <div className="relative mb-4 sm:mb-6">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center text-2xl sm:text-4xl font-black text-white shadow-lg shadow-[#8B7FE8]/20">
              {getInitial(displayUsername)}
            </div>
            <div className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 w-5 h-5 sm:w-7 sm:h-7 bg-emerald-400 rounded-full border-3 sm:border-4 border-white dark:border-[#13111C]" title="Online" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)] mb-1">
            {displayUsername || "Guest Learner"}
          </h2>
          <p className="text-[var(--foreground-secondary)] text-xs sm:text-sm font-medium mb-5 sm:mb-6 flex items-center gap-1.5 truncate max-w-full">
            <Mail className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {user?.name?.toLowerCase().replace(/\s+/g, '-') === rawUsername.toLowerCase() 
                ? user.email 
                : `${rawUsername.toLowerCase().replace(/\s+/g, '')}@future.ai`}
            </span>
          </p>
          
          <div className="w-full pt-4 sm:pt-6 border-t border-[var(--border)] flex justify-center gap-2.5 sm:gap-4">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 rounded-xl bg-[#F3F0FE] dark:bg-[#1E1933] text-[#8B7FE8] font-bold text-xs sm:text-sm hover:bg-[#EAE6FE] transition-colors min-h-[38px]">
              <User className="w-4 h-4" />
              Edit Profile
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-secondary)] font-bold text-xs sm:text-sm hover:bg-[var(--elevated)] transition-colors min-h-[38px]">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Activity Summary Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#8B7FE8] to-[#6052CC] rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg shadow-[#8B7FE8]/20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div>
              <h3 className="text-white/80 font-bold text-xs sm:text-sm mb-1 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Current Streak
              </h3>
              <p className="text-4xl sm:text-5xl font-black mb-2">5 <span className="text-xl sm:text-2xl font-bold text-white/80">days</span></p>
              <p className="text-xs sm:text-sm text-white/90 font-medium">Keep it up! You&apos;re in the top 15% this week.</p>
            </div>
          </div>
          
          <div className="bg-[var(--card)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[var(--border)] shadow-sm flex flex-col justify-between">
             <h3 className="text-[var(--foreground-secondary)] font-bold text-xs sm:text-sm mb-1 uppercase tracking-wider">
               Total Points
             </h3>
             <p className="text-4xl sm:text-5xl font-black text-[var(--foreground)] mb-2">1,240</p>
             <p className="text-xs sm:text-sm text-[#8B7FE8] font-bold flex items-center gap-1">
               <span className="w-2 h-2 rounded-full bg-emerald-400" />
               +200 points this week
             </p>
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <ActivityHeatmap />
      
      {/* Certificates Section */}
      <ProfileCertificates username={displayUsername} />

      {/* Badges Section */}
      <BadgeShowcase />
    </div>
  );
}
