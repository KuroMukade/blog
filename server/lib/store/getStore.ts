import { createReducerManager } from '@client/app/providers/StoreProvider/config/reducerManager';
import type { ReduxStoreWithManager, StateSchema } from '@client/app/providers/StoreProvider';
import { extraArg, staticReducers } from '@client/app/providers/StoreProvider/config/store';
import {
  CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { getUrlParams, parseQueryParams, QueryParams, UrlParamsType } from '@client/shared/lib/url';
import { routerActions } from '@client/app/providers/router';
import { AppRoute } from 'lib/router';
import { articlesPageReducer, injectSSRReducer, initialSSRReducers } from '@client/pages/ArticlesPage';
import { initializeUserData } from './storeData/userData';
import { initializeArticlesData } from './storeData/articlesData';
import { StateSchemaKey } from '@client/app/providers/StoreProvider/config/StateSchema';

type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
}

export function createSSRStore(asyncReducers?: ReducersList): ReduxStoreWithManager {
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

  return store as ReduxStoreWithManager;
}

const warmupStore = async (
  store: ReduxStoreWithManager,
  urlParams: QueryParams,
  pageType: AppRoute,
  cookies: Record<string, any>,
) => {
  store.dispatch(routerActions.setSearchParams(urlParams));
  await initializeUserData(store, cookies);

  if (pageType === '/articles') {
    injectSSRReducer(store);
    await initializeArticlesData(store, urlParams);
  }
}

const getInitialSSRPageReducers = (pageType: AppRoute) => {
  if (pageType === '/articles') {
    return initialSSRReducers;
  }

  return {};
}

export const getStore = async (pageType: AppRoute, url: string, cookies: Record<string, any>) => {
  const initialAsyncReducers = getInitialSSRPageReducers(pageType);
  const store = createSSRStore(initialAsyncReducers);
  const urlParams = parseQueryParams(url);
  console.log({urlParams});
  await warmupStore(store, urlParams, pageType, cookies);
  console.log(store.reducerManager.getReducerMap());
  return store;
};
