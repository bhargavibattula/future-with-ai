"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  Check,
  Award,
  Loader2,
} from "lucide-react";
import {
  CourseModule,
  CourseQuiz,
  getCoursePathData,
  UserCourseProgressState,
} from "@/data/coursePathData";
import { useAuth } from "@/lib/auth";
import confetti from "canvas-confetti";

interface CourseQuizClientProps {
  slug: string;
  moduleId: string;
}

export default function CourseQuizClient({ slug, moduleId }: CourseQuizClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [progressState, setProgressState] = useState<UserCourseProgressState | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

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
        console.error("Failed to fetch progress from DB", err);
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
          <Link
            href={`/courses/${slug}`}
            className="px-6 py-3 rounded-2xl bg-[#8B7FE8] text-white font-bold text-xs"
          >
            Return to Course Path
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const questions = quiz.questions || [];

  const handleSelectOption = (qIdx: number, val: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: val }));
  };

  const normalizeAns = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, "") // remove spaces
      .replace(/->/g, "")  // remove arrows
      .replace(/-/g, "")   // remove hyphens
      .replace(/,/g, "");  // remove commas
  };

  const isAnswerCorrect = (userAnsStr: string, expectedAnsStr: string) => {
    const normUser = normalizeAns(userAnsStr);
    const normExp = normalizeAns(expectedAnsStr);
    if (!normUser) return false;
    return (
      normUser === normExp ||
      normExp.includes(normUser) ||
      normUser.includes(normExp)
    );
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (isAnswerCorrect(userAnswers[idx] || "", q.answer)) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handleSubmitQuiz = async () => {
    setSubmitted(true);
    const score = calculateScore();
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);

    if (percentage >= 80) {
      try {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      } catch {}
    }

    // Record quiz score to backend
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (user?.email) headers["X-User-Email"] = user.email;
      await fetch(`/api/progress/course/${slug}`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          action: "quizComplete",
          moduleId,
          quizId: quiz.id,
          score: percentage,
        }),
      });
    } catch (err) {
      console.error("Failed to save quiz score", err);
    }
  };

  const handleRetry = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = submitted ? calculateScore() : 0;
  const total = questions.length;
  const percentage = submitted ? Math.round((score / total) * 100) : 0;

  const getQuestionIcon = (q: any, idx: number) => {
    if (!submitted) return <HelpCircle className="w-5 h-5 text-[#8B7FE8]" />;
    return isAnswerCorrect(userAnswers[idx] || "", q.answer)
      ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      : <XCircle className="w-5 h-5 text-red-400" />;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-10 px-4 w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Link href={`/courses/${slug}`} className="text-[#8B7FE8] hover:underline font-bold text-sm">
            <ArrowLeft className="inline w-4 h-4 mr-1" /> Back to Course
          </Link>
        </div>
        <h1 className="text-2xl md:text-3xl font-black mb-1">{quiz.title}</h1>
        <p className="text-[#6B6785] text-sm mb-8">
          {questions.length} Questions • {quiz.xpReward} XP Reward
        </p>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-2xl border border-[#EAE6FE] bg-white/80 shadow-sm p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                {getQuestionIcon(q, idx)}
                <div className="flex-1">
                  <span className="text-xs font-bold text-[#8B7FE8] uppercase tracking-wider">
                    {q.type === "mcq"
                      ? "Multiple Choice"
                      : q.type === "true_false"
                      ? "True / False"
                      : q.type === "fill_blank"
                      ? "Fill in the Blank"
                      : q.type === "matching"
                      ? "Matching"
                      : q.type === "order"
                      ? "Ordering"
                      : q.type}
                  </span>
                  <p className="font-bold text-[#1E1B2E] mt-1">{q.question}</p>
                </div>
              </div>

              {/* MCQ / True-False */}
              {(q.type === "mcq" || q.type === "true_false") && q.options && (
                <div className="space-y-2 ml-8">
                  {q.options.map((opt: string, optIdx: number) => {
                    const isSelected = userAnswers[idx] === opt;
                    const isCorrect = submitted && isAnswerCorrect(opt, q.answer);
                    const isWrong = submitted && isSelected && !isAnswerCorrect(opt, q.answer);
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(idx, opt)}
                        disabled={submitted}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                          isCorrect
                            ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                            : isWrong
                            ? "border-red-300 bg-red-50 text-red-600"
                            : isSelected
                            ? "border-[#8B7FE8] bg-[#F3F0FE] text-[#1E1B2E]"
                            : "border-[#EAE6FE] hover:border-[#8B7FE8] hover:bg-[#FCFBFF] text-[#1E1B2E]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Fill Blank */}
              {q.type === "fill_blank" && (
                <div className="ml-8">
                  <input
                    type="text"
                    placeholder="Type your answer..."
                    value={userAnswers[idx] || ""}
                    onChange={(e) => handleSelectOption(idx, e.target.value)}
                    disabled={submitted}
                    className={`w-full max-w-md px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                      submitted
                        ? isAnswerCorrect(userAnswers[idx] || "", q.answer)
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-red-300 bg-red-50"
                        : "border-[#EAE6FE] focus:border-[#8B7FE8] focus:bg-[#FCFBFF]"
                    }`}
                  />
                  {submitted && !isAnswerCorrect(userAnswers[idx] || "", q.answer) && (
                    <p className="text-xs text-red-500 mt-1 font-semibold">
                      Correct answer: <span className="text-emerald-600">{q.answer}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Matching */}
              {q.type === "matching" && q.matchingPairs && (
                <div className="ml-8">
                  <div className="space-y-2 mb-3">
                    {q.matchingPairs.map((pair: any, pIdx: number) => (
                      <div key={pIdx} className="flex gap-4 text-sm">
                        <span className="font-bold text-[#1E1B2E] min-w-[180px]">{pair.item}</span>
                        <span className="text-[#6B6785]">{pair.functionText}</span>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. A-1, B-2, C-3"
                    value={userAnswers[idx] || ""}
                    onChange={(e) => handleSelectOption(idx, e.target.value)}
                    disabled={submitted}
                    className={`w-full max-w-md px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                      submitted
                        ? isAnswerCorrect(userAnswers[idx] || "", q.answer)
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-red-300 bg-red-50"
                        : "border-[#EAE6FE] focus:border-[#8B7FE8] focus:bg-[#FCFBFF]"
                    }`}
                  />
                </div>
              )}

              {/* Order */}
              {q.type === "order" && q.orderItems && (
                <div className="ml-8">
                  <div className="space-y-2 mb-3">
                    {q.orderItems.map((item: string, oIdx: number) => (
                      <div key={oIdx} className="px-4 py-2 rounded-lg bg-[#F3F0FE] text-sm font-semibold text-[#1E1B2E]">
                        {item}
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. 2 -> 3 -> 1"
                    value={userAnswers[idx] || ""}
                    onChange={(e) => handleSelectOption(idx, e.target.value)}
                    disabled={submitted}
                    className={`w-full max-w-md px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                      submitted
                        ? isAnswerCorrect(userAnswers[idx] || "", q.answer)
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-red-300 bg-red-50"
                        : "border-[#EAE6FE] focus:border-[#8B7FE8] focus:bg-[#FCFBFF]"
                    }`}
                  />
                </div>
              )}

              {/* Explanation after submission */}
              {submitted && q.explanation && (
                <div className="mt-4 ml-8 p-3 rounded-xl bg-[#F8F7FF] border border-[#EAE6FE]">
                  <p className="text-xs text-[#6B6785]">
                    <Sparkles className="inline w-3 h-3 mr-1 text-[#8B7FE8]" />
                    <span className="font-bold text-[#8B7FE8]">Explanation:</span> {q.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit / Results */}
        <div className="mt-10">
          {!submitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(userAnswers).length < questions.length}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#1E1B2E] hover:bg-[#2D2A43] text-white font-black text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
            >
              <Zap className="w-4 h-4" />
              Submit Quiz
            </button>
          ) : (
            <div className="text-center p-8 rounded-2xl border border-[#EAE6FE] bg-white/80 shadow-sm max-w-md mx-auto">
              <Award className={`w-12 h-12 mx-auto mb-3 ${percentage >= 80 ? "text-yellow-500" : "text-[#6B6785]"}`} />
              <h3 className="text-2xl font-black text-[#1E1B2E]">
                {score} / {total} Correct
              </h3>
              <p className="text-[#6B6785] text-sm mt-1">
                {percentage}% — {percentage >= 80 ? "Excellent work! 🎉" : "Keep practicing!"}
              </p>
              <div className="flex gap-3 justify-center mt-6">
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#EAE6FE] text-[#1E1B2E] font-bold text-xs hover:bg-[#F3F0FE] transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Retry
                </button>
                <Link
                  href={`/courses/${slug}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#8B7FE8] hover:bg-[#786BD6] text-white font-bold text-xs transition-all"
                >
                  <Check className="w-4 h-4" /> Continue
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
