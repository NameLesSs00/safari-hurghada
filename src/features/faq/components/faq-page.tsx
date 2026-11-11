"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useQuestionsQuery, type Question } from "@/src/features/faq/api/get-questions";
import { WhatsAppIcon } from "@/src/shared/components/icons";
import { whatsappUrl } from "@/src/shared/config/site-config";

function FaqSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[60px] animate-pulse rounded-2xl border border-gray-200/80 bg-slate-50"
        />
      ))}
    </div>
  );
}

export function FaqPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([1]));
  const [searchQuery, setSearchQuery] = useState("");
  const locale = useLocale();
  const t = useTranslations("FaqPage");
  const faqT = useTranslations("FAQ");
  const { data: questions, isLoading } = useQuestionsQuery();

  const defaultQuestions: Question[] = [
    { id: 1, text: faqT("defaults.q1"), answer: faqT("defaults.a1") },
    { id: 2, text: faqT("defaults.q2"), answer: faqT("defaults.a2") },
    { id: 3, text: faqT("defaults.q3"), answer: faqT("defaults.a3") },
    { id: 4, text: faqT("defaults.q4"), answer: faqT("defaults.a4") },
    { id: 5, text: faqT("defaults.q5"), answer: faqT("defaults.a5") },
    { id: 6, text: faqT("defaults.q6"), answer: faqT("defaults.a6") },
  ];

  const activeQuestions: Question[] =
    questions && questions.length > 0 ? questions : defaultQuestions;

  const filteredQuestions = activeQuestions.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.text.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    );
  });

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
    <div style={{ backgroundColor: "#F9FAF4" }} className="min-h-screen">
      {/* ─── Modern Hero & Search Header ─── */}
      <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 overflow-hidden">
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#F36F21]"
            >
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="font-semibold text-slate-800">
              {t("breadcrumb.faq")}
            </span>
          </nav>

          <div className="mx-auto max-w-[780px] text-center">
            {/* Eyebrow Tag */}
            <p className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#F36F21] mb-2.5">
              {t("hero.eyebrow")}
            </p>

            {/* Headline with 3-Spark Orange Ray */}
            <h1 className="relative inline-block text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-[#1E232A] leading-tight">
              <span className="relative inline-block">
                {t("hero.title")}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="absolute top-0 sm:top-0.5 -right-6 sm:-right-8 w-5 sm:w-6 h-5 sm:h-6 text-[#F36F21] stroke-current pointer-events-none"
                  fill="none"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                >
                  <line x1="3" y1="12" x2="9" y2="2" />
                  <line x1="6" y1="16" x2="18" y2="10" />
                  <line x1="7" y1="21" x2="19" y2="20" />
                </svg>
              </span>
            </h1>

            <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#64748B] max-w-[620px] mx-auto">
              {t("hero.subtitle")}
            </p>

            {/* Live Search Filter Input */}
            <div className="relative mt-8 sm:mt-10 mx-auto max-w-[540px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                className="w-full rounded-2xl border border-gray-200/90 bg-white py-3.5 pl-11 pr-11 text-sm text-slate-800 placeholder-slate-400 shadow-[0_2px_12px_rgba(15,23,42,0.04)] outline-none transition-all focus:border-[#F36F21] focus:ring-3 focus:ring-[#F36F21]/15"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label={t("search.clearSearch")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content Section ─── */}
      <main className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
            {/* Left Column: Homepage Illustration with Seamless Edge Blend */}
            <div className="flex items-center justify-center lg:col-span-5 lg:sticky lg:top-28">
              <div
                className="relative w-full max-w-[440px] lg:max-w-none"
                style={{
                  maskImage:
                    "radial-gradient(ellipse at center, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                }}
              >
                <Image
                  src="/FaqHome/imageForFaq.png"
                  alt="Frequently Asked Questions Illustration"
                  width={560}
                  height={500}
                  className="h-auto w-full select-none object-contain pointer-events-none"
                  priority={false}
                />
              </div>
            </div>

            {/* Right Column: Accordion Cards Matching Homepage */}
            <div className="flex flex-col lg:col-span-7">
              {isLoading && !questions ? (
                <FaqSkeleton />
              ) : filteredQuestions.length === 0 ? (
                <div className="rounded-2xl border border-gray-100 bg-[#F9FAF4] p-8 text-center sm:p-12">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-xs">
                    <Search size={22} />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">
                    {t("search.noResults")} &ldquo;{searchQuery}&rdquo;
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#F36F21] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#df5d10] cursor-pointer"
                  >
                    {t("search.clearSearch")}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filteredQuestions.map((item) => {
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
            </div>
          </div>

          {/* ─── "Still Have Questions?" 24/7 WhatsApp Support Desk ─── */}
          <div className="mt-16 sm:mt-20 overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-[#FFF9F5] via-[#FFF4EC] to-[#FFF9F5] p-6 sm:p-10 lg:p-12 shadow-xs">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-md shadow-emerald-500/25">
                  <WhatsAppIcon className="size-7" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-[#F36F21] mb-1">
                    {t("support.eyebrow")}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F2942] tracking-tight">
                    {t("support.title")}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-[620px]">
                    {t("support.subtitle")}
                  </p>
                </div>
              </div>

              <a
                href={whatsappUrl("Hello! I have a question about your tours and activities.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-[#1ebe5d] hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="size-5" />
                <span>{t("support.button")}</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
