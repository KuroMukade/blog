import { StateSchema } from '@client/app/providers/StoreProvider';
import { User, userActions, USER_COOKIE_STORAGE_KEY } from '@client/entities/User';
import { Store } from '@reduxjs/toolkit';

export const initializeUserData = async (store: Store<StateSchema>, cookies: Record<string, any>) => {
  const userCookie = cookies[USER_COOKIE_STORAGE_KEY];
  let userData: User | null = null;

  if (userCookie) {
    try {
      userData = JSON.parse(userCookie);
    } catch {
      // Ignore malformed cookies and render the page for a guest.
    }
  }

  store.dispatch(userActions.initAuthData(userData));
};
