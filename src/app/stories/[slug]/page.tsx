import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  stories,
  getStoryBySlug,
  getRelatedStories,
  storyCategoryLabels,
} from "@/data/stories";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  return {
    title: `${story.title} | KOGEI PORTAL`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: "article",
      publishedTime: story.publishedAt,
      modifiedTime: story.updatedAt,
      authors: [story.author.name],
      tags: story.tags,
      images: [
        {
          url: story.coverImage,
          width: 1200,
          height: 630,
          alt: story.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.excerpt,
      images: [story.coverImage],
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const cat = storyCategoryLabels[story.category];
  const related = getRelatedStories(story, 3);

  return (
    <>
      {/* ヒーロー */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-[#1a1612]">
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2420]/80 via-[#1a1612]/60 to-[#0d0b09]" />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-16 md:pb-20">
          {/* パンくずリスト */}
          <nav
            className="flex items-center gap-2 text-xs text-stone-light/40 mb-8"
            aria-label="パンくずリスト"
          >
            <Link href="/" className="hover:text-white/70 transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link
              href="/stories"
              className="hover:text-white/70 transition-colors"
            >
              物語
            </Link>
            <span>/</span>
            <span className="text-stone-light/60 truncate max-w-[200px]">
              {story.title}
            </span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span
              className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium ${cat.color}`}
            >
              {cat.label}
            </span>
            {story.philosophyKeyword && (
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/60 font-medium">
                {story.philosophyKeyword}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white/95 leading-tight mb-3">
            {story.title}
          </h1>
          <p className="text-base md:text-lg text-stone-light/50 leading-relaxed mb-6">
            {story.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-light/40">
            <span>{story.author.name}</span>
            <span className="text-stone-light/20">|</span>
            <time dateTime={story.publishedAt}>
              {new Date(story.publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="text-stone-light/20">|</span>
            <span>{story.readingTime}分で読める</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 本文 */}
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose-kogei">
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
                  <strong className="font-bold text-foreground">
                    {children}
                  </strong>
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
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8">
                    <table className="w-full text-sm border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-cream">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="border border-stone-light/30 px-4 py-2 text-left font-bold text-foreground">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-stone-light/30 px-4 py-2 text-warm-gray">
                    {children}
                  </td>
                ),
              }}
            >
              {story.content}
            </ReactMarkdown>
          </div>

          {/* この記事の哲学 */}
          {story.philosophyKeyword && (
            <div className="mt-12 rounded-lg bg-[#1a1612] p-8 md:p-10">
              <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-2">
                Philosophy of this story
              </p>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-white/90 mb-4">
                {story.philosophyKeyword}
              </h3>
              <p className="font-serif text-sm leading-[2] text-stone-light/60">
                この記事が探求するのは「{story.philosophyKeyword}」という視点です。
                工芸品の奥にある哲学を感じながら、あなた自身の暮らしと手仕事の関係を見つめ直してみてください。
              </p>
            </div>
          )}

          {/* タグ */}
          {story.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-stone-light/20">
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (
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

          {/* 著者情報 */}
          <div className="mt-8 flex items-center gap-4 rounded-lg bg-cream p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo/10 text-indigo font-bold text-lg">
              {story.author.name[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                {story.author.name}
              </p>
              <p className="text-xs text-stone">{story.author.role}</p>
            </div>
          </div>
        </div>
      </article>

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-xl font-bold text-foreground mb-8">
              関連する物語
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => {
                const rCat = storyCategoryLabels[r.category];
                return (
                  <Link
                    key={r.id}
                    href={`/stories/${r.slug}`}
                    className="group rounded-lg border border-stone-light/20 bg-white overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={r.coverImage}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <span
                        className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-medium ${rCat.color}`}
                      >
                        {rCat.label}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="text-[11px] text-stone mt-1">
                        {r.readingTime}分で読める
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 一覧に戻る */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 border-b border-stone-light/40 pb-1 text-sm text-stone hover:text-foreground transition-colors"
          >
            &larr; 物語一覧に戻る
          </Link>
        </div>
      </section>
    </>
  );
}
