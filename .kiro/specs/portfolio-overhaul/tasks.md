# Implementation Plan: Portfolio Overhaul

## Overview

Transform the RPG-themed portfolio into a recruiter-optimized professional site. The implementation retains the Next.js 16 App Router + TypeScript + Tailwind CSS v4 stack, replaces all fantasy UI (gates, pixel borders, game stats) with a clean design system, and restructures content around case studies and evidence-based skill presentation. The work is organized into foundational cleanup, design system, section-by-section rebuilds, and testing.

## Tasks

- [x] 1. Foundation: Types, Data Models, and Design Tokens
  - [x] 1.1 Update TypeScript interfaces and type definitions
    - Replace all types in `src/types/index.ts` with the new interfaces: `NavLink`, `ProjectLink`, `Project`, `FlagshipProject`, `SkillEntry`, `SkillCategory`, `ContactLink`, `SocialLink`, `SiteConfig`
    - Remove any RPG-related types (gate levels, XP, character stats)
    - _Requirements: 3.2, 5.1, 5.2, 6.1, 6.2, 6.3_

  - [x] 1.2 Rewrite data constants with professional content
    - Rewrite `src/lib/constants.ts` with: `SITE_CONFIG`, `NAV_LINKS`, `FLAGSHIP_PROJECTS`, `PROJECTS`, `SKILLS`, `CONTACT_LINKS`
    - Populate `SITE_CONFIG` with role descriptor (≤60 chars), value proposition (≤2 sentences), about bio (≤600 chars, ≤4 sentences)
    - Add Xiron and Coffee Chapters as flagship projects with problem statements, technical challenges, and highlights
    - Add Gym Management SaaS and Daily Money Tracker as standard projects
    - Structure skills with project associations per category
    - Remove all RPG-themed data (guild history, tavern board, XP values, levels)
    - _Requirements: 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.4, 6.1, 6.2, 6.3_

  - [x] 1.3 Overhaul globals.css with professional design tokens
    - Replace RPG theme CSS (pixel-art borders, retro fonts, scanlines) with the professional design system
    - Define CSS custom properties for color palette (light/dark), type scale (4 body + 2 heading sizes), and spacing scale (4px base)
    - Set font-family to Inter/Geist/system-ui sans-serif
    - Add `scroll-behavior: smooth` to html
    - Add `prefers-reduced-motion` media query that sets animation/transition durations to 0.01ms
    - Ensure accent color achieves 4.5:1 contrast ratio in both themes
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 9.3_

- [x] 2. Remove RPG Components and Clean Up
  - [x] 2.1 Delete RPG-specific component files
    - Delete `src/components/ui/DungeonGate.tsx`, `src/components/ui/LevelGate.tsx`, `src/components/ui/GateContext.tsx`
    - Delete `src/components/ui/SectionDivider.tsx`, `src/components/ui/ParallaxFloat.tsx`
    - Delete `src/components/sections/GuildHistory.tsx`, `src/components/sections/TavernBoard.tsx`
    - Remove `src/components/ui/SkillChip.tsx` (replaced by project-associated skill display)
    - _Requirements: 12.1, 12.2, 12.5_

  - [x] 2.2 Rewrite page.tsx as a Server Component
    - Remove `"use client"` directive from `src/app/page.tsx`
    - Remove all RPG component imports (DungeonGate, LevelGate, GateProvider, SectionDivider, GuildHistory, TavernBoard)
    - Restructure page to render: Navbar → Hero → Projects → About → Skills → Contact → Footer
    - Add proper section `id` attributes for anchor navigation
    - _Requirements: 1.1, 1.2, 1.4, 10.1, 12.1, 12.2_

- [x] 3. Checkpoint - Verify build compiles
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Layout and Navigation
  - [x] 4.1 Rebuild Navbar component
    - Restyle with professional design tokens (remove pixel borders, RPG labels)
    - Implement fixed positioning at viewport top
    - Update navigation links to: Projects, About, Skills, Contact
    - Implement active section highlighting using Intersection Observer
    - Add mobile hamburger menu with `aria-expanded`, accessible label, and 44×44px touch targets
    - Ensure smooth-scroll on link click (within 1000ms)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 8.3, 8.7_

  - [x] 4.2 Simplify Footer component
    - Replace RPG-themed footer with copyright text + social links
    - Render social links with `target="_blank"` and `rel="noopener noreferrer"`
    - Ensure external links open in new tab
    - _Requirements: 6.7, 12.3, 12.6_

- [x] 5. Hero Section
  - [x] 5.1 Rewrite Hero component for recruiter optimization
    - Render developer name in `<h1>`, role descriptor (≤60 chars), and value proposition (≤2 sentences)
    - Add primary CTA (filled button → Projects section) and secondary CTA (outlined button → Contact section)
    - Display profile image with `next/image`, min 150×150px, descriptive alt text
    - Ensure name, role, and primary CTA visible above fold on ≥768px viewports
    - Remove all RPG terminology, game stats, level bars, character sheet framing
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 1.1_

- [x] 6. Projects Section
  - [x] 6.1 Create CaseStudyCard component
    - Create `src/components/cards/CaseStudyCard.tsx`
    - Render: project title, problem statement (1–3 sentences), tech stack (3–8 items), technical challenge (1–2 sentences), technical highlights, live demo link, conditional GitHub link
    - Use `next/image` for project screenshot with 16:9 aspect ratio on mobile, placeholder fallback on error
    - Ensure card occupies ≥50% more vertical space than standard ProjectCard
    - Add `target="_blank"` and `rel="noopener noreferrer"` on external links
    - Reserve image space to prevent layout shift
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.7, 3.8, 3.9, 13.1, 13.2, 13.3, 13.4, 13.5_

  - [x] 6.2 Revise ProjectCard component for standard projects
    - Update `src/components/cards/ProjectCard.tsx` to render from new `Project` interface
    - Display title, description, tech stack, status badge ("In Progress"), and links
    - Use `next/image` with fallback placeholder
    - Add descriptive alt text including project title
    - _Requirements: 3.5, 3.6, 13.3, 13.4_

  - [x] 6.3 Build Projects section (FeaturedProjects replacement)
    - Replace `src/components/sections/FeaturedProjects.tsx` with a new Projects section
    - Render flagship projects first (Xiron, Coffee Chapters) using CaseStudyCard
    - Render standard projects (Gym Management SaaS, Daily Money Tracker) using ProjectCard
    - Ensure no fabricated metrics, testimonials, or fake user counts
    - _Requirements: 3.1, 3.5, 3.6, 3.7_

  - [ ]* 6.4 Write property test: Case Study Card Completeness
    - **Property 1: Case Study Card Completeness**
    - Generate random valid `FlagshipProject` objects, render `CaseStudyCard`, assert all required fields present and conditional GitHub link logic correct
    - **Validates: Requirements 3.2, 3.9**

  - [ ]* 6.5 Write property test: External Links Open in New Tab
    - **Property 2: External Links Open in New Tab**
    - Collect all rendered `<a>` elements with external hrefs, assert `target="_blank"` and `rel="noopener noreferrer"` present
    - **Validates: Requirements 3.8, 6.7**

  - [ ]* 6.6 Write property test: Image Alt Text Includes Project Title
    - **Property 8: Image Alt Text Includes Project Title**
    - Generate project data, render cards, assert `alt` attribute contains the project title string
    - **Validates: Requirements 13.3**

- [x] 7. Checkpoint - Verify projects section renders correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. About Section
  - [x] 8.1 Rewrite About component
    - Replace RPG "Character Bio" with a professional about section
    - Render bio from `SITE_CONFIG.aboutBio` (≤600 chars, ≤4 sentences)
    - Reference at least 2 named projects (Xiron, Coffee Chapters) as evidence
    - Display education and location
    - Remove all RPG framing, game-stat panels, skill trees, subjective self-descriptors without evidence
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 9. Skills Section
  - [x] 9.1 Create SkillCategory component
    - Create `src/components/sections/SkillCategory.tsx`
    - Render category heading and list of skills with their associated project names visible
    - Format as "Skill — Project1, Project2" or similar clear association display
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 9.2 Build Skills section page component
    - Create `src/components/sections/Skills.tsx`
    - Render all skill categories from `SKILLS` constant using `SkillCategory`
    - Only display skills that map to at least one featured project
    - Omit skills with no project association
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 9.3 Write property test: Skill-Project Association Display
    - **Property 3: Skill-Project Association Display**
    - Generate skill data, render `SkillCategory`, assert project names are visible in output
    - **Validates: Requirements 5.2**

  - [ ]* 9.4 Write property test: Skills Only From Featured Projects
    - **Property 4: Skills Only From Featured Projects**
    - Assert every rendered skill maps to an existing project in `FLAGSHIP_PROJECTS` or `PROJECTS`
    - **Validates: Requirements 5.4, 5.5**

- [x] 10. Contact Section
  - [x] 10.1 Create ContactLinks component and Contact section
    - Create `src/components/sections/ContactLinks.tsx`
    - Render GitHub, LinkedIn, and email links with correct `target`, `rel`, and `mailto:` protocols
    - Conditionally render resume download link (omit if PDF doesn't exist)
    - Ensure section is reachable via Hero CTA anchor navigation
    - Replace existing `ContactForm.tsx` with the new Contact section or adapt it
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ]* 10.2 Write property test: Social Link URL Validity
    - **Property 6: Social Link URL Validity**
    - Generate social link arrays, assert rendered links have user-specific paths beyond domain root
    - **Validates: Requirements 12.3, 12.6**

- [x] 11. Checkpoint - Full page renders end-to-end
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. SEO and Metadata
  - [x] 12.1 Update layout.tsx metadata and JSON-LD
    - Set HTML title containing "Xedric Andrei Viar" and "Full-Stack Developer" (≤60 chars)
    - Add Open Graph meta tags: og:title, og:description, og:image, og:type, og:url
    - Add meta description (50–160 chars) with role, location, and named project
    - Add JSON-LD script with schema.org "Person" type containing name and jobTitle
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [x] 13. Responsive Layout and Mobile Polish
  - [x] 13.1 Ensure mobile responsiveness across all sections
    - Verify all text ≥16px on 320px–1440px viewports
    - Stack layout elements vertically below 768px
    - Ensure no horizontal scrolling on any viewport 320px–1440px
    - Scale images to fit parent container width on mobile
    - Ensure interactive elements have 44×44px touch targets
    - Add expand control on CaseStudyCard descriptions >120 chars on mobile
    - _Requirements: 8.1, 8.2, 8.4, 8.5, 8.6, 8.7_

- [x] 14. Motion and Animation Polish
  - [x] 14.1 Update ScrollReveal and animation system
    - Revise `src/components/ui/ScrollReveal.tsx` for intersection-observer fade-in, max 600ms
    - Remove any stagger delays exceeding 300ms cumulative
    - Ensure hover interactions ≤200ms
    - Verify `prefers-reduced-motion` disables all animations
    - Remove parallax, carousels, and infinite loops
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 15. Testing Setup and Property Tests
  - [x] 15.1 Set up Vitest and React Testing Library
    - Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `fast-check` as dev dependencies
    - Create `vitest.config.ts` with jsdom environment and path aliases
    - Create test setup file for React Testing Library matchers
    - _Requirements: (testing infrastructure)_

  - [ ]* 15.2 Write property test: Color Contrast Compliance
    - **Property 5: Color Contrast Compliance**
    - Compute contrast ratios for all accent/background color combinations from both themes
    - Assert all combinations achieve ≥4.5:1 ratio per WCAG 2.1 AA
    - **Validates: Requirements 7.2**

  - [ ]* 15.3 Write unit tests for Hero section
    - Verify h1 content, role descriptor ≤60 chars, CTAs present, no RPG terminology
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.7_

  - [ ]* 15.4 Write unit tests for About section
    - Verify bio ≤600 chars, ≤4 sentences, references 2+ projects, no subjective descriptors without evidence
    - _Requirements: 4.1, 4.2, 4.5, 4.7_

- [x] 16. Final Checkpoint - Full build and verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document using `fast-check`
- Unit tests validate specific examples and edge cases
- The project uses Next.js 16 + TypeScript + Tailwind CSS v4 — all implementations should use these
- Framer Motion is retained for scroll reveals and hover micro-interactions only
- `next/image` must be used for all project images (WebP optimization, lazy loading, layout shift prevention)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.3"] },
    { "id": 1, "tasks": ["1.2"] },
    { "id": 2, "tasks": ["2.1", "2.2"] },
    { "id": 3, "tasks": ["4.1", "4.2", "5.1"] },
    { "id": 4, "tasks": ["6.1", "6.2", "8.1", "9.1", "10.1"] },
    { "id": 5, "tasks": ["6.3", "9.2", "12.1"] },
    { "id": 6, "tasks": ["6.4", "6.5", "6.6", "9.3", "9.4", "10.2"] },
    { "id": 7, "tasks": ["13.1", "14.1", "15.1"] },
    { "id": 8, "tasks": ["15.2", "15.3", "15.4"] }
  ]
}
```
