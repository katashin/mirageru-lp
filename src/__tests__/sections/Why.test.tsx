import { render, screen } from "@testing-library/react";
import { Why } from "@/components/sections/Why";
import { WHY_ITEMS } from "@/lib/constants";

describe("Why", () => {
  it("レンダリングされる", () => {
    render(<Why />);
  });

  it("セクション見出しが表示される", () => {
    render(<Why />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("3つの強みが全て表示される", () => {
    render(<Why />);
    WHY_ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
});
