/**
 * Unsplash 画像URL ヘルパー。
 * 将来オリジナル写真に差し替える際は、この関数の実装のみ変更すればよい。
 */
export function unsplashUrl(
  photoId: string,
  options: { w?: number; h?: number; q?: number } = {},
): string {
  const { w = 800, q = 80 } = options;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: String(q),
  });
  return `https://images.unsplash.com/${photoId}?${params.toString()}`;
}
