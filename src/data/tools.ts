export interface AITool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: "Writing" | "Coding" | "Image Generation" | "Video & Audio" | "Productivity" | "Research";
  rating: number;
  reviewsCount: number;
  pricing: "Free" | "Freemium" | "Paid";
  featured?: boolean;
  trending?: boolean;
  tags: string[];
  url: string;
  iconBgColor: string; // Hex matching our scheme
  iconColor: string;
  stats: {
    monthlyUsers: string;
    speedRating: string;
  };
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: "Writing" | "Coding" | "Image Generation" | "Video & Audio" | "Productivity" | "Research";
  count: number;
  bgSoft: string; // Lavender palette color
  textAccent: string;
  iconName: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "cat-writing",
    name: "Writing assistants",
    slug: "Writing",
    count: 128,
    bgSoft: "#D8D2FA", // Primary Light
    textAccent: "#8B7FE8",
    iconName: "PenTool",
    description: "Copywriting, blog posts, email drafting, and syntax polish",
  },
  {
    id: "cat-image",
    name: "Image generation",
    slug: "Image Generation",
    count: 94,
    bgSoft: "#B8E8D8", // Mint Accent
    textAccent: "#1E1B2E",
    iconName: "Palette",
    description: "Photorealistic art, UI mockups, logo concepts, and photo edits",
  },
  {
    id: "cat-coding",
    name: "Coding tools",
    slug: "Coding",
    count: 156,
    bgSoft: "#FFC9DE", // Soft Pink Accent
    textAccent: "#1E1B2E",
    iconName: "Code2",
    description: "AI pair programming, code refactoring, and automated testing",
  },
  {
    id: "cat-productivity",
    name: "Productivity & Workflow",
    slug: "Productivity",
    count: 112,
    bgSoft: "#F3F0FE",
    textAccent: "#8B7FE8",
    iconName: "Zap",
    description: "Task automation, meeting transcription, and smart scheduling",
  },
  {
    id: "cat-video",
    name: "Video & Audio",
    slug: "Video & Audio",
    count: 78,
    bgSoft: "#EDF9F5",
    textAccent: "#1E1B2E",
    iconName: "Video",
    description: "AI voice synthesis, video avatars, and instant clip editing",
  },
  {
    id: "cat-research",
    name: "Research & Data",
    slug: "Research",
    count: 65,
    bgSoft: "#FFF0F5",
    textAccent: "#6B6785",
    iconName: "Database",
    description: "Academic search, PDF parsing, and insight extraction",
  },
];

export const AI_TOOLS: AITool[] = [
  {
    id: "tool-1",
    name: "CraftWrite Studio",
    tagline: "Context-aware longform AI writing copilot for creators",
    description: "Draft essays, marketing campaigns, and technical docs with smart outline expansion, tone adjustment, and real-time SEO scoring.",
    category: "Writing",
    rating: 4.9,
    reviewsCount: 342,
    pricing: "Freemium",
    featured: true,
    trending: true,
    tags: ["Copywriting", "SEO", "GPT-4o"],
    url: "https://craftwrite.example.com",
    iconBgColor: "#D8D2FA",
    iconColor: "#8B7FE8",
    stats: {
      monthlyUsers: "140K+",
      speedRating: "Instant",
    },
  },
  {
    id: "tool-2",
    name: "DevMind AI",
    tagline: "Autonomous coding partner that writes unit tests & fixes bugs",
    description: "Deeply integrates into your IDE to analyze pull requests, synthesize full-stack components, and optimize SQL queries instantly.",
    category: "Coding",
    rating: 4.95,
    reviewsCount: 512,
    pricing: "Freemium",
    featured: true,
    trending: true,
    tags: ["Code Generator", "Pair Programmer", "TypeScript"],
    url: "https://devmind.example.com",
    iconBgColor: "#FFC9DE",
    iconColor: "#1E1B2E",
    stats: {
      monthlyUsers: "280K+",
      speedRating: "0.2s latency",
    },
  },
  {
    id: "tool-3",
    name: "PastelCanvas",
    tagline: "Hyper-realistic vectors & visual branding generator",
    description: "Create brand guidelines, UI illustrations, and pastel concept art directly from simple text prompts with layered export support.",
    category: "Image Generation",
    rating: 4.88,
    reviewsCount: 219,
    pricing: "Paid",
    featured: true,
    tags: ["UI Graphics", "Vector", "Design System"],
    url: "https://pastelcanvas.example.com",
    iconBgColor: "#B8E8D8",
    iconColor: "#1E1B2E",
    stats: {
      monthlyUsers: "95K+",
      speedRating: "High-res 4K",
    },
  },
  {
    id: "tool-4",
    name: "FocusFlow AI",
    tagline: "Smart workspace manager and intelligent meeting summarizer",
    description: "Automatically transcribes your team video calls, extracts action items, and syncs tasks to Notion, Jira, or Linear without friction.",
    category: "Productivity",
    rating: 4.85,
    reviewsCount: 184,
    pricing: "Free",
    featured: false,
    trending: true,
    tags: ["Meetings", "Notion Sync", "Automations"],
    url: "https://focusflow.example.com",
    iconBgColor: "#D8D2FA",
    iconColor: "#8B7FE8",
    stats: {
      monthlyUsers: "65K+",
      speedRating: "Real-time",
    },
  },
  {
    id: "tool-5",
    name: "VocalBlend Studio",
    tagline: "Studio quality multi-lingual AI voice clone & podcast editor",
    description: "Generate natural emotional voiceovers in over 40 languages. Fix audio noise and trim silence with automated timeline tools.",
    category: "Video & Audio",
    rating: 4.79,
    reviewsCount: 156,
    pricing: "Freemium",
    tags: ["Voice Cloning", "Podcast", "Audio Edit"],
    url: "https://vocalblend.example.com",
    iconBgColor: "#B8E8D8",
    iconColor: "#1E1B2E",
    stats: {
      monthlyUsers: "110K+",
      speedRating: "HD Audio",
    },
  },
  {
    id: "tool-6",
    name: "DataPulse Query",
    tagline: "Talk directly to your SQL databases in natural language",
    description: "Transform plain english questions into complex analytical SQL queries, interactive dashboard charts, and automated PDF summaries.",
    category: "Research",
    rating: 4.91,
    reviewsCount: 290,
    pricing: "Freemium",
    featured: true,
    tags: ["SQL AI", "Data Analytics", "Charts"],
    url: "https://datapulse.example.com",
    iconBgColor: "#FFC9DE",
    iconColor: "#1E1B2E",
    stats: {
      monthlyUsers: "185K+",
      speedRating: "Sub-second",
    },
  },
  {
    id: "tool-7",
    name: "InkSpire AI",
    tagline: "AI content rewriting tool for tone, clarity, and brevity",
    description: "Refine your email pitches and technical articles. Eliminates passive voice, adjusts reading levels, and prevents plagiarism.",
    category: "Writing",
    rating: 4.82,
    reviewsCount: 140,
    pricing: "Free",
    tags: ["Grammar", "Tone Changer", "Email"],
    url: "https://inkspire.example.com",
    iconBgColor: "#D8D2FA",
    iconColor: "#8B7FE8",
    stats: {
      monthlyUsers: "80K+",
      speedRating: "Instant",
    },
  },
  {
    id: "tool-8",
    name: "MotionCraft",
    tagline: "Text-to-3D animation & avatar motion generator",
    description: "Turn text scripts into fully articulated 3D character animations for social video ads, game assets, and educational tutorials.",
    category: "Video & Audio",
    rating: 4.76,
    reviewsCount: 98,
    pricing: "Paid",
    tags: ["3D Animation", "Avatars", "Video Generation"],
    url: "https://motioncraft.example.com",
    iconBgColor: "#FFC9DE",
    iconColor: "#1E1B2E",
    stats: {
      monthlyUsers: "45K+",
      speedRating: "60 FPS render",
    },
  },
];
