# Kalab Kebede — Developer Portfolio

Portfolio site for a Senior Software Engineer / Forward Deployed Engineer: Java and Spring, distributed systems, data engineering, cloud and applied AI.

![CI](https://github.com/Kalab21/developer-portfolio/actions/workflows/ci.yml/badge.svg)

## Pages

`/` · `/projects` · `/projects/[slug]` (northbank, meridian-lending, rev-eval, markethub) · `/experience` · `/about` · `/contact`

## Stack

Next.js (App Router, Server Components), React, TypeScript, Tailwind CSS. Statically generated; no database, auth, CMS or backend. Dark/light follows the system setting.

## Content

- `src/data/site.ts` — profile, expertise, skills, experience
- `src/data/projects.ts` — typed project model rendered by one reusable page template
- `public/projects/*` — screenshots taken from the real applications

## Develop

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Deploy

Import the repository into Vercel (framework preset: Next.js, no environment variables required).
