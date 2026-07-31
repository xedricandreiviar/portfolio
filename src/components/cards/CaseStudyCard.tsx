"use client";

import { useState } from "react";
import Image from "next/image";
import type { FlagshipProject } from "@/types";

export interface CaseStudyCardProps {
  project: FlagshipProject;
}

const MOBILE_DESCRIPTION_LIMIT = 120;

function ExpandableText({ text, label }: { text: string; label: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsTruncation = text.length > MOBILE_DESCRIPTION_LIMIT;

  if (!needsTruncation) {
    return (
      <p className="font-body text-base leading-relaxed text-text-secondary md:text-lg">
        {text}
      </p>
    );
  }

  return (
    <div>
      <p className="font-body text-base leading-relaxed text-text-secondary md:text-lg">
        <span className="md:hidden">
          {isExpanded ? text : `${text.slice(0, MOBILE_DESCRIPTION_LIMIT)}…`}
        </span>
        <span className="hidden md:inline">{text}</span>
      </p>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-1 min-h-[44px] min-w-[44px] font-body text-base font-medium text-accent transition-colors hover:text-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Collapse ${label}` : `Expand ${label}`}
      >
        {isExpanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}

export function CaseStudyCard({ project }: CaseStudyCardProps) {
  const [imageError, setImageError] = useState(false);

  const githubLink = project.links.find((link) => link.icon === "github");
  const demoLink = project.links.find((link) => link.icon === "arrow" || link.label.toLowerCase().includes("demo"));

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-bg-card shadow-sm transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:border-accent motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-sm">
      {/* Project image - 16:9 on mobile, reserved space to prevent layout shift */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-bg-muted">
        {!imageError ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
            onError={() => setImageError(true)}
            unoptimized={project.image.endsWith(".svg")}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-muted">
            <span className="font-body text-lg text-text-secondary">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* Content - more padding and sections for visual weight over standard ProjectCard */}
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
        {/* Title */}
        <h3 className="font-display text-h2 font-bold leading-tight text-text-primary">
          {project.title}
        </h3>

        {/* Problem statement */}
        <div>
          <p className="mb-1 font-display text-base font-semibold uppercase tracking-wide text-accent">
            Problem
          </p>
          <ExpandableText text={project.problemStatement} label="problem statement" />
        </div>

        {/* Tech stack */}
        <div>
          <p className="mb-2 font-display text-base font-semibold uppercase tracking-wide text-accent">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-bg-muted px-3 py-1 font-body text-base text-text-secondary md:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Technical challenge */}
        <div>
          <p className="mb-1 font-display text-base font-semibold uppercase tracking-wide text-accent">
            Technical Challenge
          </p>
          <ExpandableText text={project.technicalChallenge} label="technical challenge" />
        </div>

        {/* Technical highlights */}
        <div>
          <p className="mb-2 font-display text-base font-semibold uppercase tracking-wide text-accent">
            Highlights
          </p>
          <ul className="list-inside list-disc space-y-1">
            {project.technicalHighlights.map((highlight) => (
              <li
                key={highlight}
                className="font-body text-base leading-relaxed text-text-secondary"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 border-t border-border pt-6">
          {demoLink && (
            <a
              href={demoLink.href}
              target={demoLink.external ? "_blank" : undefined}
              rel={demoLink.external ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-md bg-accent px-4 py-2 font-body text-base font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span>↗</span>
              <span>{demoLink.label}</span>
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink.href}
              target={githubLink.external ? "_blank" : undefined}
              rel={githubLink.external ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-md border border-border px-4 py-2 font-body text-base font-medium text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>{githubLink.label}</span>
            </a>
          )}
          {/* Render any other links with proper external attributes */}
          {project.links
            .filter((link) => link !== demoLink && link !== githubLink)
            .map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-md border border-border px-4 py-2 font-body text-base font-medium text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>{link.label}</span>
              </a>
            ))}
        </div>
      </div>
    </article>
  );
}
