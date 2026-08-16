import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    name: "Dawn-BOT",
    account: "vonssy",
    description:
      "A Dawn Validator manager built around token setup, account handling, proxy rotation, keep-alive pings, and concurrent execution.",
    category: ["Automation", "Bots"],
    tags: ["Python", "Multithreading", "Proxies"],
    repo: "https://github.com/vonssy/Dawn-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "111 stars · 18 forks",
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
    name: "KiteAi-BOT",
    account: "vonssy",
    description:
      "A configurable on-chain operations bot spanning staking, rewards, quizzes, AI-agent interactions, multisig wallets, swaps, and bridges.",
    category: ["Web3", "Automation", "Bots"],
    tags: ["Python", "web3.py", "Multisig"],
    repo: "https://github.com/vonssy/KiteAi-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "83 stars · 27 forks",
    details: {
      overview:
        "Automated Kite AI network operations across multiple accounts.",
      approach:
        "Feature flags in .env control the workflow: faucet, deposits, withdrawals, staking, rewards, quiz completion, agent chat, swaps, and bridges.",
      decisions:
        "The project makes network actions configurable rather than forcing one fixed sequence, while keeping proxy rotation and account management explicit.",
      challenges:
        "The documented surface area spans several transaction types, captcha configuration, proxy handling, and multi-account state.",
    },
  },
  {
    name: "HahaWallet-BOT",
    account: "vonssy",
    description:
      "Multi-account automation for daily karma claims and quest completion with optional proxy support and rotation.",
    category: ["Automation", "Bots"],
    tags: ["Python", "Accounts", "Proxies"],
    repo: "https://github.com/vonssy/HahaWallet-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "70 stars · 16 forks",
    details: {
      overview:
        "Automated claim and quest workflows for Haha Wallet.",
      approach:
        "The bot reads account records from JSON, accepts an optional proxy list, and exposes a small interactive runtime for proxy mode and rotation.",
      decisions:
        "Credential structure, proxy handling, and daily actions are kept close to the configuration surface so the workflow is easy to run repeatedly.",
      challenges:
        "The README centers the practical constraints: multiple account credentials, invalid proxies, and repeatable daily tasks.",
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
    name: "Facial Expression Detection App",
    account: "REY-STTP",
    description:
      "An earlier AI and backend project using Face++ to classify uploaded images into seven expression categories.",
    category: ["AI / ML", "Web"],
    tags: ["Node.js", "Express", "MongoDB"],
    repo: "https://github.com/REY-STTP/Facial-Expression-Detection-App",
    signal: "Earlier experiment",
    details: {
      overview:
        "A Face++-integrated image analysis application.",
      approach:
        "The backend accepts image uploads, sends them to Face++, and stores or serves image-analysis records through a MongoDB-backed API.",
      decisions:
        "The README documents JWT authentication, bcrypt password hashing, validation, Multer uploads, and CRUD image endpoints.",
      challenges:
        "The project combines external AI API calls with user auth, file handling, data persistence, and API access control.",
    },
  },
  {
    name: "Bitverse-BOT",
    account: "vonssy",
    description:
      "Pharos Atlantic network automation for multi-account crypto farming with proxy rotation and automated deposit, withdraw, and trade flows.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "EVM"],
    repo: "https://github.com/vonssy/Bitverse-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "50 stars · 18 forks",
    details: {
      overview:
        "Automated Bitverse interaction on the Pharos Atlantic network across multiple accounts.",
      approach:
        "The bot retrieves account information automatically and runs deposit, withdraw, and random trade transactions through web3 and eth-account libraries.",
      decisions:
        "Proxy support is flexible (run with or without), with smart rotation of invalid proxies and simultaneous multi-account handling.",
      challenges:
        "The documented runtime centers on keeping several EVM wallets active through faucet-funded test tokens and proxy reliability.",
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
    signal: "50 stars · 16 forks",
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
    name: "IntuitionTestnet-BOT",
    account: "vonssy",
    description:
      "Intuition testnet bridge automation with proxy-aware multi-account execution.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "Bridge"],
    repo: "https://github.com/vonssy/IntuitionTestnet-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "50 stars · 14 forks",
    details: {
      overview:
        "Automated Intuition testnet interaction, focused on bridge transactions.",
      approach:
        "The bot fetches account info, supports private proxies, and makes repeatable bridge transactions across multiple accounts.",
      decisions:
        "Runtime choices keep proxy handling explicit, with both proxied and non-proxied modes supported.",
      challenges:
        "The README documents the dependency-version pitfalls of web3 and eth-account alongside multi-account execution.",
    },
  },
  {
    name: "Faroswap-BOT",
    account: "vonssy",
    description:
      "Pharos Atlantic swap and liquidity automation with proxy rotation and multi-account farming.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "DEX"],
    repo: "https://github.com/vonssy/Faroswap-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "48 stars · 15 forks",
    details: {
      overview:
        "Automated Faroswap interaction for swaps and liquidity on Pharos Atlantic.",
      approach:
        "The bot performs random swaps and add-liquidity transactions (USDC/USDT) through web3 and eth-account across multiple accounts.",
      decisions:
        "Proxy support is optional with smart rotation of invalid proxies, and account retrieval is fully automated.",
      challenges:
        "The runtime is built around faucet-funded tokens, proxy reliability, and keeping several wallets active.",
    },
  },
  {
    name: "AutoStaking-BOT",
    account: "vonssy",
    description:
      "Pharos staking automation covering MockUSD faucet claims and staking operations across multiple accounts.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "Staking"],
    repo: "https://github.com/vonssy/AutoStaking-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "35 stars · 11 forks",
    details: {
      overview:
        "Automated staking operations on the Pharos network.",
      approach:
        "The bot automates MockUSD faucet claims and staking transactions through web3, eth-account, and cryptography libraries.",
      decisions:
        "Proxy handling stays flexible with automatic rotation, and the account-management loop is fully automated.",
      challenges:
        "The workflow balances faucet token acquisition with repeatable staking actions across multiple accounts.",
    },
  },
  {
    name: "Brokex-BOT",
    account: "vonssy",
    description:
      "Brokex protocol trading automation covering faucet claims, position open/close, and liquidity deposits.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "Trading"],
    repo: "https://github.com/vonssy/Brokex-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "34 stars · 12 forks",
    details: {
      overview:
        "Automated Brokex protocol trading across multiple accounts.",
      approach:
        "The bot claims the USDT faucet, opens and closes random positions, and manages liquidity deposits and withdrawals.",
      decisions:
        "Proxy mode is selectable, with account info retrieval automated and multi-account support built in.",
      challenges:
        "The runtime has to coordinate faucet funding, position lifecycle, and liquidity across several wallets.",
    },
  },
  {
    name: "AquaFlux-BOT",
    account: "vonssy",
    description:
      "AquaFlux NFT minting automation with standard and premium token support, proxy rotation, and multi-account execution.",
    category: ["Web3", "Blockchain", "Bots"],
    tags: ["Python", "web3.py", "NFT"],
    repo: "https://github.com/vonssy/AquaFlux-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "24 stars · 8 forks",
    details: {
      overview:
        "Automated NFT minting on the AquaFlux playground.",
      approach:
        "The bot mints standard and premium NFTs across multiple accounts, with proxy mode and rotation as startup choices.",
      decisions:
        "Premium NFT minting requires a bound Twitter account, which the README surfaces as a prerequisite.",
      challenges:
        "The project juggles proxy reliability, dependency versioning, and multi-account minting.",
    },
  },
  {
    name: "3Dos-BOT",
    account: "vonssy",
    description:
      "3Dos node management with multi-threading, proxy layers, extension integration, and daily check-ins.",
    category: ["Web3", "Automation", "Bots"],
    tags: ["Python", "Multithreading", "Proxies"],
    repo: "https://github.com/vonssy/3Dos-BOT",
    demo: "https://t.me/vonssy_part_2",
    signal: "23 stars · 9 forks",
    details: {
      overview:
        "Automated 3Dos node management with multi-threading.",
      approach:
        "The bot extracts tokens, manages connections with the 3Dos Node Extension, and runs daily check-ins across many accounts.",
      decisions:
        "Multi-threading and multiple proxy layers handle scale, with optional Capmonster for captcha solving.",
      challenges:
        "Concurrency, proxy reliability, and extension integration are the core operational concerns.",
    },
  },
];
