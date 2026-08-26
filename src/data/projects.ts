import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    name: "Cloud Storage App",
    account: "REY-STTP",
    description:
      "A production-ready personal cloud storage platform with private R2 buckets, presigned downloads, and an admin panel backed by real-time analytics.",
    category: ["Web", "Tools"],
    tags: ["Next.js 16", "TypeScript", "PostgreSQL", "Cloudflare R2"],
    repo: "https://github.com/REY-STTP/Cloud-Storage-App",
    demo: "https://cloud-storage-app-brown.vercel.app",
    signal: "Live web tool",
    details: {
      overview:
        "A full-featured cloud storage platform where users upload, organize, rename, download, and delete files from a clean dashboard while administrators manage the entire user base.",
      approach:
        "Every file lives in a private Cloudflare R2 bucket and downloads are served through presigned URLs that expire in 60 minutes — no permanent public links. Auth runs on JWT sessions in httpOnly cookies with bcrypt-hashed passwords.",
      decisions:
        "The build leans on Supabase PostgreSQL for users and file records, cursor-based pagination for search, batch operations streamed as a single zip archive, and configurable per-user storage quotas.",
      challenges:
        "The hard parts are presigned URL lifecycling, cascading user deletion across stored files, email verification and reset-token flows, and keeping admin analytics responsive at scale.",
    },
  },
  {
    name: "Vonssy Terminal",
    account: "REY-STTP",
    description:
      "Read-only EVM multichain wallet analytics: paste any address and get portfolio value, asset breakdowns, and classified activity history across 10 chains.",
    category: ["Web3", "Tools"],
    tags: ["Next.js 16", "TypeScript", "Viem"],
    repo: "https://github.com/REY-STTP/Vonssy-Terminal",
    demo: "https://vonssy-terminal.vercel.app",
    signal: "Live web tool",
    details: {
      overview:
        "A wallet analytics terminal covering Ethereum, Base, Arbitrum, Polygon, OP Mainnet, BNB Chain, Avalanche, zkSync Era, Linea, and Scroll — no wallet connection, signing, or auth required.",
      approach:
        "Only public chain data is read through Viem: native and ERC-20 holdings with live prices, transaction history grouped into sends, receives, swaps, and contract interactions, plus per-chain allocation that sums to exactly 100%.",
      decisions:
        "Chain configuration is centralized so new networks are one-file additions, previously searched wallets persist locally, and the UI never blocks on a single provider.",
      challenges:
        "Graceful degradation under real conditions: when a chain provider times out or a wallet exceeds index limits, the dashboard keeps working with a partial view and clear error signals instead of crashing.",
    },
  },
  {
    name: "Kusoparse",
    account: "REY-STTP",
    description:
      "A responsive parser that extracts Kusonime metadata, resolves shortlinks, and returns direct download links from validated URLs.",
    category: ["Web", "Scraping", "Tools"],
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    repo: "https://github.com/REY-STTP/Kusoparse",
    demo: "https://kusoparse.vercel.app",
    signal: "Live web tool",
    details: {
      overview:
        "A lightweight web interface for parsing Kusonime pages.",
      approach:
        "The tool validates Kusonime URLs, extracts anime metadata, and resolves documented shortlink providers into a cleaner download flow.",
      decisions:
        "The README explicitly positions responsiveness, strict URL validation, and a focused single-purpose interface as core features.",
      challenges:
        "The project deals with inconsistent external pages, shortlink/ad-locker resolution, and keeping the interaction simple for the visitor.",
    },
  },
  {
    name: "Guess Your Face",
    account: "REY-STTP",
    description:
      "Real-time AI facial detection, comparison, and attribute analysis playground powered by Face++ — zero data retention, fully in-memory processing.",
    category: ["AI / ML", "Web"],
    tags: ["Next.js 16", "TypeScript", "Face++", "Tailwind CSS"],
    repo: "https://github.com/REY-STTP/Guess-Your-Face",
    demo: "https://guess-your-expression.vercel.app",
    signal: "v2.0 rebuild · Live",
    details: {
      overview:
        "A modern playground for AI-powered face analysis: micro-expression detection across seven weighted emotions, demographic and aesthetic profiles, and 1:1 face similarity verification.",
      approach:
        "All image processing happens in-memory through secure Next.js Route Handlers using Face++ Cognitive Services — images are never stored on the server or in a database (privacy-first, zero retention).",
      decisions:
        "This is a complete architectural revamp of the original Node.js + Express + MongoDB app into a full-stack Next.js 16 + React 19 codebase, adding multi-face detection and a bilingual ID/EN system with instant toggling.",
      challenges:
        "Replacing persistent storage with stateless in-memory pipelines while keeping route handlers secure, and rebuilding every detection feature from the legacy stack without regressions.",
    },
  },
  {
    name: "Vonssy-AI",
    account: "REY-STTP",
    description:
      "A multi-provider AI chatbot with streamed responses, persistent sessions, OAuth, quotas, and provider fallback.",
    category: ["Web", "Tools", "AI / ML"],
    tags: ["Next.js 16", "TypeScript", "PostgreSQL"],
    repo: "https://github.com/REY-STTP/Vonssy-AI",
    demo: "https://vonssy-ai.vercel.app",
    signal: "Current full-stack build",
    details: {
      overview:
        "A unified interface for multiple AI gateways and models.",
      approach:
        "The application combines a Next.js App Router frontend with PostgreSQL, Drizzle, Auth.js, streamed SSE responses, and a provider registry.",
      decisions:
        "The README documents server-side session revalidation, HMAC identity hashing, a three-layer quota system, cursor pagination, and a fallback gateway for 429 responses.",
      challenges:
        "The system has to coordinate streaming, persistence, authentication, rate limits, provider differences, and responsive chat UX.",
    },
  },
  {
    name: "AIS Frozen Food",
    account: "REY-STTP",
    description:
      "A high-performance landing page and interactive digital catalog for a frozen-food UMKM, with automated WhatsApp ordering built in.",
    category: ["Web"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    repo: "https://github.com/REY-STTP/AIS-Frozen-Food",
    demo: "https://ais-frozen-food.vercel.app",
    signal: "Live landing page",
    details: {
      overview:
        "Website profil dan katalog digital untuk AIS Frozen Food, UMKM makanan beku di area Pati & Kudus, dirancang untuk mempermudah pelanggan menjelajahi produk dan memesan.",
      approach:
        "Order flow lands directly in WhatsApp with smart message templates prefilled per product, while visitors filter the catalog through animated category tabs (dimsum, aneka frozen food, cilok, dan lainnya).",
      decisions:
        "The design commits to a premium dark aesthetic — warm charcoal with marigold accents — backed by blurred backdrop imagery, floating micro-animations, and a running category ticker.",
      challenges:
        "Balancing heavy visual effects with performance and accessibility: prefers-reduced-motion support, automatic Next.js image optimization, and structured SEO metadata all had to coexist.",
    },
  },
  {
    name: "Desa Sukobubuk",
    account: "REY-STTP",
    description:
      "The official website of Desa Sukobubuk: village profile, news, UMKM directory with products, gallery, and a contact pipeline backed by PostgreSQL.",
    category: ["Web"],
    tags: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL"],
    repo: "https://github.com/REY-STTP/desa-sukobubuk",
    demo: "https://desa-sukobubuk.vercel.app",
    signal: "Official village site · Live",
    details: {
      overview:
        "Situs resmi Desa Sukobubuk, Kecamatan Margorejo, Kabupaten Pati — menghadirkan profil desa, berita, direktori UMKM, produk, galeri kegiatan, dan saluran kontak dalam satu platform.",
      approach:
        "Dibangun dengan Next.js 15, TypeScript, Tailwind CSS, dan Prisma + PostgreSQL; setiap UMKM punya halaman detail sendiri lengkap dengan produk dan tombol hubungi via WhatsApp.",
      decisions:
        "Konten sepenuhnya database-driven melalui REST endpoints terdokumentasi (UMKM, berita, produk, galeri, pesan), dengan seeding data sampel agar situs langsung hidup saat pertama dijalankan.",
      challenges:
        "Menata skema relational lintas tabel (users, umkm, produk, berita, galeri, pesan) sekaligus menjaga halaman publik tetap sederhana bagi pengunjung desa yang belum terbiasa dengan web."
    },
  },
  {
    name: "E-Voting",
    account: "REY-STTP",
    description:
      "A Web3 e-voting dApp: connect an EVM wallet, cast votes on-chain through ethers.js, and watch results update live behind an admin-guarded session.",
    category: ["Web3", "Blockchain", "Web"],
    tags: ["Next.js 16", "TypeScript", "Ethers.js"],
    repo: "https://github.com/REY-STTP/E-Voting",
    demo: "https://e-voting-ebon-tau.vercel.app",
    signal: "Live dApp",
    details: {
      overview:
        "An on-chain voting application where voters connect an EVM wallet, review candidates, submit votes through smart-contract calls, and follow results in a live results section.",
      approach:
        "Built on Next.js 16 with ethers v6 handling wallet connection and vote transactions; voting state flows through dedicated hooks (useVoting, useWallet) over a centralized web3 config layer.",
      decisions:
        "Admin routes are separated behind cookie-based login/logout/session API routes with middleware protection, while the public side stays focused on candidates, voting, and transparent results.",
      challenges:
        "Coordinating wallet state, transaction confirmation waits, and post-vote UI updates without a backend database — the chain itself is the source of truth.",
    },
  },
  {
    name: "PharosTestnet-BOT",
    account: "vonssy",
    description:
      "Multi-account Web3 automation for Pharos Atlantic Testnet: check-ins, faucet claims, transfers, and proxy-aware execution.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "EVM"],
    repo: "https://github.com/vonssy/PharosTestnet-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "127 stars · 41 forks",
    details: {
      overview:
        "Automated Web3 interaction for Pharos Atlantic Testnet.",
      approach:
        "Accounts are supplied as private keys, while the bot runs repeatable network actions across multiple accounts through web3, eth-account, ABI, and utility packages.",
      decisions:
        "Proxy support and invalid-proxy rotation are first-class runtime choices, alongside daily check-in, faucet, and transfer actions.",
      challenges:
        "The README reflects the operational edge cases of wallet automation: account lists, network libraries, proxies, and repeated actions.",
    },
  },
  {
    name: "Dawn-BOT",
    account: "vonssy",
    description:
      "A Dawn Validator manager built around token setup, account handling, proxy rotation, keep-alive pings, and concurrent execution.",
    category: ["Automation", "Bots"],
    tags: ["Python", "Multithreading", "Proxies"],
    repo: "https://github.com/vonssy/Dawn-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "110 stars · 18 forks",
    details: {
      overview:
        "Automated Dawn Validator management with multi-threading and proxy support.",
      approach:
        "The repository separates token setup from runtime execution, stores account and proxy inputs in simple files, and exposes proxy mode and rotation choices at startup.",
      decisions:
        "The README calls out automatic bearer-token extraction, account retrieval, invalid-proxy rotation, ping signals, and multi-account threading.",
      challenges:
        "The documented runtime is shaped around real service conditions: captcha setup, proxy reliability, and keeping several accounts alive.",
    },
  },
  {
    name: "HeliosTestnet-BOT",
    account: "vonssy",
    description:
      "Helios testnet automation spanning faucet claims, bridging, validator delegation, governance, and smart-contract deployment.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "Testnet"],
    repo: "https://github.com/vonssy/HeliosTestnet-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "50 stars · 8 forks",
    details: {
      overview:
        "Automated Helios testnet operations across multiple accounts.",
      approach:
        "The bot chains together faucet claims, fund bridging, validator delegation, reward claims, governance proposals, and contract deployment.",
      decisions:
        "Optional 2Captcha support enables faucet claims, while proxy mode and rotation are selectable at startup.",
      challenges:
        "The surface area spans many on-chain actions, captcha configuration, and multi-account state management.",
    },
  },
  {
    name: "Interlink-BOT",
    account: "vonssy",
    description:
      "Automated $ITLG token mining across multiple accounts with metric synchronization, proxy rotation, and configurable app-version targeting.",
    category: ["Automation", "Bots", "Web3"],
    tags: ["Python", "Proxies", "Mining"],
    repo: "https://github.com/vonssy/Interlink-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "33 stars · 9 forks",
    details: {
      overview:
        "Automated Interlink mining that claims $ITLG from both private and group mining pools across many accounts at once.",
      approach:
        "Accounts are configured in a JSON file (email, passcode, Interlink ID), with an adjustable APP_VERSION constant kept in .env so requests keep matching the latest Interlink app release.",
      decisions:
        "Proxy mode and invalid-proxy rotation are startup choices, and metric synchronization runs automatically alongside mining claims.",
      challenges:
        "The moving target is the upstream app itself: version drift between the bot and the Interlink client is an explicitly documented maintenance concern.",
    },
  },
  {
    name: "X1-Ecochain-BOT",
    account: "vonssy",
    description:
      "X1 EcoChain airdrop farming automation: daily check-ins, quests, faucet claims, transfers, swaps, liquidity, and token deployment across accounts.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "EVM"],
    repo: "https://github.com/vonssy/X1-Ecochain-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "16 stars · 0 forks",
    details: {
      overview:
        "Automated on-chain farming for the X1 EcoChain network spanning nearly every testnet action a farmer needs.",
      approach:
        "The bot automates check-ins, quest completion, XIT faucet claims, random token transfers, USDT swaps, liquidity provisioning, and even token deployment — all across multiple EVM wallets.",
      decisions:
        "New wallets are recommended at registration, and proxy support with smart rotation remains a first-class startup option.",
      challenges:
        "The breadth of on-chain operations means coordinating faucet timing, swap and liquidity flows, and multi-account state without tripping network limits.",
    },
  },
  {
    name: "Deltahash-BOT",
    account: "vonssy",
    description:
      "Automated $DTH mining and social-task completion across multiple accounts using cookie-based sessions with proxy rotation.",
    category: ["Automation", "Bots"],
    tags: ["Python", "Cookie Sessions", "Proxies"],
    repo: "https://github.com/vonssy/Deltahash-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "14 stars · 1 fork",
    details: {
      overview:
        "Automated Deltahash mining that keeps $DTH accumulation running continuously across many accounts.",
      approach:
        "Authentication reuses captured cookie data stored in a plain text file (with a documented example of how to fetch it), while social tasks are completed automatically alongside mining.",
      decisions:
        "Proxy mode selection and invalid-proxy rotation mirror the rest of the BOT family, keeping operational behavior consistent across tools.",
      challenges:
        "Session lifetime is the core constraint: cookie-based auth expires, so the workflow is designed around easy refresh-and-restart cycles.",
    },
  },
  {
    name: "Konnex-BOT",
    account: "vonssy",
    description:
      "Konnex Reward Hub points-farming automation with daily check-ins, testnet interactions, dual-wallet configuration, and proxy rotation.",
    category: ["Web3", "Bots", "Automation"],
    tags: ["Python", "EVM", "Proxies"],
    repo: "https://github.com/vonssy/Konnex-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "12 stars · 2 forks",
    details: {
      overview:
        "Automated points farming for Konnex Reward Hub that handles daily check-ins and testnet actions across multiple accounts.",
      approach:
        "Each account pairs an EVM private key with a Konnex wallet mnemonic in accounts.json, letting the bot operate both wallet layers during check-in and testnet routines.",
      decisions:
        "Registration guidance steers users toward fresh EVM wallets linked to social accounts, and proxy rotation stays consistent with the broader BOT family.",
      challenges:
        "The dual-wallet setup adds key-management surface area, and the bot must keep both credential types synchronized across long farming runs.",
    },
  },
];
