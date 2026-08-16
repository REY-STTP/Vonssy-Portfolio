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
- **🤖 RAG Chat Assistant**: Floating chat widget powered by a Retrieval-Augmented Generation pipeline. Local multilingual embeddings (`@huggingface/transformers`) retrieve relevant project context, then a Dahl LLM streams answers token-by-token — with out-of-scope guardrails, source citations, and `sessionStorage` persistence.
- **🧭 Smart Sticky Header**: Features ultra-clean glassmorphism (*16px backdrop blur*) that automatically slides up on scroll-down to maximize viewport reading room and reveals instantly on scroll-up.
- **📜 Scroll-Linked Manifesto Reveal**: Word-by-word opacity lighting synced proportionally to viewport travel using native Framer Motion `useScroll`.
- **🔄 Smart Floating Scroll Progress**: Circular SVG progress gauge that tracks scroll depth, dynamically flips between *Scroll to Bottom* and *Scroll to Top* based on scroll direction, and auto-hides after 2.2s of inactivity.
- **📁 Modular Project Showcase**: Interactive categorized project grid with fluid layout animations and an accessible modal dialog complete with keyboard trapping (`Esc` key support). Displays the first 10 projects with a smooth animated *"Show all"* expand toggle.
- **🎬 Staggered Cinematic Intro**: First-visit brand reveal with timed entrance sequence and smooth curtain lift-off.
- **♿ First-Class Accessibility**: Native `prefers-reduced-motion` detection, ARIA dialog roles, focus management, and keyboard accessibility.
- **🚀 SEO & Structured Data**: Built-in Schema.org `Person` JSON-LD metadata, dynamic OpenGraph/Twitter cards, automated `sitemap.xml`, and `robots.txt`.

---

## 🏗️ Clean Code Architecture

The codebase is organized with a strict **Separation of Concerns (SoC)** to ensure maintainability and testability:

```text
src/
├── app/
│   ├── api/
│   │   └── chat/route.ts        # RAG chat endpoint (Node runtime, SSE streaming)
│   ├── globals.css              # Design tokens, variables, and typography rules
│   ├── layout.tsx               # Root layout, Google Fonts (Manrope & JetBrains Mono), SEO
│   ├── page.tsx                 # Lean Server Component (renders JSON-LD + Client orchestrator)
│   ├── robots.ts                # Search engine crawler configuration
│   └── sitemap.ts               # Dynamic XML sitemap generation
├── components/
│   ├── icons.tsx                # Typed, accessible SVG icons
│   ├── portfolio-client.tsx     # Client orchestrator container (< 120 lines)
│   ├── layout/
│   │   ├── header.tsx           # Smart sticky header & theme controller
│   │   ├── mobile-nav.tsx       # Animated mobile navigation drawer
│   │   └── footer.tsx           # Footer metadata and external links
│   ├── sections/
│   │   ├── hero-section.tsx     # Hero banner, pointer glow mesh, profile orbit
│   │   ├── ticker-section.tsx   # Continuous marquee ticker banner
│   │   ├── manifesto-section.tsx# Scroll-linked word lighting effect
│   │   ├── about-section.tsx    # Builder background narrative
│   │   ├── philosophy-section.tsx # "How I Build" principles cards
│   │   ├── projects-section.tsx # Filterable project showcase & table (show-10 + expand)
│   │   ├── stack-section.tsx    # Technical skills categorization
│   │   ├── github-section.tsx   # GitHub profiles snapshot & statistics
│   │   └── contact-section.tsx  # Direct communication call-to-action
│   └── ui/
│       ├── chat-markdown.tsx    # Lightweight Markdown renderer (safe React nodes)
│       ├── chat-widget.tsx      # Floating RAG chat bubble & panel
│       ├── intro-overlay.tsx    # Timed cinematic intro overlay
│       ├── project-modal.tsx    # Accessible modal dialog with focus trap
│       ├── scroll-progress.tsx  # Directional circular scroll indicator (auto-hide)
│       ├── stat-card.tsx        # Reusable GitHub stat card component
│       └── theme-selector.tsx   # Minimalist animated theme toggle button
├── data/
│   ├── navigation.ts            # Navigation items, project filters, stat items
│   ├── philosophy.ts            # Software engineering principles data
│   ├── projects.ts              # Strongly typed project portfolio data
│   ├── rag/
│   │   ├── embeddings.json      # Pre-computed vector embeddings (committed, build-time)
│   │   ├── manual.ts            # Curated bio/contact sources for ingestion
│   │   ├── repos.ts             # Typed config of GitHub repos to ingest
│   │   └── sources.json         # Raw curated content (audit/debug)
│   ├── site.ts                  # Site config & Schema.org JSON-LD generator
│   └── stack.ts                 # Categorized technical stack data
├── hooks/
│   ├── use-chat.ts              # Chat state, SSE streaming, sessionStorage persistence
│   ├── use-reduced-motion.ts    # React hook for prefers-reduced-motion
│   ├── use-scroll-progress.ts   # RAF-throttled scroll depth and direction hook
│   └── use-theme.ts             # Theme state management & system color scheme sync
├── lib/
│   └── rag/
│       ├── dahl.ts              # Dahl API client (chat completions, model fallback)
│       ├── embed.ts             # Embedding wrapper (shared by ingest + runtime)
│       ├── prompt.ts            # System prompt, context builder, out-of-scope guardrail
│       └── retrieve.ts          # Cosine similarity search + threshold guardrail
└── types/
    ├── portfolio.ts             # TypeScript domain interfaces and type definitions
    └── rag.ts                   # RAG/chat runtime types (messages, chunks, records)
scripts/
└── ingest.ts                    # Offline RAG ingestion pipeline (npm run ingest)
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** | React Framework (App Router, Turbopack, Static Generation) |
| **React 19** | UI Library with modern hooks & concurrent features |
| **TypeScript 5.8** | Type safety, domain modeling, and static validation |
| **Tailwind CSS 3.4** | Utility-first styling and responsive design |
| **Framer Motion 13** | Physics-based animations, layout transitions, and scroll listeners |
| **Google Fonts** | `Manrope` (Display / Sans) & `JetBrains Mono` (Code / Numbers) |
| **Hugging Face Transformers** | Local multilingual embeddings (`all-MiniLM-L12-v2`) for RAG retrieval |
| **Dahl** | OpenAI-compatible LLM provider for streamed chat responses |

---

## 🤖 RAG Chat Assistant — How It Works

The floating chat widget answers questions about Vonssy's projects, skills, and contact info through a **Retrieval-Augmented Generation** pipeline:

1. **Ingestion (offline)** — `npm run ingest` fetches each repo's README via the GitHub API, merges in curated metadata (description, tags, stars), chunks the content per section, and embeds each chunk into a 384-dimension vector using a local multilingual model (`@huggingface/transformers`). Results are committed to `src/data/rag/embeddings.json` as part of the build.
2. **Retrieval (runtime)** — the `/api/chat` route embeds the visitor's question with the same model, then runs a cosine-similarity search over the pre-computed vectors to fetch the top-K relevant chunks.
3. **Guardrail** — if the highest similarity score falls below a threshold (out-of-scope question), the route skips the LLM and returns a friendly default pointing to direct contact instead of hallucinating.
4. **Generation** — otherwise the retrieved chunks are wrapped into a system prompt and streamed token-by-token from a **Dahl** model over SSE (`text/plain`, chunked). The client renders them progressively with a lightweight, XSS-safe Markdown renderer, and auto-switches to a fallback model if the primary is unavailable.

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
   DAHL_API_KEY=your_dahl_api_key
   DAHL_BASE_URL=https://inference.dahl.global/v1

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
- `npm run lint`: Executes TypeScript type check (`tsc --noEmit`) to ensure zero type errors.

---

## ⚙️ Customization Guide

Updating your portfolio information is fast and simple thanks to the dedicated `src/data/` layer:

1. **Projects**: Edit [`src/data/projects.ts`](src/data/projects.ts) to add or modify repositories, star counts, descriptions, and technical approaches.
2. **Personal Info & SEO**: Edit [`src/data/site.ts`](src/data/site.ts) to update your name, avatar, bio, email, and social links.
3. **Principles & Stack**: Edit [`src/data/philosophy.ts`](src/data/philosophy.ts) and [`src/data/stack.ts`](src/data/stack.ts).
4. **Navigation & Stats**: Edit [`src/data/navigation.ts`](src/data/navigation.ts).
5. **Chat assistant sources**: Edit [`src/data/rag/repos.ts`](src/data/rag/repos.ts) (which GitHub repos the bot knows) and [`src/data/rag/manual.ts`](src/data/rag/manual.ts) (bio/contact context), then run `npm run ingest` to rebuild `src/data/rag/embeddings.json`.
6. **Chat system prompt & tone**: Edit [`src/lib/rag/prompt.ts`](src/lib/rag/prompt.ts).

---

## 👤 Author

**Reyvaldi Zakaria (Vonssy)**
- GitHub: [@vonssy](https://github.com/vonssy) · [@REY-STTP](https://github.com/REY-STTP)
- Telegram: [@vonssy_part_2](https://t.me/vonssy_part_2)
- Email: `rey.zakaria123@gmail.com`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
