import type { Metadata } from "next";
import { education, roles } from "@/data/site";
import { RoleCard } from "@/components/experience";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Career timeline: Forward Deployed Engineering at Revature, data and analytics engineering at Lovelytics, and Java engineering at JPMorgan Chase, Investors Bank and Erie Insurance.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="6+ years, widening scope">
        Enterprise Java in insurance and banking, distributed-systems modernization, data
        and analytics engineering, and most recently Forward Deployed Engineering with
        applied AI. Most recent first.
      </PageHeader>
      <Container className="py-12 sm:py-16">
        <div className="space-y-8">
          {roles.map((r) => (
            <RoleCard key={r.id} role={r} />
          ))}
        </div>

        <section aria-labelledby="education" className="mt-16">
          <h2 id="education" className="mb-4 text-xl font-semibold">
            Education
          </h2>
          <ul className="space-y-2 text-muted">
            {education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
