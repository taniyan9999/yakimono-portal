import Link from "next/link";
import Image from "next/image";
import {
  seasonalFeatures,
  seasonMeta,
  getCurrentSeasonFeature,
} from "@/data/seasonal";

export const metadata = {
  title: "季節の特集 | KOGEI PORTAL",
  description:
    "春夏秋冬、季節ごとに楽しむ日本の伝統工芸。旬の器、季節の贈り物、工芸イベント情報をお届けします。",
};

export default function SeasonalPage() {
  const current = getCurrentSeasonFeature();
  const currentMeta = seasonMeta[current.season];

  return (
    <>
      {/* ヒーロー（今の季節の特集） */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-[#1a1612]">
        <Image
          src={current.coverImage}
          alt={current.title}
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2420]/80 via-[#1a1612]/60 to-[#0d0b09]" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-20">
          <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-4">
            Seasonal Feature
          </p>
          <span
            className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium mb-4 ${currentMeta.color}`}
          >
            {currentMeta.icon} {currentMeta.label}の特集
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white/95 leading-tight mb-4">
            {current.title}
          </h1>
          <p className="text-sm md:text-base text-stone-light/50 leading-relaxed max-w-2xl mb-6">
            {current.description}
          </p>
          <Link
            href={`/seasonal/${current.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 text-sm text-white/80 hover:bg-white/20 transition-colors"
          >
            この特集を読む &rarr;
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 四季の特集一覧 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-xl font-bold text-foreground mb-8">
            すべての季節特集
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {seasonalFeatures.map((feature) => {
              const meta = seasonMeta[feature.season];
              return (
                <Link
                  key={feature.id}
                  href={`/seasonal/${feature.slug}`}
                  className="group rounded-lg border border-stone-light/20 bg-white overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[2/1] overflow-hidden">
                    <Image
                      src={feature.coverImage}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <span
                      className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-medium ${meta.color}`}
                    >
                      {meta.icon} {meta.label}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-foreground group-hover:text-indigo transition-colors leading-snug mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-warm-gray line-clamp-2 mb-3">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.craftHighlights.map((h) => (
                        <span
                          key={h.name}
                          className="rounded bg-stone-light/20 px-2 py-0.5 text-[11px] text-stone"
                        >
                          {h.name}
                        </span>
                      ))}
                    </div>
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
