"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

// Map animation
const mapVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } },
};

export function ContactMap() {
  const t = useTranslations("ContactPage.map");

  return (
    <motion.div
      variants={mapVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="overflow-hidden rounded-2xl border border-[#E5E7EB] shadow-sm"
    >
      <iframe
        id="contact-map"
        title={t("title")}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55271.15388997437!2d33.7844!3d27.2574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145285b0c6a9a5b1%3A0x7e74c70d0a43a6d7!2sHurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1691580000000!5m2!1sen!2seg"
        width="100%"
        height="320"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </motion.div>
  );
}
