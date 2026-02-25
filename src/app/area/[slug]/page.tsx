import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { type Craft, categoryMeta, defaultMeta, areaRegions } from "@/lib/crafts";
import { SITE_URL, SITE_NAME } from "@/lib/metadata";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = areaRegions.find((r) => r.slug === slug);
  if (!region) return {};

  const { count } = await supabase
    .from("crafts")
    .select("id", { count: "exact", head: true })
    .in("prefecture", region.prefectures);

  const title = `${region.name}の伝統工芸品`;
  const description = `${region.name}（${region.prefectures.join("・")}）の伝統的工芸品${count ? `全${count}品目` : ""}を紹介。`;
  const url = `${SITE_URL}/area/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = areaRegions.find((r) => r.slug === slug);
  if (!region) notFound();

  const { data: crafts } = await supabase
    .from("crafts")
    .select("id, name, name_kana, prefecture, city, category, description, designated_year, image_url")
    .in("prefecture", region.prefectures)
    .order("prefecture")
    .order("name");

  const items = (crafts ?? []) as Craft[];

  // 都道府県別にグループ化
  const byPrefecture: Record<string, Craft[]> = {};
  for (const craft of items) {
    if (!byPrefecture[craft.prefecture]) byPrefecture[craft.prefecture] = [];
    byPrefecture[craft.prefecture].push(craft);
  }

  // 定義順でソート
  const prefectures = region.prefectures.filter((p) => byPrefecture[p]?.length);

  const areaUrl = `${SITE_URL}/area/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: `${region.name}の伝統工芸品`,
            description: `${region.name}（${region.prefectures.join("・")}）の伝統的工芸品全${items.length}品目。`,
            url: areaUrl,
            numberOfItems: items.length,
          }),
          breadcrumbJsonLd([
            { name: "ホーム", url: SITE_URL },
            { name: "産地から探す", url: `${SITE_URL}/#area` },
            { name: region.name, url: areaUrl },
          ]),
        ]}
      />
      {/* ヒーロー */}
      <section className="relative overflow-hidden bg-[#1a1612]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2420]/80 to-[#0d0b09]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <Link
            href="/"
            className="inline-block text-sm text-white/50 hover:text-white/80 transition-colors mb-8"
          >
            &larr; トップに戻る
          </Link>
          <p className="text-xs tracking-[0.3em] text-white/50 uppercase mb-3">
            Area
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white/95 mb-3">
            {region.name}
          </h1>
          <p className="text-lg text-white/50">{items.length}品目</p>
        </div>
      </section>

      {/* 都道府県フィルタ */}
      <section className="border-b border-stone-light/20 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-stone py-1">都道府県：</span>
            {prefectures.map((pref) => (
              <a
                key={pref}
                href={`#pref-${pref}`}
                className="inline-block rounded-full border border-stone-light/30 px-3 py-1 text-xs text-warm-gray hover:bg-indigo/10 hover:text-indigo hover:border-indigo/30 transition-colors"
              >
                {pref} ({byPrefecture[pref].length})
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 工芸品一覧（都道府県別） */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {prefectures.map((pref) => (
            <div key={pref} id={`pref-${pref}`} className="mb-14 last:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-lg font-bold text-foreground">{pref}</h2>
                <span className="text-xs text-stone">({byPrefecture[pref].length}品目)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {byPrefecture[pref].map((craft) => {
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
                        <h3 className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors">
                          {craft.name}
                        </h3>
                        <p className="text-[11px] leading-relaxed text-warm-gray mt-1.5 line-clamp-2">
                          {craft.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 他の地方 */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-sm font-bold text-foreground mb-6">他の地方</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {areaRegions
              .filter((r) => r.slug !== slug)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/area/${r.slug}`}
                  className="rounded-lg bg-white p-4 border border-stone-light/20 hover:shadow-md hover:border-stone-light/40 transition-all"
                >
                  <p className="text-sm font-bold text-foreground">{r.name}</p>
                  <p className="text-xs text-stone mt-1">
                    {r.prefectures.slice(0, 3).join("・")}...
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
