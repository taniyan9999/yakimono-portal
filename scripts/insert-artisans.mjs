#!/usr/bin/env node
/**
 * artisans-all.json の全職人データを Supabase に投入するスクリプト
 * craft_id は crafts テーブルの name から自動マッピング
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { randomUUID } from "crypto";

const SUPABASE_URL = "https://ffncptuagluktzfkzvrt.supabase.co";
const SUPABASE_KEY = "sb_publishable_7vtwciUX7N7H_NVWbtGhgQ_kk8Y3WiA";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  console.log("=== 職人データ一括投入スクリプト ===\n");

  // 1. crafts テーブルから name → id マッピングを取得
  console.log("1. crafts テーブルからマッピング取得中...");
  const allCrafts = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const { data, error } = await supabase
      .from("crafts")
      .select("id, name")
      .range(from, from + pageSize - 1);
    if (error) {
      console.error("crafts 取得エラー:", error.message);
      process.exit(1);
    }
    allCrafts.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  const craftMap = new Map();
  for (const c of allCrafts) {
    craftMap.set(c.name, c.id);
  }
  console.log(`   → ${craftMap.size} 件の工芸品を取得\n`);

  // 2. artisans-all.json を読み込み
  console.log("2. artisans-all.json を読み込み中...");
  const raw = readFileSync(
    new URL("../src/data/artisans-all.json", import.meta.url),
    "utf-8"
  );
  const artisansData = JSON.parse(raw);
  console.log(`   → ${Object.keys(artisansData).length} カテゴリ\n`);

  // 3. 投入データを作成
  console.log("3. 投入データを作成中...");
  const rows = [];
  const missing = [];

  for (const [craftName, artisans] of Object.entries(artisansData)) {
    const craftId = craftMap.get(craftName);
    if (!craftId) {
      missing.push(craftName);
      continue;
    }
    for (const a of artisans) {
      rows.push({
        id: randomUUID(),
        name: a.name,
        craft_id: craftId,
        generation: a.generation || null,
        biography: a.biography || null,
        philosophy: a.philosophy || null,
        quote: a.quote || null,
        workshop_name: a.workshop_name || null,
      });
    }
  }

  if (missing.length > 0) {
    console.warn(`   ⚠ crafts テーブルにマッチしない工芸品: ${missing.join(", ")}`);
  }
  console.log(`   → ${rows.length} 名分のデータを作成\n`);

  // 4. 既存データを削除
  console.log("4. 既存の artisans データを削除中...");
  const { count: existingCount } = await supabase
    .from("artisans")
    .select("id", { count: "exact", head: true });
  console.log(`   → 現在 ${existingCount} 件のレコードが存在`);

  if (existingCount > 0) {
    // stories テーブルの artisan_id を先に NULL に
    const { error: storyErr } = await supabase
      .from("stories")
      .update({ artisan_id: null })
      .not("artisan_id", "is", null);
    if (storyErr) {
      console.warn(`   ⚠ stories の artisan_id クリアに失敗: ${storyErr.message}`);
    }

    // 既存 artisans を削除（バッチ）
    const { data: existingIds } = await supabase
      .from("artisans")
      .select("id");
    if (existingIds) {
      for (const row of existingIds) {
        await supabase.from("artisans").delete().eq("id", row.id);
      }
      console.log(`   → ${existingIds.length} 件を削除完了\n`);
    }
  } else {
    console.log("   → 削除不要\n");
  }

  // 5. バッチ INSERT（50件ずつ）
  console.log("5. データ投入中...");
  const BATCH = 50;
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await supabase.from("artisans").insert(batch);
    if (error) {
      console.error(`   ✗ バッチ ${i}-${i + batch.length}: ${error.message}`);
      errors++;
    } else {
      inserted += batch.length;
    }
    // 進捗表示（100件ごと）
    if ((i + BATCH) % 100 === 0 || i + BATCH >= rows.length) {
      console.log(`   → ${Math.min(inserted, rows.length)} / ${rows.length} 件完了`);
    }
  }

  // 6. 結果確認
  console.log("\n6. 投入結果を確認中...");
  const { count: finalCount } = await supabase
    .from("artisans")
    .select("id", { count: "exact", head: true });
  console.log(`   → artisans テーブル: ${finalCount} 件`);

  // サンプル表示
  const { data: samples } = await supabase
    .from("artisans")
    .select("name, generation, craft_id")
    .limit(5);
  console.log("\n   サンプルデータ:");
  for (const s of samples || []) {
    const craftName = [...craftMap.entries()].find(([, v]) => v === s.craft_id)?.[0] || "?";
    console.log(`     - ${s.name} (${s.generation}) [${craftName}]`);
  }

  console.log(`\n=== 完了: ${inserted} 件投入, ${errors} エラー ===`);
}

main().catch(console.error);
