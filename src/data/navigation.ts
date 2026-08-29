import type { NavItem, ProjectCategory, StatItem } from "@/types/portfolio";

export const navItems: NavItem[] = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Stack", id: "stack" },
  { label: "GitHub", id: "github" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

export const projectFilters: ProjectCategory[] = [
  "All",
  "Web3",
  "Automation",
  "Bots",
  "Blockchain",
  "Scraping",
  "Web",
  "AI / ML",
  "Tools",
];

export const githubStats: StatItem[] = [
  { value: "210", label: "public repos" },
  { value: "1,723", label: "followers" },
  { value: "43", label: "earlier repos" },
  { value: "2018", label: "first profile" },
];
