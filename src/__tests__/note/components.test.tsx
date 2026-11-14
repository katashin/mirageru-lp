import path from "path";
import { render, screen } from "@testing-library/react";
import { getNote, extractHeadings, type Note } from "@/lib/note";
import { NoteHeader } from "@/components/note/NoteHeader";
import { Byline } from "@/components/note/Byline";
import { Summary } from "@/components/note/Summary";
import { Toc } from "@/components/note/Toc";
import { Checklist } from "@/components/note/Checklist";
import { NoteBody } from "@/components/note/NoteBody";
import { Sources } from "@/components/note/Sources";
import { EndCta } from "@/components/note/EndCta";
import { RelatedNotes } from "@/components/note/RelatedNotes";
import { BYLINE } from "@/lib/constants";

const dir = path.join(__dirname, "../fixtures/note");
const full = getNote("shinjin-shonichi", { dir, includeDrafts: true }) as Note;
const thin = getNote("manual-koushin", { dir, includeDrafts: true }) as Note;

describe("記事ページの部品", () => {
  it("NoteHeader に通し番号・テーマ・題名・副題", () => {
    render(<NoteHeader note={full} />);
    expect(screen.getByText("現場ノート No.01 ・ スタッフ育成")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(full.title);
    expect(screen.getByText(full.subtitle)).toBeInTheDocument();
  });

  it("Byline に書いた人と読む時間", () => {
    render(<Byline note={full} />);
    expect(screen.getByText(BYLINE)).toBeInTheDocument();
    expect(screen.getByText(/5分で読めます/)).toBeInTheDocument();
  });

  it("Summary は番号つきで要点を出す", () => {
    render(<Summary items={full.summary} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("この記事の要点")).toBeInTheDocument();
  });

  it("Checklist は空なら何も出さない", () => {
    const { container } = render(<Checklist items={[]} slug="x" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("Checklist のあとに軽い相談の案内", () => {
    render(<Checklist items={full.checklist} slug={full.slug} />);
    expect(screen.getByText(full.checklist[0])).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /無料相談で一緒に整理できます/ })).toBeInTheDocument();
  });

  it("Sources は空なら何も出さない", () => {
    const { container } = render(<Sources sources={thin.sources} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("Sources は出どころをリンクで出す", () => {
    render(<Sources sources={full.sources} />);
    expect(screen.getByRole("link", { name: full.sources[0].label })).toHaveAttribute(
      "href",
      full.sources[0].url
    );
  });

  it("EndCta に一言と LINE ボタン", () => {
    render(<EndCta note={full} />);
    expect(screen.getByText(full.endCta)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LINEで無料相談する" })).toBeInTheDocument();
  });

  it("目次の id と本文の見出しの id がそろう", () => {
    const heads = extractHeadings(full.body);
    expect(heads).toEqual([{ id: "s1", text: "手順1 教育係を決める" }]);
    const { container } = render(<NoteBody body={full.body} />);
    expect(container.querySelector("h2")?.id).toBe("s1");
  });

  it("Toc は見出しへのリンクを出す。見出しが無ければ何も出さない", () => {
    render(<Toc headings={extractHeadings(full.body)} />);
    expect(screen.getByRole("link", { name: "手順1 教育係を決める" })).toHaveAttribute("href", "#s1");
    const { container } = render(<Toc headings={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("NoteBody は表を table で出す", () => {
    const { container } = render(<NoteBody body={full.body} />);
    expect(container.querySelector("table")).not.toBeNull();
  });

  it("RelatedNotes は記事へのリンク。空なら何も出さない", () => {
    render(<RelatedNotes notes={[thin]} />);
    expect(screen.getByRole("link", { name: new RegExp(thin.title) })).toHaveAttribute(
      "href",
      "/note/manual-koushin"
    );
    const { container } = render(<RelatedNotes notes={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("目次と見出しの id（点検の指摘）", () => {
  const body = [
    "## 新人の**初日**に",
    "本文",
    "```",
    "## これはコードの中",
    "```",
    "## 同じ見出し",
    "## 同じ見出し",
  ].join("\n");

  it("太字の見出しでも目次の文字に ** が残らない。コードの中は数えない", () => {
    expect(extractHeadings(body)).toEqual([
      { id: "s1", text: "新人の初日に" },
      { id: "s2", text: "同じ見出し" },
      { id: "s3", text: "同じ見出し" },
    ]);
  });

  it("本文の h2 は出てきた順に s1, s2, s3", () => {
    const { container } = render(<NoteBody body={body} />);
    expect([...container.querySelectorAll("h2")].map((h) => h.id)).toEqual(["s1", "s2", "s3"]);
  });
});

import { NoteCardRow } from "@/components/note/NoteCard";

describe("小さなカードのサムネイル（オーナーの依頼）", () => {
  it("サムネイルの中に通し番号とテーマを出す", () => {
    const { container } = render(<NoteCardRow note={full} />);
    const thumb = container.querySelector('[data-testid="note-thumb"]') as HTMLElement;
    expect(thumb).toHaveTextContent("No.01");
    expect(thumb).toHaveTextContent("スタッフ育成");
    expect(thumb.querySelector("svg")).not.toBeNull();
  });
});
