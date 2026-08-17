<div align="center">

# âš¡ Vonssy Portfolio

**A modern, minimalist, and high-performance personal portfolio for Web3 builders and automation engineers.**

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

[Explore Live](#) Â· [Report Bug](https://github.com/REY-STTP/Vonssy-Portfolio/issues) Â· [Request Feature](https://github.com/REY-STTP/Vonssy-Portfolio/issues)

</div>

---

## ðŸ“– Overview

**Vonssy Portfolio** is an ultra-fast, aesthetically refined developer portfolio crafted with **Next.js 16 (Turbopack, App Router)**, **React 19**, **TypeScript**, and **Framer Motion**. It showcases automation systems, Web3 bots, full-stack applications, and blockchain tooling with a clean, high-contrast, editorial typography aesthetic â€” and includes an **AI chat assistant** powered by local RAG embeddings and a streamed LLM that answers questions about the work.

Built adhering to **Clean Code** principles, the repository features strict modularization, isolated data layers, custom hooks for DOM side-effects, and zero visual regressions.

---

## âœ¨ Key Features

- **ðŸŽ¨ Dynamic Theme Engine**: Seamless switching between `Dark`, `Light`, and `System` color schemes with persistent `localStorage` synchronization and smooth rotation micro-interactions.
- **ðŸ¤– RAG Chat Assistant**: Floating chat widget powered by a Retrieval-Augmented Generation pipeline. Multilingual embeddings via Google Gemini API retrieve relevant project context, then a Dahl LLM streams answers token-by-token â€” with out-of-scope guardrails, source citations, and `sessionStorage` persistence.
- **ðŸ§­ Smart Sticky Header**: Features ultra-clean glassmorphism (*16px backdrop blur*) that automatically slides up on scroll-down to maximize viewport reading room and reveals instantly on scroll-up.
- **ðŸ“œ Scroll-Linked Manifesto Reveal**: Word-by-word opacity lighting synced proportionally to viewport travel using native Framer Motion `useScroll`.
- **ðŸ”„ Smart Floating Scroll Progress**: Circular SVG progress gauge that tracks scroll depth, dynamically flips between *Scroll to Bottom* and *Scroll to Top* based on scroll direction, and auto-hides after 2.2s of inactivity.
- **ðŸ“ Modular Project Showcase**: Interactive categorized project grid with fluid layout animations and an accessible modal dialog complete with keyboard trapping (`Esc` key support). Displays the first 10 projects with a smooth animated *"Show all"* expand toggle.
- **ðŸŽ¬ Staggered Cinematic Intro**: First-visit brand reveal with timed entrance sequence and smooth curtain lift-off.
- **â™¿ First-Class Accessibility**: Native `prefers-reduced-motion` detection, ARIA dialog roles, focus management, and keyboard accessibility.
- **ðŸš€ SEO & Structured Data**: Built-in Schema.org `Person` JSON-LD metadata, dynamic OpenGraph/Twitter cards, automated `sitemap.xml`, and `robots.txt`.

---

## ðŸ—ï¸ Clean Code Architecture

The codebase is organized with a strict **Separation of Concerns (SoC)** to ensure maintainability and testability:

```text
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â””â”€â”€ chat/route.ts        # RAG chat endpoint (Node runtime, SSE streaming)
â”‚   â”œâ”€â”€ globals.css              # Design tokens, variables, and typography rules
â”‚   â”œâ”€â”€ layout.tsx               # Root layout, Google Fonts (Manrope & JetBrains Mono), SEO
â”‚   â”œâ”€â”€ page.tsx                 # Lean Server Component (renders JSON-LD + Client orchestrator)
â”‚   â”œâ”€â”€ robots.ts                # Search engine crawler configuration
â”‚   â””â”€â”€ sitemap.ts               # Dynamic XML sitemap generation
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ icons.tsx                # Typed, accessible SVG icons
â”‚   â”œâ”€â”€ portfolio-client.tsx     # Client orchestrator container (< 120 lines)
â”‚   â”œâ”€â”€ layout/
â”‚   â”‚   â”œâ”€â”€ header.tsx           # Smart sticky header & theme controller
â”‚   â”‚   â”œâ”€â”€ mobile-nav.tsx       # Animated mobile navigation drawer
â”‚   â”‚   â””â”€â”€ footer.tsx           # Footer metadata and external links
â”‚   â”œâ”€â”€ sections/
â”‚   â”‚   â”œâ”€â”€ hero-section.tsx     # Hero banner, pointer glow mesh, profile orbit
â”‚   â”‚   â”œâ”€â”€ ticker-section.tsx   # Continuous marquee ticker banner
â”‚   â”‚   â”œâ”€â”€ manifesto-section.tsx# Scroll-linked word lighting effect
â”‚   â”‚   â”œâ”€â”€ about-section.tsx    # Builder background narrative
â”‚   â”‚   â”œâ”€â”€ philosophy-section.tsx # "How I Build" principles cards
â”‚   â”‚   â”œâ”€â”€ projects-section.tsx # Filterable project showcase & table (show-10 + expand)
â”‚   â”‚   â”œâ”€â”€ stack-section.tsx    # Technical skills categorization
â”‚   â”‚   â”œâ”€â”€ github-section.tsx   # GitHub profiles snapshot & statistics
â”‚   â”‚   â””â”€â”€ contact-section.tsx  # Direct communication call-to-action
â”‚   â””â”€â”€ ui/
â”‚       â”œâ”€â”€ chat-markdown.tsx    # Lightweight Markdown renderer (safe React nodes)
â”‚       â”œâ”€â”€ chat-widget.tsx      # Floating RAG chat bubble & panel
â”‚       â”œâ”€â”€ intro-overlay.tsx    # Timed cinematic intro overlay
â”‚       â”œâ”€â”€ project-modal.tsx    # Accessible modal dialog with focus trap
â”‚       â”œâ”€â”€ scroll-progress.tsx  # Directional circular scroll indicator (auto-hide)
â”‚       â”œâ”€â”€ stat-card.tsx        # Reusable GitHub stat card component
â”‚       â””â”€â”€ theme-selector.tsx   # Minimalist animated theme toggle button
â”œâ”€â”€ data/
â”‚   â”œâ”€â”€ navigation.ts            # Navigation items, project filters, stat items
â”‚   â”œâ”€â”€ philosophy.ts            # Software engineering principles data
â”‚   â”œâ”€â”€ projects.ts              # Strongly typed project portfolio data
â”‚   â”œâ”€â”€ rag/
â”‚   â”‚   â”œâ”€â”€ embeddings.json      # Pre-computed vector embeddings (committed, build-time)
â”‚   â”‚   â”œâ”€â”€ manual.ts            # Curated bio/contact sources for ingestion
â”‚   â”‚   â”œâ”€â”€ repos.ts             # Typed config of GitHub repos to ingest
â”‚   â”‚   â””â”€â”€ sources.json         # Raw curated content (audit/debug)
â”‚   â”œâ”€â”€ site.ts                  # Site config & Schema.org JSON-LD generator
â”‚   â””â”€â”€ stack.ts                 # Categorized technical stack data
â”œâ”€â”€ hooks/
â”‚   â”œâ”€â”€ use-chat.ts              # Chat state, SSE streaming, sessionStorage persistence
â”‚   â”œâ”€â”€ use-reduced-motion.ts    # React hook for prefers-reduced-motion
â”‚   â”œâ”€â”€ use-scroll-progress.ts   # RAF-throttled scroll depth and direction hook
â”‚   â””â”€â”€ use-theme.ts             # Theme state management & system color scheme sync
â”œâ”€â”€ lib/
â”‚   â””â”€â”€ rag/
â”‚       â”œâ”€â”€ dahl.ts              # Dahl API client (chat completions, model fallback)
â”‚       â”œâ”€â”€ embed.ts             # Embedding wrapper (shared by ingest + runtime)
â”‚       â”œâ”€â”€ prompt.ts            # System prompt, context builder, out-of-scope guardrail
â”‚       â””â”€â”€ retrieve.ts          # Cosine similarity search + threshold guardrail
â””â”€â”€ types/
    â”œâ”€â”€ portfolio.ts             # TypeScript domain interfaces and type definitions
    â””â”€â”€ rag.ts                   # RAG/chat runtime types (messages, chunks, records)
scripts/
â””â”€â”€ ingest.ts                    # Offline RAG ingestion pipeline (npm run ingest)
```

---

## ðŸ› ï¸ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16** | React Framework (App Router, Turbopack, Static Generation) |
| **React 19** | UI Library with modern hooks & concurrent features |
| **TypeScript 5.8** | Type safety, domain modeling, and static validation |
| **Tailwind CSS 3.4** | Utility-first styling and responsive design |
| **Framer Motion 13** | Physics-based animations, layout transitions, and scroll listeners |
| **Google Fonts** | `Manrope` (Display / Sans) & `JetBrains Mono` (Code / Numbers) |
| **Google Gemini Embeddings** | Multilingual embeddings via OpenAI-compatible API (`text-embedding-004`) for RAG retrieval |
| **Dahl** | OpenAI-compatible LLM provider for streamed chat responses |

---

## ðŸ¤– RAG Chat Assistant â€” How It Works

The floating chat widget answers questions about Vonssy's projects, skills, and contact info through a **Retrieval-Augmented Generation** pipeline:

1. **Ingestion (offline)** â€” `npm run ingest` fetches each repo's README via the GitHub API, merges in curated metadata (description, tags, stars), chunks the content per section, and embeds each chunk into a 768-dimension vector using the Google Gemini Embeddings API (`text-embedding-004`). Results are committed to `src/data/rag/embeddings.json` as part of the build.
2. **Retrieval (runtime)** â€” the `/api/chat` route embeds the visitor's question via the same Gemini API, then runs a cosine-similarity search over the pre-computed vectors to fetch the top-K relevant chunks.
3. **Guardrail** â€” if the highest similarity score falls below a threshold (out-of-scope question), the route skips the LLM and returns a friendly default pointing to direct contact instead of hallucinating.
4. **Generation** â€” otherwise the retrieved chunks are wrapped into a system prompt and streamed token-by-token from a **Dahl** model over SSE (`text/plain`, chunked). The client renders them progressively with a lightweight, XSS-safe Markdown renderer, and auto-switches to a fallback model if the primary is unavailable.

The bot never answers beyond its indexed context â€” it says so honestly when information is missing.

---

## ðŸš€ Getting Started

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

   # Optional but recommended â€” raises GitHub API rate limit during ingestion
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

## ðŸ“¦ Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Compiles and bundles the production static build.
- `npm run start`: Runs the built production server locally.
- `npm run ingest`: Runs the RAG ingestion pipeline â€” fetches repo READMEs, chunks content, and regenerates `src/data/rag/embeddings.json`.
- `npm run lint`: Executes TypeScript type check (`tsc --noEmit`) to ensure zero type errors.

---

## âš™ï¸ Customization Guide

Updating your portfolio information is fast and simple thanks to the dedicated `src/data/` layer:

1. **Projects**: Edit [`src/data/projects.ts`](src/data/projects.ts) to add or modify repositories, star counts, descriptions, and technical approaches.
2. **Personal Info & SEO**: Edit [`src/data/site.ts`](src/data/site.ts) to update your name, avatar, bio, email, and social links.
3. **Principles & Stack**: Edit [`src/data/philosophy.ts`](src/data/philosophy.ts) and [`src/data/stack.ts`](src/data/stack.ts).
4. **Navigation & Stats**: Edit [`src/data/navigation.ts`](src/data/navigation.ts).
5. **Chat assistant sources**: Edit [`src/data/rag/repos.ts`](src/data/rag/repos.ts) (which GitHub repos the bot knows) and [`src/data/rag/manual.ts`](src/data/rag/manual.ts) (bio/contact context), then run `npm run ingest` to rebuild `src/data/rag/embeddings.json`.
6. **Chat system prompt & tone**: Edit [`src/lib/rag/prompt.ts`](src/lib/rag/prompt.ts).

---

## ðŸ‘¤ Author

**Reyvaldi Zakaria (Vonssy)**
- GitHub: [@vonssy](https://github.com/vonssy) Â· [@REY-STTP](https://github.com/REY-STTP)
- Telegram: [@vonssy_part_2](https://t.me/vonssy_part_2)
- Email: `rey.zakaria123@gmail.com`

---

## ðŸ“„ License

This project is open source and available under the [MIT License](LICENSE).
