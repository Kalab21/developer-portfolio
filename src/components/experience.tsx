import type { Role } from "@/data/site";
import { TagList } from "./ui";

export function RoleCard({ role }: { role: Role }) {
  const compact = role.secondary === true;
  return (
    <article
      id={role.id}
      className={`scroll-mt-24 rounded-2xl border border-border bg-surface shadow-card ${
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
      }`}
    >
      <header>
        <h2
          className={`font-semibold tracking-tight ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          {role.company}
        </h2>
        <p className="mt-0.5 text-base">{role.title}</p>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm text-muted">
          <span>{role.location}</span>
          <span aria-hidden="true">·</span>
          <span>{role.period}</span>
        </p>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-accent">
          {role.focus}
        </p>
      </header>
      <p className="mt-4 max-w-3xl leading-7 text-muted">{role.summary}</p>

      {role.engagements && (
        <div className="mt-6 space-y-5">
          {role.engagements.map((e) => (
            <section
              key={e.name}
              aria-label={e.name}
              className="rounded-xl border border-border border-l-4 border-l-accent bg-surface-muted p-5"
            >
              <h3 className="text-lg font-semibold">{e.name}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 marker:text-accent">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="mt-4">
                <TagList items={e.stack} label={`${e.name} technologies`} />
              </div>
            </section>
          ))}
        </div>
      )}

      {role.points && (
        <ul className="mt-5 list-disc space-y-2 pl-5 leading-7 marker:text-accent">
          {role.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {role.stack && (
        <div className="mt-5">
          <TagList items={role.stack} label={`${role.company} technologies`} />
        </div>
      )}
    </article>
  );
}
