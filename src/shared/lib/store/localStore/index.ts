import { logger } from 'shared/lib/logger';
import { ClientStorage } from './clientStorage';
import { ServerStorage } from './serverStorage';
import { Store } from '../types';
import { LocalStoreType } from './localStore.types';

console.log(__NODEJS__);
export const localStore: Store<LocalStoreType> = __NODEJS__ ? new ServerStorage(logger) : new ClientStorage();
