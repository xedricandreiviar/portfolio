import { SkillEntry } from "@/types";

interface SkillCategoryProps {
  category: string;
  skills: SkillEntry[];
}

export function SkillCategory({ category, skills }: SkillCategoryProps) {
  return (
    <div className="rounded-lg border border-border bg-bg-card p-6">
      <h3 className="mb-4 font-display text-lg font-semibold text-accent">
        {category}
      </h3>
      <ul className="space-y-3">
        {skills.map((skill) => (
          <li key={skill.name} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-0">
            <span className="font-body text-base font-medium text-text-primary">
              {skill.name}
            </span>
            <span className="font-body text-base text-text-secondary md:text-sm sm:before:mx-2 sm:before:content-['—']">
              {skill.projects.join(", ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
