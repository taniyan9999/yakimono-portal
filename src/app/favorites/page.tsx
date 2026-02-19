import { supabase } from "@/lib/supabase";
import { type Craft } from "@/lib/crafts";
import FavoritesList from "@/components/FavoritesList";

export const metadata = {
  title: "お気に入り | KOGEI PORTAL",
  description: "お気に入りに保存した伝統工芸品の一覧。",
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
          <h1 className="text-3xl md:text-5xl font-bold text-white/95 leading-tight mb-6">
            お気に入り
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-stone-light/50 max-w-2xl mx-auto">
            気になる工芸品をブックマーク。あなただけのコレクションを作りましょう。
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
