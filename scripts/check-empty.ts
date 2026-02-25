import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ffncptuagluktzfkzvrt.supabase.co",
  "sb_publishable_7vtwciUX7N7H_NVWbtGhgQ_kk8Y3WiA"
);

async function main() {
  const { data } = await supabase
    .from("crafts")
    .select("id, name, category, history, technique")
    .order("name");

  if (!data) return;

  const empty = data.filter((d) => !d.history || d.history === "");
  const filled = data.filter((d) => d.history && d.history !== "");

  console.log("データあり:", filled.length);
  console.log("データなし:", empty.length);

  // Print names needing data, grouped by category
  const cats: Record<string, string[]> = {};
  for (const c of empty) {
    if (!cats[c.category]) cats[c.category] = [];
    cats[c.category].push(c.name);
  }
  for (const [cat, names] of Object.entries(cats).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n${cat} (${names.length}):`);
    console.log("  " + names.join(", "));
  }
}

main();
