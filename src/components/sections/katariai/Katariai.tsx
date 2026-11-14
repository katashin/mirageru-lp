import { KatariaiTop } from "./KatariaiTop";
import { KatariaiBody } from "./KatariaiBody";
import { KatariaiApply } from "./KatariaiApply";

/** 個人向けタブの中身（カタリアイ） */
export function Katariai() {
  return (
    <div className="text-[#1E2A44]">
      <KatariaiTop />
      <KatariaiBody />
      <KatariaiApply />
    </div>
  );
}
