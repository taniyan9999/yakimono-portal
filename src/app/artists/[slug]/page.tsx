import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists, getArtistBySlug } from "@/data/artists";
import { shops } from "@/data/shops";
import ArtisanAvatar from "@/components/ArtisanAvatar";
import JsonLd from "@/components/JsonLd";
import { personJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { canonical, SITE_URL } from "@/lib/metadata";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return {};
  const title = `${artist.name}（${artist.regionName}）`;
  const url = canonical(`/artists/${slug}`);
  const sameAs: string[] = [];
  if (artist.links?.website) sameAs.push(artist.links.website);
  if (artist.links?.instagram) sameAs.push(artist.links.instagram);

  return {
    title,
    description: artist.style,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: artist.style,
      url,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: artist.style,
    },
  };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const hasRichProfile = !!(artist.philosophy || artist.techniques || artist.links);

  // 同じ産地の工房を探す
  const sameAreaShops = artist.prefecture && artist.city
    ? shops.filter((s) => s.prefecture === artist.prefecture && s.city === artist.city)
    : [];

  const sameAs: string[] = [];
  if (artist.links?.website) sameAs.push(artist.links.website);
  if (artist.links?.instagram) sameAs.push(artist.links.instagram);

  return (
    <>
      <JsonLd
        data={[
          personJsonLd({
            name: artist.name,
            description: artist.style,
            url: `${SITE_URL}/artists/${slug}`,
            jobTitle: artist.title ?? "伝統工芸士",
            sameAs: sameAs.length > 0 ? sameAs : undefined,
          }),
          breadcrumbJsonLd([
            { name: "ホーム", url: SITE_URL },
            { name: "つくる人たち", url: `${SITE_URL}/craftspeople` },
            { name: artist.name, url: `${SITE_URL}/artists/${slug}` },
          ]),
        ]}
      />
      {/* ヒーロー */}
      <section className="relative bg-[#1a1612] py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2420]/80 via-[#1a1612]/90 to-[#0d0b09]" />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          {/* パンくず */}
          <nav className="mb-10 text-xs text-stone-light/40">
            <Link href="/" className="hover:text-stone-light/70 transition-colors">
              トップ
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/regions/${artist.regionSlug}`}
              className="hover:text-stone-light/70 transition-colors"
            >
              {artist.regionName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-stone-light/60">{artist.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="shrink-0">
              <ArtisanAvatar name={artist.name} size={100} />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-2">
                {artist.title ?? "Artisan"}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white/95 leading-tight mb-2">
                {artist.name}
              </h1>
              {artist.nameEnglish && (
                <p className="text-sm text-stone-light/40 mb-3">
                  {artist.nameEnglish}
                  {artist.nameReading && (
                    <span className="ml-3 text-stone-light/30">
                      （{artist.nameReading}）
                    </span>
                  )}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm text-stone-light/50">
                <Link
                  href={`/regions/${artist.regionSlug}`}
                  className="text-indigo/70 hover:text-indigo transition-colors"
                >
                  {artist.regionName}
                </Link>
                <span className="text-stone-light/20">|</span>
                <span>{artist.career}</span>
                {artist.prefecture && artist.city && (
                  <>
                    <span className="text-stone-light/20">|</span>
                    <span>{artist.prefecture}{artist.city}</span>
                  </>
                )}
                {artist.birthYear && (
                  <>
                    <span className="text-stone-light/20">|</span>
                    <span>{artist.birthYear}年生</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 作風 */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-serif text-lg md:text-xl leading-[2] text-foreground">
            {artist.style}
          </p>
        </div>
      </section>

      {/* 哲学 */}
      {artist.philosophy && (
        <section className="bg-[#1a1612] py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
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
                {artist.philosophy.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className="font-serif text-base md:text-lg leading-[2.2] text-stone-light/60 mb-2 last:mb-0"
                  >
                    {line}
                  </p>
                ))}
                {artist.craftsmanQuote && (
                  <blockquote className="mt-10 border-l-2 border-stone-light/20 pl-6">
                    <p className="font-serif text-base leading-relaxed text-white/70 italic mb-2">
                      &ldquo;{artist.craftsmanQuote.text}&rdquo;
                    </p>
                    {artist.craftsmanQuote.context && (
                      <footer className="text-sm text-stone-light/40">
                        ——{artist.craftsmanQuote.context}
                      </footer>
                    )}
                  </blockquote>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 経歴 */}
      <section className={`${artist.philosophy ? "bg-cream" : ""} py-20 md:py-28`}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
            <div className="mb-8 md:mb-0">
              <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                Biography
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                経歴
              </h2>
            </div>
            <div>
              {artist.bio.split("\n\n").map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-[2] text-warm-gray mb-6 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 技法 */}
      {artist.techniques && artist.techniques.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
              <div className="mb-8 md:mb-0">
                <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                  Techniques
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  技法
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {artist.techniques.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-stone-light/20 px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 作品カテゴリ */}
      {artist.workCategories && artist.workCategories.length > 0 && (
        <section className="bg-cream py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
              <div className="mb-8 md:mb-0">
                <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                  Works
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  作品
                </h2>
              </div>
              <div>
                <div className="flex flex-wrap gap-3 mb-10">
                  {artist.workCategories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-stone-light/30 bg-white px-4 py-2 text-sm text-warm-gray"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                {/* 作品画像ギャラリー */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {artist.works.map((work) => (
                    <div key={work.name} className="group">
                      <div className="relative aspect-square overflow-hidden rounded-lg border border-stone-light/30 bg-white">
                        <Image
                          src={work.image}
                          alt={work.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      </div>
                      <p className="mt-2 text-sm font-medium text-warm-gray text-center">
                        {work.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 作品（リッチプロフィールでない場合のフォールバック） */}
      {!artist.workCategories && artist.works.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              代表作品
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {artist.works.map((work) => (
                <div key={work.name} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-stone-light/30">
                    <Image
                      src={work.image}
                      alt={work.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-warm-gray text-center">
                    {work.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 手に取る（リンク） */}
      {artist.links && (
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
                {artist.links.website && (
                  <a
                    href={artist.links.website}
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
                {artist.links.shop && (
                  <a
                    href={artist.links.shop}
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
                {artist.links.instagram && (
                  <a
                    href={artist.links.instagram}
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
      )}

      {/* この職人の工芸 */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-bold text-foreground mb-6">
            この職人の工芸
          </h2>
          <Link
            href={`/regions/${artist.regionSlug}`}
            className="group inline-flex items-center gap-4 rounded-lg border border-stone-light/20 bg-white p-5 hover:shadow-md transition-all"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-stone-light/20 text-2xl font-bold text-indigo">
              {artist.regionName.charAt(0)}
            </div>
            <div>
              <p className="text-base font-bold text-foreground group-hover:text-indigo transition-colors">
                {artist.regionName}
              </p>
              {artist.prefecture && artist.city && (
                <p className="text-xs text-stone mt-0.5">
                  {artist.prefecture}{artist.city}
                </p>
              )}
            </div>
          </Link>
        </div>
      </section>

      {/* 同じ産地の工房 */}
      {sameAreaShops.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              同じ産地の工房
            </h2>
            <div className="flex flex-wrap gap-4">
              {sameAreaShops.map((s) => (
                <Link
                  key={s.slug}
                  href={`/shops/${s.slug}`}
                  className="group inline-flex items-center gap-4 rounded-lg border border-stone-light/20 bg-white p-5 hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-900/10 text-xl font-bold text-amber-800">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors">
                      {s.name}
                    </p>
                    <p className="text-xs text-stone">{s.craftName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 戻るリンク */}
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
