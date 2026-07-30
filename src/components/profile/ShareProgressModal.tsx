"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Download,
  Copy,
  Check,
  Flame,
  Trophy,
  BookOpen,
  Zap,
  Coins,
  Calendar,
} from "lucide-react";
import { FaLinkedin, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

interface ShareProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    email?: string;
    currentStreak: number;
    longestStreak: number;
    lessonsCompleted: number;
    xpEarned: number;
    coinsEarned: number;
    achievementsEarned: number;
    currentLevel: number;
    memberSince: string;
  };
}

export default function ShareProgressModal({
  isOpen,
  onClose,
  userData,
}: ShareProgressModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "https://futurewithai.com";
  };

  const shareText = `🚀 Check out my learning journey on Future With AI! Level ${userData.currentLevel} Learner with ${userData.xpEarned} XP and a ${userData.currentStreak}-day streak 🔥`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 0.95 });
      const link = document.createElement("a");
      link.download = `future-with-ai-${userData.name.toLowerCase().replace(/\s+/g, "-")}-progress.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    } finally {
      setDownloading(false);
    }
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${getShareUrl()}`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-extrabold flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-500" />
            Share Learning Progress
          </DialogTitle>
          <DialogDescription>
            Download or share your AI learning achievements with your network
          </DialogDescription>
        </DialogHeader>

        {/* PROGRESS CARD TO DOWNLOAD / EXPORT */}
        <div className="py-2">
          <div
            ref={cardRef}
            className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white shadow-xl border border-indigo-500/30 space-y-6 relative overflow-hidden"
          >
            {/* Background Glow Overlay */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header / Brand */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center font-black text-sm text-white shadow-lg">
                  AI
                </div>
                <span className="font-black text-base tracking-tight text-indigo-200">
                  Future With AI
                </span>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Level {userData.currentLevel} Scholar
              </span>
            </div>

            {/* User Title */}
            <div>
              <h3 className="text-2xl font-black text-white">{userData.name}</h3>
              <p className="text-xs text-indigo-200/80 flex items-center gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Member since {userData.memberSince}
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-orange-400 font-bold mb-1">
                  <Flame className="w-3.5 h-3.5" /> Streak
                </div>
                <div className="text-lg font-black">{userData.currentStreak} Days</div>
                <div className="text-[10px] text-white/60">Max: {userData.longestStreak}</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-amber-400 font-bold mb-1">
                  <Zap className="w-3.5 h-3.5" /> Total XP
                </div>
                <div className="text-lg font-black">{userData.xpEarned.toLocaleString()}</div>
                <div className="text-[10px] text-white/60">Points</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-emerald-400 font-bold mb-1">
                  <BookOpen className="w-3.5 h-3.5" /> Lessons
                </div>
                <div className="text-lg font-black">{userData.lessonsCompleted}</div>
                <div className="text-[10px] text-white/60">Completed</div>
              </div>
            </div>

            {/* Additional Secondary Stats */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10 text-indigo-200/90 font-medium">
              <span className="flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-yellow-400" /> {userData.coinsEarned} Coins
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-purple-400" /> {userData.achievementsEarned} Achievements
              </span>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="space-y-4 pt-2">
          {/* Download & Copy buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleDownloadImage}
              disabled={downloading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md gap-2"
            >
              <Download className="w-4 h-4" />
              {downloading ? "Generating..." : "Download Image"}
            </Button>

            <Button
              variant="outline"
              onClick={handleCopyLink}
              className="border-[var(--border)] text-[var(--foreground)] font-bold text-xs gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Link Copied!" : "Copy Share Link"}
            </Button>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border)]">
            <span className="text-xs font-semibold text-[var(--foreground-secondary)]">Share to social:</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleShareLinkedIn}
                className="text-xs gap-1 border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2]/10"
              >
                <FaLinkedin className="w-3.5 h-3.5" /> LinkedIn
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleShareX}
                className="text-xs gap-1 border-gray-400/30 text-gray-800 dark:text-gray-200 hover:bg-gray-500/10"
              >
                <FaXTwitter className="w-3.5 h-3.5" /> X
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleShareWhatsApp}
                className="text-xs gap-1 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10"
              >
                <FaWhatsapp className="w-3.5 h-3.5" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
