# 01 プロジェクト初期設定・Supabase接続

## 概要

Supabase SDK のインストール、環境変数の設定、サーバー／クライアント用 Supabase クライアントの作成を行う。

## Todo

- [ ] `@supabase/ssr` をインストールする
  ```bash
  npm install @supabase/ssr @supabase/supabase-js
  ```
- [ ] `.env.local` を作成し、環境変数を設定する
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxx
  ```
- [ ] `src/lib/supabase/server.ts` を作成する（Server Components / Server Actions 用）
- [ ] `src/lib/supabase/client.ts` を作成する（Client Components 用）
- [ ] `npm run dev` で起動確認する

## 関連ファイル

- `src/lib/supabase/server.ts`
- `src/lib/supabase/client.ts`
- `.env.local`

## 備考

- `.env.local` は `.gitignore` で除外済みであることを確認する
- Phase 2 で認証を追加する際、このクライアント設定を拡張する
