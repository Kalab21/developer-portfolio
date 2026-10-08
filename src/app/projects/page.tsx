import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Five projects: an event-driven Java/Kafka banking platform, a consumer-lending platform with a RAG assistant, the Policy RAG Platform (advanced retrieval and grounded RAG), a skills assessment platform and a Java marketplace.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Systems I have built, extended and hardened">
        Systems spanning distributed banking, consumer lending with applied AI, secure
        retrieval, assessment platforms and full-stack Java. Each case study covers the
        architecture, the key engineering decisions and how the work was verified.
      </PageHeader>
      <section aria-label="All projects" className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
