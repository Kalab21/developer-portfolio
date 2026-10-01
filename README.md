# Kalabe Kebede — Developer Portfolio

Portfolio site for a Senior Software Engineer / Forward Deployed Engineer: Java and Spring, distributed systems, data engineering, cloud and applied AI.

![CI](https://github.com/Kalab21/developer-portfolio/actions/workflows/ci.yml/badge.svg)

## Pages

`/` · `/projects` · `/projects/[slug]` (northbank, meridian-lending, rev-eval, markethub) · `/experience` · `/about` · `/resume` · `/contact`

## Stack

Next.js (App Router, Server Components), React, TypeScript, Tailwind CSS. Statically generated; no database, auth, CMS or backend. Dark/light follows the system setting.

## Content

- `src/data/site.ts` — profile, expertise, skills, experience
- `src/data/projects.ts` — typed project model rendered by one reusable page template
- `public/projects/*` — screenshots taken from the real applications
- `public/Kalabe-Kebede-Resume.pdf` — public resume

## Develop

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Updating the resume

The published resume is `public/Kalabe-Kebede-Resume.pdf`; its file name and
last-updated date live in `src/data/resume.ts`.

1. Export the final resume as a PDF.
2. Run:

   ```powershell
   npm run resume:update -- "C:\Users\Kalab\Downloads\Kalabe-Kebede-Resume.pdf"
   ```

   The command checks that the file is a sound PDF (PDF header, end marker, at
   least one page, not encrypted, under 10 MB), copies it over
   `public/Kalabe-Kebede-Resume.pdf`, and sets today's date in
   `src/data/resume.ts`. It does not record where the file came from. It does
   not read the PDF's text, so open the PDF once to confirm it is the right one.
3. Review the changed PDF and `src/data/resume.ts` with `git diff --stat`.
4. Validate: `npm run lint`, `npm test`, `npm run build`.
5. Commit and push on a branch, and merge through the normal PR workflow.

The PDF is served with `Cache-Control: public, max-age=0, must-revalidate`
(`next.config.ts`), so the newly deployed version is served at the same URL
without a version query.

**Manual fallback.** GitHub → repository → `public/` → open
`Kalabe-Kebede-Resume.pdf` → upload the new file under the same name and commit.
Then update `lastUpdated` in `src/data/resume.ts` the same way, so the date on
the Resume page matches.

## Deploy

Import the repository into Vercel (framework preset: Next.js, no environment variables required).
