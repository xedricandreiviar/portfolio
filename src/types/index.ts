export interface NavLink {
  label: string;
  href: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  icon?: "arrow" | "github";
  external?: boolean;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  status: "complete" | "in-progress";
  links: ProjectLink[];
}

export interface FlagshipProject extends Project {
  problemStatement: string;
  technicalChallenge: string;
  technicalHighlights: string[];
}

export interface SkillEntry {
  name: string;
  projects: string[];
}

export interface SkillCategory {
  category: string;
  skills: SkillEntry[];
}

export interface ContactLink {
  platform: "github" | "linkedin" | "email";
  href: string;
  label: string;
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  email: string;
  roleDescriptor: string;
  valueProposition: string;
  aboutBio: string;
  education: string;
  location: string;
  copyright: string;
}
