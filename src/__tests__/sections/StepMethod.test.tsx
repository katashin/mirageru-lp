import { render, screen } from "@testing-library/react";
import { StepMethod } from "@/components/sections/StepMethod";
import { STEP_ITEMS } from "@/lib/constants";

describe("StepMethod", () => {
  it("レンダリングされる", () => {
    render(<StepMethod />);
  });

  it("セクション見出しが表示される", () => {
    render(<StepMethod />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("5つのステップ名が全て表示される", () => {
    render(<StepMethod />);
    STEP_ITEMS.forEach((item) => {
      expect(screen.getAllByText(item.name).length).toBeGreaterThan(0);
    });
  });

  it("各ステップの成果物が全て表示される", () => {
    render(<StepMethod />);
    STEP_ITEMS.forEach((item) => {
      expect(screen.getAllByText(item.deliverable).length).toBeGreaterThan(0);
    });
  });

  it("成果物の補足メッセージが表示される", () => {
    render(<StepMethod />);
    expect(screen.getByText(/クライアントの資産として残ります/)).toBeInTheDocument();
  });
});
