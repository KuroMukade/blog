import type { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from 'reselect';
import { getIsViewValid } from 'pages/ArticlesPage/model/helpers/viewParams';
import { getSearchParams } from './getSearchParams';

export const getSearchParam = createSelector(
  [getSearchParams, (_: StateSchema, searchParam: string) => searchParam],
  (searchParams, searchParam) => {
    const view = searchParams[searchParam];
    if (view && getIsViewValid(view)) {
      return searchParams[searchParam];
    }

    return '';
  },
);
