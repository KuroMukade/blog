import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';

const loadPath = 'static/locales/{{lng}}/{{ns}}.json';

export const LANGUAGES_LIST = ['en', 'ru'] as const;
export const DEFAULT_LANGUAGE = LANGUAGES_LIST[0];

i18n
  .use(Backend)
// .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    // debug: Boolean(__IS_DEV__),

    react: {
      useSuspense: true,
    },

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath,
    },
  });

export default i18n;
