# Requirements Document

## Introduction

This feature enhances the visual design of an existing Next.js portfolio website to create a more engaging, polished, and impressive experience for potential employers. The enhancements include floating animated tech icons, subtle background effects, improved card interactions, and decorative visual elements — all while maintaining the existing clean structure, professional tone, and accessibility standards. The site already uses framer-motion, Tailwind CSS with CSS custom properties for theming, and a scroll-reveal animation system.

## Glossary

- **Portfolio_Site**: The existing Next.js portfolio website for Xedric Andrei Viar
- **Floating_Icons_Component**: A client-side React component that renders animated technology/framework icons that drift slowly across a designated area
- **Hero_Section**: The top-level landing section containing the name, role descriptor, value proposition, CTAs, and profile image
- **Gradient_Accent**: A subtle multi-color gradient applied to background elements or text to add visual depth beyond flat solid colors
- **Glow_Effect**: A soft, blurred radial light emission applied behind or around elements to create depth and focus
- **Card_Hover_Effect**: An interactive visual response triggered when a user hovers over a project card, providing tactile feedback
- **Background_Pattern**: A subtle repeating geometric or dot pattern applied to page backgrounds to add texture without distraction
- **Particle_Field**: A lightweight canvas or CSS-based system that renders small animated dots or shapes in background areas
- **Animation_System**: The existing framer-motion infrastructure including ScrollReveal and StaggerContainer components
- **Reduced_Motion_Mode**: The operating system accessibility setting (prefers-reduced-motion: reduce) that disables non-essential animations
- **Tech_Icon**: An SVG representation of a programming language, framework, or tool (e.g., PHP, TypeScript, Next.js, PostgreSQL)

## Requirements

### Requirement 1: Floating Technology Icons

**User Story:** As a portfolio visitor, I want to see animated technology icons floating in the hero section background, so that I immediately understand the developer's tech expertise and experience a visually engaging first impression.

#### Acceptance Criteria

1. WHEN the Hero_Section renders, THE Floating_Icons_Component SHALL display between 6 and 12 Tech_Icon elements positioned in the background layer behind the main content using a z-index lower than all foreground content elements
2. WHILE the Hero_Section is visible, THE Floating_Icons_Component SHALL animate each Tech_Icon with a continuous drift motion where each icon moves at a randomized speed between 10 and 30 pixels per second in a randomized direction, creating a slow ambient effect
3. THE Floating_Icons_Component SHALL render Tech_Icon elements representing technologies from the developer's actual skill set: PHP, MySQL, JavaScript, TypeScript, Next.js, NestJS, Tailwind CSS, PostgreSQL, JWT, and REST API
4. THE Floating_Icons_Component SHALL set each Tech_Icon opacity between 0.08 and 0.20 so that icons remain visible but do not compete with foreground content for attention
5. WHILE Reduced_Motion_Mode is active, THE Floating_Icons_Component SHALL render Tech_Icon elements in static positions without any animation
6. THE Floating_Icons_Component SHALL confine all Tech_Icon elements within the Hero_Section boundaries so that no icon overflows into other sections or causes horizontal scrollbar
7. THE Floating_Icons_Component SHALL render each Tech_Icon at a size between 24 and 48 pixels (width and height) so that icons are recognizable but do not obscure foreground content

### Requirement 2: Enhanced Hero Section Visual Depth

**User Story:** As a portfolio visitor, I want the hero section to have visual depth and presence, so that the portfolio feels polished and designed rather than plain.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a Gradient_Accent as a radial background element positioned behind the profile image, using the site's accent color at 20% to 30% opacity, with a diameter between 1.5× and 2× the profile image container width
2. THE Hero_Section SHALL display a Glow_Effect behind the profile image that pulses on a continuous cycle of 3 to 4 seconds duration, with the glow opacity varying between 10% and 40% of the accent color
3. WHEN the page loads, THE Hero_Section text content SHALL animate in with a staggered fade-up sequence using the existing Animation_System, where each child element is delayed by no more than 100ms from the previous and total entrance animation completes within 800ms
4. THE Hero_Section profile image container SHALL include a gradient border ring using the accent color with a visible border width of 2px to 4px to frame the image
5. IF the user has enabled reduced motion preferences, THEN THE Hero_Section SHALL display all visual elements (gradient, glow, border) in their final state without animation or pulsing

### Requirement 3: Interactive Project Card Effects

**User Story:** As a portfolio visitor, I want project cards to respond to my interaction, so that the portfolio feels modern and polished like a professionally designed website.

#### Acceptance Criteria

1. THE Card_Hover_Effect SHALL render project cards in a resting state with no vertical translation (translateY: 0) and no box-shadow beyond the default card border
2. WHEN a user hovers over a project card, THE Card_Hover_Effect SHALL apply an upward translation of 2px and a box-shadow with a vertical offset of 4-8px, a blur radius of 12-20px, and an opacity no greater than 15% to create a lifted appearance
3. WHEN a user hovers over a project card, THE Card_Hover_Effect SHALL transition the border color from the default border color (--theme-border) to the accent color (--theme-accent)
4. THE Card_Hover_Effect SHALL use CSS transitions with a duration between 200ms and 300ms and an ease-out timing function for the translation, shadow, and border-color properties
5. WHEN a user moves the pointer away from a project card, THE Card_Hover_Effect SHALL return the card to the resting state (no translation, no enhanced shadow, default border color) using the same transition duration and timing function
6. WHILE Reduced_Motion_Mode is active (prefers-reduced-motion: reduce), THE Card_Hover_Effect SHALL apply only an instant border color change to the accent color without any translation, shadow change, or animated transition
7. WHILE the viewport does not support hover interaction (pointer: coarse or hover: none), THE Card_Hover_Effect SHALL display the card in its resting state without hover effects

### Requirement 4: Subtle Background Texture

**User Story:** As a portfolio visitor, I want the page background to have subtle visual texture, so that the overall design feels intentional and layered rather than flat and empty.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a Background_Pattern using a repeating dot grid pattern applied to the primary page background, where dots are circular with a diameter between 1px and 2px and spaced between 16px and 32px apart in both horizontal and vertical directions
2. THE Background_Pattern SHALL use the current theme's border color CSS custom property (--theme-border) at an opacity between 0.3 and 0.5, ensuring the pattern is perceptible on close inspection but does not compete with foreground content
3. WHEN the user switches between dark and light theme modes, THE Background_Pattern SHALL update its color automatically via CSS custom properties without requiring a page reload
4. THE Background_Pattern SHALL be implemented using a CSS radial-gradient repeating pattern without requiring additional image assets or external resources
5. IF the browser does not support CSS radial-gradient, THEN THE Portfolio_Site SHALL display the solid primary background color (--theme-bg-primary) with no visual degradation to foreground content

### Requirement 5: Section Divider Accents

**User Story:** As a portfolio visitor, I want visual separation between page sections that feels designed, so that the layout has clear visual rhythm and hierarchy.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a gradient line divider between each pair of adjacent major content sections (Hero, Projects, About, Skills, Contact), resulting in exactly 4 dividers, each spanning the full width of its parent container and marked as decorative so that screen readers do not announce it
2. THE gradient line divider SHALL use a horizontal gradient that transitions from fully transparent at 0% width, to the current theme's accent color at 50% width, and back to fully transparent at 100% width
3. THE gradient line divider SHALL have a height of 1px
4. WHEN the site theme changes between dark and light mode, THE gradient line divider SHALL update its accent color to match the active theme's accent color value without requiring a page reload

### Requirement 6: Animated Skill Tags

**User Story:** As a portfolio visitor, I want skill items to have subtle animation when they scroll into view, so that the skills section feels dynamic rather than static.

#### Acceptance Criteria

1. WHEN a SkillCategory card scrolls into the viewport by at least 20% of its height, THE Animation_System SHALL reveal the card with a fade-up animation (opacity 0 to 1 and vertical translation of 20px to 0) over a duration of 500ms using the existing ScrollReveal component, and the animation SHALL trigger only once per page load
2. WHEN a SkillCategory card becomes visible in the viewport by at least 20% of its height, THE StaggerContainer SHALL animate each skill item within the card sequentially with a fade-up effect (opacity 0 to 1, vertical translation of 15px to 0) over 400ms per item, with a stagger delay of 80ms between consecutive items (capped at 100ms maximum), and the animation SHALL trigger only once per page load
3. WHILE Reduced_Motion_Mode is active (the user's operating system has prefers-reduced-motion enabled), THE Animation_System SHALL render all SkillCategory cards and their skill items immediately at full opacity and final position without any transition or delay

### Requirement 7: Profile Image Floating Animation

**User Story:** As a portfolio visitor, I want the profile image to have a gentle floating animation, so that the hero section has a dynamic focal point that catches my eye.

#### Acceptance Criteria

1. WHILE the Hero_Section is rendered, THE profile image container SHALL continuously animate with a vertical translate oscillation of 4px amplitude (moving 4px up and 4px down from the element's natural resting position) on a repeating cycle of 3 seconds with infinite iteration count
2. THE profile image floating animation SHALL use an ease-in-out timing function applied to a CSS keyframe animation that transitions between the topmost and bottommost translate positions
3. WHILE Reduced_Motion_Mode is active (the user's system has `prefers-reduced-motion: reduce` enabled), THE profile image container SHALL remain at its natural resting position with no translate animation applied
4. WHEN the Hero_Section initially renders, THE profile image floating animation SHALL begin from the element's natural resting position (0px vertical offset) and transition into the first upward movement of the cycle

### Requirement 8: Accent Color Glow on Interactive Elements

**User Story:** As a portfolio visitor, I want buttons and links to have a subtle glow when I interact with them, so that the site feels responsive and premium.

#### Acceptance Criteria

1. WHEN a user hovers over a primary CTA button, THE button SHALL display a Glow_Effect using the accent color with a blur radius between 8px and 16px, a spread radius between 0px and 4px, and an opacity between 0.3 and 0.6
2. WHEN a user hovers over a social link icon, THE icon container SHALL display a Glow_Effect using the accent color with a blur radius between 6px and 12px and an opacity between 0.2 and 0.4
3. THE Glow_Effect on interactive elements SHALL use CSS transitions with a duration between 200ms and 300ms for both appearance on hover-in and disappearance on hover-out
4. WHILE Reduced_Motion_Mode is active (the user's system has `prefers-reduced-motion: reduce` enabled), THE interactive elements SHALL change only their background or border color on hover without applying any box-shadow glow or transition animation

### Requirement 9: Performance and Accessibility Preservation

**User Story:** As a developer maintaining the site, I want visual enhancements to preserve performance and accessibility, so that the site remains fast-loading and usable for all visitors.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL maintain a Lighthouse Performance score of 90 or above when audited under mobile emulation with simulated throttling (Lighthouse default mobile preset) after all visual enhancements are applied
2. THE Portfolio_Site SHALL implement all looping or indefinitely repeating animations using CSS transforms and opacity exclusively to ensure GPU-accelerated rendering without layout thrashing
3. THE Portfolio_Site SHALL ensure all decorative visual elements (floating icons, background patterns, glow effects) are marked with aria-hidden="true" so screen readers skip non-informational content
4. IF the user's device reports no hover capability (detected via the media query `(hover: none)`), THEN THE Portfolio_Site SHALL disable Particle_Field and reduce the number of Floating_Icons_Component icons to a maximum of 4
5. IF the user has enabled the prefers-reduced-motion: reduce accessibility setting, THEN THE Portfolio_Site SHALL disable all looping animations, particle effects, and floating icon movement, displaying those elements in a static state
