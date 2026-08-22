"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { QuizRunner } from "@/components/quiz/QuizRunner";

interface CourseQuizClientProps {
  slug: string;
  moduleId: string;
}

export default function CourseQuizClient({ slug, moduleId }: CourseQuizClientProps) {
  const [quizData, setQuizData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quizzes/${moduleId}`);
        const data = await res.json();
        
        if (data.success && data.quiz) {
          setQuizData(data.quiz);
        } else {
          // If the quiz isn't in the DB yet, we show an error
          setError("Quiz not found or not yet available.");
        }
      } catch (err) {
        console.error("Failed to fetch quiz from DB", err);
        setError("Failed to connect to the quiz server.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuiz();
  }, [moduleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#8B7FE8]" />
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 text-center px-4 flex-1">
          <h2 className="text-2xl font-extrabold mb-4">Quiz Under Construction</h2>
          <p className="text-[#6B6785] mb-6">
            {error || "The requested quiz could not be found for this module."}
          </p>
          <Link
            href={`/courses/${slug}`}
            className="px-6 py-3 rounded-2xl bg-[#8B7FE8] hover:bg-[#786BD6] text-white font-bold text-sm transition-colors"
          >
            Return to Course Path
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBFF] flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto mb-8">
          <Link 
            href={`/courses/${slug}`}
            className="text-[#8B7FE8] font-bold text-sm hover:underline mb-4 inline-block"
          >
            &larr; Back to Course
          </Link>
          <h1 className="text-3xl font-black text-[#1E1B2E]">{quizData.title}</h1>
          <p className="text-[#6B6785] mt-2">{quizData.description}</p>
        </div>

        <QuizRunner moduleId={moduleId} questions={quizData.questions} />
      </main>

      <Footer />
    </div>
  );
}
