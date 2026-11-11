import { SITE, sameAsLinks } from "@/src/shared/config/site-config";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://safarihurghada.net/#travelagency",
    name: SITE.brand.name,
    alternateName: `${SITE.brand.name} - ${SITE.brand.tagline}`,
    description:
      "Safari Hurghada is the #1 rated tour operator in Hurghada offering VIP desert safaris, quad biking, Orange Bay Island trips, diving, and historical excursions to Luxor and Cairo.",
    url: "https://safarihurghada.net",
    telephone: SITE.contact.phones.primary,
    email: SITE.contact.emails.primary,
    priceRange: "€€",
    currenciesAccepted: "EUR, USD, GBP, EGP",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.contact.address.street,
      addressLocality: SITE.contact.address.city,
      addressRegion: SITE.contact.address.region,
      addressCountry: SITE.contact.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.contact.geo.latitude,
      longitude: SITE.contact.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Hurghada" },
      { "@type": "City", name: "El Gouna" },
      { "@type": "City", name: "Makadi Bay" },
      { "@type": "City", name: "Sahl Hasheesh" },
      { "@type": "City", name: "Soma Bay" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.contact.phones.primary,
        email: SITE.contact.emails.primary,
        contactType: "customer service",
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.contact.phones.secondary,
        email: SITE.contact.emails.secondary,
        contactType: "reservations",
      },
    ],
    sameAs: sameAsLinks,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "850",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function TouristTripJsonLd({
  name,
  description,
  price,
  currency = "EUR",
  imageUrl,
  url,
}: {
  name: string;
  description: string;
  price?: number;
  currency?: string;
  imageUrl?: string;
  url: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description: description.replace(/<[^>]+>/g, "").slice(0, 250),
    url,
    image: imageUrl,
    provider: {
      "@type": "TravelAgency",
      name: SITE.brand.name,
      url: "https://safarihurghada.net",
      telephone: SITE.contact.phones.primary,
    },
    offers: price
      ? {
          "@type": "Offer",
          price: price.toString(),
          priceCurrency: currency,
          availability: "https://schema.org/InStock",
          url,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
