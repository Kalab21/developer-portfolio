import Link from "next/link";
import { expertise, roles, site } from "@/data/site";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="grid-texture absolute inset-0" />
        <Container className="relative grid gap-12 pb-16 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div className="rise">
            <p className="font-mono text-sm font-medium text-accent">{site.name}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Senior Software Engineer
              <span className="block text-muted">Forward Deployed Engineer</span>
            </h1>
            <p className="mt-6 text-base font-medium leading-7 sm:text-lg">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
              {site.valueProp}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects" variant="primary">
                View Projects
              </ButtonLink>
              <ButtonLink href="/experience">Experience</ButtonLink>
              <ButtonLink href="/resume">Resume</ButtonLink>
              <ButtonLink href={site.github} external>
                GitHub
              </ButtonLink>
            </div>
          </div>

          <aside
            aria-label="Profile summary"
            className="rise relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-accent-2"
            />
            <p className="text-5xl font-semibold tracking-tight">6+</p>
            <p className="mt-1 text-muted">years of software engineering</p>

            <h2 className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
              Domains
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {site.domains.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border bg-surface-muted px-3 py-1 text-sm"
                >
                  {d}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
              Current focus
            </h2>
            <ul className="mt-3 space-y-2">
              {site.currentFocus.map((f) => (
                <li key={f} className="flex items-center gap-3 font-medium">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-2" />
                  {f}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="expertise-heading" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Expertise"
            title="Engineering across systems, data, cloud and AI"
            headingId="expertise-heading"
          >
            Production systems rarely stay in one lane. These are the four areas I work
            across.
          </SectionHeading>
          <ul className="grid gap-5 sm:grid-cols-2">
            {expertise.map((e, i) => (
              <li
                key={e.title}
                className={`rounded-2xl border border-border border-t-4 bg-surface p-6 shadow-card ${
                  i % 2 === 0 ? "border-t-accent" : "border-t-accent-2"
                }`}
              >
                <p className="font-mono text-xs text-muted">0{i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold">{e.title}</h3>
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

      <section aria-labelledby="featured" className="border-y border-border bg-surface-muted py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Featured projects" title="Selected work" headingId="featured">
            Northbank is the deepest project. Meridian Lending and Rev-Eval are team
            engagements, so their pages separate the project from my own contributions.
          </SectionHeading>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} flagship={i === 0} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="career" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Career"
            title="From enterprise Java to applied AI"
            headingId="career"
          >
            Insurance and banking backends first, then event-driven modernization, data
            engineering, and most recently forward deployed work on RAG and multi-service
            platforms.
          </SectionHeading>
          <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
            {roles.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/experience#${r.id}`}
                  className="grid gap-1 p-5 transition-colors hover:bg-surface-muted sm:grid-cols-[13rem_1fr_11rem] sm:items-baseline sm:gap-6"
                >
                  <span className="font-semibold">{r.company}</span>
                  <span className="text-muted">
                    {r.title}
                    <span className="block text-sm">
                      {r.focus} · {r.location}
                    </span>
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
