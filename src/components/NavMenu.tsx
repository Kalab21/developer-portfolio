"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Item = { href: string; label: string };

export function NavMenu({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex items-center gap-1 text-sm">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-md px-3 py-2 transition-colors hover:text-foreground ${
                  isActive(item.href) ? "font-semibold text-foreground" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        Menu
        <span aria-hidden="true" className="font-mono text-xs">
          {open ? "×" : "≡"}
        </span>
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute inset-x-0 top-full border-b border-border bg-background shadow-lg md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {items.map((item) => (
              <li key={item.href} className="border-b border-border last:border-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-base ${
                    isActive(item.href) ? "font-semibold text-accent" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
