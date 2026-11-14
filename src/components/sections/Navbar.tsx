"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LINE_URL, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { trackLineClick } from "@/lib/analytics";
import { useAudience } from "@/components/audience/AudienceContext";
import { KATARIAI_LINE_URL } from "@/lib/katariai";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // 個人向けのタブを見ているときは、カタリアイの LINE に切り替える
  const katariai = useAudience().audience === "katariai";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <m.header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      animate={{
        boxShadow: scrolled
          ? "0 1px 12px 0 rgba(0,0,0,0.08)"
          : "0 1px 0 0 rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
        <Link href="/" aria-label={SITE_NAME} className="flex shrink-0 items-center gap-2">
          <Image
            src="/icon.png"
            alt={SITE_NAME}
            width={36}
            height={36}
            className="h-8 w-8 md:h-9 md:w-9"
            priority
          />
          <span className="whitespace-nowrap text-base font-bold text-[#0F172A]">ミラゲル</span>
        </Link>

        {/* 会社向けのページ内リンクは、会社向けのタブのときだけ */}
        {!katariai && (
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.slice(0, -1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#64748B] transition-colors hover:text-[#0F172A]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3 md:gap-4">
        <Link href="/note" className="whitespace-nowrap text-xs font-bold md:text-sm text-[#0e7c8c] transition-colors hover:text-[#0F172A]">
          現場ノート
        </Link>
        <m.a
          href={katariai ? KATARIAI_LINE_URL : LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLineClick(katariai ? "katariai_header" : "header")}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-white md:px-5 ${
            katariai ? "bg-[#1E2A44]" : "bg-[#0e7c8c]"
          }`}
          whileHover={{ boxShadow: "0 0 16px 4px rgba(14,124,140,0.3)" }}
          whileTap={{ scale: 0.97 }}
        >
          {katariai ? "無料面談" : "無料相談"}
        </m.a>
        </div>
      </div>
    </m.header>
  );
}
