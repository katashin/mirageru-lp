# カタリアイのタブ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** LPのトップに「店舗・会社の方｜管理職・個人の方」の入口とタブを置き、個人向け「カタリアイ」の中身をタブで見せる。

**Architecture:** トップに共通の入口（AudienceGate）、その下にタブ（AudienceTabs）。タブの状態は AudienceProvider（React context）が持ち、`#katariai` で個人タブを開く。2つの中身はどちらもHTMLに出し、見えない方は `hidden`。Navbar と StickyLineBar は context を読んでボタンを切り替える（provider が無い /note では会社向けのまま）。

**Tech Stack:** Next.js 16 App Router / React 19 / Tailwind v4 / framer-motion / jest + Testing Library

**Spec:** mirageru-company/.company/pm/projects/katariai-lp-tab-design-2026-11-14.md、見た目は mirageru-company/.company/creative/briefs/2026-11-14-katariai-tab-design.html（第2版）

## Global Constraints
- カタリアイのLINE：`https://lin.ee/x9hWklGy`。会社向けは今の `LINE_URL`（lin.ee/q0dw60b）のまま
- 申込み名は「無料面談（60分）」。LINEで送る言葉は「無料面談」。面談は Google Meet
- カタリアイ側に値段（「円」）を出さない
- 実績は「120名」
- 色：生成り #F7F5F0、紺 #1E2A44、金 #9C7A3C、灰青 #EFF2F5、線 #E2DFD7。見出しは Shippori Mincho B1
- 会社向けの中身（Hero〜CTASection・NoteShowcase）とページの題名・JSON-LDは変えない
- 共通の入口の見出しは仮：「現場のリーダーが、一人で抱えなくていい仕組みと相手を。」（オーナー未決定）。h1 は会社向けHeroのまま（入口は p）

## Review Focus
- /note のページ（provider なし）で Navbar・StickyLineBar が会社向けのまま → Navbar テストで provider なしを確認（Task 3）
- `#pain` など会社向けのページ内リンクの住所で開いたとき、個人タブにならない → AudienceProvider テスト（Task 1）
- 個人タブを見ているときに会社向けLINEのボタンが出ない（ヘッダー・下のバー）→ Task 3 のテスト
- 個人タブでも会社向けの文章はHTMLに残る（検索用）→ AudienceTabs テスト（Task 1）
- スマホ幅で振り返りシートの表が横にはみ出さない → Task 4 の画面確認

---

### Task 1: タブの状態と入口・タブの帯

**Files:**
- Create: `src/components/audience/AudienceContext.tsx`, `src/components/sections/AudienceGate.tsx`, `src/components/sections/AudienceTabs.tsx`
- Test: `src/__tests__/sections/Audience.test.tsx`

**Interfaces:**
- Produces: `type Audience = "business" | "katariai"`; `AudienceProvider({children})`; `useAudience(): { audience: Audience; select: (a: Audience, opts?: { scroll?: boolean }) => void }`（provider なしでは business・select は何もしない）; `AUDIENCE_TABS_ID = "audience-tabs"`; `<AudienceTabs business={ReactNode} katariai={ReactNode} />`; `<AudienceGate />`

- [ ] テスト：`#katariai` で開くと個人タブ（aria-selected）、`#pain` では会社タブ／タブを押すと切り替わり住所の末尾が `#katariai` になる／見えない方のパネルは `hidden` だが DOM にある／入口の「カタリアイ」を押すと個人タブ
- [ ] 失敗を確認 `npx jest src/__tests__/sections/Audience.test.tsx`
- [ ] 実装：select は `history.replaceState` で `#katariai`／hash なしに書き換え、`scroll` のとき `#audience-tabs` を scrollIntoView。`hashchange` を聞く。タブは role=tablist/tab/tabpanel
- [ ] テストが通ることを確認してコミット

### Task 2: カタリアイの中身

**Files:**
- Create: `src/lib/katariai.ts`（URL と文言）, `src/components/sections/katariai/KatariaiTop.tsx`, `KatariaiBody.tsx`, `KatariaiApply.tsx`, `Katariai.tsx`（3つをまとめる）
- Modify: `src/components/CTAButton.tsx`（`tone?: "line" | "navy"`）, `src/lib/analytics.ts`（LinePlace に `"katariai_hero" | "katariai_end" | "katariai_header" | "katariai_sticky"`）, `src/app/layout.tsx`（Shippori Mincho B1 800 を `--font-mincho`、preload: false）
- Test: `src/__tests__/sections/Katariai.test.tsx`

- [ ] テスト：見出し「一人で、抱えるな。」／申込みリンクが全部 `https://lin.ee/x9hWklGy`／「無料面談（60分）の流れ」と「「無料面談」と送る」「Google Meet」／「3か月後のあなた」の4項目／振り返りシートの表／「120名」／プレゼント「管理職のための支援ツール5点セット」／本文に「円」が無い／写真 `/images/profile.png`
- [ ] 失敗を確認 → 実装（文言はデザイン案第2版のとおり）→ 通ることを確認してコミット

### Task 3: ヘッダー・下のバー・フッター・ページの組み立て

**Files:**
- Modify: `src/components/sections/Navbar.tsx`, `src/components/StickyLineBar.tsx`, `src/components/sections/Footer.tsx`, `src/app/page.tsx`
- Test: `src/__tests__/sections/Navbar.test.tsx`（追記）, `src/__tests__/sections/Audience.test.tsx`（追記）

- [ ] テスト：provider なしの Navbar は「無料相談」→ LINE_URL／個人タブのときは「無料面談」→ カタリアイLINE で、課題などのリンクを出さない／StickyLineBar も同様（「60分・Google Meet」）／フッターに `/#katariai`
- [ ] 実装：page.tsx は `<AudienceProvider>` で包み、`<AudienceGate/>` の下に `<AudienceTabs business={今のHero〜CTASection} katariai={<Katariai/>}/>`
- [ ] `npx jest` 全部と `npm run build` が通ることを確認してコミット

### Task 4: 画面で確かめる
- [ ] `npm run dev` でスマホ幅（375px）とパソコン幅を見る：横にはみ出さない、タブの帯が上に残る、`/#katariai` で個人タブ、/note のヘッダーは会社向け
- [ ] オーナーに見てもらう。公開（main への送信）はOKをもらってから
