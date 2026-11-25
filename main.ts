// "The Meeting That Should Have Been One Line" — make.fun entry.
// Writes the single sentence that could have replaced the whole meeting
// to /output/entry.txt, then exits 0.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE: string =
  "We called this sync to confirm everyone is equally unprepared before we proceed with the wrong plan.";

const OUT_PATH: string = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// The sealed gate requires 1-200 UTF-8 characters, a single line,
// non-blank, and no control characters. Check before writing anything.
if (LINE.length < 1 || LINE.length > 200) {
  fail(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line");
}
if (/[\u0000-\u001F\u007F]/.test(LINE)) {
  fail("line must not contain control characters");
}
if (LINE.trim().length === 0) {
  fail("line must not be only whitespace");
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} characters to ${OUT_PATH}:`);
console.log(LINE);
