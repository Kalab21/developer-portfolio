import type { Metadata } from "next";
import { site } from "@/data/site";
import { ButtonLink, Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about Senior Software Engineer, Java / Spring, distributed systems, data engineering, Forward Deployed Engineer and applied AI roles.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk">
        I am interested in senior software, distributed systems, data engineering,
        Forward Deployed Engineering and applied AI roles. The best way to reach me
        right now is through GitHub.
      </PageHeader>
      <Container className="py-12 sm:py-16">
        <ul className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <li className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-semibold">GitHub</h2>
            <p className="mt-2 text-muted">github.com/Kalab21</p>
            <div className="mt-4">
              <ButtonLink href={site.github} variant="primary" external>
                View GitHub profile
              </ButtonLink>
            </div>
          </li>
          <li className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-semibold">Resume</h2>
            <p className="mt-2 text-muted">Two-page PDF summary of experience and projects.</p>
            <div className="mt-4">
              <ButtonLink href="/resume">View resume</ButtonLink>
            </div>
          </li>
        </ul>
      </Container>
    </>
  );
}
