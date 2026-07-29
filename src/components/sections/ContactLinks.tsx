import type { ContactLink } from "@/types";

interface ContactLinksProps {
  links: ContactLink[];
  resumePath?: string;
}

export function ContactLinks({ links, resumePath }: ContactLinksProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center md:px-6">
      <h2 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
        Get in Touch
      </h2>
      <p className="mt-4 text-base text-text-secondary md:text-lg">
        Interested in working together? Reach out through any of these channels.
      </p>
      <ul className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
        {links.map((link) => {
          const isEmail = link.platform === "email";
          return (
            <li key={link.platform}>
              <a
                href={link.href}
                {...(!isEmail && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-lg border border-border px-5 py-3 text-base font-medium text-text-primary transition-colors hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
      {resumePath && (
        <div className="mt-8">
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-lg bg-accent px-5 py-3 text-base font-medium text-white transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Download Resume
          </a>
        </div>
      )}
    </div>
  );
}
