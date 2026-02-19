export type ShopLocation = {
  name: string;
  type: "headquarters" | "gallery" | "shop";
  postalCode: string;
  address: string;
  tel: string;
  fax?: string;
  description?: string;
  hours?: string;
  closedDays?: string;
  access?: string;
  parking?: string;
  hasDemo: boolean;
  hasExperience: boolean;
};

export type Shop = {
  slug: string;
  name: string;
  formalName: string;
  nameEnglish: string;
  type: "manufacturer" | "retailer" | "both";
  representative: {
    name: string;
    generation: string;
    background?: string;
  };
  prefecture: string;
  city: string;
  craftCategory: string;
  craftName: string;
  description: string;
  philosophy: string;
  locations: ShopLocation[];
  products: {
    traditional: string[];
    modern: string[];
  };
  priceRange: string;
  links: {
    website?: string;
    instagram?: string;
    shop?: string;
  };
  events?: string;
  craftsmanQuote?: {
    text: string;
    speaker: string;
    context?: string;
  };
  keyMembers?: {
    name: string;
    role: string;
    background: string;
    quote?: {
      text: string;
      context?: string;
    };
  }[];
  lineage?: {
    generation: string;
    name: string;
    period?: string;
    description: string;
  }[];
  coverImage: string;
};

export const shops: Shop[] = [
  {
    slug: "kumihimo-hirai",
    name: "くみひも平井",
    formalName: "有限会社 平井兼蔵商店",
    nameEnglish: "Kumihimo Hirai",
    type: "both",
    representative: {
      name: "平井 武央",
      generation: "4代目",
      background:
        "平井兼蔵商店の4代目代表。伝統の粋を和装小物の範囲に止めることなく、ファッションからインテリアまで幅広い領域の中に生かすことを使命とし、研究を続けてきた。古い伝統と新しい感性を融合させ、組機（くみき）による機械組みと手組みの両方を活かしたものづくりを推進。卸専業だった平井兼蔵商店を製造小売へと転換し、伊勢神宮おはらい町への直営店出店を実現した。2016年、映画「君の名は。」の公開による組紐ブームでは、公開からわずか3週間で新商品を企画・発売。それまで組紐に縁のなかった20〜30代の若い男性客が店を訪れるという前例のない現象が起き、「組紐という伝統工芸を若い世代に知ってもらう好機」として積極的に発信を行った。伝統の技術を守りながら時代の追い風を的確に捉え、伊賀くみひもの認知を大きく広げた。",
    },
    prefecture: "三重県",
    city: "伊賀市",
    craftCategory: "その他繊維製品",
    craftName: "伊賀くみひも",
    description: `「伊賀の地で受け継ぐ、伊賀組紐の製造。守り続けてきた技を、現代の暮らしへと結びます」——三重県伊賀市で65年以上にわたり組紐を作り続ける製造元・平井兼蔵商店。伊賀くみひもの伝統的な手組の技法を守りながら、帯締めなどの和装小物からブレスレット、アクセサリー、ストラップまで、現代の暮らしに組紐を届ける商品づくりを行っている。

糸の染色から経尺（へじゃく）、組み上げまで一貫して手作業で行う。組台は丸台・角台・綾竹台・高台の4種を使い分け、100種類以上の組み方から生まれる紐は、手組みならではのしなやかさと絹糸の豊かな色彩を持つ。糸にはシルクに近い風合いと耐久性を兼ね備えた東レのシルック®糸も採用し、日常使いにも適した品質を実現している。

伊勢神宮の参道・おはらい町に直営店「くみひも平井 伊勢内宮前店」を構え、製造元ならではの品揃えと職人による組紐の実演で伊賀くみひもの魅力を発信。全国各地の百貨店催事や職人展にも精力的に出展し、「技を見て、買って、話せる」場を提供している。2021年にはNHK津「まるっと！みえ」にて「叶結び」シリーズが紹介され、メディアでも注目を集めている。`,
    philosophy: `一筋の絹糸を、手が覚えた律動で組み上げていく。
経尺の間は、声すら許されない静寂。
その沈黙の中で数百の糸が交差し、一本の紐になる。
忍者の里が育んだ忍耐と根気、
芭蕉の里が育んだ繊細な感受性——
伊賀くみひもは、この土地の空気そのものを編み込んでいる。`,
    locations: [
      {
        name: "本店（工房）",
        type: "headquarters",
        postalCode: "518-0825",
        address: "三重県伊賀市小田町1441",
        tel: "0595-21-0666",
        fax: "0595-21-9400",
        description: "製造・卸の本拠地。組紐の製作現場。",
        hasDemo: false,
        hasExperience: false,
      },
      {
        name: "くみひも平井展示館",
        type: "gallery",
        postalCode: "518-0825",
        address: "三重県伊賀市小田町1418",
        tel: "0595-24-1561",
        description: "組紐の展示・見学が可能。",
        hasDemo: true,
        hasExperience: false,
      },
      {
        name: "くみひも平井 伊勢内宮前店（おはらい町）",
        type: "shop",
        postalCode: "516-0026",
        address: "三重県伊勢市宇治浦田1-5-6",
        tel: "0596-26-2377",
        description:
          "伊勢神宮内宮の参道「おはらい町」に位置する製造元直営の小売店。もともと卸専業だった平井兼蔵商店が初めて構えた小売店舗で、新商品をいち早く展示・販売している。木造の外観からは組紐のカラフルな色彩が目を引き、江戸時代の小間物屋を思わせる凝った内装が特徴。店内には組紐の丸台・角台をイメージした2つのテーブル台が配置され、職人が実際に組紐を組み上げる実演を間近で見学できる。実際の組台も展示されており、組紐の製作工程を体感できる。帯締め・羽織紐などの和装小物から、ブレスレット、ストラップ、キーホルダー、イヤリング、ネックレス、根付、ポーチまで幅広い品揃え。希望の糸の色で組紐を組んでもらうオーダーにも対応。",
        hours: "9:30〜17:00（季節により変動あり）",
        closedDays: "年中無休",
        access:
          "近鉄「宇治山田駅」から浦田町行きバス約20分「浦田町」下車徒歩3分／伊勢自動車道「伊勢IC」から国道23号で約5分／市営駐車場あり（約1,500台・有料）",
        hasDemo: true,
        hasExperience: false,
      },
    ],
    products: {
      traditional: [
        "帯締め（正絹・小田巻付など）",
        "羽織紐",
        "二分紐・三分紐",
        "帯留（楕円・ガラス玉など）",
        "正絹紐（2mm〜3.8mm・各色）",
      ],
      modern: [
        "ブレスレット（叶結び・本結び・菊結び）",
        "イヤリング・ピアス（軽量で付け心地が良い）",
        "ネックレス・フロッキーペンダント",
        "ヘアアクセサリー（ヘアピン・バレッタ・コットンパール髪ゴム）",
        "ストラップ・キーホルダー（糸に細いチェーンを編み込み光が反射）",
        "たすき掛けストラップ（スマホ・ポーチ用）",
        "お守・厄除キーホルダー（古来の厄除色で身を守る）",
        "干支置物（組紐で作る縁起物）",
        "根付・財布・ポーチ",
        "限定・コラボ商品（本真珠・水晶とのコラボなど）",
      ],
    },
    priceRange: "1,000円以下のキーホルダーから帯締めまで幅広い価格帯",
    links: {
      website: "https://www.dentohirai.com/",
      instagram: "https://www.instagram.com/kumihimo_hirai/",
      shop: "https://store.shopping.yahoo.co.jp/dentohirai/",
    },
    events:
      "全国各地の百貨店催事・職人展に精力的に出展。主な出展先はポートメッセなごや「やきものワールド」、名古屋松坂屋本店「日本の職人展」、仙台夢メッセ「全国やきものフェアinみやぎ」など。各会場では熟練職人による組紐の実演販売を行い、組み上がっていく過程を間近で見学できる。実演を見ながら商品を手に取り、職人と直接会話できる「技を見て、買って、話せる」貴重な機会を提供している。",
    craftsmanQuote: {
      text: "伝統の粋を和装小物の範囲に止めることなく、ファッションからインテリアまで幅広い領域の中に生かすことが使命です。",
      speaker: "平井 武央（代表・4代目）",
      context: "公式サイトより",
    },
    keyMembers: [
      {
        name: "平井 理考",
        role: "次期代表",
        background:
          "福井県高浜町出身。大阪工業大学情報科学科卒業後、システムエンジニアとして約3年勤務。25歳の時、代表・平井武央の娘との結婚を機に平井兼蔵商店に入る。武央から組紐の技法だけでなく「販売」の重要性を厳しく叩き込まれた。毎日が糸との格闘だったという修業時代を経て、「作る」ことと「届ける」ことの両輪で時代に合った商品づくりと販路開拓を推進している。",
        quote: {
          text: "お客様に使っていただかなくては、組紐を守っていけない。時代に合ったものを作り続けていきたい。",
          context: "IT業界から工芸品業界への転身を経て",
        },
      },
    ],
    lineage: [
      {
        generation: "初代",
        name: "平井 兼蔵",
        period: "昭和30年代〜",
        description:
          "平井兼蔵商店の創業者。昭和30年代、戦後の復興とともに着物文化が再び活気を取り戻す中、三重県上野市（現・伊賀市）小田町に組紐の製造卸を興した。明治35年（1902年）に廣澤徳三郎が江戸組紐の技法を伊賀に伝えて以来、農家の副業として広まった組紐づくりを、専業の製造元として確立。帯締めや羽織紐を中心に、京都をはじめとする和装問屋への卸売で事業の基盤を築いた。屋号「平井兼蔵商店」は創業者の名をそのまま冠したもので、以来4代にわたり受け継がれている。",
      },
      {
        generation: "2代目",
        name: "平井 幾太郎",
        description:
          "初代から事業を引き継ぎ、伊賀くみひもの産業としての発展期を支えた。昭和51年（1976年）、伊賀くみひもが通商産業大臣（現・経済産業大臣）より「伝統的工芸品」の指定を受け、翌年には伝統工芸士の認定制度が始まるなど、産地全体が国の認定を得て飛躍する時代に経営を担った。三重県組紐協同組合を通じた産地の連携強化や品質基準の確立にも貢献し、平井兼蔵商店の製品品質と信頼を高めた。",
      },
      {
        generation: "3代目",
        name: "平井 喜八",
        description:
          "和装離れが進み始めた時代に3代目として経営を担う。着物需要の減少という逆風の中、帯締め・羽織紐の高い品質を守り続けながら、卸先との関係を維持し、平井兼蔵商店の伝統技術を次世代へつなぐ役割を果たした。手組みの技法と職人の育成に力を注ぎ、4代目・武央への事業継承を実現した。",
      },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1680817318163-4f72c021b820?auto=format&fit=crop&w=1200&q=80",
  },
];

export function getShopBySlug(slug: string): Shop | undefined {
  return shops.find((s) => s.slug === slug);
}
