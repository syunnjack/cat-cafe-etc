import type { MetadataRoute } from "next";
import { sortedEntries } from "./diary/entries";

// URL の末尾にスラッシュを付けないこと。
// このサイトは /cat-cafe/ を /cat-cafe へ308リダイレクトする設定なので、
// スラッシュ付きを載せると「インデックスしてほしい URL がリダイレクトする」状態になる。
export default function sitemap(): MetadataRoute.Sitemap {
  const base="https://petbiyori.net";
  const pages: MetadataRoute.Sitemap=[
    {url:`${base}/`,changeFrequency:"monthly",priority:1},
    {url:`${base}/cat-cafe`,changeFrequency:"weekly",priority:.9},
    {url:`${base}/dog-cafe`,changeFrequency:"weekly",priority:.9},
  ];
  // 日記は1本でも書いてから載せる。空の一覧を出しても読む人に何も渡らない。
  const diary=sortedEntries();
  if(diary.length>0){
    pages.push({url:`${base}/diary`,changeFrequency:"weekly",priority:.8});
    for(const e of diary) pages.push({url:`${base}/diary/${e.slug}`,lastModified:e.date,changeFrequency:"yearly",priority:.7});
  }
  return pages;
}
