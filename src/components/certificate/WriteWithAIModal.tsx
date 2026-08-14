"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Copy, Check, Share2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 1.47 1.47 1.47 1.47 0 0 0-1.47-1.47Z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z" />
    </svg>
  );
}

interface WriteWithAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  courseName: string;
  verificationUrl: string;
}

type StyleTab = "professional" | "motivational" | "casual";

export default function WriteWithAIModal({
  isOpen,
  onClose,
  studentName,
  courseName,
  verificationUrl,
}: WriteWithAIModalProps) {
  const [activeTab, setActiveTab] = useState<StyleTab>("professional");
  const [loading, setLoading] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const fetchCaption = async (style: StyleTab) => {
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch("/api/ai/generate-certificate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          courseName,
          certificateUrl: verificationUrl,
          style,
        }),
      });
      const data = await res.json();
      if (data.success && data.generatedPost) {
        setCaption(data.generatedPost);
      } else {
        setCaption("Failed to generate caption. Please try again.");
      }
    } catch (err) {
      console.error("Failed to generate AI caption:", err);
      setCaption("Error connecting to Groq AI service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCaption(activeTab);
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!caption) return;
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      verificationUrl
    )}`;
    window.open(url, "_blank");
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      verificationUrl
    )}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0A0A0A]/75 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-xl rounded-3xl bg-[#171717] border border-[#2A2540] text-white shadow-2xl p-6 sm:p-8 overflow-hidden font-sans"
        >
          {/* Top Glow Accent */}
          <div className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#8B7FE8]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-[#5CBFA0]/20 blur-3xl" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#2A2540] mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#8B7FE8]/20 border border-[#8B7FE8]/40 flex items-center justify-center text-[#8B7FE8]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  Write with AI
                  <span className="text-[10px] font-bold text-[#5CBFA0] bg-[#0E2018] px-2 py-0.5 rounded-full border border-[#5CBFA0]/30">
                    Groq Llama 3
                  </span>
                </h3>
                <p className="text-xs text-[#808080]">
                  Generate viral captions for your certificate achievement.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#2A2540]/60 border border-[#3A3650] flex items-center justify-center text-[#B3B3B3] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Style Tabs (Professional, Motivational, Casual) */}
          <div className="grid grid-cols-3 gap-2 bg-[#0A0A0A] p-1.5 rounded-2xl border border-[#2A2540] mb-6">
            {(["professional", "motivational", "casual"] as StyleTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-[#8B7FE8] text-white shadow-md"
                    : "text-[#808080] hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Generated Caption Box */}
          <div className="relative bg-[#0A0A0A] border border-[#2A2540] rounded-2xl p-5 mb-6 min-h-[140px] flex items-center justify-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <RefreshCw className="w-6 h-6 text-[#8B7FE8] animate-spin mb-2" />
                <span className="text-xs font-bold text-[#808080]">
                  Generating AI caption using Groq...
                </span>
              </div>
            ) : (
              <p className="text-sm text-[#E0E0E0] font-medium leading-relaxed whitespace-pre-wrap w-full">
                {caption}
              </p>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => fetchCaption(activeTab)}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2A2540] border border-[#3A3650] text-xs font-bold text-white hover:bg-[#3A3650] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Regenerate
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={loading || !caption}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#8B7FE8] text-white text-xs font-bold hover:bg-[#786BD6] transition-colors disabled:opacity-50"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Caption"}
              </button>

              <button
                onClick={handleShareLinkedIn}
                className="p-2.5 rounded-xl bg-[#0077B5]/20 border border-[#0077B5]/40 text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-colors"
                title="Share on LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </button>

              <button
                onClick={handleShareFacebook}
                className="p-2.5 rounded-xl bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
                title="Share on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
