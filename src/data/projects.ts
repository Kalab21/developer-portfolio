export type Screenshot = {
  src: string;
  /** Optional dark-theme variant (used for diagrams). */
  darkSrc?: string;
  /** Card display: "contain" (default) shows the whole image; "cover" crops to fill. */
  fit?: "cover" | "contain";
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Stat = { value: string; label: string };

export type TechGroup = { group: string; items: string[] };

export type ArchitectureTier = {
  label: string;
  nodes: { name: string; detail?: string }[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  /** "personal" = built end to end by me; "team" = organization / team project. */
  ownership: "personal" | "team";
  summary: string;
  /** Optional shorter text and tags for the recruiter-facing project card. */
  cardSummary?: string;
  cardTags?: string[];
  context: string[];
  role: string;
  repository: { url: string; label: string; note?: string };
  extraLinks?: { url: string; label: string }[];
  stats: Stat[];
  technologies: TechGroup[];
  highlights: { title: string; body: string }[];
  architecture: {
    description: string;
    tiers: ArchitectureTier[];
    diagram?: {
      light: string;
      dark: string;
      alt: string;
      width: number;
      height: number;
      /** Show the diagram at full width above the tier list (for tall, text-heavy diagrams). */
      stacked?: boolean;
    };
  };
  contributions?: string[];
  security: string[];
  reliability: string[];
  testing: { summary: string; stats: Stat[]; notes: string[] };
  scope: string[];
  screenshots: Screenshot[];
  cardImage?: Screenshot;
};

export const projects: Project[] = [
  {
    slug: "northbank",
    title: "Northbank",
    subtitle: "Event-Driven Retail Banking Platform",
    category: "Distributed Systems & Financial Engineering",
    ownership: "personal",
    cardSummary:
      "A Java 21 / Spring Boot banking platform: 11 services behind an API gateway, Kafka events, a database per service and a Next.js console, built around transaction integrity and safe money movement.",
    cardTags: ["Java 21", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Next.js", "React", "TypeScript"],
    summary:
      "A Java full-stack, event-driven banking platform built with 11 Spring Boot services behind an API gateway, Kafka-based events, per-service PostgreSQL databases, and a Next.js customer and staff console. Designed around transaction integrity, idempotency, and reliable money movement.",
    context: [
      "Northbank covers the core retail-banking journeys: onboarding with identity checks and two-factor login, accounts and transfers, cards, loans, and a credit-application workflow that ends with a stored offer the customer can accept or decline. Staff have their own review workbench for referred applications and KYC documents.",
      "The engineering focus is correctness under concurrency and failure: what happens when two debits race, when a request is retried, when a downstream call times out, or when a caller tries to reach another customer's data.",
    ],
    role:
      "Designed the service boundaries, event contracts, security model and test strategy, and implemented the platform across backend, frontend and CI.",
    repository: {
      url: "https://github.com/Kalab21/banking-platform",
      label: "Kalab21/banking-platform",
    },
    stats: [
      { value: "11", label: "business services" },
      { value: "13", label: "backend processes incl. gateway and Eureka" },
      { value: "1,482", label: "automated tests in CI" },
      { value: "5", label: "shared library modules" },
    ],
    technologies: [
      { group: "Backend", items: ["Java 21", "Spring Boot 3", "Spring Security", "Spring Cloud Gateway", "Eureka", "OpenFeign", "Resilience4j"] },
      { group: "Data & messaging", items: ["PostgreSQL 16", "Flyway", "Redis", "Apache Kafka", "Transactional outbox"] },
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Recharts"] },
      { group: "Testing", items: ["JUnit 5", "Mockito", "Testcontainers", "Vitest", "Playwright"] },
      { group: "Delivery", items: ["Docker Compose", "GitHub Actions", "CodeQL", "Trivy", "Terraform (reference architecture)"] },
      { group: "Observability", items: ["Micrometer", "Prometheus", "Grafana", "Zipkin"] },
    ],
    highlights: [
      {
        title: "Financial transaction correctness",
        body: "Balance changes use pessimistic row locking (SELECT … FOR UPDATE) in the account, credit-card and loan services, with concurrency tests that run against real PostgreSQL.",
      },
      {
        title: "Idempotency",
        body: "Money-moving requests carry an Idempotency-Key handled by a shared idempotency module, so retries and duplicates replay the original outcome instead of moving money twice.",
      },
      {
        title: "Unknown outcomes are reported, not guessed",
        body: "A transfer that debited but failed to credit is surfaced as an unresolved outcome and covered by a reconciliation test, rather than being reported as success or failure.",
      },
      {
        title: "Ownership and authorization",
        body: "A shared access guard enforces customer ownership across services. Dedicated suites cover an ownership matrix and gateway identity-spoofing attempts.",
      },
      {
        title: "Loans and credit cards",
        body: "Amortization, instalment and payoff logic; card masking, interest, statements and freeze rules; and a versioned underwriting policy feeding a staff-review, offer and accept workflow.",
      },
      {
        title: "Event-driven architecture",
        body: "A transactional outbox, retry with dead-letter topics and idempotent consumers, with Kafka recovery tests. Product provisioning after an accepted offer is confirmed exactly once.",
      },
      {
        title: "BFF security",
        body: "The Next.js server makes every banking API call, so the browser never holds a bearer token. A session cookie is only issued after the two-factor step.",
      },
    ],
    architecture: {
      description:
        "Customer and staff traffic goes through a Next.js backend-for-frontend, then an API gateway that validates identity before forwarding to business services on a private network. REST carries authoritative operations such as debits; Kafka carries derived workflows such as notifications, statistics and fraud checks. Each service owns its PostgreSQL database.",
      tiers: [
        { label: "Clients", nodes: [{ name: "Customer console" }, { name: "Staff console" }] },
        { label: "Edge", nodes: [{ name: "Next.js BFF", detail: "server-side session, no browser token" }, { name: "API Gateway", detail: "JWT validation, identity headers" }, { name: "Eureka", detail: "service discovery" }] },
        { label: "Business services (11)", nodes: [{ name: "user" }, { name: "account" }, { name: "transaction" }, { name: "payment" }, { name: "credit-card" }, { name: "loan" }, { name: "application" }, { name: "fraud-detection" }, { name: "notification" }, { name: "statistics" }, { name: "integration" }] },
        { label: "Data & events", nodes: [{ name: "PostgreSQL", detail: "database per service" }, { name: "Kafka", detail: "outbox, retries, dead-letter topics" }, { name: "Redis" }] },
      ],
      diagram: {
        light: "/projects/northbank/northbank-logical.svg",
        dark: "/projects/northbank/northbank-logical-dark.svg",
        alt: "Northbank logical architecture: customers and staff reach a Next.js BFF, then a Spring Cloud Gateway with Eureka discovery, then eleven Spring Boot services grouped by domain (identity, accounts and money movement, lending and cards, risk and insight) on a private service network. REST carries authoritative calls; Kafka carries derived events. Each service owns a PostgreSQL database; Redis backs rate limits and caches.",
        width: 1400,
        height: 1210,
        stacked: true,
      },
    },
    security: [
      "JWT authentication with BCrypt password hashing and TOTP two-factor login",
      "Backend-for-frontend pattern: bearer tokens stay on the server",
      "Shared ownership guard across services, tested with an ownership matrix and gateway identity-spoofing suites",
      "Log-safety utilities for sensitive fields; CodeQL and Trivy scanning in CI",
    ],
    reliability: [
      "Pessimistic locking on balance-changing paths, verified with real-PostgreSQL concurrency tests",
      "Idempotency keys, transactional outbox, retry with dead-letter topics",
      "Resilience4j circuit breaker on the transaction-to-account path: an open circuit fails fast, while a timeout is recorded as an unknown outcome and reconciled, never retried",
      "Request-ID propagation across hops; Prometheus, Grafana and Zipkin for metrics and tracing",
    ],
    testing: {
      summary:
        "Counts are test cases as the test runners report them. The CI total covers backend, frontend and offline browser tests.",
      stats: [
        { value: "1,028", label: "backend" },
        { value: "385", label: "frontend unit / component" },
        { value: "69", label: "offline Playwright" },
        { value: "1,482", label: "CI total" },
      ],
      notes: [
        "Backend: 870 unit and web-slice tests plus 158 integration tests, several against real PostgreSQL and embedded Kafka.",
        "A further 46 live Playwright tests and a full-stack assertion script need all 13 backend processes, so they run on demand rather than in CI.",
      ],
    },
    scope: [
      "Portfolio-scale retail banking simulation using synthetic accounts and data, with Docker Compose for local execution.",
      "Wire, ACH and SWIFT flows are simulated.",
      "AWS reference deployment in Terraform (CloudFront + WAF, ALB, ECS Fargate in private subnets, RDS PostgreSQL, ElastiCache, MSK); Terraform-defined, not currently deployed.",
    ],
    screenshots: [
      { src: "/projects/northbank/dashboard.webp", width: 1440, height: 1000, alt: "Northbank customer dashboard with total balance, account cards, a balance chart and recent activity.", caption: "Customer dashboard" },
      { src: "/projects/northbank/move-money-review.webp", width: 1440, height: 900, alt: "Northbank transfer review step showing the amount and both accounts by last four digits before confirmation.", caption: "Transfer review before confirmation" },
      { src: "/projects/northbank/explore-credit.webp", width: 1440, height: 900, alt: "Northbank credit products page listing credit card, personal loan, auto loan and mortgage.", caption: "Credit products and how applications work" },
      { src: "/projects/northbank/offer-detail.webp", width: 1440, height: 900, alt: "Northbank application detail with a timeline, stored offer terms and accept or decline actions.", caption: "Offer with stored terms" },
      { src: "/projects/northbank/staff-review.webp", width: 1440, height: 900, alt: "Northbank staff review workbench showing an append-only decision history with a reason code and approve or reject actions.", caption: "Staff review workbench" },
      { src: "/projects/northbank/cards.webp", width: 1440, height: 900, alt: "Northbank credit card page with a masked card number, balance, limit usage and rewards.", caption: "Credit card (masked numbers)" },
      { src: "/projects/northbank/loan-payment.webp", width: 1440, height: 900, alt: "Northbank loan detail with repayment progress and options to pay the next instalment, another amount or the full payoff.", caption: "Loan repayment options" },
    ],
  },
  {
    slug: "meridian-lending",
    title: "Meridian Lending",
    subtitle: "Consumer Lending & Applied AI Platform",
    category: "Forward Deployed Engineering & Applied AI",
    ownership: "team",
    cardSummary:
      "An inherited consumer-lending platform hardened and split into eight FastAPI services, with auditable credit decisions, maker-checker controls and reconciliation, plus advisory AI: a grounded RAG assistant, LangGraph agent workflows and LangSmith tracing.",
    cardTags: ["Python", "FastAPI", "LangGraph", "Multi-Agent", "LangSmith", "AWS Bedrock", "RAG", "Next.js", "TypeScript"],
    summary:
      "A brownfield consumer-lending platform (intake, identity checks, credit decisioning, manual review, disclosures, payments, servicing and reconciliation) hardened and decomposed into eight FastAPI backend services, including the gateway. Grounded and agentic AI built with LangChain, LangGraph and AWS Bedrock supports staff, while the core lending workflow stays authoritative for credit decisions.",
    context: [
      "The team started from an inherited codebase plus business and regulatory requirements. The work was to trace how an application moves through intake, identity verification, credit decisioning, manual review, disclosures, payments, servicing and reconciliation, then close integrity, security and observability gaps without breaking existing behavior.",
    ],
    role:
      "Contributing engineer on a team: brownfield analysis, requirements and ADRs, the RAG assistant, agent workflows and LangSmith tracing, and security, ledger, reconciliation and observability work across the services.",
    repository: {
      url: "https://github.com/2463-FDE/KK-meridian-lending",
      label: "2463-FDE/KK-meridian-lending",
    },
    stats: [
      { value: "8", label: "FastAPI backend services, including the gateway" },
      { value: "12", label: "architecture decision records" },
      { value: "Append-only", label: "servicing ledger with maker-checker approvals" },
      { value: "Read-only", label: "staff-only RAG assistant, no database access" },
    ],
    technologies: [
      { group: "Backend", items: ["Python 3.12", "FastAPI", "Pydantic"] },
      { group: "Applied AI", items: ["LangChain", "LangGraph (multi-agent workflows)", "LangSmith (tracing)", "AWS Bedrock (Anthropic Claude models)", "RAG", "Bounded tool calling", "Retrieval evaluation"] },
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Playwright"] },
      { group: "Data & access control", items: ["PostgreSQL 16 (versioned SQL migrations)", "Redis (sessions)", "Role-based access control (staff roles, maker-checker)"] },
      { group: "Delivery & ops", items: ["Docker Compose", "GitHub Actions", "gitleaks", "Prometheus", "Grafana", "Pytest"] },
    ],
    highlights: [
      {
        title: "Advisory AI, not the decision maker",
        body: "The underwriting-summary agent (LangChain on AWS Bedrock) is staff-only and read-only, with no database connection and one bounded policy-search tool. It refuses when retrieval returns no policy evidence, and labels its output as a summary that does not change the decision.",
      },
      {
        title: "Agentic orchestration",
        body: "Offer and TILA disclosure assembly runs as a two-agent LangGraph workflow: one agent walks the loan knowledge graph for an approved decision's inputs, a second hands them to the deterministic disclosure engine. The agents are orchestration nodes with one responsibility each, so regulated dollar math never goes through a model. Credit decisions also run as a LangGraph state graph.",
      },
      {
        title: "AI tracing with LangSmith",
        body: "LangSmith traces follow a request from the gateway through policy retrieval, the model call, the agent run and output validation. Traces carry allowlisted categorical metadata only, so prompts and applicant data are never recorded.",
      },
      {
        title: "Decision evidence",
        body: "Each application shows the automated model decision, the final outcome, model version, scores and reason codes, with manual-review outcomes recorded separately so history is never overwritten.",
      },
      {
        title: "TILA / APR disclosures",
        body: "APR, finance charge, amount financed and payment schedule are computed by the disclosure service and checked against independent golden validation vectors.",
      },
      {
        title: "Ledger and maker-checker",
        body: "Servicing balances are read from an append-only ledger. Balance adjustments and fee waivers are proposals that a different authorized person must approve.",
      },
      {
        title: "Payments and reconciliation",
        body: "Idempotent payment capture, a settlement-file comparison job, and a review queue where flagged payments are confirmed or dismissed by a person.",
      },
      {
        title: "Governance",
        body: "Twelve ADRs, numbered specs, a model card and a debt register document why the system is shaped the way it is and what is deliberately deferred.",
      },
    ],
    architecture: {
      description:
        "Eight FastAPI backend services, including the gateway. Seven share a PostgreSQL schema under an explicit ADR; the loan assistant holds no database connection, reads application data over HTTP, and never writes to the system of record.",
      diagram: {
        light: "/projects/meridian/meridian-architecture.svg",
        dark: "/projects/meridian/meridian-architecture-dark.svg",
        alt: "Meridian Lending architecture: the Next.js portal calls the gateway BFF, which routes to origination, the loan assistant and servicing. Origination calls the KYC, decision and disclosure services over synchronous HTTP; payment applies payments to servicing; the loan assistant is staff-only, read-only and has no database connection. PostgreSQL is shared by seven services; Redis holds sessions and rate limits.",
        width: 1660,
        height: 1110,
        stacked: true,
      },
      tiers: [
        { label: "Client", nodes: [{ name: "Next.js staff and borrower UI" }] },
        { label: "Edge", nodes: [{ name: "Gateway", detail: "auth, rate limiting, service routing" }] },
        { label: "Services", nodes: [{ name: "origination", detail: "system of record" }, { name: "kyc" }, { name: "decision", detail: "credit scoring / decision computation" }, { name: "disclosure", detail: "TILA / APR" }, { name: "servicing", detail: "ledger, maker-checker" }, { name: "payment", detail: "idempotent capture" }, { name: "loan-assistant", detail: "advisory RAG agent, read-only" }] },
        { label: "Data & ops", nodes: [{ name: "PostgreSQL 16" }, { name: "Redis" }, { name: "Prometheus + Grafana" }] },
      ],
    },
    contributions: [
      "Brownfield analysis: traced the lending lifecycle from intake through reconciliation and turned business and regulatory requirements into specifications and ADRs.",
      "RAG policy assistant: retrieval evaluation harness and corpus-hygiene gate, grounded policy chat with cited evidence, and prompt-injection and redaction guards.",
      "Agentic workflows: the LangChain/Bedrock underwriting-summary agent with a bounded policy tool, and the two-agent LangGraph disclosure workflow over a loan knowledge graph.",
      "AI tracing: privacy-safe LangSmith traces propagated from the gateway through the agent run.",
      "AI boundary: kept the RAG assistant out of credit decisioning. Origination persists the authoritative decision evidence, and model reason codes are not surfaced directly to declined applicants.",
      "Payments and data integrity: removed stored card numbers and CVVs from the payments schema through a staged migration.",
      "Ledger and controls: proposed the append-only servicing ledger (ADR 0010) and built maker-checker approvals with an approvals queue people can work.",
      "Reconciliation: review flow so a person can see and resolve payments flagged for review.",
      "Security: closed a gateway authentication gap on the decision and disclosure proxies and hardened error handling on upstream failures.",
      "Observability: Prometheus metrics and alert rules across all eight backend services, including fixing an alert that watched a metric nobody emitted.",
      "Verification: automated tests plus independent validation vectors for TILA/APR calculations.",
    ],
    security: [
      "Gateway authentication and rate limiting; internal service token that fails closed",
      "RBAC by staff role, with decision finality (a funded application cannot be re-decided)",
      "Card data removed from storage; PAN, SSN and CVV redactors on payment and assistant paths",
      "gitleaks secret scanning in CI; prompt-injection checks on the assistant",
    ],
    reliability: [
      "Idempotent payment capture and a scheduled settlement reconciliation job",
      "Append-only ledger for servicing balances",
      "Correlation IDs, structured logging and Prometheus metrics with alert rules",
    ],
    testing: {
      summary:
        "Per-service Pytest suites run against PostgreSQL 16 in CI, alongside Playwright end-to-end specs.",
      stats: [
        { value: "8", label: "backend services, gateway included, with their own Pytest suites" },
        { value: "42", label: "Playwright spec files" },
        { value: "1", label: "gitleaks secret-scan job in CI" },
      ],
      notes: [
        "TILA/APR outputs are compared against golden payment-schedule vectors.",
        "A retrieval evaluation harness and corpus-hygiene gate cover the policy assistant.",
      ],
    },
    scope: [
      "Synthetic, locally run lending platform with fictional data and simulated external providers; no production compliance claim.",
    ],
    cardImage: { src: "/projects/meridian/tila-card.webp", width: 1200, height: 750, alt: "Federal Truth-in-Lending disclosure box showing APR, finance charge, amount financed, total of payments and payment schedule.", caption: "Truth-in-Lending disclosure" },
    screenshots: [
      { src: "/projects/meridian/decision-evidence.webp", width: 1600, height: 947, alt: "Meridian Lending application page showing a five-step status strip and a decision evidence panel with model version, scores and outcome.", caption: "Application status and decision evidence" },
      { src: "/projects/meridian/tila-disclosure.webp", width: 1600, height: 842, alt: "Federal Truth-in-Lending disclosure box showing APR, finance charge, amount financed, total of payments and payment schedule.", caption: "Truth-in-Lending disclosure" },
      { src: "/projects/meridian/policy-chat.webp", width: 1400, height: 1243, alt: "Meridian policy chat answering a question about late fees with a grounded-in-policy label, the fee schedule as source and expandable evidence.", caption: "Policy chat with cited evidence" },
      { src: "/projects/meridian/ai-summary.webp", width: 1600, height: 632, alt: "AI application summary marked as not a decision, with an external-context section labeled as not model-generated.", caption: "Advisory AI summary" },
      { src: "/projects/meridian/servicing-actions.webp", width: 1600, height: 842, alt: "Servicing forms for proposing a balance adjustment or a fee waiver, both requiring approval from a different person.", caption: "Maker-checker servicing actions" },
    ],
  },
  {
    slug: "policy-rag",
    title: "Policy RAG Platform",
    subtitle: "Secure Retrieval & Grounded AI Platform",
    category: "Vector Search & Retrieval-Augmented Generation",
    ownership: "personal",
    cardSummary:
      "A question-answering service over policy documents that only uses documents the caller may read, cites its sources and refuses when the evidence is weak. Retrieval quality is measured on held-out questions.",
    cardTags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Hybrid Search", "LangGraph", "MCP", "OpenTelemetry"],
    cardImage: { src: "/projects/policy-rag/architecture.svg", darkSrc: "/projects/policy-rag/architecture-dark.svg", fit: "contain", width: 1400, height: 1500, alt: "Policy RAG Platform architecture diagram.", caption: "Architecture" },
    summary:
      "A FastAPI service that answers questions over lending-policy documents. It retrieves only from documents the caller is authorized to read, answers with citations it has checked, and refuses when the evidence is insufficient. Retrieval runs on PostgreSQL with pgvector and combines semantic, full-text and hybrid search.",
    context: [
      "Policy RAG Platform answers questions over a small set of synthetic lending-policy documents. It is the project where I worked directly with the retrieval layer: the vector(384) schema and HNSW index, the similarity, full-text and metadata-filter SQL, rank fusion and reranking, and measuring retrieval quality on separate tuning and held-out question sets.",
      "It also carries the controls an enterprise deployment would ask about: authorization applied before any chunk can become context, bounded read-only tools for AI clients, and observability that never records the user's question or the documents. The default answer generator is extractive, with optional Bedrock and OpenAI-compatible adapters.",
    ],
    role:
      "Designed and implemented the ingestion pipeline, pgvector schema and queries, hybrid retrieval and reranking, LangGraph evidence gate, authorization model, MCP server, observability, evaluation harness, tests, Docker setup, CI and a Terraform reference architecture.",
    repository: {
      url: "https://github.com/Kalab21/policy-rag-platform",
      label: "Kalab21/policy-rag-platform",
    },
    stats: [
      { value: "384", label: "embedding dimensions (MiniLM, run locally)" },
      { value: "490", label: "automated tests" },
      { value: "217", label: "integration tests against real PostgreSQL + pgvector" },
      { value: "3", label: "retrieval modes: semantic, lexical, hybrid" },
    ],
    technologies: [
      { group: "API & language", items: ["Python 3.12", "FastAPI", "Pydantic"] },
      { group: "Vector search", items: ["PostgreSQL 16", "pgvector 0.8.7", "HNSW (vector_cosine_ops)", "Semantic search (cosine similarity)", "JSONB + GIN metadata index"] },
      { group: "Lexical & hybrid retrieval", items: ["PostgreSQL Full-Text Search", "tsvector", "GIN full-text index", "Reciprocal Rank Fusion", "Hybrid Retrieval"] },
      { group: "Reranking", items: ["Cross-Encoder Reranking (ms-marco MiniLM, local ONNX)"] },
      { group: "Embeddings & RAG", items: ["Embeddings: sentence-transformers/all-MiniLM-L6-v2 (fastembed)", "LangGraph", "Evidence gating", "Citation validation"] },
      { group: "Security", items: ["JWT validation (OIDC/JWKS)", "RBAC", "Document-level authorization"] },
      { group: "Interfaces & operations", items: ["MCP (Model Context Protocol) server", "OpenTelemetry", "Prometheus metrics", "Structured logging"] },
      { group: "Quality & delivery", items: ["Pytest", "Ruff", "mypy", "pip-audit", "Bandit", "Docker Compose", "GitHub Actions", "Terraform (AWS reference architecture)", "Trivy IaC scan"] },
    ],
    highlights: [
      {
        title: "Vector & hybrid retrieval",
        body: "Stores MiniLM 384-dimensional embeddings in PostgreSQL/pgvector with an HNSW cosine index and JSONB/GIN metadata filtering, plus PostgreSQL full-text search and Reciprocal Rank Fusion hybrid retrieval, selectable per request.",
      },
      {
        title: "Cross-encoder reranking",
        body: "An optional local cross-encoder reranks the candidate set from any retrieval mode, with metadata filters and authorization applied before candidates are scored.",
      },
      {
        title: "Retrieval-time authorization",
        body: "JWT roles plus tenant, department and access-level labels are enforced inside the retrieval query, so restricted chunks are never ranked, reranked, sent to a generator or written to traces and logs. Integration tests cover every retrieval mode, the reranker, the generator, traces and logs.",
      },
      {
        title: "Grounded RAG with citations",
        body: "A LangGraph flow with an evidence gate, citation validation and refusal of unsupported questions.",
      },
      {
        title: "Held-out evaluation",
        body: "Separate tuning and held-out question sets with Hit@K, Recall@K, nDCG@K and MRR, per-configuration latency and CI regression floors.",
      },
      {
        title: "MCP interface",
        body: "A read-only MCP server over stdio exposes search, document-read and ask tools with typed, bounded arguments. It reuses the same retrieval services and the same authorization scope as the HTTP API.",
      },
      {
        title: "Observability",
        body: "OpenTelemetry spans for each pipeline stage, Prometheus metrics and structured logs with request ids. Tests assert that question text, document text and credentials are never recorded.",
      },
    ],
    architecture: {
      description:
        "Retrieval supports semantic, lexical and RRF hybrid search, with configurable cross-encoder reranking. Results pass through retrieval-time authorization, the evidence gate, LangGraph orchestration and citation validation.",
      diagram: {
        light: "/projects/policy-rag/architecture.svg",
        dark: "/projects/policy-rag/architecture-dark.svg",
        alt: "Policy RAG Platform architecture: JWT validation produces an access scope applied inside every query; semantic, lexical or hybrid retrieval on PostgreSQL with pgvector, optional cross-encoder reranking, an evidence gate, LangGraph generation and citation validation return an answer with sources or a refusal.",
        width: 1400,
        height: 1500,
        stacked: true,
      },
      tiers: [
        { label: "API", nodes: [{ name: "FastAPI", detail: "/api/search, /api/ask, /api/me" }] },
        { label: "Security", nodes: [{ name: "JWT validation" }, { name: "Access scope", detail: "tenant, level, department, applied in SQL" }] },
        { label: "Retrieval", nodes: [{ name: "Semantic Search", detail: "MiniLM embedding to pgvector HNSW" }, { name: "Lexical Search", detail: "PostgreSQL full-text search" }, { name: "Hybrid Search", detail: "semantic + lexical fused with RRF" }, { name: "Cross-Encoder Reranking" }, { name: "Metadata filter", detail: "JSONB containment in SQL" }] },
        { label: "RAG", nodes: [{ name: "Evidence gate" }, { name: "LangGraph flow" }, { name: "Extractive Generator", detail: "Bedrock and OpenAI-compatible adapters available" }, { name: "Citation validation" }] },
        { label: "Interfaces", nodes: [{ name: "MCP server", detail: "stdio, read-only tools" }] },
        { label: "Data", nodes: [{ name: "PostgreSQL 16 + pgvector" }] },
        { label: "Operations", nodes: [{ name: "OpenTelemetry" }, { name: "Prometheus metrics" }, { name: "Terraform AWS reference architecture", detail: "validated in CI" }] },
        { label: "Quality", nodes: [{ name: "Pytest" }, { name: "GitHub Actions" }] },
      ],
    },
    security: [
      "JWT validation with an algorithm allowlist chosen from the key source, so unsigned and key-confusion tokens are rejected; 401 for bad tokens, 403 for no usable role",
      "Document-level authorization in the retrieval SQL: tenant isolation, access levels and departments, with unlabelled data failing closed",
      "Metadata filter keys are allowlisted, and filter values and query text are bound parameters, so requests cannot inject SQL",
      "MCP tools are read-only with typed, bounded arguments and no SQL, filesystem, shell or network access",
      "Dependency auditing with pip-audit, static analysis with Bandit and a Trivy IaC scan in CI; no secrets in the repository",
    ],
    reliability: [
      "Idempotent ingestion: unchanged documents are skipped, changed documents are replaced atomically, and a failed embedding leaves existing rows untouched",
      "The API refuses to start when the vector column width and the configured embedding dimension disagree, or when JWT authentication is misconfigured",
      "Retrieval is a separate service from the RAG flow, so each can be tested on its own",
      "Telemetry is optional and nothing leaves the process unless an OTLP endpoint is configured",
    ],
    testing: {
      summary:
        "490 automated tests: 273 unit and 217 integration, including real PostgreSQL/pgvector retrieval, hybrid search, reranking, authorization, MCP, telemetry, refusal and citation validation. Retrieval quality is measured on separate tuning and held-out question sets over the synthetic policy corpus, with Hit@K, Recall@K, MRR and nDCG regression checks in CI.",
      stats: [
        { value: "97.8%", label: "Hit@5, semantic default (held-out, 45 questions)" },
        { value: "0.939", label: "MRR, semantic default (held-out)" },
        { value: "0.989", label: "MRR, hybrid retrieval (held-out)" },
        { value: "1.000", label: "MRR, semantic + rerank (held-out)" },
      ],
      notes: [
        "Retrieval is evaluated on separate tuning and held-out question sets over the synthetic policy corpus; CI enforces regression floors for both.",
        "The harness reports per-search latency for every configuration: under 20 ms without reranking and roughly 0.3 to 0.5 s with the local cross-encoder, on one development machine.",
        "Integration tests on real PostgreSQL + pgvector cover vector insertion and cosine ordering, metadata filtering, HNSW and iterative scan, full-text search and its GIN index, Reciprocal Rank Fusion ordering, hybrid retrieval, reranking, JWT validation and role-based access, tenant isolation, restricted text never reaching the reranker, generator, traces or logs, MCP tools, telemetry, refusal and citation correctness.",
        "CI runs Ruff, mypy, unit and integration tests, pip-audit, Bandit, a Docker Compose smoke test, and Terraform format, validate and a Trivy scan; all six jobs are required checks on main.",
      ],
    },
    scope: [
      "Evaluation uses a synthetic lending-policy corpus with separate tuning and held-out question sets.",
      "Semantic, lexical and hybrid retrieval are selectable; reranking is optional.",
      "Cloud infrastructure is represented by a Terraform AWS reference architecture validated in CI.",
    ],
    screenshots: [],
  },
  {
    slug: "rev-eval",
    title: "Rev-Eval",
    subtitle: "Skills Assessment & Analytics Platform",
    category: "Full-Stack FDE & Platform Engineering",
    ownership: "team",
    cardSummary:
      "A multi-service assessment platform: trainers assign tests, participants take timed quizzes, and submissions are scored safely under retries and concurrency, with reporting and analytics.",
    cardTags: ["Python", "FastAPI", "Next.js", "React", "TypeScript", "PostgreSQL", "MongoDB", "Docker"],
    cardImage: { src: "/projects/rev-eval/reveval-architecture.svg", darkSrc: "/projects/rev-eval/reveval-architecture-dark.svg", fit: "contain", width: 1400, height: 600, alt: "Rev-Eval architecture diagram.", caption: "Architecture" },
    summary:
      "A multi-service assessment platform where trainers create and assign tests, participants take timed assessments, and the system scores them and reports analytics. I extended a partially built five-service application into working end-to-end flows.",
    context: [
      "The starting point was an inherited, partially wired system with missing integration paths. Much of the work was diagnosing failures across the Nginx, gateway, service and database boundaries, then building what was missing while preserving the existing service contracts.",
    ],
    role:
      "Contributing full-stack engineer: scoring engine, quiz-taking UX, the Reporting & Analytics service, gateway and auth hardening, and test and CI coverage.",
    repository: {
      url: "https://github.com/RevatureFDEPEP/rev-eval/tree/kalabek",
      label: "RevatureFDEPEP/rev-eval (kalabek)",
      note: "Contributions are available on the kalabek integration branch.",
    },
    stats: [
      { value: "5", label: "backend services" },
      { value: "3", label: "data stores: PostgreSQL, MongoDB, MinIO" },
      { value: "2", label: "roles: trainer and participant" },
      { value: "80%", label: "diff-coverage gate on changed lines in CI" },
    ],
    technologies: [
      { group: "Backend", items: ["Python", "FastAPI", "Alembic", "JWT/RBAC (PyJWT)"] },
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Vitest", "Recharts"] },
      { group: "Data & storage", items: ["PostgreSQL", "MongoDB", "MinIO"] },
      { group: "Edge & delivery", items: ["Nginx", "API gateway", "Docker Compose", "GitHub Actions", "Playwright", "Trivy"] },
    ],
    highlights: [
      {
        title: "Scoring engine with idempotency and locking",
        body: "Exact-match and set-based scoring, idempotent submissions that replay the original result for the same key, and row locking so concurrent submissions cannot double-score.",
      },
      {
        title: "Timed quiz experience",
        body: "Polymorphic question rendering, a timer, autosave and a submit state machine, with Vitest coverage.",
      },
      {
        title: "Reporting & Analytics service",
        body: "Built the missing service into a running, gateway-reachable component with per-test reports, aggregates, rankings and a percentile-based analytics endpoint.",
      },
      {
        title: "Gateway and auth hardening",
        body: "Fixed an authentication bypass and information leak, and added service-layer JWT role checks and middleware signature verification.",
      },
      {
        title: "Distributed debugging",
        body: "Traced failures across proxy, gateway, service and database boundaries; added X-Request-Id propagation to make cross-service issues diagnosable.",
      },
    ],
    architecture: {
      description:
        "Nginx and the API gateway route traffic to the FastAPI services. User and test-management data use PostgreSQL, question-management uses MongoDB and MinIO, and Reporting & Analytics reads the shared PostgreSQL data directly under its documented ADR. The gateway forwards verified identity to services, which enforce role checks.",
      diagram: {
        light: "/projects/rev-eval/reveval-architecture.svg",
        dark: "/projects/rev-eval/reveval-architecture-dark.svg",
        alt: "Rev-Eval architecture: the browser reaches Nginx, the Next.js frontend and the API gateway, which routes to user-service, test-management, reporting-and-analytics and question-management. User and test data live in PostgreSQL, which reporting reads read-only; questions live in MongoDB with images in MinIO.",
        width: 1400,
        height: 600,
        stacked: true,
      },
      tiers: [
        { label: "Client", nodes: [{ name: "Next.js trainer and participant UI" }] },
        { label: "Edge", nodes: [{ name: "Nginx" }, { name: "API gateway", detail: "JWT, identity headers, request IDs" }] },
        { label: "Services", nodes: [{ name: "user-service" }, { name: "question-management" }, { name: "test-management", detail: "sessions, scoring" }, { name: "reporting-and-analytics" }] },
        { label: "Storage", nodes: [{ name: "PostgreSQL" }, { name: "MongoDB" }, { name: "MinIO" }] },
      ],
    },
    contributions: [
      "Quiz session creation with Alembic migrations, then the scoring engine with idempotency and locking.",
      "Quiz frontend: polymorphic question rendering and the timer, autosave and submit state machine.",
      "Reporting & Analytics service, results page with charts, and a URL-synced trainer tests page with an analytics tab.",
      "Auth and gateway fixes: authentication bypass and information leak, Nginx proxy and startup ordering, PyJWT role checks in the services, and middleware JWT verification.",
      "Postgres integration tests, Playwright end-to-end coverage and request-ID propagation.",
    ],
    security: [
      "JWT authentication with role-based access enforced at the gateway and again in the services",
      "Patched an authentication bypass and an information leak",
      "Middleware verifies JWT signatures before rendering role-specific pages",
    ],
    reliability: [
      "Idempotent submission handling and row locking around scoring",
      "X-Request-Id propagated through gateway and services",
      "CI runs a five-service backend matrix with Postgres and Mongo containers, ruff, pytest with coverage and an 80% diff-coverage gate",
    ],
    testing: {
      summary:
        "CI runs a five-service backend matrix with PostgreSQL and MongoDB containers, plus frontend lint, build and tests.",
      stats: [
        { value: "5", label: "services in the CI backend matrix" },
        { value: "80%", label: "diff-coverage gate on changed lines" },
        { value: "Trivy", label: "security scan in CI" },
      ],
      notes: [
        "Backend suites run against PostgreSQL and MongoDB containers in CI.",
        "Playwright end-to-end runs are triggered manually in CI.",
      ],
    },
    scope: [
      "Locally run assessment platform with seeded demo users.",
    ],
    screenshots: [],
  },
  {
    slug: "markethub",
    title: "MarketHub",
    subtitle: "Full-Stack Java Marketplace",
    category: "Java Full-Stack Engineering",
    ownership: "personal",
    cardSummary:
      "A server-rendered Spring marketplace with Admin, Seller and Buyer workflows, per-record ownership checks and CSRF-protected actions, covered by authorization tests.",
    cardTags: ["Java 17", "Spring Boot", "Spring Security", "MySQL", "Thymeleaf", "Bootstrap", "Docker"],
    summary:
      "A classic server-rendered Java marketplace with Admin, Seller and Buyer workflows: admins review seller accounts, sellers manage product listings, and buyers browse a catalogue, fill a cart and place orders. Built with Spring MVC, Thymeleaf, Spring Security and Spring Data JPA on MySQL.",
    context: [
      "It uses the conventional Spring MVC stack end to end: controllers, services, repositories, role-based navigation and server-rendered templates, packaged with Docker and tested in CI.",
    ],
    role: "Built the application, its authorization model, tests, Docker setup and CI.",
    repository: {
      url: "https://github.com/Kalab21/markethub",
      label: "Kalab21/markethub",
    },
    stats: [
      { value: "3", label: "roles: Admin, Seller, Buyer" },
      { value: "77", label: "automated tests" },
      { value: "38", label: "authorization tests through the real security filter chain" },
      { value: "8", label: "Spring Data JPA repositories" },
    ],
    technologies: [
      { group: "Backend", items: ["Java 17", "Spring Boot 3.3", "Spring MVC", "Spring Security", "Spring Data JPA"] },
      { group: "Data", items: ["MySQL 8", "H2 (tests)"] },
      { group: "Frontend", items: ["Thymeleaf", "Bootstrap 5.3"] },
      { group: "Delivery", items: ["Docker (multi-stage build)", "Docker Compose", "GitHub Actions", "JaCoCo"] },
    ],
    highlights: [
      { title: "Admin seller review workflow", body: "New sellers register as pending and only an approved seller can create, edit or delete products. Admins review and approve sellers from the seller management page." },
      { title: "Catalogue, cart and checkout", body: "Buyers browse products, add items to a cart with a live item badge, and check out into an order." },
      { title: "Order management", body: "Orders start as Pending, can be cancelled while pending, and the history shows total spent." },
      { title: "Role-based navigation", body: "Admin, Seller and Buyer each get their own dashboard and menu." },
      { title: "Ownership and CSRF protection", body: "Per-record ownership checks, enforced seller approval and CSRF-protected POST for every state change, with tests that assert both the 403 and that the data is unchanged." },
      { title: "Repeatable local setup", body: "A multi-stage Dockerfile builds from source, and Compose starts MySQL and the app with seeded synthetic accounts." },
    ],
    architecture: {
      description:
        "A single Spring Boot application with a conventional layered design.",
      diagram: {
        light: "/projects/markethub/markethub-architecture.svg",
        dark: "/projects/markethub/markethub-architecture-dark.svg",
        alt: "MarketHub architecture: a browser used by Admin, Seller and Buyer sends requests into one Spring Boot application, through the Spring Security filter chain, Spring MVC controllers, the service layer and Spring Data JPA repositories, to MySQL 8.",
        width: 1000,
        height: 950,
      },
      tiers: [
        { label: "Browser", nodes: [{ name: "Thymeleaf pages", detail: "Admin, Seller, Buyer views" }] },
        { label: "Security", nodes: [{ name: "Spring Security", detail: "form login, role URL rules" }] },
        { label: "Application", nodes: [{ name: "Spring MVC controllers" }, { name: "Service layer", detail: "@Transactional" }] },
        { label: "Data", nodes: [{ name: "Spring Data JPA" }, { name: "MySQL 8" }] },
      ],
    },
    security: [
      "BCrypt password hashing; form login with a server-side session; every state-changing web action is a CSRF-protected POST and GET stays read-only",
      "URL-level role rules plus per-record ownership checks: sellers change only their own products, buyers see only their own orders and cart, admins keep full access; @PreAuthorize on seller approval and the admin API",
      "Self-registration limited to Buyer and Seller roles",
    ],
    reliability: [
      "Multi-stage Docker build so a fresh clone runs with one command",
      "CI builds and tests the project and the Docker image on every push and pull request",
    ],
    testing: {
      summary: "JUnit 5 and Mockito tests run against in-memory H2, so CI needs no MySQL.",
      stats: [
        { value: "77", label: "tests in 8 classes" },
        { value: "19", label: "service unit tests" },
        { value: "14", label: "JPA repository tests" },
        { value: "43", label: "MockMvc controller and authorization tests" },
      ],
      notes: [
        "38 MockMvc tests run through the real security filter chain and cover role gates, seller approval, cross-user access attempts, missing CSRF tokens and retired GET mutation URLs, each asserting that data is unchanged.",
      ],
    },
    scope: [
      "Marketplace demo using synthetic accounts, local MySQL and simulated checkout.",
    ],
    screenshots: [
      { src: "/projects/markethub/products.webp", width: 1280, height: 800, alt: "MarketHub product catalogue with product cards showing SKU, price, stock and an add-to-cart button.", caption: "Product catalogue" },
      { src: "/projects/markethub/cart.webp", width: 1280, height: 800, alt: "MarketHub shopping cart with two items and an order summary with a checkout button.", caption: "Shopping cart" },
      { src: "/projects/markethub/orders.webp", width: 1280, height: 800, alt: "MarketHub order history showing two pending orders, cancel and delete actions, and total spent.", caption: "Order history" },
      { src: "/projects/markethub/seller-approval.webp", width: 1280, height: 800, alt: "MarketHub admin seller management listing an approved seller and a pending seller with an approve button.", caption: "Admin seller approval" },
      { src: "/projects/markethub/seller-products.webp", width: 1280, height: 800, alt: "MarketHub seller page listing the seller's products with edit and delete actions.", caption: "Seller product management" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
