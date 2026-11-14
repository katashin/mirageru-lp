import { render, screen, fireEvent, act } from "@testing-library/react";
import { ShareButtons, shareLinks } from "@/components/note/ShareButtons";
import { NoteArticle } from "@/components/note/NoteArticle";
import { getNote, type Note } from "@/lib/note";
import path from "path";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

const URL_ = "https://lp.mirageru.com/note/manual-naze";
const TITLE = "スタッフがマニュアルを守らないのは「なぜ」が書いていないから";

describe("SNS で共有するボタン", () => {
  afterEach(() => {
    delete (window as GtagWindow).gtag;
  });

  it("共有の住所：X は題名と記事の住所と @coach_katayama、Facebook と LinkedIn は記事の住所", () => {
    const l = shareLinks(URL_, TITLE);
    const x = new URL(l.x);
    expect(x.origin + x.pathname).toBe("https://x.com/intent/post");
    expect(x.searchParams.get("text")).toBe(TITLE);
    expect(x.searchParams.get("url")).toBe(URL_);
    expect(x.searchParams.get("via")).toBe("coach_katayama");
    expect(l.facebook).toBe(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(URL_)}`);
    expect(l.linkedin).toBe(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL_)}`);
  });

  it("3つのボタンは新しいタブで開き、押すと GA4 に share が送られる", () => {
    const gtag = jest.fn();
    (window as GtagWindow).gtag = gtag;
    render(<ShareButtons url={URL_} title={TITLE} slug="manual-naze" />);
    const x = screen.getByRole("link", { name: "Xでポストする" });
    ["Facebookでシェアする", "LinkedInでシェアする"].forEach((n) =>
      expect(screen.getByRole("link", { name: n })).toHaveAttribute("target", "_blank")
    );
    expect(x).toHaveAttribute("rel", expect.stringContaining("noopener"));
    fireEvent.click(x);
    expect(gtag).toHaveBeenCalledWith("event", "share", { method: "x", content_type: "note", item_id: "manual-naze" });
  });

  it("リンクをコピーできる", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<ShareButtons url={URL_} title={TITLE} slug="manual-naze" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "リンクをコピー" }));
    });
    expect(writeText).toHaveBeenCalledWith(URL_);
    expect(screen.getByRole("button", { name: "コピーしました" })).toBeInTheDocument();
  });

  it("記事ページの本文のあとに、記事の住所で共有ボタンが出る", () => {
    const note = getNote("shinjin-shonichi", {
      dir: path.join(__dirname, "../fixtures/note"),
      includeDrafts: true,
    }) as Note;
    render(<NoteArticle note={note} related={[]} />);
    expect(screen.getByText("この記事をシェアする")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Facebookでシェアする" })).toHaveAttribute(
      "href",
      expect.stringContaining(encodeURIComponent("https://lp.mirageru.com/note/shinjin-shonichi"))
    );
  });
});

describe("SNS のカードの設定（OGP）", () => {
  it("記事の住所・サイト名・大きい画像のカードを指定する", async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { generateMetadata } = require("@/app/note/[slug]/page");
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "shinjin-shonichi" }) });
    expect(meta.openGraph.url).toBe("https://lp.mirageru.com/note/shinjin-shonichi");
    expect(meta.openGraph.siteName).toBe("ミラゲル");
    expect(meta.twitter.card).toBe("summary_large_image");
  });
});
