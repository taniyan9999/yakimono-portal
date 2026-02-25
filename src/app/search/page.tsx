import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { type Craft, categoryMeta, defaultMeta } from "@/lib/crafts";
import SearchBar from "@/components/SearchBar";
import { canonical } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "検索",
  description: "日本全国244品目の伝統的工芸品を名前・産地・カテゴリで検索。",
  alternates: { canonical: canonical("/search") },
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const { data: allCrafts } = await supabase
    .from("crafts")
    .select("id, name, name_kana, prefecture, city, category, description, designated_year, image_url")
    .order("name");

  const crafts = (allCrafts ?? []) as Craft[];

  const results = query
    ? crafts.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.name_kana?.toLowerCase().includes(query.toLowerCase()) ||
          c.prefecture.includes(query) ||
          c.category.includes(query) ||
          c.description?.includes(query)
      )
    : [];

  const searchItems = crafts.map((c) => ({
    id: c.id,
    name: c.name,
    name_kana: c.name_kana,
    prefecture: c.prefecture,
    category: c.category,
  }));

  return (
    <>
      <section className="bg-cream py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">検索</h1>
          <SearchBar crafts={searchItems} variant="header" />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {query ? (
            <>
              <p className="text-sm text-stone mb-8">
                「<span className="font-medium text-foreground">{query}</span>」の検索結果：
                <span className="font-medium text-foreground ml-1">{results.length}件</span>
              </p>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {results.map((craft) => {
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
                          <h3 className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors">
                            {craft.name}
                          </h3>
                          <p className="text-[11px] text-stone mt-0.5">
                            {craft.prefecture} / {craft.category}
                          </p>
                          <p className="text-[11px] leading-relaxed text-warm-gray mt-2 line-clamp-2">
                            {craft.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-stone mb-2">検索結果が見つかりませんでした</p>
                  <p className="text-sm text-warm-gray">
                    別のキーワードで検索してみてください。
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-stone">キーワードを入力して検索してください</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
