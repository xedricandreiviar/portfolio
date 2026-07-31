import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generateIconConfig } from "./FloatingIcons";

/**
 * Feature: portfolio-visual-enhancements, Property 2: Floating Icon Containment
 *
 * For any generated floating icon configuration and any container dimensions,
 * the icon's position plus its size SHALL not exceed the container boundaries,
 * ensuring no icon overflows outside the Hero section.
 *
 * **Validates: Requirements 1.6**
 */
describe("Feature: portfolio-visual-enhancements, Property 2: Floating Icon Containment", () => {
  it("no icon overflows container boundaries for arbitrary container dimensions and icon configs", () => {
    fc.assert(
      fc.property(
        // Generate arbitrary container dimensions (100-2000px)
        fc.integer({ min: 100, max: 2000 }),
        fc.integer({ min: 100, max: 2000 }),
        // Generate arbitrary index and seed for icon config
        fc.integer({ min: 0, max: 1000 }),
        fc.double({ min: 0, max: 1, noNaN: true, noDefaultInfinity: true }),
        (containerWidth, containerHeight, index, seed) => {
          const config = generateIconConfig(index, seed);

          // Convert percentage position to pixels
          const pixelX = (config.x / 100) * containerWidth;
          const pixelY = (config.y / 100) * containerHeight;

          // Assert no negative positions
          expect(config.x).toBeGreaterThanOrEqual(0);
          expect(config.y).toBeGreaterThanOrEqual(0);

          // Assert icon doesn't overflow right edge
          expect(pixelX + config.size).toBeLessThanOrEqual(containerWidth);

          // Assert icon doesn't overflow bottom edge
          expect(pixelY + config.size).toBeLessThanOrEqual(containerHeight);
        }
      ),
      { numRuns: 100 }
    );
  });
});
