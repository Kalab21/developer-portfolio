import Link from "next/link";
import { expertise, roles, site } from "@/data/site";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";

export default function Home() {
  return (
    <>
      <section className="border-b border-border pb-16 pt-14 sm:pb-24 sm:pt-24">
        <Container>
          <div className="rise max-w-4xl">
            <p className="font-mono text-sm text-accent">{site.name}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Senior Software Engineer{" "}
              <span className="text-muted">|</span> Forward Deployed Engineer
            </h1>
            <p className="mt-6 text-base font-medium leading-7 sm:text-lg">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
              {site.valueProp}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects" variant="primary">
                View Projects
              </ButtonLink>
              <ButtonLink href="/experience">View Experience</ButtonLink>
              <ButtonLink href={site.github} external>
                GitHub
              </ButtonLink>
              <ButtonLink href="/resume">Resume</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="snapshot" className="border-b border-border py-10">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="snapshot" className="sr-only">
              Experience snapshot
            </h2>
            <p className="text-3xl font-semibold tracking-tight">
              6+ Years <span className="text-muted">Software Engineering</span>
            </p>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label="Industry domains">
            {site.domains.map((d) => (
              <li
                key={d}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium"
              >
                {d}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="expertise-heading" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Expertise"
            title="Four areas that work together"
            headingId="expertise-heading"
          >
            I build the systems, the data underneath them, the AI capabilities on top,
            and the delivery pipelines that keep them reliable.
          </SectionHeading>
          <ul className="grid gap-4 sm:grid-cols-2">
            {expertise.map((e) => (
              <li
                key={e.title}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <p className="mt-2 leading-7 text-muted">{e.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="featured" className="bg-surface-muted py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Featured projects" title="Selected work" headingId="featured">
            Four projects spanning distributed systems, applied AI, platform engineering
            and full-stack Java. Team projects list my own contributions separately.
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} flagship={i === 0} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="career" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Career"
            title="From enterprise Java to applied AI"
            headingId="career"
          >
            Each step widened the scope: banking and insurance systems, event-driven
            modernization, data and analytics engineering, then forward deployed work
            with RAG and multi-service platforms.
          </SectionHeading>
          <ol className="divide-y divide-border rounded-2xl border border-border bg-surface">
            {roles.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/experience#${r.id}`}
                  className="grid gap-1 p-5 transition-colors hover:bg-surface-muted sm:grid-cols-[14rem_1fr_11rem] sm:items-baseline sm:gap-6"
                >
                  <span className="font-semibold">{r.company}</span>
                  <span className="text-muted">
                    {r.title}
                    <span className="block text-sm">{r.focus}</span>
                  </span>
                  <span className="font-mono text-sm text-muted sm:text-right">
                    {r.period}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            <Link href="/experience" className="text-sm font-semibold text-accent">
              Full experience <span aria-hidden="true">→</span>
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
