import Link from "next/link";
import { artists } from "@/data/artists";
import { shops } from "@/data/shops";
import ArtisanAvatar from "@/components/ArtisanAvatar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "つくる人たち | KOGEI PORTAL",
  description:
    "伝統を受け継ぎ、今を生きる職人と工房。KOGEI PORTALが紹介する、工芸のつくり手たち。",
};

export default function CraftsPeoplePage() {
  return (
    <>
      {/* ヒーロー */}
      <section className="bg-[#1a1612] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-6">
            Craftspeople
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white/95 leading-tight mb-6">
            つくる人たち
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-stone-light/50 max-w-2xl mx-auto">
            伝統を受け継ぎ、今を生きる職人と工房。
            <br className="hidden md:block" />
            その手から生まれるものには、土地の記憶と人の想いが宿っています。
          </p>
        </div>
      </section>

      {/* 一覧 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* 職人 */}
          {artists.length > 0 && (
            <div className="mb-16">
              <h2 className="text-lg font-bold text-foreground mb-6 pb-3 border-b border-stone-light/30">
                職人・作家
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {artists.map((artist) => (
                  <Link
                    key={artist.slug}
                    href={`/artists/${artist.slug}`}
                    className="group rounded-lg border border-stone-light/20 bg-white p-6 hover:shadow-md transition-all hover:border-stone-light/40"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <ArtisanAvatar name={artist.name} size={48} />
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-foreground group-hover:text-indigo transition-colors truncate">
                          {artist.name}
                        </h3>
                        {artist.nameEnglish && (
                          <p className="text-[11px] text-stone-light truncate">
                            {artist.nameEnglish}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="rounded-full bg-indigo/10 px-3 py-0.5 text-[11px] font-medium text-indigo">
                        {artist.regionName}
                      </span>
                      {artist.prefecture && artist.city && (
                        <span className="text-[11px] text-stone">
                          {artist.prefecture}{artist.city}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] leading-relaxed text-warm-gray line-clamp-2">
                      {artist.style}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 工房・店舗 */}
          {shops.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-foreground mb-6 pb-3 border-b border-stone-light/30">
                工房・店舗
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map((shop) => (
                  <Link
                    key={shop.slug}
                    href={`/shops/${shop.slug}`}
                    className="group rounded-lg border border-stone-light/20 bg-white p-6 hover:shadow-md transition-all hover:border-stone-light/40"
                  >
                    <div className="mb-4">
                      <h3 className="text-base font-bold text-foreground group-hover:text-indigo transition-colors">
                        {shop.name}
                      </h3>
                      <p className="text-[11px] text-stone-light">
                        {shop.nameEnglish}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="rounded-full bg-amber-900/15 px-3 py-0.5 text-[11px] font-medium text-amber-800">
                        {shop.craftName}
                      </span>
                      <span className="text-[11px] text-stone">
                        {shop.prefecture}{shop.city}
                      </span>
                    </div>
                    <p className="text-[12px] leading-relaxed text-warm-gray line-clamp-2">
                      {shop.description.split("\n\n")[0]}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-full bg-stone-light/20 px-2 py-0.5 text-[10px] font-medium text-stone">
                        {shop.locations.length}拠点
                      </span>
                      <span className="rounded-full bg-stone-light/20 px-2 py-0.5 text-[10px] font-medium text-stone">
                        {shop.representative.generation}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
