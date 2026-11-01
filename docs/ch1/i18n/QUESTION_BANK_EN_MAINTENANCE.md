# CH1 English question bank — verified delivery, 2026-11-01

## Sources and invariants
- French reference: `part-a-bank.ts` (75 items) and `part-b-bank.ts` (59 items).
- English copy: `question-translations.en.ts`, keyed by `A:<question_key>` / `B:<question_key>`.
- Database mirror: `question_translations`, locale `en`; SQL replay archive: `question_translations_en.sql`.
- Copy alone is translated. Answer IDs/order, correct answer, difficulty, lesson, widget and visual identifiers remain attached to the French source.
- `current assets` in B:1.3-WQ11 is deliberate financial terminology for the current ratio, rather than a narrower literal translation of `actifs liquides`.

## Reusable batch workflow
1. Inventory canonical question keys by part and lesson. Never regenerate IDs.
2. Translate prompt, each choice label and explanation in lesson-sized static batches. No translation requests run in the learner experience.
3. Review terminology and numeric assumptions against the French source. Preserve the correct-answer mapping, including incorrect distractors.
4. Run `bunx vitest run src/lib/academy/question-bank-loader.test.ts` before applying data. The tests cover 134 entries, answer identity, offline behavior, locale races and grading.
5. Regenerate the escaped SQL replay archive from the catalogue. Apply data through privileged database data tooling, never a public-write policy or page-load seed.
6. Read back counts and choice order through database diagnostics, then compare all browser-delivered items with the catalogue.
7. Open all five authenticated assessments in both locales. Verify A/B prompts, choices, images and post-grade explanations. Record actual results in CHANGELOG/TASKS/SENTINEL.

## Runtime resolution
The requested UI language is explicit in assessment copy resolution. English uses the reviewed local catalogue even when the remote table is incomplete; French remains canonical. Language switches replace copy without rerolling selected questions or dropping answers. Hydration commits only the latest language request.

## Evidence
- Database: 75 A + 59 B; zero missing/misaligned choice-ID rows.
- Browser: all 134 question objects match the English catalogue; five lesson modals and both parts exercised in FR/EN.
- One intentionally failed authenticated attempt persisted (0 %, 7 A + 7 B); English feedback and seven B explanations checked without unlocking progress.
- Assessment widths exercised: 390 / 768 / 1116 / 1440 / 2560.
- Support images retained unchanged. Their embedded text and remaining historical-media labels are not translated by this question-copy catalogue.