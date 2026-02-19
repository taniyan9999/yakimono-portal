type Props = {
  craftName: string;
};

const ecSites = [
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
];

export default function ECLinks({ craftName }: Props) {
  const query = encodeURIComponent(craftName);

  return (
    <div className="rounded-lg border border-stone-light/20 bg-cream p-6">
      <p className="text-sm font-bold text-foreground mb-1">
        {craftName}を購入する
      </p>
      <p className="text-xs text-warm-gray mb-4">
        ECサイトで商品を探す（外部サイトに遷移します）
      </p>
      <div className="flex flex-wrap gap-3">
        {ecSites.map((site) => (
          <a
            key={site.name}
            href={`${site.baseUrl}${query}`}
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
        ))}
      </div>
    </div>
  );
}
