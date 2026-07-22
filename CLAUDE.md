# Future With AI - Software Requirements Specification (SRS)
Version 1.0

## 1. Project Overview
- **Project Name:** Future With AI
- **Project Type:** AI Learning Ecosystem (Enterprise Learning Management System)
- **Vision:** A modern AI-powered learning ecosystem designed to provide structured, interactive, and engaging learning experiences through AI voice lessons, gamification, certifications, personalized learning paths, and social learning.
- **Inspirations:** Coursera (Structured Learning), Duolingo (Gamification), LeetCode (Progress Tracking), LinkedIn Learning (Certifications), Coursiv (AI-first Learning).

## 2. Objectives & Target Audience
- **Objectives:** Teach AI through structured learning, support hundreds of courses, provide multilingual learning (English/Telugu), generate AI voice lessons, gamify learning for retention, and become India's leading AI learning platform.
- **Audience:** Students, Professionals, Entrepreneurs, Teachers, Content Creators, AI Enthusiasts.

## 3. Technology Stack
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, GSAP, React Bits, React Hook Form, Zod.
- **Backend:** Next.js (Route Handlers, Server Actions, Middleware). No separate Express backend for MVP.
- **Database:** PostgreSQL (Neon PostgreSQL), Prisma ORM.
- **Authentication:** Auth.js (JWT, Refresh Tokens, Google Login).
- **Storage:** Cloudflare R2 (Images, PDFs, Audio, Video).
- **Payments & Subscriptions:** Razorpay & Webhooks.
- **Third-Party Services:** ElevenLabs (Voice), pdf-lib (PDFs), qrcode, Resend (Emails), Google Analytics, PostHog.
- **Deployment:** Vercel (Frontend), Neon (DB), Cloudflare (CDN/R2).

## 4. UI Framework & Architecture
- **Design:** shadcn/ui + Tailwind CSS. Modern, premium, and interactive vibe.
- **Animation:** GSAP, React Bits, CSS Animations.
- **Architecture:** Client -> Server Components -> Route Handlers -> Prisma -> Neon DB.

## 5. Course Architecture & Learning Features
- **Hierarchy:** Category -> Course -> Module -> Lesson -> Quiz -> Assessment -> Certificate.
- **Features:** Multilingual AI voice lessons, bookmarks, notes, estimated reading time, progress tracking, playback speed.

## 6. Quiz & Assessment Engine
- **Types:** Multiple Choice, True/False, Fill in Blank, Match, Drag/Drop, Sequence, Scenario, Audio/Image, Flashcards, Timed.
- **Gamification:** XP Rewards, Coins, Streak Bonus, Explanations, Timer.
- **Final Assessment:** 25 Questions, Randomized, Timer, Passing Percentage threshold for Certificates.

## 7. Certificates & Gamification
- **Certificates:** PDF generation with Student Name, QR Code, Verification URL. Stored in Cloudflare R2.
- **Gamification (Learning Journey):** XP System, Daily Streaks (GitHub-style calendar), Weekly/Monthly Challenges, Badges, Milestones, Streak Freeze.
- **AI Coin Economy:** Earn via lessons/quizzes/streaks. Spend on course discounts, premium content, AI templates.

## 8. AI Features
- Voice Lessons, Notes Generator, Quiz Generator, LinkedIn Post Generator, Weekly Summary, Course Recommendations, AI Tutor, Career Roadmap.

## 9. Dashboards & Roles
- **Roles:** Guest, Learner, Instructor/Creator, Admin, Super Admin.
- **Learner Dashboard:** Heatmap, Goals, Library, Certificates, Coin Wallet, Leaderboard.
- **Instructor Dashboard:** Course/Quiz Builders, Student Analytics, Revenue Overview.
- **Admin Dashboard:** Platform Overview, Subscriptions, User Analytics.

## 10. Security & Performance Principles
- **Security:** RBAC, JWT, Password Hashing, HTTPS, Helmet, Rate Limiting, CORS, SQLi/XSS/CSRF Protection, Audit Logging.
- **Performance:** Mobile-first, responsive, SEO-optimized, Code Splitting, Streaming, Caching, Image Optimization.
- **Development:** Component-driven, clean architecture, type-safe, API-first design.

## Appendix A: Learning Journey Module
- **Dashboard:** Activity Heatmap (lessons, quizzes, XP).
- **GitHub-style Calendar:** White=no learning, Green=learned, Yellow=goal, Blue=perfect day, Purple=challenge.
- **Mechanics:** Streak Milestones (1, 3, 7, 30... 365 days), Shareable Cards, Smart Motivation Reminders.
