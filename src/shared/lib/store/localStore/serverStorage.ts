/* eslint-disable class-methods-use-this */
import type { Logger } from 'shared/lib/logger';

import { Store } from '../types';
import { LocalStoreType } from './localStore.types';

export class ServerStorage implements Store<LocalStoreType> {
  constructor(private readonly _logger: Logger) {
    this._logger = _logger;
  }

  get(key: string): null {
    this._logger.warn(`Can't get "${key}" on server`);
    return null;
  }

  set(key: string, value: T): void {
    this._logger.warn(`Can't set ${key} on server`);
  }

  remove(key: string): void {
    this._logger.warn(`Can't remove ${key} on Server`);
  }

  clear(): void {
    this._logger.warn("Can't clear on server");
  }
}
