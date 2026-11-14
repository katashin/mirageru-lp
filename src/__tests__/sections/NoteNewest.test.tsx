import path from "path";
import { render, screen } from "@testing-library/react";
import { getAllNotes } from "@/lib/note";
import { NoteNewest } from "@/components/sections/NoteNewest";

const notes = getAllNotes({ dir: path.join(__dirname, "../fixtures/note"), includeDrafts: false });

describe("NoteNewest", () => {
  it("記事が0件なら何も出さない", () => {
    const { container } = render(<NoteNewest notes={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("新着の記事と「すべて見る」へのリンク", () => {
    render(<NoteNewest notes={notes} />);
    expect(screen.getByText("現場ノート 新着")).toBeInTheDocument();
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/note", "/note/manual-koushin", "/note/shinjin-shonichi"]);
  });

  it("3本までしか出さない", () => {
    const many = [...notes, ...notes].map((n, i) => ({ ...n, slug: `${n.slug}-${i}` }));
    render(<NoteNewest notes={many} />);
    expect(screen.getAllByRole("link").filter((a) => a.getAttribute("href") !== "/note")).toHaveLength(3);
  });
});
