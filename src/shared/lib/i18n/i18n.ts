import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';

const loadPath = 'public/locales/{{lng}}/{{ns}}.json';

export const LANGUAGES_LIST = ['eng', 'ru'];
export const DEFAULT_LANGUAGE = LANGUAGES_LIST[0];

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'eng',
    debug: !!__IS_DEV__,

    react: {
      useSuspense: false,
    },

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath,
    },
  });

export default i18n;
