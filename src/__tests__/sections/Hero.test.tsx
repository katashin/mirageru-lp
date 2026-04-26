import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("レンダリングされる", () => {
    render(<Hero />);
  });

  it("メインキャッチコピーが表示される", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("CTAボタンが表示される", () => {
    render(<Hero />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
