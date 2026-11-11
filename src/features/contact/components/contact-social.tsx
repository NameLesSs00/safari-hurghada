"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import { SITE } from "@/src/shared/config/site-config";

const socialContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const socialItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export function ContactSocial() {
  const t = useTranslations("ContactPage.social");

  const socialLinks = SITE.social;

  return (
    <div className="rounded-3xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#1E232A]">
            {t("title")}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Connect with us on our social channels for travel stories and offers.
          </p>
        </div>

        <motion.div
          variants={socialContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="flex items-center gap-2.5"
        >
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.name} variants={socialItemVariants}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className={`flex size-10 items-center justify-center rounded-full bg-slate-100 text-[#1E232A] transition-all duration-300 hover:scale-110 hover:text-white shadow-xs ${item.hoverBg}`}
                >
                  <Icon className="size-4.5" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
