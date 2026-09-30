export const site = {
  name: "Kalab Kebede",
  title: "Senior Software Engineer | Forward Deployed Engineer",
  tagline:
    "Java · Spring Boot · Distributed Systems · AWS · Kafka · SQL & Data Engineering · Python/FastAPI · RAG & GenAI",
  valueProp:
    "6+ years building enterprise software, distributed and data systems, and AI-enabled applications across banking, insurance, analytics, and Forward Deployed Engineering engagements.",
  metaTitle: "Kalab Kebede | Senior Software Engineer & Forward Deployed Engineer",
  metaDescription:
    "Senior Software Engineer and Forward Deployed Engineer with 6+ years across Java and Spring Boot, distributed systems, cloud, data engineering and applied AI (RAG, FastAPI).",
  github: "https://github.com/Kalab21",
  email: "kalabkebe12@gmail.com",
  location: "Maryland, USA",
  domains: [
    "Banking",
    "Financial Services",
    "Insurance",
    "Data & Analytics",
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
      "LLM Integration",
      "Agentic AI",
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
  period: string;
  points: string[];
  stack: string[];
};

export type Role = {
  id: string;
  company: string;
  title: string;
  period: string;
  focus: string;
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
    focus: "Forward Deployed Engineering · Applied AI",
    summary:
      "Two client-style engagements inheriting partially built systems: understand the existing platform, close the gaps, and ship verified changes.",
    engagements: [
      {
        name: "Consumer Lending / AI Underwriting Platform",
        period: "Jun 2026 – Sep 2026",
        points: [
          "Modernized an inherited brownfield lending platform by tracing workflows across intake, identity verification, credit decisioning, manual review, disclosures, payments, servicing and reconciliation.",
          "Built a RAG-based underwriting assistant grounded in approved guidelines and fee schedules, keeping the existing decisioning service as the system of record.",
          "Turned business and regulatory requirements into specifications and ADRs; verified TILA/APR calculations with automated tests and independent validation vectors.",
          "Strengthened RBAC, service ownership, decision finality, idempotency, auditability and reconciliation across distributed services.",
          "Applied structured logging, metrics, tracing and CI/CD gates, with AI-assisted development kept inside normal review and testing controls.",
        ],
        stack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Redis", "RAG", "JWT/RBAC", "Pytest", "Playwright", "GitHub Actions"],
      },
      {
        name: "Skills Assessment Platform",
        period: "May 2026 – Jun 2026",
        points: [
          "Extended a partially built five-service platform into end-to-end candidate, trainer, reporting and role-aware workflows.",
          "Wired Nginx and API-gateway routing across services and built the missing Reporting & Analytics service into a running, gateway-reachable component.",
          "Implemented timed assessments, trainer workflows and JWT/RBAC controls on PostgreSQL and MongoDB while preserving inherited service contracts.",
          "Diagnosed failures across proxy, gateway, service and database boundaries; maintained CI verification across backend services and the frontend.",
        ],
        stack: ["Python", "FastAPI", "Next.js", "React", "TypeScript", "PostgreSQL", "MongoDB", "Nginx", "Docker Compose", "CI/CD"],
      },
    ],
  },
  {
    id: "lovelytics",
    company: "Lovelytics",
    title: "Data & Analytics Engineer",
    period: "Dec 2024 – Nov 2025",
    focus: "Data engineering · Analytics",
    summary:
      "Enterprise analytics and reporting: turning stakeholder questions into modeled, trustworthy KPIs.",
    points: [
      "Designed and optimized SQL-based analytics and reporting solutions on PostgreSQL and MySQL, including CTEs, window functions and aggregations for KPI models.",
      "Built ETL/ELT and reporting patterns using AWS Athena, S3, Glue and RDS, with data validation and quality checks.",
      "Delivered Power BI dashboards using DAX, Power Query and row-level security, translating stakeholder requirements into maintainable KPI definitions.",
    ],
    stack: ["SQL", "AWS Athena", "Glue", "S3", "RDS", "Power BI", "DAX", "Power Query", "PostgreSQL", "MySQL"],
  },
  {
    id: "jpmorgan",
    company: "JPMorgan Chase",
    title: "Java Software Engineer",
    period: "May 2024 – Sep 2024",
    focus: "Enterprise banking modernization",
    summary: "Banking platform modernization in a compliance-sensitive environment.",
    points: [
      "Modernized enterprise banking applications with Java and Spring Boot, improving REST API performance, database efficiency, maintainability and deployment reliability.",
      "Built secure microservices and integrations with Spring Security, Spring Data JPA, Oracle, Redis, AWS, REST APIs, SFTP and SMTP.",
      "Improved reliability through automated testing, exception handling, performance tuning, Docker/Kubernetes practices, code review and production support.",
    ],
    stack: ["Java 8/17/21", "Spring Boot", "Oracle", "Redis", "AWS", "Docker", "Kubernetes", "JUnit 5", "Maven"],
  },
  {
    id: "investors-bank",
    company: "Investors Bank",
    title: "Java Software Engineer",
    period: "Apr 2021 – Dec 2023",
    focus: "Core banking · Distributed systems",
    summary: "Legacy core-banking modernization into event-driven microservices.",
    points: [
      "Modernized a legacy core-banking platform into Spring Boot microservices and event-driven workflows using Kafka, PostgreSQL and Redis.",
      "Implemented secure REST APIs, Kafka-based integrations and transaction-processing workflows while preserving business behavior and data integrity.",
      "Optimized SQL and database access, applied caching and asynchronous patterns, and automated build, test and delivery with Jenkins and GitHub Actions.",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Microservices", "Jenkins", "GitHub Actions"],
  },
  {
    id: "erie",
    company: "Erie Insurance",
    title: "Java Software Engineer",
    period: "Mar 2019 – Feb 2021",
    focus: "Insurance · Enterprise Java",
    summary: "Claims and policy management backend services.",
    points: [
      "Developed high-availability Java backend services and REST APIs for claims, policies, customers and transaction-processing workflows.",
      "Implemented concurrency-safe processing, persistence with Hibernate/JPA on MySQL, SQL optimization and automated testing.",
      "Worked with engineering and QA to resolve defects and improve reliability of production services.",
    ],
    stack: ["Java", "Spring", "Hibernate/JPA", "MySQL", "Concurrency", "JUnit", "Mockito"],
  },
];

export const education = [
  "B.S. Computer Science — Maharishi International University (2023)",
  "B.S. Electrical and Computer Engineering — Haramaya University (2015)",
];
