import type { Note } from "@/lib/note";
import { SITE_URL, X_URL } from "@/lib/constants";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "片山 真介",
      jobTitle: "業務標準化・リーダー育成 伴走支援コンサルタント",
      description:
        "ニトリで培った業務標準化スキルとコーチングで、店舗ビジネス・スモールビジネスの自走組織化を支援。",
      url: SITE_URL,
      sameAs: [X_URL],
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "業務標準化・リーダー育成 伴走支援",
      provider: { "@id": `${SITE_URL}/#person` },
      description:
        "店舗ビジネス・個人事業主・スモールビジネスオーナーの業務標準化とリーダー育成を伴走支援。マニュアル作成から後任育成まで完遂。",
      areaServed: "JP",
      serviceType: "BusinessConsulting",
      url: SITE_URL,
    },
  ],
};

export function articleJsonLd(note: Note) {
  const url = `${SITE_URL}/note/${note.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.description,
    datePublished: note.date,
    dateModified: note.updated ?? note.date,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    keywords: note.keyword,
    articleSection: note.theme,
    inLanguage: "ja",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

export function breadcrumbJsonLd(note: Note) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ミラゲル", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "現場ノート", item: `${SITE_URL}/note` },
      { "@type": "ListItem", position: 3, name: note.title, item: `${SITE_URL}/note/${note.slug}` },
    ],
  };
}
