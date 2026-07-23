import React from "react";

// ----------------------------------------------------
// OFFICIAL & CUSTOM AI TOOL LOGOS
// ----------------------------------------------------

export function ChatGPTLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7947.7947 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.535-3.0137l.142.0852 4.783 2.7582a.771.771 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.342 9.712a4.4755 4.4755 0 0 1 2.3415-1.9729V13.3a.7947.7947 0 0 0 .388.6813l5.8428 3.3685-2.02 1.1686a.0757.0757 0 0 1-.071 0l-4.8303-2.7913A4.4944 4.4944 0 0 1 2.342 9.712zm16.5963 3.8558-5.8428-3.3733 2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6767 8.1042v-5.6773a.79.79 0 0 0-.4018-.6811zm2.0107-3.0231l-.142-.0852-4.7735-2.7582a.771.771 0 0 0-.7806 0l-5.8428 3.3685V8.7356a.0804.0804 0 0 1 .0332-.0615l4.8303-2.7913a4.4992 4.4992 0 0 1 6.6754 4.6601zm-10.5422-5.435a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7947.7947 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V9.6109a4.504 4.504 0 0 1 4.4945-4.4944z"
        fill="white"
      />
    </svg>
  );
}

export function ClaudeLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.827 3.518a1.5 1.5 0 0 0-2.654 0L9.42 6.84 5.753 5.405a1.5 1.5 0 0 0-1.928 1.928l1.435 3.667-3.322 1.753a1.5 1.5 0 0 0 0 2.654l3.322 1.753-1.435 3.667a1.5 1.5 0 0 0 1.928 1.928l3.667-1.435 1.753 3.322a1.5 1.5 0 0 0 2.654 0l1.753-3.322 3.667 1.435a1.5 1.5 0 0 0 1.928-1.928l-1.435-3.667 3.322-1.753a1.5 1.5 0 0 0 0-2.654l-3.322-1.753 1.435-3.667a1.5 1.5 0 0 0-1.928-1.928l-3.667 1.435-1.753-3.322z"
        fill="white"
      />
    </svg>
  );
}

export function GeminiLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
        fill="white"
      />
    </svg>
  );
}

export function MidjourneyLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17.5L8.5 7L13 13.5L16.5 9.5L21 17.5H3Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KlingLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="13" height="14" rx="3" fill="white" />
      <polygon points="15,9 22,5 22,19 15,15" fill="white" />
    </svg>
  );
}

export function CanvaLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.15" />
      <path d="M15 9C14.2 8.2 13.1 7.8 11.8 7.8C9.2 7.8 7.2 9.8 7.2 12.5C7.2 15.2 9.2 17.2 11.8 17.2C13.2 17.2 14.3 16.7 15.2 15.8" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function CursorLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 3.5L19.5 12L12.5 14.5L9.5 20.5L4.5 3.5Z" fill="#38BDF8" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function LovableLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" />
    </svg>
  );
}

export function OmniLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="12" cy="12" r="4" fill="white" />
    </svg>
  );
}

export function DeepSeekLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StableDiffusionLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" strokeDasharray="2 4" />
      <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function JasperLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4v12a4 4 0 0 1-8 0M16 8h4M16 16h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function PerplexityLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v20M2 12h20M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <circle cx="12" cy="12" r="3" fill="white" />
    </svg>
  );
}

export function CommAILogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ----------------------------------------------------
// COURSE DATA (16 Courses based on user specifications)
// ----------------------------------------------------
export interface AICourse {
  id: string;
  title: string;
  description: string;
  tags: [string, string, string];
  badge: string;
  rating: number;
  duration: string;
  LogoComponent: React.ElementType;
  gradient: string;
  accentColor: string;
  glowColor: string;
  tileBg: string;
  tileShadow: string;
}

export const COURSES: AICourse[] = [
  {
    id: "course-claude",
    title: "Claude",
    description: "Deep analysis, Long documents, Strategic work.",
    tags: ["Deep analysis", "Long documents", "Strategic work"],
    badge: "Top Rated",
    rating: 4.95,
    duration: "10 lessons • 5 hrs",
    LogoComponent: ClaudeLogo,
    gradient: "from-[#FFC9DE] via-[#FFF0F5] to-[#FCFBFF]",
    accentColor: "#D97706",
    glowColor: "rgba(245, 158, 11, 0.25)",
    tileBg: "linear-gradient(145deg, #E08226, #A6570A)",
    tileShadow: "0 16px 32px rgba(166, 87, 10, 0.4)",
  },
  {
    id: "course-claude-deep-dive",
    title: "Claude: Deep Dive",
    description: "Long documents, Strategic work, Business automation.",
    tags: ["Long documents", "Strategic work", "Business automation"],
    badge: "Advanced",
    rating: 4.97,
    duration: "13 lessons • 5 hrs",
    LogoComponent: ClaudeLogo,
    gradient: "from-[#F3F0FE] via-[#D8D2FA] to-[#FCFBFF]",
    accentColor: "#6B21A8",
    glowColor: "rgba(107, 33, 168, 0.25)",
    tileBg: "linear-gradient(145deg, #7E22CE, #581C87)",
    tileShadow: "0 16px 32px rgba(88, 28, 135, 0.4)",
  },
  {
    id: "course-claude-code",
    title: "Claude Code",
    description: "Work & personal websites, No-code apps, Strategic work.",
    tags: ["Websites", "No-code apps", "Strategic work"],
    badge: "Coding",
    rating: 4.88,
    duration: "7 lessons • 2 hrs",
    LogoComponent: CursorLogo,
    gradient: "from-[#B8E8D8] via-[#EDF9F5] to-[#FCFBFF]",
    accentColor: "#059669",
    glowColor: "rgba(5, 150, 105, 0.25)",
    tileBg: "linear-gradient(145deg, #10B981, #047857)",
    tileShadow: "0 16px 32px rgba(4, 120, 87, 0.4)",
  },
  {
    id: "course-lovable",
    title: "Lovable",
    description: "Work & personal websites, Landing pages, No-code apps.",
    tags: ["Websites", "Landing pages", "No-code apps"],
    badge: "No-Code",
    rating: 4.91,
    duration: "8 lessons • 4 hrs",
    LogoComponent: LovableLogo,
    gradient: "from-[#FFC9DE] via-[#EDF9F5] to-[#FCFBFF]",
    accentColor: "#F97316",
    glowColor: "rgba(249, 115, 22, 0.25)",
    tileBg: "linear-gradient(145deg, #F97316, #EA580C)",
    tileShadow: "0 16px 32px rgba(234, 88, 12, 0.4)",
  },
  {
    id: "course-deepseek",
    title: "DeepSeek",
    description: "Business automation, Learning, Multistep tasks.",
    tags: ["Business automation", "Learning", "Multistep tasks"],
    badge: "Trending",
    rating: 4.94,
    duration: "15 lessons • 5 hrs",
    LogoComponent: DeepSeekLogo,
    gradient: "from-[#D8D2FA] via-[#F3F0FE] to-[#FCFBFF]",
    accentColor: "#1D4ED8",
    glowColor: "rgba(29, 78, 216, 0.25)",
    tileBg: "linear-gradient(145deg, #2563EB, #1E40AF)",
    tileShadow: "0 16px 32px rgba(30, 64, 175, 0.4)",
  },
  {
    id: "course-chatgpt",
    title: "ChatGPT",
    description: "Brainstorming, Quick answers, Everyday help.",
    tags: ["Brainstorming", "Quick answers", "Everyday help"],
    badge: "Most Popular",
    rating: 4.9,
    duration: "13 lessons • 6 hrs",
    LogoComponent: ChatGPTLogo,
    gradient: "from-[#B8E8D8] via-[#EDF9F5] to-[#FCFBFF]",
    accentColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.25)",
    tileBg: "linear-gradient(145deg, #26BA92, #0E8566)",
    tileShadow: "0 16px 32px rgba(14, 133, 102, 0.4)",
  },
  {
    id: "course-chatgpt-deep-dive",
    title: "ChatGPT: Deep Dive",
    description: "Advanced automation, API integrations, Complex reasoning.",
    tags: ["Advanced automation", "API integrations", "Complex reasoning"],
    badge: "Advanced",
    rating: 4.96,
    duration: "11 lessons • 4 hrs",
    LogoComponent: ChatGPTLogo,
    gradient: "from-[#B8E8D8] via-[#D8D2FA] to-[#FCFBFF]",
    accentColor: "#0F766E",
    glowColor: "rgba(15, 118, 110, 0.25)",
    tileBg: "linear-gradient(145deg, #0D9488, #115E59)",
    tileShadow: "0 16px 32px rgba(17, 94, 89, 0.4)",
  },
  {
    id: "course-gemini",
    title: "Gemini",
    description: "Spreadsheet insights, Multimedia content, Careful reasoning.",
    tags: ["Spreadsheet insights", "Multimedia content", "Careful reasoning"],
    badge: "New",
    rating: 4.88,
    duration: "10 lessons • 4 hrs",
    LogoComponent: GeminiLogo,
    gradient: "from-[#D8D2FA] via-[#F3F0FE] to-[#FCFBFF]",
    accentColor: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.25)",
    tileBg: "linear-gradient(145deg, #3B82F6, #1D4ED8)",
    tileShadow: "0 16px 32px rgba(29, 78, 216, 0.4)",
  },
  {
    id: "course-midjourney",
    title: "Midjourney",
    description: "Concept imagery, Illustrations, High-end visuals.",
    tags: ["Concept imagery", "Illustrations", "High-end visuals"],
    badge: "Design",
    rating: 4.92,
    duration: "12 lessons • 6 hrs",
    LogoComponent: MidjourneyLogo,
    gradient: "from-[#D8D2FA] via-[#FFC9DE] to-[#FCFBFF]",
    accentColor: "#9333EA",
    glowColor: "rgba(147, 51, 234, 0.25)",
    tileBg: "linear-gradient(145deg, #1E1B2E, #0F172A)",
    tileShadow: "0 16px 32px rgba(30, 27, 46, 0.5)",
  },
  {
    id: "course-stable-diffusion",
    title: "Stable Diffusion",
    description: "Detailed editing, Brand consistency, Custom images.",
    tags: ["Detailed editing", "Brand consistency", "Custom images"],
    badge: "Open Source",
    rating: 4.86,
    duration: "10 lessons • 4 hrs",
    LogoComponent: StableDiffusionLogo,
    gradient: "from-[#FFC9DE] via-[#F3F0FE] to-[#FCFBFF]",
    accentColor: "#BE185D",
    glowColor: "rgba(190, 24, 93, 0.25)",
    tileBg: "linear-gradient(145deg, #E11D48, #9F1239)",
    tileShadow: "0 16px 32px rgba(159, 18, 57, 0.4)",
  },
  {
    id: "course-canva",
    title: "Canva AI",
    description: "Presentations, Visual templates, Marketing designs.",
    tags: ["Presentations", "Visual templates", "Marketing designs"],
    badge: "Essentials",
    rating: 4.87,
    duration: "8 lessons • 3 hrs",
    LogoComponent: CanvaLogo,
    gradient: "from-[#FFC9DE] via-[#D8D2FA] to-[#FCFBFF]",
    accentColor: "#7D2AE8",
    glowColor: "rgba(125, 42, 232, 0.25)",
    tileBg: "linear-gradient(145deg, #00C4CC, #7D2AE8)",
    tileShadow: "0 16px 32px rgba(125, 42, 232, 0.4)",
  },
  {
    id: "course-jasper",
    title: "Jasper AI",
    description: "Brand voice, Content writing, Ad copy.",
    tags: ["Brand voice", "Content writing", "Ad copy"],
    badge: "Marketing",
    rating: 4.83,
    duration: "10 lessons • 5 hrs",
    LogoComponent: JasperLogo,
    gradient: "from-[#F3F0FE] via-[#FFC9DE] to-[#FCFBFF]",
    accentColor: "#E11D48",
    glowColor: "rgba(225, 29, 72, 0.25)",
    tileBg: "linear-gradient(145deg, #2A1F45, #150F23)",
    tileShadow: "0 16px 32px rgba(21, 15, 35, 0.4)",
  },
  {
    id: "course-omni",
    title: "Omni",
    description: "Video ads, Social media, Realistic footage.",
    tags: ["Video ads", "Social media", "Realistic footage"],
    badge: "Enterprise",
    rating: 4.89,
    duration: "10 lessons • 4 hrs",
    LogoComponent: OmniLogo,
    gradient: "from-[#D8D2FA] via-[#FFC9DE] to-[#FCFBFF]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(139, 127, 232, 0.25)",
    tileBg: "linear-gradient(145deg, #8B7FE8, #4F46E5)",
    tileShadow: "0 16px 32px rgba(79, 70, 229, 0.4)",
  },
  {
    id: "course-kling",
    title: "Kling AI",
    description: "Viral videos, AI characters, Short clips.",
    tags: ["Viral videos", "AI characters", "Short clips"],
    badge: "Featured",
    rating: 4.85,
    duration: "11 lessons • 3 hrs",
    LogoComponent: KlingLogo,
    gradient: "from-[#B8E8D8] via-[#D8D2FA] to-[#FCFBFF]",
    accentColor: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.25)",
    tileBg: "linear-gradient(145deg, #06B6D4, #0284C7)",
    tileShadow: "0 16px 32px rgba(2, 132, 199, 0.4)",
  },
  {
    id: "course-perplexity",
    title: "Perplexity",
    description: "Research, Verifying sources, Fact-checking.",
    tags: ["Research", "Verifying sources", "Fact-checking"],
    badge: "Research",
    rating: 4.93,
    duration: "11 lessons • 5 hrs",
    LogoComponent: PerplexityLogo,
    gradient: "from-[#D8D2FA] via-[#B8E8D8] to-[#FCFBFF]",
    accentColor: "#111827",
    glowColor: "rgba(17, 24, 39, 0.25)",
    tileBg: "linear-gradient(145deg, #374151, #111827)",
    tileShadow: "0 16px 32px rgba(17, 24, 39, 0.4)",
  },
  {
    id: "course-communicating-ai",
    title: "Communicating With AI",
    description: "Quick answers, Everyday help, Learning.",
    tags: ["Quick answers", "Everyday help", "Learning"],
    badge: "Beginner",
    rating: 4.81,
    duration: "5 lessons • 2 hrs",
    LogoComponent: CommAILogo,
    gradient: "from-[#F3F0FE] via-[#D8D2FA] to-[#FCFBFF]",
    accentColor: "#6366F1",
    glowColor: "rgba(99, 102, 241, 0.25)",
    tileBg: "linear-gradient(145deg, #6366F1, #4338CA)",
    tileShadow: "0 16px 32px rgba(67, 56, 202, 0.4)",
  },
];
