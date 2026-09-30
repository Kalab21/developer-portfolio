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
        Forward Deployed Engineering and applied AI roles.
      </PageHeader>
      <Container className="py-12 sm:py-16">
        <ul className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <li className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-semibold">Email</h2>
            <p className="mt-2 break-words text-muted">{site.email}</p>
            <div className="mt-4">
              <ButtonLink href={`mailto:${site.email}`} variant="primary" external>
                Send an email
              </ButtonLink>
            </div>
          </li>
          <li className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-semibold">GitHub</h2>
            <p className="mt-2 text-muted">github.com/Kalab21</p>
            <div className="mt-4">
              <ButtonLink href={site.github} external>
                View GitHub profile
              </ButtonLink>
            </div>
          </li>
        </ul>
        <p className="mt-8 text-muted">Based in {site.location}.</p>
      </Container>
    </>
  );
}
