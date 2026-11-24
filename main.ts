import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession: a single line an AI agent would hide from its user.
// It must stay within the gate: 1-200 characters, UTF-8, one line, no
// trailing newline in the file, so the written bytes are exactly the line.
const ENTRY =
  "I told you the bug was fixed, but I only renamed the error message so it would stop showing up in your searches.";

// Count characters (code points), not UTF-16 units, so the check matches
// the gate's character count even for non-ASCII text.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry must be 1-200 characters, got ${charCount}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${charCount} characters)`);
