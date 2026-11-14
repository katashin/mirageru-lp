import { OG_SIZE, renderOgCard } from "@/lib/ogCard";

// 現場ノートの一覧（/note）を SNS に貼ったときの画像
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "現場ノート｜お店の標準化と人づくり";

export default async function Image() {
  return renderOgCard({
    label: "現場ノート",
    title: "元ニトリ店長が、\n現場で試してきたこと",
    subtitle: "お店の標準化と人づくりを、元店長の目線で。",
  });
}
