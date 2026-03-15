"use client";

import { useState } from "react";

type Props = {
  courseId: string;
  courseTitle: string;
  price: number;
};

export default function CheckoutForm({ courseTitle, price }: Props) {
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-zinc-900 mb-2">購入が完了しました！</h2>
        <p className="text-zinc-500 text-sm">「{courseTitle}」へのアクセスが有効になりました。</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setCompleted(true);
      }}
      className="space-y-5"
    >
      {/* 注文サマリー */}
      <div className="bg-zinc-50 rounded-lg p-4 flex justify-between items-center">
        <span className="text-sm text-zinc-600 line-clamp-1">{courseTitle}</span>
        <span className="text-sm font-bold text-zinc-900 shrink-0 ml-4">
          ¥{price.toLocaleString()}
        </span>
      </div>

      {/* カード番号 */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          カード番号
        </label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className="w-full border border-zinc-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* 有効期限 + セキュリティコード */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            有効期限
          </label>
          <input
            type="text"
            placeholder="MM / YY"
            maxLength={7}
            className="w-full border border-zinc-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            セキュリティコード
          </label>
          <input
            type="text"
            placeholder="CVC"
            maxLength={4}
            className="w-full border border-zinc-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
      >
        購入を完了する — ¥{price.toLocaleString()}
      </button>

      <p className="text-xs text-zinc-400 text-center">
        ※ これはデモUIです。実際の決済処理は行われません。
      </p>
    </form>
  );
}
