import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  seasonalFeatures,
  getFeatureBySlug,
  seasonMeta,
} from "@/data/seasonal";

export function generateStaticParams() {
  return seasonalFeatures.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) return {};

  return {
    title: `${feature.title} | KOGEI PORTAL`,
    description: feature.description,
    openGraph: {
      title: feature.title,
      description: feature.description,
      images: [{ url: feature.coverImage, width: 1200, height: 630 }],
    },
  };
}

export default async function SeasonalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  const meta = seasonMeta[feature.season];

  return (
    <>
      {/* ヒーロー */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-[#1a1612]">
        <Image
          src={feature.coverImage}
          alt={feature.title}
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2420]/80 via-[#1a1612]/60 to-[#0d0b09]" />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-16 md:pb-20">
          {/* パンくず */}
          <nav
            className="flex items-center gap-2 text-xs text-stone-light/40 mb-8"
            aria-label="パンくずリスト"
          >
            <Link href="/" className="hover:text-white/70 transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link
              href="/seasonal"
              className="hover:text-white/70 transition-colors"
            >
              季節の特集
            </Link>
            <span>/</span>
            <span className="text-stone-light/60 truncate max-w-[200px]">
              {meta.label}
            </span>
          </nav>

          <span
            className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium mb-4 ${meta.color}`}
          >
            {meta.icon} {meta.label}の特集
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white/95 leading-tight mb-3">
            {feature.title}
          </h1>
          <p className="text-base md:text-lg text-stone-light/50 leading-relaxed">
            {feature.subtitle}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 哲学テキスト */}
      {feature.philosophy && (
        <section className="py-12 md:py-16 border-b border-stone-light/20">
          <div className="mx-auto max-w-3xl px-6">
            <blockquote className="border-l-2 border-stone-light/30 pl-8 py-2">
              <p className="font-serif text-base md:text-lg leading-[2.2] text-warm-gray italic">
                {feature.philosophy}
              </p>
            </blockquote>
          </div>
        </section>
      )}

      {/* おすすめ工芸品 */}
      <section className="py-12 md:py-16 border-b border-stone-light/20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-lg font-bold text-foreground mb-6">
            {meta.label}のおすすめ工芸品
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {feature.craftHighlights.map((h) => (
              <div
                key={h.name}
                className="rounded-lg bg-cream p-4"
              >
                <p className="text-sm font-bold text-foreground mb-1">
                  {h.name}
                </p>
                <p className="text-xs text-warm-gray leading-relaxed">
                  {h.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 本文 */}
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-4 leading-snug">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold text-foreground mt-8 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-base leading-[2] text-warm-gray mb-6">
                  {children}
                </p>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-indigo/30 pl-6 my-8 italic">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-foreground">{children}</strong>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1 text-warm-gray mb-6">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1 text-warm-gray mb-6">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-base leading-relaxed">{children}</li>
              ),
            }}
          >
            {feature.content}
          </ReactMarkdown>

          {/* タグ */}
          {feature.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-stone-light/20">
              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone-light/20 px-3 py-1 text-xs text-stone"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* 他の季節の特集 */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-xl font-bold text-foreground mb-8">
            他の季節の特集
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {seasonalFeatures
              .filter((f) => f.id !== feature.id)
              .map((f) => {
                const fMeta = seasonMeta[f.season];
                return (
                  <Link
                    key={f.id}
                    href={`/seasonal/${f.slug}`}
                    className="group rounded-lg border border-stone-light/20 bg-white overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={f.coverImage}
                        alt={f.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <span
                        className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-medium ${fMeta.color}`}
                      >
                        {fMeta.icon} {fMeta.label}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors line-clamp-2">
                        {f.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* 戻る */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Link
            href="/seasonal"
            className="inline-flex items-center gap-2 border-b border-stone-light/40 pb-1 text-sm text-stone hover:text-foreground transition-colors"
          >
            &larr; 季節の特集一覧に戻る
          </Link>
        </div>
      </section>
    </>
  );
}
