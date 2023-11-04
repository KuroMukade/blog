import {
  type AnyAction, type EnhancedStore, type Reducer, type ReducersMapObject,
} from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { CombinedState, Dispatch } from 'redux';
import type { NavigateOptions, To } from 'react-router-dom';

import type { CounterSchema } from 'entities/Counter';
import type { ProfileSchema } from 'entities/Profile';
import type { UserSchema } from 'entities/User';
import type { ArticleDetailsSchema } from 'entities/Article';

import type { LoginSchema } from 'features/AuthByUsername';
import type { AddCommentFormSchema } from 'features/AddCommentForm';
import type { SaveScrollSchema } from 'features/SaveScroll';

import type { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import type { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ArticleFiltersSchema } from 'features/ArticleFilters';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    saveScroll: SaveScrollSchema;
    // Async reducers
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    articlesFilters?: ArticleFiltersSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    state: StateSchema;
    extra: ThunkExtraArg;
    dispatch?: Dispatch;
}
