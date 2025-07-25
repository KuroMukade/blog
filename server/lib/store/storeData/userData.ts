import { StateSchema } from '@client/app/providers/StoreProvider';
import { User, userActions, USER_COOKIE_STORAGE_KEY } from '@client/entities/User';
import { Store } from '@reduxjs/toolkit';

export const initializeUserData = async (store: Store<StateSchema>, cookies: Record<string, any>) => {
  const userData: User = JSON.parse(cookies[USER_COOKIE_STORAGE_KEY]);

  if (!userData) {
    await store.dispatch(userActions.initAuthData(null));
  }

  await store.dispatch(userActions.initAuthData(userData));
};
