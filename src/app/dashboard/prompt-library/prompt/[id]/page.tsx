"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  Lock,
  Crown,
  Zap,
  Sparkles,
  Terminal,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface PromptDetailData {
  id: string;
  title: string;
  content: string;
  type: "FREE" | "PREMIUM" | "ONE_TIME_PREMIUM";
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export default function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const promptId = resolvedParams.id;

  const [prompt, setPrompt] = useState<PromptDetailData | null>(null);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TASK 15: Copy feedback state
  const [copied, setCopied] = useState<boolean>(false);
  const [copying, setCopying] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchPromptDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/prompts/${promptId}`);
      const data = await res.json();
      if (data.success) {
        setPrompt(data.prompt);
        setIsClaimed(Boolean(data.isClaimed));
      } else {
        setError(data.error || "Failed to load prompt details.");
      }
    } catch (err: any) {
      console.error("Error fetching prompt details:", err);
      setError("Network error loading prompt details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (promptId) {
      fetchPromptDetail();
    }
  }, [promptId]);

  // TASK 15: Handle Copy Prompt with Feedback
  const handleCopyPrompt = async () => {
    if (!prompt) return;

    // Prevent duplicate copy if already claimed one-time prompt
    if (prompt.type === "ONE_TIME_PREMIUM" && isClaimed) {
      return;
    }

    setCopying(true);
    try {
      // 1. Copy content to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(prompt.content);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = prompt.content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 3000);

      // 2. If prompt is ONE_TIME_PREMIUM, create claim record in database
      if (prompt.type === "ONE_TIME_PREMIUM" && !isClaimed) {
        const claimRes = await fetch(`/api/prompts/${prompt.id}/claim`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const claimData = await claimRes.json();

        if (claimData.success || claimData.isClaimed) {
          setIsClaimed(true);
          setToastMessage("Prompt copied successfully! It is now claimed and locked for your account.");
        } else {
          setToastMessage(claimData.error || "Prompt copied successfully to clipboard!");
        }
      } else {
        setToastMessage("Prompt copied successfully to clipboard!");
      }

      // Auto-clear toast feedback after 4 seconds
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err: any) {
      console.error("Error copying prompt:", err);
      setToastMessage("Failed to copy prompt text.");
    } finally {
      setCopying(false);
    }
  };

  const renderTypeBadge = (type: string) => {
    switch (type) {
      case "PREMIUM":
        return (
          <span className="bg-[#F5F2FF] text-[#8B7FE8] text-xs font-extrabold px-3 py-1 rounded-full border border-[#E8E3FF] inline-flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-[#8B7FE8]" /> PREMIUM PROMPT
          </span>
        );
      case "ONE_TIME_PREMIUM":
        return (
          <span className="bg-[#FFF0F5] text-[#C0336A] text-xs font-extrabold px-3 py-1 rounded-full border border-[#FFC9DE] inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#C0336A]" /> ONE TIME COPY
          </span>
        );
      default:
        return (
          <span className="bg-[#E6F9F0] text-[#0E8566] text-xs font-extrabold px-3 py-1 rounded-full border border-[#B7F2DA]">
            FREE PROMPT
          </span>
        );
    }
  };

  // TASK 14: LOADING SKELETON STATE
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 select-none font-sans">
        <div className="w-36 h-4 bg-[#F5F2FF] rounded-full animate-pulse" />
        <div className="bg-white rounded-3xl p-8 border border-[#E8E3FF] shadow-soft space-y-4 animate-pulse">
          <div className="w-28 h-6 rounded-full bg-[#F5F2FF]" />
          <div className="h-8 bg-[#F5F2FF] rounded-full w-2/3" />
        </div>
        <div className="bg-white rounded-3xl p-8 border border-[#E8E3FF] shadow-soft space-y-4 animate-pulse">
          <div className="h-4 bg-[#F5F2FF] rounded-full w-1/4" />
          <div className="h-40 bg-[#FCFBFF] rounded-2xl border border-[#E8E3FF]" />
          <div className="flex justify-end">
            <div className="h-10 bg-[#F5F2FF] rounded-2xl w-36" />
          </div>
        </div>
      </div>
    );
  }

  // TASK 13: POLISHED EMPTY / ERROR STATE
  if (error || !prompt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 select-none font-sans">
        <Link
          href="/dashboard/prompt-library"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8B7FE8] hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Prompt Library</span>
        </Link>
        <div className="bg-white rounded-3xl p-8 border border-red-200 text-center shadow-soft">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-base font-extrabold text-[#1E1B2E]">Prompt Not Found</p>
          <p className="text-xs text-[#6B6785] mt-1">{error || "The requested prompt could not be loaded."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 select-none font-sans">
      {/* BACK NAVIGATION */}
      <div>
        <Link
          href={`/dashboard/prompt-library/${prompt.categoryId}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8B7FE8] hover:text-[#786BD6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {prompt.category?.name || "Category"}</span>
        </Link>
      </div>

      {/* PROMPT READER HEADER CARD */}
      <div className="bg-[var(--card)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[var(--border)] shadow-soft relative overflow-hidden">
        <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#8B7FE8]/10 blur-2xl" />

        <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4">
          <span className="text-xs font-extrabold text-[#8B7FE8] bg-[#F5F2FF] dark:bg-[#1E1933] px-3 py-1 rounded-full border border-[#E8E3FF] dark:border-white/10">
            {prompt.category?.name || "Prompt"}
          </span>
          {renderTypeBadge(prompt.type)}
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
          {prompt.title}
        </h1>

        {/* LOCKED BANNER IF CLAIMED ONE-TIME PROMPT */}
        {prompt.type === "ONE_TIME_PREMIUM" && isClaimed && (
          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-xs font-bold flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Already Claimed — You have claimed this one-time prompt. Copying is now locked for your account.
            </span>
          </div>
        )}

        {/* TASK 15: SUCCESS TOAST MESSAGE */}
        {toastMessage && (
          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between gap-2.5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 dark:text-emerald-300 hover:opacity-80 text-xs font-extrabold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* PROMPT CONTENT READER CONTAINER */}
      <div className="bg-[var(--card)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[var(--border)] shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[var(--foreground)]">
            <Terminal className="w-4 h-4 text-[#8B7FE8]" />
            <span>Prompt Content Template</span>
          </div>

          <span className="text-[11px] font-semibold text-[var(--foreground-secondary)]">
            Ready to copy
          </span>
        </div>

        {/* PROMPT TEXT BOX */}
        <div className="bg-[var(--background)] rounded-2xl p-4 sm:p-6 border border-[var(--border)] relative">
          <pre className="text-xs sm:text-sm font-mono text-[var(--foreground)] whitespace-pre-wrap leading-relaxed select-text overflow-x-auto">
            {prompt.content}
          </pre>
        </div>

        {/* COPY ACTION BAR */}
        <div className="pt-2 flex items-center justify-end">
          {prompt.type === "ONE_TIME_PREMIUM" && isClaimed ? (
            <button
              type="button"
              disabled
              className="w-full sm:w-auto justify-center px-6 py-3 rounded-2xl text-xs font-extrabold text-amber-800 bg-amber-100 border border-amber-300 opacity-80 cursor-not-allowed flex items-center gap-2 min-h-[44px]"
            >
              <Lock className="w-4 h-4" />
              <span>Already Claimed 🔒</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCopyPrompt}
              disabled={copying}
              className="w-full sm:w-auto justify-center px-6 py-3 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm hover:shadow-soft-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{copying ? "Copying..." : "Copy Prompt"}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
