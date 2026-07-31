export const FLOATING_ICONS_CONFIG = {
  defaultCount: 8,
  reducedCount: 4,
  minSize: 24,
  maxSize: 48,
  minOpacity: 0.08,
  maxOpacity: 0.20,
  minSpeed: 10,
  maxSpeed: 30,
  technologies: [
    "PHP", "MySQL", "JavaScript", "TypeScript",
    "Next.js", "NestJS", "Tailwind CSS", "PostgreSQL",
    "JWT", "REST API"
  ],
} as const;

export const HERO_ANIMATION_CONFIG = {
  staggerDelay: 0.1,
  totalDuration: 0.8,
  glowPulseDuration: 3.5,
  glowMinOpacity: 0.1,
  glowMaxOpacity: 0.4,
  floatAmplitude: 4,
  floatDuration: 3,
  gradientDiameter: 1.75,
  gradientOpacity: 0.25,
  borderWidth: 3,
} as const;

export const CARD_HOVER_CONFIG = {
  translateY: -2,
  shadowBlur: 16,
  shadowOffset: 6,
  shadowOpacity: 0.12,
  transitionDuration: 250,
} as const;

export const BACKGROUND_PATTERN_CONFIG = {
  dotSize: 1.5,
  dotSpacing: 24,
  dotOpacity: 0.4,
} as const;
