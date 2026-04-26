"use client";

import { motion } from "framer-motion";
import { LINE_URL } from "@/lib/constants";

interface CTAButtonProps {
  label?: string;
  className?: string;
}

export function CTAButton({
  label = "LINEで無料相談する",
  className = "",
}: CTAButtonProps) {
  return (
    <motion.a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#169db2] px-8 py-4 text-base font-bold text-white transition-shadow ${className}`}
      whileHover={{
        boxShadow: "0 0 24px 6px rgba(22,157,178,0.35)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.a>
  );
}
