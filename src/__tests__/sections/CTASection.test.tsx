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

  it("メールアプリで開くリンクが、mailto で控えめに出る", () => {
    render(<CTASection />);
    expect(screen.getByRole("link", { name: /メールアプリで開く/ })).toHaveAttribute(
      "href",
      "mailto:shinsuke.katayama@mirageru.com"
    );
    expect(screen.queryByText("メールで問い合わせる")).toBeNull();
  });

  it("3ステップが全て表示される", () => {
    render(<CTASection />);
    CTA_STEPS.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });
});

import { fireEvent, act } from "@testing-library/react";
import { EMAIL_ADDRESS } from "@/lib/constants";

describe("メールアドレスのコピー", () => {
  it("アドレスとコピーは1つの枠（ボタン）にまとまっている", () => {
    render(<CTASection />);
    const box = screen.getByRole("button", { name: /アドレスをコピー/ });
    expect(box).toHaveTextContent(EMAIL_ADDRESS);
  });

  const orig = navigator.clipboard;
  afterEach(() => {
    Object.defineProperty(navigator, "clipboard", { value: orig, configurable: true });
  });

  it("「アドレスをコピー」を押すとアドレスがコピーされ、コピーしましたと出る", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    render(<CTASection />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /アドレスをコピー/ }));
    });
    expect(writeText).toHaveBeenCalledWith(EMAIL_ADDRESS);
    expect(screen.getByText("コピーしました")).toBeInTheDocument();
  });

  it("コピーができない環境でも止まらず、アドレスを選んだ状態にする", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: jest.fn().mockRejectedValue(new Error("denied")) },
      configurable: true,
    });
    render(<CTASection />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /アドレスをコピー/ }));
    });
    expect(window.getSelection()?.toString()).toBe(EMAIL_ADDRESS);
  });
});
