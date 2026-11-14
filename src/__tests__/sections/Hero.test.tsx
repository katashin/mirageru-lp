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

  it("写真と経歴を出す", () => {
    render(<Hero />);
    expect(screen.getByAltText("片山 真介")).toBeInTheDocument();
    expect(screen.getByText(CAREER_SHORT)).toBeInTheDocument();
  });

  it("LINEボタンと補足を出す", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "LINEで無料相談する" })).toBeInTheDocument();
    expect(screen.getByText(LINE_NOTE)).toBeInTheDocument();
  });

  it("残りの強み2つを短く出し、紺のパネルは出さない", () => {
    render(<Hero />);
    expect(screen.getByText("御社専用の仕組みを、ゼロから一緒につくる")).toBeInTheDocument();
    expect(screen.getByText("現場に定着するまで、一緒に動ききる")).toBeInTheDocument();
    expect(screen.queryByText("なぜ ミラゲル か")).toBeNull();
  });
});
