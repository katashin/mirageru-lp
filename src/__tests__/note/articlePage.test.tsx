import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

jest.mock("@/lib/note", () => {
  const actual = jest.requireActual("@/lib/note");
  const dir = require("path").join(__dirname, "../fixtures/note");
  return {
    ...actual,
    getAllNotes: (opts: { includeDrafts?: boolean } = {}) => actual.getAllNotes({ ...opts, dir }),
    showDrafts: () => false,
  };
});

import NotePage from "@/app/note/[slug]/page";

describe("記事のページ（ルート）", () => {
  it("記事・フッターのあとにスマホの下の LINE バーがある", async () => {
    const ui = await NotePage({ params: Promise.resolve({ slug: "shinjin-shonichi" }) });
    const { container } = render(ui);
    const bar = screen.getByRole("link", { name: "LINEで無料相談" });
    const footer = container.querySelector("footer") as HTMLElement;
    expect(footer.compareDocumentPosition(bar) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("下書きは本番では 404", async () => {
    await expect(NotePage({ params: Promise.resolve({ slug: "shitagaki" }) })).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
