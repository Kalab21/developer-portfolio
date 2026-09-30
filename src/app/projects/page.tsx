import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Four projects: an event-driven banking platform, a consumer-lending platform with a RAG assistant, a skills assessment platform and a Java marketplace.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Systems I have designed, built and hardened">
        Northbank is the flagship. Meridian Lending and Rev-Eval are team engagements, so
        each page separates what the project is from what I contributed. MarketHub is a
        smaller supporting project.
      </PageHeader>
      <section aria-label="All projects" className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} flagship={i === 0} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
