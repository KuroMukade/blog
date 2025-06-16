import { createReducerManager } from '@client/app/providers/StoreProvider/config/reducerManager';
import type { StateSchema } from '@client/app/providers/StoreProvider';
import { extraArg, staticReducers } from '@client/app/providers/StoreProvider/config/store';
import {
  CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { getUrlParams } from '@client/shared/lib/url';
import { routerActions } from '@client/app/providers/router';
import { AppRoute } from 'lib/router';
import { articlesPageReducer } from '@client/pages/ArticlesPage';
import { initializeUserData } from './storeData/userData';
import { initializeArticlesData } from './storeData/articlesData';

export function createSSRStore(
  asyncReducers?: ReducersMapObject<StateSchema>,
  page?: '',
) {
  const reducerManager = createReducerManager({ ...staticReducers, ...asyncReducers });

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
  });

  // @ts-expect-error wrong types
  store.reducerManager = reducerManager;

  return store;
}

export const getStore = async (pageType: AppRoute, url: string, cookies: Record<string, any>) => {
  const store = createSSRStore({ articlesPage: articlesPageReducer });

  const urlParams = getUrlParams(url);

  store.dispatch(routerActions.setSearchParams(urlParams));

  await initializeUserData(store, cookies);

  if (pageType === '/articles') {
    store.reducerManager.add('articlesPage', articlesPageReducer);
    console.log(store.reducerManager.getReducerMap())
    await initializeArticlesData(store);
  }

  return store;
};
