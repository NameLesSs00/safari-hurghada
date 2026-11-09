export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://safarihurghada.net/#travelagency",
    name: "Safari Hurghada",
    alternateName: "Safari Hurghada - Excursions & Desert Tours",
    description:
      "Safari Hurghada is the #1 rated tour operator in Hurghada offering VIP desert safaris, quad biking, Orange Bay Island trips, diving, and historical excursions to Luxor and Cairo.",
    url: "https://safarihurghada.net",
    telephone: "+201099466832",
    email: "Safariihurghada@gmail.com",
    priceRange: "€€",
    currenciesAccepted: "EUR, USD, GBP, EGP",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Kawthar Omar Ibn AlKhattab Street Building 136",
      addressLocality: "Hurghada",
      addressRegion: "Red Sea",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.1852,
      longitude: 33.8248,
    },
    areaServed: [
      { "@type": "City", name: "Hurghada" },
      { "@type": "City", name: "El Gouna" },
      { "@type": "City", name: "Makadi Bay" },
      { "@type": "City", name: "Sahl Hasheesh" },
      { "@type": "City", name: "Soma Bay" },
    ],
    sameAs: [
      "https://www.facebook.com/SafariHurghada/",
      "https://www.instagram.com/safarihurghada/",
      "https://www.tripadvisor.com/Attraction_Review-g297549-d25306692-Reviews-Safari_Hurghada-Hurghada_Red_Sea_and_Sinai.html",
      "https://share.google/OtOGSX2dOLonmufyR",
    ],
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
      name: "Safari Hurghada",
      url: "https://safarihurghada.net",
      telephone: "+201099466832",
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
