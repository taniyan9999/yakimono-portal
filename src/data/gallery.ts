export type GalleryImage = {
  url: string;
  alt: string;
  caption?: string;
};

/**
 * 工芸品名をキーとしたギャラリー画像データ。
 * 今後はSupabase storageからの配信に移行予定。
 * 現状はサンプルとしてUnsplashの画像を使用。
 */
export const galleryImages: Record<string, GalleryImage[]> = {
  備前焼: [
    {
      url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
      alt: "備前焼の花器",
      caption: "窯変による自然な景色が美しい花器",
    },
    {
      url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
      alt: "備前焼の器",
      caption: "素朴な土味を活かした食器",
    },
    {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      alt: "備前焼の壺",
      caption: "胡麻と緋襷の景色が見られる壺",
    },
  ],
  有田焼: [
    {
      url: "https://images.unsplash.com/photo-1664477407933-dd42ed0c6c62?auto=format&fit=crop&w=800&q=80",
      alt: "有田焼の皿",
      caption: "藍の染付が美しい有田焼の皿",
    },
    {
      url: "https://images.unsplash.com/photo-1682159316104-70c98a792e94?auto=format&fit=crop&w=800&q=80",
      alt: "有田焼の茶碗",
      caption: "白磁に繊細な絵付けの茶碗",
    },
  ],
  九谷焼: [
    {
      url: "https://images.unsplash.com/photo-1670672013421-ec17c92a66d8?auto=format&fit=crop&w=800&q=80",
      alt: "九谷焼の色絵皿",
      caption: "五彩の色絵が鮮やかな九谷焼",
    },
  ],
  結城紬: [
    {
      url: "https://images.unsplash.com/photo-1661198979635-1563c2d19196?auto=format&fit=crop&w=800&q=80",
      alt: "結城紬の反物",
      caption: "手つむぎ・手織りの結城紬",
    },
  ],
  伊賀くみひも: [
    {
      url: "https://images.unsplash.com/photo-1680817318163-4f72c021b820?auto=format&fit=crop&w=800&q=80",
      alt: "伊賀くみひもの帯締め",
      caption: "絹糸で組まれた美しい組紐",
    },
  ],
};

export function getGalleryImages(craftName: string): GalleryImage[] {
  return galleryImages[craftName] ?? [];
}
