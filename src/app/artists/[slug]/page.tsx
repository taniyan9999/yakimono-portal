import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists, getArtistBySlug } from "@/data/artists";
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
  return {
    title: `${artist.name}（${artist.regionName}）｜やきものポータル`,
    description: artist.style,
  };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-warm-gray">
        <Link href="/" className="hover:text-indigo transition-colors">
          トップ
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/regions/${artist.regionSlug}`}
          className="hover:text-indigo transition-colors"
        >
          {artist.regionName}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{artist.name}</span>
      </nav>

      {/* Profile Header */}
      <div className="mb-12 flex items-start gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-stone-light/30 text-3xl font-bold text-indigo">
          {artist.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            {artist.name}
          </h1>
          <div className="flex items-center gap-3 text-sm">
            <Link
              href={`/regions/${artist.regionSlug}`}
              className="font-medium text-indigo hover:text-indigo-light transition-colors"
            >
              {artist.regionName}
            </Link>
            <span className="text-stone">{artist.career}</span>
          </div>
        </div>
      </div>

      {/* Style */}
      <section className="mb-10 rounded-lg bg-cream p-6">
        <p className="text-lg leading-relaxed text-foreground font-medium">
          {artist.style}
        </p>
      </section>

      {/* Bio */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">経歴</h2>
        <p className="leading-relaxed text-warm-gray">{artist.bio}</p>
      </section>

      {/* Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">代表作品</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {artist.works.map((work) => (
            <div key={work.name} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-stone-light/30">
                <Image
                  src={work.image}
                  alt={work.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-warm-gray text-center">
                {work.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Back link */}
      <div className="border-t border-stone-light/30 pt-8">
        <Link
          href={`/regions/${artist.regionSlug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo hover:text-indigo-light transition-colors"
        >
          &larr; {artist.regionName}の作家一覧に戻る
        </Link>
      </div>
    </div>
  );
}
