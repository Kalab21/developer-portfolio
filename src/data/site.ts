import { resume } from "./resume";

export const site = {
  name: "Kalabe Kebede",
  title: "Senior Software Engineer | Forward Deployed Engineer",
  specialties: [
    "Java",
    "Spring Boot",
    "Distributed Systems",
    "AWS",
    "Kafka",
    "SQL & Data Engineering",
    "Python/FastAPI",
    "RAG & GenAI",
  ],
  tagline:
    "Java · Spring Boot · Distributed Systems · AWS · Kafka · SQL & Data Engineering · Python/FastAPI · RAG & GenAI",
  valueProp:
    "6+ years building enterprise software, distributed and data systems, and AI-enabled applications across banking, insurance, analytics, and Forward Deployed Engineering engagements.",
  currentFocus: [
    "Distributed systems",
    "Forward Deployed Engineering",
    "Applied AI",
  ],
  metaTitle: "Kalabe Kebede | Senior Software Engineer & Forward Deployed Engineer",
  metaDescription:
    "Senior Software Engineer and Forward Deployed Engineer with 6+ years across Java and Spring Boot, distributed systems, cloud, data engineering and applied AI (RAG, FastAPI).",
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

export const expertise: Expertise[] = [
  {
    title: "Software & Distributed Systems",
    summary:
      "Java, Spring Boot, Kafka, microservices, APIs, transaction processing, concurrency.",
    tags: ["Java 8–21", "Spring Boot", "Kafka", "Microservices", "Idempotency"],
  },
  {
    title: "Data Engineering & Analytics",
    summary: "SQL, ETL/ELT, AWS data services, data quality, modeling, BI.",
    tags: ["Advanced SQL", "PostgreSQL", "Athena · Glue · S3", "Power BI"],
  },
  {
    title: "Forward Deployed & Applied AI",
    summary:
      "Python, FastAPI, RAG, LLM applications, evaluation, requirements discovery.",
    tags: ["FastAPI", "RAG", "LLM integration", "Brownfield analysis"],
  },
  {
    title: "Cloud, Reliability & Delivery",
    summary:
      "AWS, Docker, Kubernetes, CI/CD, observability, security, testing.",
    tags: ["AWS", "Docker · Kubernetes", "GitHub Actions", "Observability"],
  },
];

export type SkillGroup = { title: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Software & Distributed Systems",
    skills: [
      "Java 8–21",
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Spring Data JPA",
      "REST APIs",
      "Microservices",
      "Kafka",
      "Event-Driven Architecture",
      "API Gateway",
      "Concurrency",
      "Idempotency",
    ],
  },
  {
    title: "Data Engineering & Analytics",
    skills: [
      "Advanced SQL",
      "PostgreSQL",
      "Oracle",
      "MySQL",
      "MongoDB",
      "Redis",
      "ETL/ELT",
      "Data Pipelines",
      "Data Quality",
      "CDC",
      "Query Optimization",
      "Indexing",
      "Data Modeling",
      "Power BI",
      "Tableau",
      "DAX",
      "Power Query",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS",
      "EC2",
      "ECS/Fargate",
      "S3",
      "Lambda",
      "RDS",
      "Athena",
      "Glue",
      "CloudWatch",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Infrastructure as Code",
      "GitHub Actions",
      "Jenkins",
      "Maven",
      "CI/CD",
    ],
  },
  {
    title: "AI & Forward Deployed Engineering",
    skills: [
      "Python",
      "FastAPI",
      "RAG",
      "RAG Architecture",
      "LangChain",
      "LangGraph",
      "LLM Integration",
      "AI Evaluation",
      "Human-in-the-Loop",
      "Brownfield Analysis",
      "Requirements Synthesis",
      "Spec-Driven Development",
      "ADRs",
      "Client/Stakeholder Collaboration",
    ],
  },
  {
    title: "Security & Reliability",
    skills: [
      "OAuth2/OIDC",
      "JWT",
      "RBAC",
      "OWASP concepts",
      "Authorization Boundaries",
      "Secrets Management",
      "Logging",
      "Metrics",
      "Tracing",
      "Reconciliation",
      "Reliability Engineering",
    ],
  },
  {
    title: "Testing",
    skills: [
      "JUnit 5",
      "Mockito",
      "Pytest",
      "Playwright",
      "Integration Testing",
      "TDD",
      "Automated Verification",
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
  /** Smaller supporting role, rendered more compactly. */
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
      "Two client-style engagements inheriting partially built systems: understand the existing platform, close the gaps, and ship verified changes.",
    engagements: [
      {
        name: "Consumer Lending Platform (RAG Policy Assistant)",
        points: [
          "Modernized an inherited lending platform spanning intake, identity verification, credit decisioning, manual review, disclosures, payments, servicing and reconciliation.",
          "Built a grounded RAG policy assistant while keeping credit decisioning separate and authoritative in the core lending workflow.",
          "Strengthened RBAC, decision finality, idempotency, auditability and data-integrity controls.",
          "Translated business and regulatory requirements into specifications and ADRs; added automated verification for lending calculations and production-style logging, metrics, tracing and CI gates.",
        ],
        stack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Redis", "RAG", "JWT/RBAC", "Pytest", "Playwright", "GitHub Actions"],
      },
      {
        name: "Rev-Eval — Skills Assessment Platform",
        points: [
          "Completed trainer, reporting, participant and role-aware workflows across FastAPI and Next.js services.",
          "Wired Nginx and API-gateway routing and PostgreSQL/MongoDB-backed features.",
        ],
        stack: ["Python", "FastAPI", "Next.js", "React", "TypeScript", "PostgreSQL", "MongoDB", "Nginx", "Docker Compose", "CI/CD"],
      },
    ],
  },
  {
    id: "lovelytics",
    company: "Lovelytics",
    title: "Data & Analytics Engineer (Contract)",
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
    location: "Columbus, OH",
    focus: "Enterprise banking modernization",
    summary: "Banking platform modernization in a compliance-sensitive environment.",
    points: [
      "Modernized enterprise banking services with Java and Spring Boot, improving API and database efficiency, maintainability and deployment reliability.",
      "Built secure microservices and integrations using Spring Security, JPA, Oracle, Redis, AWS, REST APIs, SFTP and SMTP; supported issues across application, integration and data layers.",
      "Improved reliability through query tuning, caching, automated tests, exception handling, Docker/Kubernetes practices, code reviews and production support.",
    ],
    stack: ["Java 8/17/21", "Spring Boot", "Oracle", "Redis", "AWS", "Docker", "Kubernetes", "JUnit 5", "Maven"],
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
    location: "Erie, PA",
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
  "Advanced SQL",
  "AWS",
  "Python",
  "FastAPI",
  "RAG",
]);
