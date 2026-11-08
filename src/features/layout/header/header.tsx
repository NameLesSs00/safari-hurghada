"use client";

import { CalendarCheck, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { navItems } from "@/src/features/layout/constants/navigation";
import { CartIcon } from "@/src/shared/components/icons";
import { useCartStore } from "@/src/store/use-cart-store";
import { useDestinationsQuery } from "@/src/features/categories/api/get-destinations";
import { useTripTypesQuery } from "@/src/features/categories/api/get-trip-types";
import { locales, type AppLocale } from "@/src/i18n/locales";

const LANGUAGE_INFO: Record<
  AppLocale,
  { labelKey: "english" | "french" | "german" | "polish"; flagUrl: string; code: string }
> = {
  en: { labelKey: "english", flagUrl: "https://flagcdn.com/gb.svg", code: "EN" },
  fr: { labelKey: "french",  flagUrl: "https://flagcdn.com/fr.svg", code: "FR" },
  de: { labelKey: "german",  flagUrl: "https://flagcdn.com/de.svg", code: "DE" },
  pl: { labelKey: "polish",  flagUrl: "https://flagcdn.com/pl.svg", code: "PL" },
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"destinations" | "categories" | null>(null);
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Track window scroll to elevate sticky header with depth shadow
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch real destinations and categories for dropdowns
  const { data: destinations } = useDestinationsQuery(false);
  const { data: tripTypes } = useTripTypesQuery();

  // Close dropdown on outside click
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
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
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
      <div className="mx-auto flex h-[76px] w-full max-w-[1340px] items-center justify-between px-4 sm:px-6 lg:h-[84px] lg:px-8">
        {/* Logo */}
        <Link
          href={getLocalizedHref("/")}
          className="flex shrink-0 items-center"
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

        {/* Desktop Nav */}
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
                    className={`group relative flex h-14 items-center gap-1.5 text-[15px] xl:text-[16px] font-medium transition-colors ${
                      isActive || isMenuOpen
                        ? "text-[#1E232A]"
                        : "text-[#4B5563] hover:text-[#1E232A]"
                    }`}
                  >
                    <span>{navT(item.labelKey)}</span>
                    <ChevronDown
                      size={16}
                      strokeWidth={2.2}
                      className={`text-[#6B7280] transition-transform duration-200 ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="activeNavUnderline"
                        className="absolute bottom-1 left-0 h-[3px] w-full rounded-full bg-[#F36F21]"
                      />
                    )}
                  </button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full mt-1 w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl z-50"
                      >
                        {item.menuType === "destinations" ? (
                          <>
                            <Link
                              href={getLocalizedHref("/Destinations")}
                              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-[#F36F21] transition-colors hover:bg-orange-50"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span>{navT("allDestinations")}</span>
                              <span>&rarr;</span>
                            </Link>
                            <div className="my-1 h-px bg-gray-100" />
                            {destinations?.map((dest) => (
                              <Link
                                key={dest.id}
                                href={getLocalizedHref(`/trips?destinationId=${dest.id}`)}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-[#374151] transition-colors hover:bg-orange-50 hover:text-[#F36F21]"
                              >
                                <span>{dest.name.trim()}</span>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <>
                            <Link
                              href={getLocalizedHref("/trips")}
                              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-[#F36F21] transition-colors hover:bg-orange-50"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span>{navT("allCategories")}</span>
                              <span>&rarr;</span>
                            </Link>
                            <div className="my-1 h-px bg-gray-100" />
                            {tripTypes?.map((category) => (
                              <Link
                                key={category.id}
                                href={getLocalizedHref(`/trips?typeId=${category.id}`)}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-[#374151] transition-colors hover:bg-orange-50 hover:text-[#F36F21]"
                              >
                                <span>{category.name.trim()}</span>
                              </Link>
                            ))}
                          </>
                        )}
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
                className={`group relative flex h-14 items-center text-[15px] xl:text-[16px] font-medium transition-colors ${
                  isActive
                    ? "text-[#1E232A]"
                    : "text-[#4B5563] hover:text-[#1E232A]"
                }`}
              >
                <span>{navT(item.labelKey)}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-1 left-0 h-[3px] w-full rounded-full bg-[#F36F21]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA cluster */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3.5">
          {/* Language Switcher Pill */}
          <div className="relative" ref={langDropdownRef}>
            <button
              className="flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 text-[#1E232A] shadow-sm transition hover:border-gray-300 sm:px-3.5"
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
              <span className="text-xs font-bold uppercase tracking-wider">
                {LANGUAGE_INFO[locale].code}
              </span>
              <ChevronDown
                size={14}
                strokeWidth={2.2}
                className={`text-[#6B7280] transition-transform duration-200 ${
                  langDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl z-50"
                >
                  <div className="flex flex-col gap-0.5">
                    {locales.map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => handleLanguageSelect(l)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                          locale === l
                            ? "bg-orange-50 text-[#F36F21]"
                            : "text-[#374151] hover:bg-gray-50"
                        }`}
                      >
                        <img
                          src={LANGUAGE_INFO[l].flagUrl}
                          alt={getLanguageName(l)}
                          className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover"
                        />
                        <span>{getLanguageName(l)}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Icon */}
          <Link
            href={getLocalizedHref("/cart")}
            className="relative grid size-10 place-items-center rounded-full border border-gray-200 bg-white text-[#1E232A] shadow-sm transition hover:border-gray-300"
            aria-label={headerT("openCart")}
          >
            <CartIcon className="size-5" />
            <AnimatePresence>
              {cartItemsCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F36F21] text-[11px] font-bold text-white shadow"
                >
                  {cartItemsCount}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Book Now Button */}
          <Link
            href={getLocalizedHref("/trips")}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#F36F21] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#df5d10] hover:shadow-lg active:scale-95"
          >
            <CalendarCheck size={16} strokeWidth={2.3} />
            <span>Book Now</span>
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            className="grid size-10 place-items-center rounded-full border border-gray-200 bg-white text-[#1E232A] sm:size-10 lg:hidden"
            type="button"
            aria-label={isOpen ? headerT("closeMenu") : headerT("openMenu")}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
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
                        className={`flex min-h-11 w-full items-center justify-between text-base font-medium transition-colors ${
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
                            className="flex flex-col gap-1 overflow-hidden pl-4 pb-2"
                          >
                            {item.menuType === "destinations" ? (
                              <>
                                <Link
                                  href={getLocalizedHref("/Destinations")}
                                  onClick={() => setIsOpen(false)}
                                  className="flex min-h-9 items-center text-sm font-semibold text-[#F36F21]"
                                >
                                  {navT("allDestinations")} &rarr;
                                </Link>
                                {destinations?.map((dest) => (
                                  <Link
                                    key={dest.id}
                                    href={getLocalizedHref(`/trips?destinationId=${dest.id}`)}
                                    onClick={() => setIsOpen(false)}
                                    className="flex min-h-9 items-center text-sm text-[#4B5563]"
                                  >
                                    {dest.name.trim()}
                                  </Link>
                                ))}
                              </>
                            ) : (
                              <>
                                <Link
                                  href={getLocalizedHref("/trips")}
                                  onClick={() => setIsOpen(false)}
                                  className="flex min-h-9 items-center text-sm font-semibold text-[#F36F21]"
                                >
                                  {navT("allCategories")} &rarr;
                                </Link>
                                {tripTypes?.map((category) => (
                                  <Link
                                    key={category.id}
                                    href={getLocalizedHref(`/trips?typeId=${category.id}`)}
                                    onClick={() => setIsOpen(false)}
                                    className="flex min-h-9 items-center text-sm text-[#4B5563]"
                                  >
                                    {category.name.trim()}
                                  </Link>
                                ))}
                              </>
                            )}
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
                      className={`flex min-h-11 items-center justify-between text-base font-medium transition-colors ${
                        isActive ? "font-semibold text-[#F36F21]" : "text-[#374151]"
                      }`}
                    >
                      <span>{navT(item.labelKey)}</span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="pt-3">
                <Link
                  href={getLocalizedHref("/trips")}
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F36F21] py-3 text-sm font-semibold text-white shadow-md"
                >
                  <CalendarCheck size={16} strokeWidth={2.3} />
                  <span>Book Now</span>
                </Link>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
