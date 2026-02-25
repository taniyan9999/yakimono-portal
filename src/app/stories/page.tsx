import type { Metadata } from "next";
import { stories } from "@/data/stories";
import StoryCategoryFilter from "@/components/StoryCategoryFilter";
import { canonical } from "@/lib/metadata";

const desc =
  "日本の伝統工芸にまつわる物語。歴史、職人インタビュー、暮らしへの取り入れ方、産地比較など、工芸の奥深さを伝える読み物。";

export const metadata: Metadata = {
  title: "物語",
  description: desc,
  alternates: { canonical: canonical("/stories") },
  openGraph: { title: "物語", description: desc },
  twitter: { card: "summary_large_image", title: "物語", description: desc },
};

export default function StoriesPage() {
  return (
    <>
      {/* ヒーロー */}
      <section className="bg-[#1a1612] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-6">
            Stories
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white/95 leading-tight mb-6">
            手から手へ、伝える物語。
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-stone-light/50 max-w-2xl mx-auto">
            なぜ手でつくるのか。用の美とは何か。職人の哲学、暮らしの美学、
            <br className="hidden md:block" />
            そしてCraft × Techの可能性——工芸の本質を探る読み物。
          </p>
        </div>
      </section>

      {/* 記事一覧 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <StoryCategoryFilter stories={stories} />
        </div>
      </section>
    </>
  );
}
