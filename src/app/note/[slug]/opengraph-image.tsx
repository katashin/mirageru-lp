import { ImageResponse } from "next/og";
import { getAllNotes, getNote, showDrafts } from "@/lib/note";
import { loadOgFont } from "@/lib/ogFont";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "現場ノート";

export function generateStaticParams() {
  return getAllNotes({ includeDrafts: showDrafts() }).map((n) => ({ slug: n.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug, { includeDrafts: showDrafts() });
  const label = note ? `現場ノート No.${String(note.no).padStart(2, "0")} ・ ${note.theme}` : "現場ノート";
  const title = note?.title ?? "現場ノート";
  const subtitle = note?.subtitle ?? "";
  const font = await loadOgFont(`${label}${title}${subtitle}ミラゲル`);

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
          <div style={{ display: "flex", fontSize: 64, fontWeight: 900, lineHeight: 1.3 }}>{title}</div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 34, color: "rgba(255,255,255,.82)" }}>{subtitle}</div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30 }}>
          <div style={{ display: "flex", width: 18, height: 18, borderRadius: 9, backgroundColor: "#169db2" }} />
          ミラゲル
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "NotoSansJP", data: font, weight: 900, style: "normal" }] : [],
    }
  );
}
