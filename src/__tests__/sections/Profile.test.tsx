import { render, screen } from "@testing-library/react";
import { Profile } from "@/components/sections/Profile";
import { REPRESENTATIVE_NAME } from "@/lib/constants";

describe("Profile", () => {
  it("レンダリングされる", () => {
    render(<Profile />);
  });

  it("代表者名が表示される", () => {
    render(<Profile />);
    expect(screen.getByText(REPRESENTATIVE_NAME)).toBeInTheDocument();
  });

  it("プロフィール画像のalt属性が設定されている", () => {
    render(<Profile />);
    const img = screen.getByAltText(`${REPRESENTATIVE_NAME}のプロフィール写真`);
    expect(img).toBeInTheDocument();
  });
});
