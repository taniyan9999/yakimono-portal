export type Work = {
  name: string;
  image: string;
};

export type ArtistLinks = {
  website?: string;
  instagram?: string;
  shop?: string;
  email?: string;
};

export type Artist = {
  slug: string;
  name: string;
  nameReading?: string;
  nameEnglish?: string;
  title?: string;
  birthYear?: number;
  regionSlug: string;
  regionName: string;
  prefecture?: string;
  city?: string;
  style: string;
  career: string;
  bio: string;
  philosophy?: string;
  techniques?: string[];
  workCategories?: string[];
  links?: ArtistLinks;
  craftsmanQuote?: {
    text: string;
    context?: string;
  };
  works: Work[];
};

export const artists: Artist[] = [
  {
    slug: "yamada-soichiro",
    name: "山田 宗一郎",
    regionSlug: "bizen",
    regionName: "備前焼",
    style: "伝統技法を守りながら現代の食卓に寄り添う器を制作",
    career: "陶歴35年",
    bio: "1965年岡山県備前市生まれ。高校卒業後、人間国宝・山本陶秀に師事。伝統的な備前焼の技法を忠実に継承しつつ、現代の暮らしに馴染む器づくりを目指す。薪窯での焼成にこだわり、土と炎の対話から生まれる自然の景色を大切にしている。",
    works: [
      { name: "窯変花入", image: "/works/yamada-01.jpg" },
      { name: "緋襷茶碗", image: "/works/yamada-02.jpg" },
      { name: "胡麻徳利", image: "/works/yamada-03.jpg" },
      { name: "桟切皿", image: "/works/yamada-04.jpg" },
    ],
  },
  {
    slug: "sato-misaki",
    name: "佐藤 美咲",
    regionSlug: "arita",
    regionName: "有田焼",
    style: "繊細な染付と現代的なフォルムを融合した作品が人気",
    career: "陶歴12年",
    bio: "1990年佐賀県有田町生まれ。有田窯業大学校を卒業後、家業の窯元で修行。伝統的な染付の技法をベースに、現代の食卓に映える洗練されたデザインを追求。若い世代にも有田焼の魅力を届けたいという思いで制作を続けている。",
    works: [
      { name: "染付花文カップ", image: "/works/sato-01.jpg" },
      { name: "白磁角皿", image: "/works/sato-02.jpg" },
      { name: "染付そば猪口", image: "/works/sato-03.jpg" },
      { name: "色絵小鉢", image: "/works/sato-04.jpg" },
    ],
  },
  {
    slug: "tanaka-yusuke",
    name: "田中 悠介",
    regionSlug: "shigaraki",
    regionName: "信楽焼",
    style: "薪窯にこだわり、自然釉の偶然の美を追求する若手作家",
    career: "陶歴8年",
    bio: "1995年東京都生まれ。大学で彫刻を学んだ後、信楽の魅力に惹かれて移住。地元の陶芸家に師事し、独立。自ら築いた小さな穴窯で、3日3晩薪をくべ続ける焼成を行う。土と炎が織りなす予測不能な美しさを追い求めている。",
    works: [
      { name: "自然釉花器", image: "/works/tanaka-01.jpg" },
      { name: "焦げ茶碗", image: "/works/tanaka-02.jpg" },
      { name: "灰被り壺", image: "/works/tanaka-03.jpg" },
      { name: "火色ぐい呑", image: "/works/tanaka-04.jpg" },
    ],
  },
  {
    slug: "tanimoto-yoh",
    name: "谷本 洋",
    nameReading: "たにもと よう",
    nameEnglish: "Yoh Tanimoto",
    title: "伊賀焼陶芸家",
    birthYear: 1958,
    regionSlug: "iga",
    regionName: "伊賀焼",
    prefecture: "三重県",
    city: "伊賀市",
    style: "古伊賀の伝統を踏まえつつ、パリで学んだ絵画・現代美術の感性を融合。「今の時代の必然性」を器に宿す作陶を追求する。",
    career: "陶歴40年以上",
    bio: `1958年、伊賀焼陶芸作家・谷本光生と服飾デザイナーの母のもとに生まれる。幼少のころから伊賀焼に接し、伊賀・京都にて陶技を学ぶ（京都府立工業試験場修了）。

1982年より個展・グループ展にて作品発表を始める。1984年に渡仏し、パリ・グランシュミエールにてデッサン・油絵を学ぶ。スペインの造形作家J.G.アルチガスの助手を務め、パリ郊外にアトリエを設け作陶を始める。

1988年に独立し、伊賀焼・谷本洋陶房を開く。以降、日本橋三越をはじめとする全国の主要百貨店やギャラリーにて個展を多数開催。アルチガス財団にてスペインの陶芸家を対象にセミナーを開催し、毎年バルセロナにて制作を行う。

伊賀焼を世界に広めるため、海外にて展覧会・セミナー・ワークショップ・ギャラリートークを精力的に開催している。`,
    philosophy: `伊賀の土は、数百万年前の琵琶湖の記憶を抱いている。
鉄分が少なく白い土は、高温の炎に耐え、降りかかる灰が深い緑のビードロとなる。
古伊賀の写しではなく、今の時代の必然性を器に宿すこと。
作品作りとは、自分作りにある——
伊賀の伝統とパリで出会った現代美術の感性を、一つの器の中で対話させ続けている。`,
    techniques: [
      "穴窯焼成",
      "登窯焼成",
      "自然釉（ビードロ）",
      "伊賀土による成形",
      "線刻模様",
    ],
    workCategories: [
      "花入",
      "水指",
      "茶碗",
      "ぐい呑",
      "徳利",
      "酒器",
      "皿",
      "壺",
      "大鉢",
    ],
    links: {
      website: "https://www.yohtanimoto.com/",
      instagram: "https://www.instagram.com/yohtanimoto/",
      shop: "https://yohtanimoto.thebase.in",
    },
    craftsmanQuote: {
      text: "古伊賀の素晴らしい作品の写しではなく、今の時代の必然性を意識し、格調高い作品を作りたいと日々考え、作陶しています。",
      context: "作陶への想い",
    },
    works: [
      { name: "伊賀花入", image: "/works/tanimoto-01.jpg" },
      { name: "伊賀水指", image: "/works/tanimoto-02.jpg" },
      { name: "伊賀茶碗", image: "/works/tanimoto-03.jpg" },
      { name: "伊賀ぐい呑", image: "/works/tanimoto-04.jpg" },
    ],
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getArtistsByRegion(regionSlug: string): Artist[] {
  return artists.filter((a) => a.regionSlug === regionSlug);
}
