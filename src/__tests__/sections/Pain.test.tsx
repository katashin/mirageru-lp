import { render, screen } from "@testing-library/react";
import { Pain } from "@/components/sections/Pain";
import { PAIN_ITEMS } from "@/lib/constants";

describe("Pain", () => {
  it("レンダリングされる", () => {
    render(<Pain />);
  });

  it("セクション見出しが表示される", () => {
    render(<Pain />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("全Painアイテムが表示される", () => {
    render(<Pain />);
    PAIN_ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
});
