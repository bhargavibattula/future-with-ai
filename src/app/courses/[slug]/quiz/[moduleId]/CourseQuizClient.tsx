"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft, HelpCircle, CheckCircle2, XCircle, ArrowRight,
  RotateCcw, Sparkles, Zap, Check, Award, Code2, MousePointerClick,
  GitBranch, Layers, Bug, GripVertical, ChevronRight,
} from "lucide-react";
import {
  CourseQuizQuestion, getCoursePathData, UserCourseProgressState,
} from "@/data/coursePathData";
import { useAuth } from "@/lib/auth";
import confetti from "canvas-confetti";

/* ─── DND mini-component (inline, no external lib needed) ─── */
function DragDropRenderer({
  items,
  onOrderChange,
  disabled,
  correctOrder,
  submitted,
}: {
  items: { id: string; text: string }[];
  onOrderChange: (ids: string[]) => void;
  disabled: boolean;
  correctOrder?: string[];
  submitted: boolean;
}) {
  const [order, setOrder] = useState(items);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => {
    if (disabled) return;
    setDragIdx(idx);
  };
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (disabled || dragIdx === null || dragIdx === idx) return;
    const newOrder = [...order];
    const [moved] = newOrder.splice(dragIdx, 1);
    newOrder.splice(idx, 0, moved);
    setOrder(newOrder);
    setDragIdx(idx);
  };
  const handleDragEnd = () => {
    setDragIdx(null);
    onOrderChange(order.map((i) => i.id));
  };

  const isCorrectPosition = (id: string, idx: number) =>
    submitted && correctOrder ? correctOrder[idx] === id : null;

  return (
    <div className="space-y-2">
      {order.map((item, idx) => {
        const correct = isCorrectPosition(item.id, idx);
        return (
          <div
            key={item.id}
            draggable={!disabled}
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
              dragIdx === idx
                ? "border-[#8B7FE8] bg-[#F3F0FE] shadow-md scale-[1.02]"
                : submitted
                ? correct
                  ? "border-emerald-400 bg-emerald-50"
                  : correct === false
                  ? "border-red-300 bg-red-50"
                  : "border-[#EAE6FE] bg-white"
                : "border-[#EAE6FE] bg-white hover:border-[#8B7FE8] hover:bg-[#FCFBFF]"
            } ${!disabled ? "cursor-grab active:cursor-grabbing" : ""}`}
          >
            <GripVertical className="w-5 h-5 text-[#6B6785] shrink-0" />
            <div className="w-7 h-7 rounded-lg bg-[#F3F0FE] text-[#8B7FE8] flex items-center justify-center font-bold text-xs shrink-0">
              {idx + 1}
            </div>
            <span className="font-semibold text-sm text-[#1E1B2E]">{item.text}</span>
            {submitted && correct === true && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
            {submitted && correct === false && <XCircle className="w-4 h-4 text-red-400 ml-auto shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Sort Buckets Renderer ─── */
function SortingRenderer({
  buckets,
  submitted,
  onAnswer,
  disabled,
}: {
  buckets: { bucket: string; items: string[] }[];
  submitted: boolean;
  onAnswer: (val: string) => void;
  disabled: boolean;
}) {
  const allItems = buckets.flatMap((b) => b.items);
  const shuffled = useState(() => [...allItems].sort(() => Math.random() - 0.5))[0];
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  const bucketNames = buckets.map((b) => b.bucket);

  const handleAssign = (item: string, bucket: string) => {
    if (disabled) return;
    const next = { ...assignments, [item]: bucket };
    setAssignments(next);
    // Build answer string
    const grouped: Record<string, string[]> = {};
    for (const [it, bk] of Object.entries(next)) {
      if (!grouped[bk]) grouped[bk] = [];
      grouped[bk].push(it);
    }
    const ansStr = bucketNames
      .map((bn) => `${bn.split(" ")[0]}:${(grouped[bn] || []).join(",")}`)
      .join("|");
    onAnswer(ansStr);
  };

  const correctMap: Record<string, string> = {};
  buckets.forEach((b) => b.items.forEach((it) => (correctMap[it] = b.bucket)));

  return (
    <div className="space-y-3">
      <div className="flex gap-3 flex-wrap mb-3">
        {bucketNames.map((bn) => (
          <span key={bn} className="px-3 py-1 rounded-lg bg-[#F3F0FE] text-[#8B7FE8] text-xs font-bold">
            {bn}
          </span>
        ))}
      </div>
      {shuffled.map((item) => {
        const assigned = assignments[item];
        const isCorrect = submitted && assigned === correctMap[item];
        const isWrong = submitted && assigned && assigned !== correctMap[item];
        return (
          <div
            key={item}
            className={`flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-all ${
              submitted
                ? isCorrect
                  ? "border-emerald-400 bg-emerald-50"
                  : isWrong
                  ? "border-red-300 bg-red-50"
                  : "border-[#EAE6FE] bg-white"
                : "border-[#EAE6FE] bg-white"
            }`}
          >
            <span className="text-[#1E1B2E]">{item}</span>
            <div className="flex gap-2">
              {bucketNames.map((bn) => (
                <button
                  key={bn}
                  disabled={disabled}
                  onClick={() => handleAssign(item, bn)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    assigned === bn
                      ? "bg-[#8B7FE8] text-white"
                      : "bg-[#F3F0FE] text-[#6B6785] hover:bg-[#EAE6FE]"
                  }`}
                >
                  {bn.split("(")[0].trim()}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Type Badge ─── */
const TYPE_META: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  mcq: { label: "Multiple Choice", icon: <CheckCircle2 className="w-3.5 h-3.5" />, color: "text-blue-600 bg-blue-50" },
  multi_select: { label: "Multi Select", icon: <Layers className="w-3.5 h-3.5" />, color: "text-indigo-600 bg-indigo-50" },
  true_false: { label: "True / False", icon: <Check className="w-3.5 h-3.5" />, color: "text-teal-600 bg-teal-50" },
  fill_blank: { label: "Fill in the Blank", icon: <Code2 className="w-3.5 h-3.5" />, color: "text-amber-600 bg-amber-50" },
  matching: { label: "Matching Pairs", icon: <ArrowRight className="w-3.5 h-3.5" />, color: "text-pink-600 bg-pink-50" },
  drag_drop: { label: "Drag & Drop", icon: <GripVertical className="w-3.5 h-3.5" />, color: "text-violet-600 bg-violet-50" },
  code_trace: { label: "Code Tracing", icon: <Code2 className="w-3.5 h-3.5" />, color: "text-emerald-600 bg-emerald-50" },
  hotspot: { label: "Hotspot", icon: <MousePointerClick className="w-3.5 h-3.5" />, color: "text-orange-600 bg-orange-50" },
  scenario: { label: "Scenario", icon: <GitBranch className="w-3.5 h-3.5" />, color: "text-cyan-600 bg-cyan-50" },
  sorting: { label: "Sorting", icon: <Layers className="w-3.5 h-3.5" />, color: "text-purple-600 bg-purple-50" },
  syntax_fix: { label: "Syntax Fix", icon: <Bug className="w-3.5 h-3.5" />, color: "text-red-600 bg-red-50" },
  order: { label: "Ordering", icon: <ArrowRight className="w-3.5 h-3.5" />, color: "text-sky-600 bg-sky-50" },
};

/* ─── Main Component ─── */
interface CourseQuizClientProps {
  slug: string;
  moduleId: string;
}

export default function CourseQuizClient({ slug, moduleId }: CourseQuizClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [progressState, setProgressState] = useState<UserCourseProgressState | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [multiSelectAnswers, setMultiSelectAnswers] = useState<Record<number, Set<string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const headers: Record<string, string> = {};
        if (user?.email) headers["X-User-Email"] = user.email;
        const res = await fetch(`/api/progress/course/${slug}`, { cache: "no-store", headers });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setProgressState({
              completedLessonIds: data.enrollment.completedLessonIds || [],
              completedModuleIds: data.enrollment.completedModuleIds || [],
              quizScores: data.enrollment.quizScores || {},
              totalXp: data.userProgress.totalXP || 0,
              currentStreakDays: data.userProgress.currentStreak || 1,
              lastActiveDate: new Date().toISOString(),
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch progress", err);
      }
    };
    fetchProgress();
  }, [slug, user?.email]);

  const pathData = getCoursePathData(slug, progressState || undefined);
  const targetModule = pathData.modules.find((m) => m.id === moduleId);
  const quiz = targetModule?.quiz;

  if (!targetModule || !quiz) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 text-center px-4">
          <h2 className="text-2xl font-extrabold mb-4">Quiz Not Found</h2>
          <p className="text-[#6B6785] mb-6">The requested quiz could not be found for this module.</p>
          <Link href={`/courses/${slug}`} className="px-6 py-3 rounded-2xl bg-[#8B7FE8] text-white font-bold text-xs">
            Return to Course Path
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const questions = quiz.questions || [];

  /* ─── Answer Handlers ─── */
  const handleSelectOption = (qIdx: number, val: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: val }));
  };

  const handleMultiSelect = (qIdx: number, val: string) => {
    if (submitted) return;
    setMultiSelectAnswers((prev) => {
      const current = new Set(prev[qIdx] || []);
      if (current.has(val)) current.delete(val);
      else current.add(val);
      const next = { ...prev, [qIdx]: current };
      // Also update userAnswers for scoring
      const labels = Array.from(current).map((o) => o.charAt(0));
      setUserAnswers((p) => ({ ...p, [qIdx]: labels.join(",") }));
      return next;
    });
  };

  /* ─── Scoring ─── */
  const normalizeAns = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "").replace(/->/g, "").replace(/-/g, "").replace(/,/g, "");

  const isAnswerCorrect = (userAns: string, expected: string) => {
    const nu = normalizeAns(userAns);
    const ne = normalizeAns(expected);
    if (!nu) return false;
    return nu === ne || ne.includes(nu) || nu.includes(ne);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (isAnswerCorrect(userAnswers[idx] || "", q.answer)) correct++;
    });
    return correct;
  };

  const handleSubmitQuiz = async () => {
    setSubmitted(true);
    const score = calculateScore();
    const pct = Math.round((score / questions.length) * 100);
    if (pct >= 80) {
      try { confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } }); } catch {}
    }
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (user?.email) headers["X-User-Email"] = user.email;
      
      // 1. Record activity to update the contribution graph and streak
      await fetch("/api/activity/complete", {
        method: "POST", headers,
        body: JSON.stringify({
          activityType: "QUIZ",
          courseId: slug,
          lessonId: moduleId, // Store moduleId as lessonId for tracking which modules are complete
          xp: quiz.xpReward || 100,
          coins: Math.floor((quiz.xpReward || 100) / 2),
          timeSpent: 10, // approximate time spent
          completionPercentage: pct,
        }),
      });
      
      // 2. We can also optionally update the course progress if needed, but the activity completion already updates completedModuleIds if we pass lessonId.
    } catch (err) {
      console.error("Failed to save quiz score", err);
    }
  };

  const handleRetry = () => {
    setUserAnswers({});
    setMultiSelectAnswers({});
    setSubmitted(false);
  };

  const score = submitted ? calculateScore() : 0;
  const total = questions.length;
  const pct = submitted ? Math.round((score / total) * 100) : 0;

  const qIcon = (q: CourseQuizQuestion, idx: number) => {
    if (!submitted) return <HelpCircle className="w-5 h-5 text-[#8B7FE8]" />;
    return isAnswerCorrect(userAnswers[idx] || "", q.answer)
      ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      : <XCircle className="w-5 h-5 text-red-400" />;
  };

  /* ─── Render ─── */
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-10 px-4 w-full">
        {/* Header */}
        <Link href={`/courses/${slug}`} className="text-[#8B7FE8] hover:underline font-bold text-sm inline-flex items-center gap-1 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Course
        </Link>
        <h1 className="text-2xl md:text-3xl font-black mb-1">{quiz.title}</h1>
        <p className="text-[#6B6785] text-sm mb-8">
          {questions.length} Questions • {quiz.xpReward} XP Reward •{" "}
          <span className="text-[#8B7FE8] font-bold">{new Set(questions.map((q) => q.type)).size} Interactive Types</span>
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-[#EAE6FE] mb-8">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-[#8B7FE8] to-[#A78BFA] transition-all duration-500"
            style={{ width: `${(Object.keys(userAnswers).length / questions.length) * 100}%` }}
          />
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((q, idx) => {
            const meta = TYPE_META[q.type] || { label: q.type, icon: null, color: "text-gray-600 bg-gray-50" };
            return (
              <div key={q.id || idx} className="rounded-2xl border border-[#EAE6FE] bg-white/80 shadow-sm p-6 transition-all hover:shadow-md">
                {/* Question header */}
                <div className="flex items-start gap-3 mb-4">
                  {qIcon(q, idx)}
                  <div className="flex-1">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${meta.color}`}>
                      {meta.icon} {meta.label}
                    </span>
                    <p className="font-bold text-[#1E1B2E] mt-2">{q.question}</p>
                  </div>
                  <span className="text-xs text-[#6B6785] font-bold shrink-0">Q{idx + 1}/{total}</span>
                </div>

                {/* Code snippet (for code_trace & syntax_fix) */}
                {q.codeSnippet && (
                  <pre className="ml-8 mb-4 p-4 rounded-xl bg-[#1E1B2E] text-green-400 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                    {q.codeSnippet}
                  </pre>
                )}

                {/* ─── MCQ ─── */}
                {q.type === "mcq" && q.options && (
                  <div className="space-y-2 ml-8">
                    {q.options.map((opt, oi) => {
                      const sel = userAnswers[idx] === opt;
                      const correct = submitted && isAnswerCorrect(opt, q.answer);
                      const wrong = submitted && sel && !isAnswerCorrect(opt, q.answer);
                      return (
                        <button key={oi} onClick={() => handleSelectOption(idx, opt)} disabled={submitted}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                            correct ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                              : wrong ? "border-red-300 bg-red-50 text-red-600"
                              : sel ? "border-[#8B7FE8] bg-[#F3F0FE] text-[#1E1B2E]"
                              : "border-[#EAE6FE] hover:border-[#8B7FE8] hover:bg-[#FCFBFF] text-[#1E1B2E]"
                          }`}
                        >{opt}</button>
                      );
                    })}
                  </div>
                )}

                {/* ─── Multi Select ─── */}
                {q.type === "multi_select" && q.options && (
                  <div className="space-y-2 ml-8">
                    <p className="text-xs text-[#6B6785] font-semibold mb-2">✨ Select all that apply</p>
                    {q.options.map((opt, oi) => {
                      const checked = multiSelectAnswers[idx]?.has(opt) || false;
                      const correctLabels = q.answer.split(",");
                      const optLabel = opt.charAt(0);
                      const isCorrect = submitted && correctLabels.includes(optLabel);
                      const isWrong = submitted && checked && !correctLabels.includes(optLabel);
                      return (
                        <button key={oi} onClick={() => handleMultiSelect(idx, opt)} disabled={submitted}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all flex items-center gap-3 ${
                            submitted ? (isCorrect ? "border-emerald-400 bg-emerald-50" : isWrong ? "border-red-300 bg-red-50" : "border-[#EAE6FE]")
                              : checked ? "border-[#8B7FE8] bg-[#F3F0FE]"
                              : "border-[#EAE6FE] hover:border-[#8B7FE8]"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                            checked ? "border-[#8B7FE8] bg-[#8B7FE8]" : "border-[#D1CFE6]"
                          }`}>
                            {checked && <Check className="w-3 h-3 text-white" />}
                          </div>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ─── True / False ─── */}
                {q.type === "true_false" && q.options && (
                  <div className="flex gap-4 ml-8">
                    {q.options.map((opt) => {
                      const sel = userAnswers[idx] === opt;
                      const correct = submitted && isAnswerCorrect(opt, q.answer);
                      const wrong = submitted && sel && !isAnswerCorrect(opt, q.answer);
                      return (
                        <button key={opt} onClick={() => handleSelectOption(idx, opt)} disabled={submitted}
                          className={`flex-1 px-6 py-4 rounded-xl border text-sm font-bold transition-all ${
                            correct ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                              : wrong ? "border-red-300 bg-red-50 text-red-600"
                              : sel ? "border-[#8B7FE8] bg-[#F3F0FE] text-[#1E1B2E]"
                              : "border-[#EAE6FE] hover:border-[#8B7FE8] text-[#1E1B2E]"
                          }`}
                        >{opt}</button>
                      );
                    })}
                  </div>
                )}

                {/* ─── Fill Blank ─── */}
                {q.type === "fill_blank" && (
                  <div className="ml-8">
                    <input type="text" placeholder="Type your answer..." value={userAnswers[idx] || ""}
                      onChange={(e) => handleSelectOption(idx, e.target.value)} disabled={submitted}
                      className={`w-full max-w-md px-4 py-3 rounded-xl border text-sm font-semibold outline-none transition-all ${
                        submitted ? (isAnswerCorrect(userAnswers[idx] || "", q.answer) ? "border-emerald-400 bg-emerald-50" : "border-red-300 bg-red-50")
                          : "border-[#EAE6FE] focus:border-[#8B7FE8] focus:bg-[#FCFBFF]"
                      }`}
                    />
                    {submitted && !isAnswerCorrect(userAnswers[idx] || "", q.answer) && (
                      <p className="text-xs text-red-500 mt-1 font-semibold">Correct: <span className="text-emerald-600">{q.answer}</span></p>
                    )}
                  </div>
                )}

                {/* ─── Matching ─── */}
                {q.type === "matching" && q.matchingPairs && (
                  <div className="ml-8">
                    <div className="space-y-2 mb-3">
                      {q.matchingPairs.map((pair, pi) => (
                        <div key={pi} className="flex gap-4 text-sm p-3 rounded-lg bg-[#FCFBFF] border border-[#EAE6FE]">
                          <span className="font-bold text-[#1E1B2E] min-w-[180px]">{pair.item}</span>
                          <span className="text-[#6B6785]">{pair.functionText}</span>
                        </div>
                      ))}
                    </div>
                    <input type="text" placeholder="e.g. A-1, B-2, C-3" value={userAnswers[idx] || ""}
                      onChange={(e) => handleSelectOption(idx, e.target.value)} disabled={submitted}
                      className={`w-full max-w-md px-4 py-3 rounded-xl border text-sm font-semibold outline-none transition-all ${
                        submitted ? (isAnswerCorrect(userAnswers[idx] || "", q.answer) ? "border-emerald-400 bg-emerald-50" : "border-red-300 bg-red-50")
                          : "border-[#EAE6FE] focus:border-[#8B7FE8]"
                      }`}
                    />
                  </div>
                )}

                {/* ─── Drag & Drop ─── */}
                {q.type === "drag_drop" && q.dragItems && (
                  <div className="ml-8">
                    <DragDropRenderer
                      items={q.dragItems}
                      onOrderChange={(ids) => handleSelectOption(idx, ids.join(","))}
                      disabled={submitted}
                      correctOrder={q.correctOrder}
                      submitted={submitted}
                    />
                  </div>
                )}

                {/* ─── Code Trace (MCQ with code) ─── */}
                {q.type === "code_trace" && q.options && (
                  <div className="space-y-2 ml-8">
                    {q.options.map((opt, oi) => {
                      const sel = userAnswers[idx] === opt;
                      const correct = submitted && isAnswerCorrect(opt, q.answer);
                      const wrong = submitted && sel && !isAnswerCorrect(opt, q.answer);
                      return (
                        <button key={oi} onClick={() => handleSelectOption(idx, opt)} disabled={submitted}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-mono font-semibold transition-all ${
                            correct ? "border-emerald-400 bg-emerald-50" : wrong ? "border-red-300 bg-red-50"
                              : sel ? "border-[#8B7FE8] bg-[#F3F0FE]" : "border-[#EAE6FE] hover:border-[#8B7FE8]"
                          }`}
                        >{opt}</button>
                      );
                    })}
                  </div>
                )}

                {/* ─── Hotspot ─── */}
                {q.type === "hotspot" && q.hotspotOptions && (
                  <div className="grid grid-cols-2 gap-3 ml-8">
                    {q.hotspotOptions.map((hs) => {
                      const sel = userAnswers[idx] === hs.label;
                      const correct = submitted && hs.correct;
                      const wrong = submitted && sel && !hs.correct;
                      return (
                        <button key={hs.id} onClick={() => handleSelectOption(idx, hs.label)} disabled={submitted}
                          className={`relative p-5 rounded-xl border text-sm font-bold text-center transition-all ${
                            correct ? "border-emerald-400 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200"
                              : wrong ? "border-red-300 bg-red-50 text-red-600"
                              : sel ? "border-[#8B7FE8] bg-[#F3F0FE] text-[#1E1B2E] ring-2 ring-[#8B7FE8]/30"
                              : "border-[#EAE6FE] hover:border-[#8B7FE8] text-[#1E1B2E]"
                          }`}
                        >
                          <MousePointerClick className="w-5 h-5 mx-auto mb-2 opacity-40" />
                          {hs.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ─── Scenario Branching ─── */}
                {q.type === "scenario" && q.scenarioChoices && (
                  <div className="space-y-2 ml-8">
                    {q.scenarioChoices.map((sc) => {
                      const sel = userAnswers[idx] === sc.id;
                      const correct = submitted && sc.correct;
                      const wrong = submitted && sel && !sc.correct;
                      return (
                        <button key={sc.id} onClick={() => handleSelectOption(idx, sc.id)} disabled={submitted}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all flex items-center gap-3 ${
                            correct ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                              : wrong ? "border-red-300 bg-red-50 text-red-600"
                              : sel ? "border-[#8B7FE8] bg-[#F3F0FE]"
                              : "border-[#EAE6FE] hover:border-[#8B7FE8]"
                          }`}
                        >
                          <ChevronRight className={`w-4 h-4 shrink-0 ${sel ? "text-[#8B7FE8]" : "text-[#D1CFE6]"}`} />
                          {sc.text}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ─── Sorting ─── */}
                {q.type === "sorting" && q.sortBuckets && (
                  <div className="ml-8">
                    <SortingRenderer
                      buckets={q.sortBuckets}
                      submitted={submitted}
                      onAnswer={(val) => handleSelectOption(idx, val)}
                      disabled={submitted}
                    />
                  </div>
                )}

                {/* ─── Syntax Fix ─── */}
                {q.type === "syntax_fix" && (
                  <div className="ml-8">
                    <input type="text" placeholder="Type the corrected syntax..." value={userAnswers[idx] || ""}
                      onChange={(e) => handleSelectOption(idx, e.target.value)} disabled={submitted}
                      className={`w-full max-w-md px-4 py-3 rounded-xl border text-sm font-mono font-semibold outline-none transition-all ${
                        submitted ? (isAnswerCorrect(userAnswers[idx] || "", q.answer) ? "border-emerald-400 bg-emerald-50" : "border-red-300 bg-red-50")
                          : "border-[#EAE6FE] focus:border-[#8B7FE8]"
                      }`}
                    />
                    {submitted && !isAnswerCorrect(userAnswers[idx] || "", q.answer) && (
                      <p className="text-xs text-red-500 mt-1 font-semibold">Correct: <code className="text-emerald-600">{q.answer}</code></p>
                    )}
                  </div>
                )}

                {/* ─── Order (text input) ─── */}
                {q.type === "order" && q.orderItems && (
                  <div className="ml-8">
                    <div className="space-y-2 mb-3">
                      {q.orderItems.map((item, oi) => (
                        <div key={oi} className="px-4 py-2.5 rounded-xl bg-[#F3F0FE] text-sm font-semibold text-[#1E1B2E] border border-[#EAE6FE]">
                          {item}
                        </div>
                      ))}
                    </div>
                    <input type="text" placeholder="e.g. 2 -> 4 -> 3 -> 1" value={userAnswers[idx] || ""}
                      onChange={(e) => handleSelectOption(idx, e.target.value)} disabled={submitted}
                      className={`w-full max-w-md px-4 py-3 rounded-xl border text-sm font-semibold outline-none transition-all ${
                        submitted ? (isAnswerCorrect(userAnswers[idx] || "", q.answer) ? "border-emerald-400 bg-emerald-50" : "border-red-300 bg-red-50")
                          : "border-[#EAE6FE] focus:border-[#8B7FE8]"
                      }`}
                    />
                  </div>
                )}

                {/* Explanation */}
                {submitted && q.explanation && (
                  <div className="mt-4 ml-8 p-3 rounded-xl bg-[#F8F7FF] border border-[#EAE6FE]">
                    <p className="text-xs text-[#6B6785]">
                      <Sparkles className="inline w-3 h-3 mr-1 text-[#8B7FE8]" />
                      <span className="font-bold text-[#8B7FE8]">Explanation:</span> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit / Results */}
        <div className="mt-10 mb-8">
          {!submitted ? (
            <button onClick={handleSubmitQuiz}
              disabled={Object.keys(userAnswers).length < questions.length}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#1E1B2E] hover:bg-[#2D2A43] text-white font-black text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
            >
              <Zap className="w-4 h-4" /> Submit Quiz ({Object.keys(userAnswers).length}/{total} answered)
            </button>
          ) : (
            <div className="text-center p-8 rounded-2xl border border-[#EAE6FE] bg-white/80 shadow-sm max-w-md mx-auto">
              <Award className={`w-12 h-12 mx-auto mb-3 ${pct >= 80 ? "text-yellow-500" : "text-[#6B6785]"}`} />
              <h3 className="text-2xl font-black text-[#1E1B2E]">{score} / {total} Correct</h3>
              <p className="text-[#6B6785] text-sm mt-1">
                {pct}% — {pct >= 80 ? "Excellent work! 🎉" : "Keep practicing!"}
              </p>
              <div className="flex gap-3 justify-center mt-6">
                <button onClick={handleRetry}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#EAE6FE] text-[#1E1B2E] font-bold text-xs hover:bg-[#F3F0FE] transition-all"
                ><RotateCcw className="w-4 h-4" /> Retry</button>
                <Link href={`/courses/${slug}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#8B7FE8] hover:bg-[#786BD6] text-white font-bold text-xs transition-all"
                ><Check className="w-4 h-4" /> Continue</Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
