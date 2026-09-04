"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types/portfolio";
import { ArrowUpRight, CloseIcon, GitHubIcon } from "@/components/icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  reduceMotion: boolean;
}

export function ProjectModal({
  project,
  onClose,
  reduceMotion,
}: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const getFocusableElements = (): HTMLElement[] => {
      const container = containerRef.current;
      if (!container) return [];
      return Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep Tab cycling inside the dialog while it is open.
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus to the element that opened the dialog.
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  useEffect(() => {
    if (!project) return;

    // Lock background scroll while the dialog is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-scrim p-3 backdrop-blur-sm md:items-center md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: "easeOut",
            }}
            className="soft max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl p-6 md:p-9"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="mono text-xs text-quiet">@{project.account}</p>
                <h2
                  id="project-dialog-title"
                  className="mt-2 text-3xl font-bold tracking-normal md:text-5xl"
                >
                  {project.name}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close project details"
                onClick={onClose}
                className="button button-ghost h-11 w-11 shrink-0 p-0"
              >
                <CloseIcon />
              </button>
            </div>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-soft">
              {project.details.overview}
            </p>

            <dl className="mt-8 border-b border-line">
              <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[10rem_1fr]">
                <dt className="text-sm font-bold">Approach</dt>
                <dd className="text-sm leading-6 text-soft">
                  {project.details.approach}
                </dd>
              </div>

              <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[10rem_1fr]">
                <dt className="text-sm font-bold">Engineering decisions</dt>
                <dd className="text-sm leading-6 text-soft">
                  {project.details.decisions}
                </dd>
              </div>

              <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[10rem_1fr]">
                <dt className="text-sm font-bold">Documented challenges</dt>
                <dd className="text-sm leading-6 text-soft">
                  {project.details.challenges}
                </dd>
              </div>

              <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[10rem_1fr]">
                <dt className="text-sm font-bold">Technologies</dt>
                <dd className="mono text-xs leading-6 text-accent">
                  {project.tags.join(" · ")}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex gap-3">
              <a
                className="button button-primary flex-1 justify-center text-xs sm:flex-none sm:text-[13px]"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon /> Repository <ArrowUpRight />
              </a>
              {project.demo && (
                <a
                  className="button button-ghost flex-1 justify-center text-xs sm:flex-none sm:text-[13px]"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("demo_click", { project: project.name })}
                >
                  Demo <ArrowUpRight />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
