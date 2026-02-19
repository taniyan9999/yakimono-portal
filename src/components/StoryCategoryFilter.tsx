"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Story, StoryCategory } from "@/data/stories";
import { storyCategoryLabels } from "@/data/stories";

const tabs: { key: StoryCategory | "all"; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "philosophy", label: "哲学" },
  { key: "craftsman", label: "職人" },
  { key: "lifestyle", label: "暮らし" },
  { key: "craft-and-tech", label: "Craft×Tech" },
  { key: "comparison", label: "知る・選ぶ" },
];

export default function StoryCategoryFilter({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState<StoryCategory | "all">("all");

  const filtered =
    active === "all" ? stories : stories.filter((s) => s.category === active);

  return (
    <>
      {/* カテゴリタブ */}
      <div className="flex flex-wrap gap-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              active === tab.key
                ? "bg-foreground text-white"
                : "bg-stone-light/30 text-warm-gray hover:bg-stone-light/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 記事カードグリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((story) => {
          const cat = storyCategoryLabels[story.category];
          return (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="group rounded-lg border border-stone-light/20 bg-white overflow-hidden hover:shadow-md transition-all hover:border-stone-light/40"
            >
              {/* カバー画像 */}
              <div className="relative aspect-[16/9] bg-cream overflow-hidden">
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
                <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-indigo transition-colors line-clamp-2 mb-2">
                  {story.title}
                </h3>
                {story.philosophyKeyword && (
                  <span className="inline-block rounded bg-amber-900/10 px-2 py-0.5 text-[11px] text-amber-800 font-medium mb-2">
                    {story.philosophyKeyword}
                  </span>
                )}
                <p className="text-[13px] leading-relaxed text-warm-gray line-clamp-3 mb-4">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between text-[11px] text-stone">
                  <span>
                    {new Date(story.publishedAt).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>{story.readingTime}分で読める</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-warm-gray py-16">
          このカテゴリの記事はまだありません。
        </p>
      )}
    </>
  );
}
