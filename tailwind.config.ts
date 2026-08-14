import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg)",
        surface: "var(--surface)",
        "surface-hi": "var(--surface-hi)",
        section: "var(--section)",
        ink: "var(--text)",
        soft: "var(--text-soft)",
        muted: "var(--muted)",
        subtle: "var(--muted-low)",
        quiet: "var(--muted-deep)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        warm: "var(--warm)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        "row-hover": "var(--row-hover)",
        scrim: "var(--scrim)",
        "button-ink": "var(--button-text)",
      },
      fontFamily: { sans: ["var(--font-manrope)"], mono: ["var(--font-jetbrains)"] },
    },
  },
  plugins: [],
};

export default config;
