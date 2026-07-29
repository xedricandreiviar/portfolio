"use client";

import { motion } from "framer-motion";
import { GithubIcon } from "@/components/ui/icons";
import type { ProjectLink as ProjectLinkType } from "@/types";

export interface ProjectLinkProps {
  link: ProjectLinkType;
}

export function ProjectLink({ link }: ProjectLinkProps) {
  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md px-3 py-2 font-body text-base text-accent transition-colors duration-200 hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {link.icon === "arrow" && <span>🔗</span>}
      {link.icon === "github" && <GithubIcon className="size-4" />}
      <span>{link.label}</span>
    </motion.a>
  );
}
