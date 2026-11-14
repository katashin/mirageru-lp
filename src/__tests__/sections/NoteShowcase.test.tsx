import path from "path";
import { render, screen } from "@testing-library/react";
import { getAllNotes } from "@/lib/note";
import { NoteShowcase } from "@/components/sections/NoteShowcase";

const notes = getAllNotes({ dir: path.join(__dirname, "../fixtures/note"), includeDrafts: false });
const many = Array.from({ length: 8 }, (_, i) => ({ ...notes[i % notes.length], slug: `kiji-${i + 1}`, no: i + 1 }));

describe("NoteShowcase（「なぜできるのか」の後の現場ノート）", () => {
  it("記事が0件なら欄ごと出さない", () => {
    const { container } = render(<NoteShowcase notes={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("見出しと一言を出す", () => {
    render(<NoteShowcase notes={notes} />);
    expect(screen.getByRole("heading", { name: "現場ノート" })).toBeInTheDocument();
    expect(screen.getByText("元ニトリ店長が、現場で試してきたことを書いています。")).toBeInTheDocument();
  });

  it("記事は新しい順に最大6本、横に並ぶ", () => {
    render(<NoteShowcase notes={many} />);
    const list = screen.getByRole("list", { name: "現場ノートの記事" });
    const hrefs = [...list.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/note/kiji-1", "/note/kiji-2", "/note/kiji-3", "/note/kiji-4", "/note/kiji-5", "/note/kiji-6"]);
  });

  it("すべての記事へのリンク", () => {
    render(<NoteShowcase notes={notes} />);
    expect(screen.getByRole("link", { name: /すべての記事を見る/ })).toHaveAttribute("href", "/note");
  });
});
