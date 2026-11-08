import { getApiLanguage, type AppLocale } from "@/src/i18n/locales";

export const API_BASE_URL = "https://sunnytour.premiumasp.net/";

export function getApiUrl(path = "") {
  const baseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL
    : `${API_BASE_URL}/`;

  return new URL(path.replace(/^\//, ""), baseUrl).toString();
}

export function getLanguageHeaders(locale?: AppLocale | string) {
  return {
    "Accept-Language": getApiLanguage(locale),
  };
}

export function getImageUrl(imageUrl: string | null | undefined) {
  if (!imageUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return getApiUrl(imageUrl);
}
