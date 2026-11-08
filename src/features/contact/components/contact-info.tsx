"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

// Contact info animations
const infoContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const infoCardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const contactItems = [
  {
    id: "contact-location",
    key: "location",
    icon: MapPin,
    value: "",
    href: undefined,
  },
  {
    id: "contact-phone",
    key: "phone",
    icon: Phone,
    value: "+201093943595",
    href: "tel:+201093943595",
  },
  {
    id: "contact-email",
    key: "email",
    icon: Mail,
    value: "info@sunnyside-tours.com",
    href: "mailto:info@sunnyside-tours.com",
  },
] as const;

export function ContactInfo() {
  const t = useTranslations("ContactPage.info");

  return (
    <motion.div
      variants={infoContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#E5E7EB]">
        {contactItems.map(({ id, key, icon: Icon, value, href }) => {
          const displayValue = key === "location" ? t("location.value") : value;

          return (
            <motion.div
              key={id}
              id={id}
              variants={infoCardVariants}
              className="flex items-start gap-3 md:px-8 first:md:pl-0 last:md:pr-0"
            >
              {/* Icon circle */}
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#E8F4F9]">
                <Icon size={18} className="text-[#003A5A]" strokeWidth={2} />
              </div>
              {/* Text */}
              <div>
                <p className="text-sm font-bold text-[#003A5A]">
                  {t(`${key}.label`)}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="mt-0.5 text-sm leading-[160%] text-[#6B7280] transition-colors hover:text-[#003A5A]"
                  >
                    {displayValue}
                  </a>
                ) : (
                  <p className="mt-0.5 text-sm leading-[160%] text-[#6B7280]">
                    {displayValue}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
