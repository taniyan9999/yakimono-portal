import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { SITE_URL, SITE_NAME } from "@/lib/metadata";
import { craftJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import ManufacturingSteps from "@/components/ManufacturingSteps";
import ArtisanAvatar from "@/components/ArtisanAvatar";
import FavoriteButton from "@/components/FavoriteButton";
import ShareButtons from "@/components/ShareButtons";
import ECLinks from "@/components/ECLinks";
import ImageGallery from "@/components/ImageGallery";
import stepsData from "@/data/manufacturing-steps.json";
import artisansData from "@/data/artisans-all.json";
import { getGalleryImages } from "@/data/gallery";
import { getCraftPhilosophy } from "@/data/craft-philosophy";
import { artists } from "@/data/artists";
import { shops } from "@/data/shops";

type Craft = {
  id: string;
  name: string;
  name_kana: string;
  prefecture: string;
  city: string;
  category: string;
  description: string;
  history: string;
  technique: string;
  designated_year: number | null;
  official_url: string | null;
  image_url: string | null;
};

type Artisan = {
  id: string;
  name: string;
  generation: string | null;
  biography: string | null;
  philosophy: string | null;
  quote: string | null;
  workshop_name: string | null;
};

type Story = {
  id: string;
  title: string;
  content: string;
  story_type: string;
  artisan_id: string | null;
};

const storyTypeLabels: Record<string, { label: string; color: string }> = {
  history_turning_point: { label: "歴史の転換点", color: "bg-amber-900/20 text-amber-800" },
  technique: { label: "技法", color: "bg-indigo/10 text-indigo" },
  artisan_voice: { label: "職人の声", color: "bg-emerald-900/20 text-emerald-800" },
  cultural_significance: { label: "文化的意義", color: "bg-stone/10 text-stone" },
};

/* ---------- SEO: generateMetadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data: craft } = await supabase
    .from("crafts")
    .select("name, name_kana, prefecture, city, category, description, image_url")
    .eq("id", id)
    .single();

  if (!craft) return {};

  const title = `${craft.name}（${craft.prefecture}）`;
  const description = `${craft.name}（${craft.name_kana}）は${craft.prefecture}${craft.city}の${craft.category}。${craft.description.slice(0, 120)}`;
  const url = `${SITE_URL}/crafts/${id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      type: "article",
      ...(craft.image_url ? { images: [{ url: craft.image_url, width: 1200, height: 630, alt: craft.name }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      ...(craft.image_url ? { images: [craft.image_url] } : {}),
    },
  };
}

export default async function CraftDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [craftRes, artisansRes, storiesRes] = await Promise.all([
    supabase.from("crafts").select("*").eq("id", id).single(),
    supabase.from("artisans").select("*").eq("craft_id", id).order("created_at"),
    supabase.from("stories").select("*").eq("craft_id", id).order("created_at"),
  ]);

  const craft = craftRes.data as Craft | null;
  if (!craft) notFound();

  // Supabase の職人データがなければローカルJSONから取得
  type LocalArtisan = { name: string; generation: string | null; biography: string | null; philosophy: string | null; quote: string | null; workshop_name: string | null };
  const supabaseArtisans = (artisansRes.data ?? []) as Artisan[];
  const localArtisans: Artisan[] = (
    (artisansData as Record<string, LocalArtisan[]>)[craft.name] ?? []
  ).map((a, i) => ({ id: `local-${i}`, ...a }));
  const artisans = supabaseArtisans.length > 0 ? supabaseArtisans : localArtisans;
  const stories = (storiesRes.data ?? []) as Story[];

  // 製造工程データを取得
  const manufacturingSteps =
    (stepsData as Record<string, { step: number; name: string; description: string }[]>)[
      craft.name
    ] ?? [];

  // ギャラリー画像を取得
  const galleryImages = getGalleryImages(craft.name);

  // 哲学ノートを取得
  const philosophy = getCraftPhilosophy(craft.name);

  // 同じカテゴリの関連工芸品を取得
  const { data: relatedData } = await supabase
    .from("crafts")
    .select("id, name, prefecture, category, image_url")
    .eq("category", craft.category)
    .neq("id", id)
    .limit(4);
  const relatedCrafts = (relatedData ?? []) as {
    id: string;
    name: string;
    prefecture: string;
    category: string;
    image_url: string | null;
  }[];

  // JSON-LD structured data
  const craftUrl = `${SITE_URL}/crafts/${id}`;
  const jsonLdData = [
    craftJsonLd({
      name: craft.name,
      description: craft.description,
      url: craftUrl,
      image: craft.image_url,
      category: craft.category,
      prefecture: craft.prefecture,
      city: craft.city,
      designatedYear: craft.designated_year,
    }),
    breadcrumbJsonLd([
      { name: "ホーム", url: SITE_URL },
      { name: craft.category, url: `${SITE_URL}/category/${encodeURIComponent(craft.category)}` },
      { name: craft.name, url: craftUrl },
    ]),
    faqJsonLd([
      {
        question: `${craft.name}とは何ですか？`,
        answer: craft.description,
      },
      {
        question: `${craft.name}の産地はどこですか？`,
        answer: `${craft.name}は${craft.prefecture}${craft.city}で生産されている${craft.category}です。${craft.designated_year ? `${craft.designated_year}年に経済産業大臣指定伝統的工芸品に指定されています。` : ""}`,
      },
      ...(craft.technique
        ? [
            {
              question: `${craft.name}の技法・特徴は？`,
              answer: craft.technique,
            },
          ]
        : []),
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      {/* ヒーロー */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#1a1612]">
        {craft.image_url && (
          <Image
            src={craft.image_url}
            alt={craft.name}
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2420]/80 via-[#1a1612]/60 to-[#0d0b09]" />

        {/* 戻るリンク & お気に入り */}
        <div className="absolute top-8 left-8 right-8 z-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            &larr; 一覧に戻る
          </Link>
          <FavoriteButton craftId={id} />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 md:pb-20">
          <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-4">
            {craft.category}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white/95 leading-[1.1] mb-3">
            {craft.name}
          </h1>
          <p className="text-lg text-stone-light/40 mb-6">{craft.name_kana}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-light/50">
            <span>{craft.prefecture} {craft.city}</span>
            {craft.designated_year && (
              <>
                <span className="text-stone-light/20">|</span>
                <span>{craft.designated_year}年 伝統的工芸品指定</span>
              </>
            )}
            {craft.official_url && (
              <>
                <span className="text-stone-light/20">|</span>
                <a
                  href={craft.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-white/70 transition-colors"
                >
                  公式サイト
                </a>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 概要 */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-lg md:text-xl leading-[2] text-foreground">
            {craft.description}
          </p>
        </div>
      </section>

      {/* この工芸の哲学 */}
      {philosophy && (
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
                <p className="font-serif text-base leading-[2.2] text-stone-light/60 mb-8">
                  {philosophy.note}
                </p>
                {philosophy.quote && (
                  <blockquote className="border-l-2 border-stone-light/20 pl-6">
                    <p className="font-serif text-lg leading-relaxed text-white/70 italic mb-3">
                      &ldquo;{philosophy.quote.text}&rdquo;
                    </p>
                    <footer className="text-sm text-stone-light/40">
                      ——{philosophy.quote.author}
                    </footer>
                  </blockquote>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 歴史 */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
            <div className="mb-8 md:mb-0">
              <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                History
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                歴史
              </h2>
            </div>
            <div>
              <p className="text-base leading-[2] text-warm-gray">
                {craft.history}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 技法 */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
            <div className="mb-8 md:mb-0">
              <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
                Technique
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                技法
              </h2>
            </div>
            <div>
              <p className="text-base leading-[2] text-warm-gray">
                {craft.technique}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ギャラリー */}
      {galleryImages.length > 0 && (
        <ImageGallery images={galleryImages} craftName={craft.name} />
      )}

      {/* 制作工程 */}
      {manufacturingSteps.length > 0 && (
        <ManufacturingSteps steps={manufacturingSteps} />
      )}

      {/* 職人 */}
      {artisans.length > 0 && (
        <section className="bg-[#1a1612] py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-3">
              Artisans
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-14">
              この工芸を紡ぐ人々
            </h2>

            <div className="space-y-16">
              {artisans.map((artisan) => {
                const featuredArtist = artists.find(
                  (a) => artisan.name.replace(/\s/g, "") === a.name.replace(/\s/g, ""),
                );
                return (
                <div key={artisan.id} className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
                  <div className="mb-6 md:mb-0">
                    <div className="mb-4">
                      <ArtisanAvatar name={artisan.name} size={80} />
                    </div>
                    {featuredArtist ? (
                      <Link
                        href={`/artists/${featuredArtist.slug}`}
                        className="text-xl font-bold text-white/90 hover:text-indigo transition-colors underline underline-offset-4 decoration-stone-light/20"
                      >
                        {artisan.name}
                      </Link>
                    ) : (
                      <h3 className="text-xl font-bold text-white/90">{artisan.name}</h3>
                    )}
                    {artisan.generation && (
                      <p className="text-sm text-stone-light/40 mt-1">{artisan.generation}</p>
                    )}
                    {artisan.workshop_name && (
                      <p className="text-sm text-stone-light/30 mt-1">{artisan.workshop_name}</p>
                    )}
                    {featuredArtist && (
                      <Link
                        href={`/artists/${featuredArtist.slug}`}
                        className="inline-block mt-3 text-xs text-indigo/70 hover:text-indigo transition-colors"
                      >
                        プロフィールを見る &rarr;
                      </Link>
                    )}
                  </div>

                  <div className="space-y-6">
                    {artisan.biography && (
                      <p className="text-base leading-[2] text-stone-light/60">
                        {artisan.biography}
                      </p>
                    )}
                    {artisan.philosophy && (
                      <div className="border-l-2 border-stone-light/20 pl-6">
                        <p className="text-sm italic text-stone-light/50 mb-1">制作哲学</p>
                        <p className="text-base leading-relaxed text-white/70">
                          {artisan.philosophy}
                        </p>
                      </div>
                    )}
                    {artisan.quote && (
                      <blockquote className="relative">
                        <span className="absolute -top-4 -left-2 text-5xl text-stone-light/10 font-serif">
                          &ldquo;
                        </span>
                        <p className="pl-6 text-lg leading-relaxed text-white/80 italic">
                          {artisan.quote}
                        </p>
                      </blockquote>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* エピソード */}
      {stories.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
              Stories
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-14">
              物語
            </h2>

            <div className="space-y-8">
              {stories.map((story) => {
                const typeInfo = storyTypeLabels[story.story_type] ?? {
                  label: story.story_type,
                  color: "bg-stone/10 text-stone",
                };
                return (
                  <article
                    key={story.id}
                    className="rounded-lg border border-stone-light/20 bg-white p-8 md:p-10"
                  >
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                        {story.title}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${typeInfo.color}`}
                      >
                        {typeInfo.label}
                      </span>
                    </div>
                    <p className="text-base leading-[2] text-warm-gray">
                      {story.content}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 関連する工房・店舗 */}
      {(() => {
        const relatedShops = shops.filter((s) => s.craftName === craft.name);
        if (relatedShops.length === 0) return null;
        return (
          <section className="py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-xl font-bold text-foreground mb-6">
                この工芸の工房・店舗
              </h2>
              <div className="flex flex-wrap gap-4">
                {relatedShops.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/shops/${s.slug}`}
                    className="group flex items-center gap-4 rounded-lg border border-stone-light/20 bg-white p-5 hover:shadow-md transition-all"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-900/10 text-2xl font-bold text-amber-800">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-base font-bold text-foreground group-hover:text-indigo transition-colors">
                        {s.name}
                      </p>
                      <p className="text-xs text-stone">
                        {s.prefecture}{s.city} ・ {s.locations.length}拠点
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* EC連携 & SNSシェア */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="md:grid md:grid-cols-[1fr_auto] md:gap-8 md:items-start">
            <ECLinks craftName={craft.name} />
            <div className="mt-6 md:mt-0">
              <ShareButtons title={`${craft.name} | KOGEI PORTAL`} />
            </div>
          </div>
        </div>
      </section>

      {/* 関連工芸品 */}
      {relatedCrafts.length > 0 && (
        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-xl font-bold text-foreground mb-8">
              同じカテゴリの工芸品
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedCrafts.map((r) => (
                <Link
                  key={r.id}
                  href={`/crafts/${r.id}`}
                  className="group rounded-lg border border-stone-light/20 bg-white overflow-hidden hover:shadow-md transition-all"
                >
                  {r.image_url && (
                    <div className="relative aspect-[4/3] bg-cream">
                      <Image
                        src={r.image_url}
                        alt={r.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-indigo transition-colors truncate">
                      {r.name}
                    </h3>
                    <p className="text-[11px] text-stone mt-0.5">
                      {r.prefecture}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 一覧に戻る */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-b border-stone-light/40 pb-1 text-sm text-stone hover:text-foreground transition-colors"
          >
            &larr; 工芸品一覧に戻る
          </Link>
        </div>
      </section>
    </>
  );
}
