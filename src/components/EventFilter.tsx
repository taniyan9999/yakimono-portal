"use client";

import { useState } from "react";
import type { CraftEvent, EventType } from "@/data/events";
import { eventCategoryColors } from "@/data/events";

type Props = {
  events: CraftEvent[];
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

const filterCategories: { key: EventType | "all"; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "陶器市", label: "陶器市" },
  { key: "展示会", label: "展示会" },
  { key: "体験", label: "体験" },
  { key: "祭り", label: "祭り" },
  { key: "トークイベント", label: "トーク" },
  { key: "ワークショップ", label: "WS" },
];

export default function EventFilter({
  events,
}: Props) {
  const [active, setActive] = useState<EventType | "all">("all");

  const filtered =
    active === "all"
      ? events
      : events.filter((e) => e.category === active);

  // 月ごとにグループ化
  const byMonth: Record<string, CraftEvent[]> = {};
  for (const event of filtered) {
    const month = event.startDate.slice(0, 7);
    if (!byMonth[month]) byMonth[month] = [];
    byMonth[month].push(event);
  }
  const months = Object.keys(byMonth).sort();

  return (
    <>
      {/* フィルタータブ */}
      <div className="flex flex-wrap gap-2 mb-12">
        {filterCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              active === cat.key
                ? "bg-foreground text-white"
                : "bg-stone-light/30 text-warm-gray hover:bg-stone-light/50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 月別タイムライン */}
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
                const isKtVace = event.organizer === "KT VACE";
                return (
                  <div
                    key={event.id}
                    className={`rounded-lg border bg-white p-5 md:p-6 hover:shadow-sm transition-shadow ${
                      isKtVace
                        ? "border-indigo/30 ring-1 ring-indigo/10"
                        : "border-stone-light/20"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ${catInfo.color}`}
                        >
                          {catInfo.label}
                        </span>
                        {isKtVace && (
                          <span className="shrink-0 rounded-full bg-indigo/10 px-3 py-1 text-[11px] font-medium text-indigo">
                            KT VACE
                          </span>
                        )}
                        {event.isFree && (
                          <span className="shrink-0 rounded-full bg-emerald-900/10 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                            無料
                          </span>
                        )}
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
                    {event.philosophyConnection && (
                      <p className="font-serif text-xs leading-relaxed text-indigo/70 italic mb-3 pl-3 border-l-2 border-indigo/20">
                        {event.philosophyConnection}
                      </p>
                    )}
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

        {months.length === 0 && (
          <p className="text-center text-warm-gray py-16">
            該当するイベントはありません。
          </p>
        )}
      </div>
    </>
  );
}
