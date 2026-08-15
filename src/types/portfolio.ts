import type { ReactNode } from "react";

export type ProjectAccount = "vonssy" | "REY-STTP";

export type ProjectCategory =
  | "All"
  | "Web3"
  | "Automation"
  | "Bots"
  | "Blockchain"
  | "Scraping"
  | "Web"
  | "AI / ML"
  | "Tools";

export interface ProjectDetails {
  overview: string;
  approach: string;
  decisions: string;
  challenges: string;
}

export interface Project {
  name: string;
  account: ProjectAccount;
  description: string;
  category: string[];
  tags: string[];
  repo: string;
  demo?: string;
  signal: string;
  details: ProjectDetails;
}

export interface Principle {
  title: string;
  description: string;
}

export interface StackCategory {
  category: string;
  items: string;
}

export type ThemePreference = "system" | "dark" | "light";

export interface ThemeOption {
  value: ThemePreference;
  label: string;
  icon: ReactNode;
}

export interface NavItem {
  label: string;
  id: string;
}

export interface StatItem {
  value: string;
  label: string;
}
