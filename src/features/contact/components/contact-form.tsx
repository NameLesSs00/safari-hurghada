"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

// Form animation
const formVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function ContactForm() {
  const [form, setForm] = useState({ name: "", whatsapp: "", message: "" });
  const t = useTranslations("ContactPage.form");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.whatsapp || !form.message) return;
    
    const text = encodeURIComponent(
      `New Contact Inquiry:\n\nName: ${form.name}\nWhatsApp: ${form.whatsapp}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/201093943595?text=${text}`, "_blank");
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8 lg:p-10"
    >
      {/* Heading */}
      <h2 className="text-[22px] font-bold leading-[130%] text-[#003A5A] md:text-[26px] lg:text-[30px]">
        {t("title")}
      </h2>
      <p className="mt-3 text-sm leading-[170%] text-[#6B7280] md:text-base">
        {t("description")}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6" noValidate>
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-[#374151]"
          >
            {t("fields.name.label")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder={t("fields.name.placeholder")}
            className="
              w-full rounded-lg border border-[#D1D5DB] px-4 py-3
              text-sm text-[#374151] placeholder:text-[#9CA3AF]
              outline-none transition-colors
              focus:border-[#003A5A] focus:ring-2 focus:ring-[#003A5A]/10
            "
          />
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-whatsapp"
            className="text-sm font-medium text-[#374151]"
          >
            {t("fields.whatsapp.label")}
          </label>
          <input
            id="contact-whatsapp"
            name="whatsapp"
            type="tel"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder={t("fields.whatsapp.placeholder")}
            className="
              w-full rounded-lg border border-[#D1D5DB] px-4 py-3
              text-sm text-[#374151] placeholder:text-[#9CA3AF]
              outline-none transition-colors
              focus:border-[#003A5A] focus:ring-2 focus:ring-[#003A5A]/10
            "
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-[#374151]"
          >
            {t("fields.message.label")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t("fields.message.placeholder")}
            rows={5}
            className="
              w-full resize-none rounded-lg border border-[#D1D5DB] px-4 py-3
              text-sm text-[#374151] placeholder:text-[#9CA3AF]
              outline-none transition-colors
              focus:border-[#003A5A] focus:ring-2 focus:ring-[#003A5A]/10
            "
          />
        </div>

        {/* Submit */}
        <button
          id="contact-submit-btn"
          type="submit"
          className="
            w-full rounded-full bg-[#003A5A] py-3.5
            text-base font-semibold text-white
            transition-colors hover:bg-[#004d78]
            focus:outline-none focus:ring-2 focus:ring-[#003A5A]/40
          "
        >
          {t("submit")}
        </button>
      </form>
    </motion.div>
  );
}
