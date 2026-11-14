import { OG_SIZE, renderOgCard } from "@/lib/ogCard";

// LP のトップ（lp.mirageru.com）を SNS に貼ったときの画像
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ミラゲル｜店舗の標準化とリーダー育成の伴走支援";

export default async function Image() {
  return renderOgCard({
    label: "ミラゲル ・ ニトリ15年・120名をマネジメントした元店長",
    title: "「自分がいないと回らない」を、\n仕組みで卒業する。",
    subtitle: "店舗の標準化とリーダー育成／管理職の語り合い「カタリアイ」",
  });
}
