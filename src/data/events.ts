export type CraftEvent = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  prefecture: string;
  city: string;
  venue: string;
  category: "陶器市" | "展示会" | "体験" | "祭り";
  relatedCraft: string;
  url?: string;
};

export const eventCategoryColors: Record<string, { label: string; color: string }> = {
  陶器市: { label: "陶器市", color: "bg-amber-900/15 text-amber-800" },
  展示会: { label: "展示会", color: "bg-indigo/10 text-indigo" },
  体験: { label: "体験", color: "bg-emerald-900/15 text-emerald-800" },
  祭り: { label: "祭り", color: "bg-rose-900/15 text-rose-800" },
};

export const events: CraftEvent[] = [
  {
    id: "e001",
    name: "有田陶器市",
    description:
      "日本最大の陶器市。有田町の約4kmのメイン通り沿いに500以上の店舗が並び、毎年約120万人が訪れる。通常価格より2〜5割引きで有田焼を購入できる。",
    startDate: "2026-04-29",
    endDate: "2026-05-05",
    prefecture: "佐賀県",
    city: "有田町",
    venue: "有田町内各所",
    category: "陶器市",
    relatedCraft: "有田焼",
  },
  {
    id: "e002",
    name: "益子陶器市（春）",
    description:
      "栃木県益子町で開催される関東最大級の陶器市。約60万人が訪れ、約500のテントで益子焼をはじめとする全国の陶磁器が販売される。",
    startDate: "2026-04-25",
    endDate: "2026-05-05",
    prefecture: "栃木県",
    city: "益子町",
    venue: "益子町内各所",
    category: "陶器市",
    relatedCraft: "益子焼",
  },
  {
    id: "e003",
    name: "九谷茶碗まつり",
    description:
      "九谷焼の産地で開催される陶器市。通常価格の2〜5割引きで購入できるほか、絵付け体験やロクロ体験も楽しめる。",
    startDate: "2026-05-03",
    endDate: "2026-05-05",
    prefecture: "石川県",
    city: "能美市",
    venue: "九谷陶芸村",
    category: "陶器市",
    relatedCraft: "九谷焼",
  },
  {
    id: "e004",
    name: "備前焼まつり",
    description:
      "備前焼の里・伊部で開催される秋の一大イベント。窯元や作家が一堂に会し、お値打ち価格で備前焼が購入できる。",
    startDate: "2026-10-17",
    endDate: "2026-10-18",
    prefecture: "岡山県",
    city: "備前市",
    venue: "伊部駅周辺",
    category: "陶器市",
    relatedCraft: "備前焼",
  },
  {
    id: "e005",
    name: "信楽陶器まつり",
    description:
      "たぬきの置物で有名な信楽焼の産地で開催される陶器市。窯元巡りや陶芸体験も楽しめる。",
    startDate: "2026-10-10",
    endDate: "2026-10-12",
    prefecture: "滋賀県",
    city: "甲賀市",
    venue: "信楽町内各所",
    category: "陶器市",
    relatedCraft: "信楽焼",
  },
  {
    id: "e006",
    name: "日本伝統工芸展",
    description:
      "人間国宝から新進気鋭の作家まで、日本の工芸の最高峰が集結する年一回の公募展。陶芸・染織・漆芸・金工・木竹工・人形・諸工芸の7部門。",
    startDate: "2026-09-16",
    endDate: "2026-10-05",
    prefecture: "東京都",
    city: "中央区",
    venue: "日本橋三越本店",
    category: "展示会",
    relatedCraft: "各種伝統工芸",
  },
  {
    id: "e007",
    name: "京都・五条坂 陶器まつり",
    description:
      "清水焼の窯元が集まる五条坂で毎年8月に開催される陶器市。約400の露店が並び、京焼・清水焼を中心とした器が手頃な価格で購入できる。",
    startDate: "2026-08-07",
    endDate: "2026-08-10",
    prefecture: "京都府",
    city: "京都市",
    venue: "五条坂（東大路通〜川端通）",
    category: "陶器市",
    relatedCraft: "京焼・清水焼",
  },
  {
    id: "e008",
    name: "波佐見陶器まつり",
    description:
      "長崎県波佐見町で開催される陶器市。モダンなデザインで人気の波佐見焼を産地価格で購入できる。",
    startDate: "2026-04-29",
    endDate: "2026-05-05",
    prefecture: "長崎県",
    city: "波佐見町",
    venue: "波佐見町内各所",
    category: "陶器市",
    relatedCraft: "波佐見焼",
  },
  {
    id: "e009",
    name: "輪島大祭",
    description:
      "輪島塗の産地・輪島で開催される夏祭り。キリコ灯籠が町を練り歩く勇壮な祭りで、漆器の展示即売も行われる。",
    startDate: "2026-08-22",
    endDate: "2026-08-25",
    prefecture: "石川県",
    city: "輪島市",
    venue: "輪島市内各所",
    category: "祭り",
    relatedCraft: "輪島塗",
  },
  {
    id: "e010",
    name: "伊賀焼陶器まつり",
    description:
      "三重県伊賀市で開催される秋の陶器市。土鍋の産地として知られる伊賀焼を、窯元直売価格で購入できる。",
    startDate: "2026-10-24",
    endDate: "2026-10-25",
    prefecture: "三重県",
    city: "伊賀市",
    venue: "新天地商店街周辺",
    category: "陶器市",
    relatedCraft: "伊賀焼",
  },
  {
    id: "e011",
    name: "東京伝統工芸展",
    description:
      "東京の伝統工芸品約40品目が一堂に集結。実演や体験コーナーもあり、職人の技を間近で見ることができる。",
    startDate: "2026-03-14",
    endDate: "2026-03-16",
    prefecture: "東京都",
    city: "新宿区",
    venue: "東京都庁展望室",
    category: "展示会",
    relatedCraft: "江戸切子",
  },
  {
    id: "e012",
    name: "益子陶器市（秋）",
    description:
      "益子陶器市の秋開催。春に比べてやや落ち着いた雰囲気で、ゆっくりと器を選べる。紅葉も楽しめる。",
    startDate: "2026-11-01",
    endDate: "2026-11-03",
    prefecture: "栃木県",
    city: "益子町",
    venue: "益子町内各所",
    category: "陶器市",
    relatedCraft: "益子焼",
  },
];

/** 今月以降のイベントを日付順に返す */
export function getUpcomingEvents(limit?: number): CraftEvent[] {
  const today = new Date().toISOString().split("T")[0];
  const upcoming = events
    .filter((e) => e.endDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  return limit ? upcoming.slice(0, limit) : upcoming;
}

/** 月ごとにイベントをグループ化 */
export function getEventsByMonth(): Record<string, CraftEvent[]> {
  const grouped: Record<string, CraftEvent[]> = {};
  for (const event of events) {
    const month = event.startDate.slice(0, 7); // "2026-04"
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(event);
  }
  return grouped;
}
