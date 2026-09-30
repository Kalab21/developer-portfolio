import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import {
  ArchitectureDiagram,
  ArchitectureFlow,
  Shot,
  StatGrid,
} from "@/components/project";
import { ButtonLink, Container, PageHeader, SectionHeading, Tag } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  const image = project.screenshots[0];
  return {
    title: `${project.title}: ${project.subtitle}`,
    description: project.summary,
    openGraph: {
      title: `${project.title}: ${project.subtitle}`,
      description: project.summary,
      type: "article",
      images: image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined,
    },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 leading-7 marker:text-accent">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const [heroShot, ...moreShots] = project.screenshots;
  const isTeam = project.ownership === "team";

  return (
    <>
      <PageHeader eyebrow={project.category} title={project.title}>
        {project.subtitle}
      </PageHeader>

      <Container className="py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <Link href="/projects" className="hover:text-foreground">
            Projects
          </Link>{" "}
          / <span aria-current="page">{project.title}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <Tag>{isTeam ? "Team project" : "Personal project"}</Tag>
          <p className="text-sm text-muted">{project.ownershipNote}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={project.repository.url} variant="primary" external>
            Repository: {project.repository.label}
          </ButtonLink>
          {project.extraLinks?.map((l) => (
            <ButtonLink key={l.url} href={l.url} external>
              {l.label}
            </ButtonLink>
          ))}
        </div>
        {project.repository.note && (
          <p className="mt-2 text-sm text-muted">{project.repository.note}</p>
        )}

        <div className="mt-10">
          <StatGrid stats={project.stats} />
        </div>

        <section aria-labelledby="overview" className="mt-16 max-w-3xl">
          <SectionHeading eyebrow="Overview" title="What it is" headingId="overview" />
          <p className="text-lg leading-8">{project.summary}</p>
          {project.context.map((c) => (
            <p key={c} className="mt-4 leading-7 text-muted">
              {c}
            </p>
          ))}
          <p className="mt-6 leading-7">
            <span className="font-semibold">My role. </span>
            {project.role}
          </p>
        </section>

        {heroShot && (
          <section aria-labelledby="screens" className="mt-16">
            <SectionHeading eyebrow="Screenshots" title="The product" headingId="screens" />
            <Shot shot={heroShot} priority />
            {moreShots.length > 0 && (
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {moreShots.map((s) => (
                  <Shot key={s.src} shot={s} sizes="(min-width: 768px) 540px, 100vw" />
                ))}
              </div>
            )}
          </section>
        )}

        <section aria-labelledby="evidence" className="mt-16">
          <SectionHeading
            eyebrow="Engineering evidence"
            title="What the code demonstrates"
            headingId="evidence"
          />
          <ul className="grid gap-4 md:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h.title} className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-semibold">{h.title}</h3>
                <p className="mt-2 leading-7 text-muted">{h.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="architecture" className="mt-16">
          <SectionHeading
            eyebrow="Architecture"
            title="How it fits together"
            headingId="architecture"
          >
            {project.architecture.description}
          </SectionHeading>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <ArchitectureFlow tiers={project.architecture.tiers} />
            {project.architecture.diagram && (
              <ArchitectureDiagram diagram={project.architecture.diagram} />
            )}
          </div>
        </section>

        {project.contributions && (
          <section
            aria-labelledby="contributions"
            className="mt-16 rounded-2xl border border-accent bg-surface p-6 sm:p-8"
          >
            <SectionHeading
              eyebrow="Team project"
              title="My Engineering Contributions"
              headingId="contributions"
            />
            <BulletList items={project.contributions} />
          </section>
        )}

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <section aria-labelledby="security">
            <h2 id="security" className="mb-4 text-xl font-semibold">
              Security
            </h2>
            <BulletList items={project.security} />
          </section>
          <section aria-labelledby="reliability">
            <h2 id="reliability" className="mb-4 text-xl font-semibold">
              Reliability
            </h2>
            <BulletList items={project.reliability} />
          </section>
        </div>

        <section aria-labelledby="testing" className="mt-16">
          <SectionHeading eyebrow="Testing" title="Verification" headingId="testing">
            {project.testing.summary}
          </SectionHeading>
          <StatGrid stats={project.testing.stats} />
          <div className="mt-6 max-w-3xl">
            <BulletList items={project.testing.notes} />
          </div>
        </section>

        <section
          aria-labelledby="scope"
          className="mt-16 rounded-2xl border border-border bg-surface-muted p-6 sm:p-8"
        >
          <h2 id="scope" className="mb-4 text-xl font-semibold">
            Scope and honesty notes
          </h2>
          <BulletList items={project.scope} />
        </section>

        <section aria-labelledby="stack" className="mt-16">
          <SectionHeading eyebrow="Technology" title="Stack" headingId="stack" />
          <dl className="grid gap-6 sm:grid-cols-2">
            {project.technologies.map((g) => (
              <div key={g.group}>
                <dt className="mb-2 text-sm font-semibold">{g.group}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2" aria-label={g.group}>
                    {g.items.map((i) => (
                      <li key={i}>
                        <Tag>{i}</Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <nav aria-label="More projects" className="mt-20 border-t border-border pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {projects
              .filter((p) => p.slug !== project.slug)
              .map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="font-semibold text-accent">
                    {p.title} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </>
  );
}
