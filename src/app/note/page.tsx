import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { NoteIndex } from "@/components/note/NoteIndex";
import { StickyLineBar } from "@/components/StickyLineBar";
import { getAllNotes, showDrafts } from "@/lib/note";

export const metadata: Metadata = {
  title: "現場ノート｜お店の標準化と人づくり｜ミラゲル",
  description:
    "元ニトリ店長が、店舗オーナー・店長に向けて、スタッフ育成・マニュアル・店長の仕事のやり方を、現場の目線で書くノートです。",
  alternates: { canonical: "/note" },
  openGraph: {
    title: "現場ノート｜ミラゲル",
    description: "お店の標準化と人づくりを、元店長の目線で。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function NoteIndexPage() {
  const notes = getAllNotes({ includeDrafts: showDrafts() });
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0">
        <NoteIndex notes={notes} />
      </main>
      <Footer />
      <StickyLineBar />
    </>
  );
}
