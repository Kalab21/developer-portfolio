// Structural checks on the published resume PDF. Node built-ins only.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const resumeTs = readFileSync(join(ROOT, "src", "data", "resume.ts"), "utf8");
const fileName = /fileName:\s*"([^"]+)"/.exec(resumeTs)?.[1];

/** Page objects, including ones inside compressed object streams (PDF 1.5+). */
function countPages(buffer) {
  const text = buffer.toString("latin1");
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

test("resume metadata names a PDF and holds one ISO date", () => {
  assert.match(fileName ?? "", /^[\w.-]+\.pdf$/i);
  assert.equal((resumeTs.match(/lastUpdated:\s*"\d{4}-\d{2}-\d{2}"/g) || []).length, 1);
});

test("the published resume is a complete, unencrypted PDF with pages", () => {
  const buffer = readFileSync(join(ROOT, "public", fileName));
  assert.ok(buffer.length > 1024 && buffer.length < 10 * 1024 * 1024, `unexpected size ${buffer.length}`);
  assert.match(buffer.subarray(0, 1024).toString("latin1"), /%PDF-[12]\.\d/);
  const tail = buffer.subarray(Math.max(0, buffer.length - 1024)).toString("latin1");
  assert.ok(tail.includes("%%EOF") && tail.includes("startxref"), "missing PDF end marker");
  assert.doesNotMatch(buffer.toString("latin1"), /\/Encrypt\b/);
  assert.ok(countPages(buffer) >= 1, "no pages found");
});
