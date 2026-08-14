"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Future With AI?",
    answer:
      "Future With AI is an AI learning ecosystem that helps you master the most in-demand AI tools — from ChatGPT and Midjourney to Gemini, Claude, and more — through structured courses, hands-on projects, and real-world workflows.",
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "We accept all major credit and debit cards, UPI, net banking, and popular digital wallets. All transactions are secured with industry-standard encryption.",
  },
  {
    question: "How do I sign up and get started?",
    answer:
      "Simply click 'Sign Up' on the top-right corner, create your account with your email or Google login, and you'll be taken straight to your personalized dashboard where you can start exploring courses.",
  },
  {
    question: "Can I access my courses on multiple devices?",
    answer:
      "Yes! Your account works seamlessly across desktop, tablet, and mobile. Your progress syncs automatically so you can pick up right where you left off on any device.",
  },
  {
    question: "How do I log in to my dashboard?",
    answer:
      "Click the 'Login' button on the homepage, enter your registered email and password (or use Google sign-in), and you'll land on your dashboard with all your enrolled courses and progress.",
  },
  {
    question: "What happens if I forget my password?",
    answer:
      "No worries! Click 'Forgot Password' on the login page, enter your registered email, and we'll send you a secure link to reset your password instantly.",
  },
  {
    question: "What do I get after completing a course?",
    answer:
      "Upon completion, you receive a verified digital certificate that you can download, share on LinkedIn, and even verify through our public verification page using a unique certificate ID.",
  },
  {
    question: "How do I verify my certificate?",
    answer:
      "Every certificate comes with a unique verification ID. Anyone can visit our /verify page, enter the certificate ID, and instantly confirm its authenticity.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const leftColumn = faqs.filter((_, i) => i % 2 === 0);
  const rightColumn = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <section className="w-full bg-[var(--background)] py-24 px-6 sm:px-12 lg:px-24 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] font-['Space_Grotesk'] tracking-tight mb-4">
            Frequently asked questions
          </h2>
          <p className="text-[var(--muted)] text-lg">
            Find answers to common questions about Future With AI
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColumn.map((faq, i) => {
              const realIndex = i * 2;
              return (
                <FAQItem
                  key={realIndex}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === realIndex}
                  onClick={() => toggle(realIndex)}
                />
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColumn.map((faq, i) => {
              const realIndex = i * 2 + 1;
              return (
                <FAQItem
                  key={realIndex}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === realIndex}
                  onClick={() => toggle(realIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-xl border transition-all duration-300 cursor-pointer ${
        isOpen
          ? "bg-[var(--primary-soft)] border-[var(--primary)]/40"
          : "bg-[var(--elevated)] border-[var(--border)] hover:border-[var(--primary)]/30"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="text-[var(--foreground)] font-medium text-[15px] pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--muted)] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[var(--primary)]" : ""
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-5 text-[var(--foreground-secondary)] text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
