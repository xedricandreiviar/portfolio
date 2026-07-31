"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { HERO_ANIMATION_CONFIG } from "@/lib/animation-config";
import { FloatingIcons } from "@/components/ui/FloatingIcons";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const {
    staggerDelay,
    glowPulseDuration,
    glowMinOpacity,
    glowMaxOpacity,
    gradientDiameter,
    gradientOpacity,
    borderWidth,
    floatDuration,
  } = HERO_ANIMATION_CONFIG;

  // Stagger container variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
      },
    },
  };

  // Child variants for staggered fade-up
  const childVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" as const },
        },
      };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] flex-col items-center justify-center px-4 py-16 md:px-8 lg:flex-row lg:gap-16 lg:py-24"
    >
      {/* Floating icons background layer */}
      <FloatingIcons />

      {/* Text content with stagger animation */}
      <motion.div
        className="relative z-10 flex flex-1 flex-col gap-6 text-center lg:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants}>
          <h1
            id="hero-heading"
            className="text-h1 font-bold leading-tight text-text-primary"
          >
            {SITE_CONFIG.name}
          </h1>
          <p className="mt-2 text-xl font-medium text-accent">
            {SITE_CONFIG.roleDescriptor}
          </p>
        </motion.div>

        <motion.p
          variants={childVariants}
          className="max-w-xl text-lg leading-relaxed text-text-secondary lg:max-w-lg"
        >
          {SITE_CONFIG.valueProposition}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={childVariants}
          className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
        >
          <a
            href="#projects"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border-2 border-accent px-6 py-3 text-base font-semibold text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Profile image with visual enhancements */}
      <div className="relative z-10 mt-12 flex-shrink-0 lg:mt-0">
        {/* Radial gradient backdrop - 1.75× diameter, accent color at 25% opacity */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${gradientDiameter * 100}%`,
            height: `${gradientDiameter * 100}%`,
            background: `radial-gradient(circle, color-mix(in srgb, var(--theme-accent) ${gradientOpacity * 100}%, transparent) 0%, transparent 70%)`,
          }}
        />

        {/* Pulsing glow element */}
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${gradientDiameter * 100}%`,
            height: `${gradientDiameter * 100}%`,
            background: `radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)`,
          }}
          animate={
            shouldReduceMotion
              ? { opacity: glowMaxOpacity }
              : {
                  opacity: [glowMinOpacity, glowMaxOpacity, glowMinOpacity],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: glowPulseDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />

        {/* Profile image container with gradient border ring and floating animation */}
        <div
          className="relative rounded-full"
          style={{
            padding: `${borderWidth}px`,
            background: `linear-gradient(135deg, var(--theme-accent), color-mix(in srgb, var(--theme-accent) 60%, transparent))`,
            animation: shouldReduceMotion
              ? "none"
              : `float ${floatDuration}s ease-in-out infinite`,
          }}
        >
          <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full md:h-[280px] md:w-[280px] lg:h-[320px] lg:w-[320px]">
            <Image
              src="/images/profile.png"
              alt="Xedric Andrei Viar - Full-Stack Web Developer"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 200px, (max-width: 1024px) 280px, 320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
