import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import * as fs from "fs";
import * as path from "path";

/**
 * Property 4: GPU-Composited Animation Properties
 *
 * For any CSS keyframe animation defined for looping/indefinite use in the visual
 * enhancements, the animated properties SHALL be limited to `transform` and/or
 * `opacity` exclusively — no `width`, `height`, `top`, `left`, `margin`, or other
 * layout-triggering properties.
 *
 * **Validates: Requirements 9.2**
 */
describe("Feature: portfolio-visual-enhancements, Property 4: GPU-Composited Animation Properties", () => {
  // Allowed GPU-composited properties
  const ALLOWED_PROPERTIES = new Set(["transform", "opacity"]);

  // Parse all @keyframes blocks from globals.css
  function parseKeyframes(cssContent: string): { name: string; properties: string[] }[] {
    const keyframes: { name: string; properties: string[] }[] = [];
    // Match @keyframes blocks - capture name and body
    const keyframeRegex = /@keyframes\s+([\w-]+)\s*\{/g;
    let match: RegExpExecArray | null;

    while ((match = keyframeRegex.exec(cssContent)) !== null) {
      const name = match[1];
      const startIndex = match.index + match[0].length;

      // Find the matching closing brace by counting braces
      let braceCount = 1;
      let i = startIndex;
      while (i < cssContent.length && braceCount > 0) {
        if (cssContent[i] === "{") braceCount++;
        if (cssContent[i] === "}") braceCount--;
        i++;
      }

      const body = cssContent.slice(startIndex, i - 1);

      // Extract CSS property names from keyframe body
      // Properties are the left-hand side of declarations (before the colon)
      const properties: string[] = [];
      const propertyRegex = /(?:^|\{|;)\s*([\w-]+)\s*:/gm;
      let propMatch: RegExpExecArray | null;

      while ((propMatch = propertyRegex.exec(body)) !== null) {
        const prop = propMatch[1].trim();
        // Skip keyframe selectors that look like percentages or "from"/"to"
        if (prop && !properties.includes(prop)) {
          properties.push(prop);
        }
      }

      keyframes.push({ name, properties });
    }

    return keyframes;
  }

  // Load globals.css content
  const globalsPath = path.resolve(__dirname, "../app/globals.css");
  const cssContent = fs.readFileSync(globalsPath, "utf-8");
  const keyframes = parseKeyframes(cssContent);

  it("should find at least one @keyframes definition in globals.css", () => {
    expect(keyframes.length).toBeGreaterThan(0);
  });

  it("should only use transform and/or opacity in all @keyframes definitions", () => {
    for (const keyframe of keyframes) {
      for (const prop of keyframe.properties) {
        expect(
          ALLOWED_PROPERTIES.has(prop),
          `@keyframes ${keyframe.name} uses disallowed property "${prop}". Only "transform" and "opacity" are allowed for GPU-composited animations.`
        ).toBe(true);
      }
    }
  });

  it("should verify that arbitrary CSS property names outside the allowed set would be rejected (fast-check)", () => {
    // Layout-triggering properties that must NOT appear in keyframes
    const DISALLOWED_PROPERTIES = [
      "width", "height", "top", "left", "right", "bottom",
      "margin", "margin-top", "margin-bottom", "margin-left", "margin-right",
      "padding", "padding-top", "padding-bottom", "padding-left", "padding-right",
      "font-size", "line-height", "border-width", "display", "position",
      "min-width", "max-width", "min-height", "max-height",
    ];

    fc.assert(
      fc.property(
        fc.constantFrom(...DISALLOWED_PROPERTIES),
        (disallowedProp) => {
          // For each parsed keyframe, verify the disallowed property is NOT present
          for (const keyframe of keyframes) {
            expect(
              keyframe.properties.includes(disallowedProp),
              `@keyframes ${keyframe.name} must not contain layout-triggering property "${disallowedProp}"`
            ).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should verify all parsed keyframe properties are in the allowed set (fast-check)", () => {
    // Collect all unique properties from all keyframes
    const allProperties = keyframes.flatMap((kf) => kf.properties);

    // If there are properties, use fast-check to sample and verify them
    if (allProperties.length > 0) {
      fc.assert(
        fc.property(
          fc.constantFrom(...allProperties),
          (property) => {
            expect(
              ALLOWED_PROPERTIES.has(property),
              `Property "${property}" is not GPU-composited. Only "transform" and "opacity" are allowed.`
            ).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    }
  });
});
