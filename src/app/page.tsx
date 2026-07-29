import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ContactLinks } from "@/components/sections/ContactLinks";
import { CONTACT_LINKS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <section id="projects">
          <FeaturedProjects />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <ContactLinks links={CONTACT_LINKS} />
        </section>
      </main>
      <Footer />
    </>
  );
}
