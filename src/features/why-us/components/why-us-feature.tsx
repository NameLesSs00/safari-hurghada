"use client";

import { motion } from "framer-motion";
import type { WhyUsFeatureItem } from "@/src/features/why-us/data/why-us-features";

interface WhyUsFeatureProps {
  feature: WhyUsFeatureItem;
  title: string;
  description: string;
  hasLeftDivider?: boolean;
}

export function WhyUsFeature({
  feature,
  title,
  description,
  hasLeftDivider = false,
}: WhyUsFeatureProps) {
  return (
    <div
      className={`group flex flex-col items-center text-center px-4 py-2 sm:px-6 w-full ${
        hasLeftDivider ? "lg:border-l lg:border-[#E8DFD0]" : ""
      }`}
    >
      {/* Icon Circle */}
      <motion.div
        whileHover={{ y: -4, scale: 1.06 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex size-16 sm:size-[72px] items-center justify-center rounded-full transition-transform"
        style={{ backgroundColor: feature.bgCircleColor }}
      >
        <span
          className="size-7 sm:size-8 block transition-colors"
          style={{
            backgroundColor: feature.accentColor,
            maskImage: `url(${feature.iconPath})`,
            WebkitMaskImage: `url(${feature.iconPath})`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Feature Title */}
      <h3 className="mt-4 text-base sm:text-lg font-black text-[#1E232A] tracking-tight">
        {title}
      </h3>

      {/* Feature Description */}
      <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-[#64748B] max-w-[240px]">
        {description}
      </p>
    </div>
  );
}

