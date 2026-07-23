"use client";

import { Award, Zap, BookOpen, Star, Trophy, ShieldCheck } from "lucide-react";

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  shadow: string;
  earned: boolean;
}

const BADGES: Badge[] = [
  {
    id: "streak-5",
    title: "5 Day Streak",
    description: "Completed tasks 5 days in a row.",
    icon: Zap,
    gradient: "from-orange-400 to-red-500",
    shadow: "shadow-orange-500/30",
    earned: true,
  },
  {
    id: "first-course",
    title: "First Steps",
    description: "Completed your first interactive course.",
    icon: BookOpen,
    gradient: "from-blue-400 to-indigo-500",
    shadow: "shadow-blue-500/30",
    earned: true,
  },
  {
    id: "prompt-master",
    title: "Prompt Master",
    description: "Submitted 100 successful AI prompts.",
    icon: Star,
    gradient: "from-[#8B7FE8] to-[#6052CC]",
    shadow: "shadow-[#8B7FE8]/30",
    earned: true,
  },
  {
    id: "top-10",
    title: "Top 10%",
    description: "Reached the top 10% of active learners.",
    icon: Trophy,
    gradient: "from-yellow-300 to-amber-500",
    shadow: "shadow-amber-500/30",
    earned: false,
  },
  {
    id: "security",
    title: "Safety First",
    description: "Completed the AI Security module.",
    icon: ShieldCheck,
    gradient: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/30",
    earned: false,
  },
  {
    id: "community",
    title: "Community Star",
    description: "Helped 10 other learners in the forum.",
    icon: Award,
    gradient: "from-pink-400 to-rose-500",
    shadow: "shadow-pink-500/30",
    earned: false,
  },
];

export default function BadgeShowcase() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6FE] shadow-sm mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-[#1E1B2E] mb-2">Your Badges</h2>
        <p className="text-sm text-[#6B6785]">
          Earn badges by completing courses and maintaining your daily streak.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {BADGES.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`flex flex-col items-center text-center group ${
                badge.earned ? "opacity-100" : "opacity-50 grayscale hover:grayscale-0 transition-all duration-300"
              }`}
            >
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr ${badge.gradient} flex items-center justify-center mb-3 shadow-lg ${badge.shadow} transform transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2`}
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.4)",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                {/* Glossy overlay */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)"
                  }}
                />
                <Icon className="w-10 h-10 text-white drop-shadow-md relative z-10" />
              </div>
              
              <h3 className="text-sm font-bold text-[#1E1B2E] mb-1 leading-tight">
                {badge.title}
              </h3>
              <p className="text-[10px] font-medium text-[#6B6785] px-2 leading-snug">
                {badge.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
