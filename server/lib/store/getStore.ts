import { createSSRStore } from '@client/app/providers/StoreProvider/config/store';
import { userActions } from '@client/entities/User';

export const getStore = (pageType: string, url: string) => {
  const store = createSSRStore();
  store.dispatch(userActions.initAuthData());
  store.dispatch(userActions.setAuthData({ id: '1', username: 'mukade' }));
  return store;
};
