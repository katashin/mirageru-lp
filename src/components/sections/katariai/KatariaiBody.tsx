import Image from "next/image";
import { REPRESENTATIVE_NAME } from "@/lib/constants";
import {
  KATARIAI_FACTS,
  KATARIAI_SHEET_ROWS,
  KATARIAI_STAGES,
  KATARIAI_SUPPORTS,
  KATARIAI_VOICES,
} from "@/lib/katariai";

const H2 = "mb-8 font-serif-jp text-[26px] font-extrabold leading-normal tracking-[0.03em] text-[#1E2A44] md:text-[34px]";
const SECTION = "py-[72px] md:py-24";

/** 悩み・3か月の道すじ・伴走の形・耳の痛いこと・お相手 */
export function KatariaiBody() {
  return (
    <>
      {/* 悩み */}
      <section className={`bg-white ${SECTION}`}>
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className={H2}>
            こんな気持ちを、
            <br />
            一人で抱えていませんか。
          </h2>
          <div className="grid gap-9 md:grid-cols-2 md:gap-14">
            {KATARIAI_VOICES.map((v) => (
              <div key={v.who}>
                <h3 className="text-base font-bold text-[#1E2A44]">{v.who}</h3>
                <p className="mb-3 text-[13px] text-[#5E6678]">{v.example}</p>
                <ul>
                  {v.items.map((item) => (
                    <li key={item} className="border-b border-[#E2DFD7] py-3 text-[15.5px] text-[#1E2A44]">
                      <span className="text-[#9C7A3C]">「</span>
                      {item}
                      <span className="text-[#9C7A3C]">」</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-11 font-serif-jp text-xl font-extrabold leading-[1.7] text-[#1E2A44]">
            マネジメントの悩みは、
            <br />
            一人で答えを出さなくていい。
          </p>
        </div>
      </section>

      {/* 3か月の道すじ */}
      <section className={`bg-[#F7F5F0] ${SECTION}`}>
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className={H2}>
            3か月で、
            <br />
            自分の型ができていく
          </h2>
          <div className="grid gap-11 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
            <ol className="min-w-0">
              {KATARIAI_STAGES.map((s, i) => (
                <li key={s.title} className="relative pb-8 pl-16">
                  <span className="absolute left-0 top-1 w-[52px] text-xs font-bold text-[#9C7A3C]">{s.month}</span>
                  {i < KATARIAI_STAGES.length - 1 && (
                    <span aria-hidden className="absolute bottom-[-4px] left-[58px] top-3 w-px bg-[#E8DEC8]" />
                  )}
                  <b className="mb-1 block font-serif-jp text-[19px] font-extrabold text-[#1E2A44]">{s.title}</b>
                  <p className="text-[15px] text-[#5E6678]">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="min-w-0">
              <div className="overflow-hidden rounded border border-[#D9DCE3] bg-white text-[12.5px] shadow-[0_18px_40px_-24px_rgba(30,42,68,0.35)]">
                <p className="flex items-center gap-2 border-b border-[#E3E5EA] bg-[#FAFAFB] px-3 py-2 text-xs text-[#5E6678]">
                  <span aria-hidden className="inline-block h-3.5 w-3.5 rounded-[3px] bg-[#1E8E4E]" />
                  振り返りシート（Googleスプレッドシート）
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-left">
                    <thead>
                      <tr>
                        {["日付", "やってみたこと", "気づき", "片山からのひとこと"].map((h) => (
                          <th key={h} className="border border-[#E6E8EC] bg-[#F3F4F6] px-2.5 py-2 text-[11.5px] font-bold text-[#4A5262]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {KATARIAI_SHEET_ROWS.map((r) => (
                        <tr key={r.date} className="align-top">
                          <td className="whitespace-nowrap border border-[#E6E8EC] px-2.5 py-2 text-[#5E6678]">{r.date}</td>
                          <td className="border border-[#E6E8EC] px-2.5 py-2">{r.tried}</td>
                          <td className="border border-[#E6E8EC] px-2.5 py-2">{r.noticed}</td>
                          <td className="border border-[#E6E8EC] bg-[#FBF8F1] px-2.5 py-2">{r.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="mt-3 text-[12.5px] text-[#5E6678]">
                振り返りは、共有のスプレッドシートに積み上げていきます。3か月後に見返すと、自分の変化が目で見えます。（記入例）
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 伴走の形 */}
      <section className={`bg-white ${SECTION}`}>
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className={H2}>
            そのために、
            <br />
            3つの形で伴走します
          </h2>
          <div className="border-t border-[#E2DFD7] md:grid md:grid-cols-3 md:gap-9 md:border-t-0">
            {KATARIAI_SUPPORTS.map((s) => (
              <div key={s.title} className="border-b border-[#E2DFD7] py-5 md:border-b-0 md:border-t md:border-t-[#1E2A44]">
                <h3 className="mb-2 text-[17px] font-bold text-[#1E2A44]">{s.title}</h3>
                <p className="text-[15px] text-[#5E6678]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 耳の痛いこと */}
      <section className={`bg-[#EFF2F5] ${SECTION}`}>
        <div className="mx-auto max-w-[700px] px-5 md:px-8">
          <span aria-hidden className="mb-6 block h-px w-10 bg-[#9C7A3C]" />
          <blockquote className="font-serif-jp text-[22px] font-extrabold leading-[1.75] text-[#1E2A44] md:text-3xl">
            やさしく聞くだけでは、終わりません。
            <br />
            必要なときは、耳の痛いことも言います。
          </blockquote>
          <p className="mt-6 text-[#5E6678]">
            同じ会社の人には言いにくいことも、利害関係のない社外の相手だから伝えられます。
          </p>
        </div>
      </section>

      {/* お相手 */}
      <section className={`bg-white ${SECTION}`}>
        <div className="mx-auto grid max-w-5xl items-center gap-7 px-5 md:grid-cols-[220px_1fr] md:gap-14 md:px-8">
          <div className="relative aspect-[4/5] w-48 overflow-hidden bg-[#ECEAE4] md:w-full">
            <Image src="/images/profile.png" alt={REPRESENTATIVE_NAME} fill sizes="220px" className="object-cover object-top" />
          </div>
          <div>
            <h3 className="font-serif-jp text-2xl font-extrabold tracking-[0.06em] text-[#1E2A44]">{REPRESENTATIVE_NAME}</h3>
            <p className="mb-4 text-sm text-[#5E6678]">ミラゲル代表／管理職の伴走者</p>
            <ul className="mb-4 flex flex-wrap gap-2">
              {KATARIAI_FACTS.map((f) => (
                <li key={f} className="border border-[#E8DEC8] px-3 py-0.5 text-[13px] text-[#6E5526]">
                  {f}
                </li>
              ))}
            </ul>
            <p className="leading-[1.95] text-[#1E2A44]">
              店長として現場を回していたころ、一番助けになったのは、気軽に相談できる同期や後輩の存在でした。こんどは私が、あなたのその相手になります。理論だけの一般論ではなく、現場で動いてきた経験からお話しします。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
