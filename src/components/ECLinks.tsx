"use client";

import { useState } from "react";

type Props = {
  craftName: string;
};

const tabs = [
  {
    key: "buy",
    label: "手に入れる",
    sites: [
      {
        name: "楽天市場",
        baseUrl: "https://search.rakuten.co.jp/search/mall/",
        icon: "R",
        color: "bg-red-600",
      },
      {
        name: "Amazon",
        baseUrl: "https://www.amazon.co.jp/s?k=",
        icon: "A",
        color: "bg-amber-600",
      },
      {
        name: "Yahoo!ショッピング",
        baseUrl: "https://shopping.yahoo.co.jp/search?p=",
        icon: "Y",
        color: "bg-rose-600",
      },
    ],
  },
  {
    key: "visit",
    label: "お店で見る",
    sites: [
      {
        name: "Googleマップで探す",
        baseUrl: "https://www.google.com/maps/search/",
        icon: "G",
        color: "bg-blue-600",
      },
    ],
  },
  {
    key: "experience",
    label: "自分でつくる",
    sites: [
      {
        name: "じゃらん体験",
        baseUrl: "https://www.jalan.net/kankou/spt_guide000/activity/?screenId=OUW3701&keyword=",
        icon: "J",
        color: "bg-orange-500",
      },
      {
        name: "アソビュー",
        baseUrl: "https://www.asoview.com/search/?q=",
        icon: "A",
        color: "bg-teal-600",
      },
    ],
  },
];

export default function ECLinks({ craftName }: Props) {
  const [activeTab, setActiveTab] = useState("buy");
  const query = encodeURIComponent(craftName);
  const currentTab = tabs.find((t) => t.key === activeTab) ?? tabs[0];

  return (
    <div className="rounded-lg border border-stone-light/20 bg-cream p-6">
      <p className="text-sm font-bold text-foreground mb-1">
        {craftName}をもっと楽しむ
      </p>
      <p className="text-xs text-warm-gray mb-4">
        外部サイトに遷移します
      </p>

      {/* タブ */}
      <div className="flex gap-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-foreground text-white"
                : "bg-stone-light/20 text-warm-gray hover:bg-stone-light/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* リンク */}
      <div className="flex flex-wrap gap-3">
        {currentTab.sites.map((site) => {
          const suffix =
            currentTab.key === "visit"
              ? `${craftName}+販売店`
              : currentTab.key === "experience"
                ? `${craftName}+体験`
                : craftName;
          return (
            <a
              key={site.name}
              href={`${site.baseUrl}${encodeURIComponent(suffix)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-light/30 bg-white px-4 py-2 text-xs text-foreground hover:bg-stone-light/10 transition-colors"
            >
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white ${site.color}`}
              >
                {site.icon}
              </span>
              {site.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
