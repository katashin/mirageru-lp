import { extractHeadings, type Note } from "@/lib/note";
import { NoteHeader } from "./NoteHeader";
import { Byline } from "./Byline";
import { Summary } from "./Summary";
import { Toc } from "./Toc";
import { Checklist } from "./Checklist";
import { NoteBody } from "./NoteBody";
import { Sources } from "./Sources";
import { EndCta } from "./EndCta";
import { RelatedNotes } from "./RelatedNotes";
import { StickyLineBar } from "@/components/StickyLineBar";

export function NoteArticle({ note, related }: { note: Note; related: Note[] }) {
  return (
    <article className="bg-white pb-24 md:pb-12">
      <NoteHeader note={note} />
      <div className="mx-auto flex max-w-3xl flex-col gap-7 px-5 py-8 md:px-8">
        <Byline note={note} />
        <Summary items={note.summary} />
        <Toc headings={extractHeadings(note.body)} />
        <Checklist items={note.checklist} slug={note.slug} />
        <NoteBody body={note.body} />
        <Sources sources={note.sources} />
        <EndCta note={note} />
        <RelatedNotes notes={related} />
      </div>
      <StickyLineBar slug={note.slug} />
    </article>
  );
}
