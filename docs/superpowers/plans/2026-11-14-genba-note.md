# ブログ「現場ノート」 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** LP に `/note`（一覧）と `/note/<slug>`（記事）を足し、LPトップを見本どおりに直し、LINE のクリック計測と記事づくり・SEO見直しのコマンドを用意する。

**Architecture:** 記事は `content/note/*.md`（frontmatter＋Markdown 本文）。`src/lib/note.ts` が読み込み、App Router の静的ページ（`generateStaticParams`）で出す。OGP 画像は記事ごとの `opengraph-image.tsx`（`next/og`）で題名から作る。LINE ボタンは1つの部品に集め、GA4 に `line_click` を送る。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、Tailwind 4、Jest + Testing Library。追加ライブラリは `gray-matter`・`react-markdown`・`remark-gfm` の3つだけ。

**Spec:** `docs/superpowers/specs/2026-11-14-blog-design.md`

## Global Constraints
- 色：青緑 `#169db2`（広い面・大きな強調）、濃い青緑 `#0e7c8c`（青緑のボタン・小さな文字・リンク）、うすい青緑 `#e3f4f6`、紺 `#0F172A`、背景 `#F8FAFC`、LINE `#06c755`（LINEボタンだけ）。`#169db2` の上に白い小さな文字を置かない
- 方眼：紺の地に `rgba(22,157,178,.18)` 1px 線・14px 間隔。通し番号は等幅・`#6fd6e6`
- 文言：LINEボタン「LINEで無料相談する」、補足「50分・オンライン・売り込みはしません」（スマホ下のバーは「LINEで無料相談」「50分・オンライン」）
- 経歴：「ニトリ15年」「店長3店舗」「最大120名」。書いた人の欄「片山 真介（元ニトリ店長・ニトリ15年）」。ニトリ以降の勤務先は出さない
- 住所は `SITE_URL`（`src/lib/constants.ts`）から作る。記事の住所は `/note/<slug>`
- 下書き（`draft: true`）は、本番（`VERCEL_ENV === "production"`）では一覧・サイトマップ・直接の住所のどれにも出さない。Preview と手元では出す（確認のため）
- 既存の Jest 44件とビルドを壊さない。新しいコードは型エラーを出さない（`ignoreBuildErrors` に頼らない。`npx tsc --noEmit` で確認）
- main へのマージと GitHub への送信は、オーナーの確認のあと。送信は `git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push https://github.com/katashin/mirageru-lp.git <branch>`
- LP の「お悩み」以下のセクションの文章は変えない

## Review Focus
- 記事がゼロ件：`/note` は「準備中」の表示で壊れない、LPトップの新着は出ない、サイトマップは `/note` だけ足す → Task 2・4・6 のテスト
- 本番での下書き：`VERCEL_ENV=production` で下書きの slug を開くと 404、一覧とサイトマップにも出ない → Task 2・5 のテスト
- 必須でない項目が空の記事（出どころなし・チェックリストなし・関連記事なし）：その部分だけ出さず、ページは壊れない → Task 3 のテスト
- 日本語の slug や記号：slug は英小文字・数字・ハイフンだけ。それ以外のファイル名は読み込み時にエラーで止める → Task 2 のテスト
- 記事ページから LP のページ内リンク（`#pain` など）を押すと LP の該当箇所に飛ぶ → Task 6 のテスト

---

### Task 1: LINE ボタンの部品と計測、色の決まり

**Files:**
- Modify: `src/lib/constants.ts`（追加：`COLORS`、`CAREER_SHORT = "ニトリ15年・店長3店舗・最大120名のマネジメント"`、`BYLINE = "片山 真介（元ニトリ店長・ニトリ15年）"`、`LINE_NOTE = "50分・オンライン・売り込みはしません"`）
- Create: `src/lib/analytics.ts`
- Modify: `src/components/CTAButton.tsx`（LINE の緑に。`place` を受けて計測）
- Create: `src/components/StickyLineBar.tsx`（スマホ幅だけ画面下に固定）
- Test: `src/__tests__/lineButton.test.tsx`

**Interfaces:**
- Produces: `trackLineClick(place: LinePlace, slug?: string): void`、`type LinePlace = "hero" | "header" | "sticky" | "article_mid" | "article_end" | "cta_section" | "newest"`、`<CTAButton place={LinePlace} label? slug? className? />`、`<StickyLineBar place="sticky" slug? />`

- [ ] **Step 1: 失敗するテスト** — `window.gtag` をモックし、`CTAButton place="hero"` をクリック → `gtag("event","line_click",{place:"hero"})` が呼ばれ、`href` は `LINE_URL`、`target="_blank"`。`window.gtag` が無くても例外を出さない。`StickyLineBar` は「LINEで無料相談」と「50分・オンライン」を出す
- [ ] **Step 2: `npx jest src/__tests__/lineButton.test.tsx` が失敗する**
- [ ] **Step 3: 実装** — ボタン色は `#06c755`。`trackLineClick` は `typeof window.gtag === "function"` のときだけ送る。`StickyLineBar` は `md:hidden`、`padding-bottom` に `env(safe-area-inset-bottom)`
- [ ] **Step 4: `npm test` 全部通る**（既存の Hero・CTASection のテストを含む）
- [ ] **Step 5: Commit** `feat(note): LINEボタンの部品とクリック計測`

### Task 2: 記事のデータの読み込み

**Files:**
- Create: `content/note/.gitkeep`
- Create: `src/lib/note.ts`
- Create: `src/__tests__/fixtures/note/`（テスト用の記事3本：公開2本・下書き1本。うち1本は出どころ・チェックリストなし）
- Test: `src/__tests__/note.test.ts`
- Modify: `package.json`（`gray-matter` を追加）

**Interfaces:**
- Produces:
  ```ts
  type NoteTheme = "スタッフ育成" | "マニュアル" | "店長の仕事" | "作業割当";
  type Note = { no: number; slug: string; title: string; subtitle: string; description: string;
    keyword: string; theme: NoteTheme; date: string; updated?: string; readMinutes: number;
    summary: string[]; checklist: string[]; endCta: string; sources: { label: string; url: string }[];
    xPosts: string[]; draft: boolean; body: string };
  getAllNotes(opts?: { dir?: string; includeDrafts?: boolean }): Note[]  // 新しい順（date 降順、同日は no 降順）
  getNote(slug: string, opts?: { dir?: string; includeDrafts?: boolean }): Note | null
  getRelatedNotes(note: Note, limit?: number): Note[]  // 同じテーマ優先、なければ新しい順、自分は除く
  showDrafts(): boolean  // process.env.VERCEL_ENV !== "production"
  ```
- frontmatter の項目名は `Note` の名前と同じ（`body` 以外）。slug はファイル名（拡張子なし）

- [ ] **Step 1: 失敗するテスト** — fixtures で：`getAllNotes({dir, includeDrafts:false})` は2本・新しい順、`includeDrafts:true` は3本、`getNote("draft-slug",{dir, includeDrafts:false})` は `null`、`getRelatedNotes` は同テーマ優先で自分を含まない、空のフォルダでは `[]`、`Bad_Slug.md` があると「slug は英小文字・数字・ハイフンだけ」というエラー、必須項目（title・date・theme・no）が欠けるとファイル名つきのエラー、`showDrafts()` は `VERCEL_ENV=production` で false・未設定で true
- [ ] **Step 2: 失敗を確認**
- [ ] **Step 3: 実装**（`fs` で `content/note` を読む。サーバー側だけで使う）
- [ ] **Step 4: テストが通る**
- [ ] **Step 5: Commit** `feat(note): 記事データの読み込み`

### Task 3: 記事ページの部品

**Files:**
- Create: `src/components/note/NoteHeader.tsx`（紺×方眼の帯）、`Byline.tsx`、`Summary.tsx`、`Toc.tsx`、`Checklist.tsx`（直後に軽い相談の案内＝`CTAButton` ではなくテキストリンク＋`trackLineClick("article_mid")`）、`NoteBody.tsx`（`react-markdown` + `remark-gfm`、見出しに id、表・番号つきリスト・引用を見本の見た目で）、`Sources.tsx`、`EndCta.tsx`、`RelatedNotes.tsx`、`NoteCard.tsx`（一覧の大カードと行）
- Modify: `package.json`（`react-markdown`・`remark-gfm`）
- Test: `src/__tests__/note/components.test.tsx`

**Interfaces:**
- Consumes: `Note`（Task 2）、`CTAButton`・`trackLineClick`（Task 1）
- Produces: 各部品は `note: Note`（または必要な項目）を受ける。`Toc` は本文の `##` 見出しから作る：`extractHeadings(body: string): { id: string; text: string }[]`（`src/lib/note.ts` に追加、`NoteBody` と同じ id の付け方）

- [ ] **Step 1: 失敗するテスト** — `NoteHeader` に「現場ノート No.01 ・ スタッフ育成」と題名、`Byline` に `BYLINE` と「5分で読めます」、`Summary` に番号つきで3項目、`Checklist` が空なら何も出さない、`Sources` が空なら何も出さない、`EndCta` に `endCta` の一言と LINE ボタン（place `article_end`）、`extractHeadings("## 手順1 書き出す\n本文")` が1件で `NoteBody` の h2 の id と一致、`NoteBody` が表（`|a|b|`）を `<table>` で出す
- [ ] **Step 2: 失敗を確認**
- [ ] **Step 3: 実装**（見た目は Global Constraints の色と方眼。サーバー部品を基本にし、`use client` はクリック計測の部分だけ）
- [ ] **Step 4: テストが通る**
- [ ] **Step 5: Commit** `feat(note): 記事ページの部品`

### Task 4: `/note` と `/note/[slug]` のページ、OGP 画像

**Files:**
- Create: `src/app/note/page.tsx`、`src/app/note/[slug]/page.tsx`、`src/app/note/[slug]/opengraph-image.tsx`、`src/components/note/ThemeFilter.tsx`（`?theme=` で絞る。件数ゼロのテーマは出さない）
- Modify: `src/lib/jsonLd.ts`（追加：`articleJsonLd(note: Note)`、`breadcrumbJsonLd(note: Note)`）
- Test: `src/__tests__/note/pages.test.tsx`、`src/__tests__/seo.test.ts`（追記）

**Interfaces:**
- Consumes: Task 2・3 のすべて
- `[slug]/page.tsx`：`generateStaticParams()` は `getAllNotes({includeDrafts: showDrafts()})` の slug、`dynamicParams = false`、`generateMetadata` は `title: \`${note.title}｜現場ノート｜ミラゲル\``・`description`・`alternates.canonical: \`/note/${slug}\``・`openGraph.type: "article"`。ページに `StickyLineBar`（slug つき）
- `opengraph-image.tsx`：1200×630、紺×方眼、「現場ノート No.○○ ・ テーマ」、題名、副題、「ミラゲル」。日本語フォントは Google Fonts の Noto Sans JP（太字）を読み込んで使う

- [ ] **Step 1: 失敗するテスト** — 記事0件で `/note` に「最初の記事を準備中です」、2件で大カード1＋行1、`?theme=マニュアル` で絞られる、記事ページに部品が上から設計の順（帯→書いた人→要点→目次→チェック→本文→出どころ→最後の案内→関連記事）で並ぶ、`articleJsonLd` の `author["@id"]` が `${SITE_URL}/#person`・`url` が `${SITE_URL}/note/<slug>`、`breadcrumbJsonLd` が3段
- [ ] **Step 2: 失敗を確認**
- [ ] **Step 3: 実装**
- [ ] **Step 4: テストが通る、`npm run build` が通り `/note` と記事が静的に出る（fixtures を一時的に `content/note` に置いて確認し、確認後に戻す）**
- [ ] **Step 5: Commit** `feat(note): 一覧・記事ページとOGP画像`

### Task 5: サイトマップ

**Files:**
- Modify: `src/app/sitemap.ts`
- Test: `src/__tests__/seo.test.ts`（追記）

- [ ] **Step 1: 失敗するテスト** — 記事0件：トップと `${SITE_URL}/note` の2件。公開2本＋下書き1本で `VERCEL_ENV=production`：4件（下書きなし）、各記事の `lastModified` は `updated ?? date`
- [ ] **Step 2: 失敗を確認**
- [ ] **Step 3: 実装**（`getAllNotes({includeDrafts: false})` を使う。サイトマップには Preview でも下書きを出さない）
- [ ] **Step 4: テストが通る**
- [ ] **Step 5: Commit** `feat(note): サイトマップに記事を追加`

### Task 6: LP のトップとヘッダー

**Files:**
- Modify: `src/components/sections/Hero.tsx`（設計 5.4。右の紺のパネルを写真＋経歴のブロックに。残りの2点は写真の下に2行）、`src/components/sections/Navbar.tsx`（ページ内リンクを `/#pain` 形式に、「現場ノート」へのリンクを追加、「無料相談」は濃い青緑・`place="header"`）、`src/lib/constants.ts`（`NAV_LINKS` の href）
- Create: `src/components/sections/NoteNewest.tsx`（新着2〜3本、0件なら `null`）
- Modify: `src/app/page.tsx`（Hero の直後に `NoteNewest`、ページに `StickyLineBar`）、`src/components/sections/CTASection.tsx`（`place="cta_section"`）
- Test: `src/__tests__/sections/Hero.test.tsx`（書き直し）、`src/__tests__/sections/NoteNewest.test.tsx`、`src/__tests__/sections/Navbar.test.tsx`

- [ ] **Step 1: 失敗するテスト** — Hero に「スタッフ3〜20名の店舗オーナーへ」、h1「『自分がいないと回らない』を、仕組みで卒業する。」、`CAREER_SHORT`、`LINE_NOTE`、写真の alt「片山 真介」、LINE ボタン（place `hero`）。NoteNewest は0件で何も出さず、2件で2つのリンク（`/note/<slug>`）と「すべて見る」（`/note`）。Navbar のページ内リンクがすべて `/#` で始まり、「現場ノート」が `/note`
- [ ] **Step 2: 失敗を確認**
- [ ] **Step 3: 実装**（最初の画面の h1 は opacity 0 から始めない＝今の LCP の配慮を残す）
- [ ] **Step 4: `npm test` 全部、`npx tsc --noEmit`、`npm run build` が通る。手元で `next start` し、スマホ幅でトップ・`/note`・記事（fixtures を一時配置）を目で確かめる**
- [ ] **Step 5: Commit** `feat(lp): トップを現場ノートのデザインに合わせて直す`

### Task 7: コマンドと記事の候補の一覧（mirageru-company リポジトリ）

**Files:**
- Create: `~/claude/mirageru-company/.claude/commands/note-article.md`、`~/claude/mirageru-company/.claude/commands/seo-check.md`（設計 5.8 の手順をそのまま。書き方は同じフォルダの `x-trend.md` に合わせる。オーナーには「やさしい日本語で、短く」）
- Create: `~/claude/mirageru-company/.company/marketing/content-plan/note-candidates.md`（候補10本＋ note の下書き6本。列：候補ID・題名案・テーマ・ねらう言葉・材料（Xの投稿URL／下書きファイル）・状態。`note-draft-b01-hitori.md` は「note公開済み・書き直して使う」と注記）
- Create: `~/claude/mirageru-company/.company/marketing/seo-data/.gitkeep`

- [ ] **Step 1:** `/note-article` に、記事ファイルの frontmatter の見本（Task 2 の項目）、5.3 の本文の構成、Grok 3回まで、シートが読めないときの止め方、Preview の確認、main への送信の前にオーナーの OK を取る手順を書く
- [ ] **Step 2:** `/seo-check` に CSV の書き出し手順（Search Console・キーワードプランナー）、置き場所、見直しの3つの観点、`seo-pdca-log.md` への追記の形を書く
- [ ] **Step 3:** 候補の一覧を作る
- [ ] **Step 4: Commit**（mirageru-company 側で、この3ファイルだけ）`feat(note): 記事づくりとSEO見直しのコマンド`

### Task 8: 確認用の公開（Preview）とオーナーの確認

- [ ] **Step 1:** オーナーに「作業用の枝を GitHub に送って、確認用の住所を作ってよいか」を聞く（本番は変わらない）
- [ ] **Step 2:** OK なら `feat/genba-note` を送り、`gh api repos/katashin/mirageru-lp/commits/<sha>/statuses` で Vercel の Preview の URL を取る。Preview が無効なら、手元のサーバーで見てもらう形に切りかえる
- [ ] **Step 3:** オーナーがスマホで LP トップ・`/note`（0件の表示）を確認。直しがあれば直す
- [ ] **Step 4:** オーナーの OK のあと main に fast-forward で入れて送る → 本番で `/`・`/note`・`/sitemap.xml` を確かめる
- [ ] **Step 5:** 最初の記事は `/note-article` で作る（仕組みの確認を兼ねる）
