import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import backend from 'i18next-fs-backend';
import path from 'path';
import { readdirSync } from 'fs';
import { DEFAULT_LANGUAGE, LANGUAGES_LIST } from '@client/shared/lib/i18n/constants';

const localesFolder = path.resolve(__dirname, '..', '..', 'public', 'locales/');

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGES_LIST,
    initImmediate: false,
    preload: LANGUAGES_LIST,
    ns: readdirSync(path.join(localesFolder, DEFAULT_LANGUAGE))
      .filter((fileName) => fileName.endsWith('.json'))
      .map((fileName) => path.basename(fileName, '.json')),
    defaultNS: 'translation',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: path.join(localesFolder, '/{{lng}}/{{ns}}.json'),
    },
  });

export default i18n;
