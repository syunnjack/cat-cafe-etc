import type { MetadataRoute } from "next";

// URL の末尾にスラッシュを付けないこと。
// このサイトは /cat-cafe/ を /cat-cafe へ308リダイレクトする設定なので、
// スラッシュ付きを載せると「インデックスしてほしい URL がリダイレクトする」状態になる。
export default function sitemap(): MetadataRoute.Sitemap {
  const base="https://petbiyori.net";
  return [{url:`${base}/`,changeFrequency:"monthly",priority:1},{url:`${base}/cat-cafe`,changeFrequency:"weekly",priority:.9},{url:`${base}/dog-cafe`,changeFrequency:"weekly",priority:.9}];
}
