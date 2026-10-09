import { resume } from "./resume";

export const site = {
  name: "Kalabe Kebede",
  title: "Senior Software Engineer | Forward Deployed Engineer",
  tagline:
    "Java · Spring Boot · Distributed Systems · Kafka · AWS · Next.js · Python/FastAPI · Agentic AI & RAG",
  valueProp:
    "6+ years building Java/Spring Boot distributed systems, microservices and full-stack platforms for banking, insurance and analytics. Forward Deployed delivery on inherited platforms, with recent work in agentic AI and RAG.",
  currentFocus: [
    "Java & Spring distributed systems",
    "Forward Deployed Engineering",
    "Agentic AI & RAG",
  ],
  /** Canonical production origin, used for metadata, the sitemap and robots.txt. */
  url: "https://developer-portfolio-iota-ten.vercel.app",
  metaTitle: "Kalabe Kebede | Senior Software Engineer & Forward Deployed Engineer",
  metaDescription:
    "Senior Software Engineer and Forward Deployed Engineer: Java/Spring Boot distributed systems, microservices and Kafka; full-stack React and Next.js; AWS and data; Python/FastAPI; agentic AI and RAG.",
  github: "https://github.com/Kalab21",
  email: "kalabkebe12@gmail.com",
  resumePath: `/${resume.fileName}`,
  domains: [
    "Banking",
    "Financial Services",
    "Insurance",
    "Data Engineering & Analytics",
    "Applied AI",
  ],
} as const;

export type Expertise = {
  title: string;
  summary: string;
  tags: string[];
};

/** Ordered by professional identity: Java/distributed first, AI last. */
export const expertise: Expertise[] = [
  {
    title: "Backend & Distributed Systems",
    summary:
      "Java, Spring Boot, Kafka, microservices, APIs, transaction processing, concurrency.",
    tags: ["Java 8–21", "Spring Boot", "Kafka", "Microservices", "Idempotency"],
  },
  {
    title: "Forward Deployed Engineering",
    summary:
      "Taking over inherited systems: tracing how they really work, turning requirements into specs and ADRs, and shipping verified changes without breaking contracts.",
    tags: ["Brownfield Analysis", "Spec-Driven Development", "ADRs", "Stakeholder Collaboration"],
  },
  {
    title: "Full Stack, Cloud & Data",
    summary:
      "Next.js and React in TypeScript, Python/FastAPI services, SQL and AWS data workflows, containers and CI/CD.",
    tags: ["Next.js", "React", "TypeScript", "FastAPI", "AWS", "SQL"],
  },
  {
    title: "Applied & Agentic AI",
    summary:
      "RAG and retrieval, LangGraph orchestration, tool-using LangChain agents with bounded tool calling, LangSmith tracing and evaluation, kept advisory next to the system of record.",
    tags: ["RAG", "LangGraph", "Multi-Agent Orchestration", "LangSmith", "AWS Bedrock"],
  },
];

export type SkillGroup = { title: string; skills: string[] };

/** Same order as the resume: Java/distributed, FDE, full stack, data and cloud, AI, retrieval, delivery. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Backend & Distributed Systems",
    skills: [
      "Java 8–21",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Spring MVC",
      "REST APIs",
      "Microservices",
      "Kafka",
      "Event-Driven Architecture",
      "Concurrency",
      "Idempotency",
      "Transactional Outbox",
      "API Gateway",
      "OpenFeign",
    ],
  },
  {
    title: "Forward Deployed Engineering",
    skills: [
      "Brownfield Analysis",
      "Requirements Synthesis",
      "Workflow & Data-Flow Mapping",
      "Spec-Driven Development",
      "ADRs",
      "Stakeholder Collaboration",
      "Troubleshooting",
      "Solution Design",
    ],
  },
  {
    title: "Full Stack",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "FastAPI",
      "Tailwind CSS",
      "Thymeleaf",
      "Bootstrap",
    ],
  },
  {
    title: "Data & Cloud",
    skills: [
      "SQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Oracle",
      "MySQL",
      "AWS",
      "S3",
      "RDS",
      "Athena",
      "Glue",
      "ETL/ELT",
      "Data Modeling",
      "Power BI",
    ],
  },
  {
    title: "AI & Agentic Systems",
    skills: [
      "RAG",
      "LangChain",
      "LangGraph",
      "Agentic AI",
      "Multi-Agent Orchestration",
      "LangSmith",
      "AWS Bedrock",
      "Tool Calling",
      "Human-in-the-Loop",
      "AI Evaluation",
      "MCP",
    ],
  },
  {
    title: "Retrieval & LLM Engineering",
    skills: [
      "Vector Search",
      "pgvector",
      "Embeddings",
      "Hybrid Retrieval",
      "Reranking",
      "Evidence Gating",
      "Citation Validation",
    ],
  },
  {
    title: "DevOps, Reliability, Security & Testing",
    skills: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Jenkins",
      "CI/CD",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Distributed Tracing",
      "OAuth2/OIDC",
      "JWT",
      "RBAC",
      "JUnit 5",
      "Mockito",
      "Pytest",
      "Playwright",
      "Testcontainers",
    ],
  },
];

export type Engagement = {
  name: string;
  points: string[];
  stack: string[];
};

export type Role = {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  focus: string;
  /** Rendered more compactly on the timeline. */
  secondary?: boolean;
  summary: string;
  engagements?: Engagement[];
  points?: string[];
  stack?: string[];
};

export const roles: Role[] = [
  {
    id: "revature",
    company: "Revature",
    title: "Forward Deployed Engineer",
    period: "May 2026 – Sep 2026",
    location: "Remote",
    focus: "Forward Deployed Engineering · Applied AI",
    summary:
      "Two engagements on inherited, partially built platforms: learn how the existing system works, close the gaps, and ship verified changes.",
    engagements: [
      {
        name: "Meridian Lending — Consumer Lending Platform",
        points: [
          "Modernized an inherited lending platform spanning intake, identity verification, credit decisioning, manual review, disclosures, payments, servicing and reconciliation.",
          "Built grounded and agentic AI with LangChain, LangGraph and AWS Bedrock: a RAG policy assistant, an underwriting-summary agent with a bounded policy tool, and a two-node LangGraph disclosure orchestration whose deterministic nodes never call a model. The AI is advisory; credit decisions stay in the core lending workflow, which remains the system of record.",
          "Added privacy-safe LangSmith tracing from the gateway through retrieval, the model call and the agent run, plus a retrieval evaluation harness and human review on AI output.",
          "Strengthened RBAC, decision finality, idempotency, auditability and data-integrity controls.",
          "Translated business and regulatory requirements into specifications and ADRs; added automated verification for lending calculations, plus logging, metrics, tracing and CI gates.",
        ],
        stack: ["Python", "FastAPI", "LangChain", "LangGraph", "Multi-Agent Orchestration", "LangSmith", "AWS Bedrock", "RAG", "Tool Calling", "PostgreSQL", "Redis", "JWT/RBAC", "Next.js", "TypeScript", "Prometheus/Grafana", "Pytest", "Playwright"],
      },
      {
        name: "Rev-Eval — Skills Assessment Platform",
        points: [
          "Completed trainer, reporting, participant and role-aware workflows across FastAPI and Next.js services.",
          "Built the quiz scoring engine with idempotent submissions and row locking, and the Reporting & Analytics service.",
          "Wired Nginx and API-gateway routing, hardened gateway authentication, and built PostgreSQL/MongoDB-backed features.",
        ],
        stack: ["Python", "FastAPI", "Next.js", "React", "TypeScript", "Recharts", "PostgreSQL", "MongoDB", "JWT/RBAC", "Nginx", "Docker Compose", "CI/CD"],
      },
    ],
  },
  {
    id: "lovelytics",
    company: "Lovelytics",
    title: "Data & Analytics Engineer",
    period: "Dec 2024 – Nov 2025",
    location: "Remote",
    focus: "Data engineering · Analytics",
    summary:
      "Enterprise analytics and reporting: turning stakeholder needs into modeled, trustworthy KPIs.",
    points: [
      "Designed SQL-based analytics and reporting solutions using PostgreSQL/MySQL, ETL/ELT, Power BI and dimensional modeling; translated stakeholder needs into maintainable KPI models and dashboards.",
      "Built AWS analytics workflows with Athena, S3, Glue and RDS, and implemented validation and data-quality checks that improved reliability of downstream reporting.",
      "Optimized analytical SQL with CTEs, window functions, indexing, aggregation and caching; automated recurring reporting and transformation workflows with Power Query and DAX.",
    ],
    stack: ["SQL", "AWS Athena", "Glue", "S3", "RDS", "Power BI", "DAX", "Power Query", "PostgreSQL", "MySQL"],
  },
  {
    id: "scale-ai",
    company: "Scale AI / Outlier AI",
    title: "AI Data Specialist (Flexible / Task-Based Contract)",
    period: "Apr 2024 – Feb 2025",
    location: "Remote",
    focus: "AI evaluation",
    secondary: true,
    summary: "Task-based contract work alongside other roles, reviewing AI-generated data and responses.",
    points: [
      "Validated and refined AI-generated datasets and responses for factual accuracy, semantic quality, instruction adherence, and alignment with task requirements and business logic.",
      "Performed reviewer-level quality checks on peer submissions and provided targeted feedback to improve consistency and output quality.",
    ],
    stack: ["AI evaluation", "Data validation", "Quality review"],
  },
  {
    id: "jpmorgan",
    company: "JPMorgan Chase",
    title: "Java Software Engineer (Contract)",
    period: "May 2024 – Sep 2024",
    location: "Columbus, OH · Hybrid",
    focus: "Enterprise banking modernization",
    summary: "Banking platform modernization in a compliance-sensitive environment.",
    points: [
      "Modernized enterprise banking services with Java and Spring Boot, improving API and database efficiency, maintainability and deployment reliability.",
      "Built secure microservices and integrations using Spring Security, JPA, Oracle, Redis, AWS, REST APIs, SFTP and SMTP; supported issues across application, integration and data layers.",
      "Improved reliability through query tuning, caching, automated tests, exception handling, Docker/Kubernetes practices, code reviews and production support.",
    ],
    stack: ["Java 8/17/21", "Spring Boot", "Spring Security", "REST APIs", "Oracle", "Redis", "AWS", "Docker", "Kubernetes", "JUnit 5"],
  },
  {
    id: "investors-bank",
    company: "Investors Bank",
    title: "Java Software Engineer",
    period: "Apr 2021 – Dec 2023",
    location: "Remote",
    focus: "Core banking · Distributed systems",
    summary: "Legacy banking workflows modernized into event-driven microservices.",
    points: [
      "Modernized legacy banking workflows into Spring Boot microservices and Kafka-based event-driven services using PostgreSQL and Redis while preserving transaction and data integrity.",
      "Improved database and backend performance through SQL refactoring, indexing, caching and asynchronous processing; supported production troubleshooting across distributed services.",
      "Automated build, test and delivery workflows with Jenkins and GitHub Actions and collaborated with architects, QA and business partners on incremental modernization.",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Microservices", "Jenkins", "GitHub Actions"],
  },
  {
    id: "erie",
    company: "Erie Insurance",
    title: "Java Software Engineer",
    period: "Mar 2019 – Feb 2021",
    location: "Erie, PA · Hybrid",
    focus: "Insurance · Enterprise Java",
    summary: "Claims and policy management backend services.",
    points: [
      "Developed Java backend services and REST APIs supporting claims, policies, customers and transaction-processing workflows.",
      "Implemented concurrency-safe processing, Hibernate/JPA persistence, MySQL query optimization and automated testing for business-critical services.",
      "Worked with engineering and QA teams on defect resolution, production troubleshooting, reliability, maintainability and application performance.",
    ],
    stack: ["Java", "Spring", "Hibernate/JPA", "MySQL", "Concurrency", "JUnit", "Mockito"],
  },
];

export const education = [
  "B.S. Computer Science — Maharishi International University (2023)",
  "B.S. Electrical and Computer Engineering — Haramaya University (2015)",
  "Data Analytics Certificate — Per Scholas",
];

/** Market-defining skills shown with extra prominence on the About page. */
export const featuredSkills: ReadonlySet<string> = new Set([
  "Java 8–21",
  "Spring Boot",
  "Microservices",
  "Kafka",
  "Brownfield Analysis",
  "React",
  "Next.js",
  "TypeScript",
  "FastAPI",
  "SQL",
  "AWS",
  "RAG",
  "LangGraph",
  "Agentic AI",
]);
