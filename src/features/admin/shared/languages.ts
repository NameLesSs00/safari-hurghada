export const adminContentLanguages = ["en", "fr", "ru", "ro"] as const;

export type AdminContentLanguage = (typeof adminContentLanguages)[number];

export type AdminLanguageOption = {
  label: string;
  value: AdminContentLanguage;
  displayCode: string;
};

export const adminLanguageOptions: AdminLanguageOption[] = [
  { label: "English", value: "en", displayCode: "EN" },
  { label: "French",  value: "fr", displayCode: "FR" },
  { label: "German",  value: "ru", displayCode: "DE" },
  { label: "Polish",  value: "ro", displayCode: "PL" },
];

