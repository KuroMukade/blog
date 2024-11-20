import { logger } from 'shared/lib/logger';
import { generateCookieStore } from './cookieStorage';
import { Store } from '../types';
import { CookieStoreType } from './types';
import { ServerStorage } from '../fallback';

export const cookieStore: Store<CookieStoreType> = __NODEJS__
  ? new ServerStorage(logger)
  : generateCookieStore();
