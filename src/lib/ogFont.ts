/** Google Fonts の CSS から、Satori が読める形式（truetype / opentype）のフォントの URL だけを取る */
export function pickFontUrl(css: string): string | null {
  const m = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"](truetype|opentype)['"]\)/);
  return m ? m[1] : null;
}

/** 画像に出す文字だけを含む Noto Sans JP（太字）を取る。8秒で取れなければ諦める */
export async function loadOgFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&text=${encodeURIComponent(text)}`,
        { signal: AbortSignal.timeout(8000) }
      )
    ).text();
    const url = pickFontUrl(css);
    if (!url) return null;
    return await (await fetch(url, { signal: AbortSignal.timeout(8000) })).arrayBuffer();
  } catch {
    return null;
  }
}
