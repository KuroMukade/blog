import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryParams } from 'shared/lib/url';
import { ArticleFiltersSchema } from '../types/ArticleFilters';
import { ASCENDING_URL_VALUE } from '../constants/sort';
import { isSortOrderValid } from '../helpers/sortValidation';

const initialState: ArticleFiltersSchema = {
  order: ASCENDING_URL_VALUE,
  sort: 'createdAt',
  search: '',
};

const articlesFiltersSlice = createSlice({
  name: 'articleSortSlice',
  initialState,
  reducers: {
    initFilterParams: (state, action: PayloadAction<QueryParams>) => {
      const { sort, order, search } = action.payload;

      if (isSortOrderValid(order)) {
        state.order = order;
      }

      if (typeof sort === 'string') {
        state.sort = sort as ArticleFiltersSchema['sort'];
      }

      if (typeof search === 'string') {
        state.search = search;
      }
    },
    setOrder: (state, action: PayloadAction<ArticleFiltersSchema['order']>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleFiltersSchema['sort']>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { actions: articlesFiltersActions, reducer: articleFiltersReducer } = articlesFiltersSlice;
