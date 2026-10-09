/**
 * The published resume, served from public/. When the PDF is replaced, update
 * `lastUpdated`; scripts/resume-pdf.test.mjs checks the file in CI.
 */
export const resume = {
  fileName: "Kalabe-Kebede-Resume.pdf",
  /** ISO date (YYYY-MM-DD) the current PDF was published. */
  lastUpdated: "2026-10-09",
} as const;

/** Format the ISO resume date independently of the server time zone. */
export function formatResumeDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, day)),
  );
}
