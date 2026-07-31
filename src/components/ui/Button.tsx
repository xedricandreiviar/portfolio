"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  label: string;
  variant?: "primary" | "submit";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export function Button({
  label,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  const baseClasses = cn(
    "pixel-btn inline-flex items-center justify-center font-display text-[10px] uppercase tracking-wide transition-all duration-250 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "hover:shadow-[0_0_12px_2px_var(--theme-accent)] motion-reduce:hover:shadow-none motion-reduce:transition-none",
    variant === "primary" && "bg-accent px-6 py-3 text-text-dark hover:brightness-110",
    variant === "submit" && "bg-xp-green px-6 py-3 text-text-dark hover:brightness-110",
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {label}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseClasses}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {label}
    </motion.button>
  );
}
