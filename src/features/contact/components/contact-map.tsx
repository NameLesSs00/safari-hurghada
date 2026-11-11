"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { SITE } from "@/src/shared/config/site-config";

const mapVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ContactMap() {
  const t = useTranslations("ContactPage.map");

  return (
    <motion.div
      variants={mapVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-xs"
    >
      <iframe
        id="contact-map"
        title={t("title")}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55271.15388997437!2d33.7844!3d27.2574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145285b0c6a9a5b1%3A0x7e74c70d0a43a6d7!2sHurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1691580000000!5m2!1sen!2seg"
        width="100%"
        height="280"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Floating Location Pill */}
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/95 px-3.5 py-1.5 shadow-md backdrop-blur-md">
        <span className="flex size-5 items-center justify-center rounded-full bg-[#F36F21] text-white">
          <MapPin size={12} />
        </span>
        <span className="text-xs font-bold text-[#1E232A]">
          {SITE.brand.name} • Hurghada, Egypt
        </span>
      </div>
    </motion.div>
  );
}
