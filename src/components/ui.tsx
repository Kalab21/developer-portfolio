import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground">
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: readonly string[]; label?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  headingId,
  children,
}: {
  eyebrow?: string;
  title: string;
  headingId?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {children && <p className="mt-3 text-base leading-7 text-muted">{children}</p>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border pb-10 pt-12 sm:pt-16">
      <Container>
        {eyebrow && (
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {children && (
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{children}</p>
        )}
      </Container>
    </header>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  download?: boolean;
};

export function ButtonLink({ href, children, variant = "secondary", external, download }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-contrast hover:opacity-90"
      : "border border-border bg-surface text-foreground shadow-sm hover:bg-surface-muted";
  if (download) {
    return (
      <a href={href} download className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }
  if (external) {
    return (
      <a
        href={href}
        className={`${base} ${styles}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

export function Badge({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        tone === "accent"
          ? "bg-accent-soft text-accent"
          : "border border-border bg-surface-muted text-foreground"
      }`}
    >
      {children}
    </span>
  );
}
