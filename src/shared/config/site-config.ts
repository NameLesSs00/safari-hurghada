import type { ComponentType, SVGProps } from "react";

import {
  FacebookIcon,
  InstagramIcon,
  SolidGlobeIcon,
  TripAdvisorIcon,
  WhatsAppIcon,
} from "@/src/shared/components/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface SocialLink {
  name: string;
  href: string;
  icon: IconComponent;
  hoverBg: string;
}

/**
 * Single source of truth for the WhatsApp line, in international format with
 * digits only (no "+" or spaces) so it can be dropped straight into wa.me URLs.
 */
const WHATSAPP_NUMBER = "201099466832";

/** Build a wa.me deep link, optionally prefilling a message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Build a tel: href from a phone number (keeps the leading "+"). */
export function telHref(phone: string): string {
  return `tel:${phone}`;
}

/** Build a mailto: href from an email address. */
export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}

/**
 * Central site configuration for brand, contact details and social links.
 * Values are verified against the live site (https://safarihurghada.net/).
 * Import from here instead of hardcoding URLs in components.
 */
export const SITE = {
  brand: {
    name: "Safari Hurghada",
    tagline: "Excursions & Desert Tours",
    logo: "/Logo.png",
    logoWhite: "/Logo_white.png",
  },
  contact: {
    whatsapp: WHATSAPP_NUMBER,
    phones: {
      primary: "+201099466832",
      primaryDisplay: "+20 109 946 6832",
      secondary: "+201279546106",
      secondaryDisplay: "+20 127 954 6106",
    },
    emails: {
      primary: "Safariihurghada@gmail.com",
      secondary: "Info@safarihurghada.net",
    },
    address: {
      street: "Al Kawthar Omar Ibn AlKhattab Street Building 136",
      city: "Hurghada",
      region: "Red Sea",
      country: "Egypt",
      countryCode: "EG",
      full: "Al Kawthar Omar Ibn AlKhattab Street Building 136, Hurghada, Red Sea, Egypt",
    },
    mapsUrl: "https://maps.app.goo.gl/CZ6HquhdrCaNMAMF7?g_st=aw",
    geo: {
      latitude: 27.2236544,
      longitude: 33.816576,
    },
  },
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/SafariHurghada/",
      icon: FacebookIcon,
      hoverBg: "hover:bg-[#1877F2]",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/safarihurghada/?igshid=YmMyMTA2M2Y=",
      icon: InstagramIcon,
      hoverBg: "hover:bg-[#E4405F]",
    },
    {
      name: "TripAdvisor",
      href: "https://ar.tripadvisor.com/Attraction_Review-g27118717-d34383266-Reviews-Safarihurghada-Hurghada_1_Hurghada_Red_Sea_and_Sinai.html",
      icon: TripAdvisorIcon,
      hoverBg: "hover:bg-[#00AA6C]",
    },
    {
      name: "WhatsApp",
      href: whatsappUrl(),
      icon: WhatsAppIcon,
      hoverBg: "hover:bg-[#25D366]",
    },
    {
      name: "Tour Guide Profile",
      href: "https://theguide.tab.travel/hub/qvvlf/safari-hurghada/",
      icon: SolidGlobeIcon,
      hoverBg: "hover:bg-[#F36F21]",
    },
  ] satisfies SocialLink[],
};

/** Flat list of profile URLs for SEO (schema.org `sameAs`). */
export const sameAsLinks: string[] = [
  ...SITE.social.map((link) => link.href),
  SITE.contact.mapsUrl,
];
