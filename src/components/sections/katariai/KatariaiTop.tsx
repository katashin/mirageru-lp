import { CTAButton } from "@/components/CTAButton";
import { KATARIAI_APPLY_LABEL, KATARIAI_FUTURE, KATARIAI_LINE_URL } from "@/lib/katariai";

/** カタリアイの最初の画面：「一人で、抱えるな。」と、3か月後のあなた */
export function KatariaiTop() {
  return (
    <section className="border-b border-[#E2DFD7] bg-[#F7F5F0] py-12 md:py-24">
      <div className="mx-auto grid max-w-5xl gap-11 px-5 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:px-8">
        <div>
          <p className="mb-4 flex flex-wrap items-center gap-x-3 text-sm text-[#5E6678]">
            <span className="whitespace-nowrap font-serif-jp text-[17px] font-extrabold tracking-[0.08em] text-[#9C7A3C]">
              カタリアイ
            </span>
            管理職・リーダーのための語り合い
          </p>
          <h2 className="mb-6 font-serif-jp text-[46px] font-extrabold leading-[1.2] tracking-[0.04em] text-[#1E2A44] md:text-[76px]">
            一人で、
            <br />
            抱えるな。
          </h2>
          <p className="mb-8 max-w-[27em] leading-[1.95] text-[#1E2A44]">
            マネジメントの孤独と不安を、本音で語り合い、自信に変えていく場所です。利害関係のない社外の相手として、話を聞くだけでなく、必要なときは言うべきことも言います。
          </p>
          <CTAButton
            place="katariai_hero"
            href={KATARIAI_LINE_URL}
            label={KATARIAI_APPLY_LABEL}
            tone="navy"
            className="w-full whitespace-nowrap rounded-md px-5 md:w-auto md:px-8"
          />
          <p className="mt-3 text-[13px] text-[#5E6678]">
            LINEで申し込み。売り込みはしません。合わなければ、そこで終わりで大丈夫です。
          </p>
        </div>

        <aside
          aria-label="語り合いの先にある姿"
          className="border border-t-[3px] border-[#E2DFD7] border-t-[#9C7A3C] bg-white px-6 pb-5 pt-7"
        >
          <h3 className="font-serif-jp text-[19px] font-extrabold leading-normal text-[#1E2A44]">
            語り合いの先にある、
            <br />
            3か月後のあなた
          </h3>
          <p className="mb-3 text-[13px] text-[#5E6678]">カタリアイが一緒にめざす姿です</p>
          <ul>
            {KATARIAI_FUTURE.map((f) => (
              <li key={f.title} className="relative border-t border-[#E2DFD7] py-3 pl-8 text-[15.5px] leading-relaxed text-[#1E2A44]">
                <span
                  aria-hidden
                  className="absolute left-1 top-[1.3rem] h-[7px] w-3 -rotate-45 border-b-2 border-l-2 border-[#9C7A3C]"
                />
                {f.title}
                <span className="block text-[12.5px] text-[#5E6678]">{f.sub}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
