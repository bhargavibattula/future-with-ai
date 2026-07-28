import { AICourse, COURSES } from "@/data/courses";

export interface CourseQuizQuestion {
  id?: string;
  type: "fill_blank" | "true_false" | "matching" | "order" | "mcq";
  question: string;
  options?: string[];
  matchingPairs?: { item: string; functionText: string }[];
  orderItems?: string[];
  answer: string;
  explanation?: string;
}

export interface CourseQuiz {
  id?: string;
  title: string;
  xpReward?: number;
  questions: CourseQuizQuestion[];
}

export interface LessonContentSection {
  type: "heading" | "paragraph" | "callout" | "code" | "note" | "tip" | "warning" | "example" | "image" | "table";
  title?: string;
  content?: string;
  code?: string;
  language?: string;
  variant?: "info" | "tip" | "warning" | "success";
  imageUrl?: string;
  imageAlt?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
}

export interface CourseLesson {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  estimatedDuration: string;
  readingTimeMinutes?: number;
  duration?: string;
  order: number;
  completed: boolean;
  locked: boolean;
  type: "video" | "interactive" | "quiz" | "project" | "reading";
  contentSections?: LessonContentSection[];
  xpReward?: number;
}

export interface CourseModule {
  id: string;
  number: number;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  status: "completed" | "current" | "locked";
  duration: string;
  completionPercentage: number;
  lessonCount: number;
  xp: number;
  quiz?: CourseQuiz;
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

// User Learning State stored in localStorage
export interface UserCourseProgressState {
  completedLessonIds: string[]; // e.g. ["l-101", "l-102"]
  completedModuleIds: string[]; // e.g. ["mod-1"]
  quizScores: Record<string, number>; // e.g. {"mod-1": 100}
  totalXp: number;
  currentStreakDays: number;
  lastActiveDate: string;
}

// Complete 12-Module Lovable Curriculum Data Structure with Detailed Reading Content & Code Sections
export const LOVABLE_CURRICULUM_MODULES: CourseModule[] = [
  {
    id: "mod-1",
    number: 1,
    order: 1,
    title: "Lovable Fundamentals: The AI Workspace and Cloud Architecture",
    subtitle: "Module 1 • Fundamentals",
    description: "Master AI-native engineering, workspace navigation, Lovable Cloud infrastructure, credit governance, and core security scanners.",
    status: "current",
    duration: "45 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 250,
    quiz: {
      id: "quiz-mod-1",
      title: "Module 1 Quiz: Lovable Fundamentals & Architecture",
      xpReward: 100,
      questions: [
        {
          id: "q-1-1",
          type: "fill_blank",
          question: "Lovable provides built-in application protection using two core security scanners called the Basic scan and the ______________ scan.",
          answer: "Deep",
          explanation: "The Deep scan performs an exhaustive agentic review across the entire codebase to detect complex access-control issues and exposed secrets."
        },
        {
          id: "q-1-2",
          type: "true_false",
          question: "Applications created in Lovable are restricted to static visual templates and cannot execute real, compilable React and TypeScript code.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Lovable compiles real React, TypeScript, and Tailwind CSS code dynamically under the hood."
        },
        {
          id: "q-1-3",
          type: "matching",
          question: "Match each item with its corresponding function:",
          matchingPairs: [
            { item: "A. Live Preview Canvas", functionText: "1. Displays live, interactive application updates side-by-side as code runs." },
            { item: "B. Lovable Cloud", functionText: "2. Supplies integrated database, storage, authentication, and hosting features." },
            { item: "C. Secret Vault", functionText: "3. Encrypts and securely stores third-party credentials and keys." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Each component serves a critical role in the dual-panel developer workspace."
        },
        {
          id: "q-1-4",
          type: "order",
          question: "Sequence the following steps correctly:",
          orderItems: [
            "1. Review the initial prototype rendering inside the live preview canvas.",
            "2. Open the Lovable workspace and type a comprehensive natural language prompt.",
            "3. Execute the prompt so the AI agent generates the initial full-stack code.",
          ],
          answer: "2 -> 3 -> 1",
          explanation: "You first input a clear prompt, allow the AI agent to execute code, and then review the rendered result."
        },
        {
          id: "q-1-5",
          type: "mcq",
          question: "Which underlying database architecture powers the built-in Lovable Cloud backend?",
          options: [
            "A) MongoDB",
            "B) SQLite",
            "C) PostgreSQL",
            "D) Firebase Realtime Database",
          ],
          answer: "C) PostgreSQL",
          explanation: "Lovable Cloud builds directly on top of an open-source PostgreSQL relational database foundation."
        },
      ],
    },
    lessons: [
      {
        id: "l-101",
        order: 1,
        title: "Section 1.1: The Paradigm Shift in AI-Native Engineering",
        description: "Understand how Lovable compiles real React, TypeScript, and Tailwind CSS code dynamically rather than restricting creators to fixed template drag-and-drop elements.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: false,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "What is AI-Native Software Engineering?"
          },
          {
            type: "paragraph",
            content: "Lovable is an AI-native full-stack software development platform. Traditional software engineering required developers to hand-write code across frontend interfaces, backend services, database systems, and hosting configurations. Lovable changes this by acting as an AI product engineer that interprets human intent expressed in plain natural language, then generates, executes, and refines production-grade code in real time."
          },
          {
            type: "callout",
            variant: "info",
            title: "Key Takeaway",
            content: "The essential difference between a traditional template builder and Lovable lies in the generation model. Drag-and-drop builders assemble fixed elements and enforce rigid structural limits. Lovable compiles real code under the hood - React, TypeScript, and Tailwind CSS - so a creator is never blocked by the ceiling of a template."
          },
          {
            type: "heading",
            title: "Code Compilation vs Template Builders"
          },
          {
            type: "table",
            tableHeaders: ["Feature", "Traditional Template Builders", "Lovable AI Platform"],
            tableRows: [
              ["Underlying Tech", "Pre-built drag & drop components", "Real React, TypeScript, Tailwind CSS"],
              ["Customization", "Constrained by template options", "Unlimited full-stack code customization"],
              ["Backend", "Third-party embeds or locked APIs", "Integrated PostgreSQL & Serverless Functions"],
              ["Exportability", "Locked within vendor platform", "Exportable GitHub repository & clean code"]
            ]
          },
          {
            type: "code",
            title: "Generated Full-Stack Component Example",
            language: "tsx",
            code: `// Lovable generates standard production-ready TypeScript code:
export function EngineeringHero({ title }: { title: string }) {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className="mt-2 text-purple-100">Compiled dynamically via AI engineering intent.</p>
    </div>
  );
}`
          },
          {
            type: "note",
            title: "Pro-Tip for Engineers",
            content: "Because Lovable generates raw code, you can inspect git history, edit files directly, or plug in standard npm packages whenever needed."
          }
        ]
      },
      {
        id: "l-102",
        order: 2,
        title: "Section 1.2: Workspace Architecture and Navigation",
        description: "Explore the dual-panel sandbox interface combining Chat/Prompt controls, the Live Preview Canvas, and Workspace Toolbars.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "The Dual-Panel Sandbox Workspace"
          },
          {
            type: "paragraph",
            content: "A Lovable project opens into a dual-panel sandbox interface designed for high-velocity iteration:"
          },
          {
            type: "callout",
            variant: "tip",
            title: "Workspace Panels",
            content: "1. The Chat/Prompt Interface: your primary input control, where you instruct the AI agent, paste error logs, upload wireframe screenshots, or request structural modifications.\n2. The Live Preview Canvas: an interactive sandbox that renders the application in real time as code is written and executed.\n3. The Workspace Toolbar: quick access to version history, project settings, cloud service controls, database connections, and hosting configuration panels."
          },
          {
            type: "code",
            title: "Inspecting Workspace Logs",
            language: "bash",
            code: `# You can view live build feedback inside the preview console:
[Lovable Agent] Parsing user prompt specification...
[Lovable Agent] Creating component: src/components/Dashboard.tsx
[Lovable Agent] Hot reloading sandbox preview canvas... Done in 240ms`
          }
        ]
      },
      {
        id: "l-103",
        order: 3,
        title: "Section 1.3: Lovable Cloud Services",
        description: "Dive into integrated PostgreSQL databases, user auth protocols, storage buckets, secret management vaults, and managed serverless functions.",
        estimatedDuration: "12 mins",
        readingTimeMinutes: 6,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Out-of-the-Box Backend Infrastructure"
          },
          {
            type: "paragraph",
            content: "Lovable ships with a built-in backend known as Lovable Cloud. Instead of purchasing third-party hosting, provisioning remote databases, or writing manual server logic, you receive integrated infrastructure out of the box:"
          },
          {
            type: "note",
            title: "Lovable Cloud Core Stack",
            content: "1. Built-in Database: an open-source PostgreSQL foundation for relational data storage.\n2. User Authentication: pre-built protocols for signup, sign-in, and session persistence.\n3. Storage Buckets: cloud containers for raw files, avatars, and media assets.\n4. Secret Management: encrypted vaults that hold third-party API keys without exposing them to client-side code.\n5. Server-Side Functions: managed serverless execution for payments, emails, and privileged database work."
          }
        ]
      },
      {
        id: "l-104",
        order: 4,
        title: "Section 1.4: The Credit System and Workspace Governance",
        description: "Learn compute and AI token resource allocation across simple refactors and complex multi-file schemas.",
        estimatedDuration: "7 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Managing Operational Usage"
          },
          {
            type: "paragraph",
            content: "Operational usage relies on a credit-based system. Credits represent the compute and AI token resources consumed during generation, refactoring, migrations, and media creation."
          },
          {
            type: "warning",
            title: "Credit Consumption Rules",
            content: "• Simple refactoring tasks such as removing a footer or changing a button color consume small credit amounts.\n• Complex multi-file tasks such as schema creation, multi-route authentication, or external API integration consume larger volumes because of deep code execution requirements."
          }
        ]
      },
      {
        id: "l-105",
        order: 5,
        title: "Section 1.5: Security Scanners and Code Governance",
        description: "Audit npm dependencies, Row Level Security policies, and deep agentic vulnerability scans across the codebase.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Integrated Security Scanners"
          },
          {
            type: "paragraph",
            content: "Security is integrated into the ecosystem through two core scanners:"
          },
          {
            type: "callout",
            variant: "warning",
            title: "Basic vs Deep Scan",
            content: "• Basic Scan: fast dependency and configuration review. It checks Row Level Security policies, audits npm dependencies for known vulnerabilities, and reviews schema permissions.\n• Deep Scan: a thorough agentic review across the whole codebase. It identifies access-control issues, surfaces backend function vulnerabilities, detects exposed credentials or unsafe inputs, and verifies that private user data is isolated."
          }
        ]
      }
    ]
  },
  {
    id: "mod-2",
    number: 2,
    order: 2,
    title: "Prompt Engineering for Application Generation",
    subtitle: "Module 2 • Specification & Logic",
    description: "Master engineering prompt specifications, the C.L.E.A.R. framework, incremental scoping, multimodal inputs, and version control safety nets.",
    status: "locked",
    duration: "40 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 250,
    quiz: {
      id: "quiz-mod-2",
      title: "Module 2 Quiz: Prompt Engineering & C.L.E.A.R. Framework",
      xpReward: 100,
      questions: [
        {
          id: "q-2-1",
          type: "fill_blank",
          question: "Asking the agent to plan and discuss an approach before writing any code is best done in ______________ mode.",
          answer: "Chat (planning)",
          explanation: "Planning mode enables architectural exploration prior to triggering code edits."
        },
        {
          id: "q-2-2",
          type: "true_false",
          question: "Combining ten unrelated feature requests into one long prompt is the recommended way to reduce credit usage.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Large single prompts increase blast radius and credit consumption; incremental prompts are cheaper and safer."
        },
        {
          id: "q-2-3",
          type: "matching",
          question: "Match each C.L.E.A.R. element with its function:",
          matchingPairs: [
            { item: "A. Context", functionText: "1. Explains what the product is and who will use it." },
            { item: "B. Restrictions", functionText: "2. States what the agent must not modify or introduce." },
            { item: "C. Appearance", functionText: "3. Describes the visual direction, tone, and layout." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "The C.L.E.A.R. framework enforces complete requirement specifications."
        },
        {
          id: "q-2-4",
          type: "order",
          question: "Sequence incremental prompting steps:",
          orderItems: [
            "1. Prompt the single next feature with clear constraints.",
            "2. Describe the product context and goal in chat mode.",
            "3. Review the generated result in the preview and refine or revert.",
          ],
          answer: "2 -> 1 -> 3",
          explanation: "Setup context first, prompt one feature incrementally, and review before moving forward."
        },
        {
          id: "q-2-5",
          type: "mcq",
          question: "Which prompt is most likely to produce the intended result?",
          options: [
            "A) “Make it better.”",
            "B) “Add stuff to the dashboard.”",
            "C) “On the dashboard, add a revenue card showing this month’s total from the orders table, using the existing card style.”",
            "D) “Redesign everything.”",
          ],
          answer: "C",
          explanation: "Option C follows the C.L.E.A.R. framework by detailing exact location, entity source, and styling constraints."
        },
      ],
    },
    lessons: [
      {
        id: "l-201",
        order: 1,
        title: "Section 2.1: Why Prompting Is an Engineering Discipline",
        description: "Treat prompts as product requirements documents specifying context, goals, constraints, and acceptance criteria.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "1. Prompts as Production Software Specifications"
          },
          {
            type: "paragraph",
            content: "A prompt in Lovable is a specification, not a wish. The agent converts your sentence into files, routes, tables, and styles. Vague input produces plausible but generic output; precise input produces the application you actually intended. Treat every prompt as a short product requirements document: context, goal, constraints, and acceptance criteria."
          },
          {
            type: "callout",
            variant: "info",
            title: "Specification Components",
            content: "• Context: What the app is and who uses it.\n• Goal: What user problem is being solved.\n• Constraints: What technical limits or existing code must remain untouched.\n• Acceptance Criteria: The exact conditions for a successful generation."
          },
          {
            type: "heading",
            title: "2. Comparing Casual Prompts vs Production Specifications"
          },
          {
            type: "table",
            tableHeaders: ["Prompt Quality", "Example Input", "Generated Result", "Rework Required"],
            tableRows: [
              ["Vague / Casual", "'Make a nice user profile page.'", "Generic placeholder inputs, missing DB sync", "Extremely High"],
              ["Engineering Spec", "'On /profile, render user name, avatar, and email from public.profiles table using existing Input components. Keep background semantic tokens.'", "Production-grade, typed component wired to DB", "Zero (Passes acceptance criteria)"]
            ]
          }
        ]
      },
      {
        id: "l-202",
        order: 2,
        title: "Section 2.2: The C.L.E.A.R. Prompt Framework",
        description: "Apply Context, Logic, Elements, Appearance, and Restrictions to write deterministic AI specifications.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "1. Deconstructing the C.L.E.A.R. Blueprint"
          },
          {
            type: "paragraph",
            content: "The C.L.E.A.R. framework is a industry standard blueprint engineered to generate deterministic, production-ready code with zero ambiguity:"
          },
          {
            type: "note",
            title: "C.L.E.A.R. Core Breakdown",
            content: "• C - Context: State the application purpose & active route.\n• L - Logic: Define business rules, database queries, and conditional states.\n• E - Elements: List exact UI components, form inputs, or table columns.\n• A - Appearance: Specify color tokens, layout flex/grid direction, and spacing.\n• R - Restrictions: Declare what must NOT be changed or broken."
          },
          {
            type: "heading",
            title: "2. Industry Example"
          },
          {
            type: "example",
            title: "C.L.E.A.R. Blueprint In Action",
            content: "Context: On the customer booking dashboard (/bookings).\nLogic: Add a cancellation button visible only to the booking owner. Ask for dialog confirmation, update status to 'cancelled' in public.bookings, and send confirmation toast.\nElements: Use the existing Button, Dialog, and Toast components.\nAppearance: Red outline variant for cancellation, aligned right.\nRestrictions: Do NOT modify existing table sorting or pagination controls."
          }
        ]
      },
      {
        id: "l-203",
        order: 3,
        title: "Section 2.3: Incremental Prompting and Scope Control",
        description: "Manage prompt blast radius with single-intention iterations to save credits and enable clean rollbacks.",
        estimatedDuration: "7 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "1. The Principle of Single-Intention Iteration"
          },
          {
            type: "paragraph",
            content: "In AI-native software engineering, blast radius is the primary metric of developer risk. When you issue a prompt containing ten separate feature requirements, the AI agent is forced to edit multiple components, database schemas, edge functions, and state hooks simultaneously. If an error occurs in step 7, diagnosing the root cause becomes significantly more complex, and rolling back forces you to lose the work accomplished in steps 1 through 6."
          },
          {
            type: "callout",
            variant: "tip",
            title: "The Gold Standard Engineering Workflow",
            content: "Always structure application generation into isolated, sequential prompt iterations:\n1. Interface Scaffold: Generate the UI layout & mock components.\n2. Data Schema: Create the underlying database tables and relationships.\n3. Logic & Permissions: Attach Row Level Security (RLS) policies and state handlers.\n4. Visual Polish: Add responsiveness, dark mode semantic tokens, and animations."
          },
          {
            type: "heading",
            title: "2. Blast Radius Comparison"
          },
          {
            type: "table",
            tableHeaders: ["Prompting Strategy", "Credit Cost", "Debugging Difficulty", "Rollback Safety"],
            tableRows: [
              ["Monolithic (1 Long Prompt)", "High Token Overhead", "Extremely High (Multi-file blast radius)", "Poor (Must revert entire build)"],
              ["Incremental (1 Intention / Prompt)", "Low & Focused", "Low (Isolated to 1 file/feature)", "Optimal (1-click snapshot restore)"]
            ]
          },
          {
            type: "heading",
            title: "3. Concrete Real-World Code Example"
          },
          {
            type: "code",
            title: "Incremental Prompting Sequence Example",
            language: "markdown",
            code: `<!-- PROMPT 1: Build UI Scaffold -->
"On the Analytics page, build a responsive grid with 3 statistic cards (Total Sales, Active Users, Revenue) using the existing Card and Skeleton components."

<!-- PROMPT 2: Attach Data Query -->
"Connect the statistic cards to query aggregate totals from the public.orders table using Supabase client, showing a loading state while fetching."

<!-- PROMPT 3: Add Action Logic & Permissions -->
"Add an Export CSV button on the top right that triggers a download of this month's orders, enabled only for users with the 'admin' role."`
          },
          {
            type: "note",
            title: "Pro-Tip: Saving Platform Credits",
            content: "Small, tightly scoped prompts consume up to 60% fewer platform credits because the agent's context window stays clean and targeted without reprocessing extraneous project files."
          }
        ]
      },
      {
        id: "l-204",
        order: 4,
        title: "Section 2.4: Multimodal and Reference-Driven Prompts",
        description: "Utilize wireframes, brand palettes, screenshots, and error logs for precise visual guidance.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Leveraging Visual Context"
          },
          {
            type: "paragraph",
            content: "Screenshots, wireframes, brand palettes, and pasted error logs are all valid prompt inputs. Uploading a reference image and writing “match this spacing and typography, keep my existing colour tokens” is usually more effective than describing a layout in words."
          }
        ]
      },
      {
        id: "l-205",
        order: 5,
        title: "Section 2.5: Chat Mode, Planning, and Version History",
        description: "Explore codebase architecture in planning mode and leverage version snapshots as safety nets.",
        estimatedDuration: "7 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Planning & Version Control Safety"
          },
          {
            type: "paragraph",
            content: "Use chat or planning mode to discuss an approach before any code is written; the agent will explore the codebase and propose a plan. Version history acts as your safety net - restore a previous state instead of prompting your way out of a broken build."
          }
        ]
      }
    ]
  },
  {
    id: "mod-3",
    number: 3,
    order: 3,
    title: "Building the User Interface",
    subtitle: "Module 3 • Design & Components",
    description: "Learn component-driven architecture, semantic design tokens, responsive layouts, routing hierarchy, and accessible micro-animations.",
    status: "locked",
    duration: "45 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 250,
    quiz: {
      id: "quiz-mod-3",
      title: "Module 3 Quiz: UI & Component Architecture",
      xpReward: 100,
      questions: [
        {
          id: "q-3-1",
          type: "fill_blank",
          question: "Reusable colour and spacing values defined once and referenced everywhere are called semantic design ______________.",
          answer: "tokens",
          explanation: "Tokens allow global styling updates across light and dark themes."
        },
        {
          id: "q-3-2",
          type: "true_false",
          question: "Hard-coding hex colour values inside individual components is the recommended way to keep theming consistent.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Hard-coded hex values defeat semantic theming and should be avoided."
        },
        {
          id: "q-3-3",
          type: "matching",
          question: "Match each UI concept with its function:",
          matchingPairs: [
            { item: "A. Design tokens", functionText: "1. Central values that drive theming across the whole app." },
            { item: "B. Breakpoints", functionText: "2. Thresholds where the layout adapts to screen width." },
            { item: "C. Layout route", functionText: "3. Holds shared chrome that child pages inherit." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Design tokens, breakpoints, and layout routes form the core UI foundation."
        },
        {
          id: "q-3-4",
          type: "order",
          question: "Sequence the UI build order:",
          orderItems: [
            "1. Compose the page from small reusable components.",
            "2. Define the design system tokens for colour and typography.",
            "3. Add responsive behaviour and motion polish.",
          ],
          answer: "2 -> 1 -> 3",
          explanation: "Establish tokens first, assemble modular components, and apply responsive polish last."
        },
        {
          id: "q-3-5",
          type: "mcq",
          question: "Which practice best supports both accessibility and SEO?",
          options: [
            "A) Using images with descriptive alt text",
            "B) Removing all headings",
            "C) Rendering text inside images",
            "D) Disabling keyboard focus outlines",
          ],
          answer: "A",
          explanation: "Alt text provides context for screen readers and web search crawlers."
        },
      ],
    },
    lessons: [
      {
        id: "l-301",
        order: 1,
        title: "Section 3.1: The Component Model",
        description: "Compose interfaces using modular React components styled with Tailwind CSS for safer, cheaper edits.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Modular React Component Composition"
          },
          {
            type: "paragraph",
            content: "Lovable generates React components styled with Tailwind CSS and commonly assembled from an accessible component library. Interfaces are composed from small, single-purpose components - a card, a table row, a dialog - rather than one enormous page file. Smaller components mean cheaper, safer edits later."
          }
        ]
      },
      {
        id: "l-302",
        order: 2,
        title: "Section 3.2: Design Systems and Semantic Tokens",
        description: "Centralize color, spacing, radius, and typography with semantic tokens for seamless light and dark mode support.",
        estimatedDuration: "9 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Semantic Color Tokens"
          },
          {
            type: "paragraph",
            content: "Colour, spacing, radius, and typography belong in a central design system rather than scattered through components. Semantic tokens such as background, foreground, primary, muted, and accent let you restyle an entire application from one place and keep light and dark themes consistent. Hard-coded colour values defeat this and should be avoided."
          }
        ]
      },
      {
        id: "l-303",
        order: 3,
        title: "Section 3.3: Layout, Responsiveness, and Hierarchy",
        description: "Build robust flexbox and grid layouts adapted to mobile, tablet, and desktop breakpoints.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Responsive Flexbox & Grid Layouts"
          },
          {
            type: "paragraph",
            content: "Layouts are built with flexbox and grid utilities and adapted at breakpoints for mobile, tablet, and desktop. Strong interfaces establish hierarchy through scale, weight, and whitespace before adding decoration. Always request an explicit mobile behaviour; the agent cannot infer what should collapse or stack."
          }
        ]
      },
      {
        id: "l-304",
        order: 4,
        title: "Section 3.4: Navigation and Routing",
        description: "Structure distinct routes with shared root layout chrome including headers, sidebars, and footers.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "App Router Layout Hierarchy"
          },
          {
            type: "paragraph",
            content: "Distinct content sections deserve distinct routes rather than anchors on a single endless page. Shared chrome - header, sidebar, footer - lives in a root or layout route so every child page inherits it automatically."
          }
        ]
      },
      {
        id: "l-305",
        order: 5,
        title: "Section 3.5: Imagery, Icons, and Motion",
        description: "Enhance accessibility with alt text, curated icon sets, and restrained micro-animations.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Purposeful UI Motion & Alt Text"
          },
          {
            type: "paragraph",
            content: "Generated or curated images, an icon set, and restrained motion complete an interface. Animation should support comprehension - state changes, entrances, feedback - not compete with the content. Every image needs meaningful alternative text for accessibility and search visibility."
          }
        ]
      }
    ]
  },
  {
    id: "mod-4",
    number: 4,
    order: 4,
    title: "Database and Supabase Fundamentals",
    subtitle: "Module 4 • Data & Security",
    description: "Understand relational schema design, SQL migrations, Row Level Security (RLS) policies, API role grants, and storage buckets.",
    status: "locked",
    duration: "50 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 300,
    quiz: {
      id: "quiz-mod-4",
      title: "Module 4 Quiz: Database & RLS Policies",
      xpReward: 100,
      questions: [
        {
          id: "q-4-1",
          type: "fill_blank",
          question: "The Postgres feature that evaluates a policy on every individual row before a read or write is allowed is called ______________ ______________ Security.",
          answer: "Row Level",
          explanation: "Row Level Security (RLS) evaluates access policies for each record."
        },
        {
          id: "q-4-2",
          type: "true_false",
          question: "Enabling Row Level Security automatically grants the API roles the privileges they need on a newly created table.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Enabling RLS restricts access; explicit grant statements are also needed."
        },
        {
          id: "q-4-3",
          type: "matching",
          question: "Match each database concept with its definition:",
          matchingPairs: [
            { item: "A. Foreign key", functionText: "1. Expresses a relationship between two tables." },
            { item: "B. Migration", functionText: "2. Versioned SQL that changes the schema reproducibly." },
            { item: "C. Storage bucket", functionText: "3. Holds binary files such as images and documents." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Foreign keys link tables, migrations manage versioning, and storage buckets hold binary assets."
        },
        {
          id: "q-4-4",
          type: "order",
          question: "Sequence database setup steps:",
          orderItems: [
            "1. Enable Row Level Security and write access policies.",
            "2. Model the entities and their relationships.",
            "3. Create the table and grant the required privileges.",
          ],
          answer: "2 -> 3 -> 1",
          explanation: "Model entity relationships first, construct tables with role grants, then attach RLS policies."
        },
        {
          id: "q-4-5",
          type: "mcq",
          question: "Where should uploaded profile pictures be kept?",
          options: [
            "A) Encoded as text inside a table column",
            "B) In a storage bucket, with the table holding a reference",
            "C) In browser local storage",
            "D) In the application source code",
          ],
          answer: "B",
          explanation: "Binary files belong in storage buckets, while database rows hold reference URL strings."
        },
      ],
    },
    lessons: [
      {
        id: "l-401",
        order: 1,
        title: "Section 4.1: Relational Thinking",
        description: "Model application entities and relationships using primary and foreign keys on PostgreSQL.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Relational Modeling with Postgres"
          },
          {
            type: "paragraph",
            content: "The Lovable backend is PostgreSQL. Data is modelled as tables of rows and columns, with relationships expressed through foreign keys. Before prompting for a feature, describe the entities and how they relate: a user has many projects, a project has many tasks, a task belongs to one assignee."
          }
        ]
      },
      {
        id: "l-402",
        order: 2,
        title: "Section 4.2: Schema Design and Migrations",
        description: "Apply reproducible versioned SQL migrations for tables, constraints, and reference data.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "SQL Schema Migrations"
          },
          {
            type: "paragraph",
            content: "Schema changes are applied as migrations - versioned SQL statements that create tables, add columns, define constraints, and seed reference data. Migrations make database state reproducible and reviewable rather than something that drifts silently."
          }
        ]
      },
      {
        id: "l-403",
        order: 3,
        title: "Section 4.3: Row Level Security",
        description: "Enforce strict row-level access policies so clients interact safely with database tables directly.",
        estimatedDuration: "12 mins",
        readingTimeMinutes: 6,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Securing Tables with RLS Policies"
          },
          {
            type: "paragraph",
            content: "Row Level Security is the core protection model. With RLS enabled, every read and write is evaluated against a policy that decides whether the requesting user may touch that specific row. A table without RLS is effectively public; a table with well-written policies is safe even though the client talks to the database directly."
          }
        ]
      },
      {
        id: "l-404",
        order: 4,
        title: "Section 4.4: Grants and the Data API",
        description: "Configure narrow API role permissions and grants to prevent security policy bypasses.",
        estimatedDuration: "9 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Role Privilege Grants"
          },
          {
            type: "paragraph",
            content: "Enabling RLS is not sufficient on its own. The database roles used by the API must also be granted privileges on each new table, and those grants should be as narrow as the policies allow - read-only for anonymous visitors, full access only where a policy genuinely permits it."
          }
        ]
      },
      {
        id: "l-405",
        order: 5,
        title: "Section 4.5: Querying, Indexing, and Storage",
        description: "Optimize queries with indexing and manage binary assets inside secure Supabase storage buckets.",
        estimatedDuration: "9 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Typed Queries & Storage Buckets"
          },
          {
            type: "paragraph",
            content: "Applications read data through a typed client, filtering and sorting in the database rather than in the browser. Indexes make frequent filters fast. Binary content - avatars, documents, exports - belongs in storage buckets with their own access rules, while the table stores only the reference."
          }
        ]
      }
    ]
  },
  {
    id: "mod-5",
    number: 5,
    order: 5,
    title: "Authentication, Roles, and Access Control",
    subtitle: "Module 5 • Identity & RBAC",
    description: "Implement user authentication, session persistence, protected route guards, dedicated roles tables, and account lifecycles.",
    status: "locked",
    duration: "40 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 250,
    quiz: {
      id: "quiz-mod-5",
      title: "Module 5 Quiz: Authentication & Dedicated Roles",
      xpReward: 100,
      questions: [
        {
          id: "q-5-1",
          type: "fill_blank",
          question: "User roles must be stored in a separate ______________ table rather than on the editable user profile row.",
          answer: "user_roles",
          explanation: "Storing roles on editable profile rows enables privilege escalation vulnerabilities."
        },
        {
          id: "q-5-2",
          type: "true_false",
          question: "Checking a value in browser local storage is an acceptable way to confirm that a user is an administrator.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Local storage can be tampered with by clients; authorization checks must happen server-side or via security-definer DB functions."
        },
        {
          id: "q-5-3",
          type: "matching",
          question: "Match each auth term with its function:",
          matchingPairs: [
            { item: "A. Authentication", functionText: "1. Establishes who the user is." },
            { item: "B. Authorisation", functionText: "2. Determines what the user is permitted to do." },
            { item: "C. Route guard", functionText: "3. Redirects anonymous visitors away from protected pages." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Authentication proves identity while authorization dictates permissions."
        },
        {
          id: "q-5-4",
          type: "order",
          question: "Sequence auth integration steps:",
          orderItems: [
            "1. Guard the protected routes and redirect anonymous visitors.",
            "2. Enable authentication and build the sign-up and sign-in screens.",
            "3. Add a roles table and enforce permissions through policies.",
          ],
          answer: "2 -> 1 -> 3",
          explanation: "Build login screens first, attach route guards, then configure role permission policies."
        },
        {
          id: "q-5-5",
          type: "mcq",
          question: "Which storage location for a user’s role is safe from privilege escalation?",
          options: [
            "A) A field on the user-editable profile row",
            "B) A dedicated roles table checked by a security-definer function",
            "C) A cookie set by the browser",
            "D) A hidden form input",
          ],
          answer: "B",
          explanation: "A security-definer function querying a separate roles table prevents client-side tampering."
        },
      ],
    },
    lessons: [
      {
        id: "l-501",
        order: 1,
        title: "Section 5.1: Authentication Versus Authorisation",
        description: "Differentiate user identity verification from permission policies and role checks.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Identity vs Permission Enforcement"
          },
          {
            type: "paragraph",
            content: "Authentication answers who is this user; authorisation answers what may this user do. The two are implemented separately: a session proves identity, while policies and role checks govern permissions."
          }
        ]
      },
      {
        id: "l-502",
        order: 2,
        title: "Section 5.2: Sign-Up, Sign-In, and Session Persistence",
        description: "Configure email, magic link, and social OAuth authentication with automated token refreshes.",
        estimatedDuration: "9 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Session Tokens & Providers"
          },
          {
            type: "paragraph",
            content: "The built-in auth system supports email and password sign-up, magic links, and managed social providers such as Google and Apple. Sessions persist across reloads and refresh automatically, and the client library exposes the current user to the interface."
          }
        ]
      },
      {
        id: "l-503",
        order: 3,
        title: "Section 5.3: Protected Routes and Redirects",
        description: "Implement client-side route guards to protect data fetching and prevent unauthorized screen access.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Route Guarding"
          },
          {
            type: "paragraph",
            content: "Pages that require a session live behind a route guard that redirects anonymous visitors to the sign-in page before any protected data is requested. Guarding only the visual component while still fetching protected data is a common and serious mistake."
          }
        ]
      },
      {
        id: "l-504",
        order: 4,
        title: "Section 5.4: Roles Must Live in Their Own Table",
        description: "Prevent privilege escalation by decoupling roles into dedicated tables evaluated by security-definer functions.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Decoupled RBAC Tables"
          },
          {
            type: "paragraph",
            content: "User roles must never be stored on the profile row that a user can edit; doing so invites privilege escalation. Roles belong in a dedicated table, checked through a security-definer function that policies call. Never decide administrative rights from browser storage or client state."
          }
        ]
      },
      {
        id: "l-505",
        order: 5,
        title: "Section 5.5: Profiles and Account Lifecycle",
        description: "Automate user profile creation, password resets, email updates, and account deletion flows.",
        estimatedDuration: "7 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Account Lifecycle Management"
          },
          {
            type: "paragraph",
            content: "A profile table keyed to the authenticated user holds display names, avatars, and preferences, and is populated automatically when an account is created. Password reset, email change, and account deletion complete the lifecycle."
          }
        ]
      }
    ]
  },
  {
    id: "mod-6",
    number: 6,
    order: 6,
    title: "AI Features and the Built-in AI Gateway",
    subtitle: "Module 6 • AI Models & Streaming",
    description: "Connect the platform AI gateway, invoke language and vision models server-side, stream responses, and parse structured JSON output.",
    status: "locked",
    duration: "45 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 300,
    quiz: {
      id: "quiz-mod-6",
      title: "Module 6 Quiz: AI Gateway & Streaming",
      xpReward: 100,
      questions: [
        {
          id: "q-6-1",
          type: "fill_blank",
          question: "Sending model output token by token so text appears progressively in the interface is called ______________.",
          answer: "streaming",
          explanation: "Streaming dramatically improves perceived UX in chat and generation tools."
        },
        {
          id: "q-6-2",
          type: "true_false",
          question: "AI provider API keys may safely be placed in frontend code as long as the file is minified.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Minified frontend code is still readable by browser users; API keys must stay in serverless functions."
        },
        {
          id: "q-6-3",
          type: "matching",
          question: "Match each AI component with its description:",
          matchingPairs: [
            { item: "A. AI gateway", functionText: "1. Managed access to models without separate provider accounts." },
            { item: "B. Server function", functionText: "2. Where model calls and secrets must execute." },
            { item: "C. Structured output", functionText: "3. JSON responses that application logic can parse reliably." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Gateways supply models, server functions protect keys, and structured outputs feed code."
        },
        {
          id: "q-6-4",
          type: "order",
          question: "Sequence AI invocation steps:",
          orderItems: [
            "1. Call the model from the server function and stream the reply.",
            "2. Validate the incoming request and the user’s session.",
            "3. Parse, validate, and render the result in the interface.",
          ],
          answer: "2 -> 1 -> 3",
          explanation: "Validate session requests first, invoke models server-side, and render the response."
        },
        {
          id: "q-6-5",
          type: "mcq",
          question: "Which task is best suited to a small, fast model?",
          options: [
            "A) Classifying a support message into one of five categories",
            "B) Writing a full legal analysis",
            "C) Multi-step architectural reasoning",
            "D) Long-form research synthesis",
          ],
          answer: "A",
          explanation: "Fast light models excel at simple classification and routing."
        },
      ],
    },
    lessons: [
      {
        id: "l-601",
        order: 1,
        title: "Section 6.1: The Built-in AI Connector",
        description: "Utilize Lovable's managed AI gateway to call reasoning, vision, and audio models securely.",
        estimatedDuration: "9 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Managed AI Gateway Architecture"
          },
          {
            type: "paragraph",
            content: "Lovable includes a managed AI gateway, so applications can call language, vision, and audio models without the developer registering separate provider accounts. Credentials are provisioned and rotated on the platform side and injected into server-side code only."
          }
        ]
      },
      {
        id: "l-602",
        order: 2,
        title: "Section 6.2: Model Families and Selection",
        description: "Select optimal models based on latency, token costs, and task complexity.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Choosing Model Architectures"
          },
          {
            type: "paragraph",
            content: "Text and chat models handle reasoning, summarisation, extraction, and conversation. Image models generate and edit visuals. Speech models perform synthesis and transcription. Choose the smallest model that satisfies the task: fast models for classification and routing, larger models for complex reasoning."
          }
        ]
      },
      {
        id: "l-603",
        order: 3,
        title: "Section 6.3: Server-Side Execution and Key Safety",
        description: "Execute model requests inside serverless functions to keep API credentials hidden from client bundles.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Protecting API Credentials"
          },
          {
            type: "paragraph",
            content: "Model calls must originate from server-side functions. A key placed in frontend code is publicly readable, and any browser can spend your budget. The server function validates the request, verifies the session where relevant, calls the model, and returns only the result the client needs."
          }
        ]
      },
      {
        id: "l-604",
        order: 4,
        title: "Section 6.4: Streaming Responses",
        description: "Stream token responses back to user interfaces for instantaneous chat and text feedback.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Real-time Token Streaming"
          },
          {
            type: "paragraph",
            content: "Streaming delivers tokens as they are produced rather than after the full completion, which transforms perceived latency in chat and writing interfaces. The server streams events and the interface appends text progressively."
          }
        ]
      },
      {
        id: "l-605",
        order: 5,
        title: "Section 6.5: Structured Output, Cost, and Failure Handling",
        description: "Parse structured JSON responses safely while handling rate limits, context window limits, and timeouts.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Structured JSON Parsing & Cost Controls"
          },
          {
            type: "paragraph",
            content: "Ask models for structured JSON when the result feeds application logic, and validate it before use. Control cost by trimming context, caching repeated answers, and setting sensible token limits. Always handle rate limits, timeouts, and refusals with a clear user-facing message rather than a silent failure."
          }
        ]
      }
    ]
  },
  {
    id: "mod-7",
    number: 7,
    order: 7,
    title: "External APIs, Connectors, and Integrations",
    subtitle: "Module 7 • Webhooks & Secrets",
    description: "Integrate third-party services like payments, emails, and CRMs securely using the secret vault, webhooks, and resilient retries.",
    status: "locked",
    duration: "40 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 250,
    quiz: {
      id: "quiz-mod-7",
      title: "Module 7 Quiz: Third-Party APIs & Webhooks",
      xpReward: 100,
      questions: [
        {
          id: "q-7-1",
          type: "fill_blank",
          question: "Before processing an inbound webhook payload, the handler must verify the request ______________.",
          answer: "signature",
          explanation: "Signature validation prevents attackers from forging external webhook events."
        },
        {
          id: "q-7-2",
          type: "true_false",
          question: "A public webhook endpoint can safely trust any payload it receives because the URL is hard to guess.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Public URLs can be discovered or scanned; cryptographic signature verification is required."
        },
        {
          id: "q-7-3",
          type: "matching",
          question: "Match each integration term with its purpose:",
          matchingPairs: [
            { item: "A. Secret vault", functionText: "1. Encrypted storage for third-party private keys." },
            { item: "B. Webhook", functionText: "2. An inbound event sent by an external service." },
            { item: "C. Exponential backoff", functionText: "3. Retry strategy that spaces attempts increasingly apart." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Secret vaults store keys, webhooks deliver push events, and backoff manages retries."
        },
        {
          id: "q-7-4",
          type: "order",
          question: "Sequence third-party integration steps:",
          orderItems: [
            "1. Call the provider from a server function using the stored secret.",
            "2. Store the third-party credential in the secret vault.",
            "3. Handle errors and rate limits, surfacing the provider’s message.",
          ],
          answer: "2 -> 1 -> 3",
          explanation: "Encrypt keys first, trigger calls inside server functions, and handle exceptions cleanly."
        },
        {
          id: "q-7-5",
          type: "mcq",
          question: "Which key type is acceptable to include in client-side code?",
          options: [
            "A) A secret server key",
            "B) A publishable or anonymous key",
            "C) A webhook signing secret",
            "D) A database service role key",
          ],
          answer: "B",
          explanation: "Only public anonymous or publishable client keys are safe in browser code."
        },
      ],
    },
    lessons: [
      {
        id: "l-701",
        order: 1,
        title: "Section 7.1: When to Reach Outside the Platform",
        description: "Determine when to integrate external email, payment gateway, calendar, and CRM APIs.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Integrating Third-Party Services"
          },
          {
            type: "paragraph",
            content: "Payments, email delivery, mapping, calendars, CRMs, and analytics all live outside your application. Integration means calling those services securely from the server and translating their responses into your own data model."
          }
        ]
      },
      {
        id: "l-702",
        order: 2,
        title: "Section 7.2: Secrets Management",
        description: "Store API tokens in encrypted secret vaults and access them safely inside serverless handlers.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Encrypted Secret Storage"
          },
          {
            type: "paragraph",
            content: "Third-party credentials are stored in the encrypted secret vault and read only inside server-side handlers at call time. Publishable keys may appear in client code; private keys never may. Rotating a leaked key is the first action after any exposure."
          }
        ]
      },
      {
        id: "l-703",
        order: 3,
        title: "Section 7.3: Connectors and the Gateway",
        description: "Manage OAuth token refreshes and route requests through managed integration gateways.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Managed Gateway Connectors"
          },
          {
            type: "paragraph",
            content: "Connectors provide managed authentication for common services, so the platform handles token exchange and refresh. Requests route through a gateway that attaches credentials, and the provider’s status and error body are relayed back unchanged for debugging."
          }
        ]
      },
      {
        id: "l-704",
        order: 4,
        title: "Section 7.4: Webhooks and Scheduled Jobs",
        description: "Verify webhook signature headers, validate payload schemas, and handle recurring background tasks.",
        estimatedDuration: "9 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Inbound Webhook Verification"
          },
          {
            type: "paragraph",
            content: "Inbound events - a completed payment, a new form submission - arrive at public endpoints. Every such endpoint must verify the sender’s signature before trusting the payload, validate the body, and respond quickly. Scheduled jobs use the same pattern for recurring work."
          }
        ]
      },
      {
        id: "l-705",
        order: 5,
        title: "Section 7.5: Resilience and Rate Limits",
        description: "Implement exponential backoff retries and clear error messaging for external API rate limits.",
        estimatedDuration: "7 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Exponential Backoff & Retries"
          },
          {
            type: "paragraph",
            content: "Networks fail. Wrap external calls with timeouts, retry idempotent requests with backoff, respect documented rate limits, and surface the provider’s real error rather than a generic failure so the cause remains diagnosable."
          }
        ]
      }
    ]
  },
  {
    id: "mod-8",
    number: 8,
    order: 8,
    title: "Debugging and Error Resolution",
    subtitle: "Module 8 • Diagnostics & Troubleshooting",
    description: "Diagnose build, runtime, data, and logic errors using console logs, network inspectors, agentic prompts, and version history.",
    status: "locked",
    duration: "40 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 250,
    quiz: {
      id: "quiz-mod-8",
      title: "Module 8 Quiz: Debugging & Diagnostics",
      xpReward: 100,
      questions: [
        {
          id: "q-8-1",
          type: "fill_blank",
          question: "When a fetch returns a permission error, the most likely cause is a missing or incorrect ______________ policy.",
          answer: "Row Level Security (RLS)",
          explanation: "Database fetch permission failures stem from RLS access policies."
        },
        {
          id: "q-8-2",
          type: "true_false",
          question: "Repeating the same prompt after three failed fix attempts is the recommended way to escape an error loop.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Escape loops by simplifying feature requests or reverting to previous version snapshots."
        },
        {
          id: "q-8-3",
          type: "matching",
          question: "Match each tool with its diagnostic signal:",
          matchingPairs: [
            { item: "A. Console log", functionText: "1. Client-side errors and developer messages." },
            { item: "B. Network panel", functionText: "2. Request status codes and response bodies." },
            { item: "C. Version history", functionText: "3. Restores the last known working state." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Console surfaces script errors, network panel reveals payloads, and version history allows rollbacks."
        },
        {
          id: "q-8-4",
          type: "order",
          question: "Sequence systematic debugging steps:",
          orderItems: [
            "1. Reproduce the failure in the smallest possible case.",
            "2. Read the console, network, and server logs for the exact error.",
            "3. Apply the fix and verify against the same signal.",
          ],
          answer: "2 -> 1 -> 3",
          explanation: "Inspect empirical logs first, isolate the test case, and verify the fix."
        },
        {
          id: "q-8-5",
          type: "mcq",
          question: "An error that appears only when a specific button is clicked is best described as a:",
          options: [
            "A) Build error",
            "B) Runtime error",
            "C) Syntax error",
            "D) Compilation error",
          ],
          answer: "B",
          explanation: "Runtime errors occur dynamically when specific user interaction code paths execute."
        },
      ],
    },
    lessons: [
      {
        id: "l-801",
        order: 1,
        title: "Section 8.1: Reading the Signal Before Changing Code",
        description: "Inspect stack traces, browser dev tools, and server logs before requesting code modifications.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Evidence-First Debugging"
          },
          {
            type: "paragraph",
            content: "Effective debugging starts with evidence: the browser console, the network panel, server function logs, and the stack trace. Guessing at fixes without reading the signal is the main cause of long error loops."
          }
        ]
      },
      {
        id: "l-802",
        order: 2,
        title: "Section 8.2: Classifying the Failure",
        description: "Identify whether an issue stem from build, runtime, database permission (RLS), or application logic.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Categorizing Error Classes"
          },
          {
            type: "paragraph",
            content: "Build errors stop compilation and usually name a file and line. Runtime errors appear only when a path executes. Data errors return a permission or constraint message from the database. Logic errors produce a wrong but non-crashing result. Each class has a different investigation route."
          }
        ]
      },
      {
        id: "l-803",
        order: 3,
        title: "Section 8.3: Prompting the Agent to Fix",
        description: "Craft accurate bug reports containing error tracebacks, affected files, and steps to reproduce.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Filing Precise Bug Prompts"
          },
          {
            type: "paragraph",
            content: "Paste the exact error text, the file involved, and the steps that reproduce it. Describe expected versus actual behaviour. A screenshot of the broken state plus the console output is usually enough for the agent to locate the cause in one pass."
          }
        ]
      },
      {
        id: "l-804",
        order: 4,
        title: "Section 8.4: Isolation and Reproduction",
        description: "Isolate complex bugs down to single routes or specific authenticated user permissions.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Isolating Test Conditions"
          },
          {
            type: "paragraph",
            content: "Narrow the failure by reproducing it in the smallest possible case: one route, one record, one user role. Confirm whether the problem appears for every user or only unauthenticated ones - a permission policy is often the culprit."
          }
        ]
      },
      {
        id: "l-805",
        order: 5,
        title: "Section 8.5: Escaping Error Loops",
        description: "Break persistent fix loops by simplifying features or rolling back to healthy version snapshots.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Recovering from Error Loops"
          },
          {
            type: "paragraph",
            content: "If three attempts have not resolved the same error, change approach rather than repeating it: simplify the feature, revert to the last working version from history, or ask the agent to explain the code path before editing it again. Fix the category of problem, not only the single instance."
          }
        ]
      }
    ]
  },
  {
    id: "mod-9",
    number: 9,
    order: 9,
    title: "Deployment, Domains, and Environments",
    subtitle: "Module 9 • Publishing & SEO",
    description: "Manage preview versus published environments, perform pre-launch security checklists, map custom DNS domains, and optimize search metadata.",
    status: "locked",
    duration: "40 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 250,
    quiz: {
      id: "quiz-mod-9",
      title: "Module 9 Quiz: Deployment & SEO",
      xpReward: 100,
      questions: [
        {
          id: "q-9-1",
          type: "fill_blank",
          question: "Pointing your own web address at the deployed application requires configuring ______________ records.",
          answer: "DNS",
          explanation: "Custom domain mapping relies on DNS A and CNAME records."
        },
        {
          id: "q-9-2",
          type: "true_false",
          question: "Publishing an application automatically overwrites the preview with an older snapshot.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Publishing publishes a current static snapshot of the workspace without modifying sandbox previews."
        },
        {
          id: "q-9-3",
          type: "matching",
          question: "Match each deployment term with its purpose:",
          matchingPairs: [
            { item: "A. Preview environment", functionText: "1. Shows the builder the latest unpublished edits." },
            { item: "B. Published deployment", functionText: "2. Serves a stable snapshot to the public." },
            { item: "C. Sitemap", functionText: "3. Lists public routes so crawlers can discover them." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Preview displays draft changes, publishing serves stable releases, and sitemaps index URLs."
        },
        {
          id: "q-9-4",
          type: "order",
          question: "Sequence production launch steps:",
          orderItems: [
            "1. Publish the application to the public address.",
            "2. Run the pre-launch checklist and verify security policies.",
            "3. Connect the custom domain and confirm the certificate.",
          ],
          answer: "2 -> 1 -> 3",
          explanation: "Run security checklists first, publish the application snapshot, and point custom domains."
        },
        {
          id: "q-9-5",
          type: "mcq",
          question: "Which is the correct guideline for a page title?",
          options: [
            "A) Under 60 characters and unique per page",
            "B) Identical across all pages",
            "C) At least 300 characters",
            "D) Omitted so the browser can generate one",
          ],
          answer: "A",
          explanation: "Page titles should be distinct and under 60 characters for search engine snippets."
        },
      ],
    },
    lessons: [
      {
        id: "l-901",
        order: 1,
        title: "Section 9.1: Preview Versus Published",
        description: "Isolate sandbox work-in-progress edits from public production releases.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Sandbox vs Production Environments"
          },
          {
            type: "paragraph",
            content: "The preview reflects the latest edits for the builder and collaborators. Publishing takes a snapshot and serves it to the public at a stable address. The two are deliberately separate so unfinished work never reaches real users."
          }
        ]
      },
      {
        id: "l-902",
        order: 2,
        title: "Section 9.2: The Pre-Launch Checklist",
        description: "Validate authentication, RLS security policies, mobile responsiveness, and SEO title tags before release.",
        estimatedDuration: "9 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Pre-Flight Verification Checklist"
          },
          {
            type: "paragraph",
            content: "Before publishing: confirm authentication flows work end to end, verify RLS on every table, check responsive behaviour on a phone-sized viewport, set page titles and descriptions, replace placeholder content, and test the primary user journey as a signed-out visitor."
          }
        ]
      },
      {
        id: "l-903",
        order: 3,
        title: "Section 9.3: Custom Domains and HTTPS",
        description: "Point custom DNS CNAME/A records and verify automated SSL/TLS certificate provisioning.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Connecting DNS Records"
          },
          {
            type: "paragraph",
            content: "A custom domain is connected by pointing DNS records at the platform, after which certificates are issued and renewed automatically. Choose a canonical hostname and redirect the alternative so search engines index one address."
          }
        ]
      },
      {
        id: "l-904",
        order: 4,
        title: "Section 9.4: Search Visibility Essentials",
        description: "Configure unique page meta descriptions, semantic HTML tags, sitemaps, and robots.txt rules.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "SEO Metadata & Semantic Markup"
          },
          {
            type: "paragraph",
            content: "Each page needs a unique title under sixty characters, a description under one hundred and sixty, a single top-level heading, semantic markup, and descriptive image alternatives. A sitemap and a robots file help crawlers discover every public route."
          }
        ]
      },
      {
        id: "l-905",
        order: 5,
        title: "Section 9.5: Post-Launch Iteration",
        description: "Monitor real-time application analytics, handle bug fixes safely, and maintain version rollback paths.",
        estimatedDuration: "7 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Continuous Production Iteration"
          },
          {
            type: "paragraph",
            content: "Deployment is a checkpoint, not an ending. Watch analytics and error reports, ship small changes frequently, and keep version history as the rollback path when a release misbehaves."
          }
        ]
      }
    ]
  },
  {
    id: "mod-10",
    number: 10,
    order: 10,
    title: "RAG and Knowledge Bases",
    subtitle: "Module 10 • Semantic Search & RAG",
    description: "Understand semantic vector search, text chunking, embedding generation, pgvector storage, and retrieval-augmented generation pipelines.",
    status: "locked",
    duration: "45 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 300,
    quiz: {
      id: "quiz-mod-10",
      title: "Module 10 Quiz: RAG & Vector Storage",
      xpReward: 100,
      questions: [
        {
          id: "q-10-1",
          type: "fill_blank",
          question: "Converting text into a numerical vector that captures its meaning produces an ______________.",
          answer: "embedding",
          explanation: "Vector embeddings quantify semantic meaning into mathematical spaces."
        },
        {
          id: "q-10-2",
          type: "true_false",
          question: "Retrieval-Augmented Generation requires retraining the underlying language model on your documents.",
          options: ["True", "False"],
          answer: "False",
          explanation: "RAG injects relevant document chunks dynamically into prompt context windows."
        },
        {
          id: "q-10-3",
          type: "matching",
          question: "Match each RAG concept with its definition:",
          matchingPairs: [
            { item: "A. Embedding model", functionText: "1. Turns text into vectors that capture meaning." },
            { item: "B. Vector similarity search", functionText: "2. Finds the chunks closest in meaning to a query." },
            { item: "C. Chunking", functionText: "3. Splits long documents into retrievable passages." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Embedding models create vectors, chunking parses text, and similarity search retrieves matches."
        },
        {
          id: "q-10-4",
          type: "order",
          question: "Sequence the RAG pipeline steps:",
          orderItems: [
            "1. Retrieve the most similar chunks for the user’s question.",
            "2. Chunk the source documents and store their embeddings.",
            "3. Inject the retrieved context into the prompt and generate the answer.",
          ],
          answer: "2 -> 1 -> 3",
          explanation: "Embed and index documents first, perform similarity retrieval on user query, and feed context into the model."
        },
        {
          id: "q-10-5",
          type: "mcq",
          question: "What is the primary benefit of RAG?",
          options: [
            "A) It removes the need for a database",
            "B) It grounds answers in your own source material and reduces hallucination",
            "C) It makes models respond without any prompt",
            "D) It replaces authentication",
          ],
          answer: "B",
          explanation: "RAG grounds model responses directly in authoritative custom reference materials."
        },
      ],
    },
    lessons: [
      {
        id: "l-1001",
        order: 1,
        title: "Section 10.1: Semantic Search Versus Keyword Search",
        description: "Compare vector distance search against traditional literal string matching.",
        estimatedDuration: "9 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Semantic Vector Search"
          },
          {
            type: "paragraph",
            content: "Keyword search matches literal strings and misses paraphrase. Semantic search compares meaning by converting text into numerical vectors, so a query about refund rules can retrieve a passage titled returns policy even with no shared words."
          }
        ]
      },
      {
        id: "l-1002",
        order: 2,
        title: "Section 10.2: Embeddings and Vector Storage",
        description: "Convert text chunks into dense vector embeddings stored in PostgreSQL pgvector columns.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Vector Embeddings & Chunking"
          },
          {
            type: "paragraph",
            content: "An embedding model converts a chunk of text into a fixed-length vector. Vectors are stored alongside their source text in the database using a vector column, and similarity is measured by distance between vectors. Chunk size matters: too large dilutes meaning, too small loses context."
          }
        ]
      },
      {
        id: "l-1003",
        order: 3,
        title: "Section 10.3: The Retrieval-Augmented Generation Pipeline",
        description: "Inject relevant vector search results into prompt context windows to eliminate AI hallucinations.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Grounding Models via RAG"
          },
          {
            type: "paragraph",
            content: "RAG grounds a model in your own content. The request is embedded, the closest chunks are retrieved, those chunks are injected into the prompt as context, and the model answers using them. This reduces hallucination and lets answers cite their source."
          }
        ]
      },
      {
        id: "l-1004",
        order: 4,
        title: "Section 10.4: Ingestion and Maintenance",
        description: "Parse, clean, chunk, embed, and refresh custom document knowledge bases.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Knowledge Base Pipelines"
          },
          {
            type: "paragraph",
            content: "Documents must be parsed, cleaned, chunked, embedded, and stored - and re-embedded whenever the source changes. Track document versions so stale chunks are removed rather than left to contradict the current material."
          }
        ]
      },
      {
        id: "l-1005",
        order: 5,
        title: "Section 10.5: Multimodal and Evaluation",
        description: "Incorporate image descriptions and audio transcripts into vector databases while measuring retrieval precision.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Evaluating RAG Precision"
          },
          {
            type: "paragraph",
            content: "Knowledge bases can include image descriptions and audio transcripts alongside text. Evaluate retrieval quality with a fixed set of representative questions and check whether the correct chunk is actually returned before blaming the model for a poor answer."
          }
        ]
      }
    ]
  },
  {
    id: "mod-11",
    number: 11,
    order: 11,
    title: "Production Best Practices",
    subtitle: "Module 11 • Performance & Reliability",
    description: "Enforce ongoing security scans, query indexing, cost controls, React error boundaries, maintainable design systems, and WCAG accessibility.",
    status: "locked",
    duration: "40 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 250,
    quiz: {
      id: "quiz-mod-11",
      title: "Module 11 Quiz: Production Engineering & Resilience",
      xpReward: 100,
      questions: [
        {
          id: "q-11-1",
          type: "fill_blank",
          question: "A React ______________ ______________ prevents one failing component from blanking the entire page.",
          answer: "error boundary",
          explanation: "Error boundaries catch component render crashes gracefully."
        },
        {
          id: "q-11-2",
          type: "true_false",
          question: "Selecting every column of every row on each page load is a recommended performance practice.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Fetch only required columns and rows to reduce payload overhead."
        },
        {
          id: "q-11-3",
          type: "matching",
          question: "Match each production practice with its goal:",
          matchingPairs: [
            { item: "A. Deep scan", functionText: "1. Agentic review that surfaces access-control and credential issues." },
            { item: "B. Indexing", functionText: "2. Speeds up frequently filtered database queries." },
            { item: "C. Contrast ratio", functionText: "3. Accessibility measure for readable text against its background." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Deep scans audit security, database indexes optimize lookups, and contrast ratios maintain WCAG accessibility."
        },
        {
          id: "q-11-4",
          type: "order",
          question: "Sequence production release workflows:",
          orderItems: [
            "1. Fix the reported issues and re-run the scan.",
            "2. Run the security scanners before the release.",
            "3. Monitor analytics and error logs after deployment.",
          ],
          answer: "2 -> 1 -> 3",
          explanation: "Run security scanners prior to deployment, resolve surfaced vulnerabilities, and monitor post-release observability."
        },
        {
          id: "q-11-5",
          type: "mcq",
          question: "Which practice most directly reduces AI running costs?",
          options: [
            "A) Trimming context and caching repeated answers",
            "B) Adding more animations",
            "C) Increasing image resolution",
            "D) Using more routes",
          ],
          answer: "A",
          explanation: "Context window optimization and semantic prompt response caching reduce AI token expenses."
        },
      ],
    },
    lessons: [
      {
        id: "l-1101",
        order: 1,
        title: "Section 11.1: Security as a Standing Practice",
        description: "Execute basic and deep automated security audits prior to every major release cycle.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Continuous Security Scans"
          },
          {
            type: "paragraph",
            content: "Run the basic and deep scanners before every significant release. Confirm that every table has RLS, that no secret is reachable from the browser, that public endpoints verify their callers, and that administrative checks happen on the server."
          }
        ]
      },
      {
        id: "l-1102",
        order: 2,
        title: "Section 11.2: Performance and Cost Discipline",
        description: "Select minimal query columns, index frequent database filters, lazy-load media, and cache model outputs.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Performance & Token Economics"
          },
          {
            type: "paragraph",
            content: "Fetch only the columns and rows a page needs, index frequent filters, lazy-load heavy media, and cache repeated model answers. Costs in an AI application are dominated by unnecessary context and repeated calls, not by the interface."
          }
        ]
      },
      {
        id: "l-1103",
        order: 3,
        title: "Section 11.3: Reliability and Observability",
        description: "Implement React component error boundaries, server crash logging, and active user analytics.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Error Boundaries & Observability"
          },
          {
            type: "paragraph",
            content: "Add error boundaries so a single failing component does not blank the page, log server failures with enough context to diagnose them, and monitor analytics for sudden drops in a key journey. Silent failure is the most expensive kind."
          }
        ]
      },
      {
        id: "l-1104",
        order: 4,
        title: "Section 11.4: Maintainability",
        description: "Keep codebase components single-purpose and prune dead code to optimize AI agent context understanding.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "Clean Code Architecture"
          },
          {
            type: "paragraph",
            content: "Keep components small and single-purpose, keep styling in the design system, name things for what they mean, and delete dead code. A codebase the agent can navigate is a codebase the agent can safely change."
          }
        ]
      },
      {
        id: "l-1105",
        order: 5,
        title: "Section 11.5: Accessibility, Privacy, and Compliance",
        description: "Ensure keyboard accessibility, contrast compliance, minimal data collection, and account deletion rights.",
        estimatedDuration: "8 mins",
        readingTimeMinutes: 4,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 50,
        contentSections: [
          {
            type: "heading",
            title: "WCAG Accessibility & Data Privacy"
          },
          {
            type: "paragraph",
            content: "Support keyboard navigation, sufficient contrast, and screen-reader labels. Collect the minimum personal data required, state clearly what is stored, and provide a route for users to delete their account and content."
          }
        ]
      }
    ]
  },
  {
    id: "mod-12",
    number: 12,
    order: 12,
    title: "Capstone: Build Ten Real Projects",
    subtitle: "Module 12 • Hands-on Portfolio Capstone",
    description: "Build 10 comprehensive full-stack applications combining portfolio sites, tasks, wikis, expense trackers, AI writers, support bots, bookings, e-commerce, multi-tenant SaaS, and research workspaces.",
    status: "locked",
    duration: "120 mins",
    completionPercentage: 0,
    lessonCount: 5,
    xp: 500,
    quiz: {
      id: "quiz-mod-12",
      title: "Module 12 Capstone Assessment: Project Completion",
      xpReward: 200,
      questions: [
        {
          id: "q-12-1",
          type: "fill_blank",
          question: "A capstone project is only complete once every database table has tested ______________ ______________ Security policies.",
          answer: "Row Level",
          explanation: "Every database table must have verified RLS policies."
        },
        {
          id: "q-12-2",
          type: "true_false",
          question: "The support bot project can be completed without embeddings or retrieval.",
          options: ["True", "False"],
          answer: "False",
          explanation: "Project 6 exercises RAG using document embeddings and vector retrieval."
        },
        {
          id: "q-12-3",
          type: "matching",
          question: "Match each project with its core capability:",
          matchingPairs: [
            { item: "A. Multi-tenant dashboard", functionText: "1. Isolates each organisation’s data by policy." },
            { item: "B. Support bot", functionText: "2. Answers from your own documents using retrieval." },
            { item: "C. E-commerce storefront", functionText: "3. Fulfils orders through verified payment webhooks." },
          ],
          answer: "A-1, B-2, C-3",
          explanation: "Multi-tenant dashboards isolate tenant data, support bots query vector stores, and e-commerce stores process webhooks."
        },
        {
          id: "q-12-4",
          type: "order",
          question: "Sequence capstone execution steps:",
          orderItems: [
            "1. Prompt the features incrementally and secure the data.",
            "2. Define the entity model and the primary user journey.",
            "3. Run the pre-launch checklist and publish.",
          ],
          answer: "2 -> 1 -> 3",
          explanation: "Model entity schemas first, iterate incrementally, and verify pre-launch checklists."
        },
        {
          id: "q-12-5",
          type: "mcq",
          question: "Which project best exercises retrieval-augmented generation?",
          options: [
            "A) Personal portfolio",
            "B) Expense tracker",
            "C) Customer support bot over your documents",
            "D) Task manager",
          ],
          answer: "C",
          explanation: "The customer support bot project specifically builds a full RAG document retrieval pipeline."
        },
      ],
    },
    lessons: [
      {
        id: "l-1201",
        order: 1,
        title: "Section 12.1: How to Use This Module & Shipping Criteria",
        description: "Review strict production criteria: RLS test passes, secure secret vaults, mobile responsiveness, and live deployment.",
        estimatedDuration: "15 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 100,
        contentSections: [
          {
            type: "heading",
            title: "Capstone Scoping & Criteria"
          },
          {
            type: "paragraph",
            content: "Each project below is deliberately scoped to combine several earlier modules. Build them in order; each one adds a capability you have not yet exercised in isolation. For every project, write the entity model first, prompt feature by feature, secure the data, then publish."
          }
        ]
      },
      {
        id: "l-1202",
        order: 2,
        title: "Section 12.2: Projects 1 to 4 - Foundations",
        description: "Build Portfolio & Blog, Task Manager with RLS, Team Knowledge Wiki with RBAC, and Expense Tracker with SQL summaries.",
        estimatedDuration: "35 mins",
        readingTimeMinutes: 10,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 100,
        contentSections: [
          {
            type: "heading",
            title: "Foundation Projects (1 - 4)"
          },
          {
            type: "paragraph",
            content: "Project 1 - Personal Portfolio and Blog. Static-first site with routed pages, a design system, image assets, and full search-visibility metadata.\nProject 2 - Task Manager with Accounts. Sign-up, sign-in, private tasks per user, and complete Row Level Security.\nProject 3 - Team Knowledge Wiki. Shared documents with role-based editing: viewers, editors, and administrators drawn from a dedicated roles table.\nProject 4 - Expense Tracker with Charts. Categorised spending, aggregate queries computed in the database, and visual summaries."
          }
        ]
      },
      {
        id: "l-1203",
        order: 3,
        title: "Section 12.3: Projects 5 to 8 - Intelligence & Integration",
        description: "Build Streaming AI Writing Assistant, Document Support Bot, Booking System with Emails, and E-Commerce Storefront.",
        estimatedDuration: "35 mins",
        readingTimeMinutes: 10,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 100,
        contentSections: [
          {
            type: "heading",
            title: "Intelligence & Integration Projects (5 - 8)"
          },
          {
            type: "paragraph",
            content: "Project 5 - AI Writing Assistant. Streaming chat interface, tone and length controls, saved drafts.\nProject 6 - Customer Support Bot over Your Documents. Document ingestion, embeddings, retrieval, and cited answers.\nProject 7 - Booking and Scheduling App. Availability slots, conflict prevention with database constraints, and confirmation emails through an external provider.\nProject 8 - E-Commerce Storefront. Catalogue, cart, checkout through a payment provider, and webhook-driven order fulfilment."
          }
        ]
      },
      {
        id: "l-1204",
        order: 4,
        title: "Section 12.4: Projects 9 and 10 - Systems Thinking",
        description: "Build Multi-Tenant SaaS Dashboard with policy isolation and full AI Research Workspace with cost tracking.",
        estimatedDuration: "25 mins",
        readingTimeMinutes: 8,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 100,
        contentSections: [
          {
            type: "heading",
            title: "Systems Architecture Projects (9 - 10)"
          },
          {
            type: "paragraph",
            content: "Project 9 - Multi-Tenant SaaS Dashboard. Organisations, invitations, per-tenant data isolation enforced entirely by policy, and usage analytics.\nProject 10 - AI Research Workspace. Upload sources, build a knowledge base, run multi-step model workflows, export results, and monitor cost and errors in production."
          }
        ]
      },
      {
        id: "l-1205",
        order: 5,
        title: "Section 12.5: Capstone Verification & Certificate Claim",
        description: "Submit final capstone projects for automated policy verification and unlock your verifiable credential badge.",
        estimatedDuration: "10 mins",
        readingTimeMinutes: 5,
        completed: false,
        locked: true,
        type: "reading",
        xpReward: 100,
        contentSections: [
          {
            type: "heading",
            title: "Final Capstone Verification"
          },
          {
            type: "paragraph",
            content: "A project counts as complete only when: every table has tested Row Level Security; no secret is reachable from the browser; the primary journey works on a phone; page titles and descriptions are unique and meaningful; errors are handled visibly; and the application is published at a working address."
          }
        ]
      }
    ]
  }
];

// Helper to get or calculate user progress from localStorage / state
export function getStoredUserProgress(slug: string): UserCourseProgressState {
  if (typeof window === "undefined") {
    return {
      completedLessonIds: ["l-101"],
      completedModuleIds: [],
      quizScores: {},
      totalXp: 50,
      currentStreakDays: 1,
      lastActiveDate: new Date().toISOString(),
    };
  }

  const storageKey = `future_ai_course_progress_${slug}`;
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }

  // Initial state for Lovable course: First lesson "l-101" unlocked, 0 modules completed
  return {
    completedLessonIds: [],
    completedModuleIds: [],
    quizScores: {},
    totalXp: 0,
    currentStreakDays: 1,
    lastActiveDate: new Date().toISOString(),
  };
}

export function saveUserProgress(slug: string, state: UserCourseProgressState) {
  if (typeof window !== "undefined") {
    const storageKey = `future_ai_course_progress_${slug}`;
    localStorage.setItem(storageKey, JSON.stringify(state));
  }
}

// Generate tailored pathway data dynamically evaluating user progress state
export function getCoursePathData(slug: string, progressState?: UserCourseProgressState): DetailedCoursePath {
  const cleanSlug = slug.toLowerCase().replace("course-", "");
  const course =
    COURSES.find((c) => c.id.replace("course-", "") === cleanSlug) || COURSES[0];

  const userProgress = progressState || getStoredUserProgress(cleanSlug);

  // Base raw modules
  const rawModules = cleanSlug === "lovable" ? LOVABLE_CURRICULUM_MODULES : LOVABLE_CURRICULUM_MODULES;

  // Evaluate module locking and lesson status based on user progressive completion
  let previousModuleCompleted = true; // First module is unlocked by default

  const modules: CourseModule[] = rawModules.map((mod, modIdx) => {
    const isModuleFullyCompleted = userProgress.completedModuleIds.includes(mod.id);
    const isModuleUnlocked = modIdx === 0 || previousModuleCompleted || userProgress.completedModuleIds.includes(rawModules[modIdx - 1].id);

    // Evaluate lessons inside module
    let previousLessonCompleted = true; // First lesson in module unlocked if module unlocked

    const lessons: CourseLesson[] = mod.lessons.map((les, lesIdx) => {
      const isLessonCompleted = userProgress.completedLessonIds.includes(les.id);
      const isLessonUnlocked = isModuleUnlocked && (lesIdx === 0 || previousLessonCompleted || isLessonCompleted);

      if (isLessonCompleted) {
        previousLessonCompleted = true;
      } else {
        previousLessonCompleted = false;
      }

      return {
        ...les,
        completed: isLessonCompleted,
        locked: !isLessonUnlocked,
      };
    });

    const completedLessonsCount = lessons.filter((l) => l.completed).length;
    const completionPercentage = Math.round((completedLessonsCount / lessons.length) * 100);

    let status: "completed" | "current" | "locked" = "locked";
    if (isModuleFullyCompleted || (completionPercentage === 100 && (!mod.quiz || userProgress.quizScores[mod.id] !== undefined))) {
      status = "completed";
      previousModuleCompleted = true;
    } else if (isModuleUnlocked) {
      status = "current";
      previousModuleCompleted = false;
    } else {
      status = "locked";
      previousModuleCompleted = false;
    }

    return {
      ...mod,
      status,
      completionPercentage,
      lessons,
    };
  });

  const totalModules = modules.length;
  const completedModules = modules.filter((m) => m.status === "completed").length;
  const computedProgress = Math.round((completedModules / totalModules) * 100);

  const resources: CourseResource[] = [
    {
      id: "res-1",
      title: `${course.title} Masterclass Specification Manual`,
      type: "pdf",
      sizeOrMeta: "4.2 MB • Updated July 2026",
      description: "Full 12-module curriculum guide with architecture patterns, RLS policy templates, and prompt specifications.",
      linkText: "Download PDF",
    },
    {
      id: "res-2",
      title: "Interactive Lecture Notes & Module Summaries",
      type: "notes",
      sizeOrMeta: "Markdown • 12 Modules",
      description: "Searchable section notes, SQL migration scripts, C.L.E.A.R. prompt templates, and quiz keys.",
      linkText: "View Notes",
    },
    {
      id: "res-3",
      title: "Starter Practice Repos & Capstone Projects",
      type: "files",
      sizeOrMeta: "ZIP Archive • 24.5 MB",
      description: "Pre-configured project repositories for all 10 Capstone projects with Supabase schemas and auth logic.",
      linkText: "Download ZIP",
    },
    {
      id: "res-4",
      title: "Student AI Engineers Community Forum",
      type: "community",
      sizeOrMeta: "3,180 Active Members",
      description: "Connect with full-stack AI creators, get prompt code reviews, and showcase your Capstone projects.",
      linkText: "Join Community",
    },
  ];

  const badges: CourseBadge[] = [
    {
      id: "badge-1",
      name: "AI Workspace Master",
      description: "Completed Lovable Cloud architecture & workspace fundamentals",
      icon: "Sparkles",
      bgColor: "#E6F9F0",
      borderColor: "#9DD9C5",
      textColor: "#0E8566",
      unlocked: completedModules >= 1,
    },
    {
      id: "badge-2",
      name: "Prompt Engineer",
      description: "Mastered C.L.E.A.R. framework and incremental feature prompting",
      icon: "Zap",
      bgColor: "#F3F0FE",
      borderColor: "#C4BDFA",
      textColor: "#4B3FBF",
      unlocked: completedModules >= 2,
    },
    {
      id: "badge-3",
      name: "RLS Security Shield",
      description: "Implemented Row Level Security and RBAC authorization policies",
      icon: "Hammer",
      bgColor: "#FFF0F5",
      borderColor: "#FFC9DE",
      textColor: "#C0336A",
      unlocked: completedModules >= 4,
    },
    {
      id: "badge-4",
      name: "Capstone Builder",
      description: "Successfully built and deployed 10 production AI applications",
      icon: "Trophy",
      bgColor: "#EBF8FF",
      borderColor: "#BEE3F8",
      textColor: "#2B6CB0",
      unlocked: computedProgress === 100,
    },
  ];

  // Pick a recommended next course deterministically
  const otherCourses = COURSES.filter(
    (c) => c.id.replace("course-", "") !== cleanSlug
  );
  const deterministicIndex = cleanSlug.length % otherCourses.length;
  const recommendedSlug =
    otherCourses[deterministicIndex].id.replace("course-", "");

  return {
    slug: cleanSlug,
    course,
    fullTitle: `${course.title}: Masterclass in Application Development`,
    lastUpdated: "July 2026",
    level: "Beginner to Advanced",
    completedModulesCount: completedModules,
    totalModulesCount: totalModules,
    progressPercent: computedProgress,
    timeSpent: cleanSlug === "lovable" ? "8h 15m" : "4h 45m",
    currentStreak: `${userProgress.currentStreakDays || 1} Days 🔥`,
    xpEarned: userProgress.totalXp,
    modules,
    resources,
    badges,
    recommendedSlug,
  };
}
