import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E2E8F0] bg-white py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-8">
        <Image
          src="/images/logo-light.png"
          alt={SITE_NAME}
          width={96}
          height={62}
          className="h-8 w-auto"
        />
        <p className="text-xs text-[#94A3B8]">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
