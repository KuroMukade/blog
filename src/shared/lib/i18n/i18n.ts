import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { cookieStore } from '../store';
import { DEFAULT_LANGUAGE } from '.';
import { LOCALE_STORE_KEY } from './constants';
import Backend from 'i18next-http-backend';

const loadPath = 'static/locales/{{lng}}/{{ns}}.json';

const currentLang = window.__LANG__ || cookieStore.get(LOCALE_STORE_KEY) || DEFAULT_LANGUAGE;

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: currentLang,
    resources: window.i18nResources ?  { [currentLang]: window.i18nResources[currentLang] } : undefined,
    react: {
      useSuspense: false,
    },
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath,
    },
  });

export default i18n;
