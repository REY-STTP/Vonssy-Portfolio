import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vonssy Portfolio",
    short_name: "Vonssy Portfolio",
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
      {
        src: "/icon.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["technology", "developer", "portfolio"],
    scope: "/",
  };
}
