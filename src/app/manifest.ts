import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KOGEI PORTAL — 日本の伝統工芸品データベース",
    short_name: "KOGEI PORTAL",
    description:
      "日本全国244品目の伝統的工芸品を紹介するポータルサイト。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a1612",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
