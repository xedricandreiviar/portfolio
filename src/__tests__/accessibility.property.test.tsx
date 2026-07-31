import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import { render } from "@testing-library/react";
import React from "react";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  useReducedMotion: () => false,
}));

// Mock useMediaQuery hook
vi.mock("@/lib/hooks/useMediaQuery", () => ({
  useMediaQuery: () => false,
}));

import { FloatingIcons } from "@/components/ui/FloatingIcons";
import { SectionDivider } from "@/components/ui/SectionDivider";

/**
 * Property 5: Decorative Elements Accessibility
 *
 * For any decorative visual element rendered by the enhancement components
 * (floating icons container, section dividers), the element SHALL have
 * `aria-hidden="true"` set so that screen readers do not announce it.
 *
 * **Validates: Requirements 9.3**
 */
describe("Feature: portfolio-visual-enhancements, Property 5: Decorative Elements Accessibility", () => {
  it("FloatingIcons container has aria-hidden='true' for any iconCount", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }),
        (iconCount) => {
          const { container } = render(<FloatingIcons iconCount={iconCount} />);
          const decorativeContainer = container.firstElementChild;

          expect(decorativeContainer).toHaveAttribute("aria-hidden", "true");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("SectionDivider has aria-hidden='true' for every render", () => {
    fc.assert(
      fc.property(
        // Use arbitrary constant to drive 100+ iterations (SectionDivider has no props)
        fc.integer({ min: 0, max: 1000 }),
        () => {
          const { container } = render(<SectionDivider />);
          const decorativeElement = container.firstElementChild;

          expect(decorativeElement).toHaveAttribute("aria-hidden", "true");
        }
      ),
      { numRuns: 100 }
    );
  });
});
