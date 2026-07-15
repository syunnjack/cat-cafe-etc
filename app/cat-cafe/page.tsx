import type { Metadata } from "next";
import { PetCafePage } from "../page";

const url = "https://nekobiyori-cafe-guide.syunnjack.chatgpt.site/cat-cafe/";
export const metadata: Metadata = {
  title: "ひとりで行ける猫カフェ案内｜猫日和",
  description: "東京・神奈川の猫カフェを、静けさ、混雑、猫との距離など、ひとり客の目線で紹介します。",
  alternates: { canonical: url },
  openGraph: { title: "ひとりで行ける猫カフェ案内｜猫日和", description: "猫にも人にもやさしい、ひとり時間のための猫カフェ案内。", url, type: "website" },
};
export default function CatCafePage(){
  const data={"@context":"https://schema.org","@type":"CollectionPage",name:"ひとりで行ける猫カフェ案内",url,description:"東京・神奈川の猫カフェをひとり客目線で紹介",about:{"@type":"Thing",name:"猫カフェ"}};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/><PetCafePage mode="cat"/></>;
}
