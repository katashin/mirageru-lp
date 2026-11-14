# SEOの土台の修正 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** サイトマップ・robots・JSON-LD・canonical の住所を `https://lp.mirageru.com` に統一し、JSON-LD の sameAs を @coach_katayama にする。

**Architecture:** 住所とXのURLを `src/lib/constants.ts` に置き、sitemap / robots / JSON-LD（`src/lib/jsonLd.ts` に切り出し）/ layout の metadata がそこから読む。

**Tech Stack:** Next.js 16 App Router、TypeScript、Jest

**Spec:** `docs/superpowers/specs/2026-11-14-seo-foundation-design.md`

## Global Constraints
- 住所は `https://lp.mirageru.com`（末尾スラッシュなし）、Xは `https://x.com/coach_katayama`
- 見出し・文章・見た目は変えない
- git の設定ファイルは変えない

## Review Focus
- 住所の文字列が `src/` のどこにも `mirageru-lp.mirageru.com` として残っていない → grep で0件
- ビルド後の `/sitemap.xml` `/robots.txt` が新しい住所を返す → ローカルで確認
- ページの `<link rel="canonical">` が `https://lp.mirageru.com` → ローカルで確認

---

### Task 1: 住所の定数と sitemap / robots / JSON-LD

**Files:**
- Modify: `src/lib/constants.ts`（`SITE_URL`, `X_URL` を追加）
- Create: `src/lib/jsonLd.ts`（`export const jsonLd`、layout.tsx から移す）
- Modify: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/layout.tsx`（`metadataBase: new URL(SITE_URL)`, `alternates: { canonical: "/" }`）
- Test: `src/__tests__/seo.test.ts`

- [ ] **Step 1: 失敗するテストを書く** — `sitemap()[0].url === SITE_URL`、`robots().sitemap === SITE_URL + "/sitemap.xml"`、`JSON.stringify(jsonLd)` に `mirageru-lp.mirageru.com` を含まず `https://lp.mirageru.com/#person` と `https://x.com/coach_katayama` を含む、`SITE_URL === "https://lp.mirageru.com"`
- [ ] **Step 2: `npx jest src/__tests__/seo.test.ts` で失敗を確認**
- [ ] **Step 3: 実装**
- [ ] **Step 4: `npm test` と `npm run build` が通る**
- [ ] **Step 5: `next start` で `/sitemap.xml` `/robots.txt` と canonical・JSON-LD を確認**
- [ ] **Step 6: Commit**（ブランチ `fix/seo-foundation`。main へ入れて push するのはオーナーのOKのあと）
