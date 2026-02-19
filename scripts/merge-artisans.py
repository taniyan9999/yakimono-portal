#!/usr/bin/env python3
"""
data/artisans/batch-*.json を統合して:
1. src/data/artisans-all.json  (craft_name keyed lookup用)
2. supabase/003-insert-artisans.sql (Supabase投入用SQL)
を生成する。
"""
import json, glob, uuid, os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BATCH_DIR = os.path.join(BASE, "data", "artisans")
OUT_JSON = os.path.join(BASE, "src", "data", "artisans-all.json")
OUT_SQL = os.path.join(BASE, "supabase", "003-insert-artisans.sql")

merged = {}       # craft_name -> artisans[]
sql_values = []   # SQL INSERT values
total = 0
craft_count = 0

for path in sorted(glob.glob(os.path.join(BATCH_DIR, "batch-*.json"))):
    data = json.load(open(path, "r"))
    for entry in data:
        craft_id = entry["craft_id"]
        craft_name = entry["craft_name"]
        artisans = entry["artisans"]

        merged[craft_name] = artisans
        craft_count += 1

        for a in artisans:
            aid = str(uuid.uuid4())
            name = a["name"].replace("'", "''")
            gen = f"'{a['generation'].replace(chr(39), chr(39)+chr(39))}'" if a.get("generation") else "null"
            bio = f"'{a['biography'].replace(chr(39), chr(39)+chr(39))}'" if a.get("biography") else "null"
            phil = f"'{a['philosophy'].replace(chr(39), chr(39)+chr(39))}'" if a.get("philosophy") else "null"
            quote = f"'{a['quote'].replace(chr(39), chr(39)+chr(39))}'" if a.get("quote") else "null"
            ws = f"'{a['workshop_name'].replace(chr(39), chr(39)+chr(39))}'" if a.get("workshop_name") else "null"

            sql_values.append(
                f"('{aid}', '{name}', '{craft_id}', {gen}, {bio}, {phil}, {quote}, {ws})"
            )
            total += 1

# JSON出力
with open(OUT_JSON, "w") as f:
    json.dump(merged, f, ensure_ascii=False, indent=2)
print(f"JSON: {craft_count} crafts, {total} artisans -> {OUT_JSON}")

# SQL出力 (50件ずつINSERT)
with open(OUT_SQL, "w") as f:
    f.write("-- 職人データ一括投入 (自動生成)\n")
    f.write("-- 既存データをクリアして再投入\n")
    f.write("DELETE FROM artisans;\n\n")

    chunk_size = 50
    for i in range(0, len(sql_values), chunk_size):
        chunk = sql_values[i:i+chunk_size]
        f.write("INSERT INTO artisans (id, name, craft_id, generation, biography, philosophy, quote, workshop_name) VALUES\n")
        f.write(",\n".join(chunk))
        f.write(";\n\n")

print(f"SQL: {total} rows -> {OUT_SQL}")
