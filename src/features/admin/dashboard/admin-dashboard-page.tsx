"use client";

import {
  BarChart3,
  CalendarDays,
  Loader2,
  RefreshCw,
  ReceiptText,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useReportQuery } from "@/src/features/admin/reports/hooks";
import type { ReportPeriod } from "@/src/features/admin/reports/types";

const reportPeriods: Array<{ label: string; value: ReportPeriod }> = [
  { label: "Daily", value: "daily" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const integerFormatter = new Intl.NumberFormat("en-US");
const decimalFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

function formatInteger(value?: number) {
  return integerFormatter.format(value ?? 0);
}

function formatDecimal(value?: number) {
  return decimalFormatter.format(value ?? 0);
}

export function AdminDashboardPage() {
  const [activePeriod, setActivePeriod] = useState<ReportPeriod>("daily");
  const reportQuery = useReportQuery(activePeriod);
  const report = reportQuery.data?.data;
  const topTrips = useMemo(() => report?.topTrips ?? [], [report?.topTrips]);
  const maxTripBookings = useMemo(
    () =>
      Math.max(
        ...topTrips.map((trip) => trip.bookingCount).filter((count) => count > 0),
        1,
      ),
    [topTrips],
  );

  const metrics = [
    {
      label: "Total bookings",
      value: formatInteger(report?.totalBookings),
      icon: ReceiptText,
      accent: "bg-[#e8f5f9] text-[var(--color-ocean)]",
    },
    {
      label: "Total revenue",
      value: formatDecimal(report?.totalRevenue),
      icon: TrendingUp,
      accent: "bg-[#eff8ee] text-[#1f8f45]",
    },
    {
      label: "New customers",
      value: formatInteger(report?.newCustomers),
      icon: Users,
      accent: "bg-[#fff4e4] text-[#a86300]",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-ocean)]">
            Admin dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--color-deep-ocean)] sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-3 max-w-[680px] text-base leading-[1.7] text-[var(--color-muted)]">
            Track booking activity, revenue, customers, and the trips that are
            getting the most attention.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-black/10 bg-white p-1 shadow-[0_10px_28px_rgba(0,69,96,0.08)]">
            {reportPeriods.map((period) => {
              const isActive = activePeriod === period.value;

              return (
                <button
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[var(--color-deep-ocean)] text-white shadow-sm"
                      : "text-[var(--color-muted)] hover:bg-[#f0f7fb] hover:text-[var(--color-deep-ocean)]"
                  }`}
                  key={period.value}
                  onClick={() => setActivePeriod(period.value)}
                  type="button"
                >
                  {period.label}
                </button>
              );
            })}
          </div>

          <button
            aria-label="Refresh report"
            className="grid size-11 place-items-center rounded-lg border border-black/10 bg-white text-[var(--color-deep-ocean)] shadow-[0_10px_28px_rgba(0,69,96,0.08)] transition hover:bg-[#f0f7fb] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={reportQuery.isFetching}
            onClick={() => reportQuery.refetch()}
            type="button"
          >
            <RefreshCw
              className={reportQuery.isFetching ? "animate-spin" : undefined}
              size={19}
            />
          </button>
        </div>
      </div>

      {reportQuery.isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {reportQuery.error instanceof Error
            ? reportQuery.error.message
            : "Unable to load report."}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              className="rounded-lg border border-black/5 bg-white p-5 shadow-[0_12px_30px_rgba(0,69,96,0.08)]"
              key={metric.label}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-muted)]">
                    {metric.label}
                  </p>
                  <p className="mt-3 min-h-10 text-3xl font-bold text-[var(--color-deep-ocean)]">
                    {reportQuery.isLoading ? "-" : metric.value}
                  </p>
                </div>
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-lg ${metric.accent}`}
                >
                  <Icon size={21} />
                </span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <div className="rounded-lg border border-black/5 bg-white p-5 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-muted)]">
                Top trips
              </p>
              <h2 className="mt-1 text-xl font-bold text-[var(--color-deep-ocean)]">
                Booking leaders
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-[#e8f5f9] px-3 py-2 text-sm font-semibold text-[var(--color-ocean)]">
              <Trophy size={16} />
              {reportPeriods.find((period) => period.value === activePeriod)
                ?.label ?? "Daily"}
            </span>
          </div>

          <div className="mt-5 min-h-[260px]">
            {reportQuery.isLoading ? (
              <div className="flex h-[260px] items-center justify-center gap-3 text-sm font-semibold text-[var(--color-muted)]">
                <Loader2 className="animate-spin" size={20} />
                Loading report
              </div>
            ) : topTrips.length > 0 ? (
              <div className="space-y-4">
                {topTrips.map((trip, index) => {
                  const title = trip.tripTitle?.trim() || "Untitled trip";
                  const width = Math.max(
                    8,
                    (trip.bookingCount / maxTripBookings) * 100,
                  );

                  return (
                    <div
                      className="rounded-lg border border-black/5 bg-[#fbfdff] p-4"
                      key={`${title}-${index}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[var(--color-deep-ocean)]">
                            {index + 1}. {title}
                          </p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                            {formatInteger(trip.bookingCount)} bookings
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8eef4]">
                        <div
                          className="h-full rounded-full bg-[var(--color-ocean)]"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-[260px] flex-col items-center justify-center rounded-lg border border-dashed border-black/10 bg-[#fbfdff] px-5 text-center">
                <BarChart3
                  className="text-[var(--color-ocean)]"
                  size={34}
                  strokeWidth={1.8}
                />
                <p className="mt-4 text-base font-bold text-[var(--color-deep-ocean)]">
                  No top trips yet
                </p>
                <p className="mt-2 max-w-[340px] text-sm leading-6 text-[var(--color-muted)]">
                  Top trips will appear after bookings are recorded.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-black/5 bg-white p-5 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--color-muted)]">
                Current report
              </p>
              <h2 className="mt-1 text-xl font-bold text-[var(--color-deep-ocean)]">
                {reportQuery.data?.message ?? "Report summary"}
              </h2>
            </div>
            <span className="grid size-11 place-items-center rounded-lg bg-[#e8f5f9] text-[var(--color-ocean)]">
              <CalendarDays size={21} />
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {metrics.map((metric) => (
              <div
                className="flex items-center justify-between gap-4 rounded-lg bg-[#f7fbfd] px-4 py-3"
                key={`summary-${metric.label}`}
              >
                <span className="text-sm font-semibold text-[var(--color-muted)]">
                  {metric.label}
                </span>
                <span className="text-base font-bold text-[var(--color-deep-ocean)]">
                  {reportQuery.isLoading ? "-" : metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
