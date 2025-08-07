import type { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from 'reselect';
import { getSearchParams } from './getSearchParams';
import { getIsViewValid } from 'pages/ArticlesPage/model/helpers/viewParams';

export const getSearchParam = createSelector(
  [getSearchParams, (_: StateSchema, searchParam: string) => searchParam],
  (searchParams, searchParam) => {
    const view = searchParams[searchParam];
    if (view && getIsViewValid(view)) {
      return searchParams[searchParam];
    }

    return '';
  });
