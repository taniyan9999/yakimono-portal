import Link from "next/link";
import { notFound } from "next/navigation";
import { shops, getShopBySlug } from "@/data/shops";
import { artists } from "@/data/artists";
import FadeInSection from "@/components/FadeInSection";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return shops.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const shop = getShopBySlug(slug);
  if (!shop) return {};
  return {
    title: `${shop.name}（${shop.craftName}）｜KOGEI PORTAL`,
    description: shop.description.split("\n\n")[0],
  };
}

const locationTypeLabels: Record<string, { label: string; color: string }> = {
  headquarters: { label: "本店・工房", color: "bg-amber-900/15 text-amber-800" },
  gallery: { label: "展示館", color: "bg-indigo/10 text-indigo" },
  shop: { label: "直営店", color: "bg-emerald-900/15 text-emerald-800" },
};

export default async function ShopPage({ params }: Props) {
  const { slug } = await params;
  const shop = getShopBySlug(slug);
  if (!shop) notFound();

  // 同じ産地の職人を探す
  const sameAreaArtists = artists.filter(
    (a) => a.prefecture === shop.prefecture && a.city === shop.city,
  );

  return (
    <>
      {/* ヒーロー */}
      <section className="relative bg-[#1a1612] py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2420]/80 via-[#1a1612]/90 to-[#0d0b09]" />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <nav className="mb-10 text-xs text-stone-light/40">
            <Link href="/" className="hover:text-stone-light/70 transition-colors">
              トップ
            </Link>
            <span className="mx-2">/</span>
            <Link href="/craftspeople" className="hover:text-stone-light/70 transition-colors">
              つくる人たち
            </Link>
            <span className="mx-2">/</span>
            <span className="text-stone-light/60">{shop.name}</span>
          </nav>

          <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-4">
            {shop.craftName} 製造元
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white/95 leading-tight mb-3">
            {shop.name}
          </h1>
          <p className="text-sm text-stone-light/40 mb-4">
            {shop.nameEnglish}
            <span className="ml-3 text-stone-light/25">
              {shop.formalName}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-stone-light/50">
            <span>{shop.craftName}</span>
            <span className="text-stone-light/20">|</span>
            <span>{shop.prefecture}{shop.city}</span>
            <span className="text-stone-light/20">|</span>
            <span>創業65年以上</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 概要 */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          {shop.description.split("\n\n").map((p, i) => (
            <p
              key={i}
              className="text-lg md:text-xl leading-[2] text-foreground mb-6 last:mb-0"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* 哲学 */}
      <section className="bg-[#1a1612] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInSection>
            <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
              <div className="mb-8 md:mb-0">
                <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-3">
                  Philosophy
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white/90">
                  哲学
                </h2>
              </div>
              <div>
                {shop.philosophy.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className="font-serif text-base md:text-lg leading-[2.2] text-stone-light/60 mb-2 last:mb-0"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 歴代 */}
      {shop.lineage && shop.lineage.length > 0 && (
        <section className="bg-cream py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <FadeInSection>
              <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
                <div className="mb-8 md:mb-0">
                  <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                    Lineage
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    歴代
                  </h2>
                </div>
                <div className="space-y-8">
                  {shop.lineage.map((gen) => (
                    <div
                      key={gen.generation}
                      className="relative pl-8 border-l-2 border-stone-light/25"
                    >
                      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-stone-light/40 bg-cream" />
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="rounded-full bg-amber-900/10 px-3 py-1 text-xs font-medium text-amber-800">
                          {gen.generation}
                        </span>
                        <h3 className="text-base font-bold text-foreground">
                          {gen.name}
                        </h3>
                        {gen.period && (
                          <span className="text-xs text-stone">{gen.period}</span>
                        )}
                      </div>
                      <p className="text-sm leading-[2] text-warm-gray">
                        {gen.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* 代表 */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInSection>
            <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
              <div className="mb-8 md:mb-0">
                <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                  Representative
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  代表のこと
                </h2>
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {shop.representative.name}
                  </h3>
                  {shop.representative.generation && (
                    <span className="rounded-full bg-amber-900/10 px-3 py-1 text-xs font-medium text-amber-800">
                      {shop.representative.generation}
                    </span>
                  )}
                </div>
                {shop.representative.background && (
                  <p className="text-base leading-[2] text-warm-gray mt-4 mb-8">
                    {shop.representative.background}
                  </p>
                )}
                {shop.craftsmanQuote && (
                  <blockquote className="border-l-2 border-stone-light/30 pl-6">
                    <p className="font-serif text-lg leading-relaxed text-foreground italic mb-3">
                      &ldquo;{shop.craftsmanQuote.text}&rdquo;
                    </p>
                    <footer className="text-sm text-stone">
                      ——{shop.craftsmanQuote.speaker}
                      {shop.craftsmanQuote.context && (
                        <span className="text-stone-light ml-1">
                          ({shop.craftsmanQuote.context})
                        </span>
                      )}
                    </footer>
                  </blockquote>
                )}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 主要メンバー */}
      {shop.keyMembers && shop.keyMembers.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <FadeInSection>
              <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
                <div className="mb-8 md:mb-0">
                  <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                    Successor
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    次期代表
                  </h2>
                </div>
                <div className="space-y-10">
                  {shop.keyMembers.map((member) => (
                    <div key={member.name}>
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="text-lg font-bold text-foreground">
                          {member.name}
                        </h3>
                        <span className="rounded-full bg-indigo/10 px-3 py-1 text-xs font-medium text-indigo">
                          {member.role}
                        </span>
                      </div>
                      <p className="text-sm leading-[2] text-warm-gray mt-3 mb-4">
                        {member.background}
                      </p>
                      {member.quote && (
                        <blockquote className="border-l-2 border-stone-light/30 pl-6">
                          <p className="font-serif text-base leading-relaxed text-foreground italic mb-2">
                            &ldquo;{member.quote.text}&rdquo;
                          </p>
                          {member.quote.context && (
                            <footer className="text-xs text-stone">
                              ——{member.quote.context}
                            </footer>
                          )}
                        </blockquote>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* 店舗案内 */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
              Locations
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              店舗案内
            </h2>
          </div>

          {/* 伊勢内宮前店を特大カードで先に表示 */}
          {(() => {
            const mainShop = shop.locations.find((l) => l.type === "shop");
            if (!mainShop) return null;
            const typeInfo = locationTypeLabels[mainShop.type];
            return (
              <div className="rounded-lg border-2 border-indigo/20 bg-white p-6 md:p-8 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-medium ${typeInfo.color}`}
                  >
                    {typeInfo.label}
                  </span>
                  {mainShop.hasDemo && (
                    <span className="rounded-full bg-violet-900/10 px-2 py-0.5 text-[10px] font-medium text-violet-800">
                      実演あり
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {mainShop.name}
                </h3>
                {mainShop.description && (
                  <p className="text-sm leading-[1.9] text-warm-gray mb-5">
                    {mainShop.description}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">住所</p>
                    <p>〒{mainShop.postalCode}</p>
                    <p>{mainShop.address}</p>
                    <p>TEL: {mainShop.tel}</p>
                  </div>
                  <div className="space-y-1">
                    {mainShop.hours && (
                      <>
                        <p className="font-medium text-foreground">営業時間</p>
                        <p>{mainShop.hours}</p>
                      </>
                    )}
                    {mainShop.closedDays && (
                      <>
                        <p className="font-medium text-foreground mt-2">定休日</p>
                        <p>{mainShop.closedDays}</p>
                      </>
                    )}
                  </div>
                </div>
                {mainShop.access && (
                  <div className="mt-4 pt-4 border-t border-stone-light/20">
                    <p className="text-xs font-medium text-foreground mb-1">アクセス</p>
                    <p className="text-xs text-stone leading-relaxed">{mainShop.access}</p>
                  </div>
                )}
              </div>
            );
          })()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shop.locations.filter((l) => l.type !== "shop").map((loc) => {
              const typeInfo = locationTypeLabels[loc.type] ?? {
                label: loc.type,
                color: "bg-stone/10 text-stone",
              };
              return (
                <div
                  key={loc.name}
                  className="rounded-lg border border-stone-light/20 bg-white p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-medium ${typeInfo.color}`}
                    >
                      {typeInfo.label}
                    </span>
                    {loc.hasDemo && (
                      <span className="rounded-full bg-violet-900/10 px-2 py-0.5 text-[10px] font-medium text-violet-800">
                        実演あり
                      </span>
                    )}
                    {loc.hasExperience && (
                      <span className="rounded-full bg-emerald-900/10 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                        体験可
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3">
                    {loc.name}
                  </h3>
                  {loc.description && (
                    <p className="text-sm leading-relaxed text-warm-gray mb-4">
                      {loc.description}
                    </p>
                  )}
                  <div className="space-y-1 text-xs text-stone">
                    <p>〒{loc.postalCode}</p>
                    <p>{loc.address}</p>
                    <p>TEL: {loc.tel}</p>
                    {loc.fax && <p>FAX: {loc.fax}</p>}
                    {loc.hours && (
                      <p className="mt-2 text-foreground font-medium">
                        営業時間: {loc.hours}
                      </p>
                    )}
                    {loc.closedDays && (
                      <p className="text-foreground font-medium">
                        定休日: {loc.closedDays}
                      </p>
                    )}
                    {loc.access && (
                      <p className="mt-2 leading-relaxed">{loc.access}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 商品 */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
            <div className="mb-8 md:mb-0">
              <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                Products
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                商品
              </h2>
              <p className="text-sm text-stone mt-2">
                {shop.priceRange}
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">
                  和の装い
                </h3>
                <div className="flex flex-wrap gap-2">
                  {shop.products.traditional.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-stone-light/30 bg-white px-4 py-2 text-sm text-warm-gray"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">
                  日常のアクセサリー
                </h3>
                <div className="flex flex-wrap gap-2">
                  {shop.products.modern.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-stone-light/30 bg-white px-4 py-2 text-sm text-warm-gray"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 手に取る */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
            <div className="mb-8 md:mb-0">
              <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                Links
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                手に取る
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {shop.links.website && (
                <a
                  href={shop.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-light/30 bg-white px-5 py-3 text-sm font-medium text-foreground hover:border-indigo/30 hover:shadow-sm transition-all"
                >
                  <svg className="h-4 w-4 text-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                  公式サイト
                </a>
              )}
              {shop.links.shop && (
                <a
                  href={shop.links.shop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-light/30 bg-white px-5 py-3 text-sm font-medium text-foreground hover:border-indigo/30 hover:shadow-sm transition-all"
                >
                  <svg className="h-4 w-4 text-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  オンラインショップ
                </a>
              )}
              {shop.links.instagram && (
                <a
                  href={shop.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-light/30 bg-white px-5 py-3 text-sm font-medium text-foreground hover:border-indigo/30 hover:shadow-sm transition-all"
                >
                  <svg className="h-4 w-4 text-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 催事・イベント */}
      {shop.events && (
        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
              <div className="mb-8 md:mb-0">
                <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                  Events
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  催事・イベント
                </h2>
              </div>
              <p className="text-base leading-[2] text-warm-gray">
                {shop.events}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 同じ産地の職人・工房 */}
      {sameAreaArtists.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              同じ産地の職人
            </h2>
            <div className="flex flex-wrap gap-4">
              {sameAreaArtists.map((a) => (
                <Link
                  key={a.slug}
                  href={`/artists/${a.slug}`}
                  className="group inline-flex items-center gap-4 rounded-lg border border-stone-light/20 bg-white p-5 hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-stone-light/20 text-xl font-bold text-indigo">
                    {a.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors">
                      {a.name}
                    </p>
                    <p className="text-xs text-stone">{a.regionName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 戻る */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Link
            href="/craftspeople"
            className="inline-flex items-center gap-2 border-b border-stone-light/40 pb-1 text-sm text-stone hover:text-foreground transition-colors"
          >
            &larr; つくる人たちの一覧に戻る
          </Link>
        </div>
      </section>
    </>
  );
}
