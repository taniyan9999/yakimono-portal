import { events, eventCategoryColors, getEventsByMonth } from "@/data/events";

export const metadata = {
  title: "イベントカレンダー | KOGEI PORTAL",
  description:
    "全国の陶器市・展示会・体験イベント・工芸祭りの年間スケジュール。有田陶器市、益子陶器市、備前焼まつりなど。",
};

function formatMonth(ym: string): string {
  const [year, month] = ym.split("-");
  return `${year}年${parseInt(month)}月`;
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start + "T00:00:00");
  const e = new Date(end + "T00:00:00");
  const sMonth = s.getMonth() + 1;
  const eMonth = e.getMonth() + 1;

  if (start === end) {
    return `${sMonth}月${s.getDate()}日`;
  }
  if (sMonth === eMonth) {
    return `${sMonth}月${s.getDate()}日〜${e.getDate()}日`;
  }
  return `${sMonth}月${s.getDate()}日〜${eMonth}月${e.getDate()}日`;
}

export default function EventsPage() {
  const byMonth = getEventsByMonth();
  const months = Object.keys(byMonth).sort();

  return (
    <>
      {/* ヒーロー */}
      <section className="bg-[#1a1612] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-stone-light/40 uppercase mb-6">
            Events
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white/95 leading-tight mb-6">
            イベントカレンダー
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-stone-light/50 max-w-2xl mx-auto">
            全国の陶器市・展示会・体験イベント・工芸祭りの年間スケジュール。
            <br className="hidden md:block" />
            職人の技に触れ、お気に入りの一品を見つける旅に出かけよう。
          </p>
        </div>
      </section>

      {/* カテゴリ凡例 */}
      <section className="border-b border-stone-light/20 py-6">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(eventCategoryColors).map(([key, v]) => (
              <span
                key={key}
                className={`rounded-full px-3 py-1 text-xs font-medium ${v.color}`}
              >
                {v.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 月別タイムライン */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-16">
            {months.map((month) => (
              <div key={month}>
                <h2 className="text-xl font-bold text-foreground mb-6 pb-3 border-b border-stone-light/30">
                  {formatMonth(month)}
                </h2>
                <div className="space-y-4">
                  {byMonth[month].map((event) => {
                    const catInfo =
                      eventCategoryColors[event.category] ?? {
                        label: event.category,
                        color: "bg-stone/10 text-stone",
                      };
                    return (
                      <div
                        key={event.id}
                        className="rounded-lg border border-stone-light/20 bg-white p-5 md:p-6 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <span
                              className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ${catInfo.color}`}
                            >
                              {catInfo.label}
                            </span>
                            <h3 className="text-base font-bold text-foreground">
                              {event.name}
                            </h3>
                          </div>
                          <span className="text-sm text-stone shrink-0">
                            {formatDateRange(event.startDate, event.endDate)}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-warm-gray mb-3">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone">
                          <span>
                            {event.prefecture} {event.city}
                          </span>
                          <span>{event.venue}</span>
                          <span className="text-indigo font-medium">
                            {event.relatedCraft}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
