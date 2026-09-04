export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Who is Vonssy?",
    answer:
      "Vonssy is the builder identity of Reyvaldi Zakaria, a Web3 builder and automation engineer based in Indonesia (UTC+7). He designs and ships software that interacts with real APIs, wallets, blockchains, and data.",
  },
  {
    question: "What does Vonssy do?",
    answer:
      "He builds automation systems, bots, and backend software for Web3 and blockchain workflows — including wallet automation, on-chain interactions, web scraping, developer tooling, and data pipelines. The work combines Python, APIs, accounts, proxies, and networks into systems that keep running when the happy path ends.",
  },
  {
    question: "How do I contact Vonssy?",
    answer:
      "You can reach him on Telegram at t.me/vonssy_part_2 or by email at rey.zakaria123@gmail.com. Telegram is usually the fastest way to get a reply.",
  },
  {
    question: "Does Vonssy take on freelance or collaboration work?",
    answer:
      "Yes. The portfolio notes he is available for collaborations on Web3, automation, and backend engineering work. Reach out via Telegram or email to discuss a project.",
  },
  {
    question: "Is Vonssy BOT safe? Can I use my main wallet?",
    answer:
      "All BOTs are open-source — audit the code before you run it. Use a fresh wallet for farming/testnet, never your main wallet with real funds. Vonssy Terminal is read-only (Viem, no wallet connect, no signing), and AI tools here keep zero data retention. Same rule applies everywhere: new wallet per farming run, not shared with your main holdings.",
  },
  {
    question: "How does multi-wallet testnet farming actually work?",
    answer:
      "Drop private keys/mnemonics into accounts.json, set proxies (optional but recommended), and run. Each BOT handles daily check-ins, faucet claims, transfers, and swaps per wallet — with proxy rotation and retries so one dead connection doesn't stop the batch. Add wallets by appending lines, not rewriting config. Setup takes minutes; the BOT runs unattended after that.",
  },
  {
    question: "Why don't Vonssy BOTs crash like other free scripts?",
    answer:
      "Most free BOTs die the first time a proxy goes bad or an RPC times out — no rotation, no retry, just a stack trace. Vonssy BOTs treat that as normal, not exceptional: invalid-proxy auto-rotation, retry with backoff, and multithreading built in from the start. Cost of a crashing script isn't just annoyance — it's a missed check-in, a missed airdrop window.",
  },
  {
    question: "What happens when a testnet app updates and breaks your BOT?",
    answer:
      "It happens to every automation tool eventually — the difference is response time. APP_VERSION lives in .env so a version bump is a one-line fix, not a redeploy. Chain configs are centralized in one file. On top of that, the RAG index behind this site's chat re-ingests weekly, so answers here stay current with what's actually shipped.",
  },
  {
    question: "What does a custom quote actually cover?",
    answer:
      "No fixed price-list — every automation job is scoped to what you actually need. A typical custom build covers: bot logic (EVM/Substrate/Canton), proxy rotation and concurrency, RPC/API handling, .env config, a README you can actually follow, and one week of support after delivery. Message on Telegram or email with what you're trying to automate, and get a scope + quote back.",
  },
  {
    question: "Can I try something before reaching out?",
    answer:
      "Yes — several projects here are live, not screenshots. Vonssy Terminal (10-chain read-only wallet analytics), Cloud Storage (private presigned-URL uploads), and the E-Voting dApp are all click-and-use right now. Try one, then reach out on Telegram if it's the kind of thing you need built for your own use case.",
  },
];
