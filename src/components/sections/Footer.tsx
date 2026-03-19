import { LINE_URL, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E2E8F0] bg-white py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-8">
        <span className="text-sm font-bold text-[#0F172A]">{SITE_NAME}</span>
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#64748B] underline-offset-2 transition-colors hover:text-[#169db2] hover:underline"
        >
          LINE公式アカウント
        </a>
        <p className="text-xs text-[#94A3B8]">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
