const regions = [
  {
    name: "有田焼",
    area: "佐賀県有田町",
    description: "白磁に鮮やかな絵付けが特徴。400年以上の歴史を持つ日本を代表する磁器。",
  },
  {
    name: "備前焼",
    area: "岡山県備前市",
    description: "釉薬を使わず、土と炎だけで生まれる素朴で力強い焼き締めの器。",
  },
  {
    name: "信楽焼",
    area: "滋賀県甲賀市",
    description: "温かみのある土の風合いが魅力。たぬきの置物でも広く知られる。",
  },
  {
    name: "益子焼",
    area: "栃木県益子町",
    description: "厚手で素朴な味わいが特徴。民藝運動とともに発展した実用の美。",
  },
  {
    name: "萩焼",
    area: "山口県萩市",
    description: "柔らかな色合いと「萩の七化け」と呼ばれる経年変化が愛される茶陶。",
  },
  {
    name: "九谷焼",
    area: "石川県加賀市",
    description: "大胆な構図と鮮やかな五彩が特徴の、華やかで格調高い色絵磁器。",
  },
];

const artists = [
  {
    name: "山田 宗一郎",
    region: "備前焼",
    style: "伝統技法を守りながら現代の食卓に寄り添う器を制作",
    career: "陶歴35年",
  },
  {
    name: "佐藤 美咲",
    region: "有田焼",
    style: "繊細な染付と現代的なフォルムを融合した作品が人気",
    career: "陶歴12年",
  },
  {
    name: "田中 悠介",
    region: "信楽焼",
    style: "薪窯にこだわり、自然釉の偶然の美を追求する若手作家",
    career: "陶歴8年",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-stone-light/40 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold tracking-wide text-indigo">
            やきものポータル
          </h1>
          <nav className="hidden md:flex items-center gap-8 text-sm text-warm-gray">
            <a href="#regions" className="hover:text-indigo transition-colors">
              産地から探す
            </a>
            <a href="#artists" className="hover:text-indigo transition-colors">
              作家紹介
            </a>
            <a href="#about" className="hover:text-indigo transition-colors">
              このサイトについて
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="text-sm font-medium tracking-widest text-stone uppercase mb-4">
            日本の伝統工芸
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground mb-6">
            土と炎が紡ぐ、
            <br />
            日本のやきもの。
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-warm-gray mb-10">
            全国各地の陶芸作家・窯元を紹介するポータルサイトです。
            産地の歴史、作家の想い、器の魅力をお届けします。
          </p>
          <div className="flex gap-4">
            <a
              href="#regions"
              className="inline-block rounded-md bg-indigo px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-light"
            >
              産地から探す
            </a>
            <a
              href="#artists"
              className="inline-block rounded-md border border-stone-light px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white"
            >
              作家を見る
            </a>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section id="regions" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12">
          <p className="text-sm font-medium tracking-widest text-stone uppercase mb-2">
            Regions
          </p>
          <h2 className="text-3xl font-bold text-foreground">産地から探す</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region) => (
            <article
              key={region.name}
              className="group rounded-lg border border-stone-light/30 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-indigo mb-1 group-hover:text-indigo-light transition-colors">
                {region.name}
              </h3>
              <p className="text-xs text-stone mb-3">{region.area}</p>
              <p className="text-sm leading-relaxed text-warm-gray">
                {region.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Artists */}
      <section id="artists" className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12">
            <p className="text-sm font-medium tracking-widest text-stone uppercase mb-2">
              Artists
            </p>
            <h2 className="text-3xl font-bold text-foreground">注目の作家</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <article
                key={artist.name}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-light/30 text-2xl font-bold text-indigo">
                  {artist.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {artist.name}
                </h3>
                <p className="text-xs font-medium text-indigo mb-1">
                  {artist.region}
                </p>
                <p className="text-xs text-stone mb-3">{artist.career}</p>
                <p className="text-sm leading-relaxed text-warm-gray">
                  {artist.style}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t border-stone-light/40 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="md:flex md:items-start md:justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-lg font-bold text-indigo mb-2">
                やきものポータル
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-warm-gray">
                日本全国の陶芸作家・窯元の魅力を発信するポータルサイトです。
                伝統と革新が息づくやきものの世界をお楽しみください。
              </p>
            </div>
            <nav className="flex gap-8 text-sm text-warm-gray">
              <div className="flex flex-col gap-2">
                <span className="font-medium text-foreground">コンテンツ</span>
                <a href="#regions" className="hover:text-indigo transition-colors">
                  産地から探す
                </a>
                <a href="#artists" className="hover:text-indigo transition-colors">
                  作家紹介
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-foreground">サイト情報</span>
                <span>お問い合わせ</span>
                <span>利用規約</span>
              </div>
            </nav>
          </div>
          <div className="mt-10 border-t border-stone-light/30 pt-6 text-center text-xs text-stone">
            &copy; 2026 やきものポータル
          </div>
        </div>
      </footer>
    </div>
  );
}
