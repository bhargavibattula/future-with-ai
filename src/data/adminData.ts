import { COURSES } from "./courses";

export interface AdminKPICard {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  change: string;
  isPositive: boolean;
  iconName: string;
  color: string;
  sparkline: number[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Learner" | "Instructor" | "Admin";
  subscription: "Free" | "Pro" | "Enterprise";
  xp: number;
  coins: number;
  streak: number;
  certificatesCount: number;
  status: "Active" | "Suspended" | "Pending";
  joinedDate: string;
  avatarUrl: string;
}

export interface AdminCertificateTemplate {
  id: string;
  title: string;
  courseTitle: string;
  issuerName: string;
  accentColor: string;
  qrCodeUrl: string;
  issuedCount: number;
}

export interface AdminBadge {
  id: string;
  name: string;
  category: "Prompting" | "Streak" | "Projects" | "Speed";
  xpBonus: number;
  coinBonus: number;
  unlockedCount: number;
  icon: string;
  bgColor: string;
  borderColor: string;
}

export interface AdminAIPrompt {
  id: string;
  title: string;
  category: "Tutor" | "Quiz Gen" | "Code Review" | "Voice";
  promptTemplate: string;
  temperature: number;
  model: string;
  usesCount: number;
}

export interface RoadmapNode {
  id: string;
  title: string;
  type: "module" | "quiz" | "certificate";
  x: number;
  y: number;
  status: "completed" | "current" | "locked";
  xp: number;
  duration: string;
  icon: string;
}

// 1. 10 KPI Cards Dataset
export const ADMIN_KPIS: AdminKPICard[] = [
  {
    id: "kpi-users",
    title: "Total Users",
    value: "52,480",
    numericValue: 52480,
    change: "+12.4% this mo",
    isPositive: true,
    iconName: "Users",
    color: "#8B7FE8",
    sparkline: [35, 42, 48, 51, 60, 68, 75, 84, 92, 100],
  },
  {
    id: "kpi-learners",
    title: "Active Learners",
    value: "14,290",
    numericValue: 14290,
    change: "+8.2% this wk",
    isPositive: true,
    iconName: "UserCheck",
    color: "#74D99F",
    sparkline: [20, 25, 30, 28, 35, 42, 45, 52, 60, 65],
  },
  {
    id: "kpi-courses",
    title: "Published Courses",
    value: "9",
    numericValue: 9,
    change: "100% active",
    isPositive: true,
    iconName: "BookOpen",
    color: "#A78BFA",
    sparkline: [3, 4, 5, 6, 7, 7, 8, 8, 9, 9],
  },
  {
    id: "kpi-lessons",
    title: "Interactive Lessons",
    value: "142",
    numericValue: 142,
    change: "+14 added",
    isPositive: true,
    iconName: "Layers",
    color: "#8FD8FF",
    sparkline: [80, 90, 100, 110, 118, 125, 130, 136, 140, 142],
  },
  {
    id: "kpi-revenue",
    title: "Total Revenue",
    value: "$128,450",
    numericValue: 128450,
    change: "+18.6% M0M",
    isPositive: true,
    iconName: "DollarSign",
    color: "#74D99F",
    sparkline: [40, 48, 55, 62, 70, 82, 95, 108, 118, 128],
  },
  {
    id: "kpi-premium",
    title: "Premium Users",
    value: "4,120",
    numericValue: 4120,
    change: "+15.1% this mo",
    isPositive: true,
    iconName: "Crown",
    color: "#FFD89B",
    sparkline: [15, 18, 22, 26, 30, 34, 38, 42, 46, 50],
  },
  {
    id: "kpi-certificates",
    title: "Certificates Issued",
    value: "8,940",
    numericValue: 8940,
    change: "+24.5% total",
    isPositive: true,
    iconName: "Award",
    color: "#FF9EB3",
    sparkline: [25, 30, 40, 48, 58, 65, 72, 80, 85, 90],
  },
  {
    id: "kpi-dau",
    title: "Daily Active Users",
    value: "6,850",
    numericValue: 6850,
    change: "+6.4% today",
    isPositive: true,
    iconName: "Activity",
    color: "#8B7FE8",
    sparkline: [50, 52, 48, 55, 60, 62, 65, 70, 72, 75],
  },
  {
    id: "kpi-xp",
    title: "XP Earned Today",
    value: "145.2K",
    numericValue: 145200,
    change: "+9.2% vs avg",
    isPositive: true,
    iconName: "Zap",
    color: "#8FD8FF",
    sparkline: [80, 95, 110, 100, 120, 130, 135, 140, 142, 145],
  },
  {
    id: "kpi-coins",
    title: "Coins Economy",
    value: "890.5K",
    numericValue: 890500,
    change: "+11.3% pool",
    isPositive: true,
    iconName: "Coins",
    color: "#FFD89B",
    sparkline: [400, 450, 500, 580, 640, 710, 780, 830, 860, 890],
  },
];

// 2. Mock Users Dataset (20 users)
export const ADMIN_USERS: AdminUser[] = [
  {
    id: "usr-1",
    name: "Shanmukha Rani",
    email: "shanm@future.ai",
    role: "Admin",
    subscription: "Enterprise",
    xp: 14850,
    coins: 3420,
    streak: 28,
    certificatesCount: 8,
    status: "Active",
    joinedDate: "2026-01-15",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shanmukha",
  },
  {
    id: "usr-2",
    name: "Alex Rivera",
    email: "alex.rivera@gmail.com",
    role: "Learner",
    subscription: "Pro",
    xp: 8920,
    coins: 1850,
    streak: 14,
    certificatesCount: 4,
    status: "Active",
    joinedDate: "2026-02-01",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "usr-3",
    name: "Sophia Chen",
    email: "sophia.chen@tech.io",
    role: "Instructor",
    subscription: "Pro",
    xp: 22400,
    coins: 5200,
    streak: 45,
    certificatesCount: 9,
    status: "Active",
    joinedDate: "2026-01-10",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
  },
  {
    id: "usr-4",
    name: "Marcus Vance",
    email: "marcus.v@devmail.com",
    role: "Learner",
    subscription: "Free",
    xp: 3450,
    coins: 620,
    streak: 3,
    certificatesCount: 1,
    status: "Active",
    joinedDate: "2026-03-12",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
  {
    id: "usr-5",
    name: "Elena Rostova",
    email: "elena.r@design.org",
    role: "Learner",
    subscription: "Pro",
    xp: 11200,
    coins: 2400,
    streak: 19,
    certificatesCount: 6,
    status: "Active",
    joinedDate: "2026-02-18",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
  },
  {
    id: "usr-6",
    name: "David Kim",
    email: "dkim@startup.co",
    role: "Learner",
    subscription: "Enterprise",
    xp: 9400,
    coins: 1950,
    streak: 11,
    certificatesCount: 5,
    status: "Active",
    joinedDate: "2026-03-01",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: "usr-7",
    name: "Aisha Patel",
    email: "aisha.patel@edu.in",
    role: "Instructor",
    subscription: "Pro",
    xp: 18900,
    coins: 4100,
    streak: 32,
    certificatesCount: 7,
    status: "Active",
    joinedDate: "2026-01-22",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
  },
  {
    id: "usr-8",
    name: "Liam O'Connor",
    email: "liam.oc@web.com",
    role: "Learner",
    subscription: "Free",
    xp: 1200,
    coins: 180,
    streak: 0,
    certificatesCount: 0,
    status: "Suspended",
    joinedDate: "2026-04-05",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
  },
];

// 3. Certificate Templates
export const ADMIN_CERTIFICATES: AdminCertificateTemplate[] = [
  {
    id: "cert-chatgpt",
    title: "Verified ChatGPT Prompt Engineer",
    courseTitle: "ChatGPT Mastery",
    issuerName: "Future.ai Academic Board",
    accentColor: "#74D99F",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=future.ai/verify/chatgpt",
    issuedCount: 2480,
  },
  {
    id: "cert-claude",
    title: "Claude 3.5 Sonnet Specialist",
    courseTitle: "Claude Mastery",
    issuerName: "Future.ai Academic Board",
    accentColor: "#8B7FE8",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=future.ai/verify/claude",
    issuedCount: 1920,
  },
  {
    id: "cert-cursor",
    title: "AI Full-Stack Software Engineer",
    courseTitle: "Cursor IDE Mastery",
    issuerName: "Future.ai Engineering Guild",
    accentColor: "#8FD8FF",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=future.ai/verify/cursor",
    issuedCount: 1640,
  },
];

// 4. Badges Catalog
export const ADMIN_BADGES: AdminBadge[] = [
  {
    id: "badge-1",
    name: "Prompt Architect",
    category: "Prompting",
    xpBonus: 250,
    coinBonus: 50,
    unlockedCount: 4120,
    icon: "Sparkles",
    bgColor: "#F5F2FF",
    borderColor: "#E8E3FF",
  },
  {
    id: "badge-2",
    name: "30-Day Flame",
    category: "Streak",
    xpBonus: 500,
    coinBonus: 150,
    unlockedCount: 1890,
    icon: "Flame",
    bgColor: "#FFF0F5",
    borderColor: "#FFC9DE",
  },
  {
    id: "badge-3",
    name: "Capstone Champion",
    category: "Projects",
    xpBonus: 1000,
    coinBonus: 300,
    unlockedCount: 890,
    icon: "Trophy",
    bgColor: "#E6F9F0",
    borderColor: "#9DD9C5",
  },
];

// 5. AI Prompt Templates
export const ADMIN_AI_PROMPTS: AdminAIPrompt[] = [
  {
    id: "ai-1",
    title: "AI Socratic Tutor Assistant",
    category: "Tutor",
    promptTemplate: "You are Future.ai's master tutor. Help the student understand {{topic}} without giving direct answers.",
    temperature: 0.7,
    model: "claude-3-5-sonnet",
    usesCount: 18450,
  },
  {
    id: "ai-2",
    title: "Interactive MCQ Auto-Generator",
    category: "Quiz Gen",
    promptTemplate: "Generate 5 multiple choice questions with explanations based on lesson: {{lesson_content}}.",
    temperature: 0.4,
    model: "gpt-4o",
    usesCount: 9210,
  },
];

// 6. Initial Interactive Roadmap Builder Nodes
export const INITIAL_ROADMAP_BUILDER_NODES: RoadmapNode[] = [
  { id: "node-1", title: "Introduction & Environment", type: "module", x: 160, y: 70, status: "completed", xp: 150, duration: "30m", icon: "BookOpen" },
  { id: "node-2", title: "Prompting Core Principles", type: "module", x: 540, y: 210, status: "completed", xp: 200, duration: "45m", icon: "Sparkles" },
  { id: "node-3", title: "Real-World Project Workflow", type: "module", x: 160, y: 350, status: "current", xp: 250, duration: "50m", icon: "Zap" },
  { id: "node-4", title: "Advanced Automation Pipelines", type: "module", x: 540, y: 490, status: "locked", xp: 300, duration: "55m", icon: "Cpu" },
  { id: "node-5", title: "Comprehensive Skill Assessment", type: "quiz", x: 160, y: 630, status: "locked", xp: 200, duration: "25m", icon: "HelpCircle" },
  { id: "node-6", title: "Mastery Certificate Verification", type: "certificate", x: 540, y: 770, status: "locked", xp: 500, duration: "10m", icon: "Trophy" },
];
