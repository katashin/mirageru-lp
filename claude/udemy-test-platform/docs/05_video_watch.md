# 05 動画視聴ページ

## 概要

動画視聴ページ（`/courses/[id]/videos/[videoId]`）で YouTube iframe を埋め込み再生する。サイドバーに同コース内の他の動画リストを表示し、クリックで切り替えられるようにする。

## ルート

- パス: `/courses/[id]/videos/[videoId]`
- ファイル: `src/app/courses/[id]/videos/[videoId]/page.tsx`

## Todo

- [ ] `src/app/courses/[id]/videos/[videoId]/page.tsx` を Server Component として実装する
  - `params` を `Promise<{ id: string; videoId: string }>` として受け取る
- [ ] Supabase から現在の動画情報を取得する（`videos` テーブルを id で検索）
- [ ] Supabase から同コースの全動画リストを取得する（`course_id` で絞り込み、`order` 昇順）
- [ ] YouTube iframe を埋め込む
  - `src="https://www.youtube.com/embed/{youtube_id}"`
  - `allowFullScreen` を設定する
- [ ] 動画タイトルを表示する
- [ ] サイドバーに同コースの動画リストを表示する
  - 現在再生中の動画をハイライト表示する
  - 各動画を `next/link` でリンクする
- [ ] 動画が存在しない場合に `notFound()` を呼び出す
- [ ] `src/app/courses/[id]/videos/[videoId]/loading.tsx` を作成する
- [ ] レスポンシブ対応（PC: メイン＋サイドバー横並び / スマートフォン: 縦積み）

## 関連ファイル

- `src/app/courses/[id]/videos/[videoId]/page.tsx`
- `src/app/courses/[id]/videos/[videoId]/loading.tsx`

## 備考

- YouTube iframe は `<iframe>` タグを直接使用する（`next/image` は不要）
- サイドバーの動画リストはサーバーサイドで取得してそのまま渡す（Client Component 不要）
- 動画切り替えはページ遷移（SPA的な切り替えは MVP スコープ外）
