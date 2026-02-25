import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { type Craft, categoryMeta, categoryOrder, defaultMeta } from "@/lib/crafts";
import { canonical, SITE_URL } from "@/lib/metadata";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  return categoryOrder.map((name) => ({ name: encodeURIComponent(name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);
  const meta = categoryMeta[categoryName];
  if (!meta) return {};

  const title = `${categoryName}（${meta.en}）`;
  const description = `日本の伝統的工芸品「${categoryName}」の一覧。産地・技法・歴史を都道府県別に紹介します。`;
  const url = canonical(`/category/${encodeURIComponent(categoryName)}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);
  const meta = categoryMeta[categoryName];
  if (!meta) notFound();

  const { data: crafts } = await supabase
    .from("crafts")
    .select("id, name, name_kana, prefecture, city, category, description, designated_year, image_url")
    .eq("category", categoryName)
    .order("name");

  const items = (crafts ?? []) as Craft[];

  // 都道府県別にグループ化
  const byPrefecture: Record<string, Craft[]> = {};
  for (const craft of items) {
    if (!byPrefecture[craft.prefecture]) byPrefecture[craft.prefecture] = [];
    byPrefecture[craft.prefecture].push(craft);
  }
  const prefectures = Object.keys(byPrefecture).sort();

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: `${categoryName}（${meta.en}）`,
            description: `日本の伝統的工芸品「${categoryName}」の一覧。産地・技法・歴史を都道府県別に紹介します。`,
            url: `${SITE_URL}/category/${encodeURIComponent(categoryName)}`,
            numberOfItems: items.length,
          }),
          breadcrumbJsonLd([
            { name: "ホーム", url: SITE_URL },
            { name: categoryName, url: `${SITE_URL}/category/${encodeURIComponent(categoryName)}` },
          ]),
        ]}
      />
      <Breadcrumb
        items={[
          { name: "ホーム", href: "/" },
          { name: "工芸品目", href: "/#category" },
          { name: categoryName },
        ]}
      />
      {/* ヒーロー */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${meta.gradient}`}>
        <div className="absolute inset-0 bg-black/20" />
        <span className="absolute top-8 right-8 text-[120px] md:text-[200px] font-bold text-white/[0.05] leading-none select-none">
          {meta.icon}
        </span>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <Link
            href="/"
            className="inline-block text-sm text-white/50 hover:text-white/80 transition-colors mb-8"
          >
            &larr; トップに戻る
          </Link>
          <p className="text-xs tracking-[0.3em] text-white/50 uppercase mb-3">
            {meta.en}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white/95 mb-3">
            {categoryName}
          </h1>
          <p className="text-lg text-white/50">{items.length}品目</p>
        </div>
      </section>

      {/* 都道府県フィルタ */}
      <section className="border-b border-stone-light/20 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-stone py-1">産地：</span>
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
                {byPrefecture[pref].map((craft) => (
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
                      <h3 className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors">
                        {craft.name}
                      </h3>
                      <p className="text-[11px] text-stone mt-0.5">
                        {craft.city || craft.prefecture}
                      </p>
                      <p className="text-[11px] leading-relaxed text-warm-gray mt-2 line-clamp-2">
                        {craft.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 他カテゴリへのナビ */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-sm font-bold text-foreground mb-6">他のカテゴリ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categoryOrder
              .filter((cat) => cat !== categoryName)
              .map((cat) => {
                const m = categoryMeta[cat] ?? defaultMeta;
                return (
                  <Link
                    key={cat}
                    href={`/category/${encodeURIComponent(cat)}`}
                    className="group relative overflow-hidden rounded-lg aspect-[3/2] flex flex-col justify-end p-3 transition-transform hover:scale-[1.02]"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient}`} />
                    <div className="relative z-10">
                      <p className="text-[10px] tracking-wider text-white/50 uppercase">{m.en}</p>
                      <p className="text-xs font-bold text-white/90">{cat}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
