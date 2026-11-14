import { ImageResponse } from "next/og";
import { loadOgFont } from "@/lib/ogFont";

/** SNS 用の画像の大きさ（X・Facebook・LinkedIn がすすめる 1.91:1） */
export const OG_SIZE = { width: 1200, height: 630 };

type OgCard = {
  /** 上の小さい文字（例：現場ノート No.01 ・ スタッフ育成） */
  label: string;
  /** 大きい題名。「\n」の所で改行する（言葉の途中で切れないように） */
  title: string;
  /** 題名の下の一文（なくてもよい） */
  subtitle?: string;
  /** 左下の文字（既定はミラゲル） */
  footer?: string;
};

/** 長い題名でも 1200×630 からはみ出さないよう、字数で文字の大きさを下げる */
export function ogTitleSize(title: string): number {
  const n = title.replace(/\n/g, "").length;
  return n > 44 ? 50 : n > 34 ? 56 : 64;
}

/** 現場ノートと同じ、紺の方眼の SNS 用の画像をつくる */
export async function renderOgCard({ label, title, subtitle = "", footer = "ミラゲル" }: OgCard) {
  const font = await loadOgFont(`${label}${title.replace(/\n/g, "")}${subtitle}${footer}`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0F172A",
          backgroundImage:
            "linear-gradient(rgba(22,157,178,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(22,157,178,.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          color: "#ffffff",
          fontFamily: font ? "NotoSansJP" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#6fd6e6", letterSpacing: 1 }}>{label}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: ogTitleSize(title), fontWeight: 900, lineHeight: 1.3 }}>
            {title.split("\n").map((line) => (
              <div key={line} style={{ display: "flex" }}>{line}</div>
            ))}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 34, color: "rgba(255,255,255,.82)" }}>{subtitle}</div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30 }}>
          <div style={{ display: "flex", width: 18, height: 18, borderRadius: 9, backgroundColor: "#169db2" }} />
          {footer}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: font ? [{ name: "NotoSansJP", data: font, weight: 900, style: "normal" }] : [],
    }
  );
}
