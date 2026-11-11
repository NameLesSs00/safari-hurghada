"use client";

import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  MoreHorizontal,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { TopHeaderBar } from "./top-header-bar";

import { navItems } from "@/src/features/layout/constants/navigation";
import { CartIcon } from "@/src/shared/components/icons";
import { useCartStore } from "@/src/store/use-cart-store";
import { useSavedTripsStore } from "@/src/store/use-saved-trips-store";
import { useDestinationsQuery } from "@/src/features/categories/api/get-destinations";
import { locales, type AppLocale } from "@/src/i18n/locales";

const LANGUAGE_INFO: Record<
  AppLocale,
  { labelKey: "english" | "french" | "german" | "polish"; flagUrl: string; code: string }
> = {
  en: { labelKey: "english", flagUrl: "https://flagcdn.com/gb.svg", code: "EN" },
  // fr: { labelKey: "french",  flagUrl: "https://flagcdn.com/fr.svg", code: "FR" },
  // de: { labelKey: "german",  flagUrl: "https://flagcdn.com/de.svg", code: "DE" },
  // pl: { labelKey: "polish",  flagUrl: "https://flagcdn.com/pl.svg", code: "PL" },
};

// Resilient default destinations in case API is offline or loading
const DEFAULT_DESTINATIONS = [
  { id: 2, name: "Hurghada" },
  { id: 5, name: "Cairo" },
  { id: 6, name: "Luxor" },
  { id: 4, name: "Aswan" },
  { id: 3, name: "Giza" },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"destinations" | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as AppLocale;
  const headerT = useTranslations("Header");
  const navT = useTranslations("Navigation");
  const localeT = useTranslations("LocaleSwitcher");
  const cartItemsCount = useCartStore((state) => state.items.length);
  const savedTripsCount = useSavedTripsStore((state) => state.savedTripIds.length);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track window scroll to elevate sticky header with shadow
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch destinations for dropdown
  const { data: destinations } = useDestinationsQuery(false);
  const displayDestinations =
    destinations && destinations.length > 0 ? destinations : DEFAULT_DESTINATIONS;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function getLocalizedHref(href: string) {
    return href;
  }

  function getPathWithoutLocale(path: string) {
    return path.replace(/^\/(en|fr|de|pl)(?=\/|$)/, "") || "/";
  }

  function isActiveHref(href: string) {
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    if (href === "/") return pathWithoutLocale === "/";
    return href.startsWith("/") && pathWithoutLocale.startsWith(href);
  }

  function handleLanguageSelect(nextLocale: AppLocale) {
    if (nextLocale === locale) {
      setLangDropdownOpen(false);
      return;
    }
    const pathWithoutLocale = getPathWithoutLocale(pathname);
    const query = window.location.search;
    router.push(`/${nextLocale}${pathWithoutLocale}${query}`);
    setLangDropdownOpen(false);
  }

  function getLanguageName(targetLocale: AppLocale) {
    return localeT(LANGUAGE_INFO[targetLocale].labelKey);
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-200 ${
        isScrolled
          ? "border-b border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          : "border-b border-gray-100"
      }`}
    >
      {/* Desktop TopBar with Address, Phone, Email & Social Icons (hidden on mobile) */}
      <TopHeaderBar />

      <div className="mx-auto flex h-[72px] w-full max-w-[1340px] items-center justify-between px-4 sm:px-6 lg:h-[80px] lg:px-8">
        {/* Logo */}
        <Link
          href={getLocalizedHref("/")}
          className="flex shrink-0 items-center transition-transform hover:scale-[1.01] active:scale-98"
          aria-label={headerT("logoHome")}
        >
          <Image
            src="/Logo.png"
            alt="Safari Hurghada"
            width={180}
            height={50}
            priority
            unoptimized
            className="h-auto w-[140px] sm:w-[160px] lg:w-[175px]"
          />
        </Link>

        {/* Desktop Primary Navigation */}
        <nav
          className="hidden items-center gap-6 xl:gap-8 lg:flex"
          aria-label="Primary"
          ref={dropdownRef}
        >
          {navItems.map((item) => {
            const isActive = isActiveHref(item.href);
            const isMenuOpen = activeDropdown === item.menuType;

            if (item.hasMenu) {
              return (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown((prev) =>
                        prev === item.menuType ? null : (item.menuType ?? null)
                      )
                    }
                    className={`group relative flex h-14 items-center gap-1.5 text-[15px] xl:text-[16px] font-semibold transition-colors ${
                      isActive || isMenuOpen
                        ? "text-[#F36F21]"
                        : "text-[#374151] hover:text-[#1E232A]"
                    }`}
                  >
                    <span>{navT(item.labelKey)}</span>
                    <ChevronDown
                      size={16}
                      strokeWidth={2.4}
                      className={`text-[#6B7280] transition-transform duration-200 ${
                        isMenuOpen ? "rotate-180 text-[#F36F21]" : "group-hover:text-[#1E232A]"
                      }`}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="activeNavUnderline"
                        className="absolute bottom-1 left-0 h-[2.5px] w-full rounded-full bg-[#84CC16]"
                      />
                    )}
                  </button>

                  {/* Destinations Dropdown Card */}
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_12px_36px_rgba(15,23,42,0.1)] z-50"
                      >
                        <Link
                          href={getLocalizedHref("/destinations")}
                          className="flex items-center justify-between rounded-xl bg-orange-50/70 px-3.5 py-2.5 text-sm font-bold text-[#F36F21] transition-colors hover:bg-orange-100/70"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span>{navT("allDestinations")}</span>
                          <span className="text-base leading-none">&rarr;</span>
                        </Link>
                        <div className="my-1.5 h-px bg-gray-100" />
                        <div className="flex flex-col gap-0.5">
                          {displayDestinations.map((dest) => (
                            <Link
                              key={dest.id}
                              href={getLocalizedHref(`/trips?destinationId=${dest.id}`)}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex items-center justify-between rounded-xl px-3.5 py-2 text-sm font-medium text-[#374151] transition-all hover:bg-orange-50/60 hover:text-[#F36F21]"
                            >
                              <span className="flex items-center gap-2">
                                <MapPin
                                  size={14}
                                  className="text-gray-400 transition-colors group-hover:text-[#F36F21]"
                                />
                                <span>{dest.name.trim()}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={getLocalizedHref(item.href)}
                className={`group relative flex h-14 items-center text-[15px] xl:text-[16px] font-semibold transition-colors ${
                  isActive
                    ? "text-[#F36F21]"
                    : "text-[#374151] hover:text-[#1E232A]"
                }`}
              >
                <span>{navT(item.labelKey)}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-1 left-0 h-[2.5px] w-full rounded-full bg-[#84CC16]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Cluster */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3.5">
          {/* Language Switcher Pill (Temporarily hidden for English-only mode) */}
          {/*
          <div className="relative" ref={langDropdownRef}>
            <button
              className="flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 text-[#1E232A] shadow-xs transition hover:border-gray-300 hover:bg-gray-50/60 sm:px-3.5 cursor-pointer"
              type="button"
              aria-expanded={langDropdownOpen}
              aria-label={localeT("label")}
              onClick={() => setLangDropdownOpen((prev) => !prev)}
            >
              <img
                src={LANGUAGE_INFO[locale].flagUrl}
                alt={getLanguageName(locale)}
                className="h-4 w-5 shrink-0 rounded-[3px] object-cover shadow-xs"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E232A]">
                {LANGUAGE_INFO[locale].code}
              </span>
              <ChevronDown
                size={14}
                strokeWidth={2.4}
                className={`text-[#6B7280] transition-transform duration-200 ${
                  langDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-[0_12px_36px_rgba(15,23,42,0.12)] z-50"
                >
                  <div className="flex flex-col gap-0.5">
                    {locales.map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => handleLanguageSelect(l)}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                          locale === l
                            ? "bg-orange-50 text-[#F36F21]"
                            : "text-[#374151] hover:bg-gray-50 hover:text-[#1E232A]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={LANGUAGE_INFO[l].flagUrl}
                            alt={getLanguageName(l)}
                            className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover shadow-xs"
                          />
                          <span>{getLanguageName(l)}</span>
                        </div>
                        {locale === l && (
                          <Check size={14} strokeWidth={2.5} className="text-[#F36F21]" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          */}

          {/* Saved Trips (Wishlist) Icon Pill */}
          <Link
            href={getLocalizedHref("/saved-trips")}
            className="relative grid size-10 place-items-center rounded-full border border-gray-200 bg-white text-[#1E232A] shadow-xs transition hover:border-gray-300 hover:bg-gray-50/60 active:scale-95"
            aria-label={headerT("openSavedTrips")}
          >
            <Heart
              className={`size-5 transition-colors ${
                mounted && savedTripsCount > 0
                  ? "fill-[#F36F21] text-[#F36F21]"
                  : "text-[#1E232A] fill-none stroke-[2]"
              }`}
            />
            <AnimatePresence>
              {mounted && savedTripsCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F36F21] text-[11px] font-bold text-white shadow-xs"
                >
                  {savedTripsCount}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Cart Icon Pill */}
          <Link
            href={getLocalizedHref("/cart")}
            className="relative grid size-10 place-items-center rounded-full border border-gray-200 bg-white text-[#1E232A] shadow-xs transition hover:border-gray-300 hover:bg-gray-50/60 active:scale-95"
            aria-label={headerT("openCart")}
          >
            <CartIcon className="size-5" />
            <AnimatePresence>
              {cartItemsCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F36F21] text-[11px] font-bold text-white shadow-xs"
                >
                  {cartItemsCount}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Plan My Trip Button (Desktop - matching Mockup 1) */}
          <Link
            href={getLocalizedHref("/trips")}
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-[#F36F21] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#df5d10] hover:shadow-lg active:scale-95"
          >
            <span>{headerT("planMyTrip")}</span>
            <ArrowRight size={16} strokeWidth={2.4} />
          </Link>

          {/* Mobile Menu Toggle (matching Mockup 2: MENU •••) */}
          <button
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-bold text-[#1E232A] transition hover:bg-gray-100 lg:hidden cursor-pointer"
            type="button"
            aria-label={isOpen ? headerT("closeMenu") : headerT("openMenu")}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="text-sm font-bold tracking-wider">{headerT("menu")}</span>
            {isOpen ? (
              <X size={20} />
            ) : (
              <MoreHorizontal size={22} className="text-[#1E232A]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden shadow-lg"
            aria-label="Mobile primary"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mx-auto flex max-w-[1340px] flex-col gap-1 px-5 pb-6 pt-3"
            >
              {navItems.map((item) => {
                const isActive = isActiveHref(item.href);

                if (item.hasMenu) {
                  const isMenuExpanded = mobileOpenMenu === item.menuType;
                  return (
                    <motion.div variants={itemVariants} key={item.label}>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileOpenMenu((prev) =>
                            prev === item.menuType ? null : (item.menuType ?? null)
                          )
                        }
                        className={`flex min-h-11 w-full items-center justify-between text-base font-semibold transition-colors ${
                          isActive || isMenuExpanded ? "text-[#F36F21]" : "text-[#374151]"
                        }`}
                      >
                        <span>{navT(item.labelKey)}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            isMenuExpanded ? "rotate-180 text-[#F36F21]" : "text-gray-400"
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isMenuExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="flex flex-col gap-1 overflow-hidden pl-4 pb-2"
                          >
                            <Link
                              href={getLocalizedHref("/destinations")}
                              onClick={() => setIsOpen(false)}
                              className="flex min-h-9 items-center text-sm font-bold text-[#F36F21]"
                            >
                              {navT("allDestinations")} &rarr;
                            </Link>
                            {displayDestinations.map((dest) => (
                              <Link
                                key={dest.id}
                                href={getLocalizedHref(`/trips?destinationId=${dest.id}`)}
                                onClick={() => setIsOpen(false)}
                                className="flex min-h-9 items-center gap-2 text-sm text-[#4B5563] hover:text-[#F36F21] transition-colors"
                              >
                                <MapPin size={14} className="text-gray-400" />
                                <span>{dest.name.trim()}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div variants={itemVariants} key={item.label}>
                    <Link
                      href={getLocalizedHref(item.href)}
                      onClick={() => setIsOpen(false)}
                      className={`flex min-h-11 items-center justify-between text-base font-semibold transition-colors ${
                        isActive ? "text-[#F36F21]" : "text-[#374151]"
                      }`}
                    >
                      <span>{navT(item.labelKey)}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Saved Trips Link */}
              <motion.div variants={itemVariants}>
                <Link
                  href={getLocalizedHref("/saved-trips")}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-11 items-center justify-between text-base font-semibold text-[#374151] hover:text-[#F36F21] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Heart size={18} className={mounted && savedTripsCount > 0 ? "text-[#F36F21] fill-[#F36F21]" : "text-gray-400"} />
                    <span>{headerT("openSavedTrips")}</span>
                  </span>
                  {mounted && savedTripsCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F36F21] px-1.5 text-[11px] font-bold text-white">
                      {savedTripsCount}
                    </span>
                  )}
                </Link>
              </motion.div>

              <div className="pt-3">
                <Link
                  href={getLocalizedHref("/trips")}
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F36F21] py-3 text-sm font-semibold text-white shadow-md active:scale-98 transition-transform"
                >
                  <CalendarCheck size={16} strokeWidth={2.3} />
                  <span>{headerT("bookNow")}</span>
                </Link>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
