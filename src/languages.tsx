import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import arTranslation from "./locales/ar.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
