import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/commons.json";
import ptTranslation from "./locales/pt/commons.json";

const resources = {
  en: { translation: enTranslation },
  pt: { translation: ptTranslation },
};

const initPromise = i18next.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
export { initPromise };
