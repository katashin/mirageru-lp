// 個人向け「カタリアイ」の住所と文言（デザイン案：mirageru-company/.company/creative/briefs/2026-11-14-katariai-tab-design.html）

/** 公式LINE（@355adafu と同じアカウント） */
export const KATARIAI_LINE_URL = "https://lin.ee/x9hWklGy";

export const KATARIAI_COLORS = {
  ivory: "#F7F5F0",
  mist: "#EFF2F5",
  ink: "#1E2A44",
  sub: "#5E6678",
  brass: "#9C7A3C",
  brassSoft: "#E8DEC8",
  rule: "#E2DFD7",
} as const;

export const KATARIAI_APPLY_LABEL = "無料面談を申し込む（60分）";
export const KATARIAI_APPLY_NOTE = "60分・Google Meet";
export const KATARIAI_GIFT = "管理職のための支援ツール5点セット";

export const KATARIAI_FUTURE = [
  { title: "自分のマネジメントに、自分の言葉で根拠を言える", sub: "「これで合っているのか」が「これでいく」に変わる" },
  { title: "部下に伝える前に、伝え方を組み立てられる", sub: "同じことを何度も言って、強くなっていく毎日から抜け出す" },
  { title: "迷ったときに、本音で話せる相手がいる", sub: "一人で答えを出さなくていい" },
  { title: "自分のことも、後回しにしなくなる", sub: "チームのためだけでなく、自分の働き方と人生を考えられる" },
] as const;

export const KATARIAI_VOICES = [
  {
    who: "初めて部下を持った方",
    example: "新任の店長・リーダーなど",
    items: [
      "何から手をつければいいか分からない",
      "自己流のマネジメントで合っているのか不安",
      "研修は受けたけど、現場で方向が合っているか確かめられない",
      "社内のやり方が、外でも通用するのか分からない",
    ],
  },
  {
    who: "何年もチームを回してきた方",
    example: "店長・マネージャー・管理職など",
    items: [
      "社内に、本音で相談できる人がいない",
      "評価や社内の事情があって、弱みを見せられない",
      "一人で解決するのが、管理職の力だと思ってきた",
      "自分のことは、いつも後回しになっている",
    ],
  },
] as const;

export const KATARIAI_STAGES = [
  { month: "1か月目", title: "言葉にする", body: "抱えている不安や課題を、面談で一緒に整理します。モヤモヤが「何に困っているか」に変わります。" },
  { month: "2か月目", title: "試して、振り返る", body: "決めたことを現場で試し、振り返りシートに書きます。うまくいかなかったことも、次の材料になります。" },
  { month: "3か月目", title: "自分の型になる", body: "試して振り返るたびにフィードバックを重ね、あなたなりのマネジメントの型ができていきます。" },
] as const;

export const KATARIAI_SHEET_ROWS = [
  { date: "10/7", tried: "朝礼で、目標を数字で伝えた", noticed: "聞いてはいるが、動きは変わらない", comment: "数字の前に「なぜ」を1つ足してみましょう" },
  { date: "10/15", tried: "Aさんに理由から話した", noticed: "質問が返ってきた。初めて", comment: "その質問が入口です。次の面談で深めましょう" },
  { date: "10/28", tried: "任せる仕事を1つ決めた", noticed: "手を出したくなるのを我慢した", comment: "我慢できたこと自体が変化です" },
] as const;

export const KATARIAI_SUPPORTS = [
  { title: "月2回・60分の面談", body: "オンラインで腰を据えて話します。経験と本の知識から方向を示し、必要な資料もお渡しします。" },
  { title: "LINEでいつでも相談", body: "現場での気づきや不安を、そのつど送ってください。24時間以内にお返事します。" },
  { title: "振り返りシート", body: "試したこと・気づきを書きためる共有のシート。書いたことに、ひとことずつフィードバックします。" },
] as const;

export const KATARIAI_FACTS = ["ニトリ15年", "店長として120名をマネジメント", "2児の父"] as const;

export const KATARIAI_FLOW = [
  { title: "公式LINEを友だち追加", body: "下のボタンから" },
  { title: "「無料面談」と送る", body: "ひとことで大丈夫です" },
  { title: "返信を待つ", body: "確認でき次第、お返事します" },
  { title: "Google Meetで60分", body: "日程を決めて、今の悩みをそのまま話してください" },
] as const;

export const KATARIAI_FAQ = [
  { q: "料金はいくらですか？", a: "無料面談のときに、くわしくご説明します。無理におすすめすることはありません。" },
  { q: "会社に知られることはありませんか？", a: "やり取りは1対1のLINEとオンライン、共有のシートだけです。会社に連絡することはありません。" },
  { q: "業種がちがっても大丈夫ですか？", a: "大丈夫です。部下やチームとの悩みは、業種がちがっても似ています。" },
  { q: "話すのが苦手でも大丈夫ですか？", a: "大丈夫です。うまく話せなくても、こちらから質問しながら一緒に整理していきます。" },
] as const;
