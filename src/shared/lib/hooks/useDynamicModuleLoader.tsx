import { Reducer } from '@reduxjs/toolkit';

import { ReduxStoreWithManager } from 'app/providers/StoreProvider';

import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
}

export function useDynamicModuleLoader(
  key: StateSchemaKey,
  reducers: ReducersList,
  removeAfterUnmount: boolean = true,
) {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();
  const mountedReducers = store?.reducerManager?.getReducerMap();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers?.[name as StateSchemaKey];
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${key} reducer` });
      }
    });
    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${key} reducer` });
        });
      }
    };
  }, [dispatch, key, mountedReducers, reducers, removeAfterUnmount, store]);
}
