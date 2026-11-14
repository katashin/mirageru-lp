"use client";

import { m } from "framer-motion";
import { LINE_URL, COLORS } from "@/lib/constants";
import { trackLineClick, type LinePlace } from "@/lib/analytics";

interface CTAButtonProps {
  place: LinePlace;
  label?: string;
  slug?: string;
  className?: string;
}

export function CTAButton({
  place,
  label = "LINEで無料相談する",
  slug,
  className = "",
}: CTAButtonProps) {
  return (
    <m.a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLineClick(place, slug)}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-shadow ${className}`}
      style={{ backgroundColor: COLORS.line }}
      whileHover={{ boxShadow: "0 0 20px 4px rgba(6,199,85,0.3)" }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </m.a>
  );
}
