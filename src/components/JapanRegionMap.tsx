"use client";

import { useState } from "react";
import Link from "next/link";

type RegionData = {
  name: string;
  slug: string;
  prefectures: string[];
};

type PrefectureCraftCount = Record<string, number>;

// ブロック型日本地図の配置定義（row, col）
const regionPositions: Record<
  string,
  { row: number; col: number; rowSpan?: number; colSpan?: number }
> = {
  tohoku: { row: 0, col: 3, colSpan: 2 },
  hokuriku: { row: 1, col: 2 },
  kanto: { row: 1, col: 3 },
  kinki: { row: 2, col: 2 },
  tokai: { row: 2, col: 3 },
  chugoku: { row: 3, col: 1 },
  shikoku: { row: 3, col: 2 },
  kyushu: { row: 4, col: 0, colSpan: 2 },
};

const regionColors: Record<string, { bg: string; bgHover: string; text: string; border: string }> =
  {
    tohoku: {
      bg: "bg-sky-50",
      bgHover: "bg-sky-100",
      text: "text-sky-800",
      border: "border-sky-200",
    },
    hokuriku: {
      bg: "bg-teal-50",
      bgHover: "bg-teal-100",
      text: "text-teal-800",
      border: "border-teal-200",
    },
    kanto: {
      bg: "bg-indigo-50",
      bgHover: "bg-indigo-100",
      text: "text-indigo-800",
      border: "border-indigo-200",
    },
    tokai: {
      bg: "bg-amber-50",
      bgHover: "bg-amber-100",
      text: "text-amber-800",
      border: "border-amber-200",
    },
    kinki: {
      bg: "bg-rose-50",
      bgHover: "bg-rose-100",
      text: "text-rose-800",
      border: "border-rose-200",
    },
    chugoku: {
      bg: "bg-emerald-50",
      bgHover: "bg-emerald-100",
      text: "text-emerald-800",
      border: "border-emerald-200",
    },
    shikoku: {
      bg: "bg-orange-50",
      bgHover: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-200",
    },
    kyushu: {
      bg: "bg-purple-50",
      bgHover: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-200",
    },
  };

export default function JapanRegionMap({
  regions,
  prefectureCounts,
  totalCrafts,
}: {
  regions: RegionData[];
  prefectureCounts: PrefectureCraftCount;
  totalCrafts: number;
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeRegion = regions.find((r) => r.slug === activeSlug);
  const activeCraftCount = activeRegion
    ? activeRegion.prefectures.reduce((sum, p) => sum + (prefectureCounts[p] ?? 0), 0)
    : 0;

  return (
    <div className="md:grid md:grid-cols-[1fr_340px] md:gap-10 lg:gap-14">
      {/* 左: 地図 */}
      <div>
        {/* モバイル: 横スクロールタブ */}
        <div className="flex gap-2 overflow-x-auto pb-4 md:hidden -mx-6 px-6 scrollbar-hide">
          {regions.map((region) => {
            const colors = regionColors[region.slug];
            const isActive = activeSlug === region.slug;
            const count = region.prefectures.reduce(
              (sum, p) => sum + (prefectureCounts[p] ?? 0),
              0
            );
            return (
              <button
                key={region.slug}
                onClick={() => setActiveSlug(isActive ? null : region.slug)}
                className={`shrink-0 rounded-lg border px-4 py-2.5 text-left transition-all ${
                  isActive
                    ? `${colors?.bgHover} ${colors?.border} ${colors?.text}`
                    : "bg-white border-stone-light/20 text-warm-gray hover:border-stone-light/40"
                }`}
              >
                <p className="text-sm font-bold whitespace-nowrap">{region.name}</p>
                <p className="text-[11px] opacity-60 mt-0.5">{count}品目</p>
              </button>
            );
          })}
        </div>

        {/* デスクトップ: ブロック型地図 */}
        <div className="hidden md:block">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: "repeat(5, 1fr)",
              gridTemplateRows: "repeat(5, auto)",
            }}
          >
            {regions.map((region) => {
              const pos = regionPositions[region.slug];
              const colors = regionColors[region.slug];
              const isActive = activeSlug === region.slug;
              const count = region.prefectures.reduce(
                (sum, p) => sum + (prefectureCounts[p] ?? 0),
                0
              );

              if (!pos || !colors) return null;

              return (
                <button
                  key={region.slug}
                  onMouseEnter={() => setActiveSlug(region.slug)}
                  onClick={() => setActiveSlug(region.slug)}
                  className={`rounded-lg border-2 p-4 text-left transition-all cursor-pointer ${
                    isActive
                      ? `${colors.bgHover} ${colors.border} ${colors.text} shadow-sm scale-[1.03]`
                      : `${colors.bg} border-transparent ${colors.text} hover:${colors.bgHover} hover:border-current/20`
                  }`}
                  style={{
                    gridRow: `${pos.row + 1} / span ${pos.rowSpan ?? 1}`,
                    gridColumn: `${pos.col + 1} / span ${pos.colSpan ?? 1}`,
                  }}
                >
                  <p className="text-sm font-bold leading-tight">{region.name}</p>
                  <p className="text-xs opacity-50 mt-1">{count}品目</p>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-stone mt-4">
            地方名をホバーすると詳細を表示します
          </p>
        </div>
      </div>

      {/* 右: 地方詳細パネル */}
      <div className="mt-6 md:mt-0">
        {activeRegion ? (
          <div className="rounded-xl border border-stone-light/20 bg-white overflow-hidden">
            {/* ヘッダー */}
            <div
              className={`px-5 py-4 border-b ${
                regionColors[activeRegion.slug]?.bg
              } border-stone-light/10`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`text-lg font-bold ${regionColors[activeRegion.slug]?.text}`}
                  >
                    {activeRegion.name}
                  </h3>
                  <p className="text-xs text-warm-gray mt-0.5">
                    {activeCraftCount}品目
                  </p>
                </div>
                <Link
                  href={`/area/${activeRegion.slug}`}
                  className="text-xs text-indigo hover:underline underline-offset-2"
                >
                  一覧を見る &rarr;
                </Link>
              </div>
            </div>

            {/* 都道府県リスト */}
            <ul className="divide-y divide-stone-light/10">
              {activeRegion.prefectures
                .filter((p) => (prefectureCounts[p] ?? 0) > 0)
                .map((pref) => (
                  <li key={pref}>
                    <Link
                      href={`/area/${activeRegion.slug}#pref-${pref}`}
                      className="flex items-center justify-between px-5 py-3 hover:bg-cream/50 transition-colors"
                    >
                      <span className="text-sm text-foreground">{pref}</span>
                      <span className="text-xs text-stone tabular-nums">
                        {prefectureCounts[pref]}品目
                      </span>
                    </Link>
                  </li>
                ))}
              {activeRegion.prefectures.filter(
                (p) => (prefectureCounts[p] ?? 0) > 0
              ).length === 0 && (
                <li className="px-5 py-4 text-sm text-stone">
                  登録されている工芸品はありません
                </li>
              )}
            </ul>
          </div>
        ) : (
          /* 未選択時のプレースホルダー */
          <div className="rounded-xl border border-dashed border-stone-light/30 bg-white/50 flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-stone"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              全国 {totalCrafts}品目
            </p>
            <p className="text-xs text-stone leading-relaxed">
              地方を選択すると
              <br />
              都道府県別の品目数を表示します
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
