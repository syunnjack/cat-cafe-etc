import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { jaDate, photoPath, sortedEntries } from "./entries";

const url = "https://petbiyori.net/diary";
const title = "訪問日記｜ペット日和";
const description = "実際に行って撮った写真と、その日のこと。猫カフェ・ドッグカフェの訪問記録です。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
};

export default function DiaryIndex() {
  const list = sortedEntries();

  // 1本も無いうちは出さない。空の一覧を公開しても読む人に何も渡らない。
  if (list.length === 0) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "訪問日記",
    url,
    description,
    inLanguage: "ja",
    blogPost: list.map((e) => ({
      "@type": "BlogPosting",
      headline: e.title,
      datePublished: e.date,
      url: `${url}/${e.slug}`,
    })),
  };

  return (
    <main className="diary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="diary-head">
        <p className="eyebrow">VISIT DIARY</p>
        <h1>訪問日記</h1>
        <p>
          実際に行って撮った写真と、その日のことを書いています。
          店舗一覧の写真はイメージですが、ここに出てくる写真はすべて訪問時に撮ったものです。
        </p>
        <nav className="diary-back">
          <a href="/cat-cafe">猫カフェ案内へ</a>
          <a href="/dog-cafe">ドッグカフェ案内へ</a>
        </nav>
      </header>

      <ul className="diary-list">
        {list.map((e) => (
          <li key={e.slug}>
            <a href={`/diary/${e.slug}`}>
              {e.photos[0] && (
                <span
                  className="diary-thumb"
                  style={{ backgroundImage: `url(${photoPath(e, e.photos[0])})` }}
                  role="img"
                  aria-label={e.photos[0].alt}
                />
              )}
              <span className="diary-text">
                <small>
                  {jaDate(e.date)} ・ {e.area} ・ {e.shop}
                </small>
                <strong>{e.title}</strong>
                <span>{e.lead}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <footer className="diary-foot">
        <p>写真はすべて訪問時に撮影したものです。店内の撮影は各店のルールに従っています。</p>
        <p>
          料金と営業時間は変わります。来店前に各店の公式サイトでご確認ください。
          店舗の一覧は <a href="/cat-cafe">猫カフェ案内</a> と{" "}
          <a href="/dog-cafe">ドッグカフェ案内</a> にあります。
        </p>
      </footer>
    </main>
  );
}
