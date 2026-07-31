import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ContactLinks } from "@/components/sections/ContactLinks";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { CONTACT_LINKS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <SectionDivider />
        <section id="projects">
          <FeaturedProjects />
        </section>
        <SectionDivider />
        <section id="about">
          <About />
        </section>
        <SectionDivider />
        <section id="skills">
          <Skills />
        </section>
        <SectionDivider />
        <section id="contact">
          <ContactLinks links={CONTACT_LINKS} resumePath="/Xedric_Viar_Resume.pdf" />
        </section>
      </main>
      <Footer />
    </>
  );
}
