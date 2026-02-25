import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ffncptuagluktzfkzvrt.supabase.co",
  "sb_publishable_7vtwciUX7N7H_NVWbtGhgQ_kk8Y3WiA"
);

// カテゴリ別Unsplash画像（各カテゴリに3-4枚をローテーション割当）
const categoryImagePool: Record<string, string[]> = {
  陶磁器: [
    "https://images.unsplash.com/photo-1664477407933-dd42ed0c6c62?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1682159316104-70c98a792e94?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1670672013421-ec17c92a66d8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1572766736431-e4640ff4da3f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1661548666154-856d3a471114?auto=format&fit=crop&w=600&q=80",
  ],
  織物: [
    "https://images.unsplash.com/photo-1680817318163-4f72c021b820?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1661198979635-1563c2d19196?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1755541608519-3746dbfb11d6?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1678292519853-8ddd39f66639?auto=format&fit=crop&w=600&q=80",
  ],
  染色品: [
    "https://images.unsplash.com/photo-1670672013421-ec17c92a66d8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1588589518993-db1d533138b6?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1602415561734-5c594ff032a6?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1580050513276-df018189e0ca?auto=format&fit=crop&w=600&q=80",
  ],
  その他繊維製品: [
    "https://images.unsplash.com/photo-1661198979635-1563c2d19196?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1568299662505-db3686267724?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1682648354492-05706de36e34?auto=format&fit=crop&w=600&q=80",
  ],
  漆器: [
    "https://images.unsplash.com/photo-1682159316104-70c98a792e94?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1762956227315-983f2ec40f1e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1764250538851-d6ab5c7affab?auto=format&fit=crop&w=600&q=80",
  ],
  "木工品・竹工品": [
    "https://images.unsplash.com/photo-1572766736431-e4640ff4da3f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1680817318163-4f72c021b820?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1700055611282-f2ce81099038?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1700004060514-7aec5a9f7f73?auto=format&fit=crop&w=600&q=80",
  ],
  金工品: [
    "https://images.unsplash.com/photo-1661548666154-856d3a471114?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1762956227315-983f2ec40f1e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1664477407933-dd42ed0c6c62?auto=format&fit=crop&w=600&q=80",
  ],
  "仏壇・仏具": [
    "https://images.unsplash.com/photo-1764250538851-d6ab5c7affab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1700055611282-f2ce81099038?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1682159316104-70c98a792e94?auto=format&fit=crop&w=600&q=80",
  ],
  和紙: [
    "https://images.unsplash.com/photo-1750881686363-e950ce791487?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1767840272533-7e1c769a2199?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1766582931592-0e831f50e787?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1711967151501-10da09b1f174?auto=format&fit=crop&w=600&q=80",
  ],
  文具: [
    "https://images.unsplash.com/photo-1720702214757-c57fb7ba2b93?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1704859997121-abfda972b66c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1695562322876-31c63ccf2049?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1643981083274-0ab1b3131c51?auto=format&fit=crop&w=600&q=80",
  ],
  石工品: [
    "https://images.unsplash.com/photo-1760035791576-3c80923faeba?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1763951494935-9111bfdc7ca0?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1764343579744-7aace7761b6a?auto=format&fit=crop&w=600&q=80",
  ],
  貴石細工: [
    "https://images.unsplash.com/photo-1758995116142-c626a962a682?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1648278095044-235eef9840c3?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1582522037428-f3e45881ab7b?auto=format&fit=crop&w=600&q=80",
  ],
  "人形・こけし": [
    "https://images.unsplash.com/photo-1720730184764-d5f267e6b80c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1613959184547-f3cf0aa79c39?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1765895724674-87186308b764?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1763276951919-9f83507f8f5f?auto=format&fit=crop&w=600&q=80",
  ],
  その他の工芸品: [
    "https://images.unsplash.com/photo-1617242399514-28629f46209a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1668392296954-5b2353d1b17a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1679178944065-6331fd22bab8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1685970832419-21f76ee5d813?auto=format&fit=crop&w=600&q=80",
  ],
  "工芸材料・工芸用具": [
    "https://images.unsplash.com/photo-1700055611282-f2ce81099038?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1572766736431-e4640ff4da3f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1700004060514-7aec5a9f7f73?auto=format&fit=crop&w=600&q=80",
  ],
};

async function main() {
  const { data: crafts } = await supabase
    .from("crafts")
    .select("id, name, category")
    .order("category")
    .order("name");

  if (!crafts) {
    console.log("No crafts found");
    return;
  }

  console.log(`Assigning images to ${crafts.length} crafts...`);

  // カテゴリ別のカウンター
  const counters: Record<string, number> = {};
  let updated = 0;
  let failed = 0;

  for (const craft of crafts) {
    const pool = categoryImagePool[craft.category];
    if (!pool || pool.length === 0) {
      console.warn(`  No images for category: ${craft.category} (${craft.name})`);
      failed++;
      continue;
    }

    if (!counters[craft.category]) counters[craft.category] = 0;
    const idx = counters[craft.category] % pool.length;
    const imageUrl = pool[idx];
    counters[craft.category]++;

    const { error } = await supabase
      .from("crafts")
      .update({ image_url: imageUrl })
      .eq("id", craft.id);

    if (error) {
      console.error(`  Failed: ${craft.name} - ${error.message}`);
      failed++;
    } else {
      updated++;
    }
  }

  console.log(`\nDone: ${updated} updated, ${failed} failed`);

  // 確認
  const { data: check } = await supabase
    .from("crafts")
    .select("id")
    .or("image_url.is.null,image_url.eq.");
  console.log(`Crafts without images: ${check?.length ?? "unknown"}`);
}

main();
