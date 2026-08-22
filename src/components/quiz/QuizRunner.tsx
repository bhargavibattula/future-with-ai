"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DragAndDropOrdering } from "./types/DragAndDropOrdering";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: string;
  type: string;
  prompt: string;
  options: any;
}

export function QuizRunner({ moduleId, questions }: { moduleId: string, questions: Question[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswerUpdate = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    try {
      // In a real implementation, POST to /api/quizzes/submit
      setIsSubmitted(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      console.error(e);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto mt-10 text-center py-10 border-[#EAE6FE] shadow-soft-xl">
        <CheckCircle2 className="w-16 h-16 text-[#5CBFA0] mx-auto mb-4" />
        <CardTitle className="text-2xl font-black text-[#1E1B2E]">Quiz Completed!</CardTitle>
        <p className="text-[#6B6785] mt-2">Your answers have been securely evaluated.</p>
      </Card>
    );
  }

  if (!questions || questions.length === 0) return null;

  return (
    <Card className="max-w-3xl mx-auto mt-8 border-[#EAE6FE] shadow-soft-xl">
      <CardHeader className="bg-[#FCFBFF] border-b border-[#EAE6FE] pb-4">
        <div className="flex justify-between items-center text-xs font-bold text-[#6B6785]">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span className="uppercase tracking-widest text-[#8B7FE8] bg-[#F3F0FE] px-2 py-1 rounded-md">
            {currentQuestion.type.replace(/_/g, " ")}
          </span>
        </div>
        <CardTitle className="text-xl font-black text-[#1E1B2E] mt-3">
          {currentQuestion.prompt}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        {currentQuestion.type === "DRAG_DROP_ORDERING" ? (
          <DragAndDropOrdering 
            items={currentQuestion.options} 
            onChange={handleAnswerUpdate} 
          />
        ) : (
          <div className="text-center p-10 text-[#6B6785] font-semibold border-2 border-dashed border-[#EAE6FE] rounded-xl">
            UI for {currentQuestion.type} coming soon.
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleNext} 
            className="bg-[#1E1B2E] hover:bg-[#2D2A43] text-white shadow-soft-md gap-2"
          >
            {currentIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
