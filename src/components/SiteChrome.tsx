import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "./ui";
import { NavMenu } from "./NavMenu";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <Container className="relative flex items-center justify-between py-3">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {site.name}
        </Link>
        <NavMenu items={nav} />
      </Container>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-10 text-sm text-muted">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-5">
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <Link href="/resume" className="hover:text-foreground">
              Resume
            </Link>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              Email
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
