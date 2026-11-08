"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, Phone, Mail } from "lucide-react";

import { useTripTypesQuery } from "@/src/features/categories/api/get-trip-types";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/src/shared/components/icons";
import type { AppLocale } from "@/src/i18n/locales";

export function Footer() {
  const locale = useLocale() as AppLocale;
  const footerT = useTranslations("Footer");
  const navT = useTranslations("Navigation");
  const { data: tripTypes } = useTripTypesQuery();

  function getLocalizedHref(href: string) {
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
  }

  // Quick navigation items
  const quickLinks = [
    { label: navT("home"), href: "/" },
    { label: navT("trips"), href: "/trips" },
    { label: navT("destinations"), href: "/Destinations" },
    { label: navT("blogs"), href: "/blogs" },
    { label: navT("faq"), href: "/faq" },
    { label: navT("contact"), href: "/contact-us" },
  ];

  // Default fallback trip categories
  const defaultCategories = [
    { id: 5, name: "Desert Safari" },
    { id: 4, name: "Sea Trips" },
    { id: 4, name: "Snorkeling" },
    { id: 10, name: "Scuba Diving" },
    { id: 12, name: "Water Sports" },
    { id: 6, name: "Historical Tours" },
  ];

  const categoriesToDisplay =
    tripTypes && tripTypes.length > 0
      ? tripTypes.slice(0, 6).map((cat) => ({ id: cat.id, name: cat.name.trim() }))
      : defaultCategories;

  return (
    <footer className="relative w-full overflow-hidden" style={{ backgroundColor: "#13171D" }}>
      {/* Top Dual-Wave Transition Ribbon (bridges smoothly from #F9FAF4 with zero seams) */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none">
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-24 md:h-28 lg:h-36 block"
        >
          {/* Base: Solid Dark Footer #13171D covers full background */}
          <rect width="1440" height="140" fill="#13171D" />

          {/* Cyan Layer: swells thicker on the right side */}
          <path
            d="M0 0H1440V66C1280 82 1120 44 940 66C760 88 580 36 360 72C220 92 100 56 0 54V0Z"
            fill="#00A3C4"
          />

          {/* Orange Layer: swells bold & thick on the left wave */}
          <path
            d="M0 0H1440V34C1280 54 1120 22 940 48C760 74 580 24 360 60C220 80 100 46 0 44V0Z"
            fill="#F36F21"
          />

          {/* Cream Top Layer: seamlessly matches FAQ section background #F9FAF4 */}
          <path
            d="M0 0H1440V22C1280 42 1120 12 940 36C760 62 580 6 360 36C220 54 100 24 0 22V0Z"
            fill="#F9FAF4"
          />
        </svg>
      </div>

      {/* Desert Camels & Palm Silhouette (FooterImage.svg) positioned up in the mid-right */}
      <div className="absolute right-0 bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-36 w-[300px] sm:w-[420px] lg:w-[500px] pointer-events-none select-none z-0 opacity-25 sm:opacity-35">
        <Image
          src="/FooterImage.svg"
          alt=""
          width={500}
          height={188}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-10 pt-4 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Column 1: Brand Logo, Description & Socials */}
          <div className="flex flex-col lg:col-span-4 xl:col-span-4 lg:border-r border-white/10 lg:pr-8">
            <Link href={getLocalizedHref("/")} className="inline-block">
              <Image
                src="/Logo_white.png"
                alt="SunnySide Tours"
                width={220}
                height={52}
                className="h-auto w-[180px] sm:w-[210px] select-none"
                priority={false}
              />
            </Link>

            <p className="mt-4 mb-6 text-sm sm:text-[14.5px] font-normal leading-relaxed text-slate-300 max-w-[340px]">
              {footerT("companyDescription")}
            </p>

            {/* Circular Social Buttons */}
            <div className="flex items-center gap-2.5">
              <Link
                href="https://www.facebook.com/people/SunnySide-Tours/61590996990350"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="size-9 rounded-full bg-white/10 hover:bg-[#F36F21] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <FacebookIcon className="size-4" />
              </Link>

              <Link
                href="https://www.instagram.com/sunny_side_tours"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="size-9 rounded-full bg-white/10 hover:bg-[#F36F21] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <InstagramIcon className="size-4" />
              </Link>

              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="size-9 rounded-full bg-white/10 hover:bg-[#F36F21] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <YoutubeIcon className="size-4" />
              </Link>

              <Link
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="size-9 rounded-full bg-white/10 hover:bg-[#F36F21] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <TikTokIcon className="size-4" />
              </Link>

              <Link
                href="https://wa.me/201093943595"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="size-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <WhatsAppIcon className="size-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col lg:col-span-2 xl:col-span-2">
            <h3 className="font-bold text-white text-base sm:text-lg mb-4 sm:mb-5">
              {footerT("quickLinks")}
            </h3>
            <nav className="flex flex-col gap-2.5" aria-label="Quick links">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedHref(item.href)}
                  className="w-fit text-sm sm:text-[14.5px] text-slate-300 transition-colors hover:text-[#F36F21]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Trip Categories */}
          <div className="flex flex-col lg:col-span-3 xl:col-span-3">
            <h3 className="font-bold text-white text-base sm:text-lg mb-4 sm:mb-5">
              {footerT("tripCategories")}
            </h3>
            <div className="flex flex-col gap-2.5">
              {categoriesToDisplay.map((cat, idx) => (
                <Link
                  key={`${cat.id}-${idx}`}
                  href={getLocalizedHref(`/trips?tripTypeId=${cat.id}`)}
                  className="w-fit text-sm sm:text-[14.5px] text-slate-300 transition-colors hover:text-[#00A3C4]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col lg:col-span-3 xl:col-span-3">
            <h3 className="font-bold text-white text-base sm:text-lg mb-4 sm:mb-5">
              {footerT("contactUs")}
            </h3>
            <div className="flex flex-col gap-3.5">
              {/* Address */}
              <div className="flex items-center gap-3">
                <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-sm">
                  <MapPin size={15} />
                </span>
                <span className="text-sm text-slate-300">{footerT("address")}</span>
              </div>

              {/* Phone */}
              <a
                href="tel:+201093943595"
                className="group flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
              >
                <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <Phone size={15} />
                </span>
                <span className="text-sm font-medium">+20 109 394 3595</span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@sunnyside-tours.com"
                className="group flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
              >
                <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <Mail size={15} />
                </span>
                <span className="text-sm">info@sunnyside-tours.com</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/201093943595"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-slate-300 transition-colors hover:text-[#25D366]"
              >
                <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <WhatsAppIcon className="size-3.5" />
                </span>
                <span className="text-sm font-semibold">{footerT("chatOnWhatsApp")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} SunnySide Tours. {footerT("allRightsReserved")}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={getLocalizedHref("/contact-us")}
              className="hover:text-white transition-colors"
            >
              {footerT("privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Dynamic Cyan Accent Wave Ribbon */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none">
        <svg
          viewBox="0 0 1440 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-4 sm:h-6 lg:h-7 block"
        >
          <path
            d="M0 24C320 28 580 8 920 10C1140 12 1320 28 1440 18V32H0V24Z"
            fill="#00A3C4"
            fillOpacity="0.85"
          />
        </svg>
      </div>
    </footer>
  );
}
