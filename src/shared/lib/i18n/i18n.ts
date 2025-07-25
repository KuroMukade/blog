import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import { cookieStore } from '../store';
import { DEFAULT_LANGUAGE } from '.';
import { LOCALE_STORE_KEY } from './constants';
// import LanguageDetector from 'i18next-browser-languagedetector';

const loadPath = 'static/locales/{{lng}}/{{ns}}.json';

i18n
  .use(Backend)
// .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: (__NODEJS__ ? false : window.__LANG__) || cookieStore.get(LOCALE_STORE_KEY) || DEFAULT_LANGUAGE,
    resources: __NODEJS__ ? undefined : window.i18nResources,
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
