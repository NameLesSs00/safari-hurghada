"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";
import { MapPin, ArrowRight } from "lucide-react";
import type { ApiDestination } from "@/src/features/destinations/api/get-popular-destinations";

interface DestinationCardProps {
  destination: ApiDestination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/trips?destinationId=${destination.id}`}
      className="group block select-none h-full w-full"
      draggable={false}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative flex h-[240px] sm:h-[260px] lg:h-[280px] w-full flex-col overflow-hidden rounded-[24px] bg-white isolate transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)] shadow-[0_8px_24px_-6px_rgba(16,24,40,0.08)] transition-all duration-300 hover:shadow-[0_18px_36px_-8px_rgba(16,24,40,0.16)]"
      >
        {/* Image: bounded safely above bottom curve so only solid white touches bottom corners */}
        <div className="absolute inset-x-0 top-0 bottom-[32px] z-0 overflow-hidden bg-gray-100">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            draggable={false}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* ─── White Bottom Drawer: Flush bottom, seamless pure white base ─── */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-between rounded-t-[24px] bg-white px-2.5 sm:px-5 pt-3.5 sm:pt-5 pb-4 sm:pb-5 text-center transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[calc(100%-54px)] sm:translate-y-[calc(100%-62px)] group-hover:translate-y-0">
          {/* Destination Name + Location Pin */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 min-h-[26px] sm:min-h-[28px] w-full px-1">
            <MapPin className="size-3.5 sm:size-5 shrink-0 text-[#F36F21]" />
            <h3 className="truncate text-sm sm:text-[17px] font-extrabold text-[#0F2942] transition-colors duration-200 group-hover:text-[#F36F21]">
              {destination.name.trim()}
            </h3>
          </div>

          {/* Clean SVG Arrow: Revealed as panel slides up */}
          <div className="mt-2 sm:mt-3 flex size-8 sm:size-9 items-center justify-center rounded-full text-[#F36F21] transition-all duration-400 ease-out opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-1">
            <ArrowRight size={20} strokeWidth={2.4} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

