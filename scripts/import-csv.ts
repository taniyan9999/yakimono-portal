import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import { resolve } from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("環境変数 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY が設定されていません");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const csvPath = resolve(__dirname, "../data/sample/crafts.csv");
  const csvContent = readFileSync(csvPath, "utf-8");

  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  console.log(`${records.length} 件のデータを読み込みました`);

  for (const record of records) {
    const row = {
      name: record.name,
      name_kana: record.name_kana,
      prefecture: record.prefecture,
      city: record.city,
      category: record.category,
      description: record.description,
      history: record.history,
      technique: record.technique,
      designated_year: record.designated_year
        ? parseInt(record.designated_year, 10)
        : null,
      official_url: record.official_url || null,
      image_url: record.image_url || null,
    };

    const { data, error } = await supabase
      .from("crafts")
      .upsert(row, { onConflict: "name" })
      .select()
      .single();

    if (error) {
      console.error(`  ✗ ${record.name}: ${error.message}`);
    } else {
      console.log(`  ✓ ${data.name}（${data.prefecture} ${data.city}）`);
    }
  }

  console.log("\nインポート完了");
}

main().catch((e) => {
  console.error("インポートエラー:", e);
  process.exit(1);
});
