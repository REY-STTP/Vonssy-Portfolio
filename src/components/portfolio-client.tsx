"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/app/page";
import {
  ArrowDownIcon,
  ArrowUpRight,
  ArrowUpIcon,
  CloseIcon,
  GitHubIcon,
  MenuIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
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

function useClientReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduce;
}

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
  const [intro, setIntro] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const reduce = useClientReducedMotion();
  const filtered = active === "All" ? projects : projects.filter((project) => project.category.includes(active));
  const reveal = {
    hidden: { opacity: 0, y: reduce ? 0 : 34 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 110]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, reduce ? 1 : 0.94]);
  const smoothHeroY = useSpring(heroY, { stiffness: 90, damping: 24, mass: 0.5 });

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("vonssy-intro-seen") === "1";
      sessionStorage.setItem("vonssy-intro-seen", "1");
    } catch {
      // The intro can still run when session storage is unavailable.
    }
    if (seen || reduce) {
      setIntro(false);
      return;
    }
    const timer = window.setTimeout(() => setIntro(false), 1050);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  useEffect(() => {
    if (!selected) return;
    dialogCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  useEffect(() => {
    const root = document.documentElement;
    let stored: ThemePreference = "system";
    try {
      const preference = localStorage.getItem("vonssy-theme");
      if (preference === "system" || preference === "dark" || preference === "light") stored = preference;
    } catch {
      // System theme remains the fallback when storage is unavailable.
    }
    root.dataset.themePreference = stored;
    setTheme(stored);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      if ((root.dataset.themePreference ?? "system") !== "system") return;
      const resolved = media.matches ? "dark" : "light";
      applyResolvedTheme(resolved);
    };
    applyResolvedTheme(stored === "system" ? (media.matches ? "dark" : "light") : stored);
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
      <AnimatePresence>{intro && <IntroOverlay reduce={Boolean(reduce)} />}</AnimatePresence>

      <header id="top" className="site-header shell" aria-label="Primary navigation">
        <a href="#home" className="brand-mark mono">
          VONSSY<span className="text-accent">.</span><span className="brand-index">/26</span>
        </a>
        <div className="flex items-center gap-3">
          <nav className="desktop-nav hidden items-center gap-7 md:flex">
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="nav-link mono">
                <span>0{navigation.findIndex((item) => item[1] === id) + 1}</span>{label}
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
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} id="mobile-navigation" className="mobile-nav md:hidden">
            {navigation.map(([label, id]) => (
              <a key={id} onClick={() => setMenu(false)} href={`#${id}`}>
                <span className="mono">0{navigation.findIndex((item) => item[1] === id) + 1}</span>{label}
              </a>
            ))}
          </motion.nav>
        )}
      </header>

      <section
        ref={heroRef}
        id="home"
        className="hero-section"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
          event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
        }}
      >
        <div className="hero-grid" aria-hidden="true" />
        <motion.div style={{ y: smoothHeroY, scale: heroScale }} className="shell hero-inner">
          <motion.div initial="hidden" animate={intro ? "hidden" : "show"} variants={reveal} className="hero-copy">
            <div className="hero-kicker mono"><span className="availability-dot" /> Available for selected collaborations <span>Indonesia / UTC+7</span></div>
            <h1 className="hero-title" aria-label="Software that does things">
              <span className="hero-line"><span>Software</span><small>01</small></span>
              <span className="hero-line hero-line-accent"><span>that does</span><small>02</small></span>
              <span className="hero-line"><span>things.</span><small>03</small></span>
            </h1>
            <div className="hero-bottom">
              <p>I build automation systems, bots, and software that interact with real APIs, wallets, blockchains, and data.</p>
              <div className="hero-actions-mobile">
                <a className="button button-primary" href="#projects">Explore work <ArrowUpRight /></a>
                <a className="button button-ghost" href="https://github.com/vonssy" target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
              </div>
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, scale: reduce ? 1 : 0.88, rotate: reduce ? 0 : 4 }} animate={intro ? {} : { opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: reduce ? 0 : 0.22, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="profile-orbit" aria-label="Vonssy profile summary">
            <div className="orbit-copy mono" aria-hidden="true">BUILD · AUTOMATE · ITERATE · SHIP · </div>
            <div className="profile-photo-wrap">
              <Image src="https://avatars.githubusercontent.com/u/86215416?v=4" alt="Vonssy GitHub avatar" width={320} height={320} className="profile-photo" priority />
              <span className="profile-status mono">@vonssy</span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore work <ArrowUpRight /></a>
              <a className="button button-ghost" href="https://github.com/vonssy" target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
            </div>
          </motion.aside>
        </motion.div>
        <a href="#manifesto" className="hero-scroll mono"><span>Scroll to inspect</span><ArrowDownIcon /></a>
      </section>

      <div className="ticker" aria-hidden="true"><div>WEB3 SYSTEMS · PYTHON AUTOMATION · WALLET WORKFLOWS · DEVELOPER TOOLING · WEB3 SYSTEMS · PYTHON AUTOMATION · WALLET WORKFLOWS · DEVELOPER TOOLING ·</div></div>

      <Manifesto reduce={Boolean(reduce)} />

      <motion.section id="about" className="section-pad" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={reveal}>
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
      </motion.section>

      <section className="border-y border-line-soft bg-section section-pad build-section">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[.68fr_1.32fr]">
            <div>
              <h2 className="text-4xl font-bold tracking-normal md:text-5xl">How I build</h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted">The recurring decisions behind the repositories, not a manifesto.</p>
            </div>
            <div className="grid md:grid-cols-2">
              {philosophy.map(([title, text], index) => (
                <motion.div initial={{ opacity: 0, y: reduce ? 0 : 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: reduce ? 0 : index * 0.08, duration: 0.55 }} key={title} className="principle border-t border-line py-6 md:odd:pr-7 md:even:pl-7">
                  <span className="mono principle-index">0{index + 1}</span><h3 className="font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
                </motion.div>
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
            <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.button
                type="button"
                layout
                aria-haspopup="dialog"
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : index * 0.025 }}
                key={project.name}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                className="project-row group grid w-full gap-5 border-t border-line py-7 text-left md:grid-cols-[5rem_minmax(0,.72fr)_minmax(0,1.35fr)_auto] md:items-center md:px-3"
                onClick={() => setSelected(project)}
              >
                <span className="project-number mono">{(index + 1).toString().padStart(2, "0")}</span>
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
            </AnimatePresence>
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

      <footer className="site-footer shell border-t border-line-soft py-7 text-xs text-quiet">
        <span className="footer-credit">Built by Vonssy.</span>
        <div className="footer-meta">
          <div className="footer-links">
            <a href="https://github.com/vonssy" target="_blank" rel="noreferrer" className="hover:text-ink">GitHub</a>
            <a href="https://t.me/vonssy_part_2" target="_blank" rel="noreferrer" className="hover:text-ink">Telegram</a>
          </div>
          <span className="footer-year mono">2026 / systems in motion</span>
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
                 <button ref={dialogCloseRef} type="button" aria-label="Close project details" onClick={() => setSelected(null)} className="button button-ghost h-11 w-11 shrink-0 p-0"><CloseIcon /></button>
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

function IntroOverlay({ reduce }: { reduce: boolean }) {
  return (
    <motion.div className="intro-overlay" initial={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: reduce ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }}>
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.45 }}>
        <span className="mono">PORTFOLIO / 2026</span>
        <strong>VONSSY<span>.</span></strong>
      </motion.div>
    </motion.div>
  );
}

function Manifesto({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const words = "I combine code, networks, accounts, and data into software that keeps moving when the happy path ends.".split(" ");
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = ref.current;
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      scrollYProgress.set(Math.min(1, Math.max(0, (window.scrollY - top) / travel)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [scrollYProgress]);

  return (
    <section id="manifesto" ref={ref} className="manifesto-section">
      <div className="shell manifesto-inner">
        <p className="mono manifesto-label">01 / OPERATING PRINCIPLE</p>
        <p className="manifesto-copy">
          {words.map((word, index) => <ManifestoWord key={`${word}-${index}`} word={word} index={index} total={words.length} progress={scrollYProgress} reduce={reduce} />)}
        </p>
      </div>
    </section>
  );
}

function ManifestoWord({ word, index, total, progress, reduce }: { word: string; index: number; total: number; progress: MotionValue<number>; reduce: boolean }) {
  const start = (index / total) * 0.26;
  const opacity = useTransform(progress, [start, start + 0.08], [0.16, 1]);
  return <motion.span style={{ opacity: reduce ? 1 : opacity }}>{word} </motion.span>;
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
