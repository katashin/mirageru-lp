import { render, screen, within } from "@testing-library/react";
import { Katariai } from "@/components/sections/katariai/Katariai";
import { KATARIAI_LINE_URL } from "@/lib/katariai";

describe("カタリアイ", () => {
  it("LINE の住所は公式LINE（lin.ee/x9hWklGy）", () => {
    expect(KATARIAI_LINE_URL).toBe("https://lin.ee/x9hWklGy");
  });

  it("見出しは「一人で、抱えるな。」", () => {
    render(<Katariai />);
    expect(screen.getByRole("heading", { level: 2, name: /一人で、\s*抱えるな。/ })).toBeInTheDocument();
  });

  it("申込みのボタンはすべてカタリアイのLINEへ。名前は無料面談（60分）", () => {
    render(<Katariai />);
    const links = screen.getAllByRole("link", { name: /無料面談を申し込む（60分）/ });
    expect(links.length).toBeGreaterThanOrEqual(2);
    links.forEach((a) => expect(a).toHaveAttribute("href", KATARIAI_LINE_URL));
  });

  it("3か月後のあなた：4つの姿", () => {
    render(<Katariai />);
    const box = screen.getByRole("complementary", { name: "語り合いの先にある姿" });
    expect(within(box).getAllByRole("listitem")).toHaveLength(4);
    expect(within(box).getByText(/自分の言葉で根拠を言える/)).toBeInTheDocument();
  });

  it("3か月の道すじと、振り返りシートの記入例", () => {
    render(<Katariai />);
    ["言葉にする", "試して、振り返る", "自分の型になる"].forEach((t) =>
      expect(screen.getByText(t)).toBeInTheDocument()
    );
    const table = screen.getByRole("table");
    ["やってみたこと", "気づき", "片山からのひとこと"].forEach((t) =>
      expect(within(table).getByRole("columnheader", { name: t })).toBeInTheDocument()
    );
  });

  it("無料面談の流れは、今のLINEの案内と同じ", () => {
    render(<Katariai />);
    expect(screen.getByRole("heading", { name: "無料面談（60分）の流れ" })).toBeInTheDocument();
    expect(screen.getByText("「無料面談」と送る")).toBeInTheDocument();
    expect(screen.getByText("Google Meetで60分")).toBeInTheDocument();
  });

  it("支援ツール5点セットのプレゼントを案内する", () => {
    render(<Katariai />);
    expect(screen.getAllByText(/管理職のための支援ツール5点セット/).length).toBeGreaterThanOrEqual(1);
  });

  it("実績は120名、写真はプロフィールの写真", () => {
    render(<Katariai />);
    expect(screen.getByText("店長として120名をマネジメント")).toBeInTheDocument();
    expect(screen.getByAltText("片山 真介")).toHaveAttribute("src", expect.stringContaining("/images/profile.png"));
  });

  it("値段は出さない（「円」の字がない）", () => {
    const { container } = render(<Katariai />);
    expect(container.textContent).not.toMatch(/円/);
  });
});
