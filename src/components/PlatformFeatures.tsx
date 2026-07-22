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
    <section className="w-full bg-[#FCFBFF] py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Eyebrow Pill */}
        <div className="flex items-center gap-2 bg-[#F3F0FF] border border-[#D8D2FA] px-4 py-1.5 rounded-full mb-6">
          <span className="text-[#8B7FE8] text-xs">✨</span>
          <span className="text-[#6A47F9] text-xs font-semibold tracking-wide">
            SRS Section 17 • Built-in AI Features
          </span>
        </div>

        {/* Header Text */}
        <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#1E1B2E] tracking-tight leading-tight font-['Space_Grotesk'] text-center mb-4">
          Supercharged AI Learning Tools
        </h2>
        <p className="text-lg text-[#6B6785] text-center max-w-2xl mb-16">
          Every tool is engineered to boost learner engagement, retention, and course completion speed.
        </p>

        {/* 6-Card Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white border border-[#EAE6FE] rounded-3xl p-8 flex flex-col hover:shadow-xl hover:-translate-y-1 hover:border-[#D8D2FA] transition-all duration-300 group"
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex justify-between items-start mb-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div className="bg-[#FCFBFF] border border-[#EAE6FE] px-3 py-1 rounded-full">
                  <span className="text-[11px] font-bold text-[#1E1B2E] uppercase tracking-wider">{feature.badge}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-[#1E1B2E] font-['Space_Grotesk'] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#6B6785] text-sm leading-relaxed mb-8 flex-grow">
                {feature.description}
              </p>

              {/* Bottom Link */}
              <div className="pt-4 border-t border-[#F3F0FF] flex justify-between items-center group-hover:border-[#EAE6FE] transition-colors">
                <span className="text-[#8B7FE8] text-sm font-semibold group-hover:text-[#6A47F9] transition-colors">
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
