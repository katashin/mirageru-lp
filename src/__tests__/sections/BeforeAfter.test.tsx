import { render, screen } from "@testing-library/react";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { BEFORE_AFTER } from "@/lib/constants";

describe("BeforeAfter", () => {
  it("レンダリングされる", () => {
    render(<BeforeAfter />);
  });

  it("セクション見出しが表示される", () => {
    render(<BeforeAfter />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("Beforeの全アイテムが表示される", () => {
    render(<BeforeAfter />);
    BEFORE_AFTER.before.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("Afterの全アイテムが表示される", () => {
    render(<BeforeAfter />);
    BEFORE_AFTER.after.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("キャッチフレーズが表示される", () => {
    render(<BeforeAfter />);
    expect(screen.getByText(BEFORE_AFTER.catchPhrase)).toBeInTheDocument();
  });
});
