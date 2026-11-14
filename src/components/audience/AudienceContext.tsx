"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/** だれ向けのタブを見ているか */
export type Audience = "business" | "katariai";

export const AUDIENCE_TABS_ID = "audience-tabs";
const KATARIAI_HASH = "#katariai";

type AudienceValue = {
  audience: Audience;
  select: (audience: Audience, opts?: { scroll?: boolean }) => void;
};

// provider が無いページ（現場ノートなど）では、いつも会社向け
const AudienceCtx = createContext<AudienceValue>({ audience: "business", select: () => {} });

const fromHash = (): Audience =>
  typeof window !== "undefined" && window.location.hash === KATARIAI_HASH ? "katariai" : "business";

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  // 最初の表示は会社向け（サーバーでつくるHTMLと合わせる）。住所の末尾はこのあと読む
  const [audience, setAudience] = useState<Audience>("business");

  useEffect(() => {
    const sync = () => {
      // 会社向けのページ内リンク（#pain など）では、今のタブを変えない
      if (window.location.hash === KATARIAI_HASH) setAudience("katariai");
    };
    setAudience(fromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const select = useCallback((next: Audience, opts?: { scroll?: boolean }) => {
    setAudience(next);
    const url = window.location.pathname + window.location.search + (next === "katariai" ? KATARIAI_HASH : "");
    window.history.replaceState(null, "", url);
    if (opts?.scroll) {
      document.getElementById(AUDIENCE_TABS_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return <AudienceCtx.Provider value={{ audience, select }}>{children}</AudienceCtx.Provider>;
}

export function useAudience(): AudienceValue {
  return useContext(AudienceCtx);
}
