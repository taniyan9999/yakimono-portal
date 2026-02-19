import { stories } from "@/data/stories";
import StoryCategoryFilter from "@/components/StoryCategoryFilter";

export const metadata = {
  title: "物語 | KOGEI PORTAL",
  description:
    "日本の伝統工芸にまつわる物語。歴史、職人インタビュー、暮らしへの取り入れ方、産地比較など、工芸の奥深さを伝える読み物。",
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
          <h1 className="text-3xl md:text-5xl font-bold text-white/95 leading-tight mb-6">
            工芸に宿る、物語。
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-stone-light/50 max-w-2xl mx-auto">
            一つの工芸品の裏には、何世代にもわたる職人たちの挑戦と継承の物語がある。
            <br className="hidden md:block" />
            歴史の転換点、職人の声、暮らしの中の工芸——その物語を、ここに記録する。
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
