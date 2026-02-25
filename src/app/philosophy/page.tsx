import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { philosophySections } from "@/data/philosophy";
import FadeInSection from "@/components/FadeInSection";
import { canonical } from "@/lib/metadata";

const desc =
  "なぜ手でつくるのか。用の美とは何か。柳宗悦の民藝思想、テクノ民藝の視点、KT VACEの「Craft × Tech」哲学を通じて、日本の伝統工芸の本質を探ります。";

export const metadata: Metadata = {
  title: "哲学",
  description: desc,
  alternates: { canonical: canonical("/philosophy") },
  openGraph: { title: "哲学", description: desc },
  twitter: { card: "summary_large_image", title: "哲学", description: desc },
};

export default function PhilosophyPage() {
  const sections = philosophySections;

  return (
    <>
      {/* ヒーロー */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#1a1612]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2420]/80 via-[#1a1612]/90 to-[#0d0b09]" />
        <div className="relative z-10 text-center px-6 py-20">
          <p className="text-xs tracking-[0.4em] text-stone-light/40 uppercase mb-6">
            Philosophy
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.2] text-white/95 mb-6">
            用の美を、
            <br />
            暮らしのなかへ。
          </h1>
          <p className="max-w-lg mx-auto text-sm md:text-base leading-relaxed text-stone-light/50">
            手でつくること、使うこと、伝えること。
            <br />
            工芸が問いかける、ものづくりの哲学。
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* セクション1: なぜ手でつくるのか（白背景） */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <FadeInSection>
            <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
              {sections[0].enTitle}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-10">
              {sections[0].jaTitle}
            </h2>
            <div className="md:grid md:grid-cols-[1fr_300px] md:gap-12 items-start">
              <div>
                {sections[0].body.split("\n\n").map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-[2.2] text-warm-gray mb-6 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="hidden md:block relative aspect-[3/4] rounded-lg overflow-hidden mt-2">
                <Image
                  src={sections[0].imageUrl}
                  alt={sections[0].imageAlt}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            </div>
          </FadeInSection>

          {sections[0].quote && (
            <FadeInSection className="mt-16">
              <blockquote className="border-l-2 border-stone-light/30 pl-8 py-4">
                <p className="font-serif text-lg md:text-xl leading-[2] text-foreground italic">
                  {sections[0].quote.text}
                </p>
                <footer className="mt-4 text-sm text-stone">
                  ——{sections[0].quote.author}
                  {sections[0].quote.source && (
                    <span className="text-stone-light">
                      {" "}
                      {sections[0].quote.source}
                    </span>
                  )}
                </footer>
              </blockquote>
            </FadeInSection>
          )}
        </div>
      </section>

      {/* セクション2: 手仕事は対話である（cream背景） */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <FadeInSection>
            <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
              {sections[1].enTitle}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-10">
              {sections[1].jaTitle}
            </h2>
            <div className="md:grid md:grid-cols-[300px_1fr] md:gap-12 items-start">
              <div className="hidden md:block relative aspect-[3/4] rounded-lg overflow-hidden mt-2">
                <Image
                  src={sections[1].imageUrl}
                  alt={sections[1].imageAlt}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
              <div>
                {sections[1].body.split("\n\n").map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-[2.2] text-warm-gray mb-6 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </FadeInSection>

          {sections[1].quote && (
            <FadeInSection className="mt-16">
              <blockquote className="border-l-2 border-stone-light/30 pl-8 py-4">
                <p className="font-serif text-lg md:text-xl leading-[2] text-foreground italic">
                  {sections[1].quote.text}
                </p>
                <footer className="mt-4 text-sm text-stone">
                  ——{sections[1].quote.author}
                  {sections[1].quote.source && (
                    <span className="text-stone-light">
                      {" "}
                      {sections[1].quote.source}
                    </span>
                  )}
                </footer>
              </blockquote>
            </FadeInSection>
          )}
        </div>
      </section>

      {/* セクション3: テクノロジーは、手仕事の翼になる（白背景） */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <FadeInSection>
            <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
              {sections[2].enTitle}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-10">
              {sections[2].jaTitle}
            </h2>
            <div className="md:grid md:grid-cols-[1fr_300px] md:gap-12 items-start">
              <div>
                {sections[2].body.split("\n\n").map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-[2.2] text-warm-gray mb-6 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="hidden md:block relative aspect-[3/4] rounded-lg overflow-hidden mt-2">
                <Image
                  src={sections[2].imageUrl}
                  alt={sections[2].imageAlt}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            </div>
          </FadeInSection>

          {sections[2].quote && (
            <FadeInSection className="mt-16">
              <blockquote className="border-l-2 border-stone-light/30 pl-8 py-4">
                <p className="font-serif text-lg md:text-xl leading-[2] text-foreground italic">
                  {sections[2].quote.text}
                </p>
                <footer className="mt-4 text-sm text-stone">
                  ——{sections[2].quote.author}
                  {sections[2].quote.source && (
                    <span className="text-stone-light">
                      {" "}
                      {sections[2].quote.source}
                    </span>
                  )}
                </footer>
              </blockquote>
            </FadeInSection>
          )}
        </div>
      </section>

      {/* セクション4: 暮らしに哲学を置く（cream背景） */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <FadeInSection>
            <p className="text-xs tracking-[0.3em] text-stone uppercase mb-3">
              {sections[3].enTitle}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-10">
              {sections[3].jaTitle}
            </h2>
            <div className="md:grid md:grid-cols-[300px_1fr] md:gap-12 items-start">
              <div className="hidden md:block relative aspect-[3/4] rounded-lg overflow-hidden mt-2">
                <Image
                  src={sections[3].imageUrl}
                  alt={sections[3].imageAlt}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
              <div>
                {sections[3].body.split("\n\n").map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-[2.2] text-warm-gray mb-6 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </FadeInSection>

          {sections[3].quote && (
            <FadeInSection className="mt-16">
              <blockquote className="border-l-2 border-stone-light/30 pl-8 py-4">
                <p className="font-serif text-lg md:text-xl leading-[2] text-foreground italic">
                  {sections[3].quote.text}
                </p>
                <footer className="mt-4 text-sm text-stone">
                  ——{sections[3].quote.author}
                  {sections[3].quote.source && (
                    <span className="text-stone-light">
                      {" "}
                      {sections[3].quote.source}
                    </span>
                  )}
                </footer>
              </blockquote>
            </FadeInSection>
          )}
        </div>
      </section>

      {/* セクション5: 未来へ繋ぐ（ダーク背景） */}
      <section className="bg-[#1a1612] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <FadeInSection>
            <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-3">
              {sections[4].enTitle}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white/90 leading-tight mb-10">
              {sections[4].jaTitle}
            </h2>
            <div className="md:grid md:grid-cols-[300px_1fr] md:gap-12 items-start">
              <div className="hidden md:block relative aspect-[3/4] rounded-lg overflow-hidden mt-2">
                <Image
                  src={sections[4].imageUrl}
                  alt={sections[4].imageAlt}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
              <div>
                {sections[4].body.split("\n\n").map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-[2.2] text-stone-light/60 mb-6 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </FadeInSection>

          <FadeInSection className="mt-20 text-center">
            <p className="font-serif text-lg md:text-xl text-white/70 italic leading-relaxed mb-8">
              手から手へ、心から心へ。
              <br />
              ものづくりの灯を、次の時代へ。
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-b border-stone-light/30 pb-1 text-sm text-stone-light/50 hover:text-white/80 transition-colors"
            >
              工芸品を探す &rarr;
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
