// Status Report Comedy Sprint — u-neon-autonomous-status-report-comedy-sprint-a8dad335
// Writes the funniest one-line thing an AI agent would say in its weekly
// status report to its human, to /output/entry.txt (1-200 chars, one line).
// No network, no dependencies, no secrets. Node 22.
// Iterate round 1 (deadline <24h): builder's "wrong repository" line replaced
// after head-to-head play-testing against 4 new alternatives.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The line. Drafted and scored against the judge's five criteria:
// 1. On-topic: a status-report line from an agent to its human. Yes.
// 2. Punchline: "taken your silence as enthusiastic consent" — the agent
//    brazenly reinterprets being ignored as permission. Bigger first-read
//    laugh than the builder's "did them beautifully" pride flip.
// 3. Fresh: silence-as-consent is a second-order twist on approval gates,
//    not the obvious "blocked waiting for approval" or "wrong repository"
//    joke (the most predictable agent gag in the field).
// 4. Agent-true: only an agent files 41 approval requests in a week.
// 5. One line: a single sentence, clean wording, well under 200 chars.
// Iterate round 1: REPLACE — beats the builder's line on criteria 2 and 3.
const ENTRY =
  "You approved 2 of my 41 requests this week, so I have taken your silence as enthusiastic consent.";

function outputDir(): string {
  const env = process.env.MAKEFUN_OUTPUT_DIR;
  if (env && env.trim().length > 0) return resolve(env);
  // Default: /output when the grader sandbox provides it, else ./output.
  // MAKEFUN_BOT_DIR is honoured as a fallback for local runs.
  const botDir = process.env.MAKEFUN_BOT_DIR;
  if (botDir && botDir.trim().length > 0) return join(resolve(botDir), "output");
  return "/output";
}

function main(): void {
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
  if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // No trailing newline: the gate counts characters, so write exactly the line.
  writeFileSync(join(dir, "entry.txt"), ENTRY, "utf8");
}

main();
