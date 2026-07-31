"use client";

import { SkillEntry } from "@/types";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

interface SkillCategoryProps {
  category: string;
  skills: SkillEntry[];
}

export function SkillCategory({ category, skills }: SkillCategoryProps) {
  return (
    <ScrollReveal animation="fade-up">
      <div className="rounded-lg border border-border bg-bg-card p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-accent">
          {category}
        </h3>
        <StaggerContainer staggerDelay={0.08} className="space-y-3">
          {skills.map((skill) => (
            <StaggerItem key={skill.name}>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-0">
                <span className="font-body text-base font-medium text-text-primary">
                  {skill.name}
                </span>
                <span className="font-body text-base text-text-secondary md:text-sm sm:before:mx-2 sm:before:content-['—']">
                  {skill.projects.join(", ")}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </ScrollReveal>
  );
}
