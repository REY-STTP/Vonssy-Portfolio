export type TrafficSource = "ai_referral" | "organic" | "direct" | "referral";

const AI_DOMAINS = [
  "chat.openai.com",
  "chatgpt.com",
  "openai.com",
  "perplexity.ai",
  "claude.ai",
  "anthropic.com",
  "gemini.google.com",
  "bard.google.com",
  "copilot.microsoft.com",
  "you.com",
  "phind.com",
  "poe.com",
];

const ORGANIC_DOMAINS = ["google.", "bing.com", "yahoo.com", "duckduckgo.com", "yandex.", "baidu.com", "ecosia.org"];

export function classifyTrafficSource(): TrafficSource {
  if (typeof window === "undefined" || typeof document === "undefined") return "direct";

  try {
    const params = new URLSearchParams(window.location.search);
    const utm = (params.get("utm_source") || params.get("utm_medium") || "").toLowerCase();

    if (utm) {
      if (
        utm.includes("chatgpt") ||
        utm.includes("openai") ||
        utm.includes("perplexity") ||
        utm.includes("claude") ||
        utm.includes("anthropic") ||
        utm.includes("gemini") ||
        utm.includes("copilot") ||
        utm.includes("ai")
      ) {
        return "ai_referral";
      }
    }

    const ref = document.referrer;
    if (!ref) return "direct";

    const refHost = new URL(ref).hostname.toLowerCase();

    if (AI_DOMAINS.some((d) => refHost.includes(d) || refHost.endsWith(d))) {
      return "ai_referral";
    }

    if (ORGANIC_DOMAINS.some((d) => refHost.includes(d))) {
      return "organic";
    }

    return "referral";
  } catch {
    return "direct";
  }
}
