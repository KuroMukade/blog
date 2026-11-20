import type { i18n, Resource } from 'i18next';

import { DEFAULT_LANGUAGE, LANGUAGES_LIST, LOCALE_STORE_KEY } from '@client/shared/lib/i18n/constants';

export const prepareLocales = (baseI18n: i18n, cookies: Record<string, string>) => {
  const requestedLanguage = cookies[LOCALE_STORE_KEY];
  const lng = LANGUAGES_LIST.find((language) => language === requestedLanguage) ?? DEFAULT_LANGUAGE;

  return baseI18n.cloneInstance({ lng });
};

export const getUsedResources = (requestI18n: i18n): Resource => {
  const namespaces = requestI18n.reportNamespaces?.getUsedNamespaces() ?? ['translation'];

  return Object.fromEntries(requestI18n.languages.map((language) => [
    language,
    Object.fromEntries(namespaces.map((namespace) => [
      namespace,
      requestI18n.getResourceBundle(language, namespace) ?? {},
    ])),
  ]));
};