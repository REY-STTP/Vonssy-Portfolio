import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { CANONICAL_URL, siteConfig } from "@/data/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? CANONICAL_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Vonssy Portfolio",
  title: {
    default: "Vonssy | Web3 Builder & Automation Engineer",
    template: "%s | Vonssy",
  },
  description:
    "Vonssy (Reyvaldi Zakaria) builds Web3 and blockchain automation systems, bots, and backend software that interact with real APIs, wallets, on-chain data, and networks. Based in Indonesia (UTC+7).",
  keywords: [
    "Vonssy",
    "Reyvaldi Zakaria",
    "Web3 builder",
    "automation engineer",
    "blockchain automation",
    "Python automation",
    "crypto bots",
    "wallet automation",
    "web scraping",
    "backend engineering",
    "developer tooling",
    "Indonesia developer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.socialLinks.github }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Vonssy",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    title: "Vonssy | Web3 Builder & Automation Engineer",
    description: "Software that does things — Web3, blockchain, and automation systems built by Vonssy.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vonssy | Web3 Builder & Automation Engineer — Software that does things.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vonssy | Web3 Builder & Automation Engineer",
    description: "Software that does things — Web3, blockchain, and automation systems built by Vonssy.",
    creator: "@vonssy",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Vonssy",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  verification: {
    google: "0GDhAn2e04C0QlOPsQL285huEN8o4WT9LvJj2XBDlVk",
  },
  other: {
    "google-site-verification": "0GDhAn2e04C0QlOPsQL285huEN8o4WT9LvJj2XBDlVk",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111411" },
    { media: "(prefers-color-scheme: light)", color: "#e4e8e1" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning />
      <body suppressHydrationWarning className={`${manrope.variable} ${jetbrains.variable}`}>{children}</body>
    </html>
  );
}
