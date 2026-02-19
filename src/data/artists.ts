export type Work = {
  name: string;
  image: string;
};

export type Artist = {
  slug: string;
  name: string;
  regionSlug: string;
  regionName: string;
  style: string;
  career: string;
  bio: string;
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
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getArtistsByRegion(regionSlug: string): Artist[] {
  return artists.filter((a) => a.regionSlug === regionSlug);
}
