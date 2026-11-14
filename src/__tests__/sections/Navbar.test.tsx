import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/sections/Navbar";

describe("Navbar", () => {
  it("ページ内リンクは記事のページからでも LP に飛べる形（/#…）", () => {
    render(<Navbar />);
    const inPage = ["課題", "強み", "進め方", "サービス", "プロフィール"].map((t) =>
      screen.getByRole("link", { name: t }).getAttribute("href")
    );
    inPage.forEach((h) => expect(h).toMatch(/^\/#/));
  });

  it("現場ノートへのリンクがある", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "現場ノート" })).toHaveAttribute("href", "/note");
  });

  it("ロゴはトップへ戻る", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "ミラゲル" })).toHaveAttribute("href", "/");
  });
});

import { AudienceProvider } from "@/components/audience/AudienceContext";
import { StickyLineBar } from "@/components/StickyLineBar";
import { Footer } from "@/components/sections/Footer";
import { LINE_URL } from "@/lib/constants";
import { KATARIAI_LINE_URL } from "@/lib/katariai";

describe("タブに合わせて変わるボタン", () => {
  beforeEach(() => window.history.replaceState(null, "", "/"));

  it("タブの無いページ（現場ノートなど）では、会社向けの「無料相談」", () => {
    render(<><Navbar /><StickyLineBar /></>);
    expect(screen.getByRole("link", { name: "無料相談" })).toHaveAttribute("href", LINE_URL);
    expect(screen.getByRole("link", { name: "LINEで無料相談" })).toHaveAttribute("href", LINE_URL);
  });

  it("個人向けのタブでは「無料面談」がカタリアイのLINEへ。会社向けのリンクとLINEは出さない", () => {
    window.history.replaceState(null, "", "/#katariai");
    render(
      <AudienceProvider>
        <Navbar />
        <StickyLineBar />
      </AudienceProvider>
    );
    expect(screen.getByRole("link", { name: "無料面談" })).toHaveAttribute("href", KATARIAI_LINE_URL);
    expect(screen.getByRole("link", { name: "無料面談を申し込む" })).toHaveAttribute("href", KATARIAI_LINE_URL);
    expect(screen.getByText("60分・Google Meet")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "課題" })).toBeNull();
    screen.getAllByRole("link").forEach((a) => expect(a).not.toHaveAttribute("href", LINE_URL));
  });

  it("フッターはロゴと著作権の表示だけ（リンクは置かない）", () => {
    render(<Footer />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    expect(screen.getByAltText("ミラゲル")).toBeInTheDocument();
    expect(screen.getByText(/© \d{4} ミラゲル\. All rights reserved\./)).toBeInTheDocument();
  });
});
