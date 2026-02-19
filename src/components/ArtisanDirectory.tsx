"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ArtisanAvatar from "@/components/ArtisanAvatar";
import { categoryOrder } from "@/lib/crafts";

export type ArtisanWithCraft = {
  id: string;
  name: string;
  generation: string | null;
  philosophy: string | null;
  quote: string | null;
  workshop_name: string | null;
  craft: {
    id: string;
    name: string;
    category: string;
    prefecture: string;
  };
};

const categoryTabs = [
  { key: "all", label: "すべて" },
  ...categoryOrder.map((c) => ({ key: c, label: c })),
];

export default function ArtisanDirectory({
  artisans,
}: {
  artisans: ArtisanWithCraft[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let result = artisans;

    if (activeCategory !== "all") {
      result = result.filter((a) => a.craft.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.craft.name.toLowerCase().includes(q) ||
          (a.workshop_name && a.workshop_name.toLowerCase().includes(q))
      );
    }

    return result;
  }, [artisans, activeCategory, query]);

  // 工芸品ごとにグループ化
  const grouped = useMemo(() => {
    const map = new Map<
      string,
      { craftId: string; craftName: string; prefecture: string; artisans: ArtisanWithCraft[] }
    >();
    for (const a of filtered) {
      const key = a.craft.id;
      if (!map.has(key)) {
        map.set(key, {
          craftId: a.craft.id,
          craftName: a.craft.name,
          prefecture: a.craft.prefecture,
          artisans: [],
        });
      }
      map.get(key)!.artisans.push(a);
    }
    return [...map.values()].sort((a, b) =>
      a.craftName.localeCompare(b.craftName, "ja")
    );
  }, [filtered]);

  return (
    <>
      {/* 検索 */}
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="職人名・工芸品名で検索..."
          className="w-full max-w-md rounded-lg border border-stone-light/30 bg-white px-4 py-3 text-sm text-foreground placeholder:text-stone-light/60 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/30 transition-colors"
        />
      </div>

      {/* カテゴリタブ */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === tab.key
                ? "bg-foreground text-white"
                : "bg-stone-light/30 text-warm-gray hover:bg-stone-light/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 件数 */}
      <p className="text-sm text-stone mb-8">
        {filtered.length}名の職人
        {activeCategory !== "all" && `（${activeCategory}）`}
        {query.trim() && `・「${query.trim()}」で検索`}
      </p>

      {/* 結果 */}
      {grouped.length > 0 ? (
        <div className="space-y-10">
          {grouped.map((group) => (
            <div key={group.craftId}>
              <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-stone-light/20">
                <Link
                  href={`/crafts/${group.craftId}`}
                  className="text-base font-bold text-foreground hover:text-indigo transition-colors"
                >
                  {group.craftName}
                </Link>
                <span className="text-[11px] text-stone">
                  {group.prefecture}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.artisans.map((artisan) => (
                  <div
                    key={artisan.id}
                    className="rounded-lg border border-stone-light/20 bg-white p-5 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <ArtisanAvatar name={artisan.name} size={44} />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-foreground truncate">
                          {artisan.name}
                        </h4>
                        {artisan.generation && (
                          <p className="text-[11px] text-stone">
                            {artisan.generation}
                          </p>
                        )}
                        {artisan.workshop_name && (
                          <p className="text-[11px] text-stone-light truncate">
                            {artisan.workshop_name}
                          </p>
                        )}
                      </div>
                    </div>
                    {artisan.philosophy && (
                      <p className="text-[12px] leading-relaxed text-warm-gray line-clamp-2">
                        {artisan.philosophy}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-warm-gray py-16">
          該当する職人が見つかりませんでした。
        </p>
      )}
    </>
  );
}
