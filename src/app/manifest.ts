import type { MetadataRoute } from "next";
import { CANONICAL_URL } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vonssy | Web3 Builder & Automation Engineer",
    short_name: "Vonssy",
    description:
      "Vonssy (Reyvaldi Zakaria) — Web3 builder & automation engineer. Software that does things.",
    start_url: "/",
    display: "standalone",
    background_color: "#111411",
    theme_color: "#111411",
    lang: "en",
    dir: "ltr",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["technology", "developer", "portfolio"],
    scope: CANONICAL_URL,
  };
}
