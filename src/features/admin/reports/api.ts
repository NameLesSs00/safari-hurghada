import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";

import type { ApiResponse, ReportData, ReportPeriod } from "./types";

function getJsonHeaders() {
  return {
    Accept: "application/json, text/plain, */*",
  };
}

export async function getReport(period: ReportPeriod) {
  const response = await adminFetch(`/api/Reports/${period}`, {
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<ReportData>>(
    response,
    `Unable to load ${period} report.`,
  );
}

export function getDailyReport() {
  return getReport("daily");
}

export function getMonthlyReport() {
  return getReport("monthly");
}

export function getYearlyReport() {
  return getReport("yearly");
}
