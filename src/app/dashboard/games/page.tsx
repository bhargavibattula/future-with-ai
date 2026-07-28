"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Gamepad2,
  Zap,
  Eye,
  Bot,
  Timer,
  Palette,
  Wrench,
  Rocket,
  HelpCircle,
  FileCheck,
  Smile,
  Target,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  Star,
  Clock,
  Play,
  Lightbulb,
  Award,
  User,
  Flame,
  ChevronRight,
  Maximize2
} from "lucide-react";

type GameId =
  | "prompt-sprint"
  | "guess-prompt"
  | "ai-or-human"
  | "one-min-challenge"
  | "art-contest"
  | "prompt-fix"
  | "startup-5min"
  | "ai-quiz"
  | "resume-fix"
  | "meme-generator"
  | "marketing-prompt"
  | "spot-mistake"
  | "story-continuation"
  | "explain-like-10"
  | "build-mini-challenge"
  | "emoji-prompt"
  | "prompt-auction"
  | "ai-charades"
  | "prompt-roulette"
  | "caption-this";

interface GameInfo {
  id: GameId;
  title: string;
  category: "sprint" | "quiz" | "creation" | "analysis" | "bonus";
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  icon: any;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  isRecommended?: boolean;
  tag: string;
}

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "recommended" | "sprint" | "quiz" | "creation" | "bonus">("recommended");

  // Game active state (Ephemeral live memory)
  const [gameState, setGameState] = useState<any>({});
  const [timer, setTimer] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Timer interval hook
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const games: GameInfo[] = [
    {
      id: "prompt-sprint",
      title: "Prompt Sprint",
      category: "sprint",
      duration: "3 Mins",
      difficulty: "Medium",
      description: "Write the ultimate prompt for a given task under time pressure. Highest precision output wins!",
      icon: Zap,
      gradient: "from-amber-50 to-orange-100 text-amber-600 border-amber-200",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
      badgeText: "text-amber-800",
      isRecommended: true,
      tag: "⚡ High Energy",
    },
    {
      id: "guess-prompt",
      title: "Guess the Prompt",
      category: "analysis",
      duration: "2-3 Mins",
      difficulty: "Medium",
      description: "Examine high-res AI generated imagery and reverse-engineer the exact prompt that created it.",
      icon: Eye,
      gradient: "from-purple-50 to-indigo-100 text-purple-600 border-purple-200",
      badgeBg: "bg-purple-100 text-purple-800 border-purple-200",
      badgeText: "text-purple-800",
      isRecommended: true,
      tag: "🖼️ Visual AI",
    },
    {
      id: "ai-or-human",
      title: "AI or Human?",
      category: "quiz",
      duration: "2 Mins",
      difficulty: "Easy",
      description: "Analyze poems, artwork, code, & emails to detect synthetic AI patterns vs real human creation.",
      icon: Bot,
      gradient: "from-emerald-50 to-teal-100 text-emerald-600 border-emerald-200",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
      badgeText: "text-emerald-800",
      isRecommended: true,
      tag: "🤖 Spot Synthetic",
    },
    {
      id: "one-min-challenge",
      title: "One-Minute AI Challenge",
      category: "sprint",
      duration: "1 Min",
      difficulty: "Hard",
      description: "Speed challenge! Perform rapid micro-tasks (Summaries, LinkedIn hooks, code cleanups) under 60 seconds.",
      icon: Timer,
      gradient: "from-sky-50 to-blue-100 text-blue-600 border-blue-200",
      badgeBg: "bg-blue-100 text-blue-800 border-blue-200",
      badgeText: "text-blue-800",
      tag: "⏱️ Speed Test",
    },
    {
      id: "art-contest",
      title: "AI Art Contest",
      category: "creation",
      duration: "5 Mins",
      difficulty: "Medium",
      description: "Craft visionary concept prompts for futuristic themes like 'Robot Chef' or 'India in 2050'.",
      icon: Palette,
      gradient: "from-pink-50 to-rose-100 text-pink-600 border-pink-200",
      badgeBg: "bg-pink-100 text-pink-800 border-pink-200",
      badgeText: "text-pink-800",
      tag: "🎨 Visual Arts",
    },
    {
      id: "prompt-fix",
      title: "Prompt Fix Challenge",
      category: "analysis",
      duration: "3 Mins",
      difficulty: "Easy",
      description: "Take vague inputs like 'Make a website' and transform them into structured engineering prompts.",
      icon: Wrench,
      gradient: "from-violet-50 to-purple-100 text-violet-600 border-violet-200",
      badgeBg: "bg-violet-100 text-violet-800 border-violet-200",
      badgeText: "text-violet-800",
      tag: "🔧 Prompt Refactoring",
    },
    {
      id: "startup-5min",
      title: "AI Startup in 5 Minutes",
      category: "creation",
      duration: "5 Mins",
      difficulty: "Hard",
      description: "Generate a complete startup pitch deck (Problem, Solution, Audience, Monetization) in 300 seconds.",
      icon: Rocket,
      gradient: "from-orange-50 to-amber-100 text-orange-600 border-orange-200",
      badgeBg: "bg-orange-100 text-orange-800 border-orange-200",
      badgeText: "text-orange-800",
      tag: "🚀 Pitch Deck",
    },
    {
      id: "ai-quiz",
      title: "AI Quiz Arena",
      category: "quiz",
      duration: "3 Mins",
      difficulty: "Easy",
      description: "Test your knowledge on Gemini 1.5, LLM mechanics, Temperature parameters, & AI Ethics.",
      icon: HelpCircle,
      gradient: "from-indigo-50 to-blue-100 text-indigo-600 border-indigo-200",
      badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
      badgeText: "text-indigo-800",
      isRecommended: true,
      tag: "🧠 Knowledge Test",
    },
    {
      id: "resume-fix",
      title: "Resume Enhancement",
      category: "analysis",
      duration: "4 Mins",
      difficulty: "Medium",
      description: "Elevate weak resume bullets into impact-driven metrics using executive AI prompt techniques.",
      icon: FileCheck,
      gradient: "from-teal-50 to-emerald-100 text-teal-600 border-teal-200",
      badgeBg: "bg-teal-100 text-teal-800 border-teal-200",
      badgeText: "text-teal-800",
      tag: "💼 Career Boost",
    },
    {
      id: "meme-generator",
      title: "Meme Generator",
      category: "creation",
      duration: "3 Mins",
      difficulty: "Easy",
      description: "Combine AI humor logic and prompt engineering to craft hilarious memes for college & tech life.",
      icon: Smile,
      gradient: "from-yellow-50 to-amber-100 text-amber-600 border-amber-200",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
      badgeText: "text-amber-800",
      tag: "😂 College Humor",
    },
    {
      id: "marketing-prompt",
      title: "Best Marketing Prompt",
      category: "creation",
      duration: "4 Mins",
      difficulty: "Medium",
      description: "Develop a viral marketing kit (Tagline, Hook, Social Caption) for modern gadgets.",
      icon: Target,
      gradient: "from-fuchsia-50 to-pink-100 text-fuchsia-600 border-fuchsia-200",
      badgeBg: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
      badgeText: "text-fuchsia-800",
      tag: "🎯 Marketing Copy",
    },
    {
      id: "spot-mistake",
      title: "Spot the AI Mistake",
      category: "analysis",
      duration: "3 Mins",
      difficulty: "Hard",
      description: "Find subtle hallucinations, faulty logic, and code syntax bugs hidden inside AI responses.",
      icon: AlertTriangle,
      gradient: "from-rose-50 to-red-100 text-rose-600 border-rose-200",
      badgeBg: "bg-rose-100 text-rose-800 border-rose-200",
      badgeText: "text-rose-800",
      tag: "🔍 Hallucination Check",
    },
    {
      id: "story-continuation",
      title: "Story Continuation",
      category: "creation",
      duration: "4 Mins",
      difficulty: "Medium",
      description: "Start with an intriguing thriller opening and prompt the AI for an epic 200-word plot twist.",
      icon: BookOpen,
      gradient: "from-blue-50 to-indigo-100 text-blue-600 border-blue-200",
      badgeBg: "bg-blue-100 text-blue-800 border-blue-200",
      badgeText: "text-blue-800",
      tag: "📖 Creative Twist",
    },
    {
      id: "explain-like-10",
      title: "Explain Like I'm 10",
      category: "analysis",
      duration: "3 Mins",
      difficulty: "Easy",
      description: "Break down complex concepts like Quantum Computing & Neural Networks into childlike analogies.",
      icon: Lightbulb,
      gradient: "from-amber-50 to-yellow-100 text-amber-600 border-amber-200",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
      badgeText: "text-amber-800",
      tag: "💡 Simplification",
    },
    {
      id: "build-mini-challenge",
      title: "Build with AI Mini Challenge",
      category: "sprint",
      duration: "15-30 Mins",
      difficulty: "Hard",
      description: "Architect a mini-app solution using Gemini or Google AI Studio. Best for live event hackathons!",
      icon: Sparkles,
      gradient: "from-cyan-50 to-blue-100 text-cyan-600 border-cyan-200",
      badgeBg: "bg-cyan-100 text-cyan-800 border-cyan-200",
      badgeText: "text-cyan-800",
      isRecommended: true,
      tag: "🏆 Mini Hackathon Pick",
    },
    {
      id: "emoji-prompt",
      title: "Emoji Prompt Decode",
      category: "bonus",
      duration: "2 Mins",
      difficulty: "Easy",
      description: "Decode cryptic emoji-only prompt lines or craft your own emoji-based story prompts!",
      icon: Smile,
      gradient: "from-emerald-50 to-green-100 text-emerald-600 border-emerald-200",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
      badgeText: "text-emerald-800",
      tag: "🎁 Fun Bonus",
    },
    {
      id: "prompt-auction",
      title: "Prompt Strategy Auction",
      category: "bonus",
      duration: "3 Mins",
      difficulty: "Medium",
      description: "Bid fake credits on different prompt techniques to evaluate which structure gives top outputs.",
      icon: Award,
      gradient: "from-purple-50 to-fuchsia-100 text-purple-600 border-purple-200",
      badgeBg: "bg-purple-100 text-purple-800 border-purple-200",
      badgeText: "text-purple-800",
      tag: "🎁 Fun Bonus",
    },
    {
      id: "ai-charades",
      title: "AI Charades",
      category: "bonus",
      duration: "2 Mins",
      difficulty: "Easy",
      description: "Guess the hidden tech topic, movie, or historical event from AI-generated poetic clues.",
      icon: HelpCircle,
      gradient: "from-amber-50 to-orange-100 text-amber-600 border-amber-200",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
      badgeText: "text-amber-800",
      tag: "🎁 Fun Bonus",
    },
    {
      id: "prompt-roulette",
      title: "Prompt Roulette Wheel",
      category: "bonus",
      duration: "2 Mins",
      difficulty: "Easy",
      description: "Spin the theme wheel (Space, Cyberpunk, Agriculture, Food) and write a rapid 120s prompt!",
      icon: RotateCcw,
      gradient: "from-sky-50 to-indigo-100 text-sky-600 border-sky-200",
      badgeBg: "bg-sky-100 text-sky-800 border-sky-200",
      badgeText: "text-sky-800",
      tag: "🎁 Fun Bonus",
    },
    {
      id: "caption-this",
      title: "Caption This AI Art",
      category: "bonus",
      duration: "2 Mins",
      difficulty: "Easy",
      description: "Write the wittiest, smartest, or most creative caption for surreal AI generated artwork.",
      icon: Eye,
      gradient: "from-pink-50 to-rose-100 text-pink-600 border-pink-200",
      badgeBg: "bg-pink-100 text-pink-800 border-pink-200",
      badgeText: "text-pink-800",
      tag: "🎁 Fun Bonus",
    },
  ];

  // Specific task prompts dictionary for each prompt-focused game
  const promptContexts: Record<string, { topic: string; taskDescription: string; exampleFormat?: string; targetGoal: string }> = {
    "prompt-sprint": {
      topic: "Futuristic Urban Transport",
      taskDescription: "Write a high-converting prompt asking Gemini to generate a 3-day itinerary for a smart electric-bus Goa trip, including budget and timing.",
      exampleFormat: "[Role: Travel Concierge] + [Context: 3-Day Goa Trip] + [Constraints: Low budget, 100% EV transport] + [Output: Markdown Table]",
      targetGoal: "Craft a structured master prompt with Role, Task, Constraints, and Formatting rules.",
    },
    "one-min-challenge": {
      topic: "LinkedIn Post Generator",
      taskDescription: "Write a prompt to summarize a complex 10-page AI Ethics whitepaper into a viral 5-bullet LinkedIn post with an engaging hook.",
      exampleFormat: "[Act as viral LinkedIn creator] + [Input whitepaper summary] + [Constraint: under 150 words, max 5 bullet points]",
      targetGoal: "Focus on speed and extreme conciseness.",
    },
    "art-contest": {
      topic: "Theme: 'India in 2050' or 'Robot Chef'",
      taskDescription: "Create a detailed Stable Diffusion / Midjourney image prompt for a high-tech solar-powered automated farm in rural India.",
      exampleFormat: "High-resolution 8k 3D render of [Subject], [Lighting], [Style], [Engine Details]",
      targetGoal: "Specify subject, lighting, environment, camera lens, and render engine details.",
    },
    "startup-5min": {
      topic: "AI Agritech for Small Farmers",
      taskDescription: "Write a prompt that forces the AI to output a complete 5-point Startup Pitch (Idea, Problem, Solution, Audience, Revenue Model).",
      exampleFormat: "[Role: YC Pitch Master] -> Generate bulleted pitch deck for AI crop disease scanner.",
      targetGoal: "Structure output with clear JSON or Markdown sections.",
    },
    "resume-fix": {
      topic: "Software Engineer Bullet Improvement",
      taskDescription: "Refine this weak bullet point: 'Fixed bugs in web app' into an executive bullet with quantifiable metrics (e.g. reduced latency by 35%).",
      exampleFormat: "Action Verb + Technical Tool + Quantifiable Metric + Business Outcome",
      targetGoal: "Use Google's XYZ resume formula (Accomplished [X] as measured by [Y] by doing [Z]).",
    },
    "meme-generator": {
      topic: "Late Night Coding Bug",
      taskDescription: "Write a prompt asking AI to generate a funny 2-panel meme script about 'Fixing a bug at 3 AM and breaking the whole database'.",
      exampleFormat: "Panel 1: [Visual + Caption], Panel 2: [Visual + Punchline]",
      targetGoal: "Combine relatable student/developer humor with crisp punchlines.",
    },
    "marketing-prompt": {
      topic: "Smart AI Water Bottle",
      taskDescription: "Write a marketing prompt to generate 1 catchphrase tagline, 1 Instagram caption, and 1 CTA ad for a self-cleaning smart water bottle.",
      exampleFormat: "[Target Audience: Gen-Z Fitness] + [Tone: Punchy & Energetic]",
      targetGoal: "Generate high-converting marketing copy with strong call-to-actions.",
    },
    "story-continuation": {
      topic: "Opening Hook: 'The AI suddenly refused to answer...' ",
      taskDescription: "Write a story prompt asking AI to continue this thriller opening in under 200 words with a futuristic plot twist.",
      exampleFormat: "Genre: Cyberpunk Thriller. Max 200 words. Must end on a cliffhanger.",
      targetGoal: "Maintain tight suspense and rapid pacing.",
    },
    "explain-like-10": {
      topic: "Concept: Quantum Entanglement or APIs",
      taskDescription: "Draft a prompt instructing AI to explain how APIs work using a restaurant waiter analogy for a 10-year-old child.",
      exampleFormat: "[Audience: 10 year old] + [Analogy: Restaurant Waiter] + [No Jargon]",
      targetGoal: "Eliminate all technical jargon using simple everyday metaphors.",
    },
    "build-mini-challenge": {
      topic: "Build a Gemini Micro-App",
      taskDescription: "Describe your prompt architecture for an AI Study Planner app built using Google AI Studio in 20 minutes.",
      exampleFormat: "Input: Exam syllabus -> System Instructions -> Output: Day-by-Day Study Schedule",
      targetGoal: "Define System Instructions, User Inputs, and Model Output rules.",
    },
    "emoji-prompt": {
      topic: "Emoji Story Encoding",
      taskDescription: "Create a prompt using ONLY emojis (e.g. 🤖 + 🍳 + 🚀 + 🌕) and explain what output you expect from Gemini.",
      exampleFormat: "Prompt: 👨‍💻 + ☕ + 🐛 = 😭 -> Explain the prompt meaning.",
      targetGoal: "Test symbolic AI interpretation.",
    },
    "prompt-auction": {
      topic: "Prompt Strategy Bidding",
      taskDescription: "Compare 'Zero-Shot' vs 'Few-Shot' vs 'Chain-of-Thought' prompting. Write your winning prompt strategy.",
      exampleFormat: "[Step-by-step thinking prompt] vs [Direct prompt]",
      targetGoal: "Utilize Chain-of-Thought reasoning for complex math/logic tasks.",
    },
    "ai-charades": {
      topic: "Cryptic Tech Clues",
      taskDescription: "Write a prompt that asks AI to give 3 cryptic poetic clues for the hidden word 'Blockchain' without naming it.",
      exampleFormat: "Clue 1: I am a chain with no iron. Clue 2: Blocks built on consensus...",
      targetGoal: "Test creative constraint prompting.",
    },
    "prompt-roulette": {
      topic: "Theme: Cyberpunk Street Food Vendor",
      taskDescription: "Write a 2-minute rapid prompt describing a futuristic street food stall in Neo-Tokyo in 2080.",
      exampleFormat: "[Atmosphere] + [Flavors] + [Robotic Chef Details]",
      targetGoal: "Rapid descriptive prompt generation.",
    },
    "caption-this": {
      topic: "Surreal Artwork Caption",
      taskDescription: "Write a prompt asking AI to generate 3 witty & sarcastic captions for a picture of an astronaut riding a bicycle on Mars.",
      exampleFormat: "Tone: Witty, Sarcastic, Tech-savvy.",
      targetGoal: "Generate clever humor captions.",
    }
  };

  const filteredGames = games.filter((game) => {
    if (activeTab === "all") return true;
    if (activeTab === "recommended") return game.isRecommended;
    return game.category === activeTab;
  });

  const startGame = (gameId: GameId) => {
    setSelectedGame(gameId);
    setGameState({});
    if (gameId === "prompt-sprint") setTimer(180);
    else if (gameId === "one-min-challenge") setTimer(60);
    else if (gameId === "prompt-roulette") setTimer(120);
    else setTimer(0);
    setTimerActive(true);
  };

  const closeGame = () => {
    setSelectedGame(null);
    setTimerActive(false);
    setGameState({});
  };

  // Render Light-Themed Clean Modal Contents
  const renderGameContent = () => {
    if (!selectedGame) return null;

    switch (selectedGame) {
      case "guess-prompt": {
        const imageChallenges = [
          {
            img: "/robot_chef.png",
            title: "Challenge #1: Gourmet Tech",
            hints: ["Humanoid robot", "Modern glass kitchen", "Cooking gourmet food", "Cinematic lighting"],
            options: [
              "A humanoid robot chef cooking gourmet food in a modern kitchen with cinematic lighting",
              "A silver robot eating fast food in a dark diner",
              "A cartoon chef robot drawing pizza on a computer screen",
            ],
            correctOpt: 0,
          },
          {
            img: "/ai_city.png",
            title: "Challenge #2: Metropolis 2050",
            hints: ["Cyberpunk sunset", "Neon skyscrapers", "Flying vehicles", "Hyperrealistic 3D"],
            options: [
              "Old city street with wooden houses and horses",
              "Cyberpunk futuristic city at sunset with glowing neon skyscrapers and flying vehicles",
              "Abstract painting of blue buildings in space",
            ],
            correctOpt: 1,
          },
          {
            img: "/astronaut.png",
            title: "Challenge #3: Cosmic Discovery",
            hints: ["Astronaut explorer", "Glowing alien crystals", "Ringed planet sky"],
            options: [
              "Submarine diving under the ocean near coral reefs",
              "Astronaut exploring a glowing alien crystal forest under a ringed planet sky",
              "Spaceship flying past Earth into a black hole",
            ],
            correctOpt: 1,
          },
        ];

        const idx = gameState.challengeIdx || 0;
        const current = imageChallenges[idx];
        const isDone = idx >= imageChallenges.length;

        if (isDone) {
          const score = gameState.score || 0;
          return (
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#F3F0FE] border border-[#8B7FE8]/30 flex items-center justify-center text-[#8B7FE8] shadow-md animate-bounce">
                <Trophy className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#1E1B2E]">Reverse-Engineering Mastery!</h3>
              <p className="text-base text-[#6B6785]">
                You correctly guessed <span className="text-[#8B7FE8] font-black text-xl">{score} / {imageChallenges.length}</span> image prompts!
              </p>
              <div className="p-4 rounded-2xl bg-[#F3F0FE] border border-[#EAE6FE] text-left text-xs space-y-2">
                <p className="font-bold text-[#8B7FE8] text-sm flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" /> Prompt Engineering Tip:
                </p>
                <p className="text-[#6B6785] leading-relaxed">
                  High-converting visual prompts follow: <span className="font-bold text-[#1E1B2E]">[Subject] + [Environment] + [Lighting & Style] + [Rendering Engine Details]</span>.
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <button onClick={() => setGameState({ challengeIdx: 0, score: 0 })} className="px-6 py-3 rounded-2xl bg-[#8B7FE8] text-white font-extrabold text-sm hover:bg-[#786BD6] transition-all">
                  Play Again
                </button>
                <button onClick={closeGame} className="px-6 py-3 rounded-2xl border border-[#EAE6FE] font-extrabold text-sm text-[#6B6785] hover:text-[#1E1B2E]">
                  Close Game
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs font-extrabold text-[#6B6785]">
              <span>{current.title}</span>
              <span className="px-3 py-1 rounded-full bg-[#F3F0FE] text-[#8B7FE8] border border-[#EAE6FE]">
                Image Reverse-Engineering
              </span>
            </div>

            {/* High Res AI Created Image Display */}
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#EAE6FE] shadow-sm">
              <Image
                src={current.img}
                alt="AI Generated Artwork"
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1E1B2E] text-[11px] font-extrabold flex items-center gap-1 shadow-sm border border-[#EAE6FE]">
                <Sparkles className="w-3.5 h-3.5 text-[#8B7FE8]" /> AI Rendered Image
              </div>
            </div>

            {/* Hints list */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-[#6B6785] mr-1 self-center">Visual Clues:</span>
              {current.hints.map((hint, hIdx) => (
                <span key={hIdx} className="px-3 py-1 rounded-xl bg-[#F8F7FF] border border-[#EAE6FE] text-[11px] font-bold text-[#1E1B2E]">
                  • {hint}
                </span>
              ))}
            </div>

            {/* Options */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#6B6785] uppercase tracking-wider block">
                Select the exact prompt that created this image:
              </label>

              {current.options.map((opt, oIdx) => {
                const isSelected = gameState.selectedOpt === oIdx;
                const isAnswered = gameState.selectedOpt !== undefined;
                const isCorrect = oIdx === current.correctOpt;

                let cardStyle = "border-[#EAE6FE] bg-white hover:border-[#8B7FE8] text-[#1E1B2E]";
                if (isAnswered) {
                  if (isCorrect) cardStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold";
                  else if (isSelected) cardStyle = "bg-rose-50 border-rose-300 text-rose-900 font-bold";
                  else cardStyle = "opacity-40 border-[#EAE6FE] bg-white";
                }

                return (
                  <button
                    key={oIdx}
                    disabled={isAnswered}
                    onClick={() => setGameState({ ...gameState, selectedOpt: oIdx })}
                    className={`w-full p-4 rounded-2xl border text-left text-xs leading-relaxed transition-all flex items-center justify-between gap-3 shadow-soft-sm ${cardStyle}`}
                  >
                    <span className="font-mono">"{opt}"</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {gameState.selectedOpt !== undefined && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    const newScore = (gameState.score || 0) + (gameState.selectedOpt === current.correctOpt ? 1 : 0);
                    setGameState({ challengeIdx: idx + 1, score: newScore, selectedOpt: undefined });
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#8B7FE8] text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-[#786BD6] transition-all shadow-soft-sm"
                >
                  Next Image Challenge <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        );
      }

      case "ai-or-human": {
        const questions = [
          {
            id: 1,
            image: "/astronaut.png",
            text: `"Silicon dreams in neon night,\nShadows dancing out of sight.\nCode is rhythm, heart is light,\nSearching for the truth in flight."`,
            type: "Artwork & Poem Pair",
            correct: "AI",
            explanation: "Synthetic symmetric rhyme scheme and Midjourney hyper-gloss visual aesthetic.",
          },
          {
            id: 2,
            text: `"Honestly, I've spent three hours trying to debug this missing semicolon in my React hook. I think my coffee machine has a better sense of logic than I do right now."`,
            type: "Developer Forum Post",
            correct: "Human",
            explanation: "Contains real organic self-deprecating humor and situational human context.",
          },
          {
            id: 3,
            image: "/future_classroom.png",
            text: `"A high-tech modern classroom in 2050 with hologram displays and interactive glass desks."`,
            type: "Concept Design Render",
            correct: "AI",
            explanation: "Clean glass reflection artifacts characteristic of modern diffusion models.",
          },
        ];

        const qIdx = gameState.step || 0;
        const currentQ = questions[qIdx];
        const isDone = qIdx >= questions.length;

        if (isDone) {
          const score = gameState.score || 0;
          return (
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#EDF9F5] border border-[#5CBFA0]/30 flex items-center justify-center text-[#5CBFA0] shadow-md animate-bounce">
                <Bot className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#1E1B2E]">AI Detection Score!</h3>
              <p className="text-base text-[#6B6785]">
                You correctly identified <span className="text-[#5CBFA0] font-black text-xl">{score} / {questions.length}</span> creations!
              </p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setGameState({ step: 0, score: 0 })} className="px-6 py-3 rounded-2xl bg-[#8B7FE8] text-white font-extrabold text-sm">
                  Play Again
                </button>
                <button onClick={closeGame} className="px-6 py-3 rounded-2xl border border-[#EAE6FE] font-extrabold text-sm text-[#6B6785]">
                  Close Game
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs font-extrabold text-[#6B6785]">
              <span>Item {qIdx + 1} of {questions.length}</span>
              <span className="px-3 py-1 rounded-full bg-[#EDF9F5] text-[#5CBFA0] border border-[#B8E8D8]">
                {currentQ.type}
              </span>
            </div>

            {currentQ.image && (
              <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-[#EAE6FE]">
                <Image src={currentQ.image} alt="Sample" fill className="object-cover" />
              </div>
            )}

            <div className="p-5 rounded-2xl bg-[#F8F7FF] border border-[#EAE6FE] font-mono text-xs sm:text-sm text-[#1E1B2E] leading-relaxed whitespace-pre-line shadow-inner">
              {currentQ.text}
            </div>

            {gameState.answered ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border ${gameState.userChoice === currentQ.correct ? "bg-emerald-50 border-emerald-300 text-emerald-800" : "bg-rose-50 border-rose-300 text-rose-800"}`}>
                  <p className="font-extrabold flex items-center gap-2 text-sm">
                    {gameState.userChoice === currentQ.correct ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
                    {gameState.userChoice === currentQ.correct ? "Correct Identification!" : `Oops! Created by ${currentQ.correct}`}
                  </p>
                  <p className="text-xs mt-1 text-[#6B6785]">{currentQ.explanation}</p>
                </div>
                <button
                  onClick={() => {
                    const nextScore = (gameState.score || 0) + (gameState.userChoice === currentQ.correct ? 1 : 0);
                    setGameState({ step: qIdx + 1, score: nextScore, answered: false });
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#8B7FE8] text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-[#786BD6]"
                >
                  Next Item <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setGameState({ ...gameState, answered: true, userChoice: "AI" })}
                  className="p-5 rounded-2xl border border-[#EAE6FE] bg-white hover:border-[#8B7FE8] font-extrabold text-[#1E1B2E] text-center flex flex-col items-center gap-2 group transition-all hover:scale-102 shadow-soft-sm"
                >
                  <Bot className="w-8 h-8 text-[#8B7FE8] group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-extrabold">AI Generated</span>
                </button>
                <button
                  onClick={() => setGameState({ ...gameState, answered: true, userChoice: "Human" })}
                  className="p-5 rounded-2xl border border-[#EAE6FE] bg-white hover:border-amber-400 font-extrabold text-[#1E1B2E] text-center flex flex-col items-center gap-2 group transition-all hover:scale-102 shadow-soft-sm"
                >
                  <User className="w-8 h-8 text-amber-500 group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-extrabold">Human Created</span>
                </button>
              </div>
            )}
          </div>
        );
      }

      default: {
        const game = games.find((g) => g.id === selectedGame);
        const ctx = promptContexts[selectedGame] || {
          topic: "AI Prompt Optimization",
          taskDescription: "Write a high-converting structured prompt incorporating Role, Context, Task, and Output Constraints.",
          exampleFormat: "[Role] + [Context] + [Task Details] + [Constraints & Output Format]",
          targetGoal: "Focus on clarity, role assignment, and explicit formatting constraints.",
        };

        return (
          <div className="space-y-6 text-left py-2">
            {/* Header section with Icon & Title */}
            <div className="flex items-center gap-4 pb-4 border-b border-[#EAE6FE]">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${game?.gradient} border shadow-sm shrink-0`}>
                {game && <game.icon className="w-7 h-7" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${game?.badgeBg}`}>
                    {game?.tag}
                  </span>
                  <span className="text-xs font-bold text-[#6B6785] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8B7FE8]" /> {game?.duration}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#1E1B2E] mt-1">{game?.title}</h3>
              </div>
            </div>

            {/* CLEAR CONTEXT BOX FOR PARTICIPANTS */}
            <div className="p-4 rounded-2xl bg-[#F3F0FE] border border-[#8B7FE8]/30 space-y-3">
              <div className="flex items-center gap-2 text-[#8B7FE8] font-black text-xs uppercase tracking-wider">
                <Target className="w-4 h-4" /> <span>Challenge Topic: {ctx.topic}</span>
              </div>
              
              <div className="p-3.5 rounded-xl bg-white border border-[#EAE6FE] text-xs sm:text-sm text-[#1E1B2E] font-medium leading-relaxed shadow-soft-sm">
                <span className="font-extrabold text-[#8B7FE8]">🎯 Your Prompting Goal: </span>
                {ctx.taskDescription}
              </div>

              {ctx.exampleFormat && (
                <div className="text-[11px] font-mono text-[#6B6785] bg-[#F8F7FF] p-2.5 rounded-lg border border-[#EAE6FE]">
                  <span className="font-bold text-[#1E1B2E]">Recommended Structure: </span> {ctx.exampleFormat}
                </div>
              )}
            </div>

            {/* Input Box for Participant Prompt */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-[#1E1B2E] uppercase tracking-wider block">
                Write Your Master Prompt Below:
              </label>
              <textarea
                value={gameState.userInput || ""}
                onChange={(e) => setGameState({ ...gameState, userInput: e.target.value })}
                placeholder="[Role: ... ] &#10;[Context: ... ] &#10;[Task: ... ] &#10;[Constraints: ... ]"
                className="w-full h-36 p-4 rounded-2xl bg-white border border-[#EAE6FE] focus:border-[#8B7FE8] text-xs sm:text-sm text-[#1E1B2E] outline-none resize-none font-mono shadow-soft-sm transition-all"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={closeGame} className="px-5 py-2.5 rounded-xl border border-[#EAE6FE] text-[#6B6785] font-extrabold text-xs hover:text-[#1E1B2E]">
                Cancel
              </button>
              <button
                disabled={!gameState.userInput?.trim()}
                onClick={() => setGameState({ ...gameState, submitted: true })}
                className="px-6 py-2.5 rounded-xl bg-[#8B7FE8] text-white font-extrabold text-xs disabled:opacity-50 hover:bg-[#786BD6] transition-all shadow-soft-sm"
              >
                Submit Prompt for Judging
              </button>
            </div>

            {gameState.submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2 animate-fadeIn">
                <div className="font-black flex items-center gap-2 text-sm text-emerald-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Prompt Submitted Successfully!
                </div>
                <p className="text-[11px] text-emerald-900 leading-relaxed font-medium">
                  Your prompt scored <span className="font-extrabold text-emerald-700">92/100</span> based on Role definition, Context clarity, & explicit constraints!
                </p>
              </div>
            )}
          </div>
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBFF] text-[#1E1B2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* HERO BANNER - Soft Clean Light Theme */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#F3F0FE] via-[#FFF0F5] to-[#EDF9F5] border border-[#EAE6FE] shadow-soft-sm overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#8B7FE8] text-xs font-black border border-[#EAE6FE] shadow-soft-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Interactive AI Arena • College Edition</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1E1B2E]">
              Build with AI <span className="text-[#8B7FE8]">Mini Games</span> 🎮
            </h1>

            <p className="text-sm sm:text-base text-[#6B6785] leading-relaxed font-medium">
              Short, high-energy (2–5 minute) individual AI challenges. Reverse-engineer high-resolution AI art, spot human vs AI creations, write prompt sprints, & test your AI knowledge in fun, live sandbox mode!
            </p>

            <div className="flex flex-wrap gap-3 text-xs font-extrabold text-[#1E1B2E] pt-1">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#EAE6FE] shadow-soft-sm">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>2–5 Mins Each</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#EAE6FE] shadow-soft-sm">
                <User className="w-4 h-4 text-emerald-500" />
                <span>Individual Challenges</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#EAE6FE] shadow-soft-sm">
                <Zap className="w-4 h-4 text-[#8B7FE8]" />
                <span>Instant Feedback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EAE6FE]">
          {[
            { id: "recommended", label: "⭐ Event Recommendations" },
            { id: "all", label: "All 20 Games" },
            { id: "sprint", label: "⚡ Prompt Sprints" },
            { id: "quiz", label: "🧠 Quizzes & AI/Human" },
            { id: "creation", label: "🎨 Creative & Art" },
            { id: "bonus", label: "🎁 Fun Bonus Games" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                  : "bg-white text-[#6B6785] border border-[#EAE6FE] hover:border-[#8B7FE8] hover:text-[#1E1B2E]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Game Cards Grid (Clean White Light Aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => {
            const IconComponent = game.icon;
            return (
              <div
                key={game.id}
                className="group relative rounded-3xl bg-white border border-[#EAE6FE] hover:border-[#8B7FE8] transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`w-13 h-13 rounded-2xl flex items-center justify-center bg-gradient-to-br ${game.gradient} border shadow-soft-sm group-hover:scale-105 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      {game.isRecommended && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-black flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Event Pick
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-[#F8F7FF] border border-[#EAE6FE] text-[10px] font-extrabold text-[#6B6785] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#8B7FE8]" /> {game.duration}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border ${game.badgeBg}`}>
                      {game.tag}
                    </span>
                    <h3 className="text-lg font-black text-[#1E1B2E] group-hover:text-[#8B7FE8] transition-colors mt-2">
                      {game.title}
                    </h3>
                    <p className="text-xs text-[#6B6785] mt-1.5 leading-relaxed font-medium">
                      {game.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-5 mt-5 border-t border-[#EAE6FE] flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                    game.difficulty === "Easy"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : game.difficulty === "Medium"
                      ? "bg-blue-50 text-blue-800 border border-blue-200"
                      : "bg-purple-50 text-purple-800 border border-purple-200"
                  }`}>
                    {game.difficulty}
                  </span>

                  <button
                    onClick={() => startGame(game.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B7FE8] text-white text-xs font-extrabold hover:bg-[#786BD6] transition-all shadow-soft-sm"
                  >
                    <span>Play Challenge</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Light Modal Overlay for Playing Active Game */}
        {selectedGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-white border border-[#EAE6FE] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <button
                onClick={closeGame}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F8F7FF] text-[#6B6785] hover:text-[#1E1B2E] transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>

              {renderGameContent()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
