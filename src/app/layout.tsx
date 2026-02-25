import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from "@/lib/metadata";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 日本の伝統工芸品データベース`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased`}>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-stone-light/40 bg-white">
            <div className="mx-auto max-w-6xl px-6 py-12">
              <div className="md:flex md:items-start md:justify-between">
                <div className="mb-8 md:mb-0">
                  <Link
                    href="/"
                    className="text-lg font-bold text-indigo mb-2 block"
                  >
                    KOGEI PORTAL
                  </Link>
                  <p className="max-w-sm text-sm leading-relaxed text-warm-gray">
                    日本全国の伝統的工芸品の魅力を発信するポータルサイトです。
                    千年の時を超えて受け継がれる技と物語をお楽しみください。
                  </p>
                </div>
                <nav className="flex gap-8 text-sm text-warm-gray">
                  <div className="flex flex-col gap-2">
                    <span className="font-medium text-foreground">
                      コンテンツ
                    </span>
                    <Link
                      href="/#category"
                      className="hover:text-indigo transition-colors"
                    >
                      工芸品目
                    </Link>
                    <Link
                      href="/#area"
                      className="hover:text-indigo transition-colors"
                    >
                      産地から探す
                    </Link>
                    <Link
                      href="/search"
                      className="hover:text-indigo transition-colors"
                    >
                      検索
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-medium text-foreground">
                      サイト情報
                    </span>
                    <span>お問い合わせ</span>
                    <span>利用規約</span>
                  </div>
                </nav>
              </div>
              <div className="mt-10 border-t border-stone-light/30 pt-6 text-center text-xs text-stone">
                &copy; 2026 KOGEI PORTAL
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
