#!/usr/bin/env node
/**
 * TradForge — Conversion reproductible des assets Chapitre 1 en WebP.
 *
 * Source  : public/academy/ch1/visuals_v2/*.png  → public/academy/ch1/v2/*.webp
 *           public/academy/ch1/backgroound/*.png → public/academy/ch1/backgrounds/bgN.webp
 *
 * Non destructif : les PNG sources et les V1 (visuals/a1..a17.webp) ne sont
 * jamais touchés. Un fichier déjà converti est ignoré sauf --force.
 *
 * Usage : node scripts/convert-assets.mjs [--force]
 */
import { mkdir, readdir, access } from "node:fs/promises";
import { join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const FORCE = process.argv.includes("--force");
const ROOT = "public/academy/ch1";
const JOBS = [
  { from: `${ROOT}/visuals_v2`, to: `${ROOT}/v2`, rename: null },
  { from: `${ROOT}/backgroound`, to: `${ROOT}/backgrounds`, rename: (_n, i) => `bg${i + 1}` },
];

const exists = async (p) => access(p).then(() => true).catch(() => false);

for (const job of JOBS) {
  if (!(await exists(job.from))) {
    console.log(`skip: ${job.from} absent`);
    continue;
  }
  await mkdir(job.to, { recursive: true });
  const files = (await readdir(job.from)).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();

  for (const [i, file] of files.entries()) {
    const base = job.rename ? job.rename(file, i) : file.replace(/\.[^.]+$/, "");
    const out = join(job.to, `${base}.webp`);
    if (!FORCE && (await exists(out))) {
      console.log(`= ${out}`);
      continue;
    }
    await run("magick", [join(job.from, file), "-quality", "85", "-define", "webp:method=6", out]);
    console.log(`+ ${out}`);
  }
}
console.log("done.");
