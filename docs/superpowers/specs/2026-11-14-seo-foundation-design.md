# SEOの土台の修正（2026-11-14）

ブログ記事を始める前の土台づくり。進める順番は「土台 → デザイン → SEO → 記事の流れ」で、これはその1番目。

## なぜ
- サイトマップ・robots・JSON-LD に、存在しない住所 `https://mirageru-lp.mirageru.com` が入っている（DNSで引けない）。本当の住所は `https://lp.mirageru.com`
- このままでは記事を増やしても Google にページの場所が正しく伝わらない
- JSON-LD の `sameAs` が `https://twitter.com/mirageru` で、オーナーのXアカウント（@coach_katayama）ではない

## やること
- `src/lib/constants.ts` に `SITE_URL = "https://lp.mirageru.com"` と `X_URL = "https://x.com/coach_katayama"` を置き、住所はここからだけ使う
- `src/app/sitemap.ts`・`src/app/robots.ts`・`src/app/layout.tsx`（JSON-LD）の住所を `SITE_URL` に置きかえる
- `layout.tsx` の metadata に `metadataBase: new URL(SITE_URL)` と `alternates.canonical: "/"` を足す（あとで記事ページが増えても、各ページの正式な住所が出せるように）
- `sameAs` を `X_URL` にする

## やらないこと
- 見出し・文章・見た目は変えない（デザインの回で考える）
- このMacの git の設定は変えない。GitHub への送信は、そのときだけ `gh` の認証を使う（`git -c credential.helper=... push https://...`）

## 方法の比較
- A（採用）：住所を constants.ts の1か所にまとめて、各ファイルから使う。今後の記事ページでも同じ住所を使える
- B：各ファイルの文字だけ書きかえる。早いが、また別の住所が混ざるおそれがある

## 公開まで
1. 手元で直し、テストとビルドを通す
2. 手元で `/sitemap.xml`・`/robots.txt`・ページのJSON-LDとcanonicalを確かめる
3. オーナーの確認
4. OKなら main に入れて GitHub に送る → Vercel が自動で公開
5. 公開後、オーナーが Search Console でサイトマップを出し直す

## 分かっていないこと
- Vercel に公開先が2つ（`mirageru-lp`・`mirageru-lp-bs4y`）ある。どちらに lp.mirageru.com が付いているかは Vercel の画面で確認が必要。今回の修正はどちらにも同じく届く
