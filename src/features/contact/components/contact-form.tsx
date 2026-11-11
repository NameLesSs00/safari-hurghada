"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { MessageSquare, Phone, Send, User } from "lucide-react";
import { WhatsAppIcon } from "@/src/shared/components/icons";
import { SITE, whatsappUrl } from "@/src/shared/config/site-config";

const formVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function ContactForm() {
  const [form, setForm] = useState({ name: "", whatsapp: "", message: "" });
  const t = useTranslations("ContactPage.form");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.whatsapp.trim() || !form.message.trim()) return;

    const message = `Hello ${SITE.brand.name}!\n\nNew Inquiry from Website:\n• Name: ${form.name.trim()}\n• WhatsApp: ${form.whatsapp.trim()}\n• Message: ${form.message.trim()}`;
    window.open(whatsappUrl(message), "_blank");
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)] sm:p-8 lg:p-10"
    >
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#F36F21]">
          Send an Inquiry
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#1E232A] tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-500">
          {t("description")}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        {/* Name Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-xs sm:text-sm font-semibold text-[#374151]"
          >
            {t("fields.name.label")}
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <User size={18} />
            </span>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder={t("fields.name.placeholder")}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 pl-11 pr-4 py-3.5 text-sm text-[#1E232A] placeholder:text-gray-400 outline-none transition-all focus:border-[#F36F21] focus:bg-white focus:ring-4 focus:ring-[#F36F21]/10"
            />
          </div>
        </div>

        {/* WhatsApp Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-whatsapp"
            className="text-xs sm:text-sm font-semibold text-[#374151]"
          >
            {t("fields.whatsapp.label")}
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Phone size={18} />
            </span>
            <input
              id="contact-whatsapp"
              name="whatsapp"
              type="tel"
              required
              value={form.whatsapp}
              onChange={handleChange}
              placeholder={t("fields.whatsapp.placeholder")}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 pl-11 pr-4 py-3.5 text-sm text-[#1E232A] placeholder:text-gray-400 outline-none transition-all focus:border-[#F36F21] focus:bg-white focus:ring-4 focus:ring-[#F36F21]/10"
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="text-xs sm:text-sm font-semibold text-[#374151]"
          >
            {t("fields.message.label")}
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-4 text-gray-400">
              <MessageSquare size={18} />
            </span>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder={t("fields.message.placeholder")}
              className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50/60 pl-11 pr-4 py-3.5 text-sm text-[#1E232A] placeholder:text-gray-400 outline-none transition-all focus:border-[#F36F21] focus:bg-white focus:ring-4 focus:ring-[#F36F21]/10"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          id="contact-submit-btn"
          type="submit"
          className="group mt-2 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#F36F21] py-4 text-sm sm:text-base font-semibold text-white shadow-md transition-all hover:bg-[#df5d10] hover:shadow-lg active:scale-98 cursor-pointer"
        >
          <WhatsAppIcon className="size-4.5 text-white" />
          <span>{t("submit")}</span>
          <Send size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </motion.div>
  );
}
