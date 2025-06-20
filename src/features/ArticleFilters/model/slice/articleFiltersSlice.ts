import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryParams } from 'shared/lib/url';
import { ArticleFiltersSchema } from '../types/ArticleFilters';

const initialState: ArticleFiltersSchema = {
  order: 'asc',
  sort: 'createdAt',
  search: '',
};

const articlesFiltersSlice = createSlice({
  name: 'articleSortSlice',
  initialState,
  reducers: {
    initFilterParams: (state, action: PayloadAction<QueryParams>) => {
      const { sort, order, search } = action.payload;

      if (order === 'asc' || order === 'desc') {
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
