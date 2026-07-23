import { AICourse, COURSES } from "@/data/courses";

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: "video" | "interactive" | "quiz" | "project";
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  status: "completed" | "current" | "locked";
  duration: string;
  xp: number;
  lessons: CourseLesson[];
}

export interface CourseResource {
  id: string;
  title: string;
  type: "pdf" | "notes" | "files" | "community";
  sizeOrMeta: string;
  description: string;
  linkText: string;
}

export interface CourseBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  unlocked: boolean;
}

export interface DetailedCoursePath {
  slug: string;
  course: AICourse;
  fullTitle: string;
  lastUpdated: string;
  level: string;
  completedModulesCount: number;
  totalModulesCount: number;
  progressPercent: number;
  timeSpent: string;
  currentStreak: string;
  xpEarned: number;
  modules: CourseModule[];
  resources: CourseResource[];
  badges: CourseBadge[];
  recommendedSlug: string;
}

// Generate tailored pathway data for any given course slug
export function getCoursePathData(slug: string): DetailedCoursePath {
  const cleanSlug = slug.toLowerCase().replace("course-", "");
  const course =
    COURSES.find((c) => c.id.replace("course-", "") === cleanSlug) || COURSES[0];

  // Specific customized module topics per tool
  const moduleTopicsMap: Record<
    string,
    { title: string; subtitle: string; desc: string }[]
  > = {
    chatgpt: [
      {
        title: "Introduction & Setup",
        subtitle: "Unit 1 • Fundamentals",
        desc: "Master interface navigation, system instructions, and setting up custom GPTs.",
      },
      {
        title: "Prompting Essentials",
        subtitle: "Unit 2 • Core Skills",
        desc: "Few-shot prompting, chain-of-thought reasoning, and persona construction.",
      },
      {
        title: "Real-World Projects",
        subtitle: "Unit 3 • Practical Application",
        desc: "Build automated writing pipelines, code generators, and summary assistants.",
      },
      {
        title: "Advanced Workflows",
        subtitle: "Unit 4 • Deep Automation",
        desc: "Function calling, API integration, and multi-step reasoning agents.",
      },
      {
        title: "Mastery Assessment",
        subtitle: "Unit 5 • Skill Check",
        desc: "Evaluate your prompt architecture knowledge with 15 real-world scenarios.",
      },
      {
        title: "Verified Certificate",
        subtitle: "Unit 6 • Capstone",
        desc: "Claim your verifiable industry certification and shareable credential badge.",
      },
    ],
    claude: [
      {
        title: "Meet Claude & Artifacts",
        subtitle: "Unit 1 • Foundations",
        desc: "Explore 200k context windows, live UI rendering in Artifacts, and tone control.",
      },
      {
        title: "Working With Projects",
        subtitle: "Unit 2 • Knowledge Base",
        desc: "Upload custom documentation, construct system prompts, and pin repository context.",
      },
      {
        title: "Complex Code Reasoning",
        subtitle: "Unit 3 • Software Eng",
        desc: "Refactor legacy repos, debug complex logic, and generate clean unit tests.",
      },
      {
        title: "Long-Form Synthesis",
        subtitle: "Unit 4 • Analysis",
        desc: "Extract insights from multi-page PDFs, financial reports, and strategic briefs.",
      },
      {
        title: "Claude 3.5 Sonnet Quiz",
        subtitle: "Unit 5 • Evaluation",
        desc: "Test your advanced reasoning and prompt optimization skills.",
      },
      {
        title: "Claude Master Certificate",
        subtitle: "Unit 6 • Capstone",
        desc: "Unlock your shareable credential verifying advanced Claude proficiency.",
      },
    ],
    gemini: [
      {
        title: "Gemini Workspace Intro",
        subtitle: "Unit 1 • Multimodal Basics",
        desc: "Understand text, audio, image, and video native multimodal processing.",
      },
      {
        title: "Google Ecosystem Sync",
        subtitle: "Unit 2 • Integration",
        desc: "Connect Gemini with Google Docs, Drive, YouTube, and Gmail extensions.",
      },
      {
        title: "Code Execution & Data",
        subtitle: "Unit 3 • Python & Math",
        desc: "Run live Python code in sandbox, generate charts, and analyze datasets.",
      },
      {
        title: "1M Token Context Workflows",
        subtitle: "Unit 4 • Enterprise",
        desc: "Process full video recordings, codebases, and audio transcripts seamlessly.",
      },
      {
        title: "Multimodal Assessment",
        subtitle: "Unit 5 • Skill Check",
        desc: "Demonstrate mastery over vision, voice, and document reasoning.",
      },
      {
        title: "Gemini Certified Specialist",
        subtitle: "Unit 6 • Capstone",
        desc: "Receive your official certification for Google Gemini platform skills.",
      },
    ],
    midjourney: [
      {
        title: "Prompting Aesthetics",
        subtitle: "Unit 1 • Vision & Style",
        desc: "Parameters, aspect ratios, style raw, and lighting descriptors.",
      },
      {
        title: "V6 Reference Control",
        subtitle: "Unit 2 • Consistency",
        desc: "Master --cref (character reference) and --sref (style reference) workflows.",
      },
      {
        title: "Vary Region & Outpainting",
        subtitle: "Unit 3 • Editing",
        desc: "Inpainting, pan, zoom out, and blending composite concept art.",
      },
      {
        title: "Commercial Asset Pipeline",
        subtitle: "Unit 4 • Production",
        desc: "Upscaling techniques, vector conversions, and brand style guides.",
      },
      {
        title: "Artistic Direction Quiz",
        subtitle: "Unit 5 • Skill Check",
        desc: "Validate parameter usage and prompt engineering for photorealism.",
      },
      {
        title: "AI Artist Certification",
        subtitle: "Unit 6 • Capstone",
        desc: "Earn your verified certificate in Midjourney generative design.",
      },
    ],
    kling: [
      {
        title: "Kling AI Video Basics",
        subtitle: "Unit 1 • Camera & Motion",
        desc: "Understand camera pans, tilts, zooms, and physics simulation prompts.",
      },
      {
        title: "Image-to-Video Animation",
        subtitle: "Unit 2 • Keyframing",
        desc: "Animate static illustrations, logos, and portraits with natural motion.",
      },
      {
        title: "Cinematic Storyboarding",
        subtitle: "Unit 3 • Storytelling",
        desc: "Assemble 5-second shots into coherent commercial video sequences.",
      },
      {
        title: "VFX & Motion Brush",
        subtitle: "Unit 4 • Pro Controls",
        desc: "Isolate elements for dynamic fire, liquid, wind, and facial expressions.",
      },
      {
        title: "Video Generation Quiz",
        subtitle: "Unit 5 • Skill Check",
        desc: "Test motion control prompts, aspect ratios, and frame rate settings.",
      },
      {
        title: "AI Filmmaker Certificate",
        subtitle: "Unit 6 • Capstone",
        desc: "Unlock your verified certificate of completion in Kling AI production.",
      },
    ],
    canva: [
      {
        title: "Canva Magic Studio",
        subtitle: "Unit 1 • AI Design Suite",
        desc: "Explore Magic Design, Magic Edit, Magic Expand, and AI Copywriter.",
      },
      {
        title: "Brand Kit & AI Templates",
        subtitle: "Unit 2 • Consistency",
        desc: "Automate social media assets, presentations, and marketing collateral.",
      },
      {
        title: "Bulk Content Generation",
        subtitle: "Unit 3 • Productivity",
        desc: "Combine CSV data with AI templates for 50+ posts in 2 minutes.",
      },
      {
        title: "Animation & Video AI",
        subtitle: "Unit 4 • Multimedia",
        desc: "Auto-translate designs, generate voiceovers, and edit short clips.",
      },
      {
        title: "Design Automation Assessment",
        subtitle: "Unit 5 • Skill Check",
        desc: "Demonstrate quick turnaround on multi-platform graphic assets.",
      },
      {
        title: "Canva AI Designer Certificate",
        subtitle: "Unit 6 • Capstone",
        desc: "Claim your shareable credential in AI-powered visual communication.",
      },
    ],
    cursor: [
      {
        title: "Cursor Setup & Indexing",
        subtitle: "Unit 1 • IDE Upgrade",
        desc: "Configure codebase indexing, .cursorrules, and custom model choices.",
      },
      {
        title: "Cmd+K & Composer Power",
        subtitle: "Unit 2 • Inline Editing",
        desc: "Generate multi-file features, inline diffs, and rapid refactoring.",
      },
      {
        title: "Agentic Bug Hunting",
        subtitle: "Unit 3 • Debugging",
        desc: "Use AI terminal diagnostics, stack trace analysis, and automated fixes.",
      },
      {
        title: "Full-Stack Feature Build",
        subtitle: "Unit 4 • Production",
        desc: "Build a complete Next.js app with authentication in under 30 minutes.",
      },
      {
        title: "AI Development Quiz",
        subtitle: "Unit 5 • Skill Check",
        desc: "Test keyboard shortcuts, prompt rules, and multi-file editing strategies.",
      },
      {
        title: "Cursor Developer Certificate",
        subtitle: "Unit 6 • Capstone",
        desc: "Verify your expertise in AI-assisted modern software engineering.",
      },
    ],
    lovable: [
      {
        title: "Lovable Web Builder Intro",
        subtitle: "Unit 1 • Fast Prototyping",
        desc: "Generate React components, Tailwind layouts, and interactive state.",
      },
      {
        title: "Using Lovable with Tools",
        subtitle: "Unit 2 • Integration",
        desc: "Connect Supabase backend, database schemas, and edge functions.",
      },
      {
        title: "Writing Website Copy",
        subtitle: "Unit 3 • UX & Tone",
        desc: "Craft high-converting landing page headlines, CTAs, and feature sections.",
      },
      {
        title: "Publishing & Sharing",
        subtitle: "Unit 4 • Deployment",
        desc: "Deploy custom domains, export clean GitHub repos, and optimize SEO.",
      },
      {
        title: "Full App Assessment",
        subtitle: "Unit 5 • Skill Check",
        desc: "Build a responsive web application from prompt to live domain.",
      },
      {
        title: "Lovable Full-Stack Certificate",
        subtitle: "Unit 6 • Capstone",
        desc: "Unlock your verified certificate in AI web app development.",
      },
    ],
    omni: [
      {
        title: "Omni Workspace Setup",
        subtitle: "Unit 1 • Multi-Model Hub",
        desc: "Configure unified access to Claude, GPT-4o, Llama 3, and Mistral.",
      },
      {
        title: "Model Routing & Cost",
        subtitle: "Unit 2 • Efficiency",
        desc: "Route simple tasks to light models and complex reasoning to heavy models.",
      },
      {
        title: "Automated Agent Chains",
        subtitle: "Unit 3 • Workflows",
        desc: "Chain research, drafting, reviewing, and publishing across models.",
      },
      {
        title: "Enterprise Security & Privacy",
        subtitle: "Unit 4 • Governance",
        desc: "Configure data encryption, team permissions, and API key management.",
      },
      {
        title: "Multi-Model Workflow Quiz",
        subtitle: "Unit 5 • Skill Check",
        desc: "Validate model selection strategy and automated agent architecture.",
      },
      {
        title: "Omni Master Certificate",
        subtitle: "Unit 6 • Capstone",
        desc: "Claim your verifiable certification in enterprise multi-model orchestration.",
      },
    ],
  };

  const topics = moduleTopicsMap[cleanSlug] || moduleTopicsMap["chatgpt"];

  const modules: CourseModule[] = [
    {
      id: "mod-1",
      number: 1,
      title: topics[0].title,
      subtitle: topics[0].subtitle,
      description: topics[0].desc,
      status: "completed",
      duration: "30 mins",
      xp: 150,
      lessons: [
        { id: "l-101", title: "Overview & Environment Tour", duration: "8 mins", completed: true, type: "video" },
        { id: "l-102", title: "First Interactive Prompt", duration: "12 mins", completed: true, type: "interactive" },
        { id: "l-103", title: "System Parameters & Settings", duration: "10 mins", completed: true, type: "video" },
      ],
    },
    {
      id: "mod-2",
      number: 2,
      title: topics[1].title,
      subtitle: topics[1].subtitle,
      description: topics[1].desc,
      status: "completed",
      duration: "45 mins",
      xp: 200,
      lessons: [
        { id: "l-201", title: "Prompt Structures & Formulas", duration: "15 mins", completed: true, type: "video" },
        { id: "l-202", title: "Zero-Shot vs Few-Shot Prompting", duration: "15 mins", completed: true, type: "interactive" },
        { id: "l-203", title: "Hands-on Exercise: Tone Modifier", duration: "15 mins", completed: true, type: "project" },
      ],
    },
    {
      id: "mod-3",
      number: 3,
      title: topics[2].title,
      subtitle: topics[2].subtitle,
      description: topics[2].desc,
      status: "current",
      duration: "50 mins",
      xp: 250,
      lessons: [
        { id: "l-301", title: "Building a Real Project Workflow", duration: "20 mins", completed: false, type: "project" },
        { id: "l-302", title: "Handling Edge Cases & Errors", duration: "15 mins", completed: false, type: "video" },
        { id: "l-303", title: "Interactive Challenge", duration: "15 mins", completed: false, type: "interactive" },
      ],
    },
    {
      id: "mod-4",
      number: 4,
      title: topics[3].title,
      subtitle: topics[3].subtitle,
      description: topics[3].desc,
      status: "locked",
      duration: "55 mins",
      xp: 300,
      lessons: [
        { id: "l-401", title: "Advanced Automation Techniques", duration: "25 mins", completed: false, type: "video" },
        { id: "l-402", title: "Custom Knowledge Base Integration", duration: "30 mins", completed: false, type: "project" },
      ],
    },
    {
      id: "mod-5",
      number: 5,
      title: topics[4].title,
      subtitle: topics[4].subtitle,
      description: topics[4].desc,
      status: "locked",
      duration: "25 mins",
      xp: 200,
      lessons: [
        { id: "l-501", title: "Comprehensive Knowledge Assessment", duration: "25 mins", completed: false, type: "quiz" },
      ],
    },
    {
      id: "mod-6",
      number: 6,
      title: topics[5].title,
      subtitle: topics[5].subtitle,
      description: topics[5].desc,
      status: "locked",
      duration: "10 mins",
      xp: 500,
      lessons: [
        { id: "l-601", title: "Final Capstone Verification & Certificate Claim", duration: "10 mins", completed: false, type: "project" },
      ],
    },
  ];

  const resources: CourseResource[] = [
    {
      id: "res-1",
      title: `${course.title} Ultimate Cheatsheet PDF`,
      type: "pdf",
      sizeOrMeta: "2.4 MB • Updated July 2026",
      description: "Quick reference guide with top 50 proven prompts, shortcuts, and syntax templates.",
      linkText: "Download PDF",
    },
    {
      id: "res-2",
      title: "Interactive Lecture Notes & Summaries",
      type: "notes",
      sizeOrMeta: "Markdown • 12 Articles",
      description: "Searchable chapter notes, code snippets, and key takeaway summaries.",
      linkText: "View Notes",
    },
    {
      id: "res-3",
      title: "Starter Practice Files & Templates",
      type: "files",
      sizeOrMeta: "ZIP Archive • 15.8 MB",
      description: "Pre-configured project templates, dataset samples, and starter code repositories.",
      linkText: "Download ZIP",
    },
    {
      id: "res-4",
      title: "Student Community & Support Forum",
      type: "community",
      sizeOrMeta: "2,420 Active Members",
      description: "Connect with fellow AI builders, get project feedback, and ask instructors questions.",
      linkText: "Join Community",
    },
  ];

  const badges: CourseBadge[] = [
    {
      id: "badge-1",
      name: "Prompt Master",
      description: "Completed 10 interactive prompt challenges",
      icon: "Sparkles",
      bgColor: "#E6F9F0",
      borderColor: "#9DD9C5",
      textColor: "#0E8566",
      unlocked: true,
    },
    {
      id: "badge-2",
      name: "Fast Learner",
      description: "Maintained a 3-day active learning streak",
      icon: "Zap",
      bgColor: "#F3F0FE",
      borderColor: "#C4BDFA",
      textColor: "#4B3FBF",
      unlocked: true,
    },
    {
      id: "badge-3",
      name: "Project Builder",
      description: "Successfully submitted Capstone Unit 3 project",
      icon: "Hammer",
      bgColor: "#FFF0F5",
      borderColor: "#FFC9DE",
      textColor: "#C0336A",
      unlocked: true,
    },
    {
      id: "badge-4",
      name: "Streak Champion",
      description: "Earned 450+ XP in a single week",
      icon: "Trophy",
      bgColor: "#EBF8FF",
      borderColor: "#BEE3F8",
      textColor: "#2B6CB0",
      unlocked: false,
    },
  ];

  // Pick a recommended next course deterministically to prevent hydration errors
  const otherCourses = COURSES.filter(
    (c) => c.id.replace("course-", "") !== cleanSlug
  );
  const deterministicIndex = cleanSlug.length % otherCourses.length;
  const recommendedSlug =
    otherCourses[deterministicIndex].id.replace("course-", "");

  return {
    slug: cleanSlug,
    course,
    fullTitle: `${course.title} Mastery: Interactive Learning Pathway`,
    lastUpdated: "July 2026",
    level: "Beginner to Advanced",
    completedModulesCount: 2,
    totalModulesCount: 6,
    progressPercent: 33,
    timeSpent: "1h 15m",
    currentStreak: "3 Days 🔥",
    xpEarned: 350,
    modules,
    resources,
    badges,
    recommendedSlug,
  };
}
