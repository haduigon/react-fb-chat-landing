import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import translationEN from '../locales/localeEN.json';
import translationRo from '../locales/localeRO.json';

const resources = {
  en: {
    translation: translationEN
  },
  ro: {
    translation: translationRo
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule as any)
  .init({
    resources,
    fallbackLng: "en",

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;