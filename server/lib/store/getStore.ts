import { createReducerManager } from '@client/app/providers/StoreProvider/config/reducerManager';
import type { StateSchema } from '@client/app/providers/StoreProvider';
import { extraArg, staticReducers } from '@client/app/providers/StoreProvider/config/store';
import {
  CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { getStoreUserInitializer } from './storeData/userData';

export function createSSRStore(
  asyncReducers?: ReducersMapObject<StateSchema>,
  page?: '',
) {
  const reducerManager = createReducerManager({
    ...staticReducers,
    ...asyncReducers,
  });

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
  });

  return store;
}

export const getStore = (pageType: string, url: string, cookies: Record<string, any>) => {
  const store = createSSRStore();
  const initUser = getStoreUserInitializer(cookies);
  store.dispatch(initUser);

  return store;
};
