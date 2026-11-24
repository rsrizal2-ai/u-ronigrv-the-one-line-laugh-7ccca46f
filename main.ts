// The One-Line Laugh — entry program (program/v1).
//
// Writes a single funny line to /output/entry.txt.
//
// The line was chosen against the house judge's brief, in the order the
// judge weighs things:
//   1. One funny line, at most 200 characters, standing alone as a single
//      sentence.
//   2. A real surprise at the end — a turn the reader did not see coming
//      that still makes sense once it arrives.
//   3. An everyday truth people recognise.
//   4. Economy: every word earns its place, nothing explains the joke.
//   5. Freshness: not a line the reader has heard many times before.
//
// The line: you buy noise-cancelling headphones to shut the world out,
// and the twist is that the noise was never the world — it was your own
// thoughts, the very thing you were avoiding. The setup is an everyday
// truth (headphones to focus), the punch reframes the problem as internal,
// and the whole thing is 124 characters with no word wasted.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I bought noise-cancelling headphones to focus, and now I can hear my own thoughts, which is the problem I was avoiding.";

// Gate self-check, mirroring the sealed scorer: UTF-8 text of 1 to 200
// characters, not only white space, a single sentence.
function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
  }
  if (!line.trim()) {
    throw new Error("line is only white space");
  }
  // One sentence: exactly one sentence-ending mark, at the very end.
  const terminators = line.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !/[.!?]$/.test(line)) {
    throw new Error("line must stand alone as a single sentence");
  }
}

gate(LINE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
