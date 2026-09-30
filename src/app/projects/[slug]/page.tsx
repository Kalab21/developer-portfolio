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
import {
  Badge,
  ButtonLink,
  Container,
  PageHeader,
  SectionHeading,
  Tag,
} from "@/components/ui";

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
      images: image
        ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }]
        : undefined,
    },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2.5 pl-5 leading-7 marker:text-accent">
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
          <Badge>{project.badge}</Badge>
          <p className="text-sm text-muted">{project.ownershipNote}</p>
        </div>

        {/* Overview */}
        <section aria-labelledby="overview" className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div>
            <h2 id="overview" className="sr-only">
              Overview
            </h2>
            <p className="text-xl leading-9">{project.summary}</p>
            {project.context.map((c) => (
              <p key={c} className="mt-5 leading-8 text-muted">
                {c}
              </p>
            ))}
          </div>
          <aside
            aria-label="Role and links"
            className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-card"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">My role</h3>
            <p className="mt-2 leading-7">{project.role}</p>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href={project.repository.url} variant="primary" external>
                {project.repository.label}
              </ButtonLink>
              {project.extraLinks?.map((l) => (
                <ButtonLink key={l.url} href={l.url} external>
                  {l.label}
                </ButtonLink>
              ))}
            </div>
            {project.repository.note && (
              <p className="mt-4 text-sm leading-6 text-muted">{project.repository.note}</p>
            )}
          </aside>
        </section>

        {/* Stats */}
        <div className="mt-10">
          <StatGrid stats={project.stats} />
        </div>

        {heroShot && (
          <div className="mt-12">
            <Shot shot={heroShot} priority />
          </div>
        )}

        {/* Architecture */}
        <section aria-labelledby="architecture" className="mt-20">
          <SectionHeading
            eyebrow="Architecture"
            title="How it fits together"
            headingId="architecture"
          >
            {project.architecture.description}
          </SectionHeading>
          <div
            className={`grid items-start gap-8 ${
              project.architecture.diagram ? "lg:grid-cols-2" : "max-w-4xl"
            }`}
          >
            <ArchitectureFlow tiers={project.architecture.tiers} />
            {project.architecture.diagram && (
              <ArchitectureDiagram diagram={project.architecture.diagram} />
            )}
          </div>
        </section>

        {/* Contributions (team projects) */}
        {project.contributions && (
          <section
            aria-labelledby="contributions"
            className="mt-20 rounded-2xl border border-accent bg-accent-soft p-6 sm:p-10"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {isTeam ? "Team project" : "Contributions"}
            </p>
            <h2 id="contributions" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              My Engineering Contributions
            </h2>
            <div className="mt-6 max-w-4xl">
              <BulletList items={project.contributions} />
            </div>
          </section>
        )}

        {/* Highlights */}
        <section aria-labelledby="evidence" className="mt-20">
          <SectionHeading
            eyebrow="Engineering evidence"
            title="What the code demonstrates"
            headingId="evidence"
          />
          <ol className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {project.highlights.map((h, i) => (
              <li key={h.title} className="border-t border-border pt-5">
                <p className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{h.title}</h3>
                <p className="mt-2 leading-7 text-muted">{h.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Security & reliability */}
        <div className="mt-20 grid overflow-hidden rounded-2xl border border-border bg-surface shadow-card md:grid-cols-2 md:divide-x md:divide-border">
          <section aria-labelledby="security" className="p-6 sm:p-8">
            <h2 id="security" className="mb-4 text-xl font-semibold">
              Security
            </h2>
            <BulletList items={project.security} />
          </section>
          <section
            aria-labelledby="reliability"
            className="border-t border-border p-6 sm:p-8 md:border-t-0"
          >
            <h2 id="reliability" className="mb-4 text-xl font-semibold">
              Reliability
            </h2>
            <BulletList items={project.reliability} />
          </section>
        </div>

        {/* Testing */}
        <section aria-labelledby="testing" className="mt-20">
          <SectionHeading eyebrow="Testing" title="Verification" headingId="testing">
            {project.testing.summary}
          </SectionHeading>
          <StatGrid stats={project.testing.stats} />
          <div className="mt-6 max-w-3xl text-muted">
            <BulletList items={project.testing.notes} />
          </div>
        </section>

        {/* Scope */}
        <section
          aria-labelledby="scope"
          className="mt-20 border-l-4 border-accent-2 bg-surface-muted p-6 sm:p-8"
        >
          <h2 id="scope" className="mb-4 text-xl font-semibold">
            Scope
          </h2>
          <BulletList items={project.scope} />
        </section>

        {/* More screenshots */}
        {moreShots.length > 0 && (
          <section aria-labelledby="screens" className="mt-20">
            <SectionHeading eyebrow="Screenshots" title="More of the product" headingId="screens" />
            <div className="grid gap-8 md:grid-cols-2">
              {moreShots.map((s) => (
                <Shot key={s.src} shot={s} sizes="(min-width: 768px) 540px, 100vw" />
              ))}
            </div>
          </section>
        )}

        {/* Stack */}
        <section aria-labelledby="stack" className="mt-20">
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

        {/* Source links + next */}
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
