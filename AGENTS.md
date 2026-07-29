<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — Development Guidelines for AI Agents

Welcome to **Future With AI**, an enterprise-grade AI Learning Ecosystem. This document specifies essential guidelines, architectural constraints, conventions, and workflows for AI agents working in this codebase.

---

## 1. Project Overview & Tech Stack

- **Project Name:** Future With AI
- **Application Type:** AI Learning Management System & Ecosystem
- **Framework & Core Tech:**
  - **Framework:** Next.js 16 (App Router)
  - **UI Library:** React 19
  - **Language:** TypeScript (Strict mode)
  - **Styling:** Tailwind CSS v4 + `shadcn/ui` + `clsx` / `tailwind-merge`
  - **Animations:** Framer Motion (`framer-motion`), GSAP (`gsap`, `@gsap/react`), CSS Animations
  - **Database & ORM:** PostgreSQL (Neon PostgreSQL) via Prisma ORM (`@prisma/client`)
  - **Authentication:** NextAuth.js v5 (`next-auth` beta) with `@auth/prisma-adapter`
  - **Storage:** Cloudflare R2 / AWS S3 Client (`@aws-sdk/client-s3`)
  - **Utilities:** `pdf-lib`, `qrcode`, `nodemailer`, `bcryptjs`, `lucide-react`, `react-icons`

---

## 2. Key Commands & Workflow

### Development Commands
- **Start Dev Server:** `npm run dev` (Runs Next.js dev server)
- **Production Build:** `npm run build`
- **Linting:** `npm run lint` (ESLint)
- **Prisma Schema Generation:** `npx prisma generate` (Runs automatically via `postinstall`)
- **Database Schema Push / Migration:** `npx prisma db push` or `npx prisma migrate dev`

---

## 3. Architecture & File Structure

```text
future-with-ai/
├── src/
│   ├── app/                # Next.js App Router (pages, layout, route handlers, server actions)
│   ├── components/         # React components
│   │   ├── ui/             # Reusable atomic UI components (shadcn/ui style)
│   │   ├── animations/     # Animation wrappers & visual effects
│   │   ├── auth/           # Authentication forms & cards
│   │   ├── course-path/    # Learning path & module modals
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Database clients (prisma), utils, auth configurations
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global CSS and custom styles
├── prisma/
│   └── schema.prisma       # Prisma ORM database models
├── public/                 # Static assets (images, icons, fonts)
├── AGENTS.md               # Guidelines for AI Coding Agents
└── CLAUDE.md               # SRS and architecture specifications
```

---

## 4. Coding & Implementation Rules

### Next.js 16 & React 19 Conventions
1. **Server vs Client Components:**
   - Default to Server Components (`src/app/...`) whenever possible for data fetching, SEO, and performance.
   - Use `'use client'` explicitly at the top of files that require interactivity, state (`useState`, `useEffect`), or browser APIs.
2. **Async Request APIs:**
   - In Next.js 16, dynamic APIs such as `params`, `searchParams`, `cookies()`, and `headers()` are asynchronous. Always `await` them where applicable.
3. **Data Fetching & Mutations:**
   - Use Next.js Server Actions or Route Handlers (`src/app/api/...`) for backend interactions.
   - Keep database queries inside Server Components or server-side service modules using Prisma.

### Styling & UI Design Standards
1. **Aesthetics & UI:**
   - Maintain a modern, sleek, high-end AI ecosystem visual feel.
   - Use dark mode glassmorphism, vibrant accent gradients, and smooth micro-interactions.
   - Rely on `clsx` and `tailwind-merge` (`cn` helper) for dynamic class combination.
2. **Typography & Icons:**
   - Use Lucide icons (`lucide-react`) or React Icons (`react-icons`).
   - Ensure clear typographic hierarchy and responsive layout design (mobile-first approach).

### TypeScript & Code Quality
1. **Strict Typing:**
   - Avoid `any`. Define explicit interfaces and types for props, state, and API payload schemas.
   - Use Zod schemas where validation is required for form or API request data.
2. **Preserve Code Structure:**
   - Do not remove existing docstrings or exports unless explicitly requested.
   - Maintain clean modular architecture with single-responsibility components.

---

## 5. Verification Checklist for Agents

Before completing any task:
- [x] Ensure all modified/added files are properly imported and typed.
- [x] Check that database queries match `prisma/schema.prisma`.
- [x] Verify that Next.js 16 async APIs (like `params` or `searchParams`) are handled properly.
- [x] Verify build or syntax validity when modifying core layouts or components.

