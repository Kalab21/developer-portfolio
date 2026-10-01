import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { deflateSync } from "node:zlib";
import {
  MAX_BYTES,
  readResumeFileName,
  updateResume,
  validatePdf,
  withLastUpdated,
} from "./update-resume.mjs";

/** A small, structurally valid PDF padded past the minimum size. */
function pdf({ body = "1 0 obj << /Type /Page >> endobj\n", header = "%PDF-1.7\n", end = "startxref\n0\n%%EOF\n" } = {}) {
  return Buffer.from(header + body + "%".repeat(1200) + "\n" + end, "latin1");
}

test("a valid PDF passes and its page is counted", () => {
  assert.equal(validatePdf(pdf()).pages, 1);
});

test("pages inside a compressed object stream are counted", () => {
  const packed = deflateSync(Buffer.from("<< /Type /Page >> << /Type /Page >>"));
  const buffer = Buffer.concat([
    Buffer.from("%PDF-1.7\n1 0 obj << /Type /ObjStm /Filter /FlateDecode >>\nstream\n", "latin1"),
    packed,
    Buffer.from("\nendstream\nendobj\n" + "%".repeat(1200) + "\nstartxref\n0\n%%EOF\n", "latin1"),
  ]);
  assert.equal(validatePdf(buffer).pages, 2);
});

test("an empty file is refused", () => {
  assert.throws(() => validatePdf(Buffer.alloc(0)), /empty/);
});

test("a non-PDF file is refused", () => {
  const png = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47]), Buffer.alloc(2000)]);
  assert.throws(() => validatePdf(png), /PDF header/);
});

test("a truncated PDF is refused", () => {
  assert.throws(() => validatePdf(pdf({ end: "" })), /truncated/);
});

test("a PDF without pages is refused", () => {
  assert.throws(() => validatePdf(pdf({ body: "1 0 obj << /Type /Catalog >> endobj\n" })), /No pages/);
});

test("an encrypted PDF is refused", () => {
  assert.throws(() => validatePdf(pdf({ body: "1 0 obj << /Type /Page >> endobj\ntrailer << /Encrypt 5 0 R >>\n" })), /encrypted/);
});

test("a file over the size limit is refused", () => {
  const big = Buffer.concat([pdf(), Buffer.alloc(MAX_BYTES)]);
  assert.throws(() => validatePdf(big), /limit/);
});

test("the published resume is a valid PDF", () => {
  assert.ok(validatePdf(readFileSync("public/Kalabe-Kebede-Resume.pdf")).pages >= 1);
});

test("the resume metadata names the published file and holds one date", () => {
  const resumeTs = readFileSync("src/data/resume.ts", "utf8");
  assert.equal(readResumeFileName(resumeTs), "Kalabe-Kebede-Resume.pdf");
  assert.match(withLastUpdated(resumeTs, "2027-01-02"), /lastUpdated: "2027-01-02"/);
});

test("updateResume installs the file, sets the date and stores no source path", () => {
  const root = mkdtempSync(join(tmpdir(), "resume-root-"));
  const downloads = mkdtempSync(join(tmpdir(), "resume-src-"));
  try {
    mkdirSync(join(root, "public"));
    mkdirSync(join(root, "src", "data"), { recursive: true });
    writeFileSync(join(root, "src", "data", "resume.ts"),
      'export const resume = {\n  fileName: "Kalabe-Kebede-Resume.pdf",\n  lastUpdated: "2026-01-01",\n} as const;\n');
    const source = join(downloads, "New Resume.pdf");
    writeFileSync(source, pdf());

    const result = updateResume(source, { root, today: "2026-10-05" });

    assert.equal(result.fileName, "Kalabe-Kebede-Resume.pdf");
    assert.deepEqual(readFileSync(join(root, "public", "Kalabe-Kebede-Resume.pdf")), pdf());
    const resumeTs = readFileSync(join(root, "src", "data", "resume.ts"), "utf8");
    assert.match(resumeTs, /lastUpdated: "2026-10-05"/);
    assert.ok(!resumeTs.includes(downloads), "the source path must not be stored");
  } finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(downloads, { recursive: true, force: true });
  }
});

test("updateResume refuses a missing file and a non-.pdf extension", () => {
  assert.throws(() => updateResume(join(tmpdir(), "does-not-exist.pdf")), /not found/);
  const dir = mkdtempSync(join(tmpdir(), "resume-ext-"));
  try {
    const txt = join(dir, "resume.txt");
    writeFileSync(txt, pdf());
    assert.throws(() => updateResume(txt), /\.pdf extension/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
