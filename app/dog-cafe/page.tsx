import type { Metadata } from "next";
import { PetCafePage } from "../page";

const url = "https://petbiyori.net/dog-cafe/";
export const metadata: Metadata = {
  title: "ひとりで行けるドッグカフェ案内｜犬日和",
  description: "東京・神奈川のドッグカフェを、過ごし方、混雑、犬との距離など、ひとり客の目線で紹介します。",
  alternates: { canonical: url },
  openGraph: { title: "ひとりで行けるドッグカフェ案内｜犬日和", description: "犬にも人にもやさしい、ひとり時間のためのドッグカフェ案内。", url, type: "website" },
};
export default function DogCafePage(){
  const data={"@context":"https://schema.org","@type":"CollectionPage",name:"ひとりで行けるドッグカフェ案内",url,description:"東京・神奈川のドッグカフェをひとり客目線で紹介",about:{"@type":"Thing",name:"ドッグカフェ"}};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/><PetCafePage mode="dog"/></>;
}
