# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Project Overview

ビジネス・マーケティング系のYouTube動画をコース形式で提供する、Udemyライクな動画学習プラットフォーム。
**現在はPhase 1（MVP）**: コース閲覧・動画視聴 + 課金ダミーUI。認証・実決済は後フェーズ。

## Architecture

**Next.js 16 App Router** + TypeScript + Tailwind CSS v4 + Supabase。

- `src/app/` — App Router root。`layout.tsx` がラッパー、`page.tsx` がページ本体。
- Path alias `@/*` → `src/*`。
- **React Compiler** 有効（`next.config.ts`）— `useMemo`/`useCallback` は原則不要。
- **Tailwind CSS v4** は `@import "tailwindcss"` 構文（`@tailwind` ディレクティブは使わない）。テーマ変数は `globals.css` 内の `@theme inline` で定義。
- **データ取得はServer Componentsで行う**（Supabase JS SDKをサーバーサイドのみで使用し、クライアントへの不要なデータ露出を防ぐ）。

## Page Routes

| ページ | パス | ファイル |
|--------|------|---------|
| コース一覧 | `/` | `app/page.tsx` |
| コース詳細 | `/courses/[id]` | `app/courses/[id]/page.tsx` |
| 動画視聴 | `/courses/[id]/videos/[videoId]` | `app/courses/[id]/videos/[videoId]/page.tsx` |
| 決済（ダミー） | `/checkout/[courseId]` | `app/checkout/[courseId]/page.tsx` |

## Database Schema（Supabase PostgreSQL）

**`courses` テーブル**

| カラム | 型 | 説明 |
|--------|----|------|
| id | uuid (PK) | コースID |
| title | text | コースタイトル |
| description | text | コース説明文 |
| thumbnail_url | text | サムネイル画像URL |
| created_at | timestamp | 作成日時 |

**`videos` テーブル**

| カラム | 型 | 説明 |
|--------|----|------|
| id | uuid (PK) | 動画ID |
| course_id | uuid (FK → courses.id) | 所属コースID |
| title | text | 動画タイトル |
| youtube_id | text | YouTube動画ID（iframe埋め込みに使用） |
| order | integer | コース内の表示順 |
| created_at | timestamp | 作成日時 |

## Next.js Best Practices

### Server / Client Component の使い分け

- **デフォルトはServer Component**。`'use client'` は必要な場合のみ付与する。
- `'use client'` が必要なケース: `useState`/`useEffect` などのReact hooks使用時、ブラウザAPIアクセス時、イベントハンドラ定義時。
- **データフェッチはServer Componentで行う**。`useEffect` + `fetch` でのクライアントサイドフェッチは避ける。
- Client Componentはツリーの末端（葉）に留める。親をServer Componentのまま維持し、インタラクティブな部分だけを切り出す。

### データフェッチ

- Server Component内で `async/await` を直接使う（`getServerSideProps` は App Router では不要）。
- `fetch` を使う場合は Next.js の拡張 fetch（キャッシュ制御）を活用する。
  - `fetch(url)` — デフォルトでキャッシュ
  - `fetch(url, { cache: 'no-store' })` — 毎リクエストで再取得
  - `fetch(url, { next: { revalidate: 60 } })` — ISR（60秒ごと再検証）
- Supabase SDKはサーバーサイド専用で使用（クライアント側に秘密鍵を露出させない）。

### ルーティング・ファイル規約

- `page.tsx` — ルートのUI（公開エントリポイント）
- `layout.tsx` — 子ページ共通のラッパー（状態を保持したまま再レンダリングしない）
- `loading.tsx` — Suspenseフォールバック（ページ単位のローディングUI）
- `error.tsx` — エラーバウンダリ（`'use client'` 必須）
- `not-found.tsx` — 404UI（`notFound()` 関数と組み合わせる）
- `route.ts` — API Route（App Router版）

### パフォーマンス

- `next/image` を使う（`<img>` タグは使わない）。`width`/`height` または `fill` を必ず指定。
- `next/link` を使う（`<a>` タグは使わない）。
- 外部フォントは `next/font` で読み込む（すでに `layout.tsx` で設定済み）。
- 動的インポート（`next/dynamic`）は本当に必要な場合のみ（React Compilerが多くの最適化を自動化するため）。

### 型安全

- `page.tsx` の `params` / `searchParams` は非同期プロップとして受け取る。
  ```tsx
  // App Router では params は Promise
  export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
  }
  ```
- `generateStaticParams` で静的生成が可能なルートはSSGにする。

### 環境変数

- クライアントに公開可: `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- サーバーサイド専用: `SUPABASE_SERVICE_ROLE_KEY`（`NEXT_PUBLIC_` プレフィックスなし）
- `.env.local` に記載し、`.gitignore` で除外済みであることを確認する。

---

## Supabase + Next.js ルール

### クライアントの作成

Supabase公式テンプレート（`with-supabase`）のパターンに従い、用途別にクライアントを分ける。

**サーバーサイド用**（Server Components / Server Actions / Route Handlers）:
```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}
```

**クライアントサイド用**（Client Components）:
```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
```

### データフェッチパターン

Server Componentで直接 `async/await` して取得する。

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function CoursesPage() {
  const supabase = await createClient()
  const { data: courses } = await supabase.from('courses').select()
  return <CourseList courses={courses} />
}
```

非同期コンポーネントは `<Suspense>` でラップする（`loading.tsx` を併用してもよい）。

### Row Level Security（RLS）

- テーブル作成時は必ずRLSを有効化する（`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`）。
- MVPでは認証不要のため、`courses` / `videos` テーブルには匿名読み取りを許可するRLSポリシーを設定する。
  ```sql
  CREATE POLICY "Public read" ON courses FOR SELECT USING (true);
  CREATE POLICY "Public read" ON videos FOR SELECT USING (true);
  ```
- 書き込み（INSERT / UPDATE / DELETE）はポリシーで明示的に許可しない限りブロックされる。

### 環境変数（`.env.local`）

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxx
```

---

## Key Implementation Notes

- **認証は現時点で不要**。Phase 2でSupabase Auth + Google OAuthを有効化予定。認証前提のコードを混入させない。
- **決済処理はダミー**。`/checkout/[courseId]` はUIのみ実装し、実際の決済処理は行わない。Phase 3でStripe等に差し替えられる構造にする。
- 動画埋め込みはYouTube iframe（`youtube_id` を使って `https://www.youtube.com/embed/{youtube_id}` 形式）。
- レスポンシブ対応必須（PC・スマートフォン）。
- ホスティングはVercel。

## Phase Plan

| フェーズ | 内容 |
|----------|------|
| **Phase 1（現在）** | コース閲覧・動画視聴 + 課金ダミーUI（MVP） |
| Phase 2 | Supabase Auth + Google OAuth 認証 |
| Phase 3 | Stripe等による実決済 |
| Phase 4 | 管理画面 |
| Phase 5 | 進捗管理・レビュー・検索 |
