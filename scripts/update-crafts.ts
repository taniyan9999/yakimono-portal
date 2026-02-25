import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const supabase = createClient(
  "https://ffncptuagluktzfkzvrt.supabase.co",
  "sb_publishable_7vtwciUX7N7H_NVWbtGhgQ_kk8Y3WiA"
);

type CraftUpdate = {
  name: string;
  history: string;
  technique: string;
};

async function main() {
  const batchDir = join(process.cwd(), "data", "batch");
  const files = readdirSync(batchDir).filter((f) => f.endsWith(".json"));

  console.log(`Found ${files.length} batch files`);

  let totalUpdated = 0;
  let totalFailed = 0;

  for (const file of files.sort()) {
    console.log(`\nProcessing ${file}...`);
    const raw = readFileSync(join(batchDir, file), "utf-8");
    let crafts: CraftUpdate[];
    try {
      crafts = JSON.parse(raw);
    } catch (e) {
      console.error(`  Failed to parse ${file}: ${e}`);
      continue;
    }

    for (const craft of crafts) {
      if (!craft.name || !craft.history || !craft.technique) {
        console.warn(`  Skipping incomplete entry: ${craft.name || "unknown"}`);
        totalFailed++;
        continue;
      }

      const { error } = await supabase
        .from("crafts")
        .update({ history: craft.history, technique: craft.technique })
        .eq("name", craft.name);

      if (error) {
        console.error(`  Failed to update ${craft.name}: ${error.message}`);
        totalFailed++;
      } else {
        totalUpdated++;
      }
    }
    console.log(`  Done: ${crafts.length} entries processed`);
  }

  console.log(`\nComplete: ${totalUpdated} updated, ${totalFailed} failed`);

  // Verify
  const { data } = await supabase
    .from("crafts")
    .select("id, name")
    .or("history.is.null,history.eq.")
    .order("name");

  console.log(`Remaining crafts without data: ${data?.length ?? "unknown"}`);
}

main();
