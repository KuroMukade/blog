import { User, USER_COOKIE_STORAGE_KEY } from 'entities/User';

import { Theme, THEME_COOKIE_STORAGE_KEY } from 'shared/contexts/theme';

export type CookieStoreType = {
    [THEME_COOKIE_STORAGE_KEY]: Theme;
    [USER_COOKIE_STORAGE_KEY]: User;
}
