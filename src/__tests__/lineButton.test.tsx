import { render, screen, fireEvent } from "@testing-library/react";
import { CTAButton } from "@/components/CTAButton";
import { StickyLineBar } from "@/components/StickyLineBar";
import { trackLineClick } from "@/lib/analytics";
import { LINE_URL } from "@/lib/constants";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

describe("LINEボタンの計測", () => {
  afterEach(() => {
    delete (window as GtagWindow).gtag;
  });

  it("CTAButton を押すと line_click が置き場所つきで送られる", () => {
    const gtag = jest.fn();
    (window as GtagWindow).gtag = gtag;
    render(<CTAButton place="hero" />);
    const link = screen.getByRole("link", { name: "LINEで無料相談する" });
    expect(link).toHaveAttribute("href", LINE_URL);
    expect(link).toHaveAttribute("target", "_blank");
    fireEvent.click(link);
    expect(gtag).toHaveBeenCalledWith("event", "line_click", { place: "hero" });
  });

  it("記事の slug も送られる", () => {
    const gtag = jest.fn();
    (window as GtagWindow).gtag = gtag;
    render(<CTAButton place="article_end" slug="shinjin-shonichi" />);
    fireEvent.click(screen.getByRole("link"));
    expect(gtag).toHaveBeenCalledWith("event", "line_click", {
      place: "article_end",
      slug: "shinjin-shonichi",
    });
  });

  it("gtag が無くても例外を出さない", () => {
    expect(() => trackLineClick("header")).not.toThrow();
  });
});

describe("StickyLineBar", () => {
  it("LINEボタンと補足を出す", () => {
    render(<StickyLineBar />);
    expect(screen.getByRole("link", { name: "LINEで無料相談" })).toHaveAttribute("href", LINE_URL);
    expect(screen.getByText("50分・オンライン")).toBeInTheDocument();
  });
});
