import { DEFAULT_LANGUAGE, LANGUAGES_LIST } from '@client/shared/lib/i18n';
import languageParser from 'accept-language-parser';
import { Request } from 'express';

export const getInitialProps = async (i18n: any) => {
  const namespaces: string[] = (i18n).reportNamespaces
    ? (i18n as any).reportNamespaces.getUsedNamespaces()
    : [];
  await i18n.loadNamespaces(namespaces);

  const initialI18nStore = { [i18n.language]: {} };
  namespaces.forEach((ns) => {
    // @ts-expect-error
    initialI18nStore[i18n.language][ns] = i18n.getResourceBundle(i18n.language, ns) || {};
  });

  return { initialI18nStore, initialLanguage: i18n.language };
};

export const getPreferredLanguage = (req: Request) => {
  if (req.headers.cookie) {
    return req.headers.cookie;
  }

  const acceptLang = languageParser.pick(
    LANGUAGES_LIST,
    req.headers['accept-language'] || '',
    { loose: true },
  );

  return acceptLang || DEFAULT_LANGUAGE;
};
