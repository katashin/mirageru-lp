import { render, screen, fireEvent, act } from "@testing-library/react";
import { AudienceProvider } from "@/components/audience/AudienceContext";
import { AudienceTabs } from "@/components/sections/AudienceTabs";
import { AudienceGate } from "@/components/sections/AudienceGate";

function Page() {
  return (
    <AudienceProvider>
      <AudienceGate />
      <AudienceTabs business={<p>会社向けの中身</p>} katariai={<p>カタリアイの中身</p>} />
    </AudienceProvider>
  );
}

const panelOf = (text: string) => screen.getByText(text).closest('[role="tabpanel"]');

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  Element.prototype.scrollIntoView = jest.fn();
});

describe("タブ", () => {
  it("最初は会社向けのタブ。個人向けの中身も HTML には残る（隠すだけ）", () => {
    render(<Page />);
    expect(screen.getByRole("tab", { name: "店舗・会社の方" })).toHaveAttribute("aria-selected", "true");
    expect(panelOf("会社向けの中身")).not.toHaveAttribute("hidden");
    expect(panelOf("カタリアイの中身")).toHaveAttribute("hidden");
  });

  it("住所の末尾が #katariai なら、最初から個人向けのタブ", () => {
    window.history.replaceState(null, "", "/#katariai");
    render(<Page />);
    expect(screen.getByRole("tab", { name: "管理職・個人の方" })).toHaveAttribute("aria-selected", "true");
    expect(panelOf("会社向けの中身")).toHaveAttribute("hidden");
  });

  it("#pain など会社向けのページ内リンクでは、会社向けのまま", () => {
    window.history.replaceState(null, "", "/#pain");
    render(<Page />);
    expect(screen.getByRole("tab", { name: "店舗・会社の方" })).toHaveAttribute("aria-selected", "true");
  });

  it("タブを押すと切り替わり、住所の末尾も変わる", () => {
    render(<Page />);
    fireEvent.click(screen.getByRole("tab", { name: "管理職・個人の方" }));
    expect(panelOf("カタリアイの中身")).not.toHaveAttribute("hidden");
    expect(window.location.hash).toBe("#katariai");
    fireEvent.click(screen.getByRole("tab", { name: "店舗・会社の方" }));
    expect(panelOf("会社向けの中身")).not.toHaveAttribute("hidden");
    expect(window.location.hash).toBe("");
  });

  it("あとから住所の末尾が #katariai に変わっても切り替わる（フッターのリンクなど）", () => {
    render(<Page />);
    act(() => {
      window.history.replaceState(null, "", "/#katariai");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(panelOf("カタリアイの中身")).not.toHaveAttribute("hidden");
  });
});

describe("入口", () => {
  it("2つの入口があり、カタリアイを押すと個人向けのタブを開いてタブの位置まで動く", () => {
    render(<Page />);
    fireEvent.click(screen.getByRole("button", { name: /カタリアイ/ }));
    expect(screen.getByRole("tab", { name: "管理職・個人の方" })).toHaveAttribute("aria-selected", "true");
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /仕組みづくり/ }));
    expect(screen.getByRole("tab", { name: "店舗・会社の方" })).toHaveAttribute("aria-selected", "true");
  });

  it("入口の見出しは h1 にしない（h1 は会社向けのトップのまま）", () => {
    render(<Page />);
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
  });
});
