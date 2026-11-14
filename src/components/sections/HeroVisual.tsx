import Link from "next/link";

/** 線の人のアイコン（24×24） */
function Person({ x, y, size = 24, color, width = 1.6 }: { x: number; y: number; size?: number; color: string; width?: number }) {
  const s = size / 24;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={color} strokeWidth={width / s} strokeLinecap="round">
      <circle cx="12" cy="7.5" r="3.6" />
      <path d="M4.5 20.5c.8-4 3.9-6.3 7.5-6.3s6.7 2.3 7.5 6.3" />
    </g>
  );
}

function NowScene() {
  return (
    <svg viewBox="0 0 120 92" className="h-auto w-full max-w-[150px] md:max-w-[190px]" aria-hidden>
      <g stroke="#cbd5e1" strokeWidth="1.4" strokeDasharray="3 3" fill="none">
        <path d="M20 18 L52 40" /><path d="M100 18 L68 40" /><path d="M20 74 L52 54" /><path d="M100 74 L68 54" />
      </g>
      <Person x={8} y={6} color="#94a3b8" /><Person x={88} y={6} color="#94a3b8" />
      <Person x={8} y={62} color="#94a3b8" /><Person x={88} y={62} color="#94a3b8" />
      <circle cx="60" cy="47" r="17" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1.6" />
      <Person x={47} y={34} size={26} color="#f59e0b" width={1.8} />
      <g fontSize="9" fontWeight="700" fill="#b45309" fontFamily="sans-serif">
        <text x="36" y="26">?</text><text x="80" y="26">?</text><text x="36" y="72">?</text><text x="80" y="72">?</text>
      </g>
    </svg>
  );
}

function AfterScene() {
  return (
    <svg viewBox="0 0 120 92" className="h-auto w-full max-w-[150px] md:max-w-[190px]" aria-hidden>
      <rect x="44" y="30" width="32" height="24" rx="4" fill="#fff" stroke="#0e7c8c" strokeWidth="1.5" />
      <path d="M50 37h20M50 42h20M50 47h13" stroke="#169db2" strokeWidth="1.5" />
      <g stroke="#169db2" strokeWidth="1.4" fill="none"><path d="M24 64 L46 52" /><path d="M60 66 L60 56" /><path d="M96 64 L74 52" /></g>
      <Person x={12} y={62} color="#0e7c8c" /><Person x={48} y={64} color="#0e7c8c" /><Person x={84} y={62} color="#0e7c8c" />
      <circle cx="100" cy="16" r="12" fill="#fff" stroke="#0e7c8c" strokeWidth="1.4" />
      <Person x={90} y={6} size={20} color="#0e7c8c" width={1.7} />
      <text x="47" y="26" fontSize="8.5" fill="#0e7c8c" fontFamily="sans-serif" fontWeight="700">手順書</text>
    </svg>
  );
}

const ICON = "h-[18px] w-[18px] md:h-[22px] md:w-[22px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]";

const STEPS = [
  { label: "見える化", out: "業務フロー図", icon: <svg viewBox="0 0 24 24" className={ICON}><rect x="3" y="4" width="6" height="5" rx="1" /><rect x="15" y="4" width="6" height="5" rx="1" /><rect x="9" y="15" width="6" height="5" rx="1" /><path d="M6 9v3h12V9M12 12v3" /></svg> },
  { label: "課題の特定", out: "課題一覧表", icon: <svg viewBox="0 0 24 24" className={ICON}><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></svg> },
  { label: "マニュアル", out: "手順書", icon: <svg viewBox="0 0 24 24" className={ICON}><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h7M9 16h5" /></svg> },
  { label: "作業割当", out: "稼働表", icon: <svg viewBox="0 0 24 24" className={ICON}><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 14h3M13 14h3M8 17h3" /></svg> },
  { label: "1on1", out: "リーダー育成", icon: <svg viewBox="0 0 24 24" className={ICON}><path d="M4 5h11v8H8l-4 3z" /><path d="M15 9h5v8l-3-2h-5v-2" /></svg> },
] as const;

/** LP トップの右側：「今 → 仕組みのあと」と5ステップのチラ見せ */
export function HeroVisual() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#e2e8f0] bg-gradient-to-b from-white to-[#f6fafb] p-4 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] md:gap-5 md:p-6">
      <div className="grid grid-cols-[1fr_16px_1fr] items-stretch gap-1.5">
        <div className="flex flex-col items-center gap-1 rounded-xl border border-[#e2e8f0] bg-[#F8FAFC] px-2 pb-3 pt-2">
          <span className="text-[11px] font-black tracking-widest text-[#64748B] md:text-[13px]">今</span>
          <NowScene />
          <p className="text-center text-[11px] leading-snug text-[#475569] md:text-[13px]">質問も判断も、<br className="hidden md:block" />ぜんぶ店長へ</p>
        </div>
        <div className="flex items-center justify-center font-black text-[#169db2]" aria-hidden>›</div>
        <div className="flex flex-col items-center gap-1 rounded-xl border border-[#c7e9ee] bg-[#e3f4f6] px-2 pb-3 pt-2">
          <span className="text-[11px] font-black tracking-widest text-[#0e7c8c] md:text-[13px]">仕組みのあと</span>
          <AfterScene />
          <p className="text-center text-[11px] leading-snug text-[#0F172A] md:text-[13px]">手順書とリーダーで回り、<br className="hidden md:block" />店長は先を考える</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-widest text-[#64748B] md:text-[13px]">進め方は5ステップ</span>
        <Link href="/#step-method" className="text-xs font-bold text-[#0e7c8c] md:text-sm">
          くわしく見る ↓
        </Link>
      </div>
      <ol className="relative grid grid-cols-5">
        <span aria-hidden className="absolute left-[10%] right-[10%] top-[17px] h-0.5 md:top-[22px] bg-gradient-to-r from-[#bfe6ec] to-[#0e7c8c]" />
        {STEPS.map((s, i) => {
          const last = i === STEPS.length - 1;
          return (
            <li key={s.label} className="relative flex flex-col items-center gap-1">
              <span
                className={`flex h-[34px] w-[34px] items-center md:h-[44px] md:w-[44px] justify-center rounded-full border-2 ${
                  last ? "border-[#0e7c8c] bg-[#0e7c8c] text-white" : "border-[#169db2] bg-white text-[#0e7c8c]"
                }`}
              >
                {s.icon}
              </span>
              <span className="font-mono text-[9px] text-[#0e7c8c] md:text-[11px]">0{i + 1}</span>
              <span className="text-center text-[11px] font-bold leading-tight text-[#0F172A] md:text-[14px]">{s.label}</span>
              <span className="text-center text-[9.5px] leading-tight text-[#64748B] md:text-[11.5px]">{s.out}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
