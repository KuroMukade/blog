import { User, userActions, USER_COOKIE_STORAGE_KEY } from '@client/entities/User';

export const getStoreUserInitializer = (cookies: Record<string, any>) => {
  const userData: User = cookies[USER_COOKIE_STORAGE_KEY];

  if (!userData) {
    return userActions.initAuthData(null);
  }

  return userActions.initAuthData(userData);
};
