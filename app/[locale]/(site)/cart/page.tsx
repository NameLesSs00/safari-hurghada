"use client";

import { useCartStore } from "@/src/store/use-cart-store";
import { CartItemCard } from "@/src/features/cart/components/cart-item-card";
import { CartSummary } from "@/src/features/cart/components/cart-summary";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { AppLocale } from "@/src/i18n/locales";

// Header animations
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } },
};

// Cart items list
const cartListVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cartItemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Summary sidebar
const summaryVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } },
};

const subscribeToCartHydration = (onStoreChange: () => void) =>
  useCartStore.persist.onFinishHydration(onStoreChange);

const getCartHydrationSnapshot = () => useCartStore.persist.hasHydrated();

const getServerCartHydrationSnapshot = () => false;

export default function CartPage() {
  const { items, removeItem } = useCartStore();
  const isCartHydrated = useSyncExternalStore(
    subscribeToCartHydration,
    getCartHydrationSnapshot,
    getServerCartHydrationSnapshot,
  );
  const router = useRouter();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CartPage");

  // Show spinner while mounting
  if (!isCartHydrated) {
    return (
      <div
        className="flex min-h-[50vh] items-center justify-center"
        role="status"
        aria-label={t("loading.label")}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#003A5A] border-t-transparent" />
      </div>
    );
  }

  // Handle empty cart
  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8 text-center min-h-[60vh]">
        <h2 className="mb-4 text-3xl font-bold text-[#003A5A]">{t("empty.title")}</h2>
        <p className="mb-8 text-gray-500 max-w-lg">{t("empty.description")}</p>
        <Link
          href={`/${locale}/trips`}
          className="rounded-full bg-[#003A5A] px-10 py-3.5 font-semibold text-white transition-colors hover:bg-[#002a42]"
        >
          {t("empty.button")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8 flex flex-col gap-1">
        <motion.h1
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="text-3xl font-bold text-[#003A5A]"
        >
          {t("header.title")}
        </motion.h1>
        <motion.p
          variants={descriptionVariants}
          initial="hidden"
          animate="show"
          className="text-gray-500"
        >
          {t("header.description")}
        </motion.p>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* Left Side: Cart Items */}
        <motion.div
          variants={cartListVariants}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col gap-4 sm:gap-6"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={cartItemVariants}>
              <CartItemCard
                item={item}
                onRemove={removeItem}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Right Side: Summary */}
        <motion.div
          variants={summaryVariants}
          initial="hidden"
          animate="show"
          className="shrink-0"
        >
          <CartSummary />
        </motion.div>
      </div>
    </div>
  );
}
