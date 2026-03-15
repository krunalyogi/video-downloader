export const defaultLocale = "en";

export const locales = [
    "en", // English
    "es", // Spanish
    "fr", // French
    "de", // German
    "id", // Indonesian
    "pt", // Portuguese
    "ru", // Russian
    "ar", // Arabic
    "hi", // Hindi
    "tr", // Turkish
] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    id: "Bahasa Indonesia",
    pt: "Português",
    ru: "Русский",
    ar: "العربية",
    hi: "हिन्दी",
    tr: "Türkçe",
};
