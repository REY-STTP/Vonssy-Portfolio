<div align="center">

# ⚡ Vonssy Portfolio

**A modern, minimalist, and high-performance personal portfolio for Web3 builders and automation engineers.**

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

[Explore Live](#) · [Report Bug](https://github.com/REY-STTP/Vonssy-Portfolio/issues) · [Request Feature](https://github.com/REY-STTP/Vonssy-Portfolio/issues)

</div>

---

## 📖 Overview

**Vonssy Portfolio** is an ultra-fast, aesthetically refined developer portfolio crafted with **Next.js 16 (Turbopack, App Router)**, **React 19**, **TypeScript**, and **Framer Motion**. It showcases automation systems, Web3 bots, full-stack applications, and blockchain tooling with a clean, high-contrast, editorial typography aesthetic — and includes an **AI chat assistant** powered by local RAG embeddings and a streamed LLM that answers questions about the work.

Built adhering to **Clean Code** principles, the repository features strict modularization, isolated data layers, custom hooks for DOM side-effects, and zero visual regressions.

---

## ✨ Key Features

- **🎨 Dynamic Theme Engine**: Seamless switching between `Dark`, `Light`, and `System` color schemes with persistent `localStorage` synchronization and smooth rotation micro-interactions.
- **🤖 RAG Chat Assistant**: Floating chat widget powered by a Retrieval-Augmented Generation pipeline. Multi-turn conversations with query rewriting, Jina AI task-tuned embeddings for retrieval, an answer cache for instant repeat questions, clickable source citations, an OpenAI-compatible LLM router streaming answers token-by-token, and honest out-of-scope guardrails.
- **🧭 Smart Sticky Header**: Features ultra-clean glassmorphism (*16px backdrop blur*) that automatically slides up on scroll-down to maximize viewport reading room and reveals instantly on scroll-up.
- **📜 Scroll-Linked Manifesto Reveal**: Word-by-word opacity lighting synced proportionally to viewport travel using native Framer Motion `useScroll`.
- **🔄 Smart Floating Scroll Progress**: Circular SVG progress gauge that tracks scroll depth, dynamically flips between *Scroll to Bottom* and *Scroll to Top* based on scroll direction, and auto-hides after 2.2s of inactivity.
- **📁 Modular Project Showcase**: Interactive categorized project grid with fluid layout animations and an accessible modal dialog complete with keyboard trapping (`Esc` key support). Displays the first 10 projects with a smooth animated *"Show all"* expand toggle — modal actions stay side-by-side on mobile with responsive button sizing, plus a `sr-only` fallback list for crawlers.
- **❓ FAQ Accordion**: Animated expandable FAQ section with smooth height transitions for common visitor questions.
- **🎬 Staggered Cinematic Intro**: First-visit brand reveal with timed entrance sequence and smooth curtain lift-off.
- **🏷️ Animated Brand Logo**: Custom SVG brand logo component with smooth entrance animations.
- **🚫 Custom 404 Page**: Styled not-found page consistent with the portfolio design system.
- **♿ First-Class Accessibility**: Native `prefers-reduced-motion` detection, ARIA dialog roles, focus management, and keyboard accessibility.
- **🚀 SEO & AI Discoverability**: `Vonssy Portfolio` site name (`WebSite` JSON-LD + `og:site_name`), full Schema.org (`Person`/`WebSite`/`FAQPage`/`ItemList`/`CollectionPage`/`BreadcrumbList`/`Speakable`), dynamic OG image, `sitemap.xml` (weekly) & `robots.txt` (allow GPTBot/OAI-SearchBot/Claude/Perplexity & 10+ AI crawlers), plus `llms.txt`/`llms-full.txt` for answer engines.

---

## 🏗️ Clean Code Architecture

The codebase is organized with a strict **Separation of Concerns (SoC)** to ensure maintainability and testability:

```text
public/
├── llms.txt                     # Concise markdown for LLMs (spec llmstxt.org) — 15 projects, stack, FAQ, contact
└── llms-full.txt                # Full context dump — detailed project overviews/approach/decisions/challenges

src/
├── app/
│   ├── api/
│   │   └── chat/route.ts        # RAG chat endpoint (Node runtime, SSE streaming, rate limit, answer cache)
│   ├── globals.css              # Design tokens, variables, and typography rules
│   ├── icon.svg                 # Favicon / app icon
│   ├── layout.tsx               # Root layout, Google Fonts (Manrope & JetBrains Mono), SEO + llms.txt hint
│   ├── not-found.tsx            # Custom 404 page
│   ├── opengraph-image.tsx      # Dynamic OG/Twitter card image (next/og)
│   ├── page.tsx                 # Lean Server Component (renders Person/WebSite/FAQPage/ItemList/CollectionPage JSON-LD)
│   ├── robots.ts                # Crawler config — wildcard + GPTBot/OAI-SearchBot/Claude/Perplexity & 10+ AI bots
│   └── sitemap.ts               # Dynamic sitemap — weekly changeFrequency, lastModified = now
├── components/
│   ├── icons.tsx                # Typed, accessible SVG icons
│   ├── portfolio-client.tsx     # Client orchestrator container (< 120 lines)
│   ├── layout/
│   │   ├── header.tsx           # Smart sticky header & theme controller
│   │   ├── mobile-nav.tsx       # Animated mobile navigation drawer
│   │   └── footer.tsx           # Footer — © Vonssy Portfolio + GitHub/Telegram/X links
│   ├── sections/
│   │   ├── hero-section.tsx     # Hero banner, pointer glow mesh, profile orbit
│   │   ├── ticker-section.tsx   # Continuous marquee ticker banner
│   │   ├── manifesto-section.tsx# Scroll-linked word lighting effect
│   │   ├── about-section.tsx    # Builder background narrative
│   │   ├── philosophy-section.tsx # "How I Build" principles cards
│   │   ├── projects-section.tsx # Filterable showcase (show-10 + expand) + sr-only full list for AI crawlers
│   │   ├── stack-section.tsx    # Technical skills categorization
│   │   ├── github-section.tsx   # GitHub profiles snapshot & statistics
│   │   ├── faq-section.tsx      # Expandable FAQ accordion section
│   │   └── contact-section.tsx  # Direct communication call-to-action
│   └── ui/
│       ├── brand-logo.tsx       # Animated SVG brand logo component
│       ├── chat-markdown.tsx    # Lightweight Markdown renderer (safe React nodes)
│       ├── chat-widget.tsx      # Floating RAG chat bubble & panel
│       ├── intro-overlay.tsx    # Timed cinematic intro overlay
│       ├── project-modal.tsx    # Accessible modal — focus trap, side-by-side actions on mobile (text-xs → sm:text-[13px])
│       ├── scroll-progress.tsx  # Directional circular scroll indicator (auto-hide)
│       ├── stat-card.tsx        # Reusable GitHub stat card component
│       └── theme-selector.tsx   # Minimalist animated theme toggle button
├── data/
│   ├── faq.ts                   # FAQ items data
│   ├── navigation.ts            # Navigation items, project filters, stat items
│   ├── philosophy.ts            # Software engineering principles data
│   ├── projects.ts              # Strongly typed project portfolio data
│   ├── rag/
│   │   ├── embeddings.json      # Pre-computed vector embeddings (committed, build-time)
│   │   ├── manual.ts            # Curated bio/contact sources for ingestion
│   │   └── repos.ts             # Curated showcase repos (auto-discovery covers the rest)
│   ├── site.ts                  # Site config & JSON-LD (WebSite name: Vonssy Portfolio, sameAs includes X)
│   └── stack.ts                 # Categorized technical stack data
├── hooks/
│   ├── use-chat.ts              # Chat state, SSE streaming, sessionStorage persistence
│   ├── use-reduced-motion.ts    # React hook for prefers-reduced-motion
│   ├── use-scroll-progress.ts   # RAF-throttled scroll depth and direction hook
│   └── use-theme.ts             # Theme state management & system color scheme sync
├── lib/
│   └── rag/
│       ├── llm.ts              # Generic LLM API client (streaming + completions, model fallback, timeout)
│       ├── embed.ts             # Provider-agnostic embedding client (Jina default, task-tuned)
│       ├── prompt.ts            # System persona/voice, history builder, injection sanitizer, guardrail
│       └── retrieve.ts          # Cosine similarity search + threshold guardrail
├── proxy.ts                     # Development proxy configuration
└── types/
    ├── portfolio.ts             # TypeScript domain interfaces and type definitions
    └── rag.ts                   # RAG/chat runtime types (messages, chunks, records)
scripts/
└── ingest.ts                    # Offline RAG ingestion pipeline (npm run ingest)
.github/
└── workflows/
    └── rag-ingest.yml           # Scheduled weekly GitHub Action for RAG re-ingestion
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16.3** | React Framework (App Router, Turbopack, Static Generation) |
| **React 19.2** | UI Library with modern hooks & concurrent features |
| **TypeScript 5.8** | Type safety, domain modeling, and static validation |
| **Tailwind CSS 3.4** | Utility-first styling and responsive design |
| **Framer Motion 13** | Physics-based animations, layout transitions, and scroll listeners |
| **Google Fonts** | `Manrope` (Display / Sans) & `JetBrains Mono` (Code / Numbers) |
| **Embeddings** | Jina AI `jina-embeddings-v3` via OpenAI-compatible API (task-tuned query/passage, Matryoshka dimensions) — configurable via `EMBEDDINGS_*` env vars |
| **LLM Router** | OpenAI-compatible LLM router for streamed chat responses (swap provider via `LLM_*` env vars) |

---

## 🤖 RAG Chat Assistant — How It Works

The floating chat widget answers questions about Vonssy's projects, skills, and contact info through a **Retrieval-Augmented Generation** pipeline:

1. **Ingestion (offline / weekly cron)** — the ingestion script auto-discovers **all public repos** from both GitHub accounts (forks & archived excluded), merges them with a curated showcase list, fetches each README via the GitHub API, chunks the content per section, and embeds it with **Jina AI `jina-embeddings-v3`** (1024 dimensions, `retrieval.passage` task tuning). Results are committed to `src/data/rag/embeddings.json`. A scheduled GitHub Action (`rag-ingest.yml`) re-runs this weekly so stars, forks, and READMEs never go stale.
2. **Multi-turn retrieval (runtime)** — `/api/chat` accepts the recent conversation history. Follow-up questions ("*what tech does it use?*") are first rewritten into standalone queries by the LLM, then embedded with `retrieval.query` task tuning and searched against the index by cosine similarity.
3. **Guardrails** — visitor input is sanitized against prompt-injection markup on the server; if the best similarity score falls below a threshold, the route skips the LLM and honestly says the information isn't available instead of hallucinating.
4. **Generation** — retrieved context plus conversation history are wrapped into a persona-driven system prompt and streamed token-by-token from the configured **LLM router** model over SSE. The client renders them progressively with an XSS-safe Markdown renderer (links, tables, headings, code) and shows clickable source chips under each answer.

Supporting layers: a per-IP rate limiter protects the endpoint from abuse, an in-memory LRU cache serves repeated questions instantly without spending API calls, and `max_tokens`/timeout caps keep provider costs bounded.

The bot never answers beyond its indexed context — it says so honestly when information is missing.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18.18+** or **Node.js 20+** installed:

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/REY-STTP/Vonssy-Portfolio.git
   cd Vonssy-Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SITE_URL=https://your-domain.com

   # Required for the RAG chat assistant
   LLM_API_KEY=your_llm_provider_api_key
   LLM_BASE_URL=https://router.bynara.id/v1

   # Embeddings — defaults target Jina AI (free trial: 10M tokens)
   EMBEDDINGS_BASE_URL=https://api.jina.ai/v1
   EMBEDDINGS_MODEL=jina-embeddings-v3
   EMBEDDINGS_API_KEY=your_jina_api_key
   EMBEDDINGS_DIMENSIONS=1024

   # Optional but recommended — raises GitHub API rate limit during ingestion
   GITHUB_TOKEN=your_github_token
   ```

4. **(Optional) Rebuild the RAG index:** the chat assistant ships with pre-computed embeddings committed to the repo. Only re-run this when you add or update projects:
   ```bash
   npm run ingest
   ```

5. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Compiles and bundles the production static build.
- `npm run start`: Runs the built production server locally.
- `npm run ingest`: Runs the RAG ingestion pipeline — fetches repo READMEs, chunks content, and regenerates `src/data/rag/embeddings.json`.
- `npm run lint`: Lints the codebase with ESLint (`eslint-config-next` flat config).
- `npm run typecheck`: Executes TypeScript type check (`tsc --noEmit`) to ensure zero type errors.
- `npm run test`: Runs unit tests with the Node.js built-in test runner.
- `npm run format`: Formats source files with Prettier.

---

## ⚙️ Customization Guide

Updating your portfolio information is fast and simple thanks to the dedicated `src/data/` layer:

1. **Projects**: Edit [`src/data/projects.ts`](src/data/projects.ts) to add or modify repositories, star counts, descriptions, and technical approaches.
2. **Personal Info & SEO**: Edit [`src/data/site.ts`](src/data/site.ts) to update your name, avatar, bio, email, and social links.
3. **Principles & Stack**: Edit [`src/data/philosophy.ts`](src/data/philosophy.ts) and [`src/data/stack.ts`](src/data/stack.ts).
4. **Navigation & Stats**: Edit [`src/data/navigation.ts`](src/data/navigation.ts).
5. **FAQ**: Edit [`src/data/faq.ts`](src/data/faq.ts) to add or modify frequently asked questions.
6. **Chat assistant sources**: Edit [`src/data/rag/repos.ts`](src/data/rag/repos.ts) (curated repos that get full-depth knowledge) — other public repos are picked up automatically via discovery. Bio/contact context lives in [`src/data/rag/manual.ts`](src/data/rag/manual.ts). Then run `npm run ingest` to rebuild `src/data/rag/embeddings.json`, or let the weekly GitHub Action do it.
7. **Chat system prompt & tone**: Edit [`src/lib/rag/prompt.ts`](src/lib/rag/prompt.ts).

---

## 👤 Author

**Reyvaldi Zakaria (Vonssy)**
- GitHub: [@vonssy](https://github.com/vonssy) · [@REY-STTP](https://github.com/REY-STTP)
- X: [@_Vonssy](https://x.com/_Vonssy)
- Telegram: [@vonssy_part_2](https://t.me/vonssy_part_2)
- Email: `rey.zakaria123@gmail.com`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
