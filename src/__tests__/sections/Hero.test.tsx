import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";
import { CAREER_SHORT, LINE_NOTE } from "@/lib/constants";

describe("Hero", () => {
  it("だれ向けかを出す", () => {
    render(<Hero />);
    expect(screen.getByText("スタッフ3〜20名の店舗オーナーへ")).toBeInTheDocument();
  });

  it("見出しは「自分がいないと回らない」を仕組みで卒業する", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "「自分がいないと回らない」を、仕組みで卒業する。"
    );
  });

  it("右側は「今 → 仕組みのあと」の絵。写真と経歴は出さない", () => {
    render(<Hero />);
    expect(screen.getByText("今")).toBeInTheDocument();
    expect(screen.getByText("仕組みのあと")).toBeInTheDocument();
    expect(screen.queryByAltText("片山 真介")).toBeNull();
    expect(screen.queryByText(CAREER_SHORT)).toBeNull();
  });

  it("5ステップをアイコンつきでチラ見せし、くわしい所へ飛べる", () => {
    render(<Hero />);
    ["見える化", "課題の特定", "マニュアル", "作業割当", "1on1"].forEach((t) =>
      expect(screen.getByText(t)).toBeInTheDocument()
    );
    expect(screen.getByRole("link", { name: /くわしく見る/ })).toHaveAttribute("href", "/#step-method");
  });

  it("LINEボタンと補足を出す", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "LINEで無料相談する" })).toBeInTheDocument();
    expect(screen.getByText(LINE_NOTE)).toBeInTheDocument();
  });

});
