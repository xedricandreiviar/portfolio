"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { FLOATING_ICONS_CONFIG } from "@/lib/animation-config";
import { TECH_ICON_PATHS } from "@/components/ui/tech-icons";

export interface FloatingIconConfig {
  id: string;
  icon: string;
  size: number;
  opacity: number;
  x: number;
  y: number;
  speed: number;
  direction: number;
  delay: number;
}

export interface FloatingIconsProps {
  iconCount?: number;
}

/**
 * Generates a single floating icon configuration with randomized values
 * within the spec-defined bounds. Exported for independent testing.
 *
 * @param index - The index used for deterministic icon selection
 * @param seed - A seed value for pseudo-random generation (0-1 range)
 */
export function generateIconConfig(index: number, seed: number): FloatingIconConfig {
  const {
    minSize,
    maxSize,
    minOpacity,
    maxOpacity,
    minSpeed,
    maxSpeed,
    technologies,
  } = FLOATING_ICONS_CONFIG;

  const icon = technologies[index % technologies.length];

  // Use seed to derive multiple pseudo-random values
  const sizeRand = ((seed * 9301 + 49297) % 233280) / 233280;
  const opacityRand = ((seed * 7919 + 15485863) % 982451653) / 982451653;
  const xRand = ((seed * 104729 + 6291469) % 15485863) / 15485863;
  const yRand = ((seed * 22695477 + 1) % 16777216) / 16777216;
  const speedRand = ((seed * 48271 + 11) % 2147483647) / 2147483647;
  const directionRand = ((seed * 16807 + 7) % 2147483647) / 2147483647;
  const delayRand = ((seed * 65539 + 3) % 2147483647) / 2147483647;

  const size = minSize + sizeRand * (maxSize - minSize);

  // Ensure icon stays within container: x + size(%) <= 100%
  // Convert size to approximate percentage (assume max container relevance)
  // Position as percentage, leaving room for icon size
  const maxSizePercent = (maxSize / 100) * 100; // worst case ~48%
  const safeMaxX = 100 - maxSizePercent;
  const safeMaxY = 100 - maxSizePercent;

  const x = xRand * Math.max(safeMaxX, 0);
  const y = yRand * Math.max(safeMaxY, 0);

  const opacity = minOpacity + opacityRand * (maxOpacity - minOpacity);
  const speed = minSpeed + speedRand * (maxSpeed - minSpeed);
  const direction = directionRand * 360;
  const delay = delayRand * 5; // 0-5s delay offset

  return {
    id: `floating-icon-${index}`,
    icon,
    size: Math.round(size),
    opacity: Math.round(opacity * 1000) / 1000,
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
    speed: Math.round(speed * 100) / 100,
    direction: Math.round(direction * 100) / 100,
    delay: Math.round(delay * 100) / 100,
  };
}

const DRIFT_KEYFRAMES = ["drift-1", "drift-2", "drift-3"];

export function FloatingIcons({
  iconCount = FLOATING_ICONS_CONFIG.defaultCount,
}: FloatingIconsProps) {
  const shouldReduceMotion = useReducedMotion();
  const isTouchDevice = useMediaQuery("(hover: none)");

  const effectiveCount = isTouchDevice
    ? Math.min(iconCount, FLOATING_ICONS_CONFIG.reducedCount)
    : iconCount;

  const icons = useMemo(() => {
    const configs: FloatingIconConfig[] = [];
    for (let i = 0; i < effectiveCount; i++) {
      // Generate a seed from the index for deterministic but varied results
      const seed = (i * 0.618033988749895 + 0.3) % 1;
      configs.push(generateIconConfig(i, seed));
    }
    return configs;
  }, [effectiveCount]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {icons.map((config) => {
        const keyframe = DRIFT_KEYFRAMES[parseInt(config.id.split("-")[2]) % DRIFT_KEYFRAMES.length];
        const duration = `${Math.round(30 / config.speed * 10) / 10}s`;

        return (
          <div
            key={config.id}
            className="absolute"
            style={{
              left: `${config.x}%`,
              top: `${config.y}%`,
              width: `${config.size}px`,
              height: `${config.size}px`,
              opacity: config.opacity,
              animation: shouldReduceMotion
                ? "none"
                : `${keyframe} ${duration} ease-in-out infinite`,
              animationDelay: shouldReduceMotion ? "0s" : `${config.delay}s`,
              willChange: shouldReduceMotion ? "auto" : "transform",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width={config.size}
              height={config.size}
              fill="currentColor"
              className="text-[var(--theme-text-primary)]"
            >
              <path d={TECH_ICON_PATHS[config.icon]} />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
