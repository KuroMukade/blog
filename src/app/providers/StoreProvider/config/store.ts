import { CombinedState, configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import type { Reducer } from 'redux';

import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';

import { saveScrollReducer } from 'features/SaveScroll';

import { $api } from 'shared/api/api';

import type { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

const extraArg: ThunkExtraArg = {
  api: $api,
};

export const staticReducers = {
  counter: counterReducer,
  user: userReducer,
  saveScroll: saveScrollReducer,
};

export function createSSRStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  page?: '',
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...staticReducers,
    ...asyncReducers,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
  });

  return store;
}

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...staticReducers,
    ...asyncReducers,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: window.__PRELOADED_STATE__,
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
