import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from "./metadata";

/* ---------- Organization ---------- */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    description: SITE_DESCRIPTION,
    sameAs: [],
  };
}

/* ---------- WebSite (with SearchAction) ---------- */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ---------- WebPage ---------- */
export function webPageJsonLd(params: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.name,
    description: params.description,
    url: params.url,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}

/* ---------- BreadcrumbList ---------- */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ---------- Craft (Product + CreativeWork) ---------- */
export function craftJsonLd(params: {
  name: string;
  description: string;
  url: string;
  image?: string | null;
  category: string;
  prefecture: string;
  city: string;
  designatedYear?: number | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: params.name,
    description: params.description,
    url: params.url,
    ...(params.image ? { image: params.image } : {}),
    category: params.category,
    brand: {
      "@type": "Brand",
      name: params.name,
    },
    countryOfOrigin: {
      "@type": "Country",
      name: "Japan",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${params.prefecture} ${params.city}`,
    },
    ...(params.designatedYear
      ? { award: `${params.designatedYear}年 経済産業大臣指定伝統的工芸品` }
      : {}),
    additionalType: "https://schema.org/CreativeWork",
  };
}

/* ---------- Article ---------- */
export function articleJsonLd(params: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    url: params.url,
    ...(params.image ? { image: params.image } : {}),
    ...(params.publishedAt ? { datePublished: params.publishedAt } : {}),
    ...(params.updatedAt ? { dateModified: params.updatedAt } : {}),
    ...(params.authorName
      ? { author: { "@type": "Person", name: params.authorName } }
      : {}),
    ...(params.tags ? { keywords: params.tags.join(", ") } : {}),
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

/* ---------- LocalBusiness ---------- */
export function localBusinessJsonLd(params: {
  name: string;
  description: string;
  url: string;
  address?: string;
  prefecture?: string;
  city?: string;
  telephone?: string;
  openingHours?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: params.name,
    description: params.description,
    url: params.url,
    ...(params.address || params.prefecture
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: params.city ?? "",
            addressRegion: params.prefecture ?? "",
            addressCountry: "JP",
            ...(params.address ? { streetAddress: params.address } : {}),
          },
        }
      : {}),
    ...(params.telephone ? { telephone: params.telephone } : {}),
    ...(params.openingHours ? { openingHours: params.openingHours } : {}),
  };
}

/* ---------- Person ---------- */
export function personJsonLd(params: {
  name: string;
  description: string;
  url: string;
  jobTitle?: string;
  worksFor?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: params.name,
    description: params.description,
    url: params.url,
    ...(params.jobTitle ? { jobTitle: params.jobTitle } : {}),
    ...(params.worksFor
      ? { worksFor: { "@type": "Organization", name: params.worksFor } }
      : {}),
    ...(params.sameAs ? { sameAs: params.sameAs } : {}),
  };
}

/* ---------- Event ---------- */
export function eventJsonLd(params: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  prefecture: string;
  city: string;
  url?: string;
  organizer?: string;
  isFree?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: params.name,
    description: params.description,
    startDate: params.startDate,
    endDate: params.endDate,
    location: {
      "@type": "Place",
      name: params.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: params.city,
        addressRegion: params.prefecture,
        addressCountry: "JP",
      },
    },
    ...(params.url ? { url: params.url } : {}),
    ...(params.organizer
      ? { organizer: { "@type": "Organization", name: params.organizer } }
      : {}),
    ...(params.isFree !== undefined
      ? { isAccessibleForFree: params.isFree }
      : {}),
  };
}

/* ---------- CollectionPage ---------- */
export function collectionPageJsonLd(params: {
  name: string;
  description: string;
  url: string;
  numberOfItems?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.name,
    description: params.description,
    url: params.url,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    ...(params.numberOfItems !== undefined
      ? { mainEntity: { "@type": "ItemList", numberOfItems: params.numberOfItems } }
      : {}),
  };
}

/* ---------- FAQPage ---------- */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
