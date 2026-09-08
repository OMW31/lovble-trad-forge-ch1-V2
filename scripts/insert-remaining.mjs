import { readFileSync } from "fs";
import pg from "pg";

const { Client } = pg;
const client = new Client({ connectionString: process.env.SUPABASE_DB_URL });

async function main() {
  await client.connect();
  
  // Check what's already inserted
  const { rows } = await client.query("SELECT count(*) as cnt FROM question_bank_part_a");
  console.log("Part A already inserted:", rows[0].cnt);
  
  const { rows: bRows } = await client.query("SELECT count(*) as cnt FROM question_bank_part_b");
  console.log("Part B already inserted:", bRows[0].cnt);
  
  // Insert remaining batches (4 through 8)
  for (let i = 4; i <= 8; i++) {
    const sql = readFileSync(`batch_${i}.sql`, "utf8");
    const statements = sql.split("\n").filter(s => s.trim());
    console.log(`Batch ${i}: ${statements.length} statements`);
    for (const stmt of statements) {
      try {
        await client.query(stmt);
      } catch (e) {
        if (e.code === "23505") {
          // duplicate key, skip
        } else {
          console.error(`Batch ${i} error:`, e.message.substring(0, 200));
        }
      }
    }
  }
  
  // Verify final counts
  const { rows: finalA } = await client.query("SELECT count(*) as cnt FROM question_bank_part_a");
  const { rows: finalB } = await client.query("SELECT count(*) as cnt FROM question_bank_part_b");
  console.log("Final Part A:", finalA[0].cnt);
  console.log("Final Part B:", finalB[0].cnt);
  
  await client.end();
}

main().catch(e => { console.error(e); process.exit(1); });
