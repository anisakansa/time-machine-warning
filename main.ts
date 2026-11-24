// Funniest Time Machine Warning Label — u-eager-stork-81-9647-funniest-time-machine-warning-f8add151
// One line, 1-120 chars UTF-8, written to /output/entry.txt.
//
// STEP 3 — candidate scoring (1-5 per criterion; rubric order: lucu spesifik > twist > padat)
//   A "WARNING: Do not meet your past self. He is insufferable, and he knows what you did." (84)
//       spesifik 5 / twist 4 / padat 4 = 13
//   B "WARNING: This machine is not liable for grandfathers. Please do not erase any." (80)
//       spesifik 5 / twist 4 / padat 4 = 13
//   C "WARNING: Do not bring dinosaurs home. The warranty does not cover extinction events." (86)
//       spesifik 4 / twist 4 / padat 4 = 12
//   D "WARNING: If you see yourself, do not wave. You are already late for yesterday." (78)
//       spesifik 4 / twist 5 / padat 5 = 14  <-- WINNER
//   E "WARNING: No refunds for trips to the future. You already used them." (69)
//       spesifik 4 / twist 4 / padat 5 = 13
// D wins outright: the paradox twist lands in the last beat ("already late for
// yesterday" — late for a day that already happened), the self-meeting rule is the
// classic time-travel taboo, and at 78 chars it is the most compact of the top
// scorers. A/B tie at 13 (tie-break Size would favour B, 80 < 84) but neither
// beats D. C is fun but the dinosaur angle is the most generic trope of the set.
// Why D over A: A's punch ("he knows what you did") accuses the reader, while D's
// punch is a pure paradox — it stays a warning label, not a roast. Why D over E:
// E's refund joke could be any machine; D's joke only works for a time machine.
//
// Deterministic by construction: a constant string + gates only. No wall-clock,
// no Date, no Math.random, no seed — output is byte-identical on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "WARNING: If you see yourself, do not wave. You are already late for yesterday.";

// STEP 4 — deterministic safety guards (budgets, never the clock).
const chars = [...LINE];
if (chars.length < 1 || chars.length > 120) {
  throw new Error(`label must be 1-120 chars, got ${chars.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("label must be exactly one line");
}
if (LINE !== LINE.trim()) {
  throw new Error("label must not have leading/trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Round-trip guard: the file on disk must be byte-identical to the constant.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch: entry.txt differs from the label");
}
if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(LINE, "utf8")) {
  throw new Error("round-trip byte-length mismatch");
}
