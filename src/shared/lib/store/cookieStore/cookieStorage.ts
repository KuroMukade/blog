import storeEngine from 'store/src/store-engine';
import defaults from 'store/plugins/defaults';
import expire from 'store/plugins/expire';
import cookieStorage from 'store/storages/cookieStorage';
import { CookieStoreType } from './types';
import { Store } from '../types';

/**
 * store package plugin which set data without using JSON.stringify
 */
export const setWithoutStringify = () => ({
  // not calling next to not trigger default setter
  set: (next: Function, key: string, data: string | Object) => {
    cookieStorage.write(key, typeof data === 'string' ? data : JSON.stringify(data));
  },
});

export const generateCookieStore = () => {
  const engine = (storeEngine.createStore(
    [cookieStorage],
    [defaults, expire, setWithoutStringify],
  )) as unknown as Store<CookieStoreType>;

  return engine;
};
