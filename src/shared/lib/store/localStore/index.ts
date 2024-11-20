import { logger } from 'shared/lib/logger';
import { ClientStorage } from './localStorage';
import { Store } from '../types';
import { LocalStoreType } from './types';
import { ServerStorage } from '../fallback';

export const localStore: Store<LocalStoreType> = __NODEJS__ ? new ServerStorage(logger) : new ClientStorage();
