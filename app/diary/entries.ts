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
  // ここに足していきます。
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
