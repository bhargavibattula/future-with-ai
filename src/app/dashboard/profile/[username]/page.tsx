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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1E1B2E] tracking-tight mb-2">
            Profile Overview
          </h1>
          <p className="text-sm text-[#6B6785]">
            View your activity, earned badges, and account details.
          </p>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#EAE6FE] text-[#1E1B2E] font-bold text-sm shadow-sm hover:border-[#8B7FE8] hover:bg-[#F3F0FE] hover:text-[#8B7FE8] transition-all active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          {copied ? "Link Copied!" : "Share Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* User Info Card */}
        <div className="bg-white rounded-3xl p-8 border border-[#EAE6FE] shadow-sm flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center text-4xl font-black text-white shadow-lg shadow-[#8B7FE8]/20">
              {getInitial(displayUsername)}
            </div>
            <div className="absolute bottom-1 right-1 w-7 h-7 bg-emerald-400 rounded-full border-4 border-white" title="Online" />
          </div>
          
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] mb-1">
            {displayUsername || "Guest Learner"}
          </h2>
          <p className="text-[#6B6785] text-sm font-medium mb-6 flex items-center gap-1.5">
            <Mail className="w-4 h-4" />
            {/* Try to show the logged-in email if names match, else mock email */}
            {user?.name?.toLowerCase().replace(/\s+/g, '-') === rawUsername.toLowerCase() 
              ? user.email 
              : `${rawUsername.toLowerCase().replace(/\s+/g, '')}@future.ai`}
          </p>
          
          <div className="w-full pt-6 border-t border-[#EAE6FE] flex justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F3F0FE] text-[#8B7FE8] font-bold text-sm hover:bg-[#EAE6FE] transition-colors">
              <User className="w-4 h-4" />
              Edit Profile
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#EAE6FE] text-[#6B6785] font-bold text-sm hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Activity Summary Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#8B7FE8] to-[#6052CC] rounded-3xl p-8 text-white shadow-lg shadow-[#8B7FE8]/20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div>
              <h3 className="text-white/80 font-bold text-sm mb-1 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Current Streak
              </h3>
              <p className="text-5xl font-black mb-2">5 <span className="text-2xl font-bold text-white/80">days</span></p>
              <p className="text-sm text-white/90 font-medium">Keep it up! You're in the top 15% this week.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 border border-[#EAE6FE] shadow-sm flex flex-col justify-between">
             <h3 className="text-[#6B6785] font-bold text-sm mb-1 uppercase tracking-wider">
               Total Points
             </h3>
             <p className="text-5xl font-black text-[#1E1B2E] mb-2">1,240</p>
             <p className="text-sm text-[#8B7FE8] font-bold flex items-center gap-1">
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
