"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/types";
import { ProjectLink } from "@/components/ui/ProjectLink";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-bg-card"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      {/* Project image */}
      <div className="relative aspect-video w-full overflow-hidden bg-bg-muted">
        {!imageError && project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            onError={() => setImageError(true)}
            unoptimized={project.image.endsWith(".svg")}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-muted">
            <span className="font-body text-base text-text-secondary">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* Project content */}
      <div className="flex flex-1 flex-col gap-3 p-4 lg:p-6">
        {/* Title and status */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-snug text-text-primary">
            {project.title}
          </h3>
          {project.status === "in-progress" && (
            <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-base font-medium text-accent md:text-sm md:py-0.5">
              In Progress
            </span>
          )}
        </div>

        {/* Description */}
        <p className="font-body text-base leading-relaxed text-text-secondary">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-bg-muted px-2 py-0.5 font-body text-base text-text-secondary md:text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {project.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-3 border-t border-border">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-md px-4 py-2 text-base font-medium text-accent transition-colors hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
