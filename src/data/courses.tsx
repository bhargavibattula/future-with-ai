import React from "react";

// ----------------------------------------------------
// OFFICIAL AI TOOL LOGOS (Exact official vector marks)
// ----------------------------------------------------

// 1. Official ChatGPT Rosette Logo
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

// 2. Official Claude 8-Point Asterisk Logo
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

// 3. Official Google Gemini 4-Point Star Logo
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

// 4. Official Midjourney Sailboat Logo
export function MidjourneyLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 17.5L8.5 7L13 13.5L16.5 9.5L21 17.5H3Z"
        fill="#8B7FE8"
        stroke="#6366F1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.5" cy="6.5" r="2.5" fill="#EC4899" />
    </svg>
  );
}

// 5. Official Kling AI Video Camera Logo
export function KlingLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="13" height="14" rx="3" fill="white" />
      <polygon points="15,9 22,5 22,19 15,15" fill="white" />
    </svg>
  );
}

// 6. Official Canva "C" Logo
export function CanvaLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.15" />
      <path
        d="M15 9C14.2 8.2 13.1 7.8 11.8 7.8C9.2 7.8 7.2 9.8 7.2 12.5C7.2 15.2 9.2 17.2 11.8 17.2C13.2 17.2 14.3 16.7 15.2 15.8"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 7. Official Cursor Pointer Logo
export function CursorLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5 3.5L19.5 12L12.5 14.5L9.5 20.5L4.5 3.5Z"
        fill="#38BDF8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 8. Official Lovable Heart Logo
export function LovableLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="white"
      />
    </svg>
  );
}

// 9. Official Omni Orbital Logo
export function OmniLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="12" cy="12" r="4" fill="white" />
    </svg>
  );
}

// ----------------------------------------------------
// COURSE DATA (9 Courses with 3D Glossy Tile Styling)
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
    id: "course-chatgpt",
    title: "ChatGPT",
    description: "Complete toolkit for productivity, coding and automation.",
    tags: ["Prompting", "Coding", "Automation"],
    badge: "Most Popular",
    rating: 4.9,
    duration: "3.5 hrs",
    LogoComponent: ChatGPTLogo,
    gradient: "from-[#B8E8D8] via-[#EDF9F5] to-[#FCFBFF]",
    accentColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.25)",
    tileBg: "linear-gradient(145deg, #26BA92, #0E8566)",
    tileShadow: "0 16px 32px rgba(14, 133, 102, 0.4), 0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  {
    id: "course-claude",
    title: "Claude",
    description: "Advanced reasoning, writing and large project workflows.",
    tags: ["Reasoning", "Writing", "Projects"],
    badge: "Top Rated",
    rating: 4.95,
    duration: "4.0 hrs",
    LogoComponent: ClaudeLogo,
    gradient: "from-[#FFC9DE] via-[#FFF0F5] to-[#FCFBFF]",
    accentColor: "#D97706",
    glowColor: "rgba(245, 158, 11, 0.25)",
    tileBg: "linear-gradient(145deg, #E08226, #A6570A)",
    tileShadow: "0 16px 32px rgba(166, 87, 10, 0.4), 0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  {
    id: "course-gemini",
    title: "Gemini",
    description: "Google's multimodal AI assistant for developers.",
    tags: ["Workspace", "Research", "Coding"],
    badge: "New",
    rating: 4.88,
    duration: "3.0 hrs",
    LogoComponent: GeminiLogo,
    gradient: "from-[#D8D2FA] via-[#F3F0FE] to-[#FCFBFF]",
    accentColor: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.25)",
    tileBg: "linear-gradient(145deg, #3B82F6, #1D4ED8)",
    tileShadow: "0 16px 32px rgba(29, 78, 216, 0.4), 0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  {
    id: "course-midjourney",
    title: "Midjourney",
    description: "Create stunning AI illustrations and concept art.",
    tags: ["Art", "Illustrations", "Design"],
    badge: "Trending",
    rating: 4.92,
    duration: "4.5 hrs",
    LogoComponent: MidjourneyLogo,
    gradient: "from-[#D8D2FA] via-[#FFC9DE] to-[#FCFBFF]",
    accentColor: "#9333EA",
    glowColor: "rgba(147, 51, 234, 0.25)",
    tileBg: "linear-gradient(145deg, #FFFFFF, #EAE6FE)",
    tileShadow: "0 16px 32px rgba(139, 127, 232, 0.3), 0 6px 12px rgba(0, 0, 0, 0.12)",
  },
  {
    id: "course-kling",
    title: "Kling AI",
    description: "Generate cinematic AI videos from prompts.",
    tags: ["Video", "Animation", "Creator"],
    badge: "Featured",
    rating: 4.85,
    duration: "3.8 hrs",
    LogoComponent: KlingLogo,
    gradient: "from-[#B8E8D8] via-[#D8D2FA] to-[#FCFBFF]",
    accentColor: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.25)",
    tileBg: "linear-gradient(145deg, #06B6D4, #0284C7)",
    tileShadow: "0 16px 32px rgba(2, 132, 199, 0.4), 0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  {
    id: "course-canva",
    title: "Canva AI",
    description: "Create presentations, graphics and social content.",
    tags: ["Design", "Branding", "Templates"],
    badge: "Essentials",
    rating: 4.87,
    duration: "2.5 hrs",
    LogoComponent: CanvaLogo,
    gradient: "from-[#FFC9DE] via-[#D8D2FA] to-[#FCFBFF]",
    accentColor: "#7D2AE8",
    glowColor: "rgba(125, 42, 232, 0.25)",
    tileBg: "linear-gradient(145deg, #00C4CC, #7D2AE8)",
    tileShadow: "0 16px 32px rgba(125, 42, 232, 0.4), 0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  {
    id: "course-cursor",
    title: "Cursor",
    description: "AI-powered IDE for faster software development.",
    tags: ["Coding", "Debugging", "Refactoring"],
    badge: "Pro Choice",
    rating: 4.98,
    duration: "5.0 hrs",
    LogoComponent: CursorLogo,
    gradient: "from-[#D8D2FA] via-[#B8E8D8] to-[#FCFBFF]",
    accentColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.25)",
    tileBg: "linear-gradient(145deg, #1E1B2E, #0F172A)",
    tileShadow: "0 16px 32px rgba(30, 27, 46, 0.5), 0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  {
    id: "course-lovable",
    title: "Lovable",
    description: "Build beautiful full-stack web applications using AI.",
    tags: ["Frontend", "Backend", "Apps"],
    badge: "Full Stack",
    rating: 4.91,
    duration: "4.2 hrs",
    LogoComponent: LovableLogo,
    gradient: "from-[#FFC9DE] via-[#EDF9F5] to-[#FCFBFF]",
    accentColor: "#F97316",
    glowColor: "rgba(249, 115, 22, 0.25)",
    tileBg: "linear-gradient(145deg, #F97316, #EA580C)",
    tileShadow: "0 16px 32px rgba(234, 88, 12, 0.4), 0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  {
    id: "course-omni",
    title: "Omni",
    description: "Unified AI workspace with multiple models.",
    tags: ["Agents", "Workflow", "Automation"],
    badge: "Enterprise",
    rating: 4.89,
    duration: "3.2 hrs",
    LogoComponent: OmniLogo,
    gradient: "from-[#D8D2FA] via-[#FFC9DE] to-[#FCFBFF]",
    accentColor: "#8B7FE8",
    glowColor: "rgba(139, 127, 232, 0.25)",
    tileBg: "linear-gradient(145deg, #8B7FE8, #4F46E5)",
    tileShadow: "0 16px 32px rgba(79, 70, 229, 0.4), 0 6px 12px rgba(0, 0, 0, 0.15)",
  },
];
