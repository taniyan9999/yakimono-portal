import Link from "next/link";
import { notFound } from "next/navigation";
import { regions, getRegionBySlug } from "@/data/regions";
import { getArtistsByRegion } from "@/data/artists";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return {};
  return {
    title: `${region.name}｜やきものポータル`,
    description: region.description,
  };
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) notFound();

  const artists = getArtistsByRegion(slug);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-warm-gray">
        <Link href="/" className="hover:text-indigo transition-colors">
          トップ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{region.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-medium tracking-widest text-stone uppercase mb-2">
          {region.area}
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {region.name}
        </h1>
        <p className="text-lg leading-relaxed text-warm-gray">
          {region.description}
        </p>
      </div>

      {/* History */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">歴史</h2>
        <p className="leading-relaxed text-warm-gray">{region.history}</p>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">特徴</h2>
        <ul className="space-y-2">
          {region.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-warm-gray">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Techniques */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">代表的な技法</h2>
        <div className="flex flex-wrap gap-2">
          {region.techniques.map((technique) => (
            <span
              key={technique}
              className="rounded-full bg-cream px-4 py-1.5 text-sm text-indigo font-medium"
            >
              {technique}
            </span>
          ))}
        </div>
      </section>

      {/* Artists */}
      {artists.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {region.name}の作家
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {artists.map((artist) => (
              <Link
                key={artist.slug}
                href={`/artists/${artist.slug}`}
                className="group rounded-lg border border-stone-light/30 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stone-light/30 text-lg font-bold text-indigo">
                  {artist.name.charAt(0)}
                </div>
                <h3 className="font-bold text-foreground mb-1 group-hover:text-indigo transition-colors">
                  {artist.name}
                </h3>
                <p className="text-xs text-stone mb-2">{artist.career}</p>
                <p className="text-sm leading-relaxed text-warm-gray">
                  {artist.style}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
