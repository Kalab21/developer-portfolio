import type { Metadata } from "next";
import { ButtonLink, Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Kalab Kebede, Senior Software Engineer and Forward Deployed Engineer (PDF).",
};

export default function ResumePage() {
  return (
    <>
      <PageHeader eyebrow="Resume" title="Resume">
        A two-page PDF covering experience, skills and selected projects, with contact details.
      </PageHeader>
      <Container className="py-12 sm:py-16">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/Kalab-Kebede-Resume.pdf" variant="primary" external>
            Open PDF
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
