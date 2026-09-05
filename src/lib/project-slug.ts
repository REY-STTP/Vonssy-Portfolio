import type { Project } from "@/types/portfolio";

export const PROJECT_QUERY_PARAM = "project";

export function slugifyProject(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findProjectBySlug(projects: Project[], slug: string): Project | null {
  const normalized = slug.toLowerCase().trim();
  if (!normalized) return null;
  return projects.find((p) => slugifyProject(p.name) === normalized) ?? null;
}
