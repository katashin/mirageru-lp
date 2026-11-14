"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

/** だれ向けのタブを見ているか */
export type Audience = "business" | "katariai";

export const AUDIENCE_TABS_ID = "audience-tabs";
const KATARIAI_HASH = "#katariai";
// replaceState では hashchange が起きないので、自分で知らせる
const CHANGE_EVENT = "audiencechange";

type AudienceValue = {
  audience: Audience;
  select: (audience: Audience, opts?: { scroll?: boolean }) => void;
};

// provider が無いページ（現場ノートなど）では、いつも会社向け
const AudienceCtx = createContext<AudienceValue>({ audience: "business", select: () => {} });

// タブの状態は住所の末尾が決める：#katariai なら個人向け、それ以外（#pain など）は会社向け
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}
const getSnapshot = (): Audience => (window.location.hash === KATARIAI_HASH ? "katariai" : "business");
// サーバーでつくる HTML は会社向け
const getServerSnapshot = (): Audience => "business";

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const audience = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const select = useCallback((next: Audience, opts?: { scroll?: boolean }) => {
    const url = window.location.pathname + window.location.search + (next === "katariai" ? KATARIAI_HASH : "");
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    if (opts?.scroll) {
      document.getElementById(AUDIENCE_TABS_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return <AudienceCtx.Provider value={{ audience, select }}>{children}</AudienceCtx.Provider>;
}

export function useAudience(): AudienceValue {
  return useContext(AudienceCtx);
}
