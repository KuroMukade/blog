import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import backend from 'i18next-fs-backend';
import path, { join } from 'path';
import { lstatSync, readdirSync } from 'fs';
// import { DEFAULT_LANGUAGE } from '@client/shared/lib/i18n';

const localesFolder = path.resolve(__dirname, '..', '..', 'public', 'locales/');

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
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
