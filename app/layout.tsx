import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ねこ日和｜ひとりで行ける猫カフェ案内",
  description: "ひとり客目線で選ぶ、猫にも人にもやさしい猫カフェ案内。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
