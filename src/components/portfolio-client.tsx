"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Project } from "@/app/page";
import {
  ArrowDownIcon,
  ArrowUpRight,
  ArrowUpIcon,
  CloseIcon,
  CodeIcon,
  GitHubIcon,
  MenuIcon,
  MonitorIcon,
  MoonIcon,
  NetworkIcon,
  ShieldIcon,
  SunIcon,
  TerminalIcon,
} from "./icons";

type Props = {
  projects: Project[];
  philosophy: string[][];
  stack: string[][];
};

const filters = ["All", "Web3", "Automation", "Bots", "Blockchain", "Scraping", "Web", "AI / ML", "Tools"];
const navigation = [["About", "about"], ["Projects", "projects"], ["Stack", "stack"], ["GitHub", "github"], ["Contact", "contact"]];
type ThemePreference = "system" | "dark" | "light";
const themes: { value: ThemePreference; label: string; icon: React.ReactNode }[] = [
  { value: "system", label: "Use system theme", icon: <MonitorIcon /> },
  { value: "dark", label: "Use dark theme", icon: <MoonIcon /> },
  { value: "light", label: "Use light theme", icon: <SunIcon /> },
];
const focusAreas = [
  [<NetworkIcon key="network" />, "Web3 systems"],
  [<CodeIcon key="code" />, "Python automation"],
  [<ShieldIcon key="shield" />, "Wallet workflows"],
  [<TerminalIcon key="terminal" />, "Developer tooling"],
];

function applyResolvedTheme(theme: "dark" | "light") {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    meta.content = theme === "dark" ? "#111411" : "#e4e8e1";
  });
}

export default function PortfolioClient({ projects, philosophy, stack }: Props) {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState<ThemePreference>("system");
  const [scrollProgress, setScrollProgress] = useState(0);
  const reduce = useReducedMotion();
  const filtered = active === "All" ? projects : projects.filter((project) => project.category.includes(active));
  const reveal = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45, ease: "easeOut" as const } },
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  useEffect(() => {
    const root = document.documentElement;
    const stored = root.dataset.themePreference;
    if (stored === "system" || stored === "dark" || stored === "light") setTheme(stored);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      if ((root.dataset.themePreference ?? "system") !== "system") return;
      const resolved = media.matches ? "dark" : "light";
      applyResolvedTheme(resolved);
    };
    applyResolvedTheme(root.dataset.theme === "light" ? "light" : "dark");
    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const selectTheme = (preference: ThemePreference) => {
    const resolved = preference === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : preference;
    const root = document.documentElement;
    root.dataset.themePreference = preference;
    applyResolvedTheme(resolved);
    try {
      localStorage.setItem("vonssy-theme", preference);
    } catch {
      // The selected theme still applies for this page when storage is unavailable.
    }
    setTheme(preference);
  };

  return (
    <main>
      <header id="top" className="shell flex items-center justify-between py-7" aria-label="Primary navigation">
        <a href="#home" className="mono text-sm font-bold tracking-normal">
          VONSSY<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-7 md:flex">
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="text-xs text-muted transition-colors hover:text-ink">
                {label}
              </a>
            ))}
          </nav>
          <ThemeSelector theme={theme} onChange={selectTheme} />
          <button
            type="button"
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation"
            className="soft flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
            onClick={() => setMenu(!menu)}
          >
            <MenuIcon open={menu} />
          </button>
        </div>
        {menu && (
          <nav id="mobile-navigation" className="soft absolute right-4 top-20 z-20 flex w-48 flex-col gap-1 rounded-lg p-2 md:hidden">
            {navigation.map(([label, id]) => (
              <a key={id} onClick={() => setMenu(false)} href={`#${id}`} className="rounded-md px-4 py-3 text-sm text-muted hover:bg-surface-hi hover:text-ink">
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section id="home" className="border-b border-line-soft pb-20 pt-10 md:pb-24 md:pt-16">
        <div className="shell grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <motion.div initial="hidden" animate="show" variants={reveal}>
            <p className="text-lg font-semibold text-ink">Vonssy <span className="font-normal text-quiet">/ Reyvaldi Zakaria</span></p>
            <p className="mono mt-3 text-xs leading-5 text-muted">Web3 Builder · Automation Engineer · Software Developer</p>
            <h1 className="mt-8 max-w-4xl text-[clamp(3.25rem,8vw,6.4rem)] font-extrabold leading-[.94] tracking-normal">
              Software<br />
              <span className="text-accent">that does</span><br />
              things<span className="text-warm">.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-soft md:text-lg">
              I build automation systems, bots, and software that interact with real APIs, wallets, blockchains, and data.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button button-primary" href="#projects">View projects <ArrowUpRight /></a>
              <a className="button button-ghost" href="https://github.com/vonssy" target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
            </div>
          </motion.div>

          <motion.aside initial="hidden" animate="show" transition={{ delay: reduce ? 0 : 0.1 }} variants={reveal} className="soft rounded-lg p-6 md:p-7" aria-label="Vonssy profile summary">
            <div className="flex items-center gap-4">
              <Image src="https://avatars.githubusercontent.com/u/86215416?v=4" alt="Vonssy GitHub avatar" width={60} height={60} className="rounded-lg" priority />
              <div>
                <p className="font-bold">Reyvaldi Zakaria</p>
                <p className="mono mt-1 text-xs text-muted">@vonssy · @REY-STTP</p>
              </div>
            </div>
            <p className="mt-6 text-sm font-semibold">Current practice</p>
            <ul className="mt-3 grid grid-cols-2 border-t border-line">
              {focusAreas.map(([icon, label]) => (
                <li key={label as string} className="flex min-h-16 items-center gap-3 border-b border-line py-3 text-xs text-soft odd:pr-3 even:pl-3">
                  <span className="text-accent">{icon}</span>{label}
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </section>

      <section id="about" className="section-pad">
        <div className="shell grid gap-12 lg:grid-cols-[.68fr_1.32fr]">
          <h2 className="max-w-md text-4xl font-bold leading-tight tracking-normal md:text-5xl">From fundamentals to automation.</h2>
          <div className="max-w-2xl text-[17px] leading-8 text-soft">
            <p>Vonssy is the builder identity of Reyvaldi Zakaria. The work started broad: programming fundamentals, C and C++, JavaScript, PHP, SQL, Python, AI and machine learning, and mobile development.</p>
            <p className="mt-5">That path moved through web applications and backend systems into software that runs against the real world: wallets, blockchains, external APIs, accounts, proxies, and data. The point is not collecting technologies. It is combining enough of them to make a working system.</p>
            <div className="mt-8 border-t border-line pt-5">
              <p className="mono text-xs text-quiet">learning → experimenting → building → <span className="text-accent">automating</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line-soft bg-section section-pad">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[.68fr_1.32fr]">
            <div>
              <h2 className="text-4xl font-bold tracking-normal md:text-5xl">How I build</h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted">The recurring decisions behind the repositories, not a manifesto.</p>
            </div>
            <div className="grid md:grid-cols-2">
              {philosophy.map(([title, text]) => (
                <div key={title} className="border-t border-line py-6 md:odd:pr-7 md:even:pl-7">
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-28 md:py-32">
        <div className="shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-bold tracking-normal md:text-5xl">Selected work</h2>
              <p className="mt-4 max-w-xl text-muted">A focused selection from two public GitHub accounts. Every description is tied to repository metadata or documentation.</p>
            </div>
            <p className="mono text-xs text-quiet">{filtered.length.toString().padStart(2, "0")} of {projects.length.toString().padStart(2, "0")}</p>
          </div>

          <div className="mt-10 flex gap-6 overflow-x-auto border-b border-line" role="tablist" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                type="button"
                role="tab"
                aria-selected={active === filter}
                key={filter}
                onClick={() => setActive(filter)}
                className={`min-h-11 shrink-0 border-b-2 px-1 pb-3 text-xs font-bold transition-colors ${active === filter ? "border-accent text-ink" : "border-transparent text-quiet hover:text-ink"}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-3 border-b border-line">
            {filtered.map((project, index) => (
              <motion.button
                type="button"
                layout
                aria-haspopup="dialog"
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : index * 0.025 }}
                key={project.name}
                className="group grid w-full gap-5 border-t border-line py-7 text-left transition-colors hover:bg-row-hover md:grid-cols-[minmax(0,.72fr)_minmax(0,1.35fr)_auto] md:items-center md:px-3"
                onClick={() => setSelected(project)}
              >
                <span>
                  <span className="mono block text-xs text-quiet">@{project.account}</span>
                  <span className="mt-2 block text-xl font-bold text-ink transition-colors group-hover:text-accent-strong md:text-2xl">{project.name}</span>
                </span>
                <span>
                  <span className="block text-sm leading-6 text-soft">{project.description}</span>
                  <span className="mono mt-3 block text-xs leading-5 text-subtle">{project.tags.join(" · ")}</span>
                </span>
                <span className="flex items-center justify-between gap-5 md:justify-end">
                  <span className="text-xs text-warm">{project.signal}</span>
                  <span className="text-accent transition-transform group-hover:translate-x-1"><ArrowUpRight /></span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="stack" className="border-y border-line-soft bg-section section-pad">
        <div className="shell grid gap-12 lg:grid-cols-[.68fr_1.32fr]">
          <div>
            <h2 className="text-4xl font-bold tracking-normal md:text-5xl">Working stack</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">Grouped by what each tool does in the work.</p>
          </div>
          <dl className="border-b border-line">
            {stack.map(([label, value]) => (
              <div key={label} className="grid gap-2 border-t border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-5">
                <dt className="font-bold">{label}</dt>
                <dd className="text-sm leading-6 text-soft">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="github" className="section-pad">
        <div className="shell grid gap-14 lg:grid-cols-[1.12fr_.88fr] lg:items-end">
          <div>
            <h2 className="max-w-xl text-4xl font-bold tracking-normal md:text-6xl">GitHub history</h2>
            <p className="mt-6 max-w-xl leading-7 text-soft">The current automation work lives mostly at <span className="mono text-ink">@vonssy</span>. Earlier experiments and web applications live at <span className="mono text-ink">@REY-STTP</span>.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button button-primary" href="https://github.com/vonssy" target="_blank" rel="noreferrer"><GitHubIcon /> @vonssy <ArrowUpRight /></a>
              <a className="button button-ghost" href="https://github.com/REY-STTP" target="_blank" rel="noreferrer">@REY-STTP <ArrowUpRight /></a>
            </div>
            <p className="mono mt-4 text-xs text-subtle">Public profile snapshot · August 2026</p>
          </div>
          <dl className="grid grid-cols-2 border-b border-line">
            <Stat value="210" label="public repos" />
            <Stat value="1,723" label="followers" />
            <Stat value="43" label="earlier repos" />
            <Stat value="2018" label="first profile" />
          </dl>
        </div>
      </section>

      <section id="contact" className="border-t border-line-soft section-pad">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="text-4xl font-bold tracking-normal md:text-6xl">Want to build<br /><span className="text-accent">something useful?</span></h2>
          <div className="flex flex-wrap gap-3">
            <a href="https://t.me/vonssy_part_2" target="_blank" rel="noreferrer" className="button button-primary">Telegram <ArrowUpRight /></a>
            <a href="mailto:rey.zakaria123@gmail.com" className="button button-ghost">Email <ArrowUpRight /></a>
          </div>
        </div>
      </section>

      <footer className="shell flex flex-col gap-4 border-t border-line-soft py-7 text-xs text-quiet sm:flex-row sm:items-center sm:justify-between">
        <span>Built by Vonssy.</span>
        <div className="flex flex-wrap gap-5">
          <a href="https://github.com/vonssy" target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a>
          <a href="https://t.me/vonssy_part_2" target="_blank" rel="noreferrer" className="hover:text-ink">Telegram</a>
          <span className="mono">2026 / systems in motion</span>
        </div>
      </footer>

      <ScrollProgress progress={scrollProgress} />

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-scrim p-3 backdrop-blur-sm md:items-center md:p-8" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : 12 }}
              transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
              className="soft max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl p-6 md:p-9"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="mono text-xs text-quiet">@{selected.account}</p>
                  <h2 id="project-dialog-title" className="mt-2 text-3xl font-bold tracking-normal md:text-5xl">{selected.name}</h2>
                </div>
                <button type="button" aria-label="Close project details" onClick={() => setSelected(null)} className="button button-ghost h-11 w-11 shrink-0 p-0"><CloseIcon /></button>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-soft">{selected.details.overview}</p>
              <dl className="mt-8 border-b border-line">
                {[["Approach", selected.details.approach], ["Engineering decisions", selected.details.decisions], ["Documented challenges", selected.details.challenges]].map(([label, text]) => (
                  <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[10rem_1fr]" key={label}>
                    <dt className="text-sm font-bold">{label}</dt>
                    <dd className="text-sm leading-6 text-soft">{text}</dd>
                  </div>
                ))}
                <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[10rem_1fr]">
                  <dt className="text-sm font-bold">Technologies</dt>
                  <dd className="mono text-xs leading-6 text-accent">{selected.tags.join(" · ")}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="button button-primary" href={selected.repo} target="_blank" rel="noreferrer"><GitHubIcon /> Repository <ArrowUpRight /></a>
                {selected.demo && <a className="button button-ghost" href={selected.demo} target="_blank" rel="noreferrer">Demo / support <ArrowUpRight /></a>}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-line py-5 odd:pr-5 even:border-l even:pl-5">
      <dt className="text-3xl font-bold text-ink">{value}</dt>
      <dd className="mono mt-2 text-xs text-subtle">{label}</dd>
    </div>
  );
}

function ThemeSelector({ theme, onChange }: { theme: ThemePreference; onChange: (theme: ThemePreference) => void }) {
  return (
    <div className="soft-inset flex h-12 items-center rounded-lg p-0.5" role="group" aria-label="Theme preference">
      {themes.map((option) => (
        <button
          type="button"
          key={option.value}
          aria-label={option.label}
          aria-pressed={theme === option.value}
          title={option.label}
          onClick={() => onChange(option.value)}
          className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors ${theme === option.value ? "bg-surface text-accent shadow-[2px_2px_5px_var(--shadow-dark),-2px_-2px_5px_var(--shadow-light)]" : "text-muted hover:text-ink"}`}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}

function ScrollProgress({ progress }: { progress: number }) {
  const hasScrolled = progress > 0.06;
  const target = hasScrolled ? "top" : "projects";
  const label = hasScrolled ? `Scroll progress ${Math.round(progress * 100)} percent. Back to top` : "Jump to projects";
  const radius = 19;
  const circumference = 2 * Math.PI * radius;

  return (
    <a
      href={`#${target}`}
      aria-label={label}
      title={hasScrolled ? "Back to top" : "Jump to projects"}
      className="soft fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full text-muted transition-colors hover:text-accent focus-visible:text-accent md:bottom-6 md:right-6 md:h-14 md:w-14"
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="var(--line)" strokeWidth="2" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <span className="relative">{hasScrolled ? <ArrowUpIcon /> : <ArrowDownIcon />}</span>
    </a>
  );
}
