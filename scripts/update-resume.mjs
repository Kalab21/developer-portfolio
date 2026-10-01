#!/usr/bin/env node
/**
 * Replace the published resume with a local PDF.
 *
 *   npm run resume:update -- "C:\path\to\Kalabe-Kebede-Resume.pdf"
 *
 * Checks that the file is a structurally sound PDF, copies it to
 * public/<resume.fileName>, and sets resume.lastUpdated in src/data/resume.ts.
 * The source path is never written to any file.
 *
 * Uses only Node built-ins. The PDF's text is not checked for a name: resumes
 * exported from editors usually store text through glyph-encoded fonts, so a
 * reliable check would need a full PDF text library.
 */
import { existsSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { inflateSync } from "node:zlib";

export const MIN_BYTES = 1024;
export const MAX_BYTES = 10 * 1024 * 1024;

const DEFAULT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Throws with a message a person can act on, or returns { pages }. */
export function validatePdf(buffer) {
  if (buffer.length === 0) throw new Error("The file is empty.");
  if (buffer.length < MIN_BYTES) throw new Error(`The file is only ${buffer.length} bytes; a real resume PDF is larger.`);
  if (buffer.length > MAX_BYTES) {
    throw new Error(`The file is ${(buffer.length / 1024 / 1024).toFixed(1)} MB; the limit is ${MAX_BYTES / 1024 / 1024} MB.`);
  }
  const head = buffer.subarray(0, 1024).toString("latin1");
  if (!/%PDF-[12]\.\d/.test(head)) throw new Error("The file does not start with a PDF header (%PDF-1.x or %PDF-2.x).");
  const tail = buffer.subarray(Math.max(0, buffer.length - 1024)).toString("latin1");
  if (!tail.includes("%%EOF") || !tail.includes("startxref")) {
    throw new Error("The file has no PDF end marker; it looks truncated or corrupted.");
  }
  const text = buffer.toString("latin1");
  if (/\/Encrypt\b/.test(text)) throw new Error("The PDF is encrypted or password-protected; export it without protection.");
  const pages = countPages(buffer, text);
  if (pages < 1) throw new Error("No pages were found in the PDF.");
  return { pages };
}

/** Page objects, including ones inside compressed object streams (PDF 1.5+). */
function countPages(buffer, text) {
  const pagePattern = /\/Type\s*\/Page(?![a-zA-Z])/g;
  let pages = (text.match(pagePattern) || []).length;
  const streamStart = /stream\r?\n/g;
  let match;
  while ((match = streamStart.exec(text))) {
    const start = match.index + match[0].length;
    const end = text.indexOf("endstream", start);
    if (end < 0) break;
    try {
      pages += (inflateSync(buffer.subarray(start, end)).toString("latin1").match(pagePattern) || []).length;
    } catch {
      // Not a Flate stream (an image, say); nothing to count.
    }
    streamStart.lastIndex = end;
  }
  return pages;
}

export function readResumeFileName(resumeTs) {
  const match = /fileName:\s*"([^"]+)"/.exec(resumeTs);
  if (!match || !/^[\w.-]+\.pdf$/i.test(match[1])) {
    throw new Error("src/data/resume.ts has no valid fileName.");
  }
  return match[1];
}

export function withLastUpdated(resumeTs, isoDate) {
  const pattern = /lastUpdated:\s*"\d{4}-\d{2}-\d{2}"/g;
  if ((resumeTs.match(pattern) || []).length !== 1) {
    throw new Error("src/data/resume.ts must contain exactly one lastUpdated date.");
  }
  return resumeTs.replace(pattern, `lastUpdated: "${isoDate}"`);
}

/** Today's date where the command is run, as YYYY-MM-DD. */
export function localIsoDate(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function updateResume(sourceArg, { root = DEFAULT_ROOT, today = localIsoDate() } = {}) {
  if (!sourceArg) throw new Error('Usage: npm run resume:update -- "path/to/resume.pdf"');
  const source = resolve(sourceArg);
  if (!existsSync(source) || !statSync(source).isFile()) throw new Error("The file was not found.");
  if (extname(source).toLowerCase() !== ".pdf") throw new Error("The file must have a .pdf extension.");

  const buffer = readFileSync(source);
  const { pages } = validatePdf(buffer);

  const resumeTsPath = join(root, "src", "data", "resume.ts");
  const resumeTs = readFileSync(resumeTsPath, "utf8");
  const fileName = readResumeFileName(resumeTs);
  const nextResumeTs = withLastUpdated(resumeTs, today);

  // Written beside the destination and renamed over it, so a failure part-way
  // never leaves a half-written resume in public/.
  const destination = join(root, "public", fileName);
  writeFileSync(`${destination}.tmp`, buffer);
  renameSync(`${destination}.tmp`, destination);
  writeFileSync(resumeTsPath, nextResumeTs);

  return { fileName, pages, bytes: buffer.length, today, sourceName: basename(source) };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) {
  try {
    const r = updateResume(process.argv[2]);
    console.log(`Installed ${r.sourceName} as public/${r.fileName} (${r.pages} page${r.pages === 1 ? "" : "s"}, ${Math.round(r.bytes / 1024)} KB).`);
    console.log(`Resume last updated: ${r.today}.`);
    console.log("Next: review the PDF, run npm run lint, npm test and npm run build, then commit through a PR.");
  } catch (error) {
    console.error(`Resume not updated: ${error.message}`);
    process.exit(1);
  }
}
