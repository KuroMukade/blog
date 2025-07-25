import { createReducerManager } from '@client/app/providers/StoreProvider/config/reducerManager';
import type { ReduxStoreWithManager, StateSchema } from '@client/app/providers/StoreProvider';
import { extraArg, staticReducers } from '@client/app/providers/StoreProvider/config/store';
import {
  CombinedState, configureStore, Reducer,
} from '@reduxjs/toolkit';
import { parseQueryParams, QueryParams } from '@client/shared/lib/url';
import { routerActions } from '@client/app/providers/router';
import { AppRoute } from 'lib/router';
import { injectSSRReducer as injectArticlesSSRReducer, initialSSRReducers } from '@client/pages/ArticlesPage';
import { initializeUserData } from './storeData/userData';
import { initializeArticlesData } from './storeData/articlesData';
import { StateSchemaKey } from '@client/app/providers/StoreProvider/config/StateSchema';
import { injectSSRReducer as injectProfileSSRReducer, initialProfileReducers } from '@client/entities/Profile'
import { initializeProfileData } from './storeData/profileData';

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
  pageType: AppRoute | null,
  cookies: Record<string, any>,
  url: string,
) => {
  store.dispatch(routerActions.setSearchParams(urlParams));
  await initializeUserData(store, cookies);

  if (pageType === '/articles') {
    injectArticlesSSRReducer(store);
    await initializeArticlesData(store, urlParams);
  }
  if (pageType === '/profile/:id') {
    injectProfileSSRReducer(store);
    await initializeProfileData(store, url.split('/').at(-1));
  }
}

const getInitialSSRPageReducers = (pageType: AppRoute | null) => {
  if (pageType === '/articles') {
    return initialSSRReducers;
  }

  if (pageType === '/profile/:id') {
    return initialProfileReducers;
  }

  return {};
}

export const getStore = async (pageType: AppRoute | null, url: string, cookies: Record<string, any>) => {
  const initialAsyncReducers = getInitialSSRPageReducers(pageType);
  const store = createSSRStore(initialAsyncReducers);
  const urlParams = parseQueryParams(url);

  await warmupStore(store, urlParams, pageType, cookies, url);
  return store;
};
