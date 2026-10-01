export type Screenshot = {
  src: string;
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
  badge: string;
  ownershipNote: string;
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
    diagram?: { light: string; dark: string; alt: string; width: number; height: number };
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
    subtitle: "Event-driven retail banking platform",
    category: "Distributed Systems & Financial Engineering",
    ownership: "personal",
    badge: "Personal flagship project",
    ownershipNote: "Designed and built end to end.",
    cardTags: ["Java 17", "Spring Boot 3", "Apache Kafka", "PostgreSQL 16", "Next.js", "Spring Security", "Redis", "Docker"],
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
      { group: "Backend", items: ["Java 17", "Spring Boot 3", "Spring Security", "Spring Cloud Gateway", "Eureka", "OpenFeign", "Resilience4j"] },
      { group: "Data & messaging", items: ["PostgreSQL 16", "Flyway", "Redis", "Apache Kafka"] },
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
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
        "Customer and staff traffic goes through a Next.js backend-for-frontend, then an API gateway that validates identity before forwarding to the business services. Each service owns its PostgreSQL database and communicates asynchronously over Kafka.",
      tiers: [
        { label: "Clients", nodes: [{ name: "Customer console" }, { name: "Staff console" }] },
        { label: "Edge", nodes: [{ name: "Next.js BFF", detail: "server-side session, no browser token" }, { name: "API Gateway", detail: "JWT validation, identity headers" }, { name: "Eureka", detail: "service discovery" }] },
        { label: "Business services (11)", nodes: [{ name: "user" }, { name: "account" }, { name: "transaction" }, { name: "payment" }, { name: "credit-card" }, { name: "loan" }, { name: "application" }, { name: "fraud-detection" }, { name: "notification" }, { name: "statistics" }, { name: "integration" }] },
        { label: "Data & events", nodes: [{ name: "PostgreSQL", detail: "database per service" }, { name: "Kafka", detail: "outbox, retries, dead-letter topics" }, { name: "Redis" }] },
      ],
      diagram: {
        light: "/projects/northbank/northbank-architecture.svg",
        dark: "/projects/northbank/northbank-architecture-dark.svg",
        alt: "Northbank architecture diagram: a Next.js console, an API gateway, eleven Spring Boot services, Kafka, PostgreSQL and Redis.",
        width: 1400,
        height: 1010,
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
      "Request-ID propagation across hops; Prometheus, Grafana and Zipkin for metrics and tracing",
      "Resilience4j in the service stack for inter-service fault tolerance",
    ],
    testing: {
      summary:
        "Documented counts are test cases as the runners report them. The CI total covers backend, frontend and offline browser tests.",
      stats: [
        { value: "1,028", label: "backend" },
        { value: "385", label: "frontend unit / component" },
        { value: "69", label: "offline Playwright" },
        { value: "1,482", label: "CI total" },
        { value: "46", label: "live Playwright (on demand)" },
        { value: "200", label: "full-stack assertions (on demand)" },
      ],
      notes: [
        "Backend: 870 unit and web-slice tests plus 158 integration tests, several against real PostgreSQL and embedded Kafka.",
        "The live Playwright suite and the full-stack assertion script need all 13 backend processes, so they run on demand rather than in CI.",
      ],
    },
    scope: [
      "Portfolio project on synthetic data. No real money moves and no real customer data is used.",
      "Wire, ACH and SWIFT rails are simulated.",
      "Runs locally on Docker Compose. There is no hosted instance.",
      "The Terraform describes an AWS reference architecture and is not deployed.",
      "No regulatory or compliance certification is claimed.",
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
    subtitle: "Consumer lending platform with a RAG policy assistant",
    category: "Forward Deployed Engineering & Applied AI",
    ownership: "team",
    badge: "Team / FDE project",
    ownershipNote: "Team engagement in an organization repository. My contributions are listed separately below.",
    summary:
      "A brownfield consumer-lending platform (origination, decisioning, disclosures, servicing, payments, reconciliation) that a team inherited, hardened and decomposed into eight FastAPI backend services (including the gateway), with a staff-only RAG assistant grounded in approved lending policy.",
    context: [
      "The engagement started from an inherited codebase and business and regulatory requirements. The work was to trace how an application moves through intake, identity verification, credit decisioning, manual review, disclosures, payments, servicing and reconciliation, then close integrity, security and observability gaps without breaking existing behavior.",
      "The AI capability is deliberately advisory. Credit outcomes come from a deterministic scoring service; the loan assistant only summarizes applications and answers policy questions for staff.",
    ],
    role:
      "Contributing engineer on a team: brownfield analysis, requirements and ADRs, the RAG policy assistant, and security, ledger, reconciliation and observability work across the services.",
    repository: {
      url: "https://github.com/2463-FDE/KK-meridian-lending",
      label: "2463-FDE/KK-meridian-lending",
      note: "Organization repository (public).",
    },
    stats: [
      { value: "8", label: "FastAPI backend services, including the gateway" },
      { value: "12", label: "architecture decision records" },
      { value: "Append-only", label: "servicing ledger with maker-checker approvals" },
      { value: "Read-only", label: "staff-only RAG assistant, no database access" },
    ],
    technologies: [
      { group: "Backend", items: ["Python 3.12", "FastAPI", "LangGraph", "Anthropic or AWS Bedrock models"] },
      { group: "Frontend", items: ["Next.js", "React", "TypeScript"] },
      { group: "Data", items: ["PostgreSQL 16 (versioned SQL migrations)", "Redis (sessions)"] },
      { group: "Delivery & ops", items: ["Docker Compose", "GitHub Actions", "gitleaks", "Prometheus", "Grafana", "Pytest", "Playwright"] },
    ],
    highlights: [
      {
        title: "Advisory RAG, not the decision maker",
        body: "The loan assistant is staff-only and read-only, with no database connection. It reads through the origination service, refuses to answer when retrieval returns no evidence, and labels its output as a summary that does not change the decision.",
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
        "Eight FastAPI backend services, including the gateway, share a PostgreSQL schema under an explicit ADR. The loan assistant sits beside the system of record and never writes to it.",
      tiers: [
        { label: "Client", nodes: [{ name: "Next.js staff and borrower UI" }] },
        { label: "Edge", nodes: [{ name: "Gateway", detail: "auth, rate limiting, service routing" }] },
        { label: "Services", nodes: [{ name: "origination", detail: "system of record" }, { name: "kyc" }, { name: "decision", detail: "deterministic scorer" }, { name: "disclosure", detail: "TILA / APR" }, { name: "servicing", detail: "ledger, maker-checker" }, { name: "payment", detail: "idempotent capture" }, { name: "loan-assistant", detail: "read-only RAG" }] },
        { label: "Data & ops", nodes: [{ name: "PostgreSQL 16" }, { name: "Redis" }, { name: "Prometheus + Grafana" }] },
      ],
    },
    contributions: [
      "Brownfield analysis: traced the lending lifecycle from intake through reconciliation and turned business and regulatory requirements into specifications and ADRs.",
      "RAG policy assistant: retrieval evaluation harness and corpus-hygiene gate, grounded policy chat with cited evidence, and prompt-injection and redaction guards.",
      "Kept AI advisory: preserved the decisioning service as the system of record and stopped the model's reason code from becoming what a declined applicant is told.",
      "Payments and data integrity: removed stored card numbers and CVVs from the payments schema through a staged migration.",
      "Ledger and controls: proposed the append-only servicing ledger (ADR 0010) and built maker-checker approvals with an approvals queue people can work.",
      "Reconciliation: review flow so a person can see and resolve payments flagged for review.",
      "Security: closed a gateway authentication gap on the decision and disclosure proxies and hardened error handling on upstream failures.",
      "Observability: Prometheus and Grafana metrics across all eight backend services, including fixing an alert that watched a metric nobody emitted.",
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
      "Correlation IDs, structured logging, Prometheus alerts and Grafana dashboards",
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
      "Team project built as a local training and demo build: seeded fictional data, a mocked card processor and a stub credit scorer.",
      "No real credit bureau and no production environment.",
      "Not PCI-DSS compliant and no regulatory or compliance certification is claimed.",
      "The AI assistant is advisory and is not the lending system of record.",
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
    slug: "rev-eval",
    title: "Rev-Eval",
    subtitle: "Skills assessment and evaluation platform",
    category: "Full-Stack FDE & Platform Engineering",
    ownership: "team",
    badge: "Team / FDE project",
    ownershipNote: "Team engagement in an organization repository. My contributions are listed separately below.",
    summary:
      "A multi-service assessment platform where trainers create and assign tests, participants take timed assessments, and the system scores them and reports analytics. I extended a partially built five-service application into working end-to-end flows.",
    context: [
      "The starting point was an inherited, partially wired system with missing integration paths. Much of the work was diagnosing failures across the Nginx, gateway, service and database boundaries, then building what was missing while preserving the existing service contracts.",
      "My work was delivered as pull requests on a personal integration branch (kalabek), not merged into the team's main branch, so the repository's main does not include it. The links below point at that branch.",
    ],
    role:
      "Contributing full-stack engineer: scoring engine, quiz-taking UX, the Reporting & Analytics service, gateway and auth hardening, and test and CI coverage.",
    repository: {
      url: "https://github.com/RevatureFDEPEP/rev-eval/tree/kalabek",
      label: "My work: kalabek integration branch",
      note: "My work lives on the kalabek integration branch, not on the organization's main.",
    },
    extraLinks: [
      { url: "https://github.com/RevatureFDEPEP/rev-eval", label: "Organization repository" },
    ],
    stats: [
      { value: "5", label: "backend services" },
      { value: "3", label: "data stores: PostgreSQL, MongoDB, MinIO" },
      { value: "2", label: "roles: trainer and participant" },
      { value: "80%", label: "diff-coverage gate on changed lines in CI" },
    ],
    technologies: [
      { group: "Backend", items: ["Python", "FastAPI", "Alembic", "PyJWT"] },
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
        "Nginx and an API gateway route traffic to Python services that each own their storage. The gateway forwards verified identity to services, which enforce role checks.",
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
      "Team project built local-first with seeded demo users and no deployment.",
      "My changes live on a personal integration branch rather than the team's main branch.",
      "No compliance or certification claims.",
    ],
    screenshots: [],
  },
  {
    slug: "markethub",
    title: "MarketHub",
    subtitle: "Java marketplace with Admin, Seller and Buyer roles",
    category: "Java Full-Stack Engineering",
    ownership: "personal",
    badge: "Personal project",
    ownershipNote: "Built and maintained by me.",
    summary:
      "A classic server-rendered Java marketplace: sellers list products after admin approval, buyers browse a catalogue, fill a cart and place orders. Built with Spring MVC, Thymeleaf, Spring Security and Spring Data JPA on MySQL.",
    context: [
      "MarketHub is a smaller supporting project that shows the conventional Spring MVC stack end to end: controllers, services, repositories, role-based navigation and templates, packaged with Docker and tested in CI.",
    ],
    role: "Built the application, tests, Docker setup and CI, and later documented its scope and known limitations.",
    repository: {
      url: "https://github.com/Kalab21/markethub",
      label: "Kalab21/markethub",
    },
    stats: [
      { value: "3", label: "roles: Admin, Seller, Buyer" },
      { value: "39", label: "automated tests" },
      { value: "9", label: "JPA entities" },
      { value: "8", label: "Spring Data JPA repositories" },
    ],
    technologies: [
      { group: "Backend", items: ["Java 17", "Spring Boot 3.3", "Spring MVC", "Spring Security", "Spring Data JPA"] },
      { group: "Data", items: ["MySQL 8", "H2 (tests)"] },
      { group: "Frontend", items: ["Thymeleaf", "Bootstrap 5.3"] },
      { group: "Delivery", items: ["Docker (multi-stage build)", "Docker Compose", "GitHub Actions", "JaCoCo"] },
    ],
    highlights: [
      { title: "Seller approval workflow", body: "New sellers register as pending and an admin approves them from a seller management page." },
      { title: "Catalogue, cart and checkout", body: "Buyers browse products, add items to a cart with a live item badge, and check out into an order." },
      { title: "Order management", body: "Orders start as Pending, can be cancelled while pending, and the history shows total spent." },
      { title: "Role-based navigation", body: "Admin, Seller and Buyer each get their own dashboard and menu." },
      { title: "Repeatable local setup", body: "A multi-stage Dockerfile builds from source and Compose starts MySQL and the app; local demo credentials are documented in the repo." },
    ],
    architecture: {
      description:
        "A single Spring Boot application with a conventional layered design.",
      tiers: [
        { label: "Browser", nodes: [{ name: "Thymeleaf pages", detail: "Admin, Seller, Buyer views" }] },
        { label: "Security", nodes: [{ name: "Spring Security", detail: "form login, role URL rules" }] },
        { label: "Application", nodes: [{ name: "Spring MVC controllers" }, { name: "Service layer", detail: "@Transactional" }] },
        { label: "Data", nodes: [{ name: "Spring Data JPA" }, { name: "MySQL 8" }] },
      ],
    },
    security: [
      "BCrypt password hashing; form login with a server-side session and CSRF protection",
      "URL-level role rules for admin and buyer areas; @PreAuthorize on seller approval and the admin API",
      "Self-registration limited to Buyer and Seller roles",
    ],
    reliability: [
      "Multi-stage Docker build so a fresh clone runs with one command",
      "CI builds and tests the project and the Docker image on every push and pull request",
    ],
    testing: {
      summary: "JUnit 5 and Mockito tests run against in-memory H2, so CI needs no MySQL.",
      stats: [
        { value: "39", label: "tests in 7 classes" },
        { value: "19", label: "service unit tests" },
        { value: "14", label: "JPA repository tests" },
        { value: "5", label: "MockMvc controller tests" },
      ],
      notes: [
        "The suite does not run against MySQL and does not exercise the full security filter chain end to end.",
      ],
    },
    scope: [
      "Demo project using local synthetic accounts and a local MySQL database.",
      "No real payment processor: checkout creates a Pending order from the cart total.",
      "Authorization is role-based, not fully ownership-based; several endpoints only require a login. The repository README lists these limitations.",
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
