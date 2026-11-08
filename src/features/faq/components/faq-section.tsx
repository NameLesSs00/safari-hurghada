"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useQuestionsQuery, type Question } from "@/src/features/faq/api/get-questions";

const DEFAULT_FAQS: Question[] = [
  {
    id: 1,
    text: "What types of tours and activities do you offer in Hurghada?",
    answer:
      "We offer a wide range of experiences in Hurghada, including diving trips, snorkeling excursions, desert safaris, boat trips, island tours, and many other exciting activities.",
  },
  {
    id: 2,
    text: "Do I need diving experience to join a diving trip?",
    answer:
      "No. We offer diving experiences for both beginners and experienced divers. Beginners receive professional guidance and a safety briefing before entering the water.",
  },
  {
    id: 3,
    text: "What is included in your desert safari tours?",
    answer:
      "Depending on the safari you choose, the experience can include transportation, desert activities, a Bedouin village visit, traditional food, and an exciting desert adventure. The exact inclusions are listed with each tour.",
  },
  {
    id: 4,
    text: "Can I book a private tour or excursion?",
    answer:
      "Yes. Private tours can be arranged for individuals, couples, families, and groups. Contact us to discuss your preferred activity, schedule, and requirements.",
  },
  {
    id: 5,
    text: "How can I book a tour in Hurghada?",
    answer:
      "Booking is easy. Choose your preferred tour and contact us with your desired date and number of participants. We will confirm the availability and provide you with all the necessary information.",
  },
  {
    id: 6,
    text: "Can I cancel or change my booking?",
    answer:
      "Yes, you can cancel or reschedule easily. Most tours offer free changes when requested in advance. Contact our 24/7 support team via WhatsApp for immediate assistance.",
  },
];

function FaqSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[58px] animate-pulse rounded-2xl border border-gray-200/80 bg-white/70"
        />
      ))}
    </div>
  );
}

export function FaqSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());
  const locale = useLocale();
  const t = useTranslations("FAQ");
  const { data: questions, isLoading } = useQuestionsQuery({ pageSize: 6 });

  // Use API questions if available; otherwise smoothly fallback to default questions
  const activeQuestions: Question[] =
    questions && questions.length > 0 ? questions : DEFAULT_FAQS;

  function toggleItem(id: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section
      id="faq"
      style={{ backgroundColor: "#F9FAF4" }}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* Left Column: Illustration with Seamless Background & Zero Edge Corners */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div
              className="relative w-full max-w-[460px] lg:max-w-none"
              style={{
                maskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Image
                src="/FaqHome/imageForFaq.png"
                alt="Frequently Asked Questions Illustration"
                width={560}
                height={500}
                className="h-auto w-full select-none object-contain pointer-events-none mix-blend-multiply"
                priority={false}
              />
            </div>
          </div>

          {/* Right Column: Section Header & Accordion */}
          <div className="flex flex-col lg:col-span-7">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <p className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#F36F21] mb-2">
                {t("eyebrow")}
              </p>

              <h2 className="relative inline-block text-2xl sm:text-3xl lg:text-[38px] font-black tracking-tight text-[#1E232A] leading-tight">
                <span className="relative inline-block">
                  {t("title")}
                  {/* Decorative 3 Orange Spark Rays */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="absolute top-0.5 sm:top-1 -right-6 sm:-right-7 w-5 sm:w-6 h-5 sm:h-6 text-[#F36F21] stroke-current pointer-events-none"
                    fill="none"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  >
                    <line x1="3" y1="12" x2="9" y2="2" />
                    <line x1="6" y1="16" x2="18" y2="10" />
                    <line x1="7" y1="21" x2="19" y2="20" />
                  </svg>
                </span>
              </h2>

              <p className="mt-2.5 text-sm sm:text-base text-[#64748B] max-w-[560px]">
                {t("subtitle")}
              </p>
            </div>

            {/* Accordion List - Always visible & interactive */}
            {isLoading && !questions ? (
              <FaqSkeleton />
            ) : (
              <div className="flex flex-col gap-3">
                {activeQuestions.map((item) => {
                  const isOpen = openItems.has(item.id);

                  return (
                    <article
                      key={item.id}
                      className={`group rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                        isOpen
                          ? "border-[#F36F21]/40 shadow-[0_4px_20px_rgba(15,23,42,0.06)]"
                          : "border-[#E5E7EB] hover:border-gray-300 shadow-[0_2px_6px_rgba(15,23,42,0.02)]"
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${item.id}`}
                        onClick={() => toggleItem(item.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 cursor-pointer"
                      >
                        <span
                          className={`text-[15px] sm:text-base font-bold transition-colors ${
                            isOpen
                              ? "text-[#F36F21]"
                              : "text-[#0F2942] group-hover:text-[#F36F21]"
                          }`}
                        >
                          {item.text}
                        </span>
                        <ChevronDown
                          size={20}
                          strokeWidth={2.4}
                          className={`shrink-0 transition-transform duration-300 ${
                            isOpen
                              ? "rotate-180 text-[#F36F21]"
                              : "text-slate-400 group-hover:text-slate-700"
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            id={`faq-answer-${item.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          >
                            <div className="border-t border-gray-100/90 px-5 pt-3.5 pb-5 sm:px-6">
                              <p className="text-sm sm:text-[14.5px] font-normal leading-relaxed text-[#475569]">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </article>
                  );
                })}
              </div>
            )}

            {/* View All FAQs Link */}
            <div className="mt-7 flex justify-start">
              <Link
                href={`/${locale}/faq`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-[#1E232A] shadow-sm transition-all hover:border-[#F36F21] hover:text-[#F36F21] hover:shadow-md active:scale-95"
              >
                {t("viewAll")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
