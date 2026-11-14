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
