import type { Role } from "@/data/site";
import { TagList } from "./ui";

export function RoleCard({ role }: { role: Role }) {
  return (
    <article
      id={role.id}
      className="relative rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {role.company}
          </h2>
          <p className="text-base text-foreground">{role.title}</p>
        </div>
        <p className="font-mono text-sm text-muted">{role.period}</p>
      </header>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">
        {role.focus}
      </p>
      <p className="mt-4 max-w-3xl leading-7 text-muted">{role.summary}</p>

      {role.engagements && (
        <div className="mt-6 space-y-6">
          {role.engagements.map((e) => (
            <section
              key={e.name}
              aria-label={e.name}
              className="rounded-xl border border-border bg-surface-muted p-5"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-semibold">{e.name}</h3>
                <p className="font-mono text-xs text-muted">{e.period}</p>
              </div>
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
        <ul className="mt-6 list-disc space-y-2 pl-5 leading-7 marker:text-accent">
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
