import { render, screen } from "@testing-library/react";
import { WhyStory } from "@/components/sections/WhyStory";
import { WHY_STORY } from "@/lib/constants";

describe("WhyStory", () => {
  it("レンダリングされる", () => {
    render(<WhyStory />);
  });

  it("セクション見出しが表示される", () => {
    render(<WhyStory />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("締めキャッチフレーズが表示される", () => {
    render(<WhyStory />);
    expect(screen.getByText(WHY_STORY.catchPhrase)).toBeInTheDocument();
  });

  it("本文の最初のパラグラフが表示される", () => {
    render(<WhyStory />);
    expect(screen.getByText(WHY_STORY.paragraphs[0])).toBeInTheDocument();
  });
});
