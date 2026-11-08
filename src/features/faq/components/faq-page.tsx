"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useQuestionsQuery } from "@/src/features/faq/api/get-questions";

function FaqPageSkeleton() {
  return (
    <div className="flex flex-col gap-[22px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[70px] animate-pulse rounded-[14px] bg-[var(--color-faq-box)]"
        />
      ))}
    </div>
  );
}

export function FaqPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());
  const { data: questions, isLoading, error } = useQuestionsQuery();

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
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-[var(--color-deep-ocean)]">
        <div className="relative mx-auto flex h-[120px] w-full max-w-[1440px] items-center px-5 sm:h-[210px] sm:px-10 lg:h-[260px] lg:px-[100px]">
          <div className="relative z-10">
            <p className="font-montez text-[18px] font-normal leading-[150%] text-[var(--color-faq-accent)] sm:text-[30px] lg:text-[36px]">
              We&apos;re here to help
            </p>
            <h1 className="mt-1 text-[24px] font-bold leading-[130%] text-white sm:text-[34px] lg:mt-4 lg:text-[40px]">
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb + Content */}
      <section className="bg-white px-5 pb-16 pt-8 sm:px-8 lg:px-0 lg:pb-24 lg:pt-12">
        <div className="mx-auto w-full max-w-[1280px]">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 text-[14px] leading-[160%] text-[#6d7280] lg:text-base"
          >
            <Link href="/" className="transition-colors hover:text-[var(--color-ocean)]">
              Home
            </Link>
            <span> &gt; </span>
            <span className="font-medium text-[var(--color-ocean)]">FAQ</span>
          </nav>

          {/* Section title */}
          <div className="mb-10">
            <h2 className="text-[28px] font-semibold text-[var(--color-deep-ocean)] sm:text-[34px]">
              All Questions
            </h2>
            <div className="mt-2 h-1.5 w-20 rounded-full bg-[var(--color-faq-accent)]" />
          </div>

          {/* Content */}
          {isLoading ? (
            <FaqPageSkeleton />
          ) : error ? (
            <p className="text-center text-red-500">
              Failed to load questions. Please try again later.
            </p>
          ) : (
            <div className="flex flex-col gap-[22px]">
              {questions?.map((item) => {
                const isOpen = openItems.has(item.id);

                return (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-[14px] bg-[var(--color-faq-box)]"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                      onClick={() => toggleItem(item.id)}
                      className="flex min-h-[70px] w-full items-center justify-between gap-4 px-4 text-left text-[20px] font-medium leading-[160%] text-[var(--color-deep-ocean)] sm:px-6 sm:text-2xl"
                    >
                      <span>{item.text}</span>
                      <ChevronDown
                        size={24}
                        strokeWidth={2.3}
                        className={`shrink-0 text-black transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
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
                          transition={{ duration: 0.24, ease: "easeOut" }}
                        >
                          <p className="break-words px-4 pb-5 text-[18px] font-normal leading-[160%] text-[var(--color-muted)] sm:px-6 sm:text-xl">
                            {item.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
