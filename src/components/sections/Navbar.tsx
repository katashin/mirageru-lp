"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LINE_URL, NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      animate={{
        boxShadow: scrolled
          ? "0 1px 12px 0 rgba(0,0,0,0.08)"
          : "0 1px 0 0 rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-8">
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-[#0F172A]"
          style={{ letterSpacing: "-0.02em" }}
        >
          {SITE_NAME}
        </a>

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

        <motion.a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-[#169db2] px-5 py-2 text-sm font-bold text-white"
          whileHover={{ boxShadow: "0 0 16px 4px rgba(22,157,178,0.35)" }}
          whileTap={{ scale: 0.97 }}
        >
          無料相談
        </motion.a>
      </div>
    </motion.header>
  );
}
