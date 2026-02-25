import { supabase } from "@/lib/supabase";
import { categoryOrder, areaRegions } from "@/lib/crafts";
import { stories } from "@/data/stories";
import { SITE_URL } from "@/lib/metadata";

export const dynamic = "force-static";
export const revalidate = 86400; // 1 day

export async function GET() {
  const { data: crafts } = await supabase
    .from("crafts")
    .select("id, name, name_kana, prefecture, city, category, description, designated_year")
    .order("category")
    .order("name");

  const lines: string[] = [];

  lines.push("# KOGEI PORTAL — 全品目データ (llms-full.txt)");
  lines.push("");
  lines.push("> 日本全国244品目の経済産業大臣指定伝統的工芸品の完全一覧。");
  lines.push("> サイト: https://yakimono-portal.vercel.app/");
  lines.push("> 概要版: https://yakimono-portal.vercel.app/llms.txt");
  lines.push("");

  // Group by category
  const byCategory = new Map<string, typeof crafts>();
  for (const craft of crafts ?? []) {
    const list = byCategory.get(craft.category) ?? [];
    list.push(craft);
    byCategory.set(craft.category, list);
  }

  for (const category of categoryOrder) {
    const items = byCategory.get(category);
    if (!items || items.length === 0) continue;

    lines.push(`## ${category}（${items.length}品目）`);
    lines.push("");

    for (const craft of items) {
      lines.push(`### ${craft.name}（${craft.name_kana}）`);
      lines.push(`- 産地: ${craft.prefecture} ${craft.city}`);
      if (craft.designated_year) {
        lines.push(`- 指定年: ${craft.designated_year}年`);
      }
      lines.push(`- 概要: ${craft.description}`);
      lines.push(`- 詳細: ${SITE_URL}/crafts/${craft.id}`);
      lines.push("");
    }
  }

  // Area summary
  lines.push("## 地方別品目数");
  lines.push("");
  for (const region of areaRegions) {
    const count = (crafts ?? []).filter((c) =>
      region.prefectures.includes(c.prefecture)
    ).length;
    lines.push(`- ${region.name}: ${count}品目（${region.prefectures.join("、")}）`);
  }
  lines.push("");

  // Stories
  lines.push("## 読み物・ストーリー");
  lines.push("");
  for (const story of stories) {
    lines.push(`- [${story.title}](${SITE_URL}/stories/${story.slug}): ${story.excerpt}`);
  }

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
