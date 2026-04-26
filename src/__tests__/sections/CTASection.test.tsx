import { render, screen } from "@testing-library/react";
import { CTASection } from "@/components/sections/CTASection";
import { CTA_STEPS } from "@/lib/constants";

describe("CTASection", () => {
  it("レンダリングされる", () => {
    render(<CTASection />);
  });

  it("LINEのCTAリンクが表示される", () => {
    render(<CTASection />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it("メール問い合わせリンクが表示される", () => {
    render(<CTASection />);
    const emailLink = screen.getByText("メールで問い合わせる");
    expect(emailLink).toBeInTheDocument();
  });

  it("3ステップが全て表示される", () => {
    render(<CTASection />);
    CTA_STEPS.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });
});
