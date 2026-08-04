import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ペット日和｜ひとりで行ける猫カフェ・ドッグカフェ案内",
  description: "猫派と犬派を切り替えて探せる、ひとり客目線のペットカフェ案内。",
  metadataBase: new URL("https://nekobiyori-cafe-guide.syunnjack.chatgpt.site"),
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><head><script async src="https://www.googletagmanager.com/gtag/js?id=G-4KHX7E80KP"></script><script dangerouslySetInnerHTML={{__html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4KHX7E80KP');`}} /></head><body>{children}</body></html>;
}
