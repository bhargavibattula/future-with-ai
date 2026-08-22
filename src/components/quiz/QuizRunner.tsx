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
      <Card className="max-w-2xl mx-auto mt-6 sm:mt-10 text-center py-8 sm:py-10 px-4 border-[#EAE6FE] dark:border-white/10 bg-white dark:bg-[#13111C] shadow-soft-xl">
        <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-[#5CBFA0] mx-auto mb-4" />
        <CardTitle className="text-xl sm:text-2xl font-black text-[#1E1B2E] dark:text-white">Quiz Completed!</CardTitle>
        <p className="text-[#6B6785] dark:text-[#A09CAE] mt-2 text-xs sm:text-sm">Your answers have been securely evaluated.</p>
      </Card>
    );
  }

  if (!questions || questions.length === 0) return null;

  return (
    <Card className="w-full max-w-3xl mx-auto mt-4 sm:mt-8 border-[#EAE6FE] dark:border-white/10 bg-white dark:bg-[#13111C] shadow-soft-xl">
      <CardHeader className="bg-[#FCFBFF] dark:bg-[#181528] border-b border-[#EAE6FE] dark:border-white/10 p-4 sm:p-6 pb-4">
        <div className="flex justify-between items-center text-xs font-bold text-[#6B6785] dark:text-[#A09CAE]">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span className="uppercase tracking-widest text-[#8B7FE8] bg-[#F3F0FE] dark:bg-[#282142] px-2.5 py-1 rounded-md text-[10px]">
            {currentQuestion.type.replace(/_/g, " ")}
          </span>
        </div>
        <CardTitle className="text-base sm:text-xl font-black text-[#1E1B2E] dark:text-white mt-2.5 leading-snug">
          {currentQuestion.prompt}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 pt-6">
        {currentQuestion.type === "DRAG_DROP_ORDERING" ? (
          <DragAndDropOrdering 
            items={currentQuestion.options} 
            onChange={handleAnswerUpdate} 
          />
        ) : (
          <div className="text-center p-6 sm:p-10 text-[#6B6785] dark:text-[#A09CAE] font-semibold border-2 border-dashed border-[#EAE6FE] dark:border-white/10 rounded-2xl text-xs sm:text-sm">
            UI for {currentQuestion.type} coming soon.
          </div>
        )}

        <div className="mt-6 sm:mt-8 flex justify-end">
          <Button 
            onClick={handleNext} 
            className="w-full sm:w-auto min-h-[44px] bg-[#8B7FE8] hover:bg-[#786BD6] text-white shadow-soft-md gap-2 text-xs sm:text-sm font-bold"
          >
            <span>{currentIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
