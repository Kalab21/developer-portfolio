import type { Metadata } from "next";
import { featuredSkills, skillGroups } from "@/data/site";
import { Container, PageHeader, SectionHeading, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer whose scope grew from enterprise Java to distributed systems, data and cloud engineering, forward deployed engineering and applied AI.",
};

const path = [
  { step: "Enterprise Java", note: "Insurance and banking backends" },
  { step: "Distributed Systems", note: "Kafka, microservices, transactions" },
  { step: "Data / Cloud Engineering", note: "SQL, AWS data services, BI" },
  { step: "Forward Deployed Engineering", note: "Brownfield systems, clients" },
  { step: "Applied AI Systems", note: "RAG, LLM apps, evaluation" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="An engineer whose scope kept expanding">
        I am a software engineer with 6+ years across banking, financial services,
        insurance and analytics. I started in enterprise Java and kept taking on the
        problems around it.
      </PageHeader>

      <Container className="py-12 sm:py-16">
        <section aria-labelledby="path">
          <h2 id="path" className="sr-only">
            Career path
          </h2>
          <ol className="flex flex-col lg:flex-row lg:items-stretch">
            {path.map((p, i) => (
              <li key={p.step} className="flex flex-1 flex-col lg:flex-row lg:items-stretch">
                <div className="flex-1 rounded-xl border border-border bg-surface p-4 shadow-card">
                  <p className="font-mono text-xs text-accent">0{i + 1}</p>
                  <p className="mt-1 font-semibold leading-snug">{p.step}</p>
                  <p className="mt-1 text-sm text-muted">{p.note}</p>
                </div>
                {i < path.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center py-2 font-mono text-accent lg:px-2 lg:py-0"
                  >
                    <span className="lg:hidden">↓</span>
                    <span className="hidden lg:inline">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 max-w-3xl space-y-5 text-lg leading-8">
          <p>
            I began with claims and policy systems at Erie Insurance, where concurrency,
            SQL performance and production reliability were the daily work. At Investors
            Bank I moved a legacy core-banking platform toward Spring Boot microservices
            and Kafka-based workflows while preserving transaction integrity, and at
            JPMorgan Chase I modernized banking services with Spring Security, Oracle,
            Redis and AWS.
          </p>
          <p>
            Java is still the core of how I build backends. What changed is the scope:
            analytics and data engineering at Lovelytics, then Forward Deployed
            Engineering at Revature, where the job is to walk into an inherited system,
            understand how it really works, talk to the people who depend on it, and
            close the gaps with specifications, tests and controls.
          </p>
          <p>
            That is also where I started building AI features, as an engineer rather than
            a researcher: retrieval grounded in approved policy, kept advisory next to the
            system of record, with evaluation and human review around it. I care about
            authorization boundaries, idempotency, reconciliation and observability more
            than about any one framework.
          </p>
        </section>

        <section aria-labelledby="skills" className="mt-20">
          <SectionHeading
            eyebrow="Skills"
            title="Grouped by what I use them for"
            headingId="skills"
          >
            No percentages or star ratings. Highlighted skills are the ones I use most
            across the projects and roles on this site.
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2">
            {skillGroups.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-card"
              >
                <h3 className="mb-4 text-lg font-semibold">{g.title}</h3>
                <ul className="flex flex-wrap gap-2" aria-label={g.title}>
                  {g.skills.map((s) => (
                    <li key={s}>
                      {featuredSkills.has(s) ? (
                        <span className="inline-block rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-contrast">
                          {s}
                        </span>
                      ) : (
                        <Tag>{s}</Tag>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
