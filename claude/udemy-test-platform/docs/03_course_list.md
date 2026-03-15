# 03 コース一覧ページ

## 概要

トップページ（`/`）にコース一覧をカード形式で表示する。Supabase から全コースを取得し、Server Component でレンダリングする。

## ルート

- パス: `/`
- ファイル: `src/app/page.tsx`

## Todo

- [ ] `src/app/page.tsx` を Server Component として実装する
- [ ] Supabase からコース一覧を取得する（`courses` テーブルを全件 SELECT）
- [ ] コースカードコンポーネント `src/components/CourseCard.tsx` を作成する
  - サムネイル画像（`next/image` を使用）
  - コースタイトル
  - 説明文（短縮表示）
  - 動画本数（`videos` テーブルを COUNT または JOIN）
- [ ] カードクリックでコース詳細ページへ遷移（`next/link` を使用）
- [ ] `src/app/loading.tsx` を作成してローディングUIを実装する
- [ ] レスポンシブ対応（PC: グリッド表示 / スマートフォン: 1カラム）
- [ ] 動作確認（コース一覧が正しく表示されること）

## 関連ファイル

- `src/app/page.tsx`
- `src/app/loading.tsx`
- `src/components/CourseCard.tsx`

## 備考

- `<img>` タグは使わず `next/image` を使う
- `<a>` タグは使わず `next/link` を使う
- データフェッチは Server Component 内で行い、`useEffect` は使わない
