import type { SiteConfig, NavLink, FlagshipProject, Project, SkillCategory, ContactLink } from "@/types";

export const SITE_CONFIG: SiteConfig = {
  name: "Xedric Andrei Viar",
  email: "xedricandreiviar@gmail.com",
  roleDescriptor: "Full-Stack Web Developer",
  valueProposition: "I build and ship production web applications — from database design through deployment. Currently focused on offline-first PWAs and full-stack ordering platforms.",
  aboutBio: "Full-stack web developer based in the Philippines, currently studying Computer Science at the University of Makati (expected 2029). Built and deployed Xiron, an offline-first fitness PWA with JWT auth and background sync, and Coffee Chapters, a full ordering platform with BIR-compliant tax calculation and local payment integration.",
  education: "Computer Science, University of Makati (Expected 2029)",
  location: "Philippines",
  copyright: "© 2025 Xedric Andrei Viar",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    title: "Xiron",
    problemStatement: "Gym-goers need a reliable way to log workouts and track strength progress even without internet connectivity.",
    description: "Progressive Web App for logging workouts and tracking strength progress. Works fully offline with automatic sync on reconnect.",
    image: "/images/project-1.png",
    techStack: ["JavaScript", "PHP", "MySQL", "Service Workers", "JWT", "REST API"],
    technicalChallenge: "Implemented background sync with conflict resolution to handle offline workout logs that need to merge with server state on reconnect.",
    technicalHighlights: ["Offline-first sync with Service Workers", "JWT authentication with email verification", "PWA installability and caching"],
    status: "in-progress",
    links: [
      { label: "Live Demo", href: "https://xiron.cu.ma", icon: "arrow", external: true },
    ],
  },
  {
    title: "Coffee Chapters",
    problemStatement: "A Philippine coffee shop needed a complete ordering system that handles local payment methods and tax compliance.",
    description: "Full-stack ordering platform covering menu browsing, order placement, GCash/Maya payment verification, and admin analytics.",
    image: "/images/project-2.png",
    techStack: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    technicalChallenge: "Implemented BIR-compliant VAT calculation with cascading Senior Citizen and PWD discount rules specific to Philippine tax law.",
    technicalHighlights: ["BIR-compliant VAT calculation", "GCash/Maya payment integration", "Multi-page admin dashboard with analytics"],
    status: "in-progress",
    links: [
      { label: "Live Demo", href: "https://coffeechapters.freedev.app", icon: "arrow", external: true },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Gym Management SaaS",
    description: "Multi-tenant gym management platform with member tracking, payment processing, and trainer scheduling.",
    image: "/images/project-3.png",
    techStack: ["NestJS", "Next.js", "TypeORM", "PostgreSQL", "Turborepo"],
    status: "in-progress",
    links: [
      { label: "Live Demo", href: "https://xedgymmanagement.vercel.app/", icon: "arrow", external: true },
    ],
  },
  {
    title: "Daily Money Tracker",
    description: "Personal finance tracking application for daily expense logging and budget visualization.",
    image: "/images/project-4.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "in-progress",
    links: [
      { label: "Live Demo", href: "https://xedmoneytracker.vercel.app/", icon: "arrow", external: true },
    ],
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Primary Stack",
    skills: [
      { name: "PHP", projects: ["Xiron", "Coffee Chapters"] },
      { name: "MySQL", projects: ["Xiron", "Coffee Chapters"] },
      { name: "JavaScript", projects: ["Xiron", "Coffee Chapters"] },
      { name: "TypeScript", projects: ["Gym Management SaaS", "Daily Money Tracker"] },
    ],
  },
  {
    category: "Frameworks",
    skills: [
      { name: "Next.js", projects: ["Gym Management SaaS", "Daily Money Tracker"] },
      { name: "NestJS", projects: ["Gym Management SaaS"] },
      { name: "Tailwind CSS", projects: ["Coffee Chapters", "Daily Money Tracker"] },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", projects: ["Xiron", "Coffee Chapters"] },
      { name: "PostgreSQL", projects: ["Gym Management SaaS"] },
    ],
  },
  {
    category: "Tools & Infrastructure",
    skills: [
      { name: "JWT", projects: ["Xiron"] },
      { name: "Service Workers", projects: ["Xiron"] },
      { name: "Turborepo", projects: ["Gym Management SaaS"] },
      { name: "REST API", projects: ["Xiron", "Coffee Chapters"] },
    ],
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  { platform: "github", href: "https://github.com/xedricandreiviar", label: "GitHub" },
  { platform: "linkedin", href: "https://www.linkedin.com/in/xedric-andrei-viar-83806b396/", label: "LinkedIn" },
  { platform: "email", href: "mailto:xedricandreiviar@gmail.com", label: "Email" },
];
