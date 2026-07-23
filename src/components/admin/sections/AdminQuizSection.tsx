"use client";

import React, { useState } from "react";
import { HelpCircle, Plus, Sparkles, Check, Trash2, Clock, Award } from "lucide-react";

export default function AdminQuizSection() {
  const [questions, setQuestions] = useState([
    {
      id: "q-1",
      question: "What is the recommended approach for few-shot prompting in ChatGPT?",
      type: "MCQ",
      options: ["Provide 2-3 input/output examples", "Use system role only", "Avoid temperature settings"],
      correctIndex: 0,
      xp: 50,
    },
    {
      id: "q-2",
      question: "Claude Artifacts can render live React UI components directly.",
      type: "TrueFalse",
      options: ["True", "False"],
      correctIndex: 0,
      xp: 50,
    },
  ]);

  const [newQuestionText, setNewQuestionText] = useState("");

  const handleAddQuestion = () => {
    if (!newQuestionText) return;
    setQuestions([
      ...questions,
      {
        id: `q-${Date.now()}`,
        question: newQuestionText,
        type: "MCQ",
        options: ["Option A", "Option B", "Option C"],
        correctIndex: 0,
        xp: 50,
      },
    ]);
    setNewQuestionText("");
  };

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight">
            Quiz & <span className="text-[#8B7FE8]">Assessment Studio</span>
          </h2>
          <p className="text-xs text-[#6B6785] font-medium">
            Build interactive question banks, timers, passing thresholds, and XP rewards.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#E8E3FF] shadow-soft space-y-4">
        <h3 className="text-base font-extrabold text-[#1E1B2E]">
          Add New Question
        </h3>

        <div className="flex gap-3">
          <input
            type="text"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Type question prompt..."
            className="flex-1 p-3 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
          />
          <button
            onClick={handleAddQuestion}
            className="px-5 py-3 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6]"
          >
            + Add Question
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white rounded-3xl p-5 border border-[#E8E3FF] shadow-soft flex items-center justify-between gap-4"
          >
            <div>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#F5F2FF] text-[#8B7FE8] border border-[#E8E3FF] mb-1 inline-block">
                Question {idx + 1} • {q.type}
              </span>
              <h4 className="text-sm font-extrabold text-[#1E1B2E]">{q.question}</h4>
              <span className="text-xs font-bold text-[#74D99F] block mt-1">
                Reward: +{q.xp} XP
              </span>
            </div>

            <button
              onClick={() => setQuestions(questions.filter((item) => item.id !== q.id))}
              className="p-2 rounded-xl text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
