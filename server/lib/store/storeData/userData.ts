import { User, userActions, USER_COOKIE_STORAGE_KEY } from '@client/entities/User';

export const initializeUserData = async (store, cookies: Record<string, any>) => {
  const userData: User = cookies[USER_COOKIE_STORAGE_KEY];

  if (!userData) {
    await store.dispatch(userActions.initAuthData(null));
  }

  await store.dispatch(userActions.initAuthData(userData));
};
