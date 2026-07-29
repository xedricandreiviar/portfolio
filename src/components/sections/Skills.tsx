import { SKILLS, FLAGSHIP_PROJECTS, PROJECTS } from "@/lib/constants";
import { SkillCategory } from "@/components/sections/SkillCategory";

export function Skills() {
  const validProjectTitles = new Set([
    ...FLAGSHIP_PROJECTS.map((p) => p.title),
    ...PROJECTS.map((p) => p.title),
  ]);

  const filteredCategories = SKILLS.map((category) => ({
    ...category,
    skills: category.skills.filter((skill) =>
      skill.projects.some((project) => validProjectTitles.has(project))
    ),
  })).filter((category) => category.skills.length > 0);

  return (
    <div>
      <h2 className="mb-8 font-display text-3xl font-bold text-text-primary">
        Skills
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredCategories.map((category) => (
          <SkillCategory
            key={category.category}
            category={category.category}
            skills={category.skills}
          />
        ))}
      </div>
    </div>
  );
}
