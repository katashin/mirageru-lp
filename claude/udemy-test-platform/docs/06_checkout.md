# 06 課金・決済ページ（ダミーUI）

## 概要

決済ページ（`/checkout/[courseId]`）をダミー実装する。実際の決済処理は行わず、UI のみ実装する。Phase 3 で Stripe 等の実決済に差し替えられる構造にしておく。

## ルート

- パス: `/checkout/[courseId]`
- ファイル: `src/app/checkout/[courseId]/page.tsx`

## Todo

- [ ] `src/app/checkout/[courseId]/page.tsx` を実装する
  - `params` を `Promise<{ courseId: string }>` として受け取る
- [ ] Supabase からコース情報（タイトル・価格）を取得して表示する
- [ ] 決済フォームの UI を実装する（ダミー）
  - コース名の表示
  - 価格の表示
  - カード番号入力欄（ダミー、`<input type="text" placeholder="1234 5678 9012 3456">`）
  - 有効期限入力欄（ダミー）
  - セキュリティコード入力欄（ダミー）
- [ ] 「購入を完了する」ボタンを実装する（Client Component として切り出す）
- [ ] ボタン押下後に完了メッセージ or 完了画面を表示する（実際の決済処理なし）
- [ ] レスポンシブ対応

## 関連ファイル

- `src/app/checkout/[courseId]/page.tsx`
- `src/app/checkout/[courseId]/CheckoutForm.tsx`（Client Component）

## 備考

- フォームの送信ハンドラは Client Component（`'use client'`）として分離する
- Phase 3 での Stripe 差し替えを想定し、決済処理ロジックは `CheckoutForm.tsx` に集約しておく
- 実際の決済処理・カード情報の送信は一切行わない（ダミー）
