import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { type Craft } from "@/lib/crafts";
import FavoritesList from "@/components/FavoritesList";
import { canonical } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "お気に入り",
  description: "お気に入りに保存した伝統工芸品の一覧。",
  alternates: { canonical: canonical("/favorites") },
  robots: { index: false, follow: true },
};

export default async function FavoritesPage() {
  const { data: crafts } = await supabase
    .from("crafts")
    .select("id, name, name_kana, prefecture, category, description, image_url")
    .order("name");

  const allCrafts = (crafts ?? []) as Craft[];

  return (
    <>
      <section className="bg-[#1a1612] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-6">
            Favorites
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white/95 leading-tight mb-6">
            あなたが選んだ工芸
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-stone-light/50 max-w-2xl mx-auto">
            栞を挟んだ工芸品たち。いつか手に取る日のために。
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FavoritesList allCrafts={allCrafts} />
        </div>
      </section>
    </>
  );
}
