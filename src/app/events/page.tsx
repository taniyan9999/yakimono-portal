import { events } from "@/data/events";
import EventFilter from "@/components/EventFilter";

export const metadata = {
  title: "イベントカレンダー | KOGEI PORTAL",
  description:
    "全国の陶器市・展示会・体験イベント・工芸祭り、KT VACEトークイベントの年間スケジュール。",
};

export default function EventsPage() {
  return (
    <>
      {/* ヒーロー */}
      <section className="bg-[#1a1612] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-6">
            Events
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white/95 leading-tight mb-6">
            工芸に出会う場所
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-stone-light/50 max-w-2xl mx-auto">
            全国の陶器市、展示会、KT VACEの哲学トーク、体験ワークショップ。
            <br className="hidden md:block" />
            手仕事の温もりに触れる旅に出かけよう。
          </p>
        </div>
      </section>

      {/* イベント一覧 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <EventFilter events={events} />
        </div>
      </section>
    </>
  );
}
