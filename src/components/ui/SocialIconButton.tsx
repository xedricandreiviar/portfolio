"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/ui/icons";

export interface SocialIconButtonProps {
  icon: "linkedin" | "github" | "twitter" | "instagram";
  href: string;
  size?: "sm" | "md";
  className?: string;
}

const iconMap = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
};

const platformColors = {
  linkedin: "#0077b5",
  github: "#6e40c9",
  twitter: "#1da1f2",
  instagram: "#e4405f",
};

export function SocialIconButton({
  icon,
  href,
  size = "md",
  className,
}: SocialIconButtonProps) {
  const Icon = iconMap[icon];
  const color = platformColors[icon];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${icon} profile`}
      className={cn(
        "flex items-center justify-center rounded-md bg-bg-card transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        size === "md" && "size-12",
        size === "sm" && "size-8",
        className
      )}
      whileHover={{
        scale: 1.05,
        backgroundColor: color,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <Icon
        className={cn(
          "text-text-primary transition-colors",
          size === "md" && "size-5",
          size === "sm" && "size-4"
        )}
      />
    </motion.a>
  );
}
