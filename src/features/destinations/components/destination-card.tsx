"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AppImage } from "@/src/shared/components/app-image";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, ArrowRight } from "lucide-react";
import type { ApiDestination } from "@/src/features/destinations/api/get-popular-destinations";

interface DestinationCardProps {
  destination: ApiDestination;
  variant?: "home" | "page";
}

export function DestinationCard({ destination, variant = "home" }: DestinationCardProps) {
  const locale = useLocale();
  const t = useTranslations("DestinationsPage.card");

  const isPage = variant === "page";

  return (
    <Link
      href={`/trips?destinationId=${destination.id}`}
      className="group block select-none h-full w-full"
      draggable={false}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`relative flex w-full flex-col overflow-hidden bg-white isolate transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)] shadow-[0_8px_24px_-6px_rgba(16,24,40,0.08)] transition-all duration-300 hover:shadow-[0_20px_40px_-8px_rgba(16,24,40,0.18)] ${
          isPage
            ? "h-[300px] sm:h-[340px] lg:h-[380px] rounded-[26px]"
            : "h-[240px] sm:h-[260px] lg:h-[280px] rounded-[24px]"
        }`}
      >
        {/* Image */}
        <div
          className={`absolute inset-x-0 top-0 z-0 overflow-hidden bg-gray-100 ${
            isPage ? "bottom-[42px]" : "bottom-[32px]"
          }`}
        >
          <AppImage
            src={destination.imageUrl}
            alt={destination.name}
            fill
            draggable={false}
            sizes={
              isPage
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* ─── White Bottom Drawer: Flush bottom, seamless pure white base ─── */}
        <div
          className={`absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-between bg-white text-center transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${
            isPage
              ? "rounded-t-[26px] px-3 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-5 translate-y-[calc(100%-62px)] sm:translate-y-[calc(100%-68px)]"
              : "rounded-t-[24px] px-2.5 sm:px-5 pt-3.5 sm:pt-5 pb-4 sm:pb-5 translate-y-[calc(100%-54px)] sm:translate-y-[calc(100%-62px)]"
          }`}
        >
          {/* Destination Name + Location Pin */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 min-h-[26px] sm:min-h-[28px] w-full px-1">
            <MapPin
              className={`shrink-0 text-[#F36F21] ${
                isPage ? "size-4 sm:size-5.5" : "size-3.5 sm:size-5"
              }`}
            />
            <h3
              className={`truncate font-extrabold text-[#0F2942] transition-colors duration-200 group-hover:text-[#F36F21] ${
                isPage
                  ? "text-base sm:text-xl lg:text-[22px]"
                  : "text-sm sm:text-[17px]"
              }`}
            >
              {destination.name.trim()}
            </h3>
          </div>

          {/* Clean Arrow / Explore Tours Link: Revealed as panel slides up */}
          <div
            className={`flex items-center justify-center gap-1.5 text-[#F36F21] transition-all duration-400 ease-out opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 ${
              isPage
                ? "mt-2.5 sm:mt-3 text-xs sm:text-sm font-bold group-hover:translate-x-1"
                : "mt-2 sm:mt-3 size-8 sm:size-9 rounded-full group-hover:translate-x-1"
            }`}
          >
            {isPage && <span>{t("exploreTours")}</span>}
            <ArrowRight size={isPage ? 18 : 20} strokeWidth={2.4} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
