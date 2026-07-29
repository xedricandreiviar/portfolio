import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] flex-col items-center justify-center px-4 py-16 md:px-8 lg:flex-row lg:gap-16 lg:py-24"
    >
      {/* Text content */}
      <div className="flex flex-1 flex-col gap-6 text-center lg:text-left">
        <div>
          <h1
            id="hero-heading"
            className="text-h1 font-bold leading-tight text-text-primary"
          >
            {SITE_CONFIG.name}
          </h1>
          <p className="mt-2 text-xl font-medium text-accent">
            {SITE_CONFIG.roleDescriptor}
          </p>
        </div>

        <p className="max-w-xl text-lg leading-relaxed text-text-secondary lg:max-w-lg">
          {SITE_CONFIG.valueProposition}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <a
            href="#projects"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border-2 border-accent px-6 py-3 text-base font-semibold text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Profile image */}
      <div className="mt-12 flex-shrink-0 lg:mt-0">
        <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full md:h-[280px] md:w-[280px] lg:h-[320px] lg:w-[320px]">
          <Image
            src="/images/profile.png"
            alt="Xedric Andrei Viar - Full-Stack Web Developer"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 200px, (max-width: 1024px) 280px, 320px"
          />
        </div>
      </div>
    </section>
  );
}
