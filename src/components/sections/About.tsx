import { SITE_CONFIG } from "@/lib/constants";

export function About() {
  return (
    <div
      aria-labelledby="about-heading"
      className="mx-auto max-w-3xl px-4 py-12 lg:px-8 lg:py-20"
    >
      <h2
        id="about-heading"
        className="text-2xl font-semibold text-text-primary lg:text-3xl"
      >
        About
      </h2>

      <p className="mt-6 text-base leading-relaxed text-text-secondary lg:text-lg">
        {SITE_CONFIG.aboutBio}
      </p>

      <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-base font-medium text-text-secondary md:text-sm">Education</dt>
          <dd className="mt-1 text-base text-text-primary">
            {SITE_CONFIG.education}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-text-secondary md:text-sm">Location</dt>
          <dd className="mt-1 text-base text-text-primary">
            {SITE_CONFIG.location}
          </dd>
        </div>
      </dl>
    </div>
  );
}
