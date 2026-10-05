import Image from "next/image";
import Link from "next/link";
import type { ArchitectureTier, Project, Screenshot, Stat } from "@/data/projects";
import { Badge, TagList } from "./ui";

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse justify-end rounded-xl border border-border bg-surface p-4 shadow-card">
          <dt className="mt-1 text-sm leading-5 text-muted">{s.label}</dt>
          <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ArchitectureFlow({ tiers }: { tiers: ArchitectureTier[] }) {
  return (
    <ol className="space-y-3">
      {tiers.map((tier, i) => (
        <li key={tier.label}>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
              {tier.label}
            </p>
            <ul className="flex flex-wrap gap-2">
              {tier.nodes.map((n) => (
                <li
                  key={n.name}
                  className="rounded-md border border-border bg-surface-muted px-3 py-2 text-sm"
                >
                  <span className="font-medium">{n.name}</span>
                  {n.detail && <span className="block text-xs text-muted">{n.detail}</span>}
                </li>
              ))}
            </ul>
          </div>
          {i < tiers.length - 1 && (
            <p aria-hidden="true" className="py-1 text-center text-muted">
              ↓
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

export function ArchitectureDiagram({
  diagram,
}: {
  diagram: NonNullable<Project["architecture"]["diagram"]>;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface">
      <Image
        src={diagram.light}
        alt={diagram.alt}
        width={diagram.width}
        height={diagram.height}
        unoptimized
        className="h-auto w-full dark:hidden"
      />
      <Image
        src={diagram.dark}
        alt={diagram.alt}
        width={diagram.width}
        height={diagram.height}
        unoptimized
        className="hidden h-auto w-full dark:block"
      />
    </figure>
  );
}

export function Shot({
  shot,
  priority,
  sizes,
}: {
  shot: Screenshot;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          priority={priority}
          sizes={sizes ?? "(min-width: 1152px) 1100px, 100vw"}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-2 text-sm text-muted">{shot.caption}</figcaption>
    </figure>
  );
}

export function ProjectCard({
  project,
  index,
  flagship = false,
}: {
  project: Project;
  index: number;
  flagship?: boolean;
}) {
  const image = project.cardImage ?? project.screenshots[0];
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-surface shadow-card transition-shadow hover:shadow-lg ${
        flagship ? "border-accent lg:col-span-3 lg:flex-row" : "border-border"
      }`}
    >
      <div
        className={`overflow-hidden border-border bg-surface-muted ${
          flagship ? "lg:w-1/2 lg:border-r" : "border-b"
        }`}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={Math.min(image.height, image.width * 0.62)}
            sizes={flagship ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 360px, 100vw"}
            className="aspect-[16/10] w-full object-cover object-top"
          />
        ) : (
          <div className="flex aspect-[16/10] flex-col justify-center gap-2 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {project.architecture.tiers[2].label}
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.architecture.tiers[2].nodes.map((n) => (
                <li key={n.name} className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium">
                  {n.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-6 ${flagship ? "lg:p-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{project.badge}</Badge>
          <span className="font-mono text-xs text-muted">0{index + 1}</span>
        </div>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-accent">
          {project.category}
        </p>
        <h3 className={`mt-2 font-semibold tracking-tight ${flagship ? "text-3xl" : "text-xl"}`}>
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
        <p className="mt-4 text-sm leading-6 text-muted">{project.cardSummary ?? project.summary}</p>
        <div className="mt-5">
          <TagList
            label={`${project.title} technologies`}
            items={project.cardTags ?? project.technologies.flatMap((g) => g.items).slice(0, flagship ? 8 : 5)}
          />
        </div>
        <p className="mt-6 text-sm font-semibold text-accent">
          View case study <span aria-hidden="true">→</span>
        </p>
      </div>
    </article>
  );
}
