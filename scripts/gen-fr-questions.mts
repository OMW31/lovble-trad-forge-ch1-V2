import { writeFileSync } from "fs";
import { PART_A_BANK } from "../src/lib/academy/part-a-bank.ts";
import { PART_B_BANK } from "../src/lib/academy/part-b-bank.ts";

const esc = (s: string) => s.replace(/'/g, "''");
const cj = (c: { id: string; label: string }[]) => JSON.stringify(c).replace(/'/g, "''");

const lines: string[] = [];

for (const [lesson, items] of Object.entries(PART_A_BANK)) {
  for (const q of items) {
    lines.push(
      `INSERT INTO question_bank_part_a (question_key, chapter_id, lesson_id, difficulty, prompt, choices, correct_id, explanation, is_active) VALUES ('${esc(q.id)}', 'analyse-fondamentale', '${lesson}', ${q.difficulty}, '${esc(q.prompt)}', '${cj(q.choices)}'::jsonb, '${esc(q.correctId)}', '${esc(q.explanation)}', true);`
    );
  }
}

for (const [lesson, items] of Object.entries(PART_B_BANK)) {
  for (const q of items) {
    const w = q.widget ? `'${esc(q.widget)}'` : "NULL";
    const v = q.visualId ? `'${esc(q.visualId)}'` : "NULL";
    lines.push(
      `INSERT INTO question_bank_part_b (question_key, chapter_id, lesson_id, difficulty, prompt, choices, correct_id, explanation, widget, visual_id, is_active) VALUES ('${esc(q.id)}', 'analyse-fondamentale', '${lesson}', ${q.difficulty}, '${esc(q.prompt)}', '${cj(q.choices)}'::jsonb, '${esc(q.correctId)}', '${esc(q.explanation)}', ${w}, ${v}, true);`
    );
  }
}

writeFileSync("/tmp/cc-agent/68748128/project/fr-questions.sql", lines.join("\n"));
console.log(`Written ${lines.length} lines`);
