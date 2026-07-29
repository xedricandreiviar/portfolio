# Requirements Document

## Introduction

This specification defines the overhaul of Xedric Andrei Viar's developer portfolio website (kiro_week2) from a fantasy/RPG-themed site into a recruiter-optimized portfolio. The redesign prioritizes a 90-second recruiter evaluation lens: flagship production projects front and center, clear technical credibility signals, fast load times, and zero friction to reach live demos or contact information. The existing Next.js App Router + TypeScript + Tailwind CSS stack is retained.

## Glossary

- **Portfolio_Site**: The Next.js application in kiro_week2 serving as Xedric's developer portfolio
- **Recruiter**: A hiring manager, technical recruiter, or potential client evaluating the portfolio
- **Case_Study_Card**: A detailed project presentation component showing problem, stack, technical challenge, and links
- **Hero_Section**: The first visible viewport of the page, above the fold
- **About_Section**: A concise biographical section establishing credibility
- **Skills_Section**: A section displaying technical skills organized by demonstrated usage in projects
- **Projects_Section**: The primary section showcasing production work as case studies
- **Contact_Section**: A section providing GitHub, email, and resume access
- **Accent_Color**: The single primary brand color used consistently across the design system
- **Viewport**: The visible area of the browser window on the user's device
- **LCP**: Largest Contentful Paint, a Core Web Vital measuring perceived load speed
- **CTA**: Call-to-action element (button or link) prompting user interaction

## Requirements

### Requirement 1: Remove Forced Intro Animation

**User Story:** As a recruiter, I want to see portfolio content immediately on page load, so that I do not waste evaluation time on an interactive gate.

#### Acceptance Criteria

1. WHEN the Portfolio_Site loads, THE Hero_Section SHALL render its heading text and profile image within the initial Viewport without requiring user interaction, with no element obscured by overlays or gates
2. THE Portfolio_Site SHALL NOT display any full-viewport overlay, gate, or modal with a z-index above page content that intercepts pointer events or obscures content on initial load
3. WHEN the page loads, THE Portfolio_Site SHALL achieve a Largest Contentful Paint under 2.5 seconds on a simulated 4G connection using Lighthouse Mobile throttling (1.6 Mbps throughput, 150 ms TCP RTT)
4. WHEN the Portfolio_Site loads, THE Portfolio_Site SHALL render all page sections (Hero, Projects, About, Skills, Contact) in a scrollable document without requiring click-to-unlock or button-press interaction to reveal any section

### Requirement 2: Recruiter-Optimized Hero Section

**User Story:** As a recruiter, I want to immediately understand who this developer is and what they build, so that I can decide within seconds whether to keep reading.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the developer name "Xedric Andrei Viar" as the primary heading using a single `<h1>` element
2. THE Hero_Section SHALL display a one-line role descriptor (maximum 60 characters) identifying the developer as a full-stack web developer
3. THE Hero_Section SHALL display a concise value proposition (maximum 2 sentences) referencing shipped production applications
4. THE Hero_Section SHALL contain a primary CTA linking to the Projects_Section, rendered as a filled/solid button visually distinct from the secondary CTA
5. THE Hero_Section SHALL contain a secondary CTA linking to the Contact_Section, rendered as an outlined or text-style button visually subordinate to the primary CTA
6. THE Hero_Section SHALL display the developer profile image with a minimum rendered size of 150×150 pixels, containing a face or professional likeness, and including descriptive alt text
7. THE Hero_Section SHALL NOT use RPG terminology, game stats, level bars, or character sheet framing
8. THE Hero_Section SHALL display the developer name, role descriptor, and primary CTA within the initial viewport (without scrolling) on viewports 768px wide and above

### Requirement 3: Flagship Project Case Studies

**User Story:** As a recruiter, I want to see detailed case studies of production projects, so that I can evaluate technical depth and real-world problem-solving ability.

#### Acceptance Criteria

1. THE Projects_Section SHALL render Xiron and Coffee Chapters as the first two projects in the list, each displayed in a Case_Study_Card component that is visually distinct from other project cards by occupying at least 50% more vertical space than non-flagship project cards
2. WHEN a Case_Study_Card renders, THE Case_Study_Card SHALL display: the project name, a problem statement of 1 to 3 sentences describing what user problem the project solves, the technology stack as a list of 3 to 8 named technologies, one specific hard technical challenge solved described in 1 to 2 sentences, a live demo link, and a GitHub repository link if the project has a public repository
3. THE Case_Study_Card for Xiron SHALL reference offline-first sync, JWT authentication, and PWA capabilities as technical highlights
4. THE Case_Study_Card for Coffee Chapters SHALL reference BIR-compliant VAT calculation, GCash/Maya payment integration, and multi-page architecture as technical highlights
5. THE Projects_Section SHALL display a Gym Management SaaS project card positioned immediately after the two flagship Case_Study_Cards, showing its technology stack (NestJS, Next.js, TypeORM, PostgreSQL, Turborepo) with a visible tag or label indicating multi-stack capability
6. THE Projects_Section SHALL display a Daily Money Tracker project card after the flagship projects with a persistent visible text indicator reading "In Progress" that is displayed without user interaction
7. THE Projects_Section SHALL NOT display fabricated metrics, testimonials, user counts, or features that do not exist in the actual projects
8. WHEN a project has a live deployment URL, THE Case_Study_Card SHALL render the URL as a clickable external link that opens in a new browser tab with rel="noopener noreferrer" applied to the anchor element
9. IF a project does not have a public GitHub repository, THEN THE Case_Study_Card SHALL omit the GitHub link entirely rather than displaying a disabled or placeholder link

### Requirement 4: Concise About Section

**User Story:** As a recruiter, I want a brief bio that establishes credibility through evidence, so that I can understand the developer's background without reading filler.

#### Acceptance Criteria

1. THE About_Section SHALL contain a biographical summary of no more than 4 sentences, where each sentence contains at most one independent clause and one dependent clause
2. THE About_Section SHALL reference at least 2 specific, named projects or verifiable accomplishments (such as Xiron and Coffee Chapters) as evidence supporting claims of technical capability
3. THE About_Section SHALL state the developer's education (CS student at University of Makati, expected graduation 2029)
4. THE About_Section SHALL state the developer's location (Philippines)
5. THE About_Section SHALL NOT contain subjective self-descriptors ("passionate", "dedicated", "hardworking", "motivated", "driven") unless each is immediately followed by a named project, metric, or verifiable fact that demonstrates the quality
6. THE About_Section SHALL NOT use RPG framing (e.g., "quest", "level up", "XP", "skill tree", "backstory"), character bio section headings (e.g., "Character Bio", "Backstory"), or game-stat panels displaying attributes in a game-style format
7. THE About_Section SHALL NOT exceed 600 characters total (excluding headings and skill tags) to ensure the bio remains scannable within 15 seconds of reading time

### Requirement 5: Evidence-Based Skills Section

**User Story:** As a recruiter, I want to see technical skills organized by what has been demonstrated in real projects, so that I can trust the claimed competencies.

#### Acceptance Criteria

1. THE Skills_Section SHALL group skills by category: primary stack (PHP, MySQL, JavaScript, TypeScript), frameworks (React, Next.js, NestJS, FastAPI), databases (MySQL, PostgreSQL), and tools/infrastructure (JWT, Service Workers, Tailwind CSS, Turborepo)
2. WHEN a skill is displayed, THE Skills_Section SHALL display visible text referencing the project name where that skill was used (e.g., "PHP — Xiron, Coffee Chapters")
3. THE Skills_Section SHALL NOT present skills as an unorganized tag cloud without project context
4. THE Skills_Section SHALL only list technologies that appear in the technology stack of at least one project featured in the Projects_Section
5. IF a skill cannot be associated with at least one featured project, THEN THE Skills_Section SHALL omit that skill from the rendered output

### Requirement 6: Contact and Links Section

**User Story:** As a recruiter, I want to quickly find contact information and professional links, so that I can reach out or review code without hunting.

#### Acceptance Criteria

1. THE Contact_Section SHALL display the GitHub profile link (github.com/xedricandreiviar) as a clickable anchor element that opens in a new browser tab with rel="noopener noreferrer"
2. THE Contact_Section SHALL display the email address as a clickable mailto link that opens the user's default mail client when activated
3. THE Contact_Section SHALL display the LinkedIn profile link as a clickable anchor element that opens in a new browser tab with rel="noopener noreferrer"
4. WHEN a resume PDF file exists in the project assets, THE Contact_Section SHALL provide a download link for the resume that triggers a file download or opens the PDF in a new tab
5. IF no resume PDF file exists in the project assets, THEN THE Contact_Section SHALL hide the resume download link rather than displaying a broken link
6. THE Contact_Section SHALL be reachable from the Hero_Section CTA via anchor navigation (clicking the CTA scrolls the viewport to the Contact_Section)
7. WHEN a user activates any external link in the Contact_Section, THE Contact_Section SHALL open the destination in a new browser tab without navigating away from the portfolio page

### Requirement 7: Clean Visual Design System

**User Story:** As a recruiter, I want a visually consistent, modern design that communicates professionalism, so that the portfolio does not distract from its content.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use a consistent type scale with no more than 4 distinct font sizes for body content and 2 for headings, defined as CSS custom properties or Tailwind theme tokens
2. THE Portfolio_Site SHALL use a single Accent_Color consistently across interactive elements, headings, and highlights, with all accent-colored text achieving a minimum contrast ratio of 4.5:1 against its background in both light and dark themes
3. THE Portfolio_Site SHALL use a consistent spacing scale (multiples of 4px or 8px) for padding and margins
4. THE Portfolio_Site SHALL NOT use pixel-art borders, retro gaming fonts (Press Start 2P), scanline overlays, or 8-bit visual treatments
5. THE Portfolio_Site SHALL use a professional sans-serif font family (such as Inter, Geist, or system-ui) for body text
6. THE Portfolio_Site SHALL support both light and dark color themes, persisting the user's preference in localStorage, and defaulting to the system color scheme on first visit

### Requirement 8: Mobile Responsiveness

**User Story:** As a recruiter reviewing portfolios on a phone, I want the site to be fully usable on mobile devices, so that I can evaluate it wherever I open the link.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render all text at a minimum computed font size of 16px on viewports from 320px to 1440px width, and no content shall overflow its container or be clipped without a user-initiated expand action
2. WHEN the viewport width is below 768px, THE Portfolio_Site SHALL stack layout elements vertically and render body text at no smaller than 16px and heading text at no smaller than 18px
3. WHEN the viewport width is below 768px, THE Portfolio_Site navigation SHALL collapse into a mobile menu activated by a button that has an accessible name, indicates expanded/collapsed state via aria-expanded, and provides touch targets of at least 44×44 CSS pixels
4. THE Portfolio_Site SHALL NOT require horizontal scrolling on any viewport width between 320px and 1440px
5. WHEN a Case_Study_Card renders on a viewport below 768px, THE Case_Study_Card SHALL display the project title, technology stack, and all navigation links without truncation, and SHALL provide an expand control for descriptions longer than 120 characters
6. THE Portfolio_Site SHALL scale all images to fit within their parent container width on viewports between 320px and 768px, preventing images from exceeding 100% of the viewport width
7. WHEN the viewport width is below 768px, THE Portfolio_Site SHALL render all interactive elements (buttons, links, form inputs) with a minimum touch target size of 44×44 CSS pixels

### Requirement 9: Subtle Motion and Performance

**User Story:** As a recruiter, I want smooth, non-blocking animations that enhance the experience without delaying content access, so that the site feels polished but fast.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL limit animations to scroll-triggered reveal animations (opacity and transform transitions triggered when elements enter the viewport) and hover micro-interactions (visual feedback transitions lasting no more than 200ms)
2. THE Portfolio_Site SHALL NOT display entry animations that delay content visibility by more than 300ms after the component enters the viewport, including the cumulative delay of staggered child elements within a container
3. WHEN the user has set prefers-reduced-motion to reduce, THE Portfolio_Site SHALL disable all animations except focus indicators, setting animation-duration and transition-duration to 0.01ms
4. THE Portfolio_Site SHALL NOT use parallax scrolling effects, auto-playing carousels, or infinite animation loops on main content sections, excluding UI indicators such as blinking cursors or button press feedback
5. THE Portfolio_Site SHALL complete all scroll-triggered reveal animations (from hidden to fully visible state) within a maximum duration of 600ms per element

### Requirement 10: Navigation and Information Architecture

**User Story:** As a recruiter, I want clear navigation that lets me jump directly to projects or contact info, so that I never need to hunt for important links.

#### Acceptance Criteria

1. THE Portfolio_Site navigation SHALL contain links to: Projects, About, Skills, and Contact sections
2. WHEN a navigation link is clicked, THE Portfolio_Site SHALL smooth-scroll to the corresponding section within 1000 milliseconds
3. THE Portfolio_Site navigation SHALL remain fixed at the top of the viewport as the user scrolls, visible on all screen widths
4. THE Portfolio_Site SHALL NOT use RPG terminology ("Quest Log", "Guild History", "Tavern Board", "Character Bio") in navigation labels or section headings
5. THE Portfolio_Site navigation SHALL visually differentiate the currently active section link from inactive links using a distinct color or underline indicator, updating as the user scrolls past each section boundary
6. WHEN the viewport width is less than 768px, THE Portfolio_Site SHALL provide a toggle button that expands and collapses the navigation menu, and the toggle button SHALL have an accessible label indicating its current state
7. WHEN a navigation link is clicked and the target section is not present in the DOM, THE Portfolio_Site SHALL not navigate away from the page and SHALL remain at the current scroll position

### Requirement 11: SEO and Metadata

**User Story:** As a developer sharing my portfolio link on job platforms, I want proper metadata so that link previews display my name, role, and a professional description.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL define an HTML title that contains both "Xedric Andrei Viar" and "Full-Stack Developer" within a total length of 60 characters or fewer
2. THE Portfolio_Site SHALL define Open Graph meta tags including og:title, og:description, og:image, og:type, and og:url so that platforms such as LinkedIn render a visual link preview displaying the developer's name, role, and a thumbnail image
3. THE Portfolio_Site SHALL define a meta description between 50 and 160 characters that states the developer's role, location, and references at least one named project
4. THE Portfolio_Site SHALL include a JSON-LD script element using the schema.org "Person" type that contains the developer's name and job title

### Requirement 12: Remove Stale and Contradictory Content

**User Story:** As a developer presenting a cohesive portfolio, I want outdated RPG-themed content removed, so that nothing contradicts or undermines the professional redesign.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL NOT render the DungeonGate component or any full-screen overlay that blocks page content until a user interaction is performed
2. THE Portfolio_Site SHALL NOT render LevelGate components or any mechanism that hides page sections behind a required user interaction before revealing content
3. THE Portfolio_Site SHALL NOT display social links whose href points to a platform domain root with no user-specific path (e.g., "https://twitter.com" or "https://instagram.com" without a profile handle or ID segment)
4. THE Portfolio_Site SHALL NOT display non-development work experience entries (entries where listed tools contain no programming languages, frameworks, or software development methodologies) in the default rendered page output
5. THE Portfolio_Site SHALL NOT contain component files from the RPG-themed version (including but not limited to DungeonGate, LevelGate, and GateContext) that are not imported by any file in the application build entry graph
6. IF a social link does not resolve to a valid, user-owned profile, THEN THE Portfolio_Site SHALL omit that link from the rendered output rather than displaying a broken or generic destination

### Requirement 13: Project Visual Assets

**User Story:** As a recruiter, I want to see real screenshots or visuals of the projects, so that I can quickly grasp what was built without clicking through to live demos.

#### Acceptance Criteria

1. WHEN a project has an associated screenshot image in the public/images directory, THE Case_Study_Card SHALL display that image occupying at least 40% of the card's visible area with an aspect ratio of 16:9 on mobile viewports and 1:1 on desktop viewports
2. THE Portfolio_Site SHALL use optimized image formats (WebP or Next.js Image component optimization) for project screenshots
3. THE Case_Study_Card SHALL render each project image with descriptive alt text that includes the project title
4. IF a project screenshot is unavailable due to a missing file, empty image path, or failed load, THEN THE Case_Study_Card SHALL display a placeholder element with a visible background color and a text label identifying the project type, matching the same dimensions as a loaded image
5. WHEN a project image is loading, THE Case_Study_Card SHALL reserve the image space at the defined aspect ratio to prevent layout shift
