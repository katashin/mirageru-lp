"use client";

import { m } from "framer-motion";
import { LINE_URL, COLORS } from "@/lib/constants";
import { trackLineClick, type LinePlace } from "@/lib/analytics";

interface CTAButtonProps {
  place: LinePlace;
  /** 飛び先。省略すると会社向けの LINE */
  href?: string;
  label?: string;
  slug?: string;
  /** line：LINEの緑（会社向け）／navy：紺（カタリアイ）／light：紺の面の上に置く白 */
  tone?: "line" | "navy" | "light";
  className?: string;
}

const TONES = {
  line: { bg: COLORS.line, fg: "#FFFFFF", glow: "0 0 20px 4px rgba(6,199,85,0.3)" },
  navy: { bg: "#1E2A44", fg: "#FFFFFF", glow: "0 0 20px 4px rgba(30,42,68,0.25)" },
  light: { bg: "#FFFFFF", fg: "#1E2A44", glow: "0 0 20px 4px rgba(255,255,255,0.25)" },
} as const;

export function CTAButton({
  place,
  href = LINE_URL,
  label = "LINEで無料相談する",
  slug,
  tone = "line",
  className = "",
}: CTAButtonProps) {
  const t = TONES[tone];
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLineClick(place, slug)}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-shadow ${className}`}
      style={{ backgroundColor: t.bg, color: t.fg }}
      whileHover={{ boxShadow: t.glow }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </m.a>
  );
}
