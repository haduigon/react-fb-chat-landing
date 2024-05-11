import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import translationEN from '../locales/dialogEng.json';
import translationRo from '../locales/dialogRo.json';
// console.log(translationEN, 'transl');

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
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;