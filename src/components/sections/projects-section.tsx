"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, ProjectCategory } from "@/types/portfolio";
import { projectFilters } from "@/data/navigation";
import { ArrowUpRight } from "@/components/icons";

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  reduceMotion: boolean;
}

const INITIAL_VISIBLE = 10;

export function ProjectsSection({
  projects,
  onSelectProject,
  reduceMotion,
}: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category.includes(activeCategory));

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_VISIBLE);

  const hasMore = filteredProjects.length > INITIAL_VISIBLE;

  return (
    <section id="projects" className="py-28 md:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl font-bold tracking-normal md:text-5xl">
              Selected work
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              A focused selection from two public GitHub accounts. Every
              description is tied to repository metadata or documentation.
            </p>
          </div>
          <p className="mono text-xs text-quiet">
            {filteredProjects.length.toString().padStart(2, "0")} of{" "}
            {projects.length.toString().padStart(2, "0")}
          </p>
        </div>

        <div
          className="mt-10 flex gap-6 overflow-x-auto border-b border-line"
          role="tablist"
          aria-label="Filter projects"
        >
          {projectFilters.map((filter) => {
            const isActive = activeCategory === filter;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                key={filter}
                onClick={() => {
                  setActiveCategory(filter);
                  setShowAll(false);
                }}
                className={`min-h-11 shrink-0 border-b-2 px-1 pb-3 text-xs font-bold transition-colors ${
                  isActive
                    ? "border-accent text-ink"
                    : "border-transparent text-quiet hover:text-ink"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-3 border-b border-line">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.button
                type="button"
                layout
                aria-haspopup="dialog"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.025 }}
                key={project.name}
                className="project-row group grid w-full gap-5 border-t border-line py-7 text-left md:grid-cols-[3.5rem_minmax(0,1.15fr)_minmax(0,1.85fr)_13.5rem] md:items-center md:gap-6 md:px-3"
                onClick={() => onSelectProject(project)}
              >
                <span className="project-number mono">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="mono block text-xs text-quiet">
                    @{project.account}
                  </span>
                  <span className="mt-2 block text-xl font-bold text-ink transition-colors group-hover:text-accent-strong md:text-2xl">
                    {project.name}
                  </span>
                </span>

                <span className="min-w-0">
                  <span className="block text-sm leading-6 text-soft">
                    {project.description}
                  </span>
                  <span className="mono mt-3 block text-xs leading-5 text-subtle">
                    {project.tags.join(" · ")}
                  </span>
                </span>

                <span className="flex items-center justify-between gap-4 md:justify-end">
                  <span className="text-xs text-warm whitespace-nowrap text-right">
                    {project.signal}
                  </span>
                  <span className="text-accent transition-transform group-hover:translate-x-1 shrink-0">
                    <ArrowUpRight />
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="button button-ghost"
              aria-expanded={showAll}
            >
              {showAll ? "Show fewer" : `Show all ${filteredProjects.length} projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
