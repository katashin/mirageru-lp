/**
 * @jest-environment node
 */
import { ogTitleSize, OG_SIZE } from "@/lib/ogCard";

describe("SNS 用の画像", () => {
  it("大きさは 1200×630", () => {
    expect(OG_SIZE).toEqual({ width: 1200, height: 630 });
  });

  it("題名が長いほど文字を小さくする", () => {
    expect(ogTitleSize("業務改善の進め方は「全体の地図」から。")).toBe(64);
    expect(ogTitleSize("あ".repeat(40))).toBe(56);
    expect(ogTitleSize("あ".repeat(50))).toBe(50);
  });
});

describe("改行の記号は字数に入れない", () => {
  it("「\\n」があっても同じ大きさ", () => {
    expect(ogTitleSize("あ".repeat(20) + "\n" + "あ".repeat(14))).toBe(64);
  });
});
