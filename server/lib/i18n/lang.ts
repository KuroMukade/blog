// import { LOCALE_STORE_KEY, LANGUAGE_TYPE } from "@client/shared/lib/i18n/constants"
import { i18n } from "i18next";

export const getLanguage = (cookies: Record<string, any>) => {
  const fallback = 'en';

  return (cookies['locale']) || fallback;
}

export const prepareLocales = async (i18n: i18n, cookies: Record<string, any>) => {
    const lang = getLanguage(cookies);
    await i18n.changeLanguage(lang);
}