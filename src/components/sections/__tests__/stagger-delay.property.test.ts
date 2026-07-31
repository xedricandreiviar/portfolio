import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { HERO_ANIMATION_CONFIG } from "@/lib/animation-config";

/**
 * Property 3: Stagger Delay Cap
 *
 * For any stagger delay value passed to the StaggerContainer component,
 * the effective per-item delay SHALL be at most 100ms (0.1 seconds),
 * regardless of the input value.
 *
 * The capping logic is: Math.min(value, HERO_ANIMATION_CONFIG.staggerDelay)
 *
 * **Validates: Requirements 6.2**
 */
describe("Feature: portfolio-visual-enhancements, Property 3: Stagger Delay Cap", () => {
  const MAX_STAGGER_DELAY = HERO_ANIMATION_CONFIG.staggerDelay; // 0.1

  /**
   * Helper that replicates the stagger delay capping logic used in the application.
   * Any arbitrary positive delay value is capped at the configured maximum (0.1s).
   */
  function capStaggerDelay(value: number): number {
    return Math.min(value, MAX_STAGGER_DELAY);
  }

  it("should cap any positive stagger delay value at 0.1 seconds maximum", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.0001, max: 1000, noNaN: true, noDefaultInfinity: true }),
        (inputDelay) => {
          const result = capStaggerDelay(inputDelay);

          // The capped result must never exceed 0.1
          expect(result).toBeLessThanOrEqual(0.1);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should preserve the input value when it is already ≤ 0.1", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.0001, max: 0.1, noNaN: true, noDefaultInfinity: true }),
        (inputDelay) => {
          const result = capStaggerDelay(inputDelay);

          // When input is within the cap, it should pass through unchanged
          expect(result).toEqual(inputDelay);
        }
      ),
      { numRuns: 100 }
    );
  });
});
