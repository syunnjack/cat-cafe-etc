import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base="https://nekobiyori-cafe-guide.syunnjack.chatgpt.site";
  return [{url:`${base}/`,changeFrequency:"monthly",priority:1},{url:`${base}/cat-cafe/`,changeFrequency:"weekly",priority:.9},{url:`${base}/dog-cafe/`,changeFrequency:"weekly",priority:.9}];
}
