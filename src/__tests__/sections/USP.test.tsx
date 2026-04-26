import { render, screen } from "@testing-library/react";
import { USP } from "@/components/sections/USP";
import { USP as USP_DATA } from "@/lib/constants";

describe("USP", () => {
  it("レンダリングされる", () => {
    render(<USP />);
  });

  it("セクション見出しが表示される", () => {
    render(<USP />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("リード文が表示される", () => {
    render(<USP />);
    const elements = screen.getAllByText(/この2つが掛け合わさることで/);
    expect(elements.length).toBeGreaterThan(0);
  });

  it("業務標準化のタイトルが表示される", () => {
    render(<USP />);
    expect(screen.getByText(USP_DATA.standardization.title)).toBeInTheDocument();
  });

  it("リーダー育成のタイトルが表示される", () => {
    render(<USP />);
    expect(screen.getByText(USP_DATA.leadership.title)).toBeInTheDocument();
  });

  it("標準化の全アイテムが表示される", () => {
    render(<USP />);
    USP_DATA.standardization.items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("リーダー育成の全アイテムが表示される", () => {
    render(<USP />);
    USP_DATA.leadership.items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
