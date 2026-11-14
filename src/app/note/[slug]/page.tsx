import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { NoteArticle } from "@/components/note/NoteArticle";
import { getAllNotes, getNote, getRelatedNotes, showDrafts } from "@/lib/note";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes({ includeDrafts: showDrafts() }).map((n) => ({ slug: n.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug, { includeDrafts: showDrafts() });
  if (!note) return {};
  return {
    title: `${note.title}｜現場ノート｜ミラゲル`,
    description: note.description,
    alternates: { canonical: `/note/${note.slug}` },
    robots: note.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title: note.title,
      description: note.description,
      type: "article",
      locale: "ja_JP",
      publishedTime: note.date,
      modifiedTime: note.updated ?? note.date,
    },
    twitter: { card: "summary_large_image", title: note.title, description: note.description },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const pool = getAllNotes({ includeDrafts: showDrafts() });
  const note = pool.find((n) => n.slug === slug);
  if (!note) notFound();
  const related = getRelatedNotes(note, 3, pool);
  return (
    <>
      <Navbar />
      <main>
        <NoteArticle note={note} related={related} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd(note), breadcrumbJsonLd(note)]),
        }}
      />
    </>
  );
}
