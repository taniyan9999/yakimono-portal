"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/hooks/useFavorites";
import FavoriteButton from "@/components/FavoriteButton";

type CraftItem = {
  id: string;
  name: string;
  name_kana: string;
  prefecture: string;
  category: string;
  description: string;
  image_url: string | null;
};

export default function FavoritesList({
  allCrafts,
}: {
  allCrafts: CraftItem[];
}) {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="text-center py-20 text-warm-gray">
        読み込み中...
      </div>
    );
  }

  const favCrafts = allCrafts.filter((c) => favorites.includes(c.id));

  if (favCrafts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">♡</div>
        <p className="text-warm-gray mb-2">
          お気に入りの工芸品はまだありません
        </p>
        <p className="text-sm text-stone">
          工芸品カードのハートマークをクリックして追加できます
        </p>
        <Link
          href="/"
          className="inline-block mt-6 text-sm text-indigo hover:text-foreground transition-colors"
        >
          工芸品を探す &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {favCrafts.map((craft) => (
        <div key={craft.id} className="relative group">
          <Link
            href={`/crafts/${craft.id}`}
            className="block rounded-lg border border-stone-light/20 bg-white overflow-hidden hover:shadow-md transition-all hover:border-stone-light/40"
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
              <p className="text-[11px] text-stone mb-1">{craft.category}</p>
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
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton craftId={craft.id} size="sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
