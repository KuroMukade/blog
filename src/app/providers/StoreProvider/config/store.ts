import { CombinedState, configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import type { Reducer } from 'redux';

import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';

import { saveScrollReducer } from 'features/SaveScroll';

import { $api } from 'shared/api/api';

import { routerReducer } from 'app/providers/router';
import { articlesPageReducer, fetchArticlesList } from 'pages/ArticlesPage';
import { articleFiltersReducer, articlesFiltersActions } from 'features/ArticleFilters';
import type { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { profileReducer } from 'entities/Profile';

export const extraArg: ThunkExtraArg = {
  api: $api,
};

export const staticReducers = {
  counter: counterReducer,
  user: userReducer,
  saveScroll: saveScrollReducer,
  routerInfo: routerReducer,
};

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...staticReducers,
    ...{ ...asyncReducers, profile: profileReducer, articlesPage: articlesPageReducer, articlesFilters: articleFiltersReducer },
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
  });

  delete window.__PRELOADED_STATE__;

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
