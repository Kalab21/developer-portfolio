/**
 * The published resume. `npm run resume:update -- <file.pdf>` replaces the PDF
 * in public/ and rewrites `lastUpdated`; edit `fileName` only to rename it.
 */
export const resume = {
  fileName: "Kalabe-Kebede-Resume.pdf",
  /** ISO date (YYYY-MM-DD) the current PDF was installed. */
  lastUpdated: "2026-10-01",
} as const;

/** "September 30, 2026", independent of the server's time zone. */
export function formatResumeDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, day)),
  );
}
