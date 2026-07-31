import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generateIconConfig } from "@/components/ui/FloatingIcons";

/**
 * Property 1: Floating Icon Configuration Bounds
 *
 * For any generated floating icon configuration object, the speed value SHALL be
 * within [10, 30] px/s, the opacity SHALL be within [0.08, 0.20], and the size
 * SHALL be within [24, 48] px.
 *
 * **Validates: Requirements 1.2, 1.4, 1.7**
 */
describe("Feature: portfolio-visual-enhancements, Property 1: Floating Icon Configuration Bounds", () => {
  it("should generate speed within [10, 30], opacity within [0.08, 0.20], and size within [24, 48] for arbitrary index and seed values", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1000 }),
        fc.double({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true }),
        (index, seed) => {
          const config = generateIconConfig(index, seed);

          // Speed must be in [10, 30]
          expect(config.speed).toBeGreaterThanOrEqual(10);
          expect(config.speed).toBeLessThanOrEqual(30);

          // Opacity must be in [0.08, 0.20]
          expect(config.opacity).toBeGreaterThanOrEqual(0.08);
          expect(config.opacity).toBeLessThanOrEqual(0.20);

          // Size must be in [24, 48]
          expect(config.size).toBeGreaterThanOrEqual(24);
          expect(config.size).toBeLessThanOrEqual(48);
        }
      ),
      { numRuns: 100 }
    );
  });
});
