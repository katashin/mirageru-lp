import { pickFontUrl } from "@/lib/ogFont";

describe("サムネイル用のフォント（点検の指摘）", () => {
  it("truetype / opentype の URL だけを使う", () => {
    expect(pickFontUrl("src: url(https://f/a.ttf) format('truetype');")).toBe("https://f/a.ttf");
    expect(pickFontUrl("src: url(https://f/a.otf) format('opentype');")).toBe("https://f/a.otf");
  });

  it("woff2 しか無いときは使わない（Satori が読めずビルドが落ちるため）", () => {
    expect(pickFontUrl("src: url(https://f/a.woff2) format('woff2');")).toBeNull();
  });
});
