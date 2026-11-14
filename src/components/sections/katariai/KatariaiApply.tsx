import { CTAButton } from "@/components/CTAButton";
import {
  KATARIAI_APPLY_LABEL,
  KATARIAI_FAQ,
  KATARIAI_FLOW,
  KATARIAI_GIFT,
  KATARIAI_LINE_URL,
} from "@/lib/katariai";

const H2 = "mb-8 font-serif-jp text-[26px] font-extrabold leading-normal tracking-[0.03em] text-[#1E2A44] md:text-[34px]";

/** 無料面談の流れ・プレゼント・よくある質問・最後の申込み */
export function KatariaiApply() {
  return (
    <>
      <section className="bg-[#F7F5F0] py-[72px] md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className={H2}>無料面談（60分）の流れ</h2>
          <ol className="md:grid md:grid-cols-4 md:gap-6">
            {KATARIAI_FLOW.map((s, i) => (
              <li
                key={s.title}
                className="relative border-b border-[#E2DFD7] py-4 pl-12 md:border-b-0 md:border-t md:border-t-[#1E2A44] md:pl-0 md:pt-5"
              >
                <span className="absolute left-0 top-4 font-serif-jp text-[26px] font-extrabold leading-none text-[#9C7A3C] md:static md:mb-2 md:block">
                  {i + 1}
                </span>
                <b className="block text-base text-[#1E2A44]">{s.title}</b>
                <span className="text-sm text-[#5E6678]">{s.body}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[15px] text-[#5E6678]">
            話してみて合いそうなら、あなたに合った続け方と料金をご説明します。
          </p>
          <div className="mt-7 border border-l-[3px] border-[#E2DFD7] border-l-[#9C7A3C] bg-white px-5 py-4 text-[14.5px] text-[#5E6678]">
            <b className="mb-0.5 block text-[15px] text-[#1E2A44]">公式LINEでプレゼント中</b>
            現場で今日から使える「{KATARIAI_GIFT}」を無料でお渡ししています。プレゼントだけ受け取るのも大歓迎です。
          </div>
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-24">
        <div className="mx-auto max-w-[700px] px-5 md:px-8">
          <h2 className={H2}>よくある質問</h2>
          {KATARIAI_FAQ.map((f) => (
            <details key={f.q} className="group border-b border-[#E2DFD7]">
              <summary className="relative cursor-pointer list-none py-5 pr-9 font-bold text-[#1E2A44] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="absolute right-2 top-7 h-2 w-2 rotate-45 border-b-[1.5px] border-r-[1.5px] border-[#9C7A3C] transition-transform group-open:-rotate-[135deg]"
                />
              </summary>
              <p className="mb-5 text-[15px] text-[#5E6678]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#1E2A44] py-[72px] text-center md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className="mb-3 font-serif-jp text-[26px] font-extrabold leading-normal tracking-[0.03em] text-white md:text-[34px]">
            一人で答えを出さなくていい。
          </h2>
          <p className="mb-8 text-[#C3C9D6]">まずは60分、話してみませんか。</p>
          <CTAButton
            place="katariai_end"
            href={KATARIAI_LINE_URL}
            label={KATARIAI_APPLY_LABEL}
            tone="light"
            className="w-full whitespace-nowrap rounded-md px-5 md:w-auto md:px-8"
          />
          <p className="mt-5 text-[13px] text-[#C3C9D6]">
            公式LINEでは「{KATARIAI_GIFT}」も無料でプレゼント中。受け取るだけでも大歓迎です。
          </p>
        </div>
      </section>
    </>
  );
}
