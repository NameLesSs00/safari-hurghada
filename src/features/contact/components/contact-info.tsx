"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { WhatsAppIcon } from "@/src/shared/components/icons";

const infoContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const infoCardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function ContactInfo() {
  const t = useTranslations("ContactPage.info");

  const cards = [
    {
      id: "phone",
      icon: Phone,
      iconColor: "bg-orange-50 text-[#F36F21]",
      hoverBorder: "hover:border-orange-200",
      label: t("phone.label"),
      value: "+20 109 946 6832",
      href: "tel:+201099466832",
      badge: "Instant Call",
    },
    {
      id: "whatsapp",
      icon: WhatsAppIcon,
      iconColor: "bg-emerald-50 text-[#25D366]",
      hoverBorder: "hover:border-emerald-200",
      label: "WhatsApp Support",
      value: "+20 109 946 6832",
      href: "https://wa.me/201099466832",
      badge: "Chat 24/7",
    },
    {
      id: "email",
      icon: Mail,
      iconColor: "bg-cyan-50 text-[#00A3C4]",
      hoverBorder: "hover:border-cyan-200",
      label: t("email.label"),
      value: "Safariihurghada@gmail.com",
      href: "mailto:Safariihurghada@gmail.com",
      badge: "Official Mail",
    },
    {
      id: "location",
      icon: MapPin,
      iconColor: "bg-amber-50 text-amber-600",
      hoverBorder: "hover:border-amber-200",
      label: t("location.label"),
      value: "Al Kawthar Omar Ibn AlKhattab St. Bldg 136, Hurghada",
      href: "https://share.google/OtOGSX2dOLonmufyR",
      badge: "Main Office",
    },
  ];

  return (
    <motion.div
      variants={infoContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="flex flex-col gap-3.5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.a
              key={card.id}
              variants={infoCardVariants}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white p-4.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${card.hoverBorder}`}
            >
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${card.iconColor} transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-slate-400">
                    {card.label}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {card.badge}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-[#1E232A] truncate group-hover:text-[#F36F21] transition-colors">
                  {card.value}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* 24/7 Availability Trust Banner */}
      <motion.div
        variants={infoCardVariants}
        className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50/70 to-amber-50/40 p-4 text-xs sm:text-sm text-slate-600 shadow-xs"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#F36F21] text-white shadow-xs">
          <Clock size={16} />
        </span>
        <p className="leading-relaxed">
          <strong className="font-bold text-[#1E232A]">We are available 24/7.</strong> Feel free to call or WhatsApp us anytime for instant excursion reservations, custom itineraries, or questions.
        </p>
      </motion.div>
    </motion.div>
  );
}
