import { FLAGSHIP_PROJECTS, PROJECTS } from "@/lib/constants";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { ProjectCard } from "@/components/cards/ProjectCard";

export function FeaturedProjects() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-8 lg:py-20">
      {/* Section heading */}
      <h2 className="font-display text-h2 font-bold text-text-primary">
        Projects
      </h2>

      {/* Flagship projects - full-width case study cards */}
      <div className="mt-8 flex flex-col gap-8">
        {FLAGSHIP_PROJECTS.map((project) => (
          <CaseStudyCard key={project.title} project={project} />
        ))}
      </div>

      {/* Standard projects - grid layout */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
