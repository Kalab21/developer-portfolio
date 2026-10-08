import type { Metadata } from "next";
import { education, roles } from "@/data/site";
import { RoleCard } from "@/components/experience";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Career timeline: Forward Deployed Engineering at Revature, data and analytics engineering at Lovelytics, AI data review at Scale AI, and Java engineering at JPMorgan Chase, Investors Bank and Erie Insurance.",
  alternates: { canonical: "/experience" },
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
        <ol className="relative space-y-8 border-l-2 border-border pl-6 sm:pl-10">
          {roles.map((r) => (
            <li key={r.id} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[calc(1.5rem+7px)] top-8 h-3 w-3 rounded-full ring-4 ring-background sm:-left-[calc(2.5rem+7px)] ${
                  r.secondary ? "bg-border" : "bg-accent"
                }`}
              />
              <RoleCard role={r} />
            </li>
          ))}
        </ol>

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
