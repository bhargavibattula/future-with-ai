import React from "react";
import { FaMicrophone, FaFileAlt, FaCheckSquare, FaLinkedin, FaRobot, FaBolt } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Voice Lessons",
    description: "Experience crystal-clear audio explanations for lessons in English and Telugu with custom playback rates.",
    badge: "Lifelike Audio",
    icon: <FaMicrophone className="text-[#8B7FE8]" />,
    iconBg: "bg-[#F3F0FF]",
  },
  {
    id: 2,
    title: "AI Notes Summarizer",
    description: "Instantly access condensed course modules with key takeaways, cheat sheets, and downloadable PDFs.",
    badge: "One-Click Summary",
    icon: <FaFileAlt className="text-[#FF7F9F]" />,
    iconBg: "bg-[#FFF0F5]",
  },
  {
    id: 3,
    title: "AI Quiz Engine",
    description: "Test your knowledge with Multiple Choice, Match the Following, Drag & Drop, and Scenario-Based AI Quizzes.",
    badge: "12 Question Types",
    icon: <FaCheckSquare className="text-[#34D399]" />,
    iconBg: "bg-[#EDF9F5]",
  },
  {
    id: 4,
    title: "Smart LinkedIn Integrator",
    description: "Seamlessly share your course completions, streak milestones, and certificate badges directly to your professional profile.",
    badge: "Social Proof",
    icon: <FaLinkedin className="text-[#8B7FE8]" />,
    iconBg: "bg-[#F3F0FF]",
  },
  {
    id: 5,
    title: "AI Doubt Solver & Mentor",
    description: "Get real-time, step-by-step Socratic guidance on any lesson code snippet or math proof whenever you need help.",
    badge: "24/7 Assistance",
    icon: <FaRobot className="text-[#34D399]" />,
    iconBg: "bg-[#EDF9F5]",
  },
  {
    id: 6,
    title: "AI Coin Economy",
    description: "Earn AI rewards for completing daily lessons & quizzes. Redeem them for course discounts and exclusive workshops.",
    badge: "Virtual Wallet",
    icon: <FaBolt className="text-[#FF7F9F]" />,
    iconBg: "bg-[#FFF0F5]",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="w-full bg-[#FCFBFF] dark:bg-[#0A0A0A] py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header Text */}
        <h2 className="text-2xl sm:text-4xl md:text-[42px] font-bold text-[var(--foreground)] tracking-tight leading-tight font-['Space_Grotesk'] text-center mb-3 sm:mb-4">
          Supercharged AI Learning Tools
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[var(--foreground-secondary)] text-center max-w-2xl mb-10 sm:mb-16">
          Every tool is engineered to boost learner engagement, retention, and course completion speed.
        </p>

        {/* 6-Card Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col hover:shadow-xl hover:-translate-y-1 hover:border-[#8B7FE8]/50 transition-all duration-300 group min-h-[44px]"
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex justify-between items-start mb-6 sm:mb-8">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${feature.iconBg} dark:bg-white/10 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div className="bg-[var(--background)] border border-[var(--border)] px-3 py-1 rounded-full">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[var(--foreground)] uppercase tracking-wider">{feature.badge}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] font-['Space_Grotesk'] mb-2.5 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-[var(--foreground-secondary)] text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 flex-grow">
                {feature.description}
              </p>

              {/* Bottom Link */}
              <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center group-hover:border-[#8B7FE8]/30 transition-colors">
                <span className="text-[#8B7FE8] text-xs sm:text-sm font-semibold group-hover:text-[#786BD6] transition-colors">
                  Explore Feature
                </span>
                <span className="text-[#8B7FE8] transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
