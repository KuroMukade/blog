/* eslint-disable no-redeclare */
import decode from 'decode-uri-component';
import { createContext, FC, useContext } from 'react';
import { CookiesManagerType } from './types';

class CookiesManager implements CookiesManagerType {
  get(name: string) {
    const cookies = this.getAll();

    return cookies[name];
  }

  getAll() {
    if (typeof window === 'undefined') return {};

    const pairs = document.cookie.split(';');
    const cookies: {[key: string]: string} = {};

    for (let i = 0; i < pairs.length; i += 1) {
      const pair = pairs[i].split('=');

      if (pair[0] && pair[1]) {
        cookies[`${pair[0]}`.trim()] = decode(pair[1]);
      }
    }

    return cookies;
  }
}

const CookiesContext = createContext(new CookiesManager());

export function useCookies(name: string): [string];
export function useCookies(): [{[key: string]: string}];
/**
 * Hook to get cookie by name if "name" arg is passed, all cookies otherwise
 * @param {string} [name] - cookie name
 * @return {Array|Error} cookies data
 */
export function useCookies(name?: string) {
  const manager = useContext(CookiesContext);

  if (!manager) {
    throw new Error('Missing <CookiesProvider>');
  }

  if (name) {
    return [manager.get(name)];
  }

  return [manager.getAll()];
}

type PropsType = {
    manager?: CookiesManager;
    children: React.ReactNode;
};

export const CookiesProvider: FC<PropsType> = ({ manager = new CookiesManager(), children }) => (
    <CookiesContext.Provider value={manager}>{children}</CookiesContext.Provider>
);
