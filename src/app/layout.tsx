import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/vonssy";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vonssy | Web3 Builder & Automation Engineer",
  description: "Vonssy builds automation systems, bots, and software that interact with real APIs, wallets, blockchains, and data.",
  alternates: { canonical: siteUrl },
  openGraph: { title: "Vonssy | Web3 Builder & Automation Engineer", description: "Software that does things.", type: "website", url: siteUrl },
  twitter: { card: "summary_large_image", title: "Vonssy | Web3 Builder & Automation Engineer", description: "Software that does things." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111411" },
    { media: "(prefers-color-scheme: light)", color: "#e4e8e1" },
  ],
};

const themeScript = `(function(){try{var p=localStorage.getItem('vonssy-theme');if(p!=='light'&&p!=='dark'&&p!=='system')p='system';var d=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;var r=document.documentElement;r.dataset.theme=d;r.dataset.themePreference=p;r.style.colorScheme=d;}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${manrope.variable} ${jetbrains.variable}`}>{children}</body>
    </html>
  );
}
