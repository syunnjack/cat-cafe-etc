/**
 * 訪問日記。実際に行って撮った写真と、その日のことを載せる。
 *
 * ── 1本足すときの手順 ──
 * 1. 写真を public/diary/<slug>/ に置く（例: public/diary/mocha-harajuku/01.jpg）
 *    スマホの写真はそのままで構いません。横幅1600pxくらいまで縮めると軽くなります。
 * 2. 下の entries に1つ足す。slug がそのままURLになります（/diary/<slug>）。
 * 3. 何もしなくても、一覧・サイトマップ・構造化データ・ヘッダーのリンクに載ります。
 *
 * 写真は必ず alt（何が写っているか）を書いてください。読み上げで使われます。
 * 料金や営業時間は書かないでください。変わったときに直せず、古い数字が残ります。
 * それらは店舗カード側が公式サイトの確認日つきで持っています。
 */

export type Photo = {
  /** public/diary/<slug>/ に置いたファイル名 */
  file: string;
  /** 何が写っているか。読み上げと、画像が出ないときの表示に使う */
  alt: string;
  /** 写真に添える一言（任意） */
  caption?: string;
};

export type Entry = {
  /** URL になる。英小文字とハイフンだけ */
  slug: string;
  /** 猫側と犬側のどちらの日記か */
  mode: "cat" | "dog";
  title: string;
  /** 訪問した日。YYYY-MM-DD */
  date: string;
  /** 店名。店舗カードに載っている店ならその表記に合わせる */
  shop: string;
  /** 店の公式サイト（任意） */
  shopUrl?: string;
  /** 都道府県 */
  area: string;
  /** 一覧と説明文に出る短い導入 */
  lead: string;
  /** 本文。1要素が1段落 */
  body: string[];
  photos: Photo[];
};

export const entries: Entry[] = [
  {
    slug: "neko-cafe-nagoya-20260919",
    mode: "cat",
    title: "ごはんの時間に居合わせた日",
    date: "2026-09-19",
    shop: "名古屋市内の猫カフェ",
    area: "愛知県",
    lead: "夕方に入ったら、ちょうど食事の時間だった。散らばっていた猫が一列に並ぶところに居合わせた。",
    body: [
      "夕方に入った。席に着いた時点では猫はばらばらで、棚の上や部屋の隅にいた。人のほうを見ない猫が多く、静かだった。",
      "しばらくすると店の方が器を並べはじめて、空気が変わった。それまで動かなかった猫が一斉に降りてきて、器の前に並ぶ。十数匹が横一列になる光景は、入った時間では見られなかったものだった。",
      "食事のあいだは猫が人を気にしない。近くに座っていても逃げないし、寄ってもこない。触れ合うより眺めるほうが向いている時間だった。",
      "終わると散っていき、また静かになった。棚の上に戻る猫、床で丸くなる猫。高い場所は猫の場所で、人は下から眺めることになる。",
      "席と猫の導線が分かれていないので、座っているとそのうち向こうから来る。自分から追いかけなくてよかった。",
      "静かに過ごしたいなら食事の時間は外したほうがいい。逆に、たくさんの猫を一度に見たい日は狙い目になる。",
    ],
    photos: [
      { file: "01.jpg", alt: "床で猫たちが器に向かって並んでいる", caption: "器が並ぶと、散らばっていた猫が集まってくる" },
      { file: "02.jpg", alt: "一列に並んで食事をする猫たち" },
      { file: "03.jpg", alt: "壁際を歩く猫と、奥で食事をする猫", caption: "食事に加わらず、離れている猫もいた" },
      { file: "04.jpg", alt: "器の前に横一列に並んだ猫たち", caption: "十数匹が一列になる" },
      { file: "05.jpg", alt: "長毛の猫が器に顔を入れている" },
      { file: "06.jpg", alt: "猫の背中に手を伸ばしている様子", caption: "食事中は人を気にしない" },
      { file: "07.jpg", alt: "座席のそばで食事をする猫たち", caption: "席と猫の導線が分かれていない" },
      { file: "08.jpg", alt: "空気清浄機のそばで食事をする猫たち" },
      { file: "09.jpg", alt: "床に並んだ器と、周りに集まった猫たち" },
      { file: "10.jpg", alt: "器に向かって並ぶ猫たちを正面から見た様子" },
      { file: "11.jpg", alt: "棚の上でくつろぐ猫たち", caption: "終われば散って、また静かになる" },
    ],
  },
];

/** 新しい順に並べる。 */
export function sortedEntries(mode?: Entry["mode"]): Entry[] {
  return entries
    .filter((e) => !mode || e.mode === mode)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function findEntry(slug: string): Entry | undefined {
  return entries.find((e) => e.slug === slug);
}

/** 写真の公開パス。 */
export function photoPath(entry: Entry, photo: Photo): string {
  return `/diary/${entry.slug}/${photo.file}`;
}

/** 2026-09-04 を 2026年9月4日 と書く。 */
export function jaDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}
