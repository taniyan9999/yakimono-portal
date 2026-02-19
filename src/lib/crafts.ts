export type Craft = {
  id: string;
  name: string;
  name_kana: string;
  prefecture: string;
  city: string;
  category: string;
  description: string;
  designated_year: number | null;
  image_url: string | null;
};

export const categoryMeta: Record<
  string,
  { en: string; icon: string; gradient: string; accent: string }
> = {
  織物: { en: "Woven textiles", icon: "織", gradient: "from-amber-700 to-amber-900", accent: "bg-amber-800" },
  染色品: { en: "Dyed textiles", icon: "染", gradient: "from-rose-700 to-rose-900", accent: "bg-rose-800" },
  その他繊維製品: { en: "Other textiles", icon: "繊", gradient: "from-orange-700 to-orange-900", accent: "bg-orange-800" },
  陶磁器: { en: "Ceramics", icon: "陶", gradient: "from-stone-600 to-stone-800", accent: "bg-stone-700" },
  漆器: { en: "Lacquerware", icon: "漆", gradient: "from-red-800 to-red-950", accent: "bg-red-900" },
  "木工品・竹工品": { en: "Wood & Bamboo", icon: "木", gradient: "from-emerald-800 to-emerald-950", accent: "bg-emerald-800" },
  金工品: { en: "Metalwork", icon: "金", gradient: "from-zinc-600 to-zinc-800", accent: "bg-zinc-700" },
  "仏壇・仏具": { en: "Buddhist altars", icon: "仏", gradient: "from-yellow-800 to-yellow-950", accent: "bg-yellow-900" },
  和紙: { en: "Washi paper", icon: "紙", gradient: "from-sky-700 to-sky-900", accent: "bg-sky-800" },
  文具: { en: "Writing tools", icon: "文", gradient: "from-indigo-700 to-indigo-900", accent: "bg-indigo-800" },
  石工品: { en: "Stonework", icon: "石", gradient: "from-gray-600 to-gray-800", accent: "bg-gray-700" },
  貴石細工: { en: "Gemstone craft", icon: "玉", gradient: "from-purple-700 to-purple-900", accent: "bg-purple-800" },
  "人形・こけし": { en: "Dolls & Kokeshi", icon: "人", gradient: "from-pink-700 to-pink-900", accent: "bg-pink-800" },
  その他の工芸品: { en: "Other crafts", icon: "工", gradient: "from-teal-700 to-teal-900", accent: "bg-teal-800" },
  "工芸材料・工芸用具": { en: "Craft materials", icon: "材", gradient: "from-lime-800 to-lime-950", accent: "bg-lime-900" },
};

export const categoryOrder = Object.keys(categoryMeta);

export const defaultMeta = { en: "Crafts", icon: "工", gradient: "from-stone-600 to-stone-800", accent: "bg-stone-700" };

export const areaRegions: { name: string; slug: string; prefectures: string[] }[] = [
  { name: "北海道・東北", slug: "tohoku", prefectures: ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"] },
  { name: "関東", slug: "kanto", prefectures: ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"] },
  { name: "北陸・甲信越", slug: "hokuriku", prefectures: ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県"] },
  { name: "東海", slug: "tokai", prefectures: ["岐阜県", "静岡県", "愛知県", "三重県"] },
  { name: "近畿", slug: "kinki", prefectures: ["滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"] },
  { name: "中国", slug: "chugoku", prefectures: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"] },
  { name: "四国", slug: "shikoku", prefectures: ["徳島県", "香川県", "愛媛県", "高知県"] },
  { name: "九州・沖縄", slug: "kyushu", prefectures: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"] },
];
