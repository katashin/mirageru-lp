import { COLORS } from "@/lib/constants";

/** 紺の地に青緑の方眼（現場ノートの共通の背景） */
export const gridStyle = {
  backgroundColor: COLORS.navy,
  backgroundImage: `linear-gradient(${COLORS.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.gridLine} 1px, transparent 1px)`,
  backgroundSize: "14px 14px",
} as const;

export function noLabel(no: number): string {
  return `No.${String(no).padStart(2, "0")}`;
}

export function formatDate(d: string): string {
  return d.replaceAll("-", ".");
}
