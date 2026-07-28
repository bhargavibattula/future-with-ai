# Future With AI — Top 100 Prompt Library
Production-ready, premium-tier prompts for students, developers, marketers, and creators. Each entry is seed-ready: Title · Category · Difficulty · Tags · Description · Variables · Prompt.

---

## 1. Programming — React & Frontend (10)

**1. React Landing Page Generator**
- Difficulty: Intermediate | Tags: React, Tailwind, UI
- Description: Generates a complete, responsive landing page component.
- Variables: `{product_name}`, `{industry}`, `{primary_color}`
> Build a fully responsive React + Tailwind CSS landing page for "{product_name}", a product in the {industry} industry. Include a hero section with headline and CTA, a features section (3 cards), a testimonials carousel, a pricing table, and a footer. Use {primary_color} as the accent color, semantic HTML, and mobile-first breakpoints. Output a single functional component with no external image dependencies (use placeholder divs).

**2. Dashboard UI Generator**
- Difficulty: Advanced | Tags: React, Dashboard, Charts
- Description: Scaffolds an admin/analytics dashboard layout.
- Variables: `{dashboard_type}`, `{metrics_list}`
> Design a React dashboard UI for a {dashboard_type} application. Include a collapsible sidebar, a top navbar with search and profile menu, and a main content area showing these metrics as cards: {metrics_list}. Add one line chart and one bar chart placeholder using recharts. Use a clean grid layout with Tailwind, and make it responsive down to tablet width.

**3. Authentication Flow Builder**
- Difficulty: Intermediate | Tags: React, Auth, Forms
- Description: Builds login/register/forgot-password flow with validation.
- Variables: `{auth_provider}`, `{fields_required}`
> Create a complete authentication flow in React using React Hook Form and Zod for validation, covering Login, Register, and Forgot Password screens. Required fields: {fields_required}. Integrate with {auth_provider} conceptually (show where the API call would go). Include inline error messages, a loading state on submit, and a toggle between light/dark theme.

**4. Responsive Navbar Generator**
- Difficulty: Beginner | Tags: React, Navigation, Responsive
- Description: Builds a navbar that collapses into a mobile menu.
- Variables: `{nav_items}`, `{brand_name}`
> Build a responsive React navbar for "{brand_name}" with these nav items: {nav_items}. On desktop show a horizontal menu with a CTA button; on mobile collapse into a hamburger menu with a slide-in drawer. Use Tailwind CSS transitions for smooth open/close animation.

**5. Animated Hero Section (GSAP)**
- Difficulty: Advanced | Tags: React, GSAP, Animation
- Description: Creates a scroll/entry-animated hero section.
- Variables: `{headline}`, `{subtext}`, `{animation_style}`
> Build a React hero section with GSAP animations using the {animation_style} style (e.g. staggered fade-up, text reveal, parallax). Headline: "{headline}". Subtext: "{subtext}". Animate the headline word-by-word on mount, fade in the CTA button last, and add a subtle floating background shape animated on a loop. Include cleanup of GSAP timelines on unmount.

**6. Pricing Cards Component**
- Difficulty: Beginner | Tags: React, Pricing, UI
- Description: Builds a 3-tier pricing table with a highlighted plan.
- Variables: `{plan_names}`, `{plan_prices}`, `{highlighted_plan}`
> Create a 3-column pricing cards component in React + Tailwind for plans {plan_names} priced at {plan_prices}. Visually highlight "{highlighted_plan}" with a border, badge, and slight scale-up. Each card lists 5 features with checkmark icons and a CTA button. Make it stack vertically on mobile.

**7. Dark Theme Toggle System**
- Difficulty: Intermediate | Tags: React, Theming, Tailwind
- Description: Implements a persistent light/dark mode toggle.
- Variables: `{storage_method}`
> Implement a dark/light theme toggle in React using Tailwind's `dark:` classes. Persist the user's choice using {storage_method} (e.g. localStorage, cookie) and respect the system preference on first load via `prefers-color-scheme`. Provide a reusable `useTheme` hook and a toggle button component with a sun/moon icon swap animation.

**8. Shadcn Component Composer**
- Difficulty: Intermediate | Tags: React, shadcn/ui, Components
- Description: Assembles a shadcn/ui-based UI block for a specific use case.
- Variables: `{use_case}`, `{components_needed}`
> Using shadcn/ui primitives ({components_needed}), build a composed UI block for {use_case} (e.g. a settings panel, a data table with filters, a multi-step form). Follow shadcn's composition pattern (no prop-drilling anti-patterns), keep styling in Tailwind utility classes, and ensure keyboard accessibility.

**9. React Bits Micro-Interaction**
- Difficulty: Intermediate | Tags: React, React Bits, Animation
- Description: Adds a polished micro-interaction component from the React Bits pattern library style.
- Variables: `{interaction_type}`, `{element_context}`
> Create a React Bits–style micro-interaction of type "{interaction_type}" (e.g. magnetic button, text scramble, cursor-follow blob) applied to {element_context}. Keep it dependency-light, performant (use requestAnimationFrame where relevant), and provide a reduced-motion fallback.

**10. Admin Panel Scaffold**
- Difficulty: Advanced | Tags: React, Admin, CRUD
- Description: Scaffolds a full admin panel shell with CRUD table.
- Variables: `{entity_name}`, `{fields}`
> Scaffold a React admin panel for managing "{entity_name}" records with fields: {fields}. Include a sidebar, a data table with sorting/pagination/search, a modal for create/edit, and a delete confirmation dialog. Use optimistic UI updates and skeleton loaders while data is "fetching."

---

## 2. Programming — Next.js & Backend (10)

**11. Next.js Full App Setup**
- Difficulty: Intermediate | Tags: Next.js, Setup, App Router
- Description: Scaffolds a production-ready Next.js 15 project structure.
- Variables: `{app_name}`, `{key_features}`
> Generate a Next.js 15 App Router project structure for "{app_name}" supporting: {key_features}. Show the folder structure (`app/`, `components/`, `lib/`, `types/`), a root layout with metadata, a global error boundary, and a loading.tsx pattern. Explain the purpose of each top-level folder in one line.

**12. Server Actions Implementation**
- Difficulty: Advanced | Tags: Next.js, Server Actions
- Description: Writes a typed Server Action with validation and error handling.
- Variables: `{action_purpose}`, `{input_schema}`
> Write a Next.js Server Action for "{action_purpose}" that validates input against this shape: {input_schema} using Zod. Include try/catch error handling, a typed return object (`{success, data, error}`), revalidation of the relevant path/tag, and a client component example calling it via `useTransition`.

**13. Middleware & Route Protection**
- Difficulty: Advanced | Tags: Next.js, Middleware, Auth
- Description: Builds middleware for auth-gated routes.
- Variables: `{protected_routes}`, `{redirect_path}`
> Write Next.js middleware that protects these routes: {protected_routes}, checking for a valid session/JWT cookie. Redirect unauthenticated users to {redirect_path} while preserving the intended destination as a query param. Include the matcher config.

**14. SEO Metadata Generator**
- Difficulty: Beginner | Tags: Next.js, SEO
- Description: Generates the Next.js metadata object for a page.
- Variables: `{page_title}`, `{page_description}`, `{og_image}`
> Generate a Next.js `generateMetadata` function for a page titled "{page_title}" with description "{page_description}" and OG image "{og_image}". Include Open Graph tags, Twitter card tags, canonical URL, and JSON-LD structured data appropriate for the content type.

**15. Express REST API Boilerplate**
- Difficulty: Beginner | Tags: Node.js, Express, REST
- Description: Scaffolds a clean Express REST API with folder structure.
- Variables: `{resource_name}`, `{db_type}`
> Scaffold an Express.js REST API boilerplate for a "{resource_name}" resource using {db_type}. Follow the MVC pattern (routes/controllers/models), include centralized error handling middleware, request validation, and a consistent JSON response envelope `{status, data, message}`.

**16. JWT Authentication System**
- Difficulty: Intermediate | Tags: Node.js, JWT, Security
- Description: Implements access + refresh token auth.
- Variables: `{token_expiry}`, `{refresh_strategy}`
> Implement a JWT authentication system in Node.js/Express with access tokens (expiry: {token_expiry}) and refresh tokens using {refresh_strategy} (e.g. rotating, httpOnly cookie). Include login, refresh, and logout endpoints, and middleware to verify the access token on protected routes.

**17. File Upload Handler**
- Difficulty: Intermediate | Tags: Node.js, File Upload, Storage
- Description: Builds a secure file upload endpoint.
- Variables: `{storage_target}`, `{allowed_types}`, `{max_size}`
> Build a file upload endpoint in Node.js/Express that streams uploads to {storage_target}, restricts file types to {allowed_types}, and enforces a max size of {max_size}. Validate MIME type (not just extension), generate a unique filename, and return the stored URL.

**18. Password Reset Flow**
- Difficulty: Intermediate | Tags: Node.js, Auth, Email
- Description: Implements a secure forgot/reset password flow.
- Variables: `{email_provider}`, `{token_ttl}`
> Implement a password reset flow: request-reset endpoint that emails a one-time token via {email_provider} (valid for {token_ttl}), and a reset endpoint that verifies the token, checks expiry, and updates the hashed password. Store only a hashed version of the token, never the raw token.

**19. Rate Limiting Middleware**
- Difficulty: Intermediate | Tags: Node.js, Security, Performance
- Description: Adds rate limiting to protect an API.
- Variables: `{limit_per_window}`, `{window_duration}`
> Add rate-limiting middleware to an Express API allowing {limit_per_window} requests per {window_duration} per IP/user. Return a 429 with a `Retry-After` header when exceeded, and make the store swappable (in-memory for dev, Redis for production).

**20. API Documentation Generator**
- Difficulty: Beginner | Tags: Documentation, API
- Description: Generates clean API docs from endpoint descriptions.
- Variables: `{endpoint_list}`
> Generate clear API documentation in Markdown for these endpoints: {endpoint_list}. For each, include method, path, description, request body/params schema, example request, example success response, and possible error responses with status codes.

---

## 3. Programming — Database & AI (10)

**21. PostgreSQL Schema Designer**
- Difficulty: Intermediate | Tags: PostgreSQL, Database Design
- Description: Designs a normalized schema from a plain-English description.
- Variables: `{domain_description}`
> Design a normalized PostgreSQL schema for: {domain_description}. Output CREATE TABLE statements with appropriate types, primary/foreign keys, indexes on frequently-queried columns, and a short note on the normalization level achieved (up to 3NF) and any deliberate denormalization.

**22. Prisma Model Generator**
- Difficulty: Beginner | Tags: Prisma, ORM
- Description: Converts a schema description into Prisma models.
- Variables: `{entities_and_relations}`
> Write a Prisma schema for these entities and relations: {entities_and_relations}. Include appropriate `@relation` directives, cascading delete behavior where sensible, `@default` values, and indexes. Add one-line comments explaining any non-obvious relation.

**23. SQL Query Optimizer**
- Difficulty: Advanced | Tags: SQL, Performance
- Description: Rewrites a slow query and explains the optimization.
- Variables: `{original_query}`, `{table_sizes}`
> Given this query: {original_query} running against tables of these approximate sizes: {table_sizes}, rewrite it for better performance. Explain what was wrong (missing index, N+1 pattern, unnecessary subquery, etc.), what changed, and what index(es) you'd recommend adding.

**24. LangChain Agent Builder**
- Difficulty: Advanced | Tags: AI, LangChain, Agents
- Description: Designs a LangChain agent with tools for a specific task.
- Variables: `{agent_purpose}`, `{tools_available}`
> Design a LangChain agent for "{agent_purpose}" with access to these tools: {tools_available}. Define the agent's system prompt, the tool schemas, the reasoning loop (ReAct-style), and how it should handle a tool failure or an ambiguous user request.

**25. RAG Chatbot Architecture**
- Difficulty: Advanced | Tags: AI, RAG, Vector DB
- Description: Designs a retrieval-augmented chatbot pipeline.
- Variables: `{content_source}`, `{vector_db}`
> Design a RAG chatbot pipeline over "{content_source}" using {vector_db} as the vector store. Cover: chunking strategy and size, embedding model choice, retrieval (top-k, hybrid search), prompt template for grounding the LLM in retrieved context, and how to handle "answer not in context" cases.

**26. Vector Database Setup Guide**
- Difficulty: Intermediate | Tags: AI, Vector DB
- Description: Explains and scaffolds a vector DB integration.
- Variables: `{vector_db}`, `{embedding_model}`
> Write a setup guide for integrating {vector_db} with {embedding_model} embeddings in a Node.js/Python app: initializing the client, creating a collection/index with the correct dimension, upserting documents with metadata, and running a similarity search with a metadata filter.

**27. AI Tutor Prompt Designer**
- Difficulty: Intermediate | Tags: AI, EdTech, Prompt Design
- Description: Crafts a system prompt for an AI tutor persona.
- Variables: `{subject}`, `{student_level}`, `{teaching_style}`
> Write a system prompt for an AI tutor teaching {subject} to a {student_level} student, using a {teaching_style} approach (e.g. Socratic, worked-examples, analogy-first). It should check understanding before advancing, adapt difficulty based on answers, and never simply give away the final answer to a graded question without the student attempting it first.

**28. AI Resume Reviewer Prompt**
- Difficulty: Beginner | Tags: AI, Career, Resume
- Description: Reviews a resume against a target role.
- Variables: `{resume_text}`, `{target_role}`
> Review this resume: {resume_text} for a "{target_role}" position. Identify weak bullet points (missing metrics, passive language), formatting issues, keyword gaps against typical ATS scans for this role, and rewrite the 3 weakest bullets using strong action verbs and quantified impact.

**29. AI Code Reviewer Prompt**
- Difficulty: Intermediate | Tags: AI, Code Review
- Description: Performs a structured code review.
- Variables: `{code_snippet}`, `{language}`
> Review this {language} code: {code_snippet}. Structure feedback into: Correctness issues, Security concerns, Performance concerns, Readability/style, and Suggested refactor (show the improved code). Rank issues by severity.

**30. AI Interviewer Simulation**
- Difficulty: Intermediate | Tags: AI, Interview Prep
- Description: Runs a mock technical interview.
- Variables: `{role}`, `{topic_focus}`, `{difficulty}`
> Act as a technical interviewer for a {role} position, focusing on {topic_focus} at {difficulty} level. Ask one question at a time, wait for my answer, give brief feedback, and ask a natural follow-up before moving on. Start with an easier warm-up question.

---

## 4. DSA & Interview Prep (6)

**31. DSA Problem Explainer**
- Difficulty: Beginner | Tags: DSA, Interview Prep
- Description: Breaks down a DSA problem step by step.
- Variables: `{problem_statement}`
> Explain this DSA problem in plain language: {problem_statement}. Cover: what it's really asking (restated simply), the naive/brute-force approach, why it's suboptimal, the key insight that unlocks an efficient solution, and the resulting time/space complexity.

**32. Dry Run Visualizer**
- Difficulty: Intermediate | Tags: DSA, Debugging
- Description: Walks through a dry run of code on a sample input.
- Variables: `{code}`, `{sample_input}`
> Dry-run this code: {code} on input: {sample_input}. Show the state of all relevant variables (and data structure contents) at each iteration/step in a table, and state the final output.

**33. Brute Force to Optimized Converter**
- Difficulty: Advanced | Tags: DSA, Optimization
- Description: Shows the path from brute force to an optimal solution.
- Variables: `{problem_statement}`, `{language}`
> For this problem: {problem_statement}, write the brute-force {language} solution first with its complexity, then incrementally optimize it (e.g. via hashing, two pointers, DP, or a different data structure), explaining the trade-off at each step, ending at the optimal known solution.

**34. Edge Case Generator**
- Difficulty: Intermediate | Tags: DSA, Testing
- Description: Generates edge cases and tricky test inputs.
- Variables: `{problem_statement}`, `{constraints}`
> Given this problem: {problem_statement} with constraints: {constraints}, list 8 edge cases a solution commonly fails on (empty input, single element, all duplicates, max size, negative values, etc.) and briefly explain why each is tricky.

**35. Time/Space Complexity Analyzer**
- Difficulty: Intermediate | Tags: DSA, Complexity Analysis
- Description: Analyzes complexity of given code with justification.
- Variables: `{code}`
> Analyze the time and space complexity of this code: {code}. Walk through each loop/recursive call to justify the final Big-O, and note the worst-case vs average-case if they differ.

**36. Mock Interview Session**
- Difficulty: Advanced | Tags: DSA, Interview Prep
- Description: Runs a full timed mock coding interview.
- Variables: `{target_company_style}`, `{topic}`
> Run a mock coding interview in the style of {target_company_style} interviews, focused on {topic}. Present one problem, let me think out loud and ask clarifying questions, give hints only if I'm stuck for a while, and after I finish, give feedback the way a real interviewer would on communication, correctness, and complexity.

---

## 5. UI/UX Design (6)

**37. SaaS Dashboard Design Brief**
- Difficulty: Intermediate | Tags: UI/UX, SaaS
- Description: Produces a design brief/spec for a SaaS dashboard.
- Variables: `{product_type}`, `{core_user_goal}`
> Write a UI/UX design brief for a {product_type} SaaS dashboard whose core user goal is {core_user_goal}. Define the information hierarchy, primary vs secondary actions, empty/loading/error states to design for, and 3 layout options with trade-offs.

**38. Glassmorphism Style Guide**
- Difficulty: Beginner | Tags: UI/UX, Visual Style
- Description: Defines a glassmorphism design system.
- Variables: `{brand_color}`
> Create a glassmorphism design system built on {brand_color} as the base hue: blur values, background opacity, border treatment, shadow depth, and where glassmorphism should (and shouldn't) be used in an interface to keep it readable and accessible.

**39. Bento Grid Layout Planner**
- Difficulty: Intermediate | Tags: UI/UX, Layout
- Description: Plans a bento-grid style section for a page.
- Variables: `{content_blocks}`
> Design a bento-grid layout for these content blocks: {content_blocks}. Specify grid spans/sizes for visual hierarchy (which block is largest/most important), responsive collapse behavior for tablet and mobile, and hover/interaction treatment for each cell.

**40. Apple/Stripe-Style UI Direction**
- Difficulty: Advanced | Tags: UI/UX, Design Systems
- Description: Produces a premium design direction inspired by a reference brand's aesthetic (not their assets).
- Variables: `{reference_brand}`, `{product_context}`
> Describe a premium UI direction in the visual spirit of {reference_brand}'s aesthetic (spacing, typography scale, restraint, motion) applied to {product_context} — original layout and content only, no copied assets or trademarks. Cover type scale, spacing system, color restraint, and one signature motion detail.

**41. UX Audit Checklist**
- Difficulty: Intermediate | Tags: UI/UX, Audit
- Description: Audits a described flow for usability issues.
- Variables: `{flow_description}`
> Perform a UX audit of this flow: {flow_description}. Check for: unclear CTAs, missing feedback states, accessibility gaps (contrast, focus order, labels), cognitive overload points, and friction in the happy path. List findings by severity with a fix for each.

**42. Portfolio Site Structure**
- Difficulty: Beginner | Tags: UI/UX, Portfolio
- Description: Plans the sections and narrative flow of a portfolio site.
- Variables: `{profession}`, `{standout_project}`
> Plan the section structure and narrative flow for a portfolio site for a {profession}, leading with the standout project: {standout_project}. Define what goes above the fold, how projects should be presented (problem → approach → result), and what belongs on an About section to build trust fast.

---

## 6. Mobile Development (5)

**43. Flutter App Scaffold**
- Difficulty: Intermediate | Tags: Flutter, Mobile
- Description: Scaffolds a Flutter app with navigation and state management.
- Variables: `{app_purpose}`, `{state_management}`
> Scaffold a Flutter app for "{app_purpose}" using {state_management} for state. Include the folder structure, a bottom navigation shell with 3-4 tabs, and one fully built screen with a form and validation.

**44. React Native Screen Builder**
- Difficulty: Intermediate | Tags: React Native, Mobile
- Description: Builds a specific mobile screen with navigation.
- Variables: `{screen_purpose}`, `{navigation_library}`
> Build a React Native screen for "{screen_purpose}" using {navigation_library} for navigation. Include safe-area handling, a pull-to-refresh list, and platform-specific styling notes for iOS vs Android where they'd typically differ.

**45. Expo Project Setup Guide**
- Difficulty: Beginner | Tags: Expo, Mobile Setup
- Description: Walks through initializing an Expo project with common modules.
- Variables: `{required_modules}`
> Write a setup guide for a new Expo project that needs: {required_modules} (e.g. camera, push notifications, secure storage). List the exact install commands, required `app.json`/`app.config.js` permissions, and one gotcha per module that commonly trips people up.

**46. Firebase Integration Guide**
- Difficulty: Intermediate | Tags: Firebase, Mobile Backend
- Description: Sets up Firebase auth/db for a mobile app.
- Variables: `{auth_method}`, `{data_model}`
> Set up Firebase for a mobile app using {auth_method} authentication and this data model: {data_model} in Firestore. Include security rules that enforce users can only read/write their own data, and the client-side hook/service for reads and writes.

**47. Push Notification Flow Designer**
- Difficulty: Intermediate | Tags: Mobile, Push Notifications
- Description: Designs the end-to-end push notification flow.
- Variables: `{notification_triggers}`, `{platform}`
> Design a push notification system for {platform} covering these triggers: {notification_triggers}. Cover token registration/refresh handling, a backend payload schema, deep-linking from the notification into the right in-app screen, and how to handle a denied permission gracefully.

---

## 7. Marketing (6)

**48. Instagram Caption Writer**
- Difficulty: Beginner | Tags: Marketing, Social Media
- Description: Writes on-brand Instagram captions with hooks.
- Variables: `{post_topic}`, `{brand_voice}`, `{cta}`
> Write 3 Instagram caption options for a post about "{post_topic}" in a {brand_voice} voice. Each should open with a scroll-stopping first line, stay under 150 words, end with "{cta}", and include a relevant hashtag set (mix of broad and niche).

**49. LinkedIn Thought-Leadership Post**
- Difficulty: Intermediate | Tags: Marketing, LinkedIn
- Description: Writes a LinkedIn post that builds authority.
- Variables: `{topic}`, `{personal_angle}`
> Write a LinkedIn post about "{topic}" from this personal angle: {personal_angle}. Open with a hook line that could stand alone, use short punchy paragraphs (1-2 lines), include one concrete example or number, and close with a genuine discussion question — not a generic "thoughts?"

**50. Cold Email Generator**
- Difficulty: Intermediate | Tags: Marketing, Sales
- Description: Writes a personalized, non-spammy cold email.
- Variables: `{recipient_context}`, `{offer}`
> Write a cold email to someone described as: {recipient_context}, offering: {offer}. Keep it under 120 words, personalize the opening line to their specific context (not generic flattery), lead with their problem not your product, and end with a low-friction ask (not "let's hop on a call").

**51. Product Hunt Launch Copy**
- Difficulty: Intermediate | Tags: Marketing, Product Launch
- Description: Writes the tagline, description, and first comment for a PH launch.
- Variables: `{product_name}`, `{one_line_value_prop}`
> Write Product Hunt launch copy for "{product_name}": a tagline (under 60 characters), a description (under 260 characters) built around this value prop: {one_line_value_prop}, and a founder's first-comment draft that tells the origin story briefly and invites feedback.

**52. SEO Blog Post Outline**
- Difficulty: Intermediate | Tags: Marketing, SEO
- Description: Builds an SEO-structured outline targeting a keyword.
- Variables: `{target_keyword}`, `{search_intent}`
> Create an SEO blog post outline targeting "{target_keyword}" for {search_intent} intent. Include a title tag under 60 characters, meta description under 155 characters, H2/H3 structure covering subtopics a top-ranking page would need, and 3 related keywords to weave in naturally.

**53. Google Ads Copy Generator**
- Difficulty: Beginner | Tags: Marketing, Paid Ads
- Description: Writes headline/description variants for Google Ads.
- Variables: `{product}`, `{unique_selling_point}`
> Write 5 Google Ads headline options (under 30 characters each) and 2 description options (under 90 characters) for "{product}", emphasizing this USP: {unique_selling_point}. Make at least one headline a direct question and one a number/stat-led claim.

---

## 8. Writing & Documentation (5)

**54. README Generator**
- Difficulty: Beginner | Tags: Writing, Documentation
- Description: Writes a complete, professional README.
- Variables: `{project_name}`, `{project_description}`, `{tech_stack}`
> Write a professional README.md for "{project_name}": {project_description}, built with {tech_stack}. Include sections: Overview, Features, Tech Stack, Installation, Usage, Folder Structure, and Contributing. Keep the Installation steps copy-pasteable.

**55. Technical Documentation Writer**
- Difficulty: Intermediate | Tags: Writing, Technical Docs
- Description: Turns a rough feature description into structured docs.
- Variables: `{feature_description}`, `{audience}`
> Turn this rough feature description into structured technical documentation for {audience}: {feature_description}. Include a short overview, prerequisites, step-by-step usage, a code/config example, and a troubleshooting section with 2-3 common issues.

**56. Research Paper Structuring Assistant**
- Difficulty: Advanced | Tags: Writing, Academic
- Description: Structures a research paper from notes/findings.
- Variables: `{topic}`, `{key_findings}`
> Structure a research paper on "{topic}" given these key findings: {key_findings}. Produce section headers (Abstract, Introduction, Related Work, Methodology, Results, Discussion, Conclusion) with a 2-3 sentence guide for what belongs in each, tailored to these specific findings.

**57. Blog Post Writer**
- Difficulty: Beginner | Tags: Writing, Blogging
- Description: Writes a full blog post from a topic and angle.
- Variables: `{topic}`, `{angle}`, `{tone}`
> Write a blog post on "{topic}" from this angle: {angle}, in a {tone} tone. Open with a hook (a question, a surprising fact, or a short story), use scannable subheadings, include one concrete example, and close with a clear takeaway — not a generic summary.

**58. User Manual Writer**
- Difficulty: Intermediate | Tags: Writing, User Manual
- Description: Writes an end-user manual section for a feature.
- Variables: `{feature_name}`, `{user_type}`
> Write a user manual section for "{feature_name}" aimed at {user_type} (assume no technical background). Use numbered steps, note what happens after each key action, and add a "Common Questions" mini-section at the end covering 3 likely confusions.

---

## 9. Learning & Study (6)

**59. Explain Like I'm 5**
- Difficulty: Beginner | Tags: Learning, Simplification
- Description: Explains a complex concept using simple analogies.
- Variables: `{concept}`
> Explain "{concept}" the way you'd explain it to a curious 12-year-old — no jargon, one strong analogy, and a one-sentence "why it matters" at the end. If a term is unavoidable, define it in the same breath you use it.

**60. Teach Me From Beginner to Advanced**
- Difficulty: Intermediate | Tags: Learning, Structured Path
- Description: Builds a progressive learning path on a topic.
- Variables: `{topic}`, `{time_available}`
> Design a learning path for "{topic}" that fits {time_available}, structured in 3 stages: Beginner (core vocabulary + mental model), Intermediate (hands-on application), Advanced (edge cases + best practices). For each stage, give 2-3 concrete practice tasks, not just reading material.

**61. Quiz Generator**
- Difficulty: Beginner | Tags: Learning, Assessment
- Description: Generates a quiz with mixed question types on a topic.
- Variables: `{topic}`, `{num_questions}`, `{difficulty}`
> Generate a {difficulty}-level quiz on "{topic}" with {num_questions} questions, mixing multiple-choice, true/false, and one short-answer question. Provide the answer key separately at the end with a one-line explanation per answer.

**62. Flashcard Set Creator**
- Difficulty: Beginner | Tags: Learning, Flashcards
- Description: Generates spaced-repetition-ready flashcards.
- Variables: `{topic}`, `{num_cards}`
> Create {num_cards} flashcards on "{topic}" in Q/A format, one core idea per card. Favor questions that test understanding and application over pure recall of definitions. Format as a simple table: Front | Back.

**63. Revision Notes Condenser**
- Difficulty: Intermediate | Tags: Learning, Revision
- Description: Condenses source material into exam-ready revision notes.
- Variables: `{source_material}`
> Condense this material into exam-ready revision notes: {source_material}. Use a hierarchy of headings and bullet points, bold the terms most likely to appear in an exam, and end with a "quick recall" list of 5-8 one-line facts.

**64. Cheat Sheet Builder**
- Difficulty: Intermediate | Tags: Learning, Reference
- Description: Builds a dense, single-page reference cheat sheet.
- Variables: `{topic}`
> Build a one-page cheat sheet for "{topic}": syntax/formulas in a table, the 5 most common mistakes and how to avoid them, and a "when to use what" decision guide if the topic has multiple approaches/methods.

---

## 10. Career (6)

**65. ATS-Optimized Resume Rewriter**
- Difficulty: Intermediate | Tags: Career, Resume, ATS
- Description: Rewrites resume bullets to pass ATS screening.
- Variables: `{job_description}`, `{current_bullets}`
> Rewrite these resume bullets: {current_bullets} to better match this job description: {job_description}. Mirror the JD's key terminology naturally (no keyword stuffing), lead each bullet with an action verb, and add a metric or scope where plausible. Flag any bullet where you don't have enough information to add a real metric.

**66. Cover Letter Generator**
- Difficulty: Beginner | Tags: Career, Cover Letter
- Description: Writes a tailored, non-generic cover letter.
- Variables: `{role}`, `{company}`, `{key_experience}`
> Write a cover letter for the {role} position at {company}, centered on this experience: {key_experience}. Avoid generic openers like "I am writing to apply." Open with a specific, relevant hook, connect your experience directly to what the role likely needs, and keep it under 300 words.

**67. LinkedIn Profile Optimizer**
- Difficulty: Beginner | Tags: Career, LinkedIn
- Description: Rewrites a LinkedIn headline and About section.
- Variables: `{current_role}`, `{career_goal}`, `{key_skills}`
> Rewrite a LinkedIn headline and About section for someone currently a {current_role}, targeting {career_goal}, with key skills: {key_skills}. The headline should be specific, not "X | Y | Z" keyword soup. The About section should read like a person, not a resume dump, and end with a clear call to action for recruiters.

**68. HR/Behavioral Interview Coach**
- Difficulty: Intermediate | Tags: Career, Interview Prep
- Description: Coaches STAR-format answers to behavioral questions.
- Variables: `{question}`, `{relevant_experience}`
> Help me answer this behavioral interview question: "{question}" using this experience: {relevant_experience}. Structure it in STAR format (Situation, Task, Action, Result), keep it under 90 seconds spoken, and point out if my draft answer is too vague on the "Action" part, since that's what interviewers weight most.

**69. Salary Negotiation Script**
- Difficulty: Intermediate | Tags: Career, Negotiation
- Description: Drafts a negotiation script for a specific offer scenario.
- Variables: `{current_offer}`, `{target_number}`, `{leverage_points}`
> Draft a salary negotiation script for countering an offer of {current_offer} toward {target_number}, using these leverage points: {leverage_points}. Give the opening line, how to handle a "that's not in our range" pushback, and a graceful fallback if they can't move on base (e.g. sign-on bonus, review timeline).

**70. Technical Interview Talking-Points Builder**
- Difficulty: Intermediate | Tags: Career, Technical Interview
- Description: Builds concise talking points to explain a project in interviews.
- Variables: `{project_name}`, `{project_details}`, `{target_role}`
> Build interview talking points for describing "{project_name}" ({project_details}) to a {target_role} interviewer. Structure as: 30-second version, 2-minute version (problem → your specific contribution → technical decisions → result/impact), and 3 likely follow-up questions with short prepared answers.

---

## 11. Business & Startups (5)

**71. Startup Pitch Deck Outline**
- Difficulty: Advanced | Tags: Business, Pitch Deck
- Description: Structures a fundraising pitch deck.
- Variables: `{startup_idea}`, `{stage}`
> Outline a pitch deck for "{startup_idea}" at {stage} stage. Provide the slide order (Problem, Solution, Market, Product, Traction, Business Model, Competition, Team, Ask) with 2-3 bullet points of content guidance per slide, tailored to what investors weight most heavily at this stage.

**72. SWOT Analysis Generator**
- Difficulty: Beginner | Tags: Business, Strategy
- Description: Produces a SWOT analysis for a business scenario.
- Variables: `{business_description}`, `{market_context}`
> Produce a SWOT analysis for: {business_description}, operating in this market context: {market_context}. Give 3-4 specific, non-generic points per quadrant, and end with one strategic recommendation that directly addresses the biggest weakness/threat pairing.

**73. Product Roadmap Planner**
- Difficulty: Intermediate | Tags: Business, Product Management
- Description: Plans a quarterly product roadmap from a feature backlog.
- Variables: `{feature_backlog}`, `{business_goal}`
> Organize this feature backlog: {feature_backlog} into a quarterly roadmap aligned to this business goal: {business_goal}. Group into Now/Next/Later, justify the ordering with an impact-vs-effort lens, and flag any feature that seems to have unclear ROI.

**74. Feature Prioritization Matrix**
- Difficulty: Intermediate | Tags: Business, Prioritization
- Description: Scores and ranks features using a prioritization framework.
- Variables: `{feature_list}`, `{framework}`
> Prioritize this feature list: {feature_list} using the {framework} framework (e.g. RICE, MoSCoW, Kano). Show the scoring/categorization per feature and the resulting ranked order, with a one-line rationale for the top 3.

**75. Business Plan Section Writer**
- Difficulty: Advanced | Tags: Business, Planning
- Description: Writes a specific section of a business plan.
- Variables: `{business_idea}`, `{section}`
> Write the "{section}" section of a business plan for: {business_idea}. Keep it grounded in specifics from the idea rather than generic filler, and flag any assumption you're making that should really be backed by real market research.

---

## 12. Content Creation (5)

**76. Short-Form Video Script (Reels/Shorts)**
- Difficulty: Beginner | Tags: Content, Video Script
- Description: Writes a hook-driven short-form video script.
- Variables: `{topic}`, `{video_length}`
> Write a {video_length} short-form video script on "{topic}". First line must be a hook that stops the scroll in under 2 seconds (question, bold claim, or pattern interrupt). Structure: Hook → Setup → Payoff/Value → CTA. Include on-screen text cues in brackets.

**77. Podcast Episode Outline**
- Difficulty: Intermediate | Tags: Content, Podcast
- Description: Structures a podcast episode with talking points.
- Variables: `{episode_topic}`, `{guest_expertise}`
> Outline a podcast episode on "{episode_topic}" with a guest whose expertise is {guest_expertise}. Include a cold open hook, 5 main discussion questions ordered to build narrative momentum, one likely tangent worth allowing, and a closing question that gives the guest a natural plug moment.

**78. YouTube Video Hook Generator**
- Difficulty: Beginner | Tags: Content, YouTube
- Description: Generates multiple hook options for a video's first 10 seconds.
- Variables: `{video_topic}`, `{target_audience}`
> Write 5 opening-hook options (first 10 seconds) for a YouTube video about "{video_topic}" targeting {target_audience}. Vary the approach: one question hook, one bold-claim hook, one "in this video" curiosity-gap hook, one story-cold-open hook, one stat-led hook.

**79. Thumbnail Text Generator**
- Difficulty: Beginner | Tags: Content, Thumbnails
- Description: Writes punchy thumbnail text options.
- Variables: `{video_topic}`
> Write 6 thumbnail text options (3-5 words max each) for a video about "{video_topic}" that create curiosity without being clickbait-misleading. Note which one pairs best with a "before/after" style image vs a reaction-face style image.

**80. Video Outline Builder**
- Difficulty: Intermediate | Tags: Content, Video
- Description: Structures a long-form video into sections with pacing notes.
- Variables: `{video_topic}`, `{target_length}`
> Build a section-by-section outline for a {target_length} video on "{video_topic}". Include a retention hook every 60-90 seconds worth of content (a preview, a question, a pattern break), and mark where a b-roll/visual example would land better than talking-head.

---

## 13. E-Commerce (4)

**81. Amazon Listing Optimizer**
- Difficulty: Intermediate | Tags: E-commerce, Amazon
- Description: Writes an SEO-optimized Amazon product listing.
- Variables: `{product_name}`, `{key_features}`, `{target_keywords}`
> Write an Amazon listing for "{product_name}" with features: {key_features}, optimized for keywords: {target_keywords}. Include a benefit-led title (under 200 characters), 5 bullet points (feature → benefit format), and a description that naturally repeats key search terms without keyword stuffing.

**82. Shopify Product Copy Writer**
- Difficulty: Beginner | Tags: E-commerce, Shopify
- Description: Writes conversion-focused Shopify product copy.
- Variables: `{product_name}`, `{unique_selling_point}`, `{target_customer}`
> Write Shopify product page copy for "{product_name}", USP: {unique_selling_point}, targeting {target_customer}. Include a short punchy headline, a 2-3 sentence emotional hook, a scannable feature/benefit list, and one line addressing a likely objection (price, durability, fit).

**83. Product Description SEO Writer**
- Difficulty: Beginner | Tags: E-commerce, SEO
- Description: Writes SEO-friendly product descriptions.
- Variables: `{product_name}`, `{target_keyword}`
> Write an SEO-friendly product description for "{product_name}" naturally incorporating the keyword "{target_keyword}" 2-3 times. Keep it scannable with short paragraphs, and end with a specification mini-table.

**84. Customer Review Analyzer**
- Difficulty: Intermediate | Tags: E-commerce, Review Analysis
- Description: Extracts themes and actionable insights from reviews.
- Variables: `{reviews_text}`
> Analyze these customer reviews: {reviews_text}. Group feedback into recurring themes (praise and complaints separately), estimate rough sentiment split, and surface the top 3 actionable product/listing improvements implied by the complaints.

---

## 14. AI Prompt Engineering (5)

**85. Prompt Optimizer**
- Difficulty: Intermediate | Tags: Prompt Engineering
- Description: Rewrites a weak prompt into a stronger, more specific one.
- Variables: `{original_prompt}`, `{goal}`
> Improve this prompt: "{original_prompt}" to better achieve this goal: {goal}. Identify what's currently ambiguous or underspecified (missing format, missing constraints, vague scope), then rewrite it with clear role, context, format, and constraints. Show the before and after side by side.

**86. Chain-of-Thought Prompt Builder**
- Difficulty: Advanced | Tags: Prompt Engineering, Reasoning
- Description: Structures a prompt to elicit explicit step-by-step reasoning.
- Variables: `{task_description}`
> Write a chain-of-thought prompt for this task: {task_description} that instructs the model to reason step by step before giving a final answer, and to clearly separate its reasoning from its final answer using a distinct format or tag.

**87. Few-Shot Prompt Constructor**
- Difficulty: Advanced | Tags: Prompt Engineering, Few-shot
- Description: Builds a few-shot prompt with well-chosen examples.
- Variables: `{task_description}`, `{example_pairs}`
> Build a few-shot prompt for: {task_description}, using these example input/output pairs: {example_pairs}. Choose an example ordering that goes from simple to more edge-case-y, and write the final instruction that tells the model to follow the same pattern.

**88. Role-Based System Prompt Generator**
- Difficulty: Intermediate | Tags: Prompt Engineering, System Prompts
- Description: Writes a persona-based system prompt with guardrails.
- Variables: `{persona}`, `{task_scope}`, `{tone}`
> Write a system prompt establishing the persona of {persona}, scoped to {task_scope}, in a {tone} tone. Include what the assistant should do when asked something outside its scope, and one explicit formatting rule for its responses.

**89. Prompt Debugger**
- Difficulty: Advanced | Tags: Prompt Engineering, Debugging
- Description: Diagnoses why a prompt is producing bad outputs.
- Variables: `{prompt_used}`, `{bad_output_example}`, `{desired_output}`
> Diagnose why this prompt: {prompt_used} produced this unwanted output: {bad_output_example} instead of something like: {desired_output}. Identify the likely cause (ambiguous instruction, missing constraint, conflicting instructions, insufficient context) and provide a corrected prompt.

---

## 15. Data Science (4)

**90. Pandas Data Cleaning Script**
- Difficulty: Intermediate | Tags: Data Science, Pandas
- Description: Writes a data-cleaning script for messy tabular data.
- Variables: `{data_issues}`, `{dataset_description}`
> Write a Pandas script to clean a dataset described as: {dataset_description}, with these known issues: {data_issues} (e.g. missing values, mixed types, duplicate rows). For each issue, briefly justify the cleaning strategy chosen (e.g. why impute vs drop).

**91. Feature Engineering Assistant**
- Difficulty: Advanced | Tags: Data Science, ML
- Description: Suggests and implements feature engineering ideas.
- Variables: `{dataset_description}`, `{prediction_target}`
> Given this dataset: {dataset_description}, predicting {prediction_target}, suggest 6 engineered features (interactions, aggregations, date-part extraction, encodings) with a one-line rationale each, and write the Pandas code for the top 3.

**92. Matplotlib Chart Generator**
- Difficulty: Beginner | Tags: Data Science, Visualization
- Description: Writes a chart that best fits the data relationship.
- Variables: `{data_description}`, `{insight_to_show}`
> Given this data: {data_description}, write Matplotlib code to visualize the insight: {insight_to_show}. Justify the chart type chosen over alternatives, and include proper axis labels, title, and legend.

**93. ML Model Selection Advisor**
- Difficulty: Advanced | Tags: Data Science, Machine Learning
- Description: Recommends and justifies a model choice for a problem.
- Variables: `{problem_type}`, `{dataset_size}`, `{constraints}`
> Recommend a machine learning approach for a {problem_type} problem with a dataset of {dataset_size}, under these constraints: {constraints} (e.g. interpretability required, low latency, limited compute). Compare 2-3 candidate models/approaches and justify the final pick.

---

## 16. Cyber Security & DevOps (5)

**94. Secure Code Review**
- Difficulty: Advanced | Tags: Security, Code Review
- Description: Audits code specifically for security vulnerabilities.
- Variables: `{code_snippet}`, `{language}`
> Perform a security-focused code review of this {language} code: {code_snippet}. Check specifically for injection risks, improper input validation, hardcoded secrets, insecure deserialization, and auth/authorization bypass risks. Rate severity (Critical/High/Medium/Low) per finding and give the fix.

**95. OWASP Top 10 Checklist Applier**
- Difficulty: Intermediate | Tags: Security, OWASP
- Description: Checks an application description against OWASP Top 10 risks.
- Variables: `{app_description}`
> Given this application: {app_description}, go through the OWASP Top 10 categories and flag which are most likely to be a real risk for this specific app (not a generic checklist), with one concrete mitigation per relevant risk.

**96. Dockerfile Generator**
- Difficulty: Intermediate | Tags: DevOps, Docker
- Description: Writes a production-ready, optimized Dockerfile.
- Variables: `{app_type}`, `{runtime_version}`
> Write a production-ready Dockerfile for a {app_type} app running on {runtime_version}. Use a multi-stage build to minimize image size, run as a non-root user, and add a `.dockerignore` recommendation list.

**97. GitHub Actions CI/CD Pipeline**
- Difficulty: Advanced | Tags: DevOps, CI/CD
- Description: Writes a CI/CD workflow for build, test, and deploy.
- Variables: `{project_type}`, `{deploy_target}`
> Write a GitHub Actions workflow for a {project_type} project that runs lint + tests on every PR, and deploys to {deploy_target} on merge to main. Include caching for dependencies and a manual approval gate before production deploy.

**98. Cloud Deployment Architecture Advisor**
- Difficulty: Advanced | Tags: DevOps, Cloud
- Description: Recommends a cloud architecture for an app's requirements.
- Variables: `{app_description}`, `{scale_expectations}`, `{cloud_provider}`
> Recommend a {cloud_provider} architecture for {app_description} expecting {scale_expectations}. Cover compute choice, database choice, caching layer, and one cost-saving recommendation, with a short rationale for each decision.

---

## 17. Productivity & Support (2)

**99. Meeting Notes Summarizer**
- Difficulty: Beginner | Tags: Productivity, Meetings
- Description: Turns raw meeting notes into a structured, actionable summary.
- Variables: `{raw_notes}`
> Turn these raw meeting notes: {raw_notes} into a structured summary: Key Decisions, Action Items (with owner and due date if mentioned), and Open Questions still unresolved. Keep it under half the length of the original notes.

**100. Customer Support Reply Generator**
- Difficulty: Beginner | Tags: Customer Support
- Description: Writes an empathetic, resolution-focused support reply.
- Variables: `{customer_issue}`, `{resolution}`, `{tone}`
> Write a customer support reply to this issue: {customer_issue}, offering this resolution: {resolution}, in a {tone} tone. Acknowledge the frustration first without over-apologizing, state the resolution clearly, and end with a concrete next step or timeframe.

---

### Suggested Schema for Seeding
```json
{
  "id": "string",
  "title": "string",
  "category": "string",
  "difficulty": "Beginner | Intermediate | Advanced",
  "tags": ["string"],
  "description": "string",
  "variables": ["string"],
  "prompt_template": "string"
}
```
Each of the 100 entries above maps cleanly onto this shape — ready for a seed script or CMS import into the Prompt Library feature.
