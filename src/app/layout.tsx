import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";

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

export const metadata: Metadata = {
  title: "MiraGeru — 属人化をゼロに、利益が残る組織へ",
  description:
    "「自分がいないと現場が回らない」という呪縛を解き、リーダー不在でも成長し続ける組織へ。標準化プロジェクトの伴走支援から、後任育成までを完遂します。",
  openGraph: {
    title: "MiraGeru — 属人化をゼロに、利益が残る組織へ",
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
      className={`${inter.variable} ${notoSansJP.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
