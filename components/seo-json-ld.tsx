import type { ReactNode } from "react";

const SITE_URL = "https://www.indiatrollconsulting.com";
const SITE_NAME = "IndiaTroll Research & Consulting";
const LOGO_URL = `${SITE_URL}/india-troll-logo-vector.svg`;

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationJsonLd(): ReactNode {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: LOGO_URL,
        email: "info@indiatrollconsulting.com",
        telephone: "+91 7775832855",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Trident Tower, Baner",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "411057",
          addressCountry: "IN",
        },
      }}
    />
  );
}

export function WebSiteJsonLd(): ReactNode {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}): ReactNode {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}): ReactNode {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
      }}
    />
  );
}
