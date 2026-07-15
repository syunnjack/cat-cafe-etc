import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base="https://nekobiyori-cafe-guide.syunnjack.chatgpt.site";
  return {rules:{userAgent:"*",allow:"/"},sitemap:`${base}/sitemap.xml`};
}
