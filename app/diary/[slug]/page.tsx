import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { entries, findEntry, jaDate, photoPath } from "../entries";

const SITE = "https://petbiyori.net";

export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) return {};

  const url = `${SITE}/diary/${entry.slug}`;
  const title = `${entry.title}｜訪問日記｜ペット日和`;
  const image = entry.photos[0] ? `${SITE}${photoPath(entry, entry.photos[0])}` : undefined;

  return {
    title,
    description: entry.lead,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: entry.lead,
      url,
      type: "article",
      ...(image ? { images: [{ url: image, alt: entry.photos[0].alt }] } : {}),
    },
  };
}

export default async function DiaryEntry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) notFound();

  const url = `${SITE}/diary/${entry.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: entry.title,
        description: entry.lead,
        datePublished: entry.date,
        url,
        inLanguage: "ja",
        // 自分で撮った写真なので、著作者はサイト運営者になる
        image: entry.photos.map((p) => `${SITE}${photoPath(entry, p)}`),
        author: { "@type": "Organization", name: "ペット日和" },
        publisher: { "@type": "Organization", name: "ペット日和", url: SITE },
        about: { "@type": "LocalBusiness", name: entry.shop, ...(entry.shopUrl ? { url: entry.shopUrl } : {}) },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ペット日和", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "訪問日記", item: `${SITE}/diary` },
          { "@type": "ListItem", position: 3, name: entry.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className={`diary ${entry.mode}-mode`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <nav className="diary-crumbs">
        <a href="/">ペット日和</a> ＞ <a href="/diary">訪問日記</a> ＞ {entry.title}
      </nav>

      <article className="diary-entry">
        <header>
          <p className="eyebrow">VISIT DIARY</p>
          <h1>{entry.title}</h1>
          <p className="diary-meta">
            <time dateTime={entry.date}>{jaDate(entry.date)}</time> ・ {entry.area} ・{" "}
            {entry.shopUrl ? (
              <a href={entry.shopUrl} target="_blank" rel="noopener noreferrer">
                {entry.shop} ↗
              </a>
            ) : (
              entry.shop
            )}
          </p>
          <p className="diary-lead">{entry.lead}</p>
        </header>

        {entry.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        {entry.photos.length > 0 && (
          <div className="diary-photos">
            {entry.photos.map((photo) => (
              <figure key={photo.file}>
                {/* next/image を使わないのは、この写真が public/ に置いた自前の
                    ファイルで、外部ホストの許可設定（remotePatterns）が要らないため。 */}
                <img src={photoPath(entry, photo)} alt={photo.alt} loading="lazy" />
                {photo.caption && <figcaption>{photo.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        <footer className="diary-entry-foot">
          <p>
            写真はこの日に撮ったものです。店内の撮影は店のルールに従っています。
            料金と営業時間は変わるため、来店前に公式サイトでご確認ください。
          </p>
          <p>
            <a href="/diary">ほかの日記を見る</a> ／{" "}
            <a href={entry.mode === "dog" ? "/dog-cafe" : "/cat-cafe"}>
              {entry.mode === "dog" ? "ドッグカフェ案内へ" : "猫カフェ案内へ"}
            </a>
          </p>
        </footer>
      </article>
    </main>
  );
}
