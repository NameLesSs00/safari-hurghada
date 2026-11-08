"use client";

import { useQuery } from "@tanstack/react-query";

import { getReport } from "./api";
import type { ReportPeriod } from "./types";

const reportsQueryKey = ["admin", "reports"] as const;

export function useReportQuery(period: ReportPeriod) {
  return useQuery({
    queryKey: [...reportsQueryKey, period],
    queryFn: () => getReport(period),
  });
}
