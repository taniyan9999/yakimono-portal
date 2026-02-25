import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

const supabase = createClient(
  "https://ffncptuagluktzfkzvrt.supabase.co",
  "sb_publishable_7vtwciUX7N7H_NVWbtGhgQ_kk8Y3WiA"
);

async function main() {
  const { data } = await supabase
    .from("crafts")
    .select("id, name, category, prefecture, city")
    .or("history.is.null,history.eq.")
    .order("category")
    .order("name");

  if (!data) {
    console.log("No data");
    return;
  }

  console.log(`Found ${data.length} crafts needing data`);
  writeFileSync(
    "data/sample/empty-crafts.json",
    JSON.stringify(data, null, 2),
    "utf-8"
  );
  console.log("Written to data/sample/empty-crafts.json");
}

main();
