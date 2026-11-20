import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import { cookieStore } from '../store';
import { DEFAULT_LANGUAGE, LANGUAGES_LIST, LOCALE_STORE_KEY } from './constants';

const loadPath = '/static/locales/{{lng}}/{{ns}}.json';

const currentLang = window.__LANG__ || cookieStore.get(LOCALE_STORE_KEY) || DEFAULT_LANGUAGE;
const resources = window.i18nResources;
const namespaces = Object.keys(resources?.[currentLang] ?? {});

export const i18nReady = i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGES_LIST,
    resources,
    partialBundledLanguages: true,
    ns: namespaces.length ? namespaces : ['translation'],
    lng: currentLang,
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
