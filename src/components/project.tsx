import Image from "next/image";
import Link from "next/link";
import type { Project, Screenshot, Stat } from "@/data/projects";
import { TagList } from "./ui";

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

/** One-line request/data path: left to right on wider screens, top to bottom on phones. */
export function ArchitectureAtGlance({ stages }: { stages: string[] }) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Architecture at a glance</h3>
      <ol className="mt-3 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-2">
        {stages.map((stage, i) => (
          <li key={stage} className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-2">
            <span className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium">
              {stage}
            </span>
            {i < stages.length - 1 && (
              <span aria-hidden="true" className="pl-4 text-sm text-muted sm:pl-0">
                <span className="sm:hidden">↓</span>
                <span className="hidden sm:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ArchitectureDiagram({
  diagram,
}: {
  diagram: NonNullable<Project["architecture"]["diagram"]>;
}) {
  // A tall, text-heavy diagram keeps a readable minimum width and scrolls sideways on phones;
  // a compact one is capped so it does not fill the page.
  const minWidth = diagram.stacked ? "min-w-[860px]" : "";
  return (
    <figure
      className={`overflow-x-auto rounded-xl border border-border bg-surface ${diagram.stacked ? "" : "max-w-3xl"}`}
    >
      <Image
        src={diagram.light}
        alt={diagram.alt}
        width={diagram.width}
        height={diagram.height}
        unoptimized
        className={`h-auto w-full dark:hidden ${minWidth}`}
      />
      <Image
        src={diagram.dark}
        alt={diagram.alt}
        width={diagram.width}
        height={diagram.height}
        unoptimized
        className={`hidden h-auto w-full dark:block ${minWidth}`}
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

function CardImage({ image }: { image: Screenshot }) {
  const svg = image.src.endsWith(".svg");
  // Show the whole image: screenshots and diagrams are never cropped in the card.
  const fit = image.fit === "cover" ? "object-cover object-top" : "object-contain p-4 sm:p-5";
  const sizes = "(min-width: 768px) 45vw, 100vw";
  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        unoptimized={svg}
        className={`${fit} ${image.darkSrc ? "dark:hidden" : ""}`}
      />
      {image.darkSrc && (
        <Image
          src={image.darkSrc}
          alt={image.alt}
          fill
          sizes={sizes}
          unoptimized={svg}
          className={`${fit} hidden dark:block`}
        />
      )}
    </>
  );
}

/** One project as a row: image on the left, name and description beside it. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const image = project.cardImage ?? project.screenshots[0];
  return (
    <article className="group relative grid overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow hover:border-accent hover:shadow-lg md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="relative aspect-[16/10] border-b border-border bg-surface-muted md:aspect-auto md:min-h-[320px] md:border-b-0 md:border-r">
        {image && <CardImage image={image} />}
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          <span className="text-muted">0{index + 1}</span> · {project.category}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 font-medium text-muted">{project.subtitle}</p>
        <p className="mt-4 leading-7 text-muted">{project.cardSummary ?? project.summary}</p>
        <div className="mt-5">
          <TagList
            label={`${project.title} technologies`}
            items={project.cardTags ?? project.technologies.flatMap((g) => g.items).slice(0, 8)}
          />
        </div>
        <p className="mt-auto pt-6 text-sm font-semibold text-accent">
          View case study <span aria-hidden="true">→</span>
        </p>
      </div>
    </article>
  );
}
