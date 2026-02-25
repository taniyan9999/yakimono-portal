export const SITE_URL = "https://yakimono-portal.vercel.app";
export const SITE_NAME = "KOGEI PORTAL";
export const SITE_DESCRIPTION =
  "日本全国244品目の伝統的工芸品を紹介するポータルサイト。陶磁器、織物、漆器、金工品など15カテゴリの工芸品の歴史・技法・職人の物語を発信します。";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.svg`;

export function canonical(path: string): string {
  return `${SITE_URL}${path}`;
}
