# Implementation Plan: Portfolio Visual Enhancements

## Overview

Implement a series of visual enhancements for the portfolio site that add floating tech icons, hero visual depth, card hover effects, background dot patterns, section dividers, animated skill tags, profile image floating, and button/link glow effects. All animations respect `prefers-reduced-motion`, all decorative elements use `aria-hidden="true"`, and everything builds on the existing framer-motion + Tailwind CSS + CSS custom properties infrastructure.

## Tasks

- [x] 1. Set up shared configuration and utility hooks
  - [x] 1.1 Create animation configuration constants
    - Create `src/lib/animation-config.ts` with `FLOATING_ICONS_CONFIG`, `HERO_ANIMATION_CONFIG`, `CARD_HOVER_CONFIG`, and `BACKGROUND_PATTERN_CONFIG` constants as defined in the design document
    - _Requirements: 1.2, 1.4, 1.7, 2.1, 2.2, 3.4, 4.1_
  - [x] 1.2 Create `useMediaQuery` hook
    - Create `src/lib/hooks/useMediaQuery.ts` that accepts a CSS media query string and returns a boolean
    - Handle SSR by defaulting to `false` until hydration
    - Used for detecting `(hover: none)` and touch devices
    - _Requirements: 3.7, 9.4_
  - [x] 1.3 Create technology icon SVG map
    - Create `src/components/ui/tech-icons.ts` with inline SVG path data for: PHP, MySQL, JavaScript, TypeScript, Next.js, NestJS, Tailwind CSS, PostgreSQL, JWT, REST API
    - Export a `TECH_ICON_PATHS` record mapping technology name to SVG path string
    - _Requirements: 1.3_

- [x] 2. Implement global CSS enhancements
  - [x] 2.1 Add background dot pattern to `globals.css`
    - Add a `radial-gradient` repeating dot pattern on `body` using `var(--theme-border)` at 0.4 opacity
    - Dots: 1.5px diameter, 24px spacing
    - Declare solid `background-color` fallback before the `background-image` gradient
    - Pattern auto-updates on theme switch via CSS custom properties
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [x] 2.2 Add CSS keyframe animations to `globals.css`
    - Add `@keyframes float` for profile image (4px amplitude, 3s cycle, ease-in-out)
    - Add `@keyframes drift` variants for floating icons (continuous translate movement)
    - Add glow utility classes (`.glow-button`, `.glow-social`) using `box-shadow` with `var(--theme-accent)`
    - Ensure the existing `prefers-reduced-motion` block neutralizes these keyframes
    - _Requirements: 7.1, 7.2, 9.2, 9.5_

- [x] 3. Implement SectionDivider component and wire into page
  - [x] 3.1 Create `SectionDivider` component
    - Create `src/components/ui/SectionDivider.tsx`
    - Render a `<div>` with `aria-hidden="true"`, height 1px, full-width horizontal gradient: transparent → accent → transparent
    - Use `var(--theme-accent)` so color updates with theme
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [x] 3.2 Insert SectionDividers into `page.tsx`
    - Import `SectionDivider` and insert between Hero/Projects, Projects/About, About/Skills, and Skills/Contact (4 total)
    - _Requirements: 5.1_

- [x] 4. Implement FloatingIcons component
  - [x] 4.1 Create `FloatingIcons` component
    - Create `src/components/ui/FloatingIcons.tsx` as a client component
    - Generate icon configurations with randomized position, speed (10–30 px/s), opacity (0.08–0.20), and size (24–48px)
    - Render inline SVGs from `TECH_ICON_PATHS` in a `position: absolute` container with `aria-hidden="true"`
    - Use CSS keyframe `drift` animation for continuous movement (GPU-composited `transform`)
    - Use `useReducedMotion()` from framer-motion to render static positions when reduced motion is active
    - Use `useMediaQuery('(hover: none)')` to cap icon count at 4 on touch devices
    - Confine icons within container boundaries (no overflow)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 9.2, 9.3, 9.4_
  - [x] 4.2 Write property test for floating icon configuration bounds
    - **Property 1: Floating Icon Configuration Bounds**
    - Generate arbitrary seed/index values, call the icon config generator, assert speed ∈ [10,30], opacity ∈ [0.08,0.20], size ∈ [24,48]
    - **Validates: Requirements 1.2, 1.4, 1.7**
  - [x] 4.3 Write property test for floating icon containment
    - **Property 2: Floating Icon Containment**
    - Generate arbitrary container dimensions (100–2000px) and icon configs, assert no icon overflows container boundaries
    - **Validates: Requirements 1.6**

- [x] 5. Enhance Hero section with visual depth
  - [x] 5.1 Convert Hero.tsx to client component with visual enhancements
    - Add `"use client"` directive to `Hero.tsx`
    - Add `FloatingIcons` component in a background layer (lower z-index)
    - Add radial gradient backdrop behind profile image (accent color, 25% opacity, 1.75× diameter)
    - Add pulsing glow element behind profile image (3.5s cycle, 10–40% opacity, using framer-motion `animate`)
    - Add gradient border ring on profile image container (3px accent border)
    - Add floating animation to profile image container using CSS `float` keyframe (4px amplitude, 3s)
    - Wrap text content in framer-motion stagger animation (100ms delay per child, total ≤800ms)
    - All animated elements respect `prefers-reduced-motion` via `useReducedMotion()`
    - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4, 2.5, 7.1, 7.2, 7.3, 7.4_
  - [x] 5.2 Write property test for stagger delay cap
    - **Property 3: Stagger Delay Cap**
    - Generate arbitrary positive numbers, pass through the stagger delay capping logic, assert result ≤ 0.1
    - **Validates: Requirements 6.2**

- [x] 6. Implement card hover effects
  - [x] 6.1 Update ProjectCard.tsx with CSS hover transitions
    - Replace framer-motion `whileHover={{ y: -2 }}` with CSS transition classes
    - Add: `transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:border-accent`
    - Wrap hover styles in `@media (hover: hover)` via Tailwind's `hover:` variant
    - Reduced motion: instant border-color change only (no translate, no shadow)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_
  - [x] 6.2 Update CaseStudyCard.tsx with CSS hover transitions
    - Add same hover treatment as ProjectCard: `transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:border-accent`
    - Wrap hover styles in `@media (hover: hover)` via Tailwind's `hover:` variant
    - Reduced motion: instant border-color change only
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [x] 7. Implement animated skill tags
  - [x] 7.1 Update Skills.tsx and SkillCategory.tsx with scroll-reveal animations
    - Convert `SkillCategory.tsx` to a client component (add `"use client"`)
    - Wrap each `SkillCategory` in `ScrollReveal` with `animation="fade-up"` and threshold 0.2
    - Wrap skill items `<ul>` in `StaggerContainer` with `staggerDelay={0.08}`
    - Wrap each skill `<li>` in `StaggerItem`
    - Animations trigger once per page load; reduced motion renders all items immediately
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 8. Implement button and link glow effects
  - [x] 8.1 Add glow effect to Button.tsx
    - Add hover glow via CSS `box-shadow`: `hover:shadow-[0_0_12px_2px_var(--theme-accent)]` at ~0.4 opacity
    - Use CSS transition (250ms ease-out) for smooth appearance/disappearance
    - Reduced motion: background/border change only, no box-shadow transition
    - _Requirements: 8.1, 8.3, 8.4_
  - [x] 8.2 Add glow effect to SocialIconButton.tsx
    - Add hover glow via CSS `box-shadow`: `hover:shadow-[0_0_10px_0px_var(--theme-accent)]` at ~0.3 opacity
    - Use CSS transition (250ms ease-out)
    - Reduced motion: background color change only, no box-shadow
    - _Requirements: 8.2, 8.3, 8.4_

- [x] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Accessibility and performance verification
  - [x] 10.1 Write property test for GPU-composited animation properties
    - **Property 4: GPU-Composited Animation Properties**
    - Parse all `@keyframes` definitions in globals.css, assert only `transform` and/or `opacity` properties are animated
    - **Validates: Requirements 9.2**
  - [x] 10.2 Write property test for decorative elements accessibility
    - **Property 5: Decorative Elements Accessibility**
    - Render each decorative component (FloatingIcons, SectionDivider, glow elements), assert `aria-hidden="true"` is present on container
    - **Validates: Requirements 9.3**
  - [x] 10.3 Write property test for reduced motion disabling looping animations
    - **Property 6: Reduced Motion Disables Looping Animations**
    - For each animated component, render with `useReducedMotion` returning `true`, assert no animation styles/classes applied
    - **Validates: Requirements 1.5, 2.5, 3.6, 6.3, 7.3, 8.4, 9.5**

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All CSS animations use `transform` and `opacity` only for GPU compositing
- The existing `prefers-reduced-motion` block in `globals.css` already neutralizes CSS animations; framer-motion animations use `useReducedMotion()` hook
- `ScrollReveal` and `StaggerContainer` already exist and handle reduced motion internally
- vitest + fast-check are already installed and configured

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "2.1", "2.2"] },
    { "id": 1, "tasks": ["3.1", "4.1"] },
    { "id": 2, "tasks": ["3.2", "4.2", "4.3", "5.1"] },
    { "id": 3, "tasks": ["5.2", "6.1", "6.2", "7.1"] },
    { "id": 4, "tasks": ["8.1", "8.2"] },
    { "id": 5, "tasks": ["10.1", "10.2", "10.3"] }
  ]
}
```
