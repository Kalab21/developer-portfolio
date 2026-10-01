import type { Metadata } from "next";
import { site } from "@/data/site";
import { formatResumeDate, resume } from "@/data/resume";
import { ButtonLink, Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, Senior Software Engineer and Forward Deployed Engineer (PDF).`,
};

export default function ResumePage() {
  return (
    <>
      <PageHeader eyebrow="Resume" title="Resume">
        A two-page summary of my experience, skills and selected projects, covering
        enterprise Java, distributed and data systems, and forward deployed AI work.
      </PageHeader>
      <Container className="py-12 sm:py-16">
        <div className="max-w-2xl rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <p className="font-semibold">{site.name}</p>
          <p className="mt-1 text-muted">{site.title}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={site.resumePath} variant="primary" external>
              Open Resume
            </ButtonLink>
            <ButtonLink href={site.resumePath} download>
              Download PDF
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-muted">
            Resume last updated:{" "}
            <time dateTime={resume.lastUpdated}>{formatResumeDate(resume.lastUpdated)}</time>
          </p>
        </div>
      </Container>
    </>
  );
}
