"use client";

import React, { useState } from "react";
import {
  X,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  Award,
  Check
} from "lucide-react";
import { CourseModule, CourseQuiz, CourseQuizQuestion } from "@/data/coursePathData";
import { motion, AnimatePresence } from "framer-motion";

interface CourseQuizModalProps {
  module: CourseModule | null;
  quiz: CourseQuiz | null;
  onClose: () => void;
  onQuizPassed: (moduleId: string, score: number, xpEarned: number) => void;
}

export default function CourseQuizModal({
  module,
  quiz,
  onClose,
  onQuizPassed,
}: CourseQuizModalProps) {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!module || !quiz) return null;

  const questions = quiz.questions || [];

  const handleSelectOption = (qIdx: number, val: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: val }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const userAns = (userAnswers[idx] || "").trim().toLowerCase();
      const actualAns = q.answer.trim().toLowerCase();
      if (userAns === actualAns || actualAns.includes(userAns) || userAns.includes(actualAns)) {
        correctCount++;
      }
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const score = calculateScore();
  const isPassed = score >= 80;

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    if (score >= 80) {
      onQuizPassed(module.id, score, quiz.xpReward || 100);
    }
  };

  const handleRetry = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1E1B2E]/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Quiz Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-3xl rounded-3xl bg-white dark:bg-[#1A1726] border border-[#E8E3FF] dark:border-[#2A2640] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E8E3FF] dark:border-[#2A2640] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#8B7FE8] text-white flex items-center justify-center font-extrabold shadow-sm">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E] dark:text-white tracking-tight">
                  {quiz.title}
                </h3>
                <span className="text-xs font-medium text-[#6B6785] dark:text-[#A9A4C0]">
                  {module.title} • Pass score: 80%
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#F5F2FF] dark:bg-[#252136] border border-[#E8E3FF] dark:border-[#3A3554] flex items-center justify-center text-[#6B6785] hover:text-[#1E1B2E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* QUESTIONS SCROLL AREA */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6">
            {questions.map((q, qIdx) => {
              const userVal = userAnswers[qIdx] || "";
              const isQuestionCorrect =
                submitted && (userVal.trim().toLowerCase() === q.answer.trim().toLowerCase() || q.answer.trim().toLowerCase().includes(userVal.trim().toLowerCase()));

              return (
                <div
                  key={qIdx}
                  className={`p-5 rounded-2xl border transition-all ${
                    submitted
                      ? isQuestionCorrect
                        ? "bg-[#E6F9F0] dark:bg-[#0E2C20] border-[#9DD9C5]"
                        : "bg-[#FFF0F5] dark:bg-[#301622] border-[#FFC9DE]"
                      : "bg-[#F8F9FC] dark:bg-[#201D30] border-[#E8E3FF] dark:border-[#2A2640]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="text-sm font-extrabold text-[#1E1B2E] dark:text-white leading-snug">
                      {qIdx + 1}. {q.question}
                    </h4>

                    {submitted && (
                      <span className="shrink-0">
                        {isQuestionCorrect ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#74D99F] text-[#0E8566] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFC9DE] text-[#C0336A] flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  {/* MCQ or True/False options */}
                  {(q.type === "mcq" || q.type === "true_false") && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userVal === opt;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={submitted}
                            onClick={() => handleSelectOption(qIdx, opt)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
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
                    <div className="space-y-2 mt-3 text-xs font-medium text-[#4A4660] dark:text-[#C5C0E0] bg-white dark:bg-[#1A1726] p-4 rounded-xl border border-[#E8E3FF] dark:border-[#2A2640]">
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
                        className="w-full mt-3 p-2.5 rounded-xl border border-[#E8E3FF] dark:border-[#3A3554] bg-[#F8F9FC] dark:bg-[#201D30] text-xs font-bold text-[#1E1B2E] dark:text-white focus:outline-none focus:border-[#8B7FE8]"
                      />
                    </div>
                  )}

                  {/* Fill in blank or Order */}
                  {(q.type === "fill_blank" || q.type === "order") && (
                    <div className="mt-3">
                      {q.orderItems && (
                        <div className="mb-2 space-y-1 text-xs font-medium text-[#6B6785] bg-white dark:bg-[#1A1726] p-3 rounded-xl border border-[#E8E3FF] dark:border-[#2A2640]">
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
                        className="w-full p-3 rounded-xl border border-[#E8E3FF] dark:border-[#3A3554] bg-white dark:bg-[#1A1726] text-xs font-bold text-[#1E1B2E] dark:text-white focus:outline-none focus:border-[#8B7FE8]"
                      />
                    </div>
                  )}

                  {/* Answer Explanation */}
                  {submitted && q.explanation && (
                    <p className="mt-3 text-xs text-[#6B6785] dark:text-[#A9A4C0] font-medium pt-2 border-t border-[#E8E3FF]/40">
                      💡 <strong>Explanation:</strong> {q.explanation} (Correct: <strong>{q.answer}</strong>)
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* QUIZ FOOTER */}
          <div className="pt-4 border-t border-[#E8E3FF] dark:border-[#2A2640] flex items-center justify-between">
            {submitted ? (
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-xs font-bold text-[#6B6785] dark:text-[#A9A4C0] block">Quiz Score</span>
                  <span className={`text-xl font-black ${isPassed ? "text-[#0E8566]" : "text-[#C0336A]"}`}>
                    {score}% {isPassed ? "Passed! 🎉" : "Try Again"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#F5F2FF] dark:bg-[#252136] text-[#8B7FE8] border border-[#E8E3FF] dark:border-[#3A3554] hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retry
                </button>
              </div>
            ) : (
              <span className="text-xs font-medium text-[#6B6785] dark:text-[#A9A4C0]">
                Answer all questions to complete the module.
              </span>
            )}

            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-6 py-3 rounded-2xl text-xs font-extrabold bg-[#8B7FE8] hover:bg-[#786BD6] text-white shadow-soft-sm transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                <span>Submit Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-2xl text-xs font-extrabold bg-[#74D99F] hover:bg-[#52C582] text-[#0E8566] shadow-soft-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue Learning</span>
                <Check className="w-4 h-4 stroke-[3]" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
