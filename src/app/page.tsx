import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { type Craft, categoryMeta, categoryOrder, defaultMeta, areaRegions } from "@/lib/crafts";
import SearchBar from "@/components/SearchBar";
import JapanRegionMap from "@/components/JapanRegionMap";
import { stories, storyCategoryLabels } from "@/data/stories";
import { getCurrentSeasonFeature, seasonMeta } from "@/data/seasonal";

// ヒーロー背景画像（Unsplash - 伝統工芸）
const heroImages = [
  { src: "https://images.unsplash.com/photo-1664477407933-dd42ed0c6c62?auto=format&fit=crop&w=600&q=80", alt: "Japanese pottery" },
  { src: "https://images.unsplash.com/photo-1680817318163-4f72c021b820?auto=format&fit=crop&w=600&q=80", alt: "Traditional crafts" },
  { src: "https://images.unsplash.com/photo-1682159316104-70c98a792e94?auto=format&fit=crop&w=600&q=80", alt: "Ceramics" },
  { src: "https://images.unsplash.com/photo-1670672013421-ec17c92a66d8?auto=format&fit=crop&w=600&q=80", alt: "Traditional pottery" },
  { src: "https://images.unsplash.com/photo-1572766736431-e4640ff4da3f?auto=format&fit=crop&w=600&q=80", alt: "Japanese ceramic art" },
  { src: "https://images.unsplash.com/photo-1661548666154-856d3a471114?auto=format&fit=crop&w=600&q=80", alt: "Handcrafted pottery" },
];

// カテゴリ代表画像（全15カテゴリ）
const categoryImages: Record<string, string> = {
  陶磁器: "https://images.unsplash.com/photo-1664477407933-dd42ed0c6c62?auto=format&fit=crop&w=400&q=80",
  織物: "https://images.unsplash.com/photo-1680817318163-4f72c021b820?auto=format&fit=crop&w=400&q=80",
  漆器: "https://images.unsplash.com/photo-1682159316104-70c98a792e94?auto=format&fit=crop&w=400&q=80",
  染色品: "https://images.unsplash.com/photo-1670672013421-ec17c92a66d8?auto=format&fit=crop&w=400&q=80",
  "木工品・竹工品": "https://images.unsplash.com/photo-1572766736431-e4640ff4da3f?auto=format&fit=crop&w=400&q=80",
  金工品: "https://images.unsplash.com/photo-1661548666154-856d3a471114?auto=format&fit=crop&w=400&q=80",
  その他繊維製品: "https://images.unsplash.com/photo-1661198979635-1563c2d19196?auto=format&fit=crop&w=400&q=80",
  "仏壇・仏具": "https://images.unsplash.com/photo-1764250538851-d6ab5c7affab?auto=format&fit=crop&w=400&q=80",
  和紙: "https://images.unsplash.com/photo-1750881686363-e950ce791487?auto=format&fit=crop&w=400&q=80",
  文具: "https://images.unsplash.com/photo-1720702214757-c57fb7ba2b93?auto=format&fit=crop&w=400&q=80",
  石工品: "https://images.unsplash.com/photo-1760035791576-3c80923faeba?auto=format&fit=crop&w=400&q=80",
  貴石細工: "https://images.unsplash.com/photo-1758995116142-c626a962a682?auto=format&fit=crop&w=400&q=80",
  "人形・こけし": "https://images.unsplash.com/photo-1720730184764-d5f267e6b80c?auto=format&fit=crop&w=400&q=80",
  その他の工芸品: "https://images.unsplash.com/photo-1617242399514-28629f46209a?auto=format&fit=crop&w=400&q=80",
  "工芸材料・工芸用具": "https://images.unsplash.com/photo-1700055611282-f2ce81099038?auto=format&fit=crop&w=400&q=80",
};

export default async function Home() {
  const { data: crafts } = await supabase
    .from("crafts")
    .select("id, name, name_kana, prefecture, city, category, description, designated_year, image_url")
    .order("name");

  const allCrafts = (crafts ?? []) as Craft[];

  // カテゴリ別にグループ化
  const byCategory: Record<string, Craft[]> = {};
  for (const craft of allCrafts) {
    if (!byCategory[craft.category]) byCategory[craft.category] = [];
    byCategory[craft.category].push(craft);
  }

  // 都道府県別にグループ化
  const byPrefecture: Record<string, Craft[]> = {};
  for (const craft of allCrafts) {
    if (!byPrefecture[craft.prefecture]) byPrefecture[craft.prefecture] = [];
    byPrefecture[craft.prefecture].push(craft);
  }

  // 都道府県別の品目数（JapanRegionMap用）
  const prefectureCounts: Record<string, number> = {};
  for (const [pref, crafts] of Object.entries(byPrefecture)) {
    prefectureCounts[pref] = crafts.length;
  }

  // Popular: 指定年が古い順に12件
  const popularCrafts = allCrafts
    .filter((c) => c.designated_year)
    .sort((a, b) => (a.designated_year ?? 9999) - (b.designated_year ?? 9999))
    .slice(0, 12);

  // 検索用の軽量データ
  const searchItems = allCrafts.map((c) => ({
    id: c.id,
    name: c.name,
    name_kana: c.name_kana,
    prefecture: c.prefecture,
    category: c.category,
  }));

  return (
    <>
      {/* Hero with Image Grid */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#1a1612]">
        {/* 背景画像グリッド */}
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 grid-rows-1 opacity-40">
          {heroImages.map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 17vw"
                priority={i < 3}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1612]/60 via-[#1a1612]/80 to-[#1a1612]" />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center py-20">
          <p className="text-xs tracking-[0.4em] text-stone-light/50 uppercase mb-6">
            Traditional Japanese Crafts
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white/95 mb-6 tracking-tight">
            手から手へ、
            <br />
            <span className="text-stone-light/70">紡がれる技。</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base leading-relaxed text-stone-light/40 mb-10">
            千年の時を超えて受け継がれる日本の伝統工芸。
            <br className="hidden md:block" />
            全国{allCrafts.length}品目の職人の手仕事と、その物語。
          </p>

          {/* 検索バー */}
          <div className="max-w-lg mx-auto mb-10">
            <SearchBar crafts={searchItems} variant="hero" />
          </div>

          <div className="flex justify-center gap-8">
            <a href="#category" className="text-xs tracking-widest text-white/60 hover:text-white/90 transition-colors uppercase">
              Category
            </a>
            <a href="#area" className="text-xs tracking-widest text-white/60 hover:text-white/90 transition-colors uppercase">
              Area
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── CATEGORY ── */}
      <section id="category" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">Category</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">工芸品目</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categoryOrder.map((cat) => {
              const meta = categoryMeta[cat] ?? defaultMeta;
              const count = byCategory[cat]?.length ?? 0;
              const bgImage = categoryImages[cat];
              return (
                <Link
                  key={cat}
                  href={`/category/${encodeURIComponent(cat)}`}
                  className="group relative overflow-hidden rounded-lg aspect-[4/3] flex flex-col justify-end p-4 transition-transform hover:scale-[1.02]"
                >
                  {bgImage ? (
                    <>
                      <Image
                        src={bgImage}
                        alt={cat}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                    </>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} transition-opacity group-hover:opacity-90`} />
                  )}
                  <span className="absolute top-3 right-3 text-[40px] font-bold text-white/[0.08] leading-none select-none">
                    {meta.icon}
                  </span>
                  <div className="relative z-10">
                    <p className="text-[10px] tracking-wider text-white/50 uppercase mb-1">{meta.en}</p>
                    <p className="text-sm font-bold text-white/90">{cat}</p>
                    <p className="text-xs text-white/40 mt-0.5">{count}品目</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AREA ── */}
      <section id="area" className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">Area</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">産地から探す</h2>
            <p className="text-sm text-warm-gray mt-2">
              全国8地方の伝統工芸品を地図から探索できます
            </p>
          </div>

          <JapanRegionMap
            regions={areaRegions}
            prefectureCounts={prefectureCounts}
            totalCrafts={allCrafts.length}
          />
        </div>
      </section>

      {/* ── POPULAR ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">Popular</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">注目の工芸品</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularCrafts.map((craft) => {
              const meta = categoryMeta[craft.category] ?? defaultMeta;
              return (
                <Link
                  key={craft.id}
                  href={`/crafts/${craft.id}`}
                  className="group rounded-lg border border-stone-light/20 bg-white overflow-hidden hover:shadow-md transition-all hover:border-stone-light/40"
                >
                  {craft.image_url && (
                    <div className="relative aspect-[4/3] bg-cream">
                      <Image
                        src={craft.image_url}
                        alt={craft.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`${meta.accent} inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white`}>
                        {meta.icon}
                      </span>
                      <p className="text-[11px] text-stone">{craft.category}</p>
                    </div>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors truncate">
                      {craft.name}
                    </h3>
                    <p className="text-[11px] text-stone mt-0.5">
                      {craft.prefecture}
                    </p>
                    <p className="text-[11px] leading-relaxed text-warm-gray mt-1.5 line-clamp-2">
                      {craft.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SEASONAL ── */}
      {(() => {
        const feature = getCurrentSeasonFeature();
        const meta = seasonMeta[feature.season];
        return (
          <section className="bg-cream py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
              <div className="md:grid md:grid-cols-[1fr_340px] md:gap-12 items-center">
                <div>
                  <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                    Seasonal Feature
                  </p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium mb-4 ${meta.color}`}
                  >
                    {meta.icon} {meta.label}の特集
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-warm-gray mb-6 max-w-xl">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {feature.craftHighlights.map((h) => (
                      <div key={h.name} className="rounded bg-white px-3 py-2 shadow-sm">
                        <p className="text-xs font-bold text-foreground">{h.name}</p>
                        <p className="text-[11px] text-warm-gray">{h.reason}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/seasonal/${feature.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-indigo hover:text-foreground transition-colors font-medium"
                  >
                    この特集を読む &rarr;
                  </Link>
                </div>
                <div className="hidden md:block relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src={feature.coverImage}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── STORIES ── */}
      <section className="bg-[#1a1612] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-3">
              Stories
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white/90 leading-tight mb-4">
              工芸に宿る、物語。
            </h2>
            <p className="text-sm leading-relaxed text-stone-light/50 max-w-xl mx-auto">
              歴史の転換点、職人の声、暮らしの中の工芸——その物語を記録する。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.slice(0, 3).map((story) => {
              const cat = storyCategoryLabels[story.category];
              return (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="group rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span
                      className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-medium ${cat.color}`}
                    >
                      {cat.label}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-white/90 leading-snug group-hover:text-white transition-colors line-clamp-2 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-[12px] leading-relaxed text-stone-light/50 line-clamp-2 mb-3">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-stone-light/30">
                      <span>
                        {new Date(story.publishedAt).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>{story.readingTime}分</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 border-b border-stone-light/30 pb-1 text-sm text-stone-light/50 hover:text-white/80 transition-colors"
            >
              もっと読む &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
