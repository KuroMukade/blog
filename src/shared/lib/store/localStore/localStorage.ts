/* eslint-disable class-methods-use-this */
import { Store } from '../types';
import type { LocalStoreType } from './types';

export class ClientStorage implements Store<LocalStoreType> {
  get<T extends keyof LocalStoreType>(key: T): LocalStoreType[T] | null {
    const val = localStorage.getItem(key);
    if (!val) return null;
    return JSON.parse(val);
  }

  set<T extends keyof LocalStoreType>(key: T, value: any): void {
    return localStorage.setItem(key, value);
  }

  remove<T extends keyof LocalStoreType>(key: T): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
