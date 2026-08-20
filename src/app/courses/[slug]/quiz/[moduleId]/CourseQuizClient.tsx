"use client";

import React, { useState, useEffect } from "react";
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
  Award
} from "lucide-react";
import {
  CourseModule,
  CourseQuiz,
  getCoursePathData,
  UserCourseProgressState
} from "@/data/coursePathData";
import { useAuth } from "@/lib/auth";

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
    return Math.round((correctCount / questions.length) * 100);
  };

  const score = calculateScore();
  const isPassed = score > 50;

  const handleSubmitQuiz = async () => {
    setSubmitted(true);
    if (score > 50) {
      const bonusXp = quiz.xpReward || 100;
      
      // Update backend via API
      try {
        const fetchHeaders: Record<string, string> = { "Content-Type": "application/json" };
        if (user?.email) fetchHeaders["X-User-Email"] = user.email;
        await fetch("/api/activity/complete", {
          method: "POST",
          headers: fetchHeaders,
          body: JSON.stringify({
            activityType: "QUIZ",
            activityId: moduleId,
            courseId: slug,
            lessonId: moduleId,
            xp: bonusXp,
            timeSpent: 10,
            completionPercentage: score,
          })
        });
        window.dispatchEvent(new CustomEvent("xp-updated", { detail: bonusXp }));
      } catch (err) {
        console.error("Failed to update quiz completion", err);
      }

      // Update local state for immediate UI feedback
      setProgressState((prev) => {
        const state = prev || {
          completedLessonIds: [],
          completedModuleIds: [],
          quizScores: {},
          totalXp: 0,
          currentStreakDays: 1,
          lastActiveDate: new Date().toISOString(),
        };
        
        const updatedModuleIds = state.completedModuleIds.includes(moduleId)
          ? state.completedModuleIds
          : [...state.completedModuleIds, moduleId];

        const newState: UserCourseProgressState = {
          ...state,
          completedModuleIds: updatedModuleIds,
          quizScores: { ...state.quizScores, [moduleId]: score },
          totalXp: state.totalXp + bonusXp,
          lastActiveDate: new Date().toISOString(),
        };

        return newState;
      });
    }
  };

  const handleRetry = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation bar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={`/courses/${slug}`}
            className="px-3.5 py-2 rounded-xl bg-[#F5F2FF] dark:bg-[#252136] border border-[#E8E3FF] dark:border-[#3A3554] text-xs font-extrabold text-[#8B7FE8] hover:bg-[#8B7FE8] hover:text-white transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Roadmap</span>
          </Link>

          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-extrabold bg-[#E6F9F0] text-[#0E8566] border border-[#9DD9C5]">
            <Zap className="w-3.5 h-3.5 fill-[#0E8566]" />
            +{quiz.xpReward || 100} XP Bonus
          </span>
        </div>

        {/* Quiz Full Page Card */}
        <div className="w-full rounded-3xl bg-white dark:bg-[#1A1726] border border-[#E8E3FF] dark:border-[#2A2640] p-6 sm:p-10 shadow-soft">
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-[#E8E3FF] dark:border-[#2A2640] pb-6 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#8B7FE8] text-white flex items-center justify-center font-extrabold shadow-md shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-[#8B7FE8] uppercase tracking-wider block">
                {targetModule.subtitle} Quiz
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1E1B2E] dark:text-white tracking-tight">
                {quiz.title}
              </h1>
              <p className="text-xs text-[#6B6785] dark:text-[#A9A4C0] font-medium mt-1">
                Pass score: Greater than 50% to complete module and unlock the next roadmap unit.
              </p>
            </div>
          </div>

          {/* QUESTIONS LIST */}
          <div className="space-y-8 mb-8">
            {submitted && !isPassed && (
              <div className="p-4 rounded-2xl bg-[#FFF0F5] border border-[#FFC9DE] text-[#C0336A] text-xs font-bold flex items-center justify-between">
                <span>⚠️ You scored {score}%. Please revisit the module lessons and retake the quiz to unlock the next module!</span>
                <button
                  type="button"
                  onClick={() => router.push(`/courses/${slug}`)}
                  className="px-3 py-1.5 rounded-xl bg-[#C0336A] text-white text-[11px] font-bold"
                >
                  Revisit Module
                </button>
              </div>
            )}

            {questions.map((q, qIdx) => {
              const userVal = userAnswers[qIdx] || "";
              const isQuestionCorrect = submitted && isAnswerCorrect(userVal, q.answer);

              return (
                <div
                  key={qIdx}
                  className={`p-6 rounded-2xl border transition-all ${
                    submitted
                      ? isQuestionCorrect
                        ? "bg-[#E6F9F0] dark:bg-[#0E2C20] border-[#9DD9C5]"
                        : "bg-[#FFF0F5] dark:bg-[#301622] border-[#FFC9DE]"
                      : "bg-[#F8F9FC] dark:bg-[#201D30] border-[#E8E3FF] dark:border-[#2A2640]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-base font-extrabold text-[#1E1B2E] dark:text-white leading-snug">
                      {qIdx + 1}. {q.question}
                    </h3>

                    {submitted && (
                      <span className="shrink-0">
                        {isQuestionCorrect ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#74D99F] text-[#0E8566] flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFC9DE] text-[#C0336A] flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Incorrect
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  {/* MCQ or True/False options */}
                  {(q.type === "mcq" || q.type === "true_false") && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userVal === opt;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={submitted}
                            onClick={() => handleSelectOption(qIdx, opt)}
                            className={`p-4 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#8B7FE8] text-white border-[#8B7FE8] shadow-sm"
                                : "bg-white dark:bg-[#1A1726] border-[#E8E3FF] dark:border-[#3A3554] text-[#1E1B2E] dark:text-white hover:border-[#8B7FE8]/50"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Matching Pairs */}
                  {q.type === "matching" && q.matchingPairs && (
                    <div className="space-y-2 mt-4 text-xs font-medium text-[#4A4660] dark:text-[#C5C0E0] bg-white dark:bg-[#1A1726] p-4 rounded-xl border border-[#E8E3FF] dark:border-[#2A2640]">
                      {q.matchingPairs.map((mp, mIdx) => (
                        <div key={mIdx} className="flex items-center justify-between">
                          <span className="font-bold text-[#1E1B2E] dark:text-white">{mp.item}</span>
                          <span>{mp.functionText}</span>
                        </div>
                      ))}
                      <input
                        type="text"
                        disabled={submitted}
                        placeholder="e.g. A-1, B-2, C-3"
                        value={userVal}
                        onChange={(e) => handleSelectOption(qIdx, e.target.value)}
                        className="w-full mt-3 p-3 rounded-xl border border-[#E8E3FF] dark:border-[#3A3554] bg-[#F8F9FC] dark:bg-[#201D30] text-xs font-bold text-[#1E1B2E] dark:text-white focus:outline-none focus:border-[#8B7FE8]"
                      />
                    </div>
                  )}

                  {/* Fill in blank or Order */}
                  {(q.type === "fill_blank" || q.type === "order") && (
                    <div className="mt-4">
                      {q.orderItems && (
                        <div className="mb-3 space-y-1.5 text-xs font-medium text-[#6B6785] bg-white dark:bg-[#1A1726] p-4 rounded-xl border border-[#E8E3FF] dark:border-[#2A2640]">
                          {q.orderItems.map((oi, iIdx) => (
                            <p key={iIdx}>{oi}</p>
                          ))}
                        </div>
                      )}
                      <input
                        type="text"
                        disabled={submitted}
                        placeholder={q.type === "fill_blank" ? "Type your answer here..." : "e.g. 2 -> 3 -> 1"}
                        value={userVal}
                        onChange={(e) => handleSelectOption(qIdx, e.target.value)}
                        className="w-full p-3.5 rounded-xl border border-[#E8E3FF] dark:border-[#3A3554] bg-white dark:bg-[#1A1726] text-xs font-bold text-[#1E1B2E] dark:text-white focus:outline-none focus:border-[#8B7FE8]"
                      />
                    </div>
                  )}

                  {/* Answer Explanation */}
                  {submitted && q.explanation && (
                    <p className="mt-4 text-xs text-[#6B6785] dark:text-[#A9A4C0] font-medium pt-3 border-t border-[#E8E3FF]/50">
                      💡 <strong>Explanation:</strong> {q.explanation} (Correct: <strong>{q.answer}</strong>)
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* QUIZ SUBMIT & RESULTS */}
          <div className="pt-6 border-t border-[#E8E3FF] dark:border-[#2A2640] flex items-center justify-between">
            {submitted ? (
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-xs font-bold text-[#6B6785] dark:text-[#A9A4C0] block">Final Score</span>
                  <span className={`text-2xl font-black ${isPassed ? "text-[#0E8566]" : "text-[#C0336A]"}`}>
                    {score}% {isPassed ? "Passed! 🎉" : "Try Again"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#F5F2FF] dark:bg-[#252136] text-[#8B7FE8] border border-[#E8E3FF] dark:border-[#3A3554] hover:opacity-80 transition-opacity flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Retry Quiz
                </button>
              </div>
            ) : (
              <span className="text-xs font-medium text-[#6B6785] dark:text-[#A9A4C0]">
                Select your answers and click submit to earn XP and progress.
              </span>
            )}

            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-6 py-3.5 rounded-2xl text-xs font-extrabold bg-[#8B7FE8] hover:bg-[#786BD6] text-white shadow-md transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                <span>Submit Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href={`/courses/${slug}`}
                className="px-6 py-3.5 rounded-2xl text-xs font-extrabold bg-[#74D99F] hover:bg-[#52C582] text-[#0E8566] shadow-md transition-all flex items-center gap-2"
              >
                <span>Back to Roadmap</span>
                <Check className="w-4 h-4 stroke-[3]" />
              </Link>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
