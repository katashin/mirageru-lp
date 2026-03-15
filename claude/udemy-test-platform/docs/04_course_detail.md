# 04 コース詳細ページ

## 概要

コース詳細ページ（`/courses/[id]`）にコースの概要・説明・収録動画リストを表示する。動画クリックで動画視聴ページへ遷移する。コース詳細ページには「購入する」ボタンも設置する。

## ルート

- パス: `/courses/[id]`
- ファイル: `src/app/courses/[id]/page.tsx`

## Todo

- [ ] `src/app/courses/[id]/page.tsx` を Server Component として実装する
  - `params` を `Promise<{ id: string }>` として受け取る（App Router の型安全ルール）
- [ ] Supabase からコース情報を取得する（`courses` テーブルを id で検索）
- [ ] Supabase からそのコースの動画一覧を取得する（`videos` テーブルを `course_id` で絞り込み、`order` 昇順）
- [ ] コースタイトル・説明文を表示する
- [ ] 収録動画をリスト形式で表示する（番号・タイトル）
- [ ] 各動画をクリックすると動画視聴ページへ遷移（`next/link` を使用）
- [ ] 「購入する」ボタンを設置し、`/checkout/[courseId]` へ遷移させる
- [ ] コースが存在しない場合に `notFound()` を呼び出す（`not-found.tsx` と組み合わせる）
- [ ] `src/app/courses/[id]/loading.tsx` を作成する
- [ ] レスポンシブ対応

## 関連ファイル

- `src/app/courses/[id]/page.tsx`
- `src/app/courses/[id]/loading.tsx`
- `src/app/courses/[id]/not-found.tsx`

## 備考

- 動画リストは `order` カラムの昇順で表示する
- 「購入する」ボタンは Phase 3 で実決済に差し替える想定のため、遷移先 URL だけを実装しておく
