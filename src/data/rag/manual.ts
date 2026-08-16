import type { RagSource } from "@/types/rag";

export const manualSources: RagSource[] = [
  {
    source: "bio",
    content: [
      "Reyvaldi Zakaria, known online as Vonssy, is a Web3 builder and automation engineer.",
      "Tagline: Software that does things.",
      "He builds automation systems, bots, and software that interact with real APIs, wallets, blockchains, and data.",
      "From fundamentals to automation — focused on reliable, practical systems that meet real network conditions.",
      "Approach: Build for reality, automate the boring parts, prioritize reliability, and keep it practical.",
      "Primary GitHub: github.com/vonssy. Secondary GitHub: github.com/REY-STTP.",
    ].join("\n"),
  },
  {
    source: "contact",
    content: [
      "Contact: Telegram at t.me/vonssy_part_2, email at rey.zakaria123@gmail.com.",
      "Availability: open to collaboration and project inquiries via Telegram or email.",
    ].join("\n"),
  },
];
