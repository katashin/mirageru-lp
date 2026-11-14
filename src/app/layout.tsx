import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Shippori_Mincho_B1 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { SITE_URL } from "@/lib/constants";
import { jsonLd } from "@/lib/jsonLd";

const GA_ID = "G-BDNEB2NYYD";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "optional",
});

// カタリアイの見出しだけで使う明朝体
const shipporiMincho = Shippori_Mincho_B1({
  variable: "--font-mincho",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "店舗業務標準化・リーダー育成の伴走支援｜MiraGeru LP",
  description:
    "店舗ビジネス・個人事業主の業務標準化とリーダー育成を伴走支援。自分がいなくても回る仕組みを設計し、マニュアル作成から後任育成まで完遂します。",
  openGraph: {
    title: "店舗業務標準化・リーダー育成の伴走支援｜MiraGeru LP",
    description:
      "業務標準化とリーダー育成の伴走支援で、自分がいなくても回る組織へ。",
    locale: "ja_JP",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${shipporiMincho.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
