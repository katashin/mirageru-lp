import path from "path";
import { render, screen, fireEvent } from "@testing-library/react";
import { getAllNotes, getNote, type Note } from "@/lib/note";
import { NoteIndex } from "@/components/note/NoteIndex";
import { NoteArticle } from "@/components/note/NoteArticle";

const dir = path.join(__dirname, "../fixtures/note");
const published = getAllNotes({ dir, includeDrafts: false });
const full = getNote("shinjin-shonichi", { dir, includeDrafts: true }) as Note;

describe("記事の一覧", () => {
  it("記事が0件なら準備中と出す", () => {
    render(<NoteIndex notes={[]} />);
    expect(screen.getByText("最初の記事を準備中です")).toBeInTheDocument();
  });

  it("いちばん新しい記事を大きく、残りを行で出す", () => {
    render(<NoteIndex notes={published} />);
    const links = screen.getAllByRole("link").filter((a) => a.getAttribute("href")?.startsWith("/note/"));
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
      "/note/manual-koushin",
      "/note/shinjin-shonichi",
    ]);
  });

  it("記事のあるテーマだけを出し、押すと絞りこむ", () => {
    render(<NoteIndex notes={published} />);
    expect(screen.queryByRole("button", { name: "作業割当" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "マニュアル" }));
    const links = screen.getAllByRole("link").filter((a) => a.getAttribute("href")?.startsWith("/note/"));
    expect(links.map((a) => a.getAttribute("href"))).toEqual(["/note/manual-koushin"]);
  });
});

describe("記事のページ", () => {
  it("部品が設計の順に並ぶ", () => {
    const { container } = render(<NoteArticle note={full} related={[published[0]]} />);
    const order = [
      screen.getByRole("heading", { level: 1 }),
      screen.getByText(/元ニトリ店長/),
      screen.getByText("この記事の要点"),
      screen.getByRole("navigation", { name: "目次" }),
      screen.getByText("あなたのお店は、あてはまりますか？"),
      container.querySelector("h2#s1") as HTMLElement,
      screen.getByText("参考にした資料"),
      screen.getByText(full.endCta),
      screen.getByText("あわせて読みたい"),
    ];
    for (let i = 1; i < order.length; i++) {
      expect(order[i - 1].compareDocumentPosition(order[i]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

});

describe("下書きの印", () => {
  it("下書きの記事には一覧と記事に「下書き」の印が出る", () => {
    const draft = getNote("shitagaki", { dir, includeDrafts: true }) as Note;
    render(<NoteIndex notes={[draft]} />);
    expect(screen.getByText("下書き")).toBeInTheDocument();
  });

  it("公開の記事には出ない", () => {
    render(<NoteArticle note={full} related={[]} />);
    expect(screen.queryByText("下書き")).toBeNull();
  });
});
