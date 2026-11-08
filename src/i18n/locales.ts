export const locales = ["en", "fr", "de", "pl"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

// Only the language codes the API actually accepts
export const apiLanguages = ["en", "fr", "ru", "ro"] as const;

export type ApiLanguage = (typeof apiLanguages)[number];

export const apiLanguageByLocale: Record<AppLocale, ApiLanguage> = {
  en: "en",
  fr: "fr",
  de: "ru", // API doesn't support "de"; "ru" is the agreed fallback
  pl: "ro", // API doesn't support "pl"; "ro" is the agreed fallback
};

export function isAppLocale(locale: string): locale is AppLocale {
  return locales.includes(locale as AppLocale);
}

export function getApiLanguage(locale?: string): ApiLanguage {
  return locale && isAppLocale(locale)
    ? apiLanguageByLocale[locale]
    : apiLanguageByLocale[defaultLocale];
}
