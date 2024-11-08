import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import backend from 'i18next-fs-backend';
import path, { join } from 'path';
import { lstatSync, readdirSync } from 'fs';

export const LANGUAGES_LIST = ['en', 'ru'] as const;
export const DEFAULT_LANGUAGE = LANGUAGES_LIST[0];

const localesFolder = path.resolve(__dirname, '..', '..', 'public', 'locales/');

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    initImmediate: false,
    preload: readdirSync(localesFolder).filter((fileName) => {
      const joinedPath = join(localesFolder, fileName);
      return lstatSync(joinedPath).isDirectory();
    }),
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: path.join(localesFolder, '/{{lng}}/{{ns}}.json'),
    },
  });

export default i18n;