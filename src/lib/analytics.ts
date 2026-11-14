export type LinePlace =
  | "hero"
  | "header"
  | "sticky"
  | "article_mid"
  | "article_end"
  | "cta_section"
  | "newest"
  | "katariai_hero"
  | "katariai_end"
  | "katariai_header"
  | "katariai_sticky";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/** LINE ボタンのクリックを GA4 に送る。gtag が無い（広告ブロック等）ときは何もしない */
export function trackLineClick(place: LinePlace, slug?: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", "line_click", slug ? { place, slug } : { place });
  } catch {
    // 計測の失敗でボタンの移動は止めない
  }
}
