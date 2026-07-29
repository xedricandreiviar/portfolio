import { SITE_CONFIG, CONTACT_LINKS } from "@/lib/constants";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

export function Footer() {
  const socialLinks = CONTACT_LINKS.filter(
    (link) => link.platform === "github" || link.platform === "linkedin"
  );

  return (
    <footer className="w-full border-t border-border bg-bg-primary">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:gap-0 lg:px-8">
        <p className="text-base text-text-secondary md:text-sm">
          {SITE_CONFIG.copyright}
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.platform as keyof typeof iconMap];
            return (
              <a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${link.label} profile`}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-secondary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
